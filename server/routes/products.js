import express from 'express';
import { query, param, body, validationResult } from 'express-validator';
import { getDatabase } from '../database/init.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { generateId } from '../utils/helpers.js';

const router = express.Router();

// Get all products with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isString(),
  query('search').optional().isString(),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('sortBy').optional().isIn(['name', 'price', 'rating', 'created_at']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
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
      page = 1,
      limit = 20,
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const db = getDatabase();
    const offset = (page - 1) * limit;

    // Build query
    let whereConditions = ['p.in_stock = 1'];
    let params = [];

    if (category) {
      whereConditions.push('c.slug = ?');
      params.push(category);
    }

    if (search) {
      whereConditions.push('(p.name LIKE ? OR p.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
      whereConditions.push('p.price >= ?');
      params.push(minPrice);
    }

    if (maxPrice) {
      whereConditions.push('p.price <= ?');
      params.push(maxPrice);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get products
    const productsQuery = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug,
        GROUP_CONCAT(DISTINCT pi.image_url) as images,
        GROUP_CONCAT(DISTINCT pm.material) as materials,
        GROUP_CONCAT(DISTINCT pc.color) as colors
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN product_materials pm ON p.id = pm.product_id
      LEFT JOIN product_colors pc ON p.id = pc.product_id
      ${whereClause}
      GROUP BY p.id
      ORDER BY p.${sortBy} ${sortOrder.toUpperCase()}
      LIMIT ? OFFSET ?
    `;

    const products = db.prepare(productsQuery).all(...params, limit, offset);

    // Get total count
    const countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;

    const { total } = db.prepare(countQuery).get(...params);

    // Format products
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.original_price,
      images: product.images ? product.images.split(',') : [],
      category: {
        id: product.category_id,
        name: product.category_name,
        slug: product.category_slug
      },
      brand: product.brand,
      inStock: Boolean(product.in_stock),
      stockQuantity: product.stock_quantity,
      rating: product.rating,
      reviewCount: product.review_count,
      dimensions: product.width ? {
        width: product.width,
        height: product.height,
        depth: product.depth
      } : null,
      weight: product.weight,
      materials: product.materials ? product.materials.split(',') : [],
      colors: product.colors ? product.colors.split(',') : [],
      featured: Boolean(product.featured),
      createdAt: product.created_at,
      updatedAt: product.updated_at
    }));

    res.json({
      success: true,
      data: formattedProducts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single product
router.get('/:id', [
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

    // Get product with related data
    const product = db.prepare(`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `).get(id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }

    // Get images
    const images = db.prepare(`
      SELECT image_url, alt_text
      FROM product_images
      WHERE product_id = ?
      ORDER BY sort_order
    `).all(id);

    // Get materials
    const materials = db.prepare(`
      SELECT material
      FROM product_materials
      WHERE product_id = ?
    `).all(id);

    // Get colors
    const colors = db.prepare(`
      SELECT color
      FROM product_colors
      WHERE product_id = ?
    `).all(id);

    // Format product
    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.original_price,
      images: images.map(img => img.image_url),
      category: {
        id: product.category_id,
        name: product.category_name,
        slug: product.category_slug
      },
      brand: product.brand,
      inStock: Boolean(product.in_stock),
      stockQuantity: product.stock_quantity,
      rating: product.rating,
      reviewCount: product.review_count,
      dimensions: product.width ? {
        width: product.width,
        height: product.height,
        depth: product.depth
      } : null,
      weight: product.weight,
      materials: materials.map(m => m.material),
      colors: colors.map(c => c.color),
      featured: Boolean(product.featured),
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };

    res.json({
      success: true,
      data: formattedProduct
    });
  } catch (error) {
    next(error);
  }
});

// Create product (Admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('name').trim().isLength({ min: 1 }),
  body('description').trim().isLength({ min: 1 }),
  body('price').isFloat({ min: 0 }),
  body('categoryId').isString(),
  body('brand').trim().isLength({ min: 1 }),
  body('stockQuantity').isInt({ min: 0 })
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
      name,
      description,
      price,
      originalPrice,
      categoryId,
      brand,
      stockQuantity,
      dimensions,
      weight,
      materials = [],
      colors = [],
      images = []
    } = req.body;

    const db = getDatabase();
    const productId = generateId();

    // Insert product
    const insertProduct = db.prepare(`
      INSERT INTO products (
        id, name, description, price, original_price, category_id, brand,
        stock_quantity, width, height, depth, weight
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProduct.run(
      productId,
      name,
      description,
      price,
      originalPrice,
      categoryId,
      brand,
      stockQuantity,
      dimensions?.width,
      dimensions?.height,
      dimensions?.depth,
      weight
    );

    // Insert images
    if (images.length > 0) {
      const insertImage = db.prepare(`
        INSERT INTO product_images (id, product_id, image_url, sort_order)
        VALUES (?, ?, ?, ?)
      `);

      images.forEach((imageUrl, index) => {
        insertImage.run(generateId(), productId, imageUrl, index);
      });
    }

    // Insert materials
    if (materials.length > 0) {
      const insertMaterial = db.prepare(`
        INSERT INTO product_materials (id, product_id, material)
        VALUES (?, ?, ?)
      `);

      materials.forEach(material => {
        insertMaterial.run(generateId(), productId, material);
      });
    }

    // Insert colors
    if (colors.length > 0) {
      const insertColor = db.prepare(`
        INSERT INTO product_colors (id, product_id, color)
        VALUES (?, ?, ?)
      `);

      colors.forEach(color => {
        insertColor.run(generateId(), productId, color);
      });
    }

    res.status(201).json({
      success: true,
      data: { id: productId },
      message: 'Product created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get categories
router.get('/categories/all', (req, res, next) => {
  try {
    const db = getDatabase();
    const categories = db.prepare(`
      SELECT id, name, slug, description, image
      FROM categories
      ORDER BY name
    `).all();

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

export default router;