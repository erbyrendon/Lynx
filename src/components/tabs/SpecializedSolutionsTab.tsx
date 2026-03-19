import { ArrowRight, ChevronDown, Globe, Users, Calendar, BarChart3, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SpecializedProject {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export default function SpecializedSolutionsTab() {
  const { language } = useLanguage();

  const content = {
    en: {
      heroTitle: 'Specialized Systems for Unique Business Models',
      heroSubtitle: 'Some businesses require more than standard solutions. We design custom systems for events, experiences, and complex operations.',
      heroCta: 'View Projects',
      introText: 'Not all businesses operate the same way. Some require dynamic systems to manage users, schedules, capacity, and real-time information. Our work includes building tailored platforms for these scenarios, combining structure, clarity, and usability.',
      viewProject: 'View Project',
      closingTitle: 'Build a System That Matches Your Business',
      closingText: 'If your business requires more than a standard website or simple automation, we design custom systems tailored to your operations.',
      closingCta: 'Schedule a Consultation',
      projects: [
        {
          id: 'egresados-royale',
          name: 'Egresados Royale',
          category: 'Event & Travel Experience Platform',
          description: 'A comprehensive platform for a large-scale graduation travel event in the Caribbean, designed to manage both information and user experience for students traveling to Mexico.',
          features: [
            'Interactive itinerary with detailed daily activities',
            'Real-time occupancy tracking for event capacity',
            'Structured database for participant management',
            'Clear navigation for schedules and event details'
          ]
        }
      ]
    },
    es: {
      heroTitle: 'Sistemas Especializados para Modelos de Negocio Únicos',
      heroSubtitle: 'Algunos negocios requieren más que soluciones estándar. Diseñamos sistemas personalizados para eventos, experiencias y operaciones complejas.',
      heroCta: 'Ver Proyectos',
      introText: 'No todos los negocios operan de la misma manera. Algunos requieren sistemas dinámicos para gestionar usuarios, horarios, capacidad e información en tiempo real. Nuestro trabajo incluye construir plataformas a medida para estos escenarios, combinando estructura, claridad y usabilidad.',
      viewProject: 'Ver Proyecto',
      closingTitle: 'Construye un Sistema que se Adapte a Tu Negocio',
      closingText: 'Si tu negocio requiere más que un sitio web estándar o automatización simple, diseñamos sistemas personalizados adaptados a tus operaciones.',
      closingCta: 'Agenda una Consulta',
      projects: [
        {
          id: 'egresados-royale',
          name: 'Egresados Royale',
          category: 'Plataforma de Eventos y Experiencias de Viaje',
          description: 'Una plataforma integral para un evento de viaje de graduación a gran escala en el Caribe, diseñada para gestionar tanto la información como la experiencia del usuario para estudiantes viajando a México.',
          features: [
            'Itinerario interactivo con actividades diarias detalladas',
            'Seguimiento de ocupación en tiempo real para capacidad de eventos',
            'Base de datos estructurada para gestión de participantes',
            'Navegación clara para horarios y detalles del evento'
          ]
        }
      ]
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  const projectIcons: Record<string, React.ReactNode> = {
    'egresados-royale': <Globe className="w-8 h-8" strokeWidth={1.5} />
  };

  const featureIcons = [
    <Calendar key="calendar" className="w-5 h-5" strokeWidth={1.5} />,
    <BarChart3 key="chart" className="w-5 h-5" strokeWidth={1.5} />,
    <Users key="users" className="w-5 h-5" strokeWidth={1.5} />,
    <MapPin key="map" className="w-5 h-5" strokeWidth={1.5} />
  ];

  const scrollToProjects = () => {
    document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactTab = document.querySelector('[data-tab="contact"]');
    if (contactTab) {
      (contactTab as HTMLButtonElement).click();
    }
  };

  return (
    <div className="bg-black">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gray-700/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full mb-8">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-400 font-light">Custom Development</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            {t.heroSubtitle}
          </p>
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-100 transition-all duration-300"
          >
            {t.heroCta}
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative pl-8 border-l-2 border-emerald-800/50">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-600 rounded-full" />
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              {t.introText}
            </p>
          </div>
        </div>
      </section>

      <section id="projects-grid" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {t.projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gray-950 border border-gray-800 rounded-sm overflow-hidden hover:border-gray-600 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-sm bg-gray-900 border border-gray-800 flex items-center justify-center text-emerald-500 group-hover:border-emerald-800/50 group-hover:bg-emerald-900/20 transition-all duration-300">
                      {projectIcons[project.id]}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900/50 border border-gray-800 rounded-full mb-4">
                      <span className="text-xs text-emerald-500 font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight">
                      {project.name}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-8 font-light max-w-2xl">
                      {project.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {project.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-3 p-4 bg-gray-900/30 border border-gray-800/50 rounded-sm"
                        >
                          <div className="text-emerald-500 mt-0.5">
                            {featureIcons[featureIndex]}
                          </div>
                          <span className="text-sm text-gray-300 font-light leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button className="group/btn inline-flex items-center gap-2 text-white hover:text-emerald-400 transition-colors duration-300">
                      <span className="text-sm font-medium">{t.viewProject}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-950 border border-gray-800 rounded-sm p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }} />
            </div>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-900/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                {t.closingTitle}
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
                {t.closingText}
              </p>
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-100 transition-all duration-300"
              >
                {t.closingCta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
