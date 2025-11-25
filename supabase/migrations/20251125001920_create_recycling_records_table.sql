/*
  # Create recycling records table
  
  1. New Tables
    - `recycling_records` - Stores all recycling activities by users
  2. Security
    - Enable RLS for user privacy
*/

CREATE TABLE IF NOT EXISTS recycling_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  material_type text NOT NULL,
  weight numeric NOT NULL,
  location text,
  points_earned integer NOT NULL DEFAULT 0,
  co2_saved numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recycling_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records"
  ON recycling_records FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert records"
  ON recycling_records FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
