import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { supabase, type Tab } from '../lib/supabase';
import { getLucideIconByName } from '../lib/icons';
import { useLanguage } from '../contexts/LanguageContext';

const HomeTab = lazy(() => import('./tabs/HomeTab'));
const AboutTab = lazy(() => import('./tabs/AboutTab'));
const StoryTab = lazy(() => import('./tabs/StoryTab'));
const ServicesTab = lazy(() => import('./tabs/ServicesTab'));
const ValuesTab = lazy(() => import('./tabs/ValuesTab'));
const ProofTab = lazy(() => import('./tabs/ProofTab'));
const ImpactTab = lazy(() => import('./tabs/ImpactTab'));
const ContactTab = lazy(() => import('./tabs/ContactTab'));
const IndustrySolutionsTab = lazy(() => import('./tabs/IndustrySolutionsTab'));
const IndustryDetailTab = lazy(() => import('./tabs/IndustryDetailTab'));
const SpecializedSolutionsTab = lazy(() => import('./tabs/SpecializedSolutionsTab'));
const TattooStudiosPage = lazy(() => import('./industries/TattooStudiosPage'));

export default function TabbedLanding() {
  const { language, t } = useLanguage();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const loadTabs = useCallback(async () => {
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
  }, [language]);

  useEffect(() => {
    loadTabs();
  }, [loadTabs]);

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
        return <ImpactTab />;
      case 'solutions':
        return <IndustrySolutionsTab onNavigateToIndustry={handleNavigateToIndustry} />;
      case 'specialized':
        return <SpecializedSolutionsTab />;
      case 'contact':
        return <ContactTab />;
      default:
        return <HomeTab />;
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = getLucideIconByName(iconName);
    return <Icon className="w-5 h-5" strokeWidth={1.5} />;
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
                {activeTab === tab.slug && (
                  <Suspense
                    fallback={(
                      <div className="min-h-[600px] flex items-center justify-center text-electric-blue animate-pulse">
                        {t('loading')}
                      </div>
                    )}
                  >
                    {getTabContent(tab.slug)}
                  </Suspense>
                )}
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
