import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { getDatabase } from '../database/init.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';
import { generateId } from '../utils/helpers.js';
import { sendWelcomeEmail } from '../utils/email.js';

const router = express.Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').trim().isLength({ min: 1 }),
  body('lastName').trim().isLength({ min: 1 })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, password, firstName, lastName } = req.body;
    const db = getDatabase();

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        error: 'User already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const userId = generateId();
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password_hash, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `);

    insertUser.run(userId, email, passwordHash, firstName, lastName);

    // Get created user
    const user = db.prepare(`
      SELECT id, email, first_name, last_name, role, created_at
      FROM users WHERE id = ?
    `).get(userId);

    // Generate token
    const token = generateToken(user);

    // Send welcome email (async, don't wait)
    sendWelcomeEmail(email, firstName).catch(err => 
      console.error('Failed to send welcome email:', err)
    );

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;
    const db = getDatabase();

    // Find user
    const user = db.prepare(`
      SELECT id, email, password_hash, first_name, last_name, role
      FROM users WHERE email = ?
    `).get(email);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res, next) => {
  try {
    const db = getDatabase();
    const user = db.prepare(`
      SELECT id, email, first_name, last_name, phone, avatar, role, created_at
      FROM users WHERE id = ?
    `).get(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update profile
router.put('/profile', authenticateToken, [
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('phone').optional().isMobilePhone()
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { firstName, lastName, phone } = req.body;
    const db = getDatabase();

    const updateUser = db.prepare(`
      UPDATE users 
      SET first_name = COALESCE(?, first_name),
          last_name = COALESCE(?, last_name),
          phone = COALESCE(?, phone),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateUser.run(firstName, lastName, phone, req.user.id);

    // Get updated user
    const user = db.prepare(`
      SELECT id, email, first_name, last_name, phone, avatar, role
      FROM users WHERE id = ?
    `).get(req.user.id);

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// Change password
router.put('/password', authenticateToken, [
  body('currentPassword').exists(),
  body('newPassword').isLength({ min: 6 })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { currentPassword, newPassword } = req.body;
    const db = getDatabase();

    // Get current password hash
    const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
    
    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Current password is incorrect' 
      });
    }

    // Hash new password
    const saltRounds = 12;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    const updatePassword = db.prepare(`
      UPDATE users 
      SET password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updatePassword.run(newPasswordHash, req.user.id);

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;