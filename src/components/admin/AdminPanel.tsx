import { useState } from 'react';
import { Settings, Layout, Target, Heart, TrendingUp, MessageSquare } from 'lucide-react';
import TabsManager from './TabsManager';
import DisciplinesManager from './DisciplinesManager';
import ValuesManager from './ValuesManager';
import MetricsManager from './MetricsManager';
import SubmissionsManager from './SubmissionsManager';

type AdminSection = 'tabs' | 'disciplines' | 'values' | 'metrics' | 'submissions';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<AdminSection>('tabs');

  const sections = [
    { id: 'tabs' as AdminSection, label: 'Tabs', icon: Layout },
    { id: 'disciplines' as AdminSection, label: 'Disciplines', icon: Target },
    { id: 'values' as AdminSection, label: 'Values', icon: Heart },
    { id: 'metrics' as AdminSection, label: 'Metrics', icon: TrendingUp },
    { id: 'submissions' as AdminSection, label: 'Contact Forms', icon: MessageSquare },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'tabs':
        return <TabsManager />;
      case 'disciplines':
        return <DisciplinesManager />;
      case 'values':
        return <ValuesManager />;
      case 'metrics':
        return <MetricsManager />;
      case 'submissions':
        return <SubmissionsManager />;
      default:
        return <TabsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-gray to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Settings className="w-10 h-10 text-emerald-500" />
          <div>
            <h1 className="text-4xl font-bold gradient-emerald">Admin Panel</h1>
            <p className="text-gray-400">Manage your LYNX content</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-electric-blue text-black font-semibold'
                      : 'bg-dark-gray text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>

          <div className="md:col-span-3">
            <div className="bg-dark-gray border border-gray-800 rounded-xl p-6">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
