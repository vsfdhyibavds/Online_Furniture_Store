import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { getDatabase } from '../database/init.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { generateId } from '../utils/helpers.js';
import { sendOrderConfirmationEmail } from '../utils/email.js';

const router = express.Router();

// Create order
router.post('/', authenticateToken, [
  body('items').isArray({ min: 1 }),
  body('items.*.productId').isString(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('shippingAddress').isObject(),
  body('billingAddress').isObject(),
  body('paymentMethod').isObject()
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;
    const db = getDatabase();

    // Start transaction
    const transaction = db.transaction(() => {
      // Create addresses
      const shippingAddressId = generateId();
      const billingAddressId = generateId();

      const insertAddress = db.prepare(`
        INSERT INTO addresses (
          id, user_id, type, first_name, last_name, street, city, state, zip_code, country
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      insertAddress.run(
        shippingAddressId,
        req.user.id,
        'shipping',
        shippingAddress.firstName,
        shippingAddress.lastName,
        shippingAddress.street,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.zipCode,
        shippingAddress.country
      );

      insertAddress.run(
        billingAddressId,
        req.user.id,
        'billing',
        billingAddress.firstName,
        billingAddress.lastName,
        billingAddress.street,
        billingAddress.city,
        billingAddress.state,
        billingAddress.zipCode,
        billingAddress.country
      );

      // Calculate totals
      let subtotal = 0;
      const orderItems = [];

      for (const item of items) {
        const product = db.prepare('SELECT price, stock_quantity FROM products WHERE id = ?').get(item.productId);
        
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.stock_quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId}`);
        }

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
          selectedColor: item.selectedColor
        });

        // Update stock
        db.prepare('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?')
          .run(item.quantity, item.productId);
      }

      const shipping = subtotal > 500 ? 0 : 50;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      // Create order
      const orderId = generateId();
      const insertOrder = db.prepare(`
        INSERT INTO orders (
          id, user_id, status, subtotal, tax, shipping, total,
          shipping_address_id, billing_address_id,
          payment_method_type, payment_method_last4, payment_method_brand
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      insertOrder.run(
        orderId,
        req.user.id,
        'confirmed',
        subtotal,
        tax,
        shipping,
        total,
        shippingAddressId,
        billingAddressId,
        paymentMethod.type,
        paymentMethod.last4,
        paymentMethod.brand
      );

      // Create order items
      const insertOrderItem = db.prepare(`
        INSERT INTO order_items (id, order_id, product_id, quantity, price, selected_color)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      orderItems.forEach(item => {
        insertOrderItem.run(
          generateId(),
          orderId,
          item.productId,
          item.quantity,
          item.price,
          item.selectedColor
        );
      });

      return { orderId, total };
    });

    const result = transaction();

    // Send confirmation email (async)
    const user = db.prepare('SELECT email, first_name FROM users WHERE id = ?').get(req.user.id);
    sendOrderConfirmationEmail(user.email, user.first_name, result.orderId).catch(err =>
      console.error('Failed to send order confirmation email:', err)
    );

    res.status(201).json({
      success: true,
      data: {
        orderId: result.orderId,
        total: result.total
      },
      message: 'Order created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user orders
router.get('/my-orders', authenticateToken, (req, res, next) => {
  try {
    const db = getDatabase();
    
    const orders = db.prepare(`
      SELECT 
        o.*,
        sa.first_name as shipping_first_name,
        sa.last_name as shipping_last_name,
        sa.street as shipping_street,
        sa.city as shipping_city,
        sa.state as shipping_state,
        sa.zip_code as shipping_zip_code,
        sa.country as shipping_country
      FROM orders o
      LEFT JOIN addresses sa ON o.shipping_address_id = sa.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `).all(req.user.id);

    // Get order items for each order
    const formattedOrders = orders.map(order => {
      const items = db.prepare(`
        SELECT 
          oi.*,
          p.name as product_name,
          p.brand as product_brand,
          pi.image_url as product_image
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.sort_order = 0
        WHERE oi.order_id = ?
      `).all(order.id);

      return {
        id: order.id,
        status: order.status,
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        total: order.total,
        trackingNumber: order.tracking_number,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        items: items.map(item => ({
          id: item.id,
          productId: item.product_id,
          productName: item.product_name,
          productBrand: item.product_brand,
          productImage: item.product_image,
          quantity: item.quantity,
          price: item.price,
          selectedColor: item.selected_color
        })),
        shippingAddress: {
          firstName: order.shipping_first_name,
          lastName: order.shipping_last_name,
          street: order.shipping_street,
          city: order.shipping_city,
          state: order.shipping_state,
          zipCode: order.shipping_zip_code,
          country: order.shipping_country
        },
        paymentMethod: {
          type: order.payment_method_type,
          last4: order.payment_method_last4,
          brand: order.payment_method_brand
        }
      };
    });

    res.json({
      success: true,
      data: formattedOrders
    });
  } catch (error) {
    next(error);
  }
});

// Get single order
router.get('/:id', authenticateToken, [
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

    // Check if user owns this order or is admin
    const order = db.prepare(`
      SELECT * FROM orders 
      WHERE id = ? AND (user_id = ? OR ? = 'admin')
    `).get(id, req.user.id, req.user.role);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        error: 'Order not found' 
      });
    }

    // Get order items
    const items = db.prepare(`
      SELECT 
        oi.*,
        p.name as product_name,
        p.brand as product_brand,
        pi.image_url as product_image
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.sort_order = 0
      WHERE oi.order_id = ?
    `).all(id);

    // Get addresses
    const shippingAddress = db.prepare('SELECT * FROM addresses WHERE id = ?').get(order.shipping_address_id);
    const billingAddress = db.prepare('SELECT * FROM addresses WHERE id = ?').get(order.billing_address_id);

    const formattedOrder = {
      id: order.id,
      status: order.status,
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      total: order.total,
      trackingNumber: order.tracking_number,
      notes: order.notes,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      items: items.map(item => ({
        id: item.id,
        productId: item.product_id,
        productName: item.product_name,
        productBrand: item.product_brand,
        productImage: item.product_image,
        quantity: item.quantity,
        price: item.price,
        selectedColor: item.selected_color
      })),
      shippingAddress: {
        firstName: shippingAddress.first_name,
        lastName: shippingAddress.last_name,
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zip_code,
        country: shippingAddress.country
      },
      billingAddress: {
        firstName: billingAddress.first_name,
        lastName: billingAddress.last_name,
        street: billingAddress.street,
        city: billingAddress.city,
        state: billingAddress.state,
        zipCode: billingAddress.zip_code,
        country: billingAddress.country
      },
      paymentMethod: {
        type: order.payment_method_type,
        last4: order.payment_method_last4,
        brand: order.payment_method_brand
      }
    };

    res.json({
      success: true,
      data: formattedOrder
    });
  } catch (error) {
    next(error);
  }
});

// Update order status (Admin only)
router.put('/:id/status', authenticateToken, requireAdmin, [
  param('id').isString(),
  body('status').isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  body('trackingNumber').optional().isString()
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
    const { status, trackingNumber } = req.body;
    const db = getDatabase();

    const updateOrder = db.prepare(`
      UPDATE orders 
      SET status = ?, tracking_number = COALESCE(?, tracking_number), updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    const result = updateOrder.run(status, trackingNumber, id);

    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Order not found' 
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get all orders (Admin only)
router.get('/admin/all', authenticateToken, requireAdmin, (req, res, next) => {
  try {
    const db = getDatabase();
    
    const orders = db.prepare(`
      SELECT 
        o.*,
        u.first_name as user_first_name,
        u.last_name as user_last_name,
        u.email as user_email,
        COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `).all();

    const formattedOrders = orders.map(order => ({
      id: order.id,
      user: {
        firstName: order.user_first_name,
        lastName: order.user_last_name,
        email: order.user_email
      },
      status: order.status,
      total: order.total,
      itemCount: order.item_count,
      trackingNumber: order.tracking_number,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }));

    res.json({
      success: true,
      data: formattedOrders
    });
  } catch (error) {
    next(error);
  }
});

export default router;