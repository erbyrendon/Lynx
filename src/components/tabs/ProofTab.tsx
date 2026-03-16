import { useState, useEffect } from 'react';
import { Quote, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Testimonial {
  name: string;
  role: string;
  businessType: string;
  projectType: string;
  text: {
    en: string;
    es: string;
  };
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Marcus Rivera',
    role: 'Owner',
    businessType: 'Tattoo Studio',
    projectType: 'Website & Booking System',
    text: {
      en: 'LYNX helped us redesign our website and connect it to a booking system. The process was structured and easy to follow, and the final result feels much more professional than what we had before. Clients now book directly through the site, which has reduced the back-and-forth messaging significantly.',
      es: 'LYNX nos ayudó a rediseñar nuestro sitio web y conectarlo a un sistema de reservas. El proceso fue estructurado y fácil de seguir, y el resultado final se siente mucho más profesional que lo que teníamos antes. Los clientes ahora reservan directamente a través del sitio, lo que ha reducido significativamente los mensajes de ida y vuelta.'
    },
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Dr. Sofia Mendez',
    role: 'Practice Manager',
    businessType: 'Medical Clinic',
    projectType: 'Website & Appointment System',
    text: {
      en: 'We needed a simple way for patients to schedule appointments online. The team built us a clean website with an integrated booking system that works well on mobile. Our front desk staff spends less time on the phone now, and patients appreciate being able to book anytime.',
      es: 'Necesitábamos una forma sencilla para que los pacientes programaran citas en línea. El equipo nos construyó un sitio web limpio con un sistema de reservas integrado que funciona bien en móvil. Nuestro personal de recepción pasa menos tiempo en el teléfono ahora, y los pacientes aprecian poder reservar en cualquier momento.'
    },
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'James Chen',
    role: 'Founder',
    businessType: 'Home Services Company',
    projectType: 'CRM & Lead Management',
    text: {
      en: 'Working with the team helped us organize how we handle new client inquiries. Before, everything was scattered between messages and emails. Now everything is tracked through a clear system and it\'s much easier to follow up with potential clients. We don\'t lose leads in the shuffle anymore.',
      es: 'Trabajar con el equipo nos ayudó a organizar cómo manejamos las consultas de nuevos clientes. Antes, todo estaba disperso entre mensajes y correos electrónicos. Ahora todo se rastrea a través de un sistema claro y es mucho más fácil dar seguimiento a los clientes potenciales. Ya no perdemos leads en el proceso.'
    },
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Elena Kowalski',
    role: 'Creative Director',
    businessType: 'Design Agency',
    projectType: 'Workflow Automation',
    text: {
      en: 'Our project management was a mess of spreadsheets and email threads. LYNX set up automated workflows that handle client onboarding and project tracking. It took some adjustment, but now our team has a much clearer view of what\'s happening across all projects.',
      es: 'Nuestra gestión de proyectos era un desorden de hojas de cálculo e hilos de correo electrónico. LYNX configuró flujos de trabajo automatizados que manejan la incorporación de clientes y el seguimiento de proyectos. Tomó algo de ajuste, pero ahora nuestro equipo tiene una visión mucho más clara de lo que está sucediendo en todos los proyectos.'
    },
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'David Thompson',
    role: 'Owner',
    businessType: 'Online Retail Store',
    projectType: 'Website Optimization',
    text: {
      en: 'Our old website was slow and difficult to navigate on phones. The team rebuilt it with a focus on speed and mobile usability. The checkout process is smoother now, and we\'ve noticed fewer people abandoning their carts. The site just works better overall.',
      es: 'Nuestro antiguo sitio web era lento y difícil de navegar en teléfonos. El equipo lo reconstruyó con un enfoque en velocidad y usabilidad móvil. El proceso de pago es más fluido ahora, y hemos notado que menos personas abandonan sus carritos. El sitio simplemente funciona mejor en general.'
    },
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Ana García',
    role: 'Operations Manager',
    businessType: 'Consulting Firm',
    projectType: 'Brand Identity & Website',
    text: {
      en: 'We were starting fresh and needed a professional online presence. LYNX handled our branding and built a website that represents what we do clearly. The communication throughout was straightforward, and they delivered what they promised within the timeline we discussed.',
      es: 'Estábamos empezando de cero y necesitábamos una presencia en línea profesional. LYNX manejó nuestra marca y construyó un sitio web que representa claramente lo que hacemos. La comunicación fue directa, y entregaron lo que prometieron dentro del plazo que discutimos.'
    },
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export default function ProofTab() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
  };

  const visibleTestimonials = testimonials.slice(currentSlide * 2, currentSlide * 2 + 2);

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
            {language === 'en' ? 'What Our Clients Say' : 'Lo Que Dicen Nuestros Clientes'}
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Feedback from businesses we\'ve worked with on digital infrastructure, websites, and operational systems.'
              : 'Comentarios de empresas con las que hemos trabajado en infraestructura digital, sitios web y sistemas operativos.'}
          </p>
        </div>

        <div className="hidden lg:block mb-16">
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex gap-6">
              {visibleTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${currentSlide}-${index}`}
                  testimonial={testimonial}
                  language={language}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-gray-700 hover:border-electric-blue hover:bg-electric-blue/10 transition-all duration-300"
                aria-label="Previous testimonials"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'bg-electric-blue w-6' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-gray-700 hover:border-electric-blue hover:bg-electric-blue/10 transition-all duration-300"
                aria-label="Next testimonials"
              >
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <TestimonialCard testimonial={testimonial} language={language} />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block relative rounded-2xl overflow-hidden border border-gray-800 bg-dark-gray/50 max-w-3xl">
            <video
              className="w-full aspect-video object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/CLiente_Tattoo_prueba_lynx.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm text-gray-300">
                {language === 'en' ? 'Project showcase: Tattoo studio website' : 'Muestra de proyecto: Sitio web de estudio de tatuajes'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, language }: { testimonial: Testimonial; language: 'en' | 'es' }) {
  return (
    <div className="flex-1 p-8 rounded-2xl bg-dark-gray/60 border border-gray-800 hover:border-gray-700 transition-all duration-300">
      <div className="flex items-start gap-4 mb-6">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover border border-gray-700"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-medium text-white text-lg">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.businessType}</p>
          <p className="text-xs text-electric-blue/80 mt-1">{testimonial.projectType}</p>
        </div>
      </div>

      <Quote className="w-6 h-6 text-gray-700 mb-3" />

      <p className="text-gray-300 leading-relaxed text-sm">
        {testimonial.text[language]}
      </p>
    </div>
  );
}
