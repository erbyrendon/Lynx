import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

interface IndustrySolution {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string;
  icon: string;
  features: string[];
}

interface IndustryDetailTabProps {
  slug: string;
  onBack: () => void;
}

export default function IndustryDetailTab({ slug, onBack }: IndustryDetailTabProps) {
  const { language } = useLanguage();
  const [industry, setIndustry] = useState<IndustrySolution | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      backLabel: 'Back to Solutions',
      whatWeDeliver: 'What We Deliver',
      ourApproach: 'Our Approach',
      approachSteps: [
        { title: 'Discovery', description: 'We analyze your current operations, identify bottlenecks, and understand your growth objectives.' },
        { title: 'Design', description: 'We architect a system tailored to your specific workflows, client journey, and business model.' },
        { title: 'Implementation', description: 'We build and deploy your system with minimal disruption to your existing operations.' },
        { title: 'Optimization', description: 'We monitor performance and refine the system based on real usage data.' }
      ],
      ctaTitle: 'Ready to Transform Your Operations?',
      ctaText: 'Let us design a system that works the way your business actually operates.',
      ctaCta: 'Schedule a Consultation',
    },
    es: {
      backLabel: 'Volver a Soluciones',
      whatWeDeliver: 'Lo Que Entregamos',
      ourApproach: 'Nuestro Enfoque',
      approachSteps: [
        { title: 'Descubrimiento', description: 'Analizamos tus operaciones actuales, identificamos cuellos de botella y entendemos tus objetivos de crecimiento.' },
        { title: 'Diseño', description: 'Diseñamos un sistema adaptado a tus flujos de trabajo específicos, recorrido del cliente y modelo de negocio.' },
        { title: 'Implementación', description: 'Construimos y desplegamos tu sistema con mínima interrupción a tus operaciones existentes.' },
        { title: 'Optimización', description: 'Monitoreamos el rendimiento y refinamos el sistema basándonos en datos de uso real.' }
      ],
      ctaTitle: '¿Listo para Transformar Tus Operaciones?',
      ctaText: 'Permítenos diseñar un sistema que funcione como tu negocio realmente opera.',
      ctaCta: 'Agenda una Consulta',
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  useEffect(() => {
    loadIndustry();
  }, [slug, language]);

  const loadIndustry = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_solutions')
        .select('*')
        .eq('slug', slug)
        .eq('language', language)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setIndustry({
          ...data,
          features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features
        });
      }
    } catch (error) {
      console.error('Error loading industry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>)[iconName];
    return Icon ? <Icon className="w-10 h-10" strokeWidth={1.5} /> : null;
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

  if (!industry) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Industry not found</p>
          <button
            onClick={onBack}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {t.backLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <section className="py-8 px-6 border-b border-gray-900">
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

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-sm bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 flex-shrink-0">
              {getIcon(industry.icon)}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
                {industry.name}
              </h1>
              <p className="text-lg text-gray-400 font-light">
                {industry.description}
              </p>
            </div>
          </div>

          <div className="mt-12 pl-8 border-l border-gray-800">
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              {industry.long_description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-white mb-12 tracking-tight">
            {t.whatWeDeliver}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {industry.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-black border border-gray-800 rounded-sm"
              >
                <div className="w-6 h-6 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <span className="text-gray-300 font-light leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light text-white mb-12 tracking-tight">
            {t.ourApproach}
          </h2>

          <div className="space-y-0">
            {t.approachSteps.map((step, index) => (
              <div
                key={index}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 font-light text-sm flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  {index < t.approachSteps.length - 1 && (
                    <div className="w-px flex-1 bg-gray-800 mt-4" />
                  )}
                </div>

                <div className="flex-1 pt-1">
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
