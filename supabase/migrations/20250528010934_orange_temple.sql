/*
  # Remove views functionality

  1. Changes
    - Drop views column from fotofolio_fotos table
    - Drop increment_photo_views function
*/

-- Drop the increment_photo_views function
DROP FUNCTION IF EXISTS increment_photo_views(BIGINT);

-- Remove views column from fotofolio_fotos table
ALTER TABLE fotofolio_fotos
DROP COLUMN IF EXISTS views;