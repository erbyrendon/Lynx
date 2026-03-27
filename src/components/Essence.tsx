import { useEffect, useRef, useState } from 'react';

const values = [
  { title: 'Respect', description: 'Every interaction builds trust.' },
  { title: 'Responsibility', description: 'We own every outcome.' },
  { title: 'Efficiency', description: 'We refine until only clarity remains.' },
  { title: 'Innovation', description: 'We evolve faster than the system.' },
  { title: 'Perspicacity', description: 'We see what others overlook.' },
];

export default function Essence() {
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
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-dark-gray via-black to-dark-gray relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Our Essence
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto" />
        </div>

        <div className="space-y-24">
          <div
            className={`text-center transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-light mb-8 text-emerald-300">
              We Are the Eye That Builds
            </h3>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="text-2xl font-semibold mb-8 text-center text-emerald-400">
              Brand Manifesto
            </h4>
            <div className="space-y-8 text-center">
              <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                We are builders of the invisible.
                <br />
                Architects of systems that think, adapt, and evolve.
              </p>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-12" />

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
                In a world drowning in noise and repetition, we see patterns others miss.
                <br />
                We design intelligence — not to replace humanity, but to amplify it.
              </p>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-12" />

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
                LYNX was born from observation — from the belief that clarity creates power.
                <br />
                Every workflow, every process, every connection can be sharpened, automated, perfected.
              </p>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-12" />

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
                We don't chase trends.
                <br />
                We build foundations — systems that last, learn, and expand.
                <br />
                Because real innovation isn't about doing more; it's about doing better — with precision, focus, and awareness.
              </p>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-12" />

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
                We are the quiet force behind evolution.
                <br />
                The eye that sees beyond.
                <br />
                The mind that builds what others only imagine.
              </p>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-12" />

              <p className="text-xl md:text-2xl font-light text-emerald-300 leading-relaxed">
                We are LYNX — The Eye That Builds.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto my-16" />

            <h4 className="text-2xl font-semibold mb-6 text-center text-emerald-400">
              Mission
            </h4>
            <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
              To create intelligent systems that transform time into value, and complexity into clarity.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto my-16" />

            <h4 className="text-2xl font-semibold mb-6 text-center text-emerald-400">
              Vision
            </h4>
            <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
              To become the world's most trusted AI automation collective, building seamless digital ecosystems for global brands and entrepreneurs.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto my-16" />

            <h4 className="text-2xl font-semibold mb-12 text-center text-emerald-400">
              Values
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`text-center p-6 rounded-lg bg-gradient-to-b from-emerald-500/5 to-transparent border border-emerald-500/20 transition-all duration-700`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  <h5 className="text-xl font-semibold mb-3 text-emerald-300">
                    {value.title}
                  </h5>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
