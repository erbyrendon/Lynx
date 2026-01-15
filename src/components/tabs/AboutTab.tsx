import { Brain, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AboutTab() {
  const { t } = useLanguage();

  return (
    <div className="p-12">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-emerald-500">
              <Zap className="w-6 h-6" />
              <span className="text-sm font-semibold tracking-wider uppercase">{t('aboutBadge')}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('aboutHeading').split(' ').slice(0, -1).join(' ')}{' '}
              <span className="gradient-emerald">{t('aboutHeading').split(' ').slice(-1)}</span>
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed mb-4">
              {t('aboutPara1')}
            </p>

            <p className="text-lg text-gray-400 leading-relaxed mb-4">
              {t('aboutPara2')}
            </p>

            <p className="text-base text-gray-500 leading-relaxed">
              {t('aboutPara3')}
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
            </div>
          </div>
        </div>

        <div className="text-center space-y-8">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />

          <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {t('aboutInfrastructure').split(' of ')[0]}{' '}
            <span className="gradient-emerald">of {t('aboutInfrastructure').split(' of ')[1]}</span>
          </h3>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            {t('aboutPower')}
          </p>

          <p className="text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto">
            {t('aboutInstinct')}
          </p>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto my-8" />

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            {t('aboutImagine')}
          </p>

          <p className="text-2xl font-semibold text-emerald-500 mt-6">
            {t('aboutThat')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Brain, text: t('aboutDecision') },
            { icon: Sparkles, text: t('aboutProcess') },
            { icon: Zap, text: t('aboutInteraction') },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-b from-emerald-500/5 to-transparent border border-gray-800 hover:border-emerald-500 transition-all duration-500 group"
              >
                <Icon className="w-10 h-10 text-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <p className="text-base text-gray-300">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
