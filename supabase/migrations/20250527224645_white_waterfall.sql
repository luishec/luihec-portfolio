/*
  # Remove NSFW column from fotofolio_fotos table

  1. Changes
    - Remove NSFW column from fotofolio_fotos table
*/

ALTER TABLE fotofolio_fotos
DROP COLUMN nsfw;