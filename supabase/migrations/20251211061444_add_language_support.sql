/*
  # Add Multi-Language Support

  ## Overview
  This migration adds language support to enable Spanish translations for all content.

  ## Changes
  
  ### Table Modifications
  - Add `language` column to all content tables (tabs, disciplines, values, metrics)
  - Default language is 'en' (English)
  - Supported languages: 'en', 'es' (Spanish)
  
  ### Indexes
  - Add composite indexes for efficient language-based queries
  - Index on (language, is_active, sort_order) for performance

  ## Notes
  - Existing English content remains unchanged
  - Spanish translations will be inserted separately
  - Language selection will be client-side state management
*/

-- Add language column to tabs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tabs' AND column_name = 'language'
  ) THEN
    ALTER TABLE tabs ADD COLUMN language text DEFAULT 'en' NOT NULL;
  END IF;
END $$;

-- Add language column to disciplines table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'disciplines' AND column_name = 'language'
  ) THEN
    ALTER TABLE disciplines ADD COLUMN language text DEFAULT 'en' NOT NULL;
  END IF;
END $$;

-- Add language column to values table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'values' AND column_name = 'language'
  ) THEN
    ALTER TABLE values ADD COLUMN language text DEFAULT 'en' NOT NULL;
  END IF;
END $$;

-- Add language column to metrics table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'metrics' AND column_name = 'language'
  ) THEN
    ALTER TABLE metrics ADD COLUMN language text DEFAULT 'en' NOT NULL;
  END IF;
END $$;

-- Create indexes for language-based queries
CREATE INDEX IF NOT EXISTS idx_tabs_language ON tabs(language, is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_disciplines_language ON disciplines(language, is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_values_language ON values(language, is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_metrics_language ON metrics(language, is_active, sort_order);