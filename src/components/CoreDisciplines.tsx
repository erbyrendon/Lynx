import { useEffect, useRef, useState } from 'react';
import { Target, MessageCircle, Workflow, Globe, PenTool, ChevronDown } from 'lucide-react';

const disciplines = [
  {
    icon: Target,
    title: 'Intelligent Lead Systems',
    subtitle: 'Capture, nurture, and convert leads with precision.',
    features: [
      'AI-driven lead qualification and scoring',
      'CRM integration that predicts next steps',
      'Automated adaptive nurturing campaigns',
      'Real-time insight dashboards',
      'Predictive analytics for smarter decisions',
    ],
  },
  {
    icon: MessageCircle,
    title: 'Adaptive Communication',
    subtitle: 'Customer interactions that feel human — always.',
    features: [
      'AI-driven support learning contextually',
      'Multichannel messaging integrated seamlessly',
      'Context-aware, brand-consistent responses',
      'Behavioral triggers for proactive engagement',
      'Voice and text micro-interactions',
    ],
  },
  {
    icon: Workflow,
    title: 'Operational Flow Design',
    subtitle: 'Silent systems that optimize every process.',
    features: [
      'Workflow automation for delivery, scheduling, coordination',
      'Intelligent notifications and escalation triggers',
      'Analytics dashboards visualizing efficiency',
      'Scenario simulations predicting bottlenecks',
      'Dynamic recommendations for optimization',
    ],
  },
  {
    icon: Globe,
    title: 'Presence Engineering',
    subtitle: 'Websites, apps, and social systems that feel alive.',
    features: [
      'UI/UX optimized for clarity, speed, engagement',
      'Interactive elements guiding attention',
      'Scalable, resilient infrastructure',
      'Continuous optimization for performance',
      'Micro-interactions enhancing perceived intelligence',
    ],
  },
  {
    icon: PenTool,
    title: 'Signal Creation',
    subtitle: 'Stories and content that transmit clarity, emotion, and influence.',
    features: [
      'Strategic storytelling aligned to brand perception',
      'Micro-copy triggering flow and engagement',
      'Integrated visual & written language for impact',
      'Multi-format content systems: web, social, email',
      'Analytics-driven adjustments for maximum resonance',
    ],
  },
];

export default function CoreDisciplines() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionEl) {
      observer.observe(sectionEl);
    }

    return () => {
      if (sectionEl) {
        observer.unobserve(sectionEl);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-transparent to-metallic-silver" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Core <span className="gradient-text">Disciplines</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Five pillars of intelligence that drive measurable transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon;
            const isExpanded = expandedIndex === index;
            const delay = index * 100;

            return (
              <div
                key={index}
                className={`group p-8 rounded-xl bg-dark-gray border border-gray-800 hover:border-electric-blue transition-all duration-500 cursor-pointer ${
                  isExpanded ? 'lg:col-span-2 glow-border' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${delay}ms` }}
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
    </section>
  );
}
