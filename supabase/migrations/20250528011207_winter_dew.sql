/*
  # Add view counter functionality
  
  1. Changes
    - Add views column to fotofolio_fotos table
    - Create function to increment views safely
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

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS increment_photo_views(BIGINT);

-- Create function to safely increment views
CREATE FUNCTION increment_photo_views(photo_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE fotofolio_fotos
  SET views = views + 1
  WHERE id = photo_id;
END;
$$ LANGUAGE plpgsql;