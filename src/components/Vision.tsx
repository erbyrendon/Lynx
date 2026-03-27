import { useEffect, useRef, useState } from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

export default function Vision() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-black via-dark-gray to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-electric-blue/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            The Invisible Infrastructure{' '}
            <span className="gradient-emerald">of Clarity</span>
          </h2>
        </div>

        <div
          className={`text-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
            We power the next generation of creators, companies, and movements.
          </p>
          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
            Instinct meets intelligence, design meets data, emotion meets execution. Every system empowers humans to act decisively and effortlessly.
          </p>
        </div>

        <div
          className={`text-center mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto my-12" />
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Imagine your business operating as a living organism — every decision informed, every process optimized, every interaction flowing naturally.
          </p>
          <p className="text-2xl font-semibold text-emerald-500 mt-6">
            That is LYNX.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { icon: Brain, text: 'Every decision informed' },
            { icon: Sparkles, text: 'Every process optimized' },
            { icon: Zap, text: 'Every interaction flowing' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gradient-to-b from-emerald-500/5 to-transparent border border-gray-800 hover:border-emerald-500 transition-all duration-500 group"
              >
                <Icon className="w-12 h-12 text-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <p className="text-lg text-gray-300">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
