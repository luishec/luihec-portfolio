/*
  # Update view counter functionality
  
  1. Changes
    - Ensure views column exists with proper default
    - Drop and recreate increment_photo_views function to return JSON
    - Function now returns the updated photo data
*/

-- Make sure views column exists and has proper default
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

-- Drop existing function first
DROP FUNCTION IF EXISTS increment_photo_views(BIGINT);

-- Create function to safely increment views and return updated photo
CREATE FUNCTION increment_photo_views(photo_id BIGINT)
RETURNS json AS $$
DECLARE
  updated_photo json;
BEGIN
  UPDATE fotofolio_fotos
  SET views = views + 1
  WHERE id = photo_id
  RETURNING row_to_json(fotofolio_fotos.*) INTO updated_photo;
  
  RETURN updated_photo;
END;
$$ LANGUAGE plpgsql;