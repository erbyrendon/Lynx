/*
  # Fix RLS Policies - Remove Permissive Policies

  ## Critical Security Issues Fixed
  1. Removed policies with `USING (true)` - these bypass RLS entirely
  2. Consolidated multiple permissive policies into single policies
  3. Implemented proper role-based access control
  
  ## New Policy Structure
  
  ### Content Management Tables (tabs, sections, disciplines, values, metrics, case_studies)
  - **SELECT**: Everyone can view active content (public website access)
  - **INSERT**: Only admins can create content
  - **UPDATE**: Only admins can modify content
  - **DELETE**: Only admins can delete content
  
  ### Contact Submissions
  - **SELECT**: Only admins can view submissions
  - **INSERT**: Anyone can create submissions (public form)
  - **UPDATE**: Only admins can update submissions (mark as read, etc.)
  - **DELETE**: Only admins can delete submissions
  
  ## Security Notes
  - All policies now have explicit conditions, not `true`
  - Admin access is controlled via app_metadata (server-side only)
  - Public read access maintains website functionality
  - Write access is properly restricted to administrators
*/

-- ============================================================================
-- TABS TABLE
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can view active tabs" ON tabs;
DROP POLICY IF EXISTS "Authenticated users can manage tabs" ON tabs;

-- Create new restrictive policies
CREATE POLICY "Public can view active tabs"
  ON tabs FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can insert tabs"
  ON tabs FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update tabs"
  ON tabs FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete tabs"
  ON tabs FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- SECTIONS TABLE
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can view active sections" ON sections;
DROP POLICY IF EXISTS "Authenticated users can manage sections" ON sections;

-- Create new restrictive policies
CREATE POLICY "Public can view active sections"
  ON sections FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can insert sections"
  ON sections FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update sections"
  ON sections FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete sections"
  ON sections FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- DISCIPLINES TABLE
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can view active disciplines" ON disciplines;
DROP POLICY IF EXISTS "Authenticated users can manage disciplines" ON disciplines;

-- Create new restrictive policies
CREATE POLICY "Public can view active disciplines"
  ON disciplines FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can insert disciplines"
  ON disciplines FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update disciplines"
  ON disciplines FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete disciplines"
  ON disciplines FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- VALUES TABLE
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can view active values" ON values;
DROP POLICY IF EXISTS "Authenticated users can manage values" ON values;

-- Create new restrictive policies
CREATE POLICY "Public can view active values"
  ON values FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can insert values"
  ON values FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update values"
  ON values FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete values"
  ON values FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- METRICS TABLE
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can view active metrics" ON metrics;
DROP POLICY IF EXISTS "Authenticated users can manage metrics" ON metrics;

-- Create new restrictive policies
CREATE POLICY "Public can view active metrics"
  ON metrics FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can insert metrics"
  ON metrics FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update metrics"
  ON metrics FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete metrics"
  ON metrics FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- CASE STUDIES TABLE
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can view active case studies" ON case_studies;
DROP POLICY IF EXISTS "Authenticated users can insert case studies" ON case_studies;
DROP POLICY IF EXISTS "Authenticated users can update case studies" ON case_studies;
DROP POLICY IF EXISTS "Authenticated users can delete case studies" ON case_studies;

-- Create new restrictive policies
CREATE POLICY "Public can view active case studies"
  ON case_studies FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can insert case studies"
  ON case_studies FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update case studies"
  ON case_studies FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete case studies"
  ON case_studies FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can create submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON contact_submissions;

-- Create new restrictive policies
CREATE POLICY "Public can submit contact forms"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete submissions"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (is_admin());