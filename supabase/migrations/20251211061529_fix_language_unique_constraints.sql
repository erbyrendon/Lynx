/*
  # Fix Language Unique Constraints

  ## Overview
  Updates unique constraints to support multiple languages with same slugs.

  ## Changes
  - Drop unique constraint on tabs.slug
  - Add composite unique constraint on (slug, language)
  - This allows same slug for different languages (e.g., 'home' for both 'en' and 'es')

  ## Notes
  - Enables proper multi-language support
  - Each language can have the same slug structure
*/

-- Drop the existing unique constraint on slug
ALTER TABLE tabs DROP CONSTRAINT IF EXISTS tabs_slug_key;

-- Add composite unique constraint on slug and language
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'tabs_slug_language_key'
  ) THEN
    ALTER TABLE tabs ADD CONSTRAINT tabs_slug_language_key UNIQUE (slug, language);
  END IF;
END $$;