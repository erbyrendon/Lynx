import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase, type Metric } from '../../lib/supabase';

export default function MetricsManager() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      if (data) setMetrics(data);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActive = async (metric: Metric) => {
    try {
      const { error } = await supabase
        .from('metrics')
        .update({ is_active: !metric.is_active })
        .eq('id', metric.id);

      if (error) throw error;
      loadMetrics();
    } catch (error) {
      console.error('Error toggling metric:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-electric-blue">Loading metrics...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Metrics</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold gradient-text">
                    {metric.value}
                    <span className="text-electric-blue">{metric.suffix}</span>
                  </span>
                  {!metric.is_active && (
                    <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{metric.label}</p>
              </div>

              <button
                onClick={() => toggleActive(metric)}
                className="p-2 text-gray-400 hover:text-electric-blue transition-colors"
                title={metric.is_active ? 'Hide metric' : 'Show metric'}
              >
                {metric.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
