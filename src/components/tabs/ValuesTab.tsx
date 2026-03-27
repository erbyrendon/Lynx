import { useState, useEffect, useCallback } from 'react';
import { supabase, type Value } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';
import Tooltip from '../Tooltip';
import { getLucideIconByName } from '../../lib/icons';

export default function ValuesTab() {
  const { language, t } = useLanguage();
  const [values, setValues] = useState<Value[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    setIsEntering(true);
  }, []);

  useEffect(() => {
    if (values.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [values]);

  const loadValues = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('values')
        .select('*')
        .eq('is_active', true)
        .eq('language', language)
        .order('sort_order');

      if (error) throw error;
      if (data) {
        setValues(data);
      }
    } catch (error) {
      console.error('Error loading values:', error);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadValues();
  }, [loadValues]);

  const getIcon = (iconName: string) => {
    return getLucideIconByName(iconName);
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="text-electric-blue animate-pulse">{t('loadingValues')}</div>
      </div>
    );
  }

  return (
    <div
      className={`p-12 transition-all duration-500 ${
        isEntering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('ourValues').split(' ')[0]} <span className="gradient-text">{t('ourValues').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('ourValuesDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => {
            const Icon = getIcon(value.icon);
            const isActive = activeIndex === index;

            return (
              <Tooltip key={value.id} content={value.example} position="top">
                <div
                  className={`p-8 rounded-xl bg-dark-gray border border-gray-800 transition-all duration-500 group cursor-help ${
                    isActive
                      ? 'border-electric-blue glow-border scale-105 animate-pulse-glow'
                      : 'hover:border-electric-blue opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="mb-6">
                    <Icon
                      className={`w-10 h-10 text-electric-blue transition-all duration-300 ${
                        isActive ? 'animate-pulse-glow scale-125' : 'group-hover:scale-110'
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                    isActive ? 'text-electric-blue' : 'text-white group-hover:text-electric-blue'
                  }`}>
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{value.description}</p>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
