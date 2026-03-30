import type { CaseStudy, Discipline, Metric, Tab, Value } from './supabase';

type Language = 'en' | 'es';

export interface IndustrySolutionLocal {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string;
  icon: string;
  features: string[];
}

export function getLocalTabs(language: Language): Tab[] {
  const tabs: Record<Language, Tab[]> = {
    en: [
      { id: 'tab-home', title: 'Home', slug: 'home', icon: 'House', description: '', sort_order: 1, is_active: true },
      { id: 'tab-about', title: 'About', slug: 'about', icon: 'Sparkles', description: '', sort_order: 2, is_active: true },
      { id: 'tab-story', title: 'Story', slug: 'story', icon: 'BookOpen', description: '', sort_order: 3, is_active: true },
      { id: 'tab-services', title: 'Services', slug: 'services', icon: 'Layers', description: '', sort_order: 4, is_active: true },
      { id: 'tab-values', title: 'Values', slug: 'values', icon: 'ShieldCheck', description: '', sort_order: 5, is_active: true },
      { id: 'tab-proof', title: 'Proof', slug: 'proof', icon: 'Briefcase', description: '', sort_order: 6, is_active: true },
      { id: 'tab-impact', title: 'Impact', slug: 'impact', icon: 'BarChart3', description: '', sort_order: 7, is_active: true },
      { id: 'tab-solutions', title: 'Solutions', slug: 'solutions', icon: 'Building2', description: '', sort_order: 8, is_active: true },
      { id: 'tab-specialized', title: 'Specialized', slug: 'specialized', icon: 'Target', description: '', sort_order: 9, is_active: true },
      { id: 'tab-contact', title: 'Contact', slug: 'contact', icon: 'Send', description: '', sort_order: 10, is_active: true },
    ],
    es: [
      { id: 'tab-home', title: 'Inicio', slug: 'home', icon: 'House', description: '', sort_order: 1, is_active: true },
      { id: 'tab-about', title: 'Nosotros', slug: 'about', icon: 'Sparkles', description: '', sort_order: 2, is_active: true },
      { id: 'tab-story', title: 'Historia', slug: 'story', icon: 'BookOpen', description: '', sort_order: 3, is_active: true },
      { id: 'tab-services', title: 'Servicios', slug: 'services', icon: 'Layers', description: '', sort_order: 4, is_active: true },
      { id: 'tab-values', title: 'Valores', slug: 'values', icon: 'ShieldCheck', description: '', sort_order: 5, is_active: true },
      { id: 'tab-proof', title: 'Prueba', slug: 'proof', icon: 'Briefcase', description: '', sort_order: 6, is_active: true },
      { id: 'tab-impact', title: 'Impacto', slug: 'impact', icon: 'BarChart3', description: '', sort_order: 7, is_active: true },
      { id: 'tab-solutions', title: 'Soluciones', slug: 'solutions', icon: 'Building2', description: '', sort_order: 8, is_active: true },
      { id: 'tab-specialized', title: 'Especializado', slug: 'specialized', icon: 'Target', description: '', sort_order: 9, is_active: true },
      { id: 'tab-contact', title: 'Contacto', slug: 'contact', icon: 'Send', description: '', sort_order: 10, is_active: true },
    ],
  };

  return tabs[language];
}

export function getLocalDisciplines(language: Language): Discipline[] {
  const disciplines: Record<Language, Discipline[]> = {
    en: [
      {
        id: 'disc-1',
        title: 'Workflow Automation',
        subtitle: 'Automate repetitive tasks and approvals.',
        icon: 'Workflow',
        features: ['Task routing', 'Conditional logic', 'Approval flows'],
        sort_order: 1,
        is_active: true,
      },
      {
        id: 'disc-2',
        title: 'System Integration',
        subtitle: 'Connect tools into one operational system.',
        icon: 'PlugZap',
        features: ['CRM + Forms', 'Email + Notifications', 'API integrations'],
        sort_order: 2,
        is_active: true,
      },
      {
        id: 'disc-3',
        title: 'AI Assistance',
        subtitle: 'Practical assistants for sales and support.',
        icon: 'Bot',
        features: ['Lead qualification', 'FAQ assistant', 'Triage and handoff'],
        sort_order: 3,
        is_active: true,
      },
      {
        id: 'disc-4',
        title: 'Data Intelligence',
        subtitle: 'Dashboards for better decisions.',
        icon: 'BarChart3',
        features: ['Custom KPIs', 'Operations visibility', 'Performance tracking'],
        sort_order: 4,
        is_active: true,
      },
      {
        id: 'disc-5',
        title: 'Digital Operations',
        subtitle: 'Structure your process end to end.',
        icon: 'Network',
        features: ['Standardized process', 'SOP execution', 'Quality control'],
        sort_order: 5,
        is_active: true,
      },
    ],
    es: [
      {
        id: 'disc-1',
        title: 'Automatizacion de Flujos',
        subtitle: 'Automatiza tareas repetitivas y aprobaciones.',
        icon: 'Workflow',
        features: ['Ruteo de tareas', 'Logica condicional', 'Flujos de aprobacion'],
        sort_order: 1,
        is_active: true,
      },
      {
        id: 'disc-2',
        title: 'Integracion de Sistemas',
        subtitle: 'Conecta herramientas en un solo sistema.',
        icon: 'PlugZap',
        features: ['CRM + Formularios', 'Email + Notificaciones', 'Integraciones API'],
        sort_order: 2,
        is_active: true,
      },
      {
        id: 'disc-3',
        title: 'Asistencia con IA',
        subtitle: 'Asistentes practicos para ventas y soporte.',
        icon: 'Bot',
        features: ['Calificacion de leads', 'Asistente de FAQ', 'Derivacion inteligente'],
        sort_order: 3,
        is_active: true,
      },
      {
        id: 'disc-4',
        title: 'Inteligencia de Datos',
        subtitle: 'Paneles para mejores decisiones.',
        icon: 'BarChart3',
        features: ['KPIs personalizados', 'Visibilidad operativa', 'Seguimiento de rendimiento'],
        sort_order: 4,
        is_active: true,
      },
      {
        id: 'disc-5',
        title: 'Operaciones Digitales',
        subtitle: 'Estructura tu proceso de punta a punta.',
        icon: 'Network',
        features: ['Proceso estandarizado', 'Ejecucion de SOP', 'Control de calidad'],
        sort_order: 5,
        is_active: true,
      },
    ],
  };

  return disciplines[language];
}

export function getLocalValues(language: Language): Value[] {
  const values: Record<Language, Value[]> = {
    en: [
      { id: 'val-1', title: 'Respect', description: 'Every interaction builds trust.', example: 'Clear communication in every step.', icon: 'HeartHandshake', sort_order: 1, is_active: true },
      { id: 'val-2', title: 'Responsibility', description: 'We own every outcome.', example: 'We measure and improve continuously.', icon: 'ShieldCheck', sort_order: 2, is_active: true },
      { id: 'val-3', title: 'Efficiency', description: 'We refine until clarity remains.', example: 'Less manual work, more focused effort.', icon: 'Gauge', sort_order: 3, is_active: true },
      { id: 'val-4', title: 'Innovation', description: 'We evolve faster than the system.', example: 'Test, learn, and adapt quickly.', icon: 'Lightbulb', sort_order: 4, is_active: true },
      { id: 'val-5', title: 'Perspicacity', description: 'We see what others overlook.', example: 'Find bottlenecks before they scale.', icon: 'Eye', sort_order: 5, is_active: true },
    ],
    es: [
      { id: 'val-1', title: 'Respeto', description: 'Cada interaccion construye confianza.', example: 'Comunicacion clara en cada paso.', icon: 'HeartHandshake', sort_order: 1, is_active: true },
      { id: 'val-2', title: 'Responsabilidad', description: 'Nos hacemos cargo de cada resultado.', example: 'Medimos y mejoramos continuamente.', icon: 'ShieldCheck', sort_order: 2, is_active: true },
      { id: 'val-3', title: 'Eficiencia', description: 'Refinamos hasta que solo queda claridad.', example: 'Menos trabajo manual, mas enfoque.', icon: 'Gauge', sort_order: 3, is_active: true },
      { id: 'val-4', title: 'Innovacion', description: 'Evolucionamos mas rapido que el sistema.', example: 'Probar, aprender y adaptar rapido.', icon: 'Lightbulb', sort_order: 4, is_active: true },
      { id: 'val-5', title: 'Perspicacia', description: 'Vemos lo que otros pasan por alto.', example: 'Detectar cuellos de botella antes.', icon: 'Eye', sort_order: 5, is_active: true },
    ],
  };

  return values[language];
}

export function getLocalMetrics(language: Language): Metric[] {
  const metrics: Record<Language, Metric[]> = {
    en: [
      { id: 'met-1', label: 'Automation Workflows Delivered', value: 120, suffix: '+', icon: 'Workflow', sort_order: 1, is_active: true },
      { id: 'met-2', label: 'Average Time Saved Per Team', value: 35, suffix: '%', icon: 'Clock3', sort_order: 2, is_active: true },
      { id: 'met-3', label: 'Process Error Reduction', value: 42, suffix: '%', icon: 'ShieldCheck', sort_order: 3, is_active: true },
      { id: 'met-4', label: 'Client Satisfaction', value: 96, suffix: '%', icon: 'BadgeCheck', sort_order: 4, is_active: true },
    ],
    es: [
      { id: 'met-1', label: 'Flujos de automatizacion entregados', value: 120, suffix: '+', icon: 'Workflow', sort_order: 1, is_active: true },
      { id: 'met-2', label: 'Tiempo ahorrado promedio por equipo', value: 35, suffix: '%', icon: 'Clock3', sort_order: 2, is_active: true },
      { id: 'met-3', label: 'Reduccion de errores de proceso', value: 42, suffix: '%', icon: 'ShieldCheck', sort_order: 3, is_active: true },
      { id: 'met-4', label: 'Satisfaccion de clientes', value: 96, suffix: '%', icon: 'BadgeCheck', sort_order: 4, is_active: true },
    ],
  };

  return metrics[language];
}

export function getLocalCaseStudies(language: Language): CaseStudy[] {
  const studies: Record<Language, CaseStudy[]> = {
    en: [
      {
        id: 'case-1',
        company_name: 'VIP Tattoo Studio',
        industry: 'Tattoo Studio',
        service_provided: 'Website + Booking System + Catalog',
        challenge: 'Leads were coming from DMs without a clear process.',
        solution: 'Implemented booking flow and inquiry capture.',
        results: 'Higher response speed and better lead organization.',
        testimonial: 'The system reduced manual back-and-forth and made booking easier.',
        testimonial_author: 'Owner, VIP Tattoo Studio',
        sort_order: 1,
        is_active: true,
        language: 'en',
      },
      {
        id: 'case-2',
        company_name: 'Pinera Insurances',
        industry: 'Insurance',
        service_provided: 'Comparison Website + Chatbot + Structured Data',
        challenge: 'Visitors had trouble understanding plan differences.',
        solution: 'Built a clear comparison and guided inquiry flow.',
        results: 'Improved lead quality and clarity in customer questions.',
        testimonial: 'Clients understand options faster and ask better questions.',
        testimonial_author: 'Director, Pinera Insurances',
        sort_order: 2,
        is_active: true,
        language: 'en',
      },
    ],
    es: [
      {
        id: 'case-1',
        company_name: 'VIP Tattoo Studio',
        industry: 'Estudio de tatuajes',
        service_provided: 'Sitio web + reservas + catalogo',
        challenge: 'Los leads llegaban por DM sin proceso claro.',
        solution: 'Implementamos flujo de reserva y captura de consultas.',
        results: 'Mejor velocidad de respuesta y organizacion de leads.',
        testimonial: 'El sistema redujo mensajes manuales y facilito las reservas.',
        testimonial_author: 'Propietario, VIP Tattoo Studio',
        sort_order: 1,
        is_active: true,
        language: 'es',
      },
      {
        id: 'case-2',
        company_name: 'Pinera Seguros',
        industry: 'Seguros',
        service_provided: 'Sitio comparador + chatbot + base estructurada',
        challenge: 'Los visitantes no entendian bien las diferencias entre planes.',
        solution: 'Creamos comparacion clara y flujo guiado de consulta.',
        results: 'Mejor calidad de leads y mayor claridad en consultas.',
        testimonial: 'Los clientes entienden opciones mas rapido y preguntan mejor.',
        testimonial_author: 'Director, Pinera Seguros',
        sort_order: 2,
        is_active: true,
        language: 'es',
      },
    ],
  };

  return studies[language];
}

export function getLocalIndustrySolutions(language: Language): IndustrySolutionLocal[] {
  const solutions: Record<Language, IndustrySolutionLocal[]> = {
    en: [
      {
        id: 'ind-1',
        slug: 'tattoo-studios',
        name: 'Tattoo Studios',
        description: 'Booking, portfolio, and lead management systems for tattoo businesses.',
        long_description: 'Structured operations for studios growing through social channels.',
        icon: 'Palette',
        features: ['Booking flow', 'Design catalog', 'Lead tracking'],
      },
      {
        id: 'ind-2',
        slug: 'medical-practices',
        name: 'Medical Practices',
        description: 'Consultation intake and patient inquiry automation.',
        long_description: 'Operational clarity for clinics and specialist services.',
        icon: 'Stethoscope',
        features: ['Patient intake', 'FAQ automation', 'Follow-up workflows'],
      },
      {
        id: 'ind-3',
        slug: 'events-travel',
        name: 'Events & Travel',
        description: 'Capacity, itinerary, and communication systems.',
        long_description: 'Coordination-focused systems for high-volume events.',
        icon: 'CalendarDays',
        features: ['Itinerary portal', 'Capacity tracking', 'Registration workflow'],
      },
    ],
    es: [
      {
        id: 'ind-1',
        slug: 'tattoo-studios',
        name: 'Estudios de tatuajes',
        description: 'Sistemas de reservas, portafolio y gestion de leads.',
        long_description: 'Operaciones estructuradas para estudios que crecen en redes.',
        icon: 'Palette',
        features: ['Flujo de reservas', 'Catalogo de disenos', 'Seguimiento de leads'],
      },
      {
        id: 'ind-2',
        slug: 'medical-practices',
        name: 'Consultorios medicos',
        description: 'Automatizacion de consultas e ingreso de pacientes.',
        long_description: 'Claridad operativa para clinicas y especialistas.',
        icon: 'Stethoscope',
        features: ['Ingreso de pacientes', 'Automatizacion de FAQ', 'Flujos de seguimiento'],
      },
      {
        id: 'ind-3',
        slug: 'events-travel',
        name: 'Eventos y viajes',
        description: 'Sistemas de cupo, itinerario y comunicacion.',
        long_description: 'Sistemas de coordinacion para eventos de alto volumen.',
        icon: 'CalendarDays',
        features: ['Portal de itinerario', 'Control de cupos', 'Flujo de registro'],
      },
    ],
  };

  return solutions[language];
}
