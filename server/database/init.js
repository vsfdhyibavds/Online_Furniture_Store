import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'furniture_store.db');
let db;

export function getDatabase() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
  }
  return db;
}

export async function initializeDatabase() {
  try {
    db = getDatabase();
    
    // Create tables
    createTables();
    
    // Insert initial data
    await insertInitialData();
    
    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
}

function createTables() {
  const db = getDatabase();
  
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      avatar TEXT,
      role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
      email_verified BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      image TEXT,
      parent_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES categories(id)
    )
  `);

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      original_price DECIMAL(10,2),
      category_id TEXT NOT NULL,
      brand TEXT NOT NULL,
      in_stock BOOLEAN DEFAULT TRUE,
      stock_quantity INTEGER DEFAULT 0,
      rating DECIMAL(3,2) DEFAULT 0,
      review_count INTEGER DEFAULT 0,
      width DECIMAL(8,2),
      height DECIMAL(8,2),
      depth DECIMAL(8,2),
      weight DECIMAL(8,2),
      featured BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Product images table
  db.exec(`
    CREATE TABLE IF NOT EXISTS product_images (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      alt_text TEXT,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product materials table
  db.exec(`
    CREATE TABLE IF NOT EXISTS product_materials (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      material TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product colors table
  db.exec(`
    CREATE TABLE IF NOT EXISTS product_colors (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      color TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Addresses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT CHECK (type IN ('billing', 'shipping')),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      company TEXT,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      zip_code TEXT NOT NULL,
      country TEXT NOT NULL,
      is_default BOOLEAN DEFAULT FALSE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
      subtotal DECIMAL(10,2) NOT NULL,
      tax DECIMAL(10,2) NOT NULL,
      shipping DECIMAL(10,2) NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      shipping_address_id TEXT NOT NULL,
      billing_address_id TEXT NOT NULL,
      payment_method_type TEXT NOT NULL,
      payment_method_last4 TEXT,
      payment_method_brand TEXT,
      tracking_number TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (shipping_address_id) REFERENCES addresses(id),
      FOREIGN KEY (billing_address_id) REFERENCES addresses(id)
    )
  `);

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      selected_color TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Reviews table
  db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      title TEXT NOT NULL,
      comment TEXT NOT NULL,
      verified BOOLEAN DEFAULT FALSE,
      helpful INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(product_id, user_id)
    )
  `);

  // Wishlist table
  db.exec(`
    CREATE TABLE IF NOT EXISTS wishlist (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE(user_id, product_id)
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
    CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
    CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
    CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
  `);
}

async function insertInitialData() {
  const db = getDatabase();
  
  // Check if data already exists
  const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get();
  if (categoryCount.count > 0) {
    return; // Data already exists
  }

  // Insert categories
  const insertCategory = db.prepare(`
    INSERT INTO categories (id, name, slug, description, image)
    VALUES (?, ?, ?, ?, ?)
  `);

  const categories = [
    ['1', 'Living Room', 'living-room', 'Comfortable and stylish furniture for your living space', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['2', 'Bedroom', 'bedroom', 'Create your perfect sleep sanctuary', 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['3', 'Dining Room', 'dining-room', 'Elegant dining furniture for memorable meals', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['4', 'Office', 'office', 'Productive and comfortable workspace furniture', 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['5', 'Storage', 'storage', 'Organize your space with stylish storage solutions', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800']
  ];

  categories.forEach(category => {
    insertCategory.run(...category);
  });

  // Insert products
  const insertProduct = db.prepare(`
    INSERT INTO products (id, name, description, price, original_price, category_id, brand, in_stock, stock_quantity, rating, review_count, width, height, depth, weight, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const products = [
    ['1', 'Modern Sectional Sofa', 'A luxurious and comfortable sectional sofa perfect for modern living rooms. Features premium fabric upholstery and sturdy construction.', 2499, 2999, '1', 'ModernLiving', 1, 15, 4.8, 124, 120, 85, 90, 85, 1],
    ['2', 'Elegant Dining Table Set', 'Beautiful solid wood dining table with 6 matching chairs. Perfect for family dinners and entertaining guests.', 1899, null, '3', 'ClassicWood', 1, 8, 4.6, 89, 180, 75, 90, 120, 1],
    ['3', 'Luxury King Size Bed', 'Premium upholstered king size bed with tufted headboard. Combines comfort and elegance for the perfect bedroom centerpiece.', 1599, null, '2', 'DreamComfort', 1, 12, 4.9, 156, 193, 120, 203, 95, 1],
    ['4', 'Executive Office Chair', 'Ergonomic executive office chair with premium leather upholstery and adjustable features for maximum comfort during long work sessions.', 899, null, '4', 'ErgoWork', 1, 25, 4.7, 203, 70, 120, 70, 28, 0],
    ['5', 'Modern Coffee Table', 'Sleek glass-top coffee table with metal legs. Perfect addition to contemporary living rooms.', 599, null, '1', 'ModernLiving', 1, 20, 4.4, 67, 120, 45, 60, 35, 0],
    ['6', 'Vintage Armchair', 'Classic vintage-style armchair with rich leather upholstery and brass studs. A timeless piece for any room.', 1299, null, '1', 'VintageClassics', 1, 10, 4.8, 92, 85, 95, 90, 45, 0]
  ];

  products.forEach(product => {
    insertProduct.run(...product);
  });

  // Insert product images
  const insertImage = db.prepare(`
    INSERT INTO product_images (id, product_id, image_url, alt_text, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `);

  const images = [
    ['img1', '1', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modern Sectional Sofa', 0],
    ['img2', '1', 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modern Sectional Sofa Side View', 1],
    ['img3', '2', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800', 'Elegant Dining Table Set', 0],
    ['img4', '3', 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', 'Luxury King Size Bed', 0],
    ['img5', '4', 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800', 'Executive Office Chair', 0],
    ['img6', '5', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modern Coffee Table', 0],
    ['img7', '6', 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 'Vintage Armchair', 0]
  ];

  images.forEach(image => {
    insertImage.run(...image);
  });

  // Insert product materials
  const insertMaterial = db.prepare(`
    INSERT INTO product_materials (id, product_id, material)
    VALUES (?, ?, ?)
  `);

  const materials = [
    ['mat1', '1', 'Premium Fabric'],
    ['mat2', '1', 'Hardwood Frame'],
    ['mat3', '1', 'High-Density Foam'],
    ['mat4', '2', 'Solid Oak Wood'],
    ['mat5', '2', 'Natural Finish'],
    ['mat6', '3', 'Velvet Upholstery'],
    ['mat7', '3', 'Solid Wood Frame'],
    ['mat8', '4', 'Genuine Leather'],
    ['mat9', '4', 'Steel Frame'],
    ['mat10', '5', 'Tempered Glass'],
    ['mat11', '5', 'Stainless Steel'],
    ['mat12', '6', 'Genuine Leather'],
    ['mat13', '6', 'Hardwood Frame']
  ];

  materials.forEach(material => {
    insertMaterial.run(...material);
  });

  // Insert product colors
  const insertColor = db.prepare(`
    INSERT INTO product_colors (id, product_id, color)
    VALUES (?, ?, ?)
  `);

  const colors = [
    ['col1', '1', 'Charcoal Gray'],
    ['col2', '1', 'Navy Blue'],
    ['col3', '1', 'Cream White'],
    ['col4', '2', 'Natural Oak'],
    ['col5', '2', 'Dark Walnut'],
    ['col6', '3', 'Deep Navy'],
    ['col7', '3', 'Charcoal'],
    ['col8', '4', 'Black'],
    ['col9', '4', 'Brown'],
    ['col10', '5', 'Clear Glass'],
    ['col11', '5', 'Smoked Glass'],
    ['col12', '6', 'Cognac Brown'],
    ['col13', '6', 'Black']
  ];

  colors.forEach(color => {
    insertColor.run(...color);
  });

  logger.info('Initial data inserted successfully');
}