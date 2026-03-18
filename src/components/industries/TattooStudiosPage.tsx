import { useState } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare, Calendar, Image, Database, ShoppingBag, ChevronDown, ChevronUp, Check, AlertCircle, Grid3x3 as Grid3X3, Palette, Clock, Users, Layers } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TattooStudiosPageProps {
  onBack: () => void;
}

export default function TattooStudiosPage({ onBack }: TattooStudiosPageProps) {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const content = {
    en: {
      backLabel: 'Back to Solutions',
      heroTitle: 'Systems for Tattoo Studios That Want More Clients and Better Organization',
      heroSubtitle: 'We design websites and digital systems that help tattoo studios manage bookings, showcase their work, and capture clients more efficiently.',
      heroCta: 'Schedule a Consultation',
      viewExample: 'View Example',
      problemTitle: 'The Reality of Running a Tattoo Studio',
      problemIntro: 'Most tattoo artists are great at their craft but struggle with the business side. Here is what we see repeatedly:',
      problems: [
        { title: 'DM Overload', description: 'Bookings happen through Instagram messages. Requests pile up, get buried, or go unanswered for days.' },
        { title: 'No Booking Structure', description: 'There is no clear system. Clients do not know how to book, what to expect, or when slots are available.' },
        { title: 'Scattered Portfolio', description: 'Work is spread across Instagram, saved stories, and random folders. Nothing is organized or easy to browse.' },
        { title: 'Lost Clients', description: 'Interested clients leave because there is no clear next step. They message once, get no reply, and book elsewhere.' },
        { title: 'Manual Everything', description: 'Every inquiry requires a manual response. Pricing, availability, aftercare, the same questions over and over.' }
      ],
      solutionTitle: 'A Structured System That Works for You',
      solutionIntro: 'We build a connected system for tattoo studios that brings your portfolio, bookings, and client communication into one place.',
      solutionComponents: [
        { icon: 'Image', title: 'Portfolio Website', description: 'A professional site that showcases your work, organized by style, body area, or project type.' },
        { icon: 'Calendar', title: 'Booking System', description: 'Clients can check availability, select services, and request appointments without sending a DM.' },
        { icon: 'MessageSquare', title: 'Automated Responses', description: 'A chatbot handles common questions: pricing, availability, aftercare, deposit info.' },
        { icon: 'Database', title: 'Client Database', description: 'Every inquiry is captured and organized. No more lost messages or forgotten requests.' },
        { icon: 'ShoppingBag', title: 'Design Store', description: 'Optional: Let clients browse and purchase flash designs or request custom work directly.' }
      ],
      differentiatorTitle: 'Turn Your Designs Into a Digital Store',
      differentiatorText: 'Most studios post flash designs on Instagram and wait for someone to message. We turn your designs into an organized catalog where clients can browse, filter, and request directly.',
      differentiatorFeatures: [
        'Browse designs by style, size, or body placement',
        'See pricing and availability at a glance',
        'Request a design or book it directly',
        'All inquiries organized in one dashboard'
      ],
      differentiatorNote: 'Your designs become a working sales tool, not just posts that disappear in a feed.',
      processTitle: 'How We Work',
      processSteps: [
        { number: '01', title: 'Analyze', description: 'We review your current setup: how you handle bookings, where you lose clients, what takes too much time.' },
        { number: '02', title: 'Design', description: 'We create a system tailored to your studio: portfolio structure, booking flow, automation rules.' },
        { number: '03', title: 'Build', description: 'We develop your website and connect all the pieces: booking, chat, database, store.' },
        { number: '04', title: 'Launch', description: 'You start managing clients in a structured way. We train you and provide ongoing support.' }
      ],
      caseStudyTitle: 'Real Project: VIP Tattoo Studio',
      caseStudyClient: 'VIP Tattoo Studio',
      caseStudyDescription: 'We developed a website that showcases the studio\'s portfolio while functioning as a booking and sales platform. Clients can explore tattoo designs by category, request appointments, and purchase merchandise. The system organizes all inquiries and simplifies how the studio manages clients.',
      caseStudyResults: [
        'Portfolio organized by style and body area',
        'Integrated booking with deposit collection',
        'Flash design store with direct purchase',
        'Automated inquiry management'
      ],
      benefitsTitle: 'What Actually Improves',
      benefits: [
        { icon: 'Clock', title: 'Faster Response Time', description: 'Automated answers to common questions. Clients get info immediately, not days later.' },
        { icon: 'Calendar', title: 'Clear Booking Process', description: 'Clients know exactly how to book, what it costs, and when you are available.' },
        { icon: 'Users', title: 'Organized Client Requests', description: 'Every inquiry is captured, categorized, and easy to follow up on.' },
        { icon: 'Palette', title: 'Professional Presentation', description: 'Your work is displayed in a way that reflects its quality, not squeezed into an Instagram grid.' },
        { icon: 'Layers', title: 'Less Manual Work', description: 'Stop answering the same questions. Let the system handle the repetitive tasks.' }
      ],
      faqTitle: 'Common Questions',
      faqs: [
        { question: 'Can clients book directly through the website?', answer: 'Yes. Clients can view available slots, select a service, and submit a booking request. You can require deposits before confirming.' },
        { question: 'Does this replace Instagram?', answer: 'No. Instagram remains your main showcase and discovery platform. This system gives your followers a clear place to book and browse, rather than relying on DMs.' },
        { question: 'Can I show all my designs on the site?', answer: 'Yes. You can upload as many designs as you want, organized by category, style, size, or body area. Clients can filter and browse easily.' },
        { question: 'Is it difficult to manage?', answer: 'No. The dashboard is simple. You can update availability, respond to inquiries, and manage bookings without technical knowledge.' },
        { question: 'How long does it take to build?', answer: 'Typically 3-4 weeks from start to launch, depending on the complexity of your portfolio and the features you need.' }
      ],
      ctaTitle: 'Organize Your Studio and Capture More Clients',
      ctaText: 'If your studio is growing but your process feels disorganized, a structured system can make your work easier and more efficient.',
      ctaCta: 'Schedule a Consultation'
    },
    es: {
      backLabel: 'Volver a Soluciones',
      heroTitle: 'Sistemas para Estudios de Tatuajes que Quieren Mas Clientes y Mejor Organizacion',
      heroSubtitle: 'Disenamos sitios web y sistemas digitales que ayudan a los estudios de tatuajes a gestionar reservas, mostrar su trabajo y captar clientes de manera mas eficiente.',
      heroCta: 'Agenda una Consulta',
      viewExample: 'Ver Ejemplo',
      problemTitle: 'La Realidad de Manejar un Estudio de Tatuajes',
      problemIntro: 'La mayoria de los tatuadores son excelentes en su oficio pero luchan con el lado comercial. Esto es lo que vemos repetidamente:',
      problems: [
        { title: 'Sobrecarga de DMs', description: 'Las reservas ocurren por mensajes de Instagram. Las solicitudes se acumulan, se entierran o quedan sin respuesta por dias.' },
        { title: 'Sin Estructura de Reservas', description: 'No hay un sistema claro. Los clientes no saben como reservar, que esperar o cuando hay disponibilidad.' },
        { title: 'Portafolio Disperso', description: 'El trabajo esta disperso entre Instagram, historias guardadas y carpetas aleatorias. Nada esta organizado ni es facil de explorar.' },
        { title: 'Clientes Perdidos', description: 'Los clientes interesados se van porque no hay un siguiente paso claro. Escriben una vez, no reciben respuesta y reservan en otro lugar.' },
        { title: 'Todo Manual', description: 'Cada consulta requiere una respuesta manual. Precios, disponibilidad, cuidados posteriores, las mismas preguntas una y otra vez.' }
      ],
      solutionTitle: 'Un Sistema Estructurado que Trabaja para Ti',
      solutionIntro: 'Construimos un sistema conectado para estudios de tatuajes que integra tu portafolio, reservas y comunicacion con clientes en un solo lugar.',
      solutionComponents: [
        { icon: 'Image', title: 'Sitio Web de Portafolio', description: 'Un sitio profesional que muestra tu trabajo, organizado por estilo, area del cuerpo o tipo de proyecto.' },
        { icon: 'Calendar', title: 'Sistema de Reservas', description: 'Los clientes pueden ver disponibilidad, seleccionar servicios y solicitar citas sin enviar un DM.' },
        { icon: 'MessageSquare', title: 'Respuestas Automatizadas', description: 'Un chatbot maneja preguntas comunes: precios, disponibilidad, cuidados posteriores, info de depositos.' },
        { icon: 'Database', title: 'Base de Datos de Clientes', description: 'Cada consulta se captura y organiza. No mas mensajes perdidos o solicitudes olvidadas.' },
        { icon: 'ShoppingBag', title: 'Tienda de Disenos', description: 'Opcional: Permite que los clientes exploren y compren disenos flash o soliciten trabajo personalizado directamente.' }
      ],
      differentiatorTitle: 'Convierte Tus Disenos en una Tienda Digital',
      differentiatorText: 'La mayoria de los estudios publican disenos flash en Instagram y esperan que alguien escriba. Nosotros convertimos tus disenos en un catalogo organizado donde los clientes pueden explorar, filtrar y solicitar directamente.',
      differentiatorFeatures: [
        'Explora disenos por estilo, tamano o ubicacion corporal',
        'Ve precios y disponibilidad de un vistazo',
        'Solicita un diseno o reservalo directamente',
        'Todas las consultas organizadas en un panel'
      ],
      differentiatorNote: 'Tus disenos se convierten en una herramienta de ventas funcional, no solo publicaciones que desaparecen en un feed.',
      processTitle: 'Como Trabajamos',
      processSteps: [
        { number: '01', title: 'Analizar', description: 'Revisamos tu configuracion actual: como manejas reservas, donde pierdes clientes, que te toma demasiado tiempo.' },
        { number: '02', title: 'Disenar', description: 'Creamos un sistema adaptado a tu estudio: estructura de portafolio, flujo de reservas, reglas de automatizacion.' },
        { number: '03', title: 'Construir', description: 'Desarrollamos tu sitio web y conectamos todas las piezas: reservas, chat, base de datos, tienda.' },
        { number: '04', title: 'Lanzar', description: 'Comienzas a gestionar clientes de manera estructurada. Te capacitamos y brindamos soporte continuo.' }
      ],
      caseStudyTitle: 'Proyecto Real: VIP Tattoo Studio',
      caseStudyClient: 'VIP Tattoo Studio',
      caseStudyDescription: 'Desarrollamos un sitio web que muestra el portafolio del estudio mientras funciona como plataforma de reservas y ventas. Los clientes pueden explorar disenos de tatuajes por categoria, solicitar citas y comprar merchandising. El sistema organiza todas las consultas y simplifica como el estudio gestiona clientes.',
      caseStudyResults: [
        'Portafolio organizado por estilo y area corporal',
        'Reservas integradas con cobro de deposito',
        'Tienda de disenos flash con compra directa',
        'Gestion automatizada de consultas'
      ],
      benefitsTitle: 'Lo que Realmente Mejora',
      benefits: [
        { icon: 'Clock', title: 'Tiempo de Respuesta Mas Rapido', description: 'Respuestas automatizadas a preguntas comunes. Los clientes obtienen info inmediatamente, no dias despues.' },
        { icon: 'Calendar', title: 'Proceso de Reserva Claro', description: 'Los clientes saben exactamente como reservar, cuanto cuesta y cuando estas disponible.' },
        { icon: 'Users', title: 'Solicitudes de Clientes Organizadas', description: 'Cada consulta se captura, categoriza y es facil de dar seguimiento.' },
        { icon: 'Palette', title: 'Presentacion Profesional', description: 'Tu trabajo se muestra de una manera que refleja su calidad, no comprimido en una cuadricula de Instagram.' },
        { icon: 'Layers', title: 'Menos Trabajo Manual', description: 'Deja de responder las mismas preguntas. Deja que el sistema maneje las tareas repetitivas.' }
      ],
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        { question: 'Pueden los clientes reservar directamente en el sitio?', answer: 'Si. Los clientes pueden ver horarios disponibles, seleccionar un servicio y enviar una solicitud de reserva. Puedes requerir depositos antes de confirmar.' },
        { question: 'Esto reemplaza Instagram?', answer: 'No. Instagram sigue siendo tu plataforma principal de exhibicion y descubrimiento. Este sistema da a tus seguidores un lugar claro para reservar y explorar, en lugar de depender de DMs.' },
        { question: 'Puedo mostrar todos mis disenos en el sitio?', answer: 'Si. Puedes subir tantos disenos como quieras, organizados por categoria, estilo, tamano o area corporal. Los clientes pueden filtrar y explorar facilmente.' },
        { question: 'Es dificil de manejar?', answer: 'No. El panel es simple. Puedes actualizar disponibilidad, responder consultas y gestionar reservas sin conocimientos tecnicos.' },
        { question: 'Cuanto tiempo toma construirlo?', answer: 'Tipicamente 3-4 semanas desde el inicio hasta el lanzamiento, dependiendo de la complejidad de tu portafolio y las funciones que necesites.' }
      ],
      ctaTitle: 'Organiza Tu Estudio y Capta Mas Clientes',
      ctaText: 'Si tu estudio esta creciendo pero tu proceso se siente desorganizado, un sistema estructurado puede hacer tu trabajo mas facil y eficiente.',
      ctaCta: 'Agenda una Consulta'
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Image: <Image className="w-6 h-6" strokeWidth={1.5} />,
      Calendar: <Calendar className="w-6 h-6" strokeWidth={1.5} />,
      MessageSquare: <MessageSquare className="w-6 h-6" strokeWidth={1.5} />,
      Database: <Database className="w-6 h-6" strokeWidth={1.5} />,
      ShoppingBag: <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />,
      Clock: <Clock className="w-6 h-6" strokeWidth={1.5} />,
      Users: <Users className="w-6 h-6" strokeWidth={1.5} />,
      Palette: <Palette className="w-6 h-6" strokeWidth={1.5} />,
      Layers: <Layers className="w-6 h-6" strokeWidth={1.5} />
    };
    return icons[iconName] || null;
  };

  const scrollToContact = () => {
    const contactTab = document.querySelector('[data-tab="contact"]');
    if (contactTab) {
      (contactTab as HTMLButtonElement).click();
    }
  };

  const scrollToCaseStudy = () => {
    document.getElementById('case-study')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black">
      <section className="py-6 px-6 border-b border-gray-900">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm">{t.backLabel}</span>
          </button>
        </div>
      </section>

      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToCaseStudy}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-gray-700 text-white font-medium rounded-sm hover:border-gray-500 hover:bg-gray-900/50 transition-all duration-300"
            >
              {t.viewExample}
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-100 transition-all duration-300"
            >
              {t.heroCta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-4 mb-12">
            <div className="w-10 h-10 rounded-sm bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 flex-shrink-0">
              <AlertCircle className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-tight">
                {t.problemTitle}
              </h2>
              <p className="text-gray-400 font-light">
                {t.problemIntro}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.problems.map((problem, index) => (
              <div
                key={index}
                className="p-6 bg-black border border-gray-800 rounded-sm"
              >
                <h3 className="text-white font-medium mb-2">{problem.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-tight">
            {t.solutionTitle}
          </h2>
          <p className="text-gray-400 font-light mb-12 max-w-2xl">
            {t.solutionIntro}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.solutionComponents.map((component, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-950 border border-gray-800 rounded-sm hover:border-gray-700 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-sm bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 mb-4 group-hover:text-white group-hover:border-gray-700 transition-all duration-300">
                  {getIcon(component.icon)}
                </div>
                <h3 className="text-white font-medium mb-2">{component.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{component.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400">
                  <Grid3X3 className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                  {t.differentiatorTitle}
                </h2>
              </div>
              <p className="text-gray-400 font-light mb-8 leading-relaxed">
                {t.differentiatorText}
              </p>
              <ul className="space-y-3 mb-8">
                {t.differentiatorFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-gray-300 text-sm font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm italic font-light border-l-2 border-gray-800 pl-4">
                {t.differentiatorNote}
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gray-900 border border-gray-800 rounded-sm overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-square bg-gray-800 rounded-sm" />
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="h-8 w-20 bg-gray-800 rounded-sm" />
                    <div className="h-8 w-16 bg-gray-800 rounded-sm" />
                    <div className="h-8 w-24 bg-gray-800 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-12 tracking-tight">
            {t.processTitle}
          </h2>

          <div className="space-y-0">
            {t.processSteps.map((step, index) => (
              <div
                key={index}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-sm bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 font-light text-sm flex-shrink-0">
                    {step.number}
                  </div>
                  {index < t.processSteps.length - 1 && (
                    <div className="w-px flex-1 bg-gray-800 mt-4" />
                  )}
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="case-study" className="py-20 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-12 tracking-tight">
            {t.caseStudyTitle}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-black border border-gray-800 rounded-sm overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
                <video
                  src="/VIP_Tattoo_Studio_-_Professional_Tattoo_Art_y_9_paginas_mas_-_Personal__Microsoft​_Edge_2026-03-04_23-09-22.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Client</div>
              <h3 className="text-xl font-medium text-white mb-4">{t.caseStudyClient}</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                {t.caseStudyDescription}
              </p>
              <ul className="space-y-2">
                {t.caseStudyResults.map((result, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-gray-300 text-sm font-light">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-12 tracking-tight">
            {t.benefitsTitle}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-gray-950 border border-gray-800 rounded-sm"
              >
                <div className="w-10 h-10 rounded-sm bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 mb-4">
                  {getIcon(benefit.icon)}
                </div>
                <h3 className="text-white font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-8 tracking-tight">
            {t.faqTitle}
          </h2>

          <div className="space-y-0 border border-gray-800 rounded-sm overflow-hidden">
            {t.faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-800 last:border-b-0"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-900/50 transition-colors duration-300"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-950 border border-gray-800 rounded-sm p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }} />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                {t.ctaTitle}
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
                {t.ctaText}
              </p>
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-sm hover:bg-gray-100 transition-all duration-300"
              >
                {t.ctaCta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
