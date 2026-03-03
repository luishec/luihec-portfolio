/*
  # Add featured flag to photos

  1. Changes
    - Add featured column to fotofolio_fotos table
    - Set default value to false
*/

-- Add featured column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'fotofolio_fotos' 
    AND column_name = 'featured'
  ) THEN
    ALTER TABLE fotofolio_fotos
    ADD COLUMN featured BOOLEAN DEFAULT false NOT NULL;
  END IF;
END $$;