/*
  # Update RLS policies for view counter

  1. Changes
    - Allow public access to increment views function
    - Update RLS policies to allow anonymous users to update view counts
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Photos are viewable by everyone" ON fotofolio_fotos;
DROP POLICY IF EXISTS "Photos can be managed by authenticated users" ON fotofolio_fotos;

-- Create new policies
CREATE POLICY "Anyone can view photos"
ON fotofolio_fotos
FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can update view counts"
ON fotofolio_fotos
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

CREATE POLICY "Only authenticated users can insert or delete"
ON fotofolio_fotos
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Grant execute permission on increment_photo_views function to public
GRANT EXECUTE ON FUNCTION increment_photo_views TO public;