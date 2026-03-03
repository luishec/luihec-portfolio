/*
  # Update views permissions and ensure column exists

  1. Changes
    - Ensure views column exists with proper default
    - Update RLS policies to allow public view updates
    - Grant necessary permissions
*/

-- Ensure views column exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'fotofolio_fotos' 
    AND column_name = 'views'
  ) THEN
    ALTER TABLE fotofolio_fotos
    ADD COLUMN views BIGINT DEFAULT 0 NOT NULL;
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view photos" ON fotofolio_fotos;
DROP POLICY IF EXISTS "Anyone can update view counts" ON fotofolio_fotos;
DROP POLICY IF EXISTS "Only authenticated users can insert or delete" ON fotofolio_fotos;

-- Create updated policies
CREATE POLICY "Anyone can view photos"
ON fotofolio_fotos
FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can update views"
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

-- Recreate increment_photo_views function with proper permissions
DROP FUNCTION IF EXISTS increment_photo_views(BIGINT);

CREATE FUNCTION increment_photo_views(photo_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE fotofolio_fotos
  SET views = views + 1
  WHERE id = photo_id;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION increment_photo_views TO public;