/*
  # Update NSFW column default value

  1. Changes
    - Modify NSFW column to have false as default value and not allow null values
*/

ALTER TABLE fotofolio_fotos 
  ALTER COLUMN nsfw SET DEFAULT false,
  ALTER COLUMN nsfw SET NOT NULL;