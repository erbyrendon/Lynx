import { useState } from 'react';
import TabbedLanding from './components/TabbedLanding';
import AdminPanel from './components/admin/AdminPanel';
import CustomCursor from './components/CustomCursor';
import Chatbot from './components/Chatbot';
import { Key, Languages } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { isSupabaseConfigured } from './lib/supabase';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-black">
      <CustomCursor />

      {!isSupabaseConfigured && (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-xl border border-amber-500/40 bg-black/90 px-4 py-3 text-sm text-amber-200 backdrop-blur">
          Running in local content mode. Dynamic admin/content sync is disabled until Supabase variables are configured.
        </div>
      )}

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full border border-gray-700 hover:border-electric-blue transition-all duration-300 shadow-lg group"
          title="Switch Language / Cambiar Idioma"
        >
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            <span className="text-sm font-semibold">{language === 'en' ? 'ES' : 'EN'}</span>
          </div>
        </button>

        {isSupabaseConfigured && (
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full border border-gray-700 hover:border-emerald-500 transition-all duration-300 shadow-lg"
            title={t('toggleAdmin')}
          >
            <Key className="w-5 h-5" />
          </button>
        )}
      </div>

      {showAdmin ? <AdminPanel /> : <TabbedLanding />}

      {isSupabaseConfigured && <Chatbot />}
    </div>
  );
}

export default App;
