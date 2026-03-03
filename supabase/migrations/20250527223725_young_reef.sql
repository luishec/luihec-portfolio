/*
  # Add view counter to photos

  1. Changes
    - Add views column to fotofolio_fotos table with default value of 0
    - Add function to increment views safely
*/

-- Add views column
ALTER TABLE fotofolio_fotos
ADD COLUMN views BIGINT DEFAULT 0 NOT NULL;

-- Create function to increment views safely
CREATE OR REPLACE FUNCTION increment_photo_views(photo_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE fotofolio_fotos
  SET views = views + 1
  WHERE id = photo_id;
END;
$$ LANGUAGE plpgsql;