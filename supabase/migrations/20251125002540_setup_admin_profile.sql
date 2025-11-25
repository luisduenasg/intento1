/*
  # Setup admin profile table reference
  
  This ensures we have the necessary RLS policies for admin access
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'recycling_records' AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE recycling_records 
    ADD CONSTRAINT fk_recycling_records_user 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE POLICY "Admin can view all records"
  ON recycling_records FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admin can delete records"
  ON recycling_records FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );
