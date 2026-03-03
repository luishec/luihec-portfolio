-- Remove created_at column since we're using id for sorting
ALTER TABLE fotofolio_fotos 
DROP COLUMN IF EXISTS created_at;