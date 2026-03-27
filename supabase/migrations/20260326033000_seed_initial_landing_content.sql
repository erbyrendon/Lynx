/*
  # Seed Initial Landing Content

  Adds baseline content so a fresh Supabase project renders a usable LYNX landing page
  immediately after migrations are applied.
*/

INSERT INTO tabs (title, slug, icon, description, sort_order, is_active, language)
VALUES
  ('Home', 'home', 'House', 'Landing overview and CTA', 1, true, 'en'),
  ('About', 'about', 'Eye', 'Brand positioning and philosophy', 2, true, 'en'),
  ('Story', 'story', 'BookOpen', 'Mission, vision, and manifesto', 3, true, 'en'),
  ('Services', 'services', 'Target', 'Core disciplines and offers', 4, true, 'en'),
  ('Values', 'values', 'Heart', 'Principles that guide delivery', 5, true, 'en'),
  ('Impact', 'impact', 'TrendingUp', 'Metrics and case studies', 6, true, 'en'),
  ('Solutions', 'solutions', 'Building2', 'Industry-specific systems', 7, true, 'en'),
  ('Specialized', 'specialized', 'Sparkles', 'High-touch delivery models', 8, true, 'en'),
  ('Contact', 'contact', 'Mail', 'Lead capture and consultation', 9, true, 'en'),
  ('Inicio', 'home', 'House', 'Resumen principal y llamada a la accion', 1, true, 'es'),
  ('Nosotros', 'about', 'Eye', 'Posicionamiento y filosofia de marca', 2, true, 'es'),
  ('Historia', 'story', 'BookOpen', 'Mision, vision y manifiesto', 3, true, 'es'),
  ('Servicios', 'services', 'Target', 'Disciplinas y ofertas principales', 4, true, 'es'),
  ('Valores', 'values', 'Heart', 'Principios que guian la entrega', 5, true, 'es'),
  ('Impacto', 'impact', 'TrendingUp', 'Metricas y casos de estudio', 6, true, 'es'),
  ('Soluciones', 'solutions', 'Building2', 'Sistemas por industria', 7, true, 'es'),
  ('Especializado', 'specialized', 'Sparkles', 'Modelos de entrega premium', 8, true, 'es'),
  ('Contacto', 'contact', 'Mail', 'Captacion de leads y consulta', 9, true, 'es')
ON CONFLICT (slug, language) DO UPDATE
SET
  title = EXCLUDED.title,
  icon = EXCLUDED.icon,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'AI Workflow Design',
  'We map bottlenecks and redesign operations into clear, automated flows.',
  'Workflow',
  '["Process discovery and optimization", "Automation blueprints by role", "Cross-team handoff mapping", "SOP design for repeatable delivery"]'::jsonb,
  1,
  true,
  'en'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'AI Workflow Design' AND language = 'en'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Client Acquisition Systems',
  'Landing pages, lead capture, and follow-up systems built for conversion.',
  'Target',
  '["Lead magnets and qualification forms", "CRM handoff automation", "Follow-up email and SMS sequences", "Pipeline visibility for sales teams"]'::jsonb,
  2,
  true,
  'en'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Client Acquisition Systems' AND language = 'en'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Operations Automation',
  'We remove repetitive admin work so teams move faster with fewer errors.',
  'Cog',
  '["Task routing and escalation logic", "Internal notifications and approvals", "Data sync between tools", "Automated status reporting"]'::jsonb,
  3,
  true,
  'en'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Operations Automation' AND language = 'en'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Knowledge Systems',
  'Centralized information architecture for training, support, and decision-making.',
  'Database',
  '["Internal knowledge bases", "Searchable documentation hubs", "Client education portals", "Structured content governance"]'::jsonb,
  4,
  true,
  'en'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Knowledge Systems' AND language = 'en'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Conversion-Focused Web Experiences',
  'High-trust digital experiences that align brand clarity with measurable outcomes.',
  'MonitorSmartphone',
  '["Offer positioning and page structure", "Trust-building proof blocks", "Consultation booking flows", "Analytics-ready conversion tracking"]'::jsonb,
  5,
  true,
  'en'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Conversion-Focused Web Experiences' AND language = 'en'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Diseno de Flujos con IA',
  'Mapeamos cuellos de botella y redisenamos operaciones en flujos claros y automatizados.',
  'Workflow',
  '["Descubrimiento y optimizacion de procesos", "Blueprints de automatizacion por rol", "Mapeo de handoffs entre equipos", "SOP para entrega repetible"]'::jsonb,
  1,
  true,
  'es'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Diseno de Flujos con IA' AND language = 'es'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Sistemas de Adquisicion de Clientes',
  'Landing pages, captacion de leads y seguimiento construidos para convertir.',
  'Target',
  '["Lead magnets y formularios de calificacion", "Automatizacion hacia CRM", "Secuencias de seguimiento por email y SMS", "Visibilidad del pipeline comercial"]'::jsonb,
  2,
  true,
  'es'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Sistemas de Adquisicion de Clientes' AND language = 'es'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Automatizacion Operativa',
  'Eliminamos trabajo administrativo repetitivo para que los equipos avancen con menos errores.',
  'Cog',
  '["Enrutamiento y escalamiento de tareas", "Notificaciones y aprobaciones internas", "Sincronizacion de datos entre herramientas", "Reportes automaticos de estado"]'::jsonb,
  3,
  true,
  'es'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Automatizacion Operativa' AND language = 'es'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Sistemas de Conocimiento',
  'Arquitectura de informacion centralizada para capacitacion, soporte y toma de decisiones.',
  'Database',
  '["Bases de conocimiento internas", "Centros de documentacion consultables", "Portales de educacion para clientes", "Gobierno estructurado de contenido"]'::jsonb,
  4,
  true,
  'es'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Sistemas de Conocimiento' AND language = 'es'
);

INSERT INTO disciplines (title, subtitle, icon, features, sort_order, is_active, language)
SELECT
  'Experiencias Web Orientadas a Conversion',
  'Experiencias digitales de alta confianza que alinean claridad de marca con resultados medibles.',
  'MonitorSmartphone',
  '["Posicionamiento de oferta y estructura de pagina", "Bloques de prueba y confianza", "Flujos de agendamiento de consulta", "Seguimiento de conversion listo para analitica"]'::jsonb,
  5,
  true,
  'es'
WHERE NOT EXISTS (
  SELECT 1 FROM disciplines WHERE title = 'Experiencias Web Orientadas a Conversion' AND language = 'es'
);

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Respect', 'Every interaction builds trust.', 'We design systems that respect user time, attention, and privacy.', 'Handshake', 1, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Respect' AND language = 'en');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Responsibility', 'We own every outcome.', 'From implementation to iteration, we stay accountable for what ships.', 'Shield', 2, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Responsibility' AND language = 'en');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Efficiency', 'We refine until only clarity remains.', 'Each workflow is simplified until the team can move without friction.', 'Gauge', 3, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Efficiency' AND language = 'en');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Innovation', 'We evolve faster than the system.', 'We prototype, measure, and improve instead of staying static.', 'Lightbulb', 4, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Innovation' AND language = 'en');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Perspicacity', 'We see what others overlook.', 'We identify the hidden constraint that changes the entire workflow.', 'Eye', 5, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Perspicacity' AND language = 'en');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Respeto', 'Cada interaccion construye confianza.', 'Disenamos sistemas que respetan el tiempo, la atencion y la privacidad del usuario.', 'Handshake', 1, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Respeto' AND language = 'es');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Responsabilidad', 'Somos duenos de cada resultado.', 'Desde la implementacion hasta la iteracion, asumimos responsabilidad por lo que se entrega.', 'Shield', 2, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Responsabilidad' AND language = 'es');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Eficiencia', 'Refinamos hasta que solo queda claridad.', 'Cada flujo se simplifica hasta que el equipo puede avanzar sin friccion.', 'Gauge', 3, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Eficiencia' AND language = 'es');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Innovacion', 'Evolucionamos mas rapido que el sistema.', 'Prototipamos, medimos y mejoramos en lugar de quedarnos estaticos.', 'Lightbulb', 4, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Innovacion' AND language = 'es');

INSERT INTO values (title, description, example, icon, sort_order, is_active, language)
SELECT 'Perspicacia', 'Vemos lo que otros pasan por alto.', 'Identificamos la restriccion oculta que cambia todo el flujo de trabajo.', 'Eye', 5, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM values WHERE title = 'Perspicacia' AND language = 'es');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Average reduction in repetitive admin work', 38, '%', 'Clock3', 1, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Average reduction in repetitive admin work' AND language = 'en');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Increase in qualified inbound leads', 27, '%', 'TrendingUp', 2, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Increase in qualified inbound leads' AND language = 'en');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Hours recovered per team each week', 16, 'h', 'Zap', 3, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Hours recovered per team each week' AND language = 'en');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Core workflows automated in new client engagements', 12, '+', 'Bot', 4, true, 'en'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Core workflows automated in new client engagements' AND language = 'en');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Reduccion promedio en trabajo administrativo repetitivo', 38, '%', 'Clock3', 1, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Reduccion promedio en trabajo administrativo repetitivo' AND language = 'es');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Incremento en leads entrantes calificados', 27, '%', 'TrendingUp', 2, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Incremento en leads entrantes calificados' AND language = 'es');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Horas recuperadas por equipo cada semana', 16, 'h', 'Zap', 3, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Horas recuperadas por equipo cada semana' AND language = 'es');

INSERT INTO metrics (label, value, suffix, icon, sort_order, is_active, language)
SELECT 'Flujos principales automatizados en nuevas implementaciones', 12, '+', 'Bot', 4, true, 'es'
WHERE NOT EXISTS (SELECT 1 FROM metrics WHERE label = 'Flujos principales automatizados en nuevas implementaciones' AND language = 'es');

INSERT INTO case_studies (company_name, industry, service_provided, challenge, solution, results, testimonial, testimonial_author, sort_order, is_active, language)
SELECT
  'Northline Studio',
  'Creative Services',
  'Lead capture, qualification, and client onboarding automation',
  'The team was losing leads between Instagram DMs, email, and manual intake forms.',
  'We consolidated inbound requests into a single pipeline with automated qualification and booking.',
  'Response time dropped by 62% and weekly booked consultations increased by 34%.',
  'The system made our studio feel organized overnight. We stopped chasing admin and started closing better clients.',
  'Operations Lead, Northline Studio',
  1,
  true,
  'en'
WHERE NOT EXISTS (
  SELECT 1 FROM case_studies WHERE company_name = 'Northline Studio' AND language = 'en'
);

INSERT INTO case_studies (company_name, industry, service_provided, challenge, solution, results, testimonial, testimonial_author, sort_order, is_active, language)
SELECT
  'Velora Clinic',
  'Medical & Aesthetic',
  'Appointment workflows, intake automation, and patient education funnel',
  'Patient inquiries were increasing, but scheduling and pre-visit education were handled manually.',
  'We built a streamlined intake and scheduling flow with automated reminders and treatment education.',
  'No-show rate fell by 21% and front-desk admin time dropped by 11 hours per week.',
  'We now give patients a premium experience before they even walk through the door.',
  'Director, Velora Clinic',
  2,
  true,
  'en'
WHERE NOT EXISTS (
  SELECT 1 FROM case_studies WHERE company_name = 'Velora Clinic' AND language = 'en'
);

INSERT INTO case_studies (company_name, industry, service_provided, challenge, solution, results, testimonial, testimonial_author, sort_order, is_active, language)
SELECT
  'Northline Studio',
  'Servicios Creativos',
  'Captacion de leads, calificacion y automatizacion de onboarding',
  'El equipo perdia leads entre mensajes de Instagram, correo y formularios manuales.',
  'Consolidamos las solicitudes entrantes en un solo pipeline con calificacion y reservas automatizadas.',
  'El tiempo de respuesta bajo 62% y las consultas agendadas por semana crecieron 34%.',
  'El sistema hizo que nuestro estudio se sintiera organizado de un dia para otro. Dejamos de perseguir admin y empezamos a cerrar mejores clientes.',
  'Lider de Operaciones, Northline Studio',
  1,
  true,
  'es'
WHERE NOT EXISTS (
  SELECT 1 FROM case_studies WHERE company_name = 'Northline Studio' AND language = 'es'
);

INSERT INTO case_studies (company_name, industry, service_provided, challenge, solution, results, testimonial, testimonial_author, sort_order, is_active, language)
SELECT
  'Velora Clinic',
  'Clinica Medica y Estetica',
  'Flujos de citas, automatizacion de admision y educacion del paciente',
  'Las consultas aumentaban, pero la agenda y la educacion previa a la cita se hacian de forma manual.',
  'Construimos un flujo de admision y agendamiento con recordatorios y educacion automatizada.',
  'La tasa de no asistencia bajo 21% y el tiempo administrativo de recepcion se redujo 11 horas por semana.',
  'Ahora ofrecemos una experiencia premium antes de que el paciente cruce la puerta.',
  'Directora, Velora Clinic',
  2,
  true,
  'es'
WHERE NOT EXISTS (
  SELECT 1 FROM case_studies WHERE company_name = 'Velora Clinic' AND language = 'es'
);