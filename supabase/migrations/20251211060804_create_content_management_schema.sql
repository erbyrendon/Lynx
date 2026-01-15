/*
  # Content Management System for LYNX Landing Page

  ## Overview
  This migration creates a comprehensive database schema for managing all website content
  through an admin interface, enabling dynamic content updates without code changes.

  ## New Tables
  
  ### `tabs`
  Manages the main navigation tabs on the landing page
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Tab display name
  - `slug` (text, unique) - URL-friendly identifier
  - `icon` (text) - Lucide icon name
  - `description` (text) - Tab description
  - `sort_order` (integer) - Display order
  - `is_active` (boolean) - Visibility toggle
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `sections`
  Stores content sections displayed within tabs
  - `id` (uuid, primary key) - Unique identifier
  - `tab_id` (uuid, foreign key) - Associated tab
  - `title` (text) - Section heading
  - `subtitle` (text) - Section subheading
  - `content` (text) - Main content (supports markdown)
  - `section_type` (text) - Type of section (hero, text, grid, list)
  - `sort_order` (integer) - Display order within tab
  - `is_active` (boolean) - Visibility toggle
  - `metadata` (jsonb) - Flexible data storage
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `disciplines`
  Stores service/discipline offerings
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Discipline name
  - `subtitle` (text) - Brief description
  - `icon` (text) - Lucide icon name
  - `features` (jsonb) - Array of feature descriptions
  - `sort_order` (integer) - Display order
  - `is_active` (boolean) - Visibility toggle
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `values`
  Stores company values and principles
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Value name
  - `description` (text) - Value description
  - `example` (text) - Practical example
  - `icon` (text) - Lucide icon name
  - `sort_order` (integer) - Display order
  - `is_active` (boolean) - Visibility toggle
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `metrics`
  Stores impact metrics and proof points
  - `id` (uuid, primary key) - Unique identifier
  - `label` (text) - Metric description
  - `value` (integer) - Numeric value
  - `suffix` (text) - Unit suffix (%, x, etc.)
  - `icon` (text) - Lucide icon name
  - `sort_order` (integer) - Display order
  - `is_active` (boolean) - Visibility toggle
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `contact_submissions`
  Stores form submissions from the contact page
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Submitter name
  - `email` (text) - Contact email
  - `business` (text) - Business name
  - `message` (text) - Message content
  - `status` (text) - Processing status (new, read, responded)
  - `created_at` (timestamptz) - Submission timestamp
  - `responded_at` (timestamptz) - Response timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for content tables
  - Authenticated write access for admin users
  - Contact submissions readable by authenticated users only

  ## Notes
  - All content is version-controlled via updated_at timestamps
  - JSONB fields provide flexibility for future enhancements
  - Sort order fields enable drag-and-drop admin interfaces
*/

-- Create tabs table
CREATE TABLE IF NOT EXISTS tabs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text NOT NULL,
  description text DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tab_id uuid REFERENCES tabs(id) ON DELETE CASCADE,
  title text NOT NULL,
  subtitle text DEFAULT '',
  content text DEFAULT '',
  section_type text NOT NULL DEFAULT 'text',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create disciplines table
CREATE TABLE IF NOT EXISTS disciplines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text DEFAULT '',
  icon text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create values table
CREATE TABLE IF NOT EXISTS values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  example text DEFAULT '',
  icon text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value integer NOT NULL DEFAULT 0,
  suffix text DEFAULT '',
  icon text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  business text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  responded_at timestamptz
);

-- Enable RLS on all tables
ALTER TABLE tabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE disciplines ENABLE ROW LEVEL SECURITY;
ALTER TABLE values ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for tabs (public read, authenticated write)
CREATE POLICY "Anyone can view active tabs"
  ON tabs FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage tabs"
  ON tabs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for sections (public read, authenticated write)
CREATE POLICY "Anyone can view active sections"
  ON sections FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage sections"
  ON sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for disciplines (public read, authenticated write)
CREATE POLICY "Anyone can view active disciplines"
  ON disciplines FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage disciplines"
  ON disciplines FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for values (public read, authenticated write)
CREATE POLICY "Anyone can view active values"
  ON values FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage values"
  ON values FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for metrics (public read, authenticated write)
CREATE POLICY "Anyone can view active metrics"
  ON metrics FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage metrics"
  ON metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for contact_submissions (authenticated read/write)
CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create submissions"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tabs_sort_order ON tabs(sort_order);
CREATE INDEX IF NOT EXISTS idx_tabs_slug ON tabs(slug);
CREATE INDEX IF NOT EXISTS idx_sections_tab_id ON sections(tab_id);
CREATE INDEX IF NOT EXISTS idx_sections_sort_order ON sections(sort_order);
CREATE INDEX IF NOT EXISTS idx_disciplines_sort_order ON disciplines(sort_order);
CREATE INDEX IF NOT EXISTS idx_values_sort_order ON values(sort_order);
CREATE INDEX IF NOT EXISTS idx_metrics_sort_order ON metrics(sort_order);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);