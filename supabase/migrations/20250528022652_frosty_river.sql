/*
  # Add created_at column to fotofolio_fotos table

  1. Changes
    - Add created_at column with default value of now()
    - Make it not nullable
*/

ALTER TABLE fotofolio_fotos
ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL;