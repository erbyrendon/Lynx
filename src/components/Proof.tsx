import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    value: 60,
    suffix: '%',
    label: 'Operational friction reduced',
  },
  {
    icon: Users,
    value: 5,
    suffix: 'x',
    label: 'Lead conversion increase',
  },
  {
    icon: Clock,
    value: 100,
    suffix: '%',
    label: 'Seamless user experiences',
  },
  {
    icon: Target,
    value: 100,
    suffix: '%',
    label: 'Clarity and flow delivered',
  },
];

export default function Proof() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(metrics.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          animateCounters();
        }
      },
      { threshold: 0.3 }
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

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    metrics.forEach((metric, index) => {
      let currentStep = 0;
      const increment = metric.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.min(Math.round(increment * currentStep), metric.value);
          return newCounters;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  return (
    <section ref={sectionRef} id="proof" className="py-32 bg-gradient-to-b from-dark-gray to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-metallic-silver/5 animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Engineered for <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From enterprise operations to creative teams, LYNX has:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const delay = index * 150;

            return (
              <div
                key={index}
                className={`relative group p-10 rounded-2xl bg-gradient-to-br from-dark-gray to-black border border-gray-800 hover:border-electric-blue transition-all duration-700 overflow-hidden cursor-pointer hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 ripple" />

                <div className="relative z-10 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-blue/10 group-hover:bg-electric-blue/20 transition-colors">
                    <Icon className="w-8 h-8 text-electric-blue" strokeWidth={1.5} />
                  </div>

                  <div className="mb-4">
                    <span className="text-6xl font-bold gradient-text">
                      {counters[index]}
                    </span>
                    <span className="text-4xl font-bold text-electric-blue">{metric.suffix}</span>
                  </div>

                  <p className="text-gray-400 leading-relaxed">{metric.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-16">
            Every number represents real transformation. Every metric reflects measurable clarity and flow in multi-team workflows.
          </p>
        </div>

        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 hover:border-electric-blue transition-colors duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <video
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/CLiente_Tattoo_prueba.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
