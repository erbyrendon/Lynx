import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase, type Value } from '../../lib/supabase';

export default function ValuesManager() {
  const [values, setValues] = useState<Value[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadValues();
  }, []);

  const loadValues = async () => {
    try {
      const { data, error } = await supabase
        .from('values')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      if (data) setValues(data);
    } catch (error) {
      console.error('Error loading values:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActive = async (value: Value) => {
    try {
      const { error } = await supabase
        .from('values')
        .update({ is_active: !value.is_active })
        .eq('id', value.id);

      if (error) throw error;
      loadValues();
    } catch (error) {
      console.error('Error toggling value:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-electric-blue">Loading values...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Values</h2>
      </div>

      <div className="space-y-4">
        {values.map((value) => (
          <div
            key={value.id}
            className="p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                  {!value.is_active && (
                    <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-2">{value.description}</p>
                <p className="text-xs text-gray-500 italic">{value.example}</p>
              </div>

              <button
                onClick={() => toggleActive(value)}
                className="p-2 text-gray-400 hover:text-electric-blue transition-colors"
                title={value.is_active ? 'Hide value' : 'Show value'}
              >
                {value.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
