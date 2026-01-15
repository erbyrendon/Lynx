import { useEffect, useRef, useState } from 'react';
import { Eye, Zap, Target, Wind, Search } from 'lucide-react';
import Tooltip from './Tooltip';

const values = [
  {
    icon: Eye,
    title: 'Clarity Above All',
    description: 'Noise is removed. What matters stands clear.',
    example: 'Simplify complex dashboards into actionable insights.',
  },
  {
    icon: Zap,
    title: 'Adaptive Intelligence',
    description: 'Challenges become insights; patterns become growth.',
    example: 'Systems learn from every interaction to improve.',
  },
  {
    icon: Target,
    title: 'Human-Centric Precision',
    description: 'Machines are tools; human perception is the guide.',
    example: 'AI amplifies human decision-making, never replaces it.',
  },
  {
    icon: Wind,
    title: 'Invisible Power',
    description: 'Silent influence, measurable impact.',
    example: 'Automation happens in the background; results speak.',
  },
  {
    icon: Search,
    title: 'Flow State Creation',
    description: 'Every interaction is effortless; every system is alive.',
    example: 'Users feel friction disappear with each touchpoint.',
  },
];

export default function Values() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue via-transparent to-emerald-500" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Values</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The principles that guide every system we build.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            const delay = index * 100;
            const isActive = activeIndex === index;

            return (
              <Tooltip key={index} content={value.example} position="top">
                <div
                  className={`p-8 rounded-xl bg-dark-gray border border-gray-800 transition-all duration-500 group cursor-help ${
                    isActive
                      ? 'border-electric-blue glow-border scale-105 animate-pulse-glow'
                      : 'hover:border-electric-blue opacity-60 hover:opacity-100'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${delay}ms` }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="mb-6">
                    <Icon
                      className={`w-10 h-10 text-electric-blue transition-all duration-300 ${
                        isActive ? 'animate-pulse-glow scale-125' : 'group-hover:scale-110'
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                    isActive ? 'text-electric-blue' : 'text-white group-hover:text-electric-blue'
                  }`}>
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{value.description}</p>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </section>
  );
}
