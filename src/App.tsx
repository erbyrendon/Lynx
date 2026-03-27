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

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="w-full max-w-2xl rounded-2xl border border-red-500/30 bg-gray-950/90 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400 mb-3">Configuration Error</p>
          <h1 className="text-3xl font-bold mb-4">Supabase environment variables are missing</h1>
          <p className="text-gray-300 mb-6 leading-relaxed">
            This deployment needs <code className="text-red-300">VITE_SUPABASE_URL</code> and <code className="text-red-300">VITE_SUPABASE_ANON_KEY</code>
            available during build time. Without them, the landing page cannot load its content.
          </p>
          <div className="rounded-xl border border-gray-800 bg-black/60 p-4 font-mono text-sm text-gray-200 space-y-2">
            <p>VITE_SUPABASE_URL=https://your-project.supabase.co</p>
            <p>VITE_SUPABASE_ANON_KEY=your-anon-key</p>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            In Railway, add both variables in the service settings and redeploy the project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <CustomCursor />

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

        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full border border-gray-700 hover:border-emerald-500 transition-all duration-300 shadow-lg"
          title={t('toggleAdmin')}
        >
          <Key className="w-5 h-5" />
        </button>
      </div>

      {showAdmin ? <AdminPanel /> : <TabbedLanding />}

      <Chatbot />
    </div>
  );
}

export default App;
