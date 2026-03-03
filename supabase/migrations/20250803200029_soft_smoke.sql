/*
  # Add views column to fotofolio_fotos table

  1. Changes
    - Add views column to fotofolio_fotos table with default value of 0
    - Create function to increment views safely
    - Grant necessary permissions
*/

-- Add views column if it doesn't exist
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

-- Create function to safely increment views
CREATE OR REPLACE FUNCTION increment_photo_views(photo_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE fotofolio_fotos
  SET views = views + 1
  WHERE id = photo_id;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION increment_photo_views TO public;