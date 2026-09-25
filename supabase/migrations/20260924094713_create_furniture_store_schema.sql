/*
# Create furniture store database schema

## Overview
Creates the complete database schema for an online furniture store with user authentication.
Includes categories, products, orders, order items, and wishlist tables.

## New Tables

1. `categories` - Furniture categories (Living Room, Bedroom, etc.)
   - id (uuid, PK)
   - name (text, not null)
   - slug (text, unique, not null)
   - description (text)
   - image (text, URL to category image)
   - created_at (timestamptz)

2. `products` - Furniture products
   - id (uuid, PK)
   - name (text, not null)
   - description (text)
   - price (numeric, not null)
   - original_price (numeric, nullable, for sale items)
   - images (jsonb array of image URLs)
   - category_id (uuid, FK to categories)
   - brand (text)
   - in_stock (boolean, default true)
   - stock_quantity (integer, default 0)
   - rating (numeric, default 0)
   - review_count (integer, default 0)
   - dimensions (jsonb, width/height/depth)
   - weight (numeric, nullable)
   - materials (jsonb array of strings)
   - colors (jsonb array of strings)
   - tags (jsonb array of strings)
   - featured (boolean, default false)
   - created_at (timestamptz)
   - updated_at (timestamptz)

3. `orders` - Customer orders
   - id (uuid, PK)
   - user_id (uuid, not null, defaults to auth.uid(), FK to auth.users)
   - status (text, default 'pending')
   - subtotal (numeric)
   - tax (numeric)
   - shipping (numeric)
   - total (numeric)
   - tracking_number (text, nullable)
   - shipping_address (jsonb)
   - payment_method (jsonb)
   - created_at (timestamptz)
   - updated_at (timestamptz)

4. `order_items` - Items within an order
   - id (uuid, PK)
   - order_id (uuid, FK to orders, ON DELETE CASCADE)
   - product_id (uuid, FK to products)
   - product_name (text)
   - product_image (text)
   - product_price (numeric)
   - quantity (integer)
   - price (numeric, line total)
   - selected_color (text, nullable)

5. `wishlist` - User wishlist items
   - id (uuid, PK)
   - user_id (uuid, not null, defaults to auth.uid(), FK to auth.users)
   - product_id (uuid, FK to products)
   - created_at (timestamptz)

## Security
- RLS enabled on all tables
- categories: public read (anon + authenticated), no writes from frontend
- products: public read (anon + authenticated), no writes from frontend
- orders: owner-scoped CRUD (authenticated only, user_id = auth.uid())
- order_items: owner-scoped via parent order (authenticated only)
- wishlist: owner-scoped CRUD (authenticated only, user_id = auth.uid())

## Important Notes
1. Categories and products are readable by everyone (no auth needed to browse)
2. Orders and wishlist require authentication - users only see their own
3. user_id columns default to auth.uid() so inserts work without explicit user_id
4. order_items scoped through parent order's user_id for security
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories"
ON categories FOR SELECT
TO anon, authenticated USING (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  original_price numeric,
  images jsonb DEFAULT '[]'::jsonb,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  brand text DEFAULT 'MayBell Studio',
  in_stock boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  dimensions jsonb,
  weight numeric,
  materials jsonb DEFAULT '[]'::jsonb,
  colors jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products"
ON products FOR SELECT
TO anon, authenticated USING (true);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  subtotal numeric NOT NULL DEFAULT 0,
  tax numeric NOT NULL DEFAULT 0,
  shipping numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  tracking_number text,
  shipping_address jsonb,
  payment_method jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_orders" ON orders;
CREATE POLICY "select_own_orders"
ON orders FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_orders" ON orders;
CREATE POLICY "insert_own_orders"
ON orders FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_orders" ON orders;
CREATE POLICY "update_own_orders"
ON orders FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_orders" ON orders;
CREATE POLICY "delete_own_orders"
ON orders FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_image text,
  product_price numeric NOT NULL DEFAULT 0,
  quantity integer NOT NULL DEFAULT 1,
  price numeric NOT NULL DEFAULT 0,
  selected_color text
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_order_items" ON order_items;
CREATE POLICY "select_own_order_items"
ON order_items FOR SELECT
TO authenticated USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

DROP POLICY IF EXISTS "insert_own_order_items" ON order_items;
CREATE POLICY "insert_own_order_items"
ON order_items FOR INSERT
TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_wishlist" ON wishlist;
CREATE POLICY "select_own_wishlist"
ON wishlist FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_wishlist" ON wishlist;
CREATE POLICY "insert_own_wishlist"
ON wishlist FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_wishlist" ON wishlist;
CREATE POLICY "delete_own_wishlist"
ON wishlist FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);