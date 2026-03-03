-- Remove featured column if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'fotofolio_fotos' 
    AND column_name = 'featured'
  ) THEN
    ALTER TABLE fotofolio_fotos
    DROP COLUMN featured;
  END IF;
END $$;