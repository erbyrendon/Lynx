/*
  # Create Admin Role System

  ## Changes
  This migration creates a secure admin role system using Supabase's app_metadata.
  
  ## Components
  1. Helper Function:
     - `is_admin()` - Checks if the current user has admin role in app_metadata
  
  ## Security
  - Uses auth.jwt() to read app_metadata securely
  - App_metadata can only be set server-side, not by users
  - Provides foundation for role-based access control
  
  ## Usage
  To grant admin access to a user, update their app_metadata:
  ```sql
  UPDATE auth.users 
  SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
  WHERE email = 'admin@example.com';
  ```
*/

-- Create function to check if current user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
END;
$$;