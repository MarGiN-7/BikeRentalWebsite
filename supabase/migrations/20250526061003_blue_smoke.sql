/*
  # Add Geofencing System

  1. New Tables
    - `bike_locations`
      - `id` (uuid, primary key)
      - `bike_id` (text, references bikes)
      - `latitude` (double precision)
      - `longitude` (double precision)
      - `timestamp` (timestamptz)
      - `is_within_fence` (boolean)
    - `geofences`
      - `id` (uuid, primary key) 
      - `name` (text)
      - `coordinates` (point[])
      - `description` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for location tracking
*/

-- Create bike_locations table
CREATE TABLE IF NOT EXISTS bike_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bike_id text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  timestamp timestamptz DEFAULT now(),
  is_within_fence boolean DEFAULT true,
  CONSTRAINT valid_latitude CHECK (latitude BETWEEN -90 AND 90),
  CONSTRAINT valid_longitude CHECK (longitude BETWEEN -180 AND 180)
);

-- Create geofences table
CREATE TABLE IF NOT EXISTS geofences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  coordinates point[] NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bike_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE geofences ENABLE ROW LEVEL SECURITY;

-- Policies for bike_locations
CREATE POLICY "Anyone can read bike locations"
  ON bike_locations
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert bike locations"
  ON bike_locations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for geofences
CREATE POLICY "Anyone can read geofences"
  ON geofences
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can modify geofences"
  ON geofences
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@dehradunbikerentals.com'))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'admin@dehradunbikerentals.com'));

-- Insert default geofence for Dehradun
INSERT INTO geofences (name, coordinates, description)
VALUES (
  'Dehradun City Limits',
  ARRAY[
    point(30.378180, 77.975345),  -- Northeast
    point(30.378180, 78.132244),  -- Northwest
    point(30.266774, 78.132244),  -- Southwest
    point(30.266774, 77.975345)   -- Southeast
  ],
  'Main operational area covering Dehradun city and surrounding areas'
);