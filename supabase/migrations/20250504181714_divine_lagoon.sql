/*
  # Database Schema Cleanup

  1. Changes
    - Drop unused tables (booking_requests, categories)
    - Rename photos table to fotofolio_fotos
    - Recreate RLS policies for renamed table

  2. Security
    - Maintain existing RLS settings
    - Recreate policies for public viewing and authenticated management
*/

-- Drop unused tables
DROP TABLE IF EXISTS booking_requests;
DROP TABLE IF EXISTS categories;

-- Rename photos table
ALTER TABLE IF EXISTS photos RENAME TO fotofolio_fotos;

-- Drop existing policies
DROP POLICY IF EXISTS "Photos are viewable by everyone" ON fotofolio_fotos;
DROP POLICY IF EXISTS "Photos can be managed by authenticated users" ON fotofolio_fotos;

-- Update RLS policies for renamed table
ALTER TABLE fotofolio_fotos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photos are viewable by everyone" 
ON fotofolio_fotos
FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Photos can be managed by authenticated users" 
ON fotofolio_fotos
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);