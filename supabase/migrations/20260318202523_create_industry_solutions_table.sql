/*
  # Create Industry Solutions Table

  1. New Tables
    - `industry_solutions`
      - `id` (uuid, primary key) - Unique identifier
      - `slug` (text) - URL slug for the industry (e.g., 'tattoo-studios')
      - `name` (text) - Industry name
      - `description` (text) - Short description for card display
      - `long_description` (text) - Detailed description for landing page
      - `icon` (text) - Lucide icon name
      - `features` (jsonb) - Array of features/benefits
      - `language` (text) - Language code (en/es)
      - `sort_order` (integer) - Display order
      - `is_active` (boolean) - Whether to display this industry
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `industry_solutions` table
    - Add policy for public read access (active solutions only)
    - Add policy for authenticated read access (all solutions)

  3. Indexes
    - Index on slug and language for fast lookups
    - Index on sort_order for ordering
    
  4. Initial Data
    - Tattoo Studios (en/es)
    - Medical & Aesthetic Clinics (en/es)
    - Service-Based Businesses (en/es)
*/

CREATE TABLE IF NOT EXISTS industry_solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  long_description text,
  icon text DEFAULT 'Building2',
  features jsonb DEFAULT '[]'::jsonb,
  language text DEFAULT 'en',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(slug, language)
);

CREATE INDEX IF NOT EXISTS idx_industry_solutions_slug_language ON industry_solutions(slug, language);
CREATE INDEX IF NOT EXISTS idx_industry_solutions_sort_order ON industry_solutions(sort_order);

ALTER TABLE industry_solutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read active industry solutions"
  ON industry_solutions
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Allow authenticated to read all industry solutions"
  ON industry_solutions
  FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO industry_solutions (slug, name, description, long_description, icon, features, language, sort_order) VALUES
('tattoo-studios', 'Tattoo Studios', 'Systems for managing bookings, showcasing portfolios, and structuring client flow.', 'We design complete digital ecosystems for tattoo studios that streamline every aspect of your operation. From portfolio presentation to booking management, our systems help you focus on your art while we handle the logistics.', 'Palette', '["Online booking with deposit management", "Portfolio galleries with filtering", "Client consultation forms", "Automated appointment reminders", "Aftercare instruction delivery", "Review collection systems"]', 'en', 1),
('medical-clinics', 'Medical & Aesthetic Clinics', 'Websites and systems designed to build trust, manage appointments, and educate patients.', 'Healthcare requires trust. Our systems for medical and aesthetic clinics combine professional presentation with practical functionality—appointment scheduling, patient education, and compliance-ready interfaces that reflect the quality of your care.', 'Heart', '["HIPAA-conscious design patterns", "Patient portal integration", "Treatment information libraries", "Before/after galleries", "Appointment scheduling with intake forms", "Automated follow-up sequences"]', 'en', 2),
('service-businesses', 'Service-Based Businesses', 'CRM, automation, and lead management systems to organize client acquisition and operations.', 'Service businesses thrive on relationships and efficiency. We build systems that capture leads, nurture prospects, and manage clients—all while automating the repetitive tasks that slow you down.', 'Briefcase', '["Lead capture and qualification", "CRM integration and setup", "Automated follow-up sequences", "Proposal and invoice automation", "Client onboarding workflows", "Performance dashboards"]', 'en', 3),
('tattoo-studios', 'Estudios de Tatuajes', 'Sistemas para gestionar reservas, mostrar portafolios y estructurar el flujo de clientes.', 'Diseñamos ecosistemas digitales completos para estudios de tatuajes que optimizan cada aspecto de tu operación. Desde la presentación del portafolio hasta la gestión de reservas, nuestros sistemas te ayudan a enfocarte en tu arte mientras nosotros manejamos la logística.', 'Palette', '["Reservas en línea con gestión de depósitos", "Galerías de portafolio con filtros", "Formularios de consulta para clientes", "Recordatorios automáticos de citas", "Entrega de instrucciones de cuidado posterior", "Sistemas de recolección de reseñas"]', 'es', 1),
('medical-clinics', 'Clínicas Médicas y Estéticas', 'Sitios web y sistemas diseñados para generar confianza, gestionar citas y educar pacientes.', 'La atención médica requiere confianza. Nuestros sistemas para clínicas médicas y estéticas combinan una presentación profesional con funcionalidad práctica—programación de citas, educación del paciente e interfaces que reflejan la calidad de tu atención.', 'Heart', '["Patrones de diseño conscientes de HIPAA", "Integración de portal de pacientes", "Bibliotecas de información de tratamientos", "Galerías de antes/después", "Programación de citas con formularios de admisión", "Secuencias de seguimiento automatizadas"]', 'es', 2),
('service-businesses', 'Negocios de Servicios', 'CRM, automatización y sistemas de gestión de leads para organizar la adquisición de clientes y operaciones.', 'Los negocios de servicios prosperan con relaciones y eficiencia. Construimos sistemas que capturan leads, nutren prospectos y gestionan clientes—todo mientras automatizamos las tareas repetitivas que te ralentizan.', 'Briefcase', '["Captura y calificación de leads", "Integración y configuración de CRM", "Secuencias de seguimiento automatizadas", "Automatización de propuestas y facturas", "Flujos de incorporación de clientes", "Paneles de rendimiento"]', 'es', 3)
ON CONFLICT (slug, language) DO NOTHING;