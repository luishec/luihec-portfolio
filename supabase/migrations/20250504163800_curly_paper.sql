/*
  # Initial Schema Setup for Photography Portfolio

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `url` (text, required)
      - `category_id` (integer, foreign key)
      - `is_featured` (boolean, default false)
      - `created_at` (timestamp with time zone, default now())
    
    - `categories`
      - `id` (integer, primary key)
      - `name` (text, required)
      - `created_at` (timestamp with time zone, default now())
    
    - `booking_requests`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `requested_date` (date, required)
      - `service_type` (text, required)
      - `message` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp with time zone, default now())
  
  2. Security
    - Enable RLS on all tables
    - Add appropriate security policies for each table
*/

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  url text NOT NULL,
  category_id integer,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create booking_requests table
CREATE TABLE IF NOT EXISTS booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  requested_date date NOT NULL,
  service_type text NOT NULL,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for photos
CREATE POLICY "Photos are viewable by everyone" 
  ON photos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Photos can be inserted by authenticated users" 
  ON photos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Photos can be updated by authenticated users" 
  ON photos
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Photos can be deleted by authenticated users" 
  ON photos
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for categories
CREATE POLICY "Categories are viewable by everyone" 
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories can be managed by authenticated users" 
  ON categories
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for booking_requests
CREATE POLICY "Booking requests can be inserted by everyone" 
  ON booking_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Booking requests are viewable by authenticated users" 
  ON booking_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Booking requests can be updated by authenticated users" 
  ON booking_requests
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Booking requests can be deleted by authenticated users" 
  ON booking_requests
  FOR DELETE
  TO authenticated
  USING (true);