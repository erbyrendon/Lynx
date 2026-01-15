import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import WordReveal from '../WordReveal';
import AnimatedBackground from '../AnimatedBackground';

export default function HomeTab() {
  const { t } = useLanguage();
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTextVisible(true);
  }, []);

  const headline = t('homeHeadline');

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden p-12">
      <AnimatedBackground />

      <div className="relative z-10 text-center max-w-5xl">
        <div className="mb-8 inline-block animate-float">
          <img
            src="/devotednote6_abstract_eye_icon_with_soft_emerald_strokes_and_a__30d2a20b-a43c-47ee-8a4d-7e083c8501e0-removebg-preview.png"
            alt="LYNX Logo"
            className="w-48 h-48 object-contain drop-shadow-2xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight gradient-text">
          {textVisible && <WordReveal text={headline} staggerDelay={25} />}
        </h1>

        <p
          className="text-lg md:text-xl mb-6 text-gray-300 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-700"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {t('homeSubtitle1')}
        </p>

        <p
          className="text-base md:text-lg mb-10 text-gray-400 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-1000"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {t('homeSubtitle2')}
        </p>

        <button
          className="inline-flex items-center gap-3 px-8 py-3 bg-electric-blue text-black font-semibold text-base rounded-full hover:bg-white transition-all duration-300 glow-border group hover:scale-105 ripple animate-heartbeat"
          style={{
            opacity: textVisible ? 1 : 0,
            transitionDelay: '1300ms',
          }}
          onClick={() => {
            const contactTab = document.querySelector('[data-tab="contact"]') as HTMLElement;
            contactTab?.click();
          }}
        >
          {t('experienceLynx')}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
