import { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';

export default function About() {
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
    <section ref={sectionRef} id="about" className="py-32 bg-gradient-to-b from-black to-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-transparent to-electric-blue animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className={`mb-6 inline-flex items-center gap-2 text-emerald-500 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <Zap className="w-6 h-6" />
              <span className="text-sm font-semibold tracking-wider uppercase">Intelligence in Motion</span>
            </div>

            <h2
              className={`text-5xl md:text-6xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Intelligence in{' '}
              <span className="gradient-emerald">Motion</span>
            </h2>

            <p
              className={`text-xl text-gray-400 leading-relaxed mb-6 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              LYNX exists at the intersection of human creativity and systemic intelligence. For years, we've refined frameworks that make complex operations feel effortless.
            </p>

            <p
              className={`text-xl text-gray-400 leading-relaxed mb-6 transition-all duration-1000 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Every solution is adaptive, every interface alive, every system crafted to anticipate, evolve, and scale.
            </p>

            <p
              className={`text-lg text-gray-500 leading-relaxed transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Our work is precise, silent, and invisible — yet its impact is unmistakable. From enterprise operations to individual workflows, LYNX transforms chaos into flow.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden glow-emerald bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full border-4 border-emerald-500/30 animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-4 border-emerald-400/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <img
                        src="/devotednote6_abstract_eye_icon_with_soft_emerald_strokes_and_a__30d2a20b-a43c-47ee-8a4d-7e083c8501e0-removebg-preview.png"
                        alt="LYNX Logo"
                        className="w-full h-full object-contain animate-morph-drift"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-500/50 rounded-full"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      animation: `glow-pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
