/*
  # Add fotofolio_visitas table

  1. New Table
    - `fotofolio_visitas`
      - `id` (bigserial, primary key)
      - `visit_date` (timestamptz, default now())

  2. Security
    - Enable RLS
    - Allow public inserts
    - Allow authenticated users to view visits
*/

CREATE TABLE fotofolio_visitas (
  id BIGSERIAL PRIMARY KEY,
  visit_date TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fotofolio_visitas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visits are viewable by authenticated users"
ON fotofolio_visitas
FOR SELECT
TO authenticated
USING (TRUE);

CREATE POLICY "Visits can be inserted by everyone"
ON fotofolio_visitas
FOR INSERT
TO public
WITH CHECK (TRUE);