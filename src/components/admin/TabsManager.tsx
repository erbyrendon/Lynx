import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase, type Tab } from '../../lib/supabase';

export default function TabsManager() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTabs();
  }, []);

  const loadTabs = async () => {
    try {
      const { data, error } = await supabase
        .from('tabs')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      if (data) setTabs(data);
    } catch (error) {
      console.error('Error loading tabs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActive = async (tab: Tab) => {
    try {
      const { error } = await supabase
        .from('tabs')
        .update({ is_active: !tab.is_active })
        .eq('id', tab.id);

      if (error) throw error;
      loadTabs();
    } catch (error) {
      console.error('Error toggling tab:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center text-electric-blue">Loading tabs...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Tabs</h2>
      </div>

      <div className="space-y-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">{tab.title}</h3>
                <span className="text-sm text-gray-500">({tab.slug})</span>
                {!tab.is_active && (
                  <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
                    Hidden
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">{tab.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleActive(tab)}
                className="p-2 text-gray-400 hover:text-electric-blue transition-colors"
                title={tab.is_active ? 'Hide tab' : 'Show tab'}
              >
                {tab.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong>Note:</strong> Tab management is view-only in this demo. Use the visibility toggle to show/hide tabs on the landing page.
        </p>
      </div>
    </div>
  );
}
