import { useState } from 'react';
import { ArrowRight, ChevronDown, Globe, Users, Calendar, BarChart3, MapPin, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const egresadosScreenshots = [
  '/Captura_de_pantalla_2026-03-17_133149.png',
  '/Captura_de_pantalla_2026-03-17_133204.png',
  '/Captura_de_pantalla_2026-03-17_133231.png',
  '/Captura_de_pantalla_2026-03-17_133256.png',
  '/Captura_de_pantalla_2026-03-17_133306.png',
  '/Captura_de_pantalla_2026-03-17_133322.png',
];

export default function SpecializedSolutionsTab() {
  const { language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % egresadosScreenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + egresadosScreenshots.length) % egresadosScreenshots.length);
  };

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
          {t.projects.map((project) => (
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

                    {project.id === 'egresados-royale' && (
                      <div className="mb-8">
                        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                          {language === 'es' ? 'Capturas de Pantalla' : 'Platform Screenshots'}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {egresadosScreenshots.map((screenshot, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={() => openLightbox(imgIndex)}
                              className="group/img relative aspect-video bg-gray-900 border border-gray-800 rounded-sm overflow-hidden hover:border-emerald-700/50 transition-all duration-300"
                            >
                              <img
                                src={screenshot}
                                alt={`Egresados Royale screenshot ${imgIndex + 1}`}
                                className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="w-3 h-3 text-white rotate-[-45deg]" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

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

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="max-w-6xl max-h-[85vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={egresadosScreenshots[currentImageIndex]}
              alt={`Egresados Royale screenshot ${currentImageIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-sm border border-gray-800"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {egresadosScreenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? 'bg-emerald-500 w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
