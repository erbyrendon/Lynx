import { useLanguage } from '../../contexts/LanguageContext';

export default function StoryTab() {
  const { t } = useLanguage();

  const values = [
    { title: t('valueRespect'), description: t('valueRespectDesc') },
    { title: t('valueResponsibility'), description: t('valueResponsibilityDesc') },
    { title: t('valueEfficiency'), description: t('valueEfficiencyDesc') },
    { title: t('valueInnovation'), description: t('valueInnovationDesc') },
    { title: t('valuePerspicacity'), description: t('valuePerspicacityDesc') },
  ];

  return (
    <div className="p-12">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('storyEssence')}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto" />
        </div>

        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-light mb-6 text-emerald-300">
            {t('storyEyeBuilds')}
          </h3>
        </div>

        <div>
          <h4 className="text-2xl font-semibold mb-6 text-center text-emerald-400">
            {t('storyManifesto')}
          </h4>
          <div className="space-y-6 text-center">
            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed whitespace-pre-line">
              {t('storyBuilders')}
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-8" />

            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">
              {t('storyNoise')}
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-8" />

            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">
              {t('storyBorn')}
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-8" />

            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">
              {t('storyTrends')}
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-8" />

            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">
              {t('storyForce')}
            </p>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto my-8" />

            <p className="text-xl md:text-2xl font-light text-emerald-300 leading-relaxed">
              {t('storyWeAreLynx')}
            </p>
          </div>
        </div>

        <div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto my-12" />

          <h4 className="text-2xl font-semibold mb-4 text-center text-emerald-400">
            {t('storyMission')}
          </h4>
          <p className="text-base md:text-lg text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            {t('storyMissionText')}
          </p>
        </div>

        <div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto my-12" />

          <h4 className="text-2xl font-semibold mb-4 text-center text-emerald-400">
            {t('storyVision')}
          </h4>
          <p className="text-base md:text-lg text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            {t('storyVisionText')}
          </p>
        </div>

        <div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto my-12" />

          <h4 className="text-2xl font-semibold mb-8 text-center text-emerald-400">
            {t('storyValues')}
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-5 rounded-lg bg-gradient-to-b from-emerald-500/5 to-transparent border border-emerald-500/20"
              >
                <h5 className="text-lg font-semibold mb-2 text-emerald-300">
                  {value.title}
                </h5>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
