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
    ['5', 'Storage', 'storage', 'Organize your space with stylish storage solutions', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'],
    ['6', 'Outdoor', 'outdoor', 'Weather-resistant furniture for your outdoor spaces', 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800']
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
    // Living Room
    ['1', 'Luxe Velvet Sectional Sofa', 'Experience ultimate comfort with this premium velvet sectional sofa. Features deep seating, plush cushions, and a sophisticated design that anchors any living room.', 2899, 3499, '1', 'Luxe Living', 1, 12, 4.8, 156, 280, 85, 160, 95, 1],
    ['2', 'Mid-Century Modern Coffee Table', 'A stunning walnut coffee table that embodies mid-century modern design. Features clean lines, tapered legs, and a rich walnut finish.', 649, 799, '1', 'Century Design', 1, 28, 4.6, 89, 120, 45, 60, 25, 1],
    ['3', 'Scandinavian Accent Chair', 'Embrace Nordic design with this elegant accent chair. Features a curved backrest, natural oak legs, and premium fabric upholstery.', 449, null, '1', 'Nordic Home', 1, 35, 4.7, 124, 65, 85, 70, 18, 0],
    ['4', 'Industrial TV Console', 'A robust TV console that combines industrial aesthetics with modern functionality. Features metal framework and reclaimed wood shelving.', 899, null, '1', 'Urban Steel', 1, 18, 4.5, 67, 180, 55, 40, 45, 0],
    
    // Bedroom
    ['5', 'Upholstered Platform Bed', 'A sophisticated platform bed with luxurious upholstered headboard. Features button tufting, premium linen fabric, and a low-profile design.', 1299, 1599, '2', 'Sleep Haven', 1, 15, 4.9, 203, 193, 120, 203, 85, 1],
    ['6', 'Modern Nightstand Set', 'Sleek nightstands with clean lines and practical storage. Features soft-close drawers, wireless charging pad, and integrated LED lighting.', 599, null, '2', 'Tech Furniture Co', 1, 22, 4.4, 78, 50, 60, 40, 15, 0],
    ['7', 'Vintage Wooden Dresser', 'A beautifully crafted dresser with vintage charm. Features six spacious drawers with dovetail joints and antique brass hardware.', 1199, null, '2', 'Heritage Furniture', 1, 8, 4.8, 92, 150, 85, 45, 65, 0],
    
    // Dining Room
    ['8', 'Farmhouse Dining Table Set', 'A stunning farmhouse dining table that seats 8 comfortably. Crafted from reclaimed oak with weathered finish and trestle base.', 2199, 2699, '3', 'Rustic Charm', 1, 6, 4.7, 134, 240, 75, 100, 120, 1],
    ['9', 'Modern Glass Dining Table', 'An elegant glass dining table with sculptural metal base. The tempered glass top provides sophistication while the unique base adds artistic flair.', 1599, null, '3', 'Contemporary Design', 1, 10, 4.3, 56, 180, 75, 90, 75, 0],
    ['10', 'Leather Dining Chairs (Set of 4)', 'Premium leather dining chairs with ergonomic design. Features genuine top-grain leather, solid oak legs, and high-density foam cushioning.', 899, null, '3', 'Leather Craft', 1, 16, 4.6, 89, 45, 85, 50, 12, 0],
    
    // Office
    ['11', 'Executive Leather Office Chair', 'A premium executive chair designed for long work sessions. Features genuine leather upholstery, lumbar support, and adjustable height.', 1299, null, '4', 'Executive Comfort', 1, 25, 4.8, 167, 70, 120, 70, 32, 0],
    ['12', 'Standing Desk Converter', 'Transform any desk into a standing workstation. Features dual monitor support, keyboard tray, and smooth height adjustment.', 399, null, '4', 'ErgoWork', 1, 42, 4.4, 203, 80, 50, 60, 18, 0],
    
    // Storage
    ['13', 'Modular Bookshelf System', 'A versatile modular bookshelf system that grows with your needs. Features solid wood construction and adjustable shelves.', 799, null, '5', 'Modular Living', 1, 20, 4.5, 98, 120, 180, 30, 55, 0],
    ['14', 'Storage Ottoman Bench', 'A multifunctional storage ottoman that serves as seating, footrest, and storage. Features premium fabric upholstery and hidden compartment.', 299, null, '5', 'Multi-Function', 1, 35, 4.3, 76, 100, 45, 40, 15, 0],
    
    // Outdoor
    ['15', 'Teak Outdoor Dining Set', 'A premium teak outdoor dining set built to withstand the elements. Includes large dining table and 6 matching chairs with cushions.', 2899, 3299, '6', 'Outdoor Luxury', 1, 8, 4.9, 145, 200, 75, 100, 95, 1],
    ['16', 'Wicker Patio Lounge Set', 'A comfortable wicker patio lounge set perfect for relaxation. Features weather-resistant synthetic wicker and aluminum frame.', 1599, null, '6', 'Patio Perfect', 1, 12, 4.4, 87, 180, 85, 90, 45, 0]
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
    // Living Room
    ['img1', '1', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', 'Luxe Velvet Sectional Sofa', 0],
    ['img2', '1', 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800', 'Sectional Sofa Side View', 1],
    ['img3', '1', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800', 'Sectional Sofa Detail', 2],
    ['img4', '2', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 'Mid-Century Modern Coffee Table', 0],
    ['img5', '2', 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800', 'Coffee Table Detail', 1],
    ['img6', '3', 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 'Scandinavian Accent Chair', 0],
    ['img7', '3', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800', 'Accent Chair Side View', 1],
    ['img8', '4', 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800', 'Industrial TV Console', 0],
    
    // Bedroom
    ['img9', '5', 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', 'Upholstered Platform Bed', 0],
    ['img10', '5', 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800', 'Platform Bed Detail', 1],
    ['img11', '6', 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modern Nightstand Set', 0],
    ['img12', '7', 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800', 'Vintage Wooden Dresser', 0],
    
    // Dining Room
    ['img13', '8', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800', 'Farmhouse Dining Table Set', 0],
    ['img14', '8', 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800', 'Dining Set Detail', 1],
    ['img15', '9', 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modern Glass Dining Table', 0],
    ['img16', '10', 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 'Leather Dining Chairs', 0],
    
    // Office
    ['img17', '11', 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800', 'Executive Leather Office Chair', 0],
    ['img18', '11', 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800', 'Office Chair Detail', 1],
    ['img19', '12', 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=800', 'Standing Desk Converter', 0],
    
    // Storage
    ['img20', '13', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modular Bookshelf System', 0],
    ['img21', '14', 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800', 'Storage Ottoman Bench', 0],
    
    // Outdoor
    ['img22', '15', 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800', 'Teak Outdoor Dining Set', 0],
    ['img23', '16', 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800', 'Wicker Patio Lounge Set', 0]
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
    // Living Room
    ['mat1', '1', 'Premium Velvet'], ['mat2', '1', 'Hardwood Frame'], ['mat3', '1', 'High-Density Foam'], ['mat4', '1', 'Steel Springs'],
    ['mat5', '2', 'Solid Walnut Wood'], ['mat6', '2', 'Natural Oil Finish'],
    ['mat7', '3', 'Oak Wood'], ['mat8', '3', 'Linen Fabric'], ['mat9', '3', 'Foam Cushioning'],
    ['mat10', '4', 'Reclaimed Wood'], ['mat11', '4', 'Steel Frame'], ['mat12', '4', 'Powder Coating'],
    
    // Bedroom
    ['mat13', '5', 'Linen Upholstery'], ['mat14', '5', 'Solid Wood Frame'], ['mat15', '5', 'Button Tufting'],
    ['mat16', '6', 'Engineered Wood'], ['mat17', '6', 'Soft-Close Hardware'], ['mat18', '6', 'LED Strips'],
    ['mat19', '7', 'Solid Mahogany'], ['mat20', '7', 'Dovetail Joints'], ['mat21', '7', 'Brass Hardware'],
    
    // Dining Room
    ['mat22', '8', 'Reclaimed Oak'], ['mat23', '8', 'Weathered Finish'], ['mat24', '8', 'Cushioned Seats'],
    ['mat25', '9', 'Tempered Glass'], ['mat26', '9', 'Stainless Steel'], ['mat27', '9', 'Chrome Finish'],
    ['mat28', '10', 'Top-Grain Leather'], ['mat29', '10', 'Oak Wood'], ['mat30', '10', 'High-Density Foam'],
    
    // Office
    ['mat31', '11', 'Genuine Leather'], ['mat32', '11', 'Steel Frame'], ['mat33', '11', 'Memory Foam'], ['mat34', '11', 'Pneumatic Lift'],
    ['mat35', '12', 'Steel Frame'], ['mat36', '12', 'MDF Surface'], ['mat37', '12', 'Gas Spring Mechanism'],
    
    // Storage
    ['mat38', '13', 'Solid Pine Wood'], ['mat39', '13', 'Adjustable Shelves'], ['mat40', '13', 'Metal Brackets'],
    ['mat41', '14', 'Fabric Upholstery'], ['mat42', '14', 'MDF Frame'], ['mat43', '14', 'Soft-Close Hinges'],
    
    // Outdoor
    ['mat44', '15', 'Grade A Teak Wood'], ['mat45', '15', 'Stainless Steel Hardware'], ['mat46', '15', 'Weather-Resistant Cushions'],
    ['mat47', '16', 'Synthetic Wicker'], ['mat48', '16', 'Aluminum Frame'], ['mat49', '16', 'Weather-Resistant Fabric']
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
    // Living Room
    ['col1', '1', 'Navy Blue'], ['col2', '1', 'Emerald Green'], ['col3', '1', 'Charcoal Gray'], ['col4', '1', 'Burgundy'],
    ['col5', '2', 'Walnut'], ['col6', '2', 'Oak'], ['col7', '2', 'Cherry'],
    ['col8', '3', 'Light Gray'], ['col9', '3', 'Cream'], ['col10', '3', 'Sage Green'], ['col11', '3', 'Dusty Pink'],
    ['col12', '4', 'Natural Wood'], ['col13', '4', 'Dark Walnut'],
    
    // Bedroom
    ['col14', '5', 'Oatmeal'], ['col15', '5', 'Charcoal'], ['col16', '5', 'Navy'], ['col17', '5', 'Blush'],
    ['col18', '6', 'White'], ['col19', '6', 'Black'], ['col20', '6', 'Walnut'],
    ['col21', '7', 'Mahogany'], ['col22', '7', 'Cherry'], ['col23', '7', 'Natural Oak'],
    
    // Dining Room
    ['col24', '8', 'Weathered Oak'], ['col25', '8', 'Natural Pine'],
    ['col26', '9', 'Clear Glass'], ['col27', '9', 'Smoked Glass'],
    ['col28', '10', 'Cognac Brown'], ['col29', '10', 'Black'], ['col30', '10', 'Caramel'],
    
    // Office
    ['col31', '11', 'Black'], ['col32', '11', 'Brown'], ['col33', '11', 'Burgundy'],
    ['col34', '12', 'Black'], ['col35', '12', 'White'], ['col36', '12', 'Walnut'],
    
    // Storage
    ['col37', '13', 'Natural Pine'], ['col38', '13', 'White'], ['col39', '13', 'Espresso'],
    ['col40', '14', 'Gray'], ['col41', '14', 'Navy'], ['col42', '14', 'Beige'], ['col43', '14', 'Charcoal'],
    
    // Outdoor
    ['col44', '15', 'Natural Teak'], ['col45', '15', 'Weathered Teak'],
    ['col46', '16', 'Natural Brown'], ['col47', '16', 'Charcoal Gray']
  ];

  colors.forEach(color => {
    insertColor.run(...color);
  });

  logger.info('Initial data inserted successfully');
}