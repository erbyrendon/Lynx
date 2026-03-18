import { useState, useEffect } from 'react';
import { supabase, type Tab } from '../lib/supabase';
import * as Icons from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HomeTab from './tabs/HomeTab';
import AboutTab from './tabs/AboutTab';
import StoryTab from './tabs/StoryTab';
import ServicesTab from './tabs/ServicesTab';
import ValuesTab from './tabs/ValuesTab';
import ProofTab from './tabs/ProofTab';
import ContactTab from './tabs/ContactTab';
import IndustrySolutionsTab from './tabs/IndustrySolutionsTab';
import IndustryDetailTab from './tabs/IndustryDetailTab';
import TattooStudiosPage from './industries/TattooStudiosPage';

export default function TabbedLanding() {
  const { language, t } = useLanguage();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  useEffect(() => {
    loadTabs();
  }, [language]);

  const loadTabs = async () => {
    try {
      const { data, error } = await supabase
        .from('tabs')
        .select('*')
        .eq('is_active', true)
        .eq('language', language)
        .order('sort_order');

      if (error) throw error;
      if (data) {
        setTabs(data);
      }
    } catch (error) {
      console.error('Error loading tabs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToIndustry = (slug: string) => {
    setSelectedIndustry(slug);
  };

  const handleBackToSolutions = () => {
    setSelectedIndustry(null);
  };

  const getTabContent = (slug: string) => {
    if (slug === 'solutions' && selectedIndustry) {
      if (selectedIndustry === 'tattoo-studios') {
        return <TattooStudiosPage onBack={handleBackToSolutions} />;
      }
      return (
        <IndustryDetailTab
          slug={selectedIndustry}
          onBack={handleBackToSolutions}
        />
      );
    }

    switch (slug) {
      case 'home':
        return <HomeTab />;
      case 'about':
        return <AboutTab />;
      case 'story':
        return <StoryTab />;
      case 'services':
        return <ServicesTab />;
      case 'values':
        return <ValuesTab />;
      case 'proof':
        return <ProofTab />;
      case 'impact':
        return <ProofTab />;
      case 'solutions':
        return <IndustrySolutionsTab onNavigateToIndustry={handleNavigateToIndustry} />;
      case 'contact':
        return <ContactTab />;
      default:
        return <HomeTab />;
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5" strokeWidth={1.5} /> : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-electric-blue text-xl animate-pulse">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <img
            src="/devotednote6_abstract_eye_icon_with_soft_emerald_strokes_and_a__30d2a20b-a43c-47ee-8a4d-7e083c8501e0-removebg-preview.png"
            alt="LYNX Logo"
            className="w-24 h-24 object-contain"
          />
          <h1 className="text-4xl font-bold gradient-emerald ml-4">LYNX</h1>
        </div>

        <div className="bg-dark-gray border border-gray-800 rounded-2xl overflow-hidden">
          <div className="border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0 z-40">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  data-tab={tab.slug}
                  onClick={() => setActiveTab(tab.slug)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${
                    activeTab === tab.slug
                      ? 'text-electric-blue border-electric-blue bg-electric-blue/5'
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-gray-900/50'
                  }`}
                >
                  {getIcon(tab.icon)}
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[600px]">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`transition-all duration-500 ${
                  activeTab === tab.slug
                    ? 'opacity-100 relative'
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              >
                {activeTab === tab.slug && getTabContent(tab.slug)}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LYNX. {t('copyright')}</p>
        </div>
      </div>
    </div>
  );
}
