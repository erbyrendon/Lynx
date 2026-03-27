import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { getLucideIconByName } from '../../lib/icons';

interface IndustrySolution {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string;
  icon: string;
  features: string[];
}

interface IndustrySolutionsTabProps {
  onNavigateToIndustry?: (slug: string) => void;
}

export default function IndustrySolutionsTab({ onNavigateToIndustry }: IndustrySolutionsTabProps) {
  const { language } = useLanguage();
  const [industries, setIndustries] = useState<IndustrySolution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    setIsEntering(true);
  }, []);

  const content = {
    en: {
      heroTitle: 'Operational Systems Designed for Specific Industries',
      heroSubtitle: 'Different businesses operate differently. We design systems tailored to how each industry manages clients, workflows, and growth.',
      heroCta: 'Explore Solutions',
      introText: 'We do not offer one-size-fits-all solutions. Each industry has different processes, client behaviors, and operational challenges. Our work focuses on designing systems that match how each business actually operates, improving clarity, efficiency, and scalability.',
      viewSolution: 'View Solution',
      closingTitle: 'Build the Right System for Your Business',
      closingText: 'If your business is growing but lacks structure, we design systems that bring clarity, control, and efficiency to your operations.',
      closingCta: 'Schedule a Consultation',
    },
    es: {
      heroTitle: 'Sistemas Operativos Diseñados para Industrias Específicas',
      heroSubtitle: 'Diferentes negocios operan de manera diferente. Diseñamos sistemas adaptados a cómo cada industria gestiona clientes, flujos de trabajo y crecimiento.',
      heroCta: 'Explorar Soluciones',
      introText: 'No ofrecemos soluciones genéricas. Cada industria tiene diferentes procesos, comportamientos de clientes y desafíos operativos. Nuestro trabajo se enfoca en diseñar sistemas que coincidan con cómo cada negocio realmente opera, mejorando la claridad, eficiencia y escalabilidad.',
      viewSolution: 'Ver Solución',
      closingTitle: 'Construye el Sistema Correcto para Tu Negocio',
      closingText: 'Si tu negocio está creciendo pero carece de estructura, diseñamos sistemas que aportan claridad, control y eficiencia a tus operaciones.',
      closingCta: 'Agenda una Consulta',
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  const loadIndustries = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('industry_solutions')
        .select('*')
        .eq('is_active', true)
        .eq('language', language)
        .order('sort_order');

      if (error) throw error;
      if (data) {
        const parsed = data.map(item => ({
          ...item,
          features: typeof item.features === 'string' ? JSON.parse(item.features) : item.features
        }));
        setIndustries(parsed);
      }
    } catch (error) {
      console.error('Error loading industries:', error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadIndustries();
  }, [loadIndustries]);

  const getIcon = (iconName: string) => {
    const Icon = getLucideIconByName(iconName);
    return <Icon className="w-8 h-8" strokeWidth={1.5} />;
  };

  const scrollToIndustries = () => {
    document.getElementById('industries-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIndustryClick = (slug: string) => {
    if (onNavigateToIndustry) {
      onNavigateToIndustry(slug);
    }
  };

  const scrollToContact = () => {
    const contactTab = document.querySelector('[data-tab="contact"]');
    if (contactTab) {
      (contactTab as HTMLButtonElement).click();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`bg-black transition-all duration-500 ${
        isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-700/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            {t.heroSubtitle}
          </p>
          <button
            onClick={scrollToIndustries}
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
          <div className="relative pl-8 border-l border-gray-800">
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              {t.introText}
            </p>
          </div>
        </div>
      </section>

      <section id="industries-grid" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="group relative bg-gray-950 border border-gray-800 rounded-sm p-8 hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-300 cursor-pointer"
                onClick={() => handleIndustryClick(industry.slug)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-sm bg-gray-900 border border-gray-800 flex items-center justify-center mb-6 text-gray-400 group-hover:text-white group-hover:border-gray-700 transition-all duration-300">
                    {getIcon(industry.icon)}
                  </div>

                  <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                    {industry.name}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {industry.description}
                  </p>

                  <div className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-medium">{t.viewSolution}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
