import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase, type Discipline } from '../../lib/supabase';

export default function DisciplinesManager() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDisciplines();
  }, []);

  const loadDisciplines = async () => {
    try {
      const { data, error } = await supabase
        .from('disciplines')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      if (data) setDisciplines(data);
    } catch (error) {
      console.error('Error loading disciplines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActive = async (discipline: Discipline) => {
    try {
      const { error } = await supabase
        .from('disciplines')
        .update({ is_active: !discipline.is_active })
        .eq('id', discipline.id);

      if (error) throw error;
      loadDisciplines();
    } catch (error) {
      console.error('Error toggling discipline:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-electric-blue">Loading disciplines...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Disciplines</h2>
      </div>

      <div className="space-y-4">
        {disciplines.map((discipline) => (
          <div
            key={discipline.id}
            className="p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{discipline.title}</h3>
                  {!discipline.is_active && (
                    <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">{discipline.subtitle}</p>
                <div className="space-y-1">
                  {discipline.features.map((feature, index) => (
                    <div key={index} className="text-xs text-gray-500 flex items-start gap-2">
                      <span className="text-electric-blue">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toggleActive(discipline)}
                className="p-2 text-gray-400 hover:text-electric-blue transition-colors"
                title={discipline.is_active ? 'Hide discipline' : 'Show discipline'}
              >
                {discipline.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
