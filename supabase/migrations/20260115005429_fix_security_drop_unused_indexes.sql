/*
  # Drop Unused Database Indexes

  ## Changes
  This migration removes unused indexes that are not providing value and consuming resources.
  
  ## Dropped Indexes
  1. Content Management Tables:
     - `idx_tabs_language` - Language filtering on tabs
     - `idx_tabs_sort_order` - Sort order on tabs
     - `idx_tabs_slug` - Slug lookup on tabs
     - `idx_disciplines_language` - Language filtering on disciplines
     - `idx_disciplines_sort_order` - Sort order on disciplines
     - `idx_values_language` - Language filtering on values
     - `idx_values_sort_order` - Sort order on values
     - `idx_metrics_language` - Language filtering on metrics
     - `idx_metrics_sort_order` - Sort order on metrics
     - `idx_sections_tab_id` - Tab lookup on sections
     - `idx_sections_sort_order` - Sort order on sections
  
  2. Case Studies Table:
     - `idx_case_studies_active` - Active status filtering
     - `idx_case_studies_sort` - Sort order
  
  3. Contact Submissions Table:
     - `idx_contact_submissions_status` - Status filtering
     - `idx_contact_submissions_created_at` - Creation date sorting
  
  ## Notes
  - These indexes can be recreated in the future if query patterns change
  - Monitor query performance after this migration
*/

-- Drop unused indexes on tabs table
DROP INDEX IF EXISTS idx_tabs_language;
DROP INDEX IF EXISTS idx_tabs_sort_order;
DROP INDEX IF EXISTS idx_tabs_slug;

-- Drop unused indexes on sections table
DROP INDEX IF EXISTS idx_sections_tab_id;
DROP INDEX IF EXISTS idx_sections_sort_order;

-- Drop unused indexes on disciplines table
DROP INDEX IF EXISTS idx_disciplines_language;
DROP INDEX IF EXISTS idx_disciplines_sort_order;

-- Drop unused indexes on values table
DROP INDEX IF EXISTS idx_values_language;
DROP INDEX IF EXISTS idx_values_sort_order;

-- Drop unused indexes on metrics table
DROP INDEX IF EXISTS idx_metrics_language;
DROP INDEX IF EXISTS idx_metrics_sort_order;

-- Drop unused indexes on case_studies table
DROP INDEX IF EXISTS idx_case_studies_active;
DROP INDEX IF EXISTS idx_case_studies_sort;

-- Drop unused indexes on contact_submissions table
DROP INDEX IF EXISTS idx_contact_submissions_status;
DROP INDEX IF EXISTS idx_contact_submissions_created_at;