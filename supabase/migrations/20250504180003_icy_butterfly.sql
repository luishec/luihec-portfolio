/*
  # Update photos table structure

  1. Changes
    - Change id to BIGINT with auto-increment
    - Remove unnecessary columns
    - Add nsfw flag
    - Keep only essential columns

  2. Security
    - Maintain RLS policies
*/

-- First, drop the existing photos table
DROP TABLE IF EXISTS photos;

-- Create the new photos table with the updated structure
CREATE TABLE photos (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  nsfw BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Recreate the policies
CREATE POLICY "Photos are viewable by everyone" 
ON photos FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Photos can be managed by authenticated users" 
ON photos FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);