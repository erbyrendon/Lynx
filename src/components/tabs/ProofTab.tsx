import { useState, useEffect, useRef } from 'react';
import { Quote, ExternalLink, Globe, Database, MessageSquare, Calendar, ShoppingBag, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Project {
  client: string;
  businessType: {
    en: string;
    es: string;
  };
  location: string;
  description: {
    en: string;
    es: string;
  };
  systems: string[];
  images: string[];
}

interface Testimonial {
  name: string;
  role: {
    en: string;
    es: string;
  };
  text: {
    en: string;
    es: string;
  };
  image?: string;
}

const projects: Project[] = [
  {
    client: 'Piñera Insurances',
    businessType: {
      en: 'Insurance Company',
      es: 'Compañía de Seguros'
    },
    location: 'Mexico',
    description: {
      en: 'Designed and developed a website for an insurance company that helps visitors understand and compare different insurance plans. The platform includes a structured database, an integrated chatbot that answers common questions about insurance coverage, and an interactive comparison page where users can review different policy options.',
      es: 'Diseñamos y desarrollamos un sitio web para una compañía de seguros que ayuda a los visitantes a comprender y comparar diferentes planes de seguros. La plataforma incluye una base de datos estructurada, un chatbot integrado que responde preguntas comunes sobre coberturas, y una página de comparación interactiva.'
    },
    systems: ['Website', 'Database', 'Chatbot', 'Comparison Tool'],
    images: [
      '/Captura_de_pantalla_2026-03-16_141456.png',
      '/Captura_de_pantalla_2026-03-16_141536.png',
      '/Captura_de_pantalla_2026-03-16_141548.png'
    ]
  },
  {
    client: 'Egresados Royale',
    businessType: {
      en: 'Travel Agency Event',
      es: 'Evento de Agencia de Viajes'
    },
    location: 'Caribbean',
    description: {
      en: 'Built a website for a large graduation travel event organized for students traveling to Mexico. The platform includes an interactive itinerary describing daily activities such as yacht events, nightclub experiences, and organized excursions. The system also includes real-time occupancy tracking so participants can view available spots and event capacity.',
      es: 'Construimos un sitio web para un gran evento de viaje de graduación organizado para estudiantes que viajan a México. La plataforma incluye un itinerario interactivo que describe actividades diarias como eventos en yate, experiencias en discotecas y excursiones organizadas, con seguimiento de ocupación en tiempo real.'
    },
    systems: ['Website', 'Database', 'Itinerary System', 'Occupancy Tracking'],
    images: [
      '/Captura_de_pantalla_2026-03-17_133149.png',
      '/Captura_de_pantalla_2026-03-17_133204.png',
      '/Captura_de_pantalla_2026-03-17_133231.png',
      '/Captura_de_pantalla_2026-03-17_133256.png',
      '/Captura_de_pantalla_2026-03-17_133306.png',
      '/Captura_de_pantalla_2026-03-17_133322.png'
    ]
  },
  {
    client: 'VIP Tattoo Studio',
    businessType: {
      en: 'Tattoo Studio',
      es: 'Estudio de Tatuajes'
    },
    location: 'Local',
    description: {
      en: 'Developed a website that showcases the studio\'s portfolio of tattoo artists while also functioning as an interactive booking platform. Visitors can explore tattoo designs categorized by body areas, book appointments, and purchase merchandise directly through the website.',
      es: 'Desarrollamos un sitio web que muestra el portafolio de los artistas del estudio mientras funciona como una plataforma interactiva de reservas. Los visitantes pueden explorar diseños de tatuajes categorizados por áreas del cuerpo, reservar citas y comprar mercancía directamente.'
    },
    systems: ['Website', 'Portfolio Display', 'Booking System', 'E-commerce'],
    images: [
      '/Captura_de_pantalla_2026-03-17_133459.png',
      '/Captura_de_pantalla_2026-03-17_133515.png',
      '/Captura_de_pantalla_2026-03-17_133531.png'
    ]
  },
  {
    client: 'Dra. Claudia Martinez',
    businessType: {
      en: 'Plastic Surgeon',
      es: 'Cirujana Plástica'
    },
    location: 'Colombia',
    description: {
      en: 'Created a professional website for a plastic surgeon displaying different procedures and medical services. The platform includes detailed explanations of surgeries, a chatbot that answers common patient questions, contact functionality, and a database for managing appointment requests and patient inquiries.',
      es: 'Creamos un sitio web profesional para una cirujana plástica que muestra diferentes procedimientos y servicios médicos. La plataforma incluye explicaciones detalladas de cirugías, un chatbot que responde preguntas comunes de pacientes, funcionalidad de contacto y una base de datos para gestionar solicitudes de citas.'
    },
    systems: ['Website', 'Chatbot', 'Contact Forms', 'Patient Database'],
    images: ['https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600']
  }
];

const testimonials: Testimonial[] = [
  {
    name: 'Roberto Piñera',
    role: {
      en: 'Director, Piñera Insurances',
      es: 'Director, Piñera Seguros'
    },
    text: {
      en: 'Working with the team helped us organize how we present our services online. The website is much clearer for our clients and the chatbot has made it easier to answer common questions. The comparison tool has become a useful resource for visitors exploring their options.',
      es: 'Trabajar con el equipo nos ayudó a organizar cómo presentamos nuestros servicios en línea. El sitio web es mucho más claro para nuestros clientes y el chatbot ha facilitado responder preguntas comunes. La herramienta de comparación se ha convertido en un recurso útil.'
    },
    image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Alejandro Vega',
    role: {
      en: 'Event Coordinator, Egresados Royale',
      es: 'Coordinador de Eventos, Egresados Royale'
    },
    text: {
      en: 'The process was very structured and professional. Our new website allows participants to see the full itinerary and check availability easily. Managing registrations became much simpler with the tracking system they built for us.',
      es: 'El proceso fue muy estructurado y profesional. Nuestro nuevo sitio web permite a los participantes ver el itinerario completo y verificar disponibilidad fácilmente. Gestionar las inscripciones se volvió mucho más simple con el sistema de seguimiento que construyeron.'
    },
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Marco Delgado',
    role: {
      en: 'Owner, VIP Tattoo Studio',
      es: 'Propietario, VIP Tattoo Studio'
    },
    text: {
      en: 'The website they built lets our clients explore our work and book appointments without the back-and-forth messaging we used to deal with. Having the online shop integrated was a nice addition that we didn\'t expect to use as much as we do.',
      es: 'El sitio web que construyeron permite a nuestros clientes explorar nuestro trabajo y reservar citas sin los mensajes de ida y vuelta con los que solíamos lidiar. Tener la tienda en línea integrada fue una adición agradable que no esperábamos usar tanto.'
    },
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Dra. Claudia Martinez',
    role: {
      en: 'Plastic Surgeon',
      es: 'Cirujana Plástica'
    },
    text: {
      en: 'The team understood what we needed from the beginning. The website presents our services professionally and the chatbot handles many of the initial questions patients have. It has helped streamline how we receive and organize consultation requests.',
      es: 'El equipo entendió lo que necesitábamos desde el principio. El sitio web presenta nuestros servicios profesionalmente y el chatbot maneja muchas de las preguntas iniciales de los pacientes. Ha ayudado a agilizar cómo recibimos y organizamos las solicitudes de consulta.'
    },
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

const systemIcons: Record<string, typeof Globe> = {
  'Website': Globe,
  'Database': Database,
  'Chatbot': MessageSquare,
  'Comparison Tool': ExternalLink,
  'Itinerary System': Calendar,
  'Occupancy Tracking': User,
  'Portfolio Display': ExternalLink,
  'Booking System': Calendar,
  'E-commerce': ShoppingBag,
  'Contact Forms': MessageSquare,
  'Patient Database': Database
};

export default function ProofTab() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div ref={sectionRef} className="p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
            {language === 'en' ? 'Impact & Projects' : 'Impacto y Proyectos'}
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'A selection of projects we\'ve completed for businesses across different industries.'
              : 'Una selección de proyectos que hemos completado para empresas en diferentes industrias.'}
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-xl font-medium text-white mb-8">
            {language === 'en' ? 'Recent Projects' : 'Proyectos Recientes'}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                language={language}
                isVisible={isVisible}
                delay={index * 100 + 200}
              />
            ))}
          </div>
        </div>

        <div
          className={`mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-dark-gray/50">
              <video
                className="w-full aspect-video object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/VIP_Tattoo_Studio_-_Professional_Tattoo_Art_y_9_paginas_mas_-_Personal__Microsoft​_Edge_2026-03-04_23-09-22.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm text-gray-300">
                  {language === 'en' ? 'Project demo: VIP Tattoo Studio website' : 'Demo del proyecto: Sitio web VIP Tattoo Studio'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-16">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-xl font-medium text-white mb-3">
              {language === 'en' ? 'Client Feedback' : 'Comentarios de Clientes'}
            </h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              {language === 'en'
                ? 'What our clients say about working with us.'
                : 'Lo que nuestros clientes dicen sobre trabajar con nosotros.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                language={language}
                isVisible={isVisible}
                delay={index * 100 + 700}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  language,
  isVisible,
  delay
}: {
  project: Project;
  language: 'en' | 'es';
  isVisible: boolean;
  delay: number;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasMultipleImages = project.images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % project.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, isPaused, project.images.length]);

  return (
    <div
      className={`group rounded-2xl bg-dark-gray/60 border border-gray-800 hover:border-gray-700 transition-all duration-500 overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="relative aspect-[16/9] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={project.images[activeImage]}
          alt={project.client}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hasMultipleImages && (
          <>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeImage
                      ? 'bg-electric-blue w-6'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-xs text-white/80">
              {activeImage + 1} / {project.images.length}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-medium text-white text-lg">{project.client}</h4>
            <p className="text-sm text-gray-400">
              {project.businessType[language]} — {project.location}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.systems.map((system, idx) => {
            const Icon = systemIcons[system] || Globe;
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800/80 text-xs text-gray-300"
              >
                <Icon className="w-3 h-3 text-electric-blue" />
                {system}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  language,
  isVisible,
  delay
}: {
  testimonial: Testimonial;
  language: 'en' | 'es';
  isVisible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`p-6 rounded-2xl bg-dark-gray/60 border border-gray-800 hover:border-gray-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4 mb-4">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-700"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <div>
          <h4 className="font-medium text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role[language]}</p>
        </div>
      </div>

      <Quote className="w-5 h-5 text-gray-700 mb-2" />

      <p className="text-sm text-gray-300 leading-relaxed">
        {testimonial.text[language]}
      </p>
    </div>
  );
}
