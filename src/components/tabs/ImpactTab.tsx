import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, type Metric, type CaseStudy } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import { getLucideIconByName } from '../../lib/icons';

export default function ImpactTab() {
  const { language, t } = useLanguage();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [counters, setCounters] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasAnimated = useRef(false);

  const loadMetrics = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .eq('is_active', true)
        .eq('language', language)
        .order('sort_order');

      if (error) throw error;
      if (data) {
        setMetrics(data);
        setCounters(new Array(data.length).fill(0));
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const loadCaseStudies = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_active', true)
        .eq('language', language)
        .order('sort_order');

      if (error) throw error;
      if (data) {
        setCaseStudies(data);
      }
    } catch (error) {
      console.error('Error loading case studies:', error);
    }
  }, [language]);

  const animateCounters = useCallback(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    metrics.forEach((metric, index) => {
      let currentStep = 0;
      const increment = metric.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.min(Math.round(increment * currentStep), metric.value);
          return newCounters;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, [metrics]);

  useEffect(() => {
    hasAnimated.current = false;
    loadMetrics();
    loadCaseStudies();
  }, [language, loadMetrics, loadCaseStudies]);

  useEffect(() => {
    if (metrics.length > 0 && !hasAnimated.current) {
      hasAnimated.current = true;
      animateCounters();
    }
  }, [metrics, animateCounters]);

  const getIcon = (iconName: string) => {
    return getLucideIconByName(iconName);
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="text-electric-blue animate-pulse">{t('loadingMetrics')}</div>
      </div>
    );
  }

  return (
    <div className="p-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('engineeredImpact').split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{t('engineeredImpact').split(' ').slice(-1)}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('engineeredImpactDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = getIcon(metric.icon);

            return (
              <div
                key={metric.id}
                className="relative group p-10 rounded-2xl bg-gradient-to-br from-dark-gray to-black border border-gray-800 hover:border-electric-blue transition-all duration-700 overflow-hidden cursor-pointer hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 ripple" />

                <div className="relative z-10 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-blue/10 group-hover:bg-electric-blue/20 transition-colors">
                    <Icon className="w-8 h-8 text-electric-blue" strokeWidth={1.5} />
                  </div>

                  <div className="mb-4">
                    <span className="text-6xl font-bold gradient-text">
                      {counters[index] || 0}
                    </span>
                    <span className="text-4xl font-bold text-electric-blue">{metric.suffix}</span>
                  </div>

                  <p className="text-gray-400 leading-relaxed">{metric.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-20">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('impactClosing')}
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {language === 'en' ? 'Recent Client Work' : 'Trabajo Reciente con Clientes'}
          </h3>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            {language === 'en'
              ? 'Projects we have delivered over the past year and what our clients have to say'
              : 'Proyectos que hemos entregado durante el último año y lo que nuestros clientes tienen que decir'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-dark-gray to-black border border-gray-800 hover:border-emerald-500 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className="mb-4">
                  <h4 className="text-2xl font-bold text-white mb-2">{study.company_name}</h4>
                  <p className="text-sm text-emerald-400 font-medium">{study.industry}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    {language === 'en' ? 'Service' : 'Servicio'}
                  </p>
                  <p className="text-sm text-gray-300">{study.service_provided}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                    {language === 'en' ? 'Challenge' : 'Desafío'}
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">{study.challenge}</p>
                </div>

                <div className="mb-4 p-4 bg-black/40 rounded-lg border border-emerald-500/20">
                  <p className="text-xs uppercase tracking-wider text-emerald-400 mb-2">
                    {language === 'en' ? 'Results' : 'Resultados'}
                  </p>
                  <p className="text-sm text-gray-200 leading-relaxed font-medium">{study.results}</p>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-300 italic mb-2">"{study.testimonial}"</p>
                  <p className="text-xs text-gray-500">— {study.testimonial_author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
