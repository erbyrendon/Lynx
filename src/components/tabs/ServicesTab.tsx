import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { supabase, type Discipline } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ServicesTab() {
  const { language, t } = useLanguage();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDisciplines();
  }, [language]);

  const loadDisciplines = async () => {
    try {
      const { data, error } = await supabase
        .from('disciplines')
        .select('*')
        .eq('is_active', true)
        .eq('language', language)
        .order('sort_order');

      if (error) throw error;
      if (data) {
        setDisciplines(data);
      }
    } catch (error) {
      console.error('Error loading disciplines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? Icon : Icons.Target;
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="text-electric-blue animate-pulse">{t('loadingServices')}</div>
      </div>
    );
  }

  return (
    <div className="p-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('coreDisciplines').split(' ')[0]} <span className="gradient-text">{t('coreDisciplines').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('coreDisciplinesDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((discipline, index) => {
            const Icon = getIcon(discipline.icon);
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={discipline.id}
                className={`group p-8 rounded-xl bg-dark-gray border border-gray-800 hover:border-electric-blue transition-all duration-500 cursor-pointer ${
                  isExpanded ? 'lg:col-span-2 glow-border' : ''
                }`}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="mb-6 flex items-center justify-between">
                  <Icon
                    className={`w-12 h-12 text-electric-blue transition-transform duration-300 ${
                      isExpanded ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                    strokeWidth={1.5}
                  />
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-electric-blue transition-colors">
                  {discipline.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-4">{discipline.subtitle}</p>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-2 mt-4 pt-4 border-t border-gray-700">
                    {discipline.features.map((feature, fIndex) => (
                      <li key={fIndex} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-electric-blue mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
