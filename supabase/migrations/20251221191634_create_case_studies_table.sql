/*
  # Create Case Studies Table

  1. New Tables
    - `case_studies`
      - `id` (uuid, primary key)
      - `company_name` (text) - Fictional company name
      - `industry` (text) - Industry/sector of the company
      - `service_provided` (text) - Services we provided
      - `challenge` (text) - Problem or challenge they faced
      - `solution` (text) - How we solved it
      - `results` (text) - Measurable outcomes achieved
      - `testimonial` (text) - Quote from company representative
      - `testimonial_author` (text) - Name and title of person quoted
      - `sort_order` (integer) - Display order
      - `is_active` (boolean) - Whether to display
      - `language` (text) - Language code (en/es)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `case_studies` table
    - Add policy for public read access
    - Add policy for authenticated admins to manage
*/

CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  industry text NOT NULL,
  service_provided text NOT NULL,
  challenge text NOT NULL,
  solution text NOT NULL,
  results text NOT NULL,
  testimonial text NOT NULL,
  testimonial_author text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active case studies"
  ON case_studies
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert case studies"
  ON case_studies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update case studies"
  ON case_studies
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete case studies"
  ON case_studies
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_case_studies_language ON case_studies(language);
CREATE INDEX IF NOT EXISTS idx_case_studies_active ON case_studies(is_active);
CREATE INDEX IF NOT EXISTS idx_case_studies_sort ON case_studies(sort_order);
