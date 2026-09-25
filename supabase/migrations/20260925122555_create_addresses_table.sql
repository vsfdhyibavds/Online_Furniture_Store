/*
# Create addresses table for saved shipping addresses

## Overview
Adds a user_addresses table so customers can save and manage multiple shipping
addresses from their profile dashboard. Each address belongs to the authenticated
user who created it.

## New Tables
1. `user_addresses`
   - id (uuid, PK)
   - user_id (uuid, not null, defaults to auth.uid(), FK to auth.users, ON DELETE CASCADE)
   - label (text, e.g. "Home", "Work")
   - first_name (text)
   - last_name (text)
   - street (text)
   - city (text)
   - state (text)
   - zip_code (text)
   - country (text, default 'US')
   - phone (text, nullable)
   - is_default (boolean, default false)
   - created_at (timestamptz)
   - updated_at (timestamptz)

## Security
- RLS enabled on user_addresses
- Owner-scoped CRUD: each authenticated user can only access their own addresses
- user_id defaults to auth.uid() so inserts work without explicitly passing it
*/

CREATE TABLE IF NOT EXISTS user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  label text NOT NULL DEFAULT 'Home',
  first_name text NOT NULL,
  last_name text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  country text NOT NULL DEFAULT 'US',
  phone text,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_addresses" ON user_addresses;
CREATE POLICY "select_own_addresses"
ON user_addresses FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_addresses" ON user_addresses;
CREATE POLICY "insert_own_addresses"
ON user_addresses FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_addresses" ON user_addresses;
CREATE POLICY "update_own_addresses"
ON user_addresses FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_addresses" ON user_addresses;
CREATE POLICY "delete_own_addresses"
ON user_addresses FOR DELETE
TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
