import { useState, useEffect } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import WordReveal from './WordReveal';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    setTextVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headline = "From Chaos to Clarity.";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-black via-dark-gray to-black transition-transform duration-700"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 opacity-30">
          {[...Array(80)].map((_, i) => {
            const isEmerald = i % 3 === 0;
            return (
              <div
                key={i}
                className={`absolute rounded-full ${isEmerald ? 'bg-emerald-500' : 'bg-electric-blue'}`}
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animation: `glow-pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="mb-8 inline-block animate-float">
          <img
            src="/devotednote6_abstract_eye_icon_with_soft_emerald_strokes_and_a__30d2a20b-a43c-47ee-8a4d-7e083c8501e0-removebg-preview.png"
            alt="LYNX Logo"
            className="w-80 h-80 object-contain drop-shadow-2xl"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight gradient-text">
          {textVisible && <WordReveal text={headline} staggerDelay={25} />}
        </h1>

        <p
          className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-700"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          We don't automate. We architect awareness — systems, workflows, and interfaces that see, adapt, and evolve.
        </p>

        <p
          className="text-lg md:text-xl mb-12 text-gray-400 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-1000"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Every interaction, process, and interface is designed to reveal what matters, remove friction, and empower humans to act with precision.
        </p>

        <a
          href="#contact"
          className="inline-flex items-center gap-3 px-8 py-4 bg-electric-blue text-black font-semibold text-lg rounded-full hover:bg-white transition-all duration-300 glow-border group hover:scale-105 ripple animate-heartbeat"
          style={{
            opacity: textVisible ? 1 : 0,
            transitionDelay: '1300ms',
          }}
        >
          Experience LYNX Intelligence
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-electric-blue rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
