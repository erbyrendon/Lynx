import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Tab {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

export interface Discipline {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  features: string[];
  sort_order: number;
  is_active: boolean;
}

export interface Value {
  id: string;
  title: string;
  description: string;
  example: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

export interface ContactSubmission {
  name: string;
  email: string;
  business: string;
  message: string;
}

export interface CaseStudy {
  id: string;
  company_name: string;
  industry: string;
  service_provided: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial: string;
  testimonial_author: string;
  sort_order: number;
  is_active: boolean;
  language: string;
}
