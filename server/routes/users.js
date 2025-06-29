import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { getDatabase } from '../database/init.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { generateId } from '../utils/helpers.js';

const router = express.Router();

// Get user addresses
router.get('/addresses', authenticateToken, (req, res, next) => {
  try {
    const db = getDatabase();
    const addresses = db.prepare(`
      SELECT * FROM addresses 
      WHERE user_id = ? 
      ORDER BY is_default DESC, created_at DESC
    `).all(req.user.id);

    res.json({
      success: true,
      data: addresses.map(addr => ({
        id: addr.id,
        type: addr.type,
        firstName: addr.first_name,
        lastName: addr.last_name,
        company: addr.company,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zip_code,
        country: addr.country,
        isDefault: Boolean(addr.is_default),
        createdAt: addr.created_at
      }))
    });
  } catch (error) {
    next(error);
  }
});

// Add address
router.post('/addresses', authenticateToken, [
  body('type').isIn(['billing', 'shipping']),
  body('firstName').trim().isLength({ min: 1 }),
  body('lastName').trim().isLength({ min: 1 }),
  body('street').trim().isLength({ min: 1 }),
  body('city').trim().isLength({ min: 1 }),
  body('state').trim().isLength({ min: 1 }),
  body('zipCode').trim().isLength({ min: 1 }),
  body('country').trim().isLength({ min: 1 })
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const {
      type,
      firstName,
      lastName,
      company,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault = false
    } = req.body;

    const db = getDatabase();
    const addressId = generateId();

    // If this is set as default, unset other defaults of same type
    if (isDefault) {
      db.prepare(`
        UPDATE addresses 
        SET is_default = FALSE 
        WHERE user_id = ? AND type = ?
      `).run(req.user.id, type);
    }

    const insertAddress = db.prepare(`
      INSERT INTO addresses (
        id, user_id, type, first_name, last_name, company,
        street, city, state, zip_code, country, is_default
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertAddress.run(
      addressId,
      req.user.id,
      type,
      firstName,
      lastName,
      company,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault
    );

    res.status(201).json({
      success: true,
      data: { id: addressId },
      message: 'Address added successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update address
router.put('/addresses/:id', authenticateToken, [
  param('id').isString(),
  body('firstName').optional().trim().isLength({ min: 1 }),
  body('lastName').optional().trim().isLength({ min: 1 }),
  body('street').optional().trim().isLength({ min: 1 }),
  body('city').optional().trim().isLength({ min: 1 }),
  body('state').optional().trim().isLength({ min: 1 }),
  body('zipCode').optional().trim().isLength({ min: 1 }),
  body('country').optional().trim().isLength({ min: 1 })
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const updates = req.body;
    const db = getDatabase();

    // Check if address belongs to user
    const address = db.prepare('SELECT type FROM addresses WHERE id = ? AND user_id = ?').get(id, req.user.id);
    if (!address) {
      return res.status(404).json({ 
        success: false, 
        error: 'Address not found' 
      });
    }

    // If setting as default, unset other defaults of same type
    if (updates.isDefault) {
      db.prepare(`
        UPDATE addresses 
        SET is_default = FALSE 
        WHERE user_id = ? AND type = ? AND id != ?
      `).run(req.user.id, address.type, id);
    }

    // Build update query
    const updateFields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        updateFields.push(`${dbField} = ?`);
        values.push(value);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No fields to update' 
      });
    }

    values.push(id);
    const updateQuery = `UPDATE addresses SET ${updateFields.join(', ')} WHERE id = ?`;
    
    db.prepare(updateQuery).run(...values);

    res.json({
      success: true,
      message: 'Address updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete address
router.delete('/addresses/:id', authenticateToken, [
  param('id').isString()
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { id } = req.params;
    const db = getDatabase();

    const result = db.prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?').run(id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Address not found' 
      });
    }

    res.json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get wishlist
router.get('/wishlist', authenticateToken, (req, res, next) => {
  try {
    const db = getDatabase();
    const wishlistItems = db.prepare(`
      SELECT 
        w.*,
        p.name as product_name,
        p.price as product_price,
        p.original_price as product_original_price,
        pi.image_url as product_image
      FROM wishlist w
      LEFT JOIN products p ON w.product_id = p.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.sort_order = 0
      WHERE w.user_id = ?
      ORDER BY w.added_at DESC
    `).all(req.user.id);

    res.json({
      success: true,
      data: wishlistItems.map(item => ({
        id: item.id,
        productId: item.product_id,
        productName: item.product_name,
        productPrice: item.product_price,
        productOriginalPrice: item.product_original_price,
        productImage: item.product_image,
        addedAt: item.added_at
      }))
    });
  } catch (error) {
    next(error);
  }
});

// Add to wishlist
router.post('/wishlist', authenticateToken, [
  body('productId').isString()
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { productId } = req.body;
    const db = getDatabase();

    // Check if product exists
    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }

    // Check if already in wishlist
    const existing = db.prepare('SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?').get(req.user.id, productId);
    if (existing) {
      return res.status(409).json({ 
        success: false, 
        error: 'Product already in wishlist' 
      });
    }

    const wishlistId = generateId();
    const insertWishlist = db.prepare(`
      INSERT INTO wishlist (id, user_id, product_id)
      VALUES (?, ?, ?)
    `);

    insertWishlist.run(wishlistId, req.user.id, productId);

    res.status(201).json({
      success: true,
      data: { id: wishlistId },
      message: 'Product added to wishlist'
    });
  } catch (error) {
    next(error);
  }
});

// Remove from wishlist
router.delete('/wishlist/:productId', authenticateToken, [
  param('productId').isString()
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { productId } = req.params;
    const db = getDatabase();

    const result = db.prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?').run(req.user.id, productId);

    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found in wishlist' 
      });
    }

    res.json({
      success: true,
      message: 'Product removed from wishlist'
    });
  } catch (error) {
    next(error);
  }
});

// Get all users (Admin only)
router.get('/admin/all', authenticateToken, requireAdmin, (req, res, next) => {
  try {
    const db = getDatabase();
    const users = db.prepare(`
      SELECT 
        u.id, u.email, u.first_name, u.last_name, u.phone, u.role, u.created_at,
        COUNT(DISTINCT o.id) as order_count,
        COALESCE(SUM(o.total), 0) as total_spent
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `).all();

    res.json({
      success: true,
      data: users.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role,
        orderCount: user.order_count,
        totalSpent: user.total_spent,
        createdAt: user.created_at
      }))
    });
  } catch (error) {
    next(error);
  }
});

export default router;