/*
  # Update recycling records RLS policies
  
  1. Changes
    - Add policy for admins to view all recycling records
    - Keep existing user policies for individual access
  
  2. Security
    - Users can still only view their own records
    - Admins can view all records for reporting
    - Enforce data isolation for non-admin users
*/

DROP POLICY IF EXISTS "Admins can view all records" ON recycling_records;

CREATE POLICY "Admins can view all records"
  ON recycling_records FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );
