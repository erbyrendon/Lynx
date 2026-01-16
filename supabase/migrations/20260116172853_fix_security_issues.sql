/*
  # Fix Security Issues
  
  ## Issues Addressed
  
  1. **Unindexed Foreign Keys**
     - Recreate index on sections.tab_id to ensure it's properly covering the foreign key
  
  2. **Function Search Path Mutable**
     - Fix is_admin() function to have an immutable search_path
     - Add explicit search_path setting for security
  
  3. **RLS Policy Always True**
     - Replace unrestricted contact_submissions INSERT policy with validation
     - Ensure required fields (name, email, business, message) are not empty
     - Add basic email format validation
  
  ## Security Improvements
  
  - Function now has stable search_path to prevent schema hijacking
  - Contact form submissions require valid data to prevent spam/junk entries
  - Foreign key index ensures optimal query performance
  
  ## Note on Auth DB Connection Strategy
  
  The Auth DB Connection Strategy issue must be fixed in Supabase Dashboard:
  1. Go to Project Settings > Database
  2. Find "Connection Pooling" section
  3. Change Auth server connection strategy from fixed number to percentage-based
*/

-- ============================================================================
-- FIX 1: Recreate index on sections.tab_id (foreign key)
-- ============================================================================

-- Drop and recreate the index to ensure proper coverage
DROP INDEX IF EXISTS idx_sections_tab_id;
CREATE INDEX idx_sections_tab_id ON sections(tab_id);

-- ============================================================================
-- FIX 2: Fix is_admin() function search path
-- ============================================================================

-- Recreate function with stable search_path
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
END;
$$;

-- ============================================================================
-- FIX 3: Fix contact_submissions RLS policy to validate data
-- ============================================================================

-- Drop the existing unrestricted policy
DROP POLICY IF EXISTS "Public can submit contact forms" ON contact_submissions;

-- Create new policy with validation checks
CREATE POLICY "Public can submit contact forms"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (
    -- Ensure required fields are not empty or whitespace
    name IS NOT NULL AND trim(name) != '' AND
    email IS NOT NULL AND trim(email) != '' AND
    business IS NOT NULL AND trim(business) != '' AND
    message IS NOT NULL AND trim(message) != '' AND
    -- Basic email format validation
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    -- Reasonable length limits to prevent abuse
    length(name) <= 100 AND
    length(email) <= 255 AND
    length(business) <= 200 AND
    length(message) <= 5000
  );
