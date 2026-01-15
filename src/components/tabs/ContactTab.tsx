import { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase, type ContactSubmission } from '../../lib/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ContactTab() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    business: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            ...formData,
            status: 'new',
          },
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ name: '', email: '', business: '', message: '' });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('activateIntelligence').split(' LYNX')[0]} <span className="gradient-text">LYNX {t('activateIntelligence').split(' LYNX')[1]}</span>
          </h2>
          <p className="text-lg text-gray-400">
            {t('activateDesc')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('yourName')}
                required
                className="w-full px-6 py-4 bg-dark-gray border border-gray-800 rounded-lg focus:border-electric-blue focus:outline-none focus:glow-border transition-all text-white placeholder-gray-500 animate-fade-in-scale"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('emailAddress')}
                required
                className="w-full px-6 py-4 bg-dark-gray border border-gray-800 rounded-lg focus:border-electric-blue focus:outline-none focus:glow-border transition-all text-white placeholder-gray-500 animate-fade-in-scale"
                style={{ animationDelay: '50ms' }}
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              name="business"
              value={formData.business}
              onChange={handleChange}
              placeholder={t('businessName')}
              required
              className="w-full px-6 py-4 bg-dark-gray border border-gray-800 rounded-lg focus:border-electric-blue focus:outline-none focus:glow-border transition-all text-white placeholder-gray-500 animate-fade-in-scale"
              style={{ animationDelay: '100ms' }}
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('automationNeeds')}
              rows={6}
              required
              className="w-full px-6 py-4 bg-dark-gray border border-gray-800 rounded-lg focus:border-electric-blue focus:outline-none focus:glow-border transition-all text-white placeholder-gray-500 resize-none animate-fade-in-scale"
              style={{ animationDelay: '150ms' }}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 px-10 py-4 bg-electric-blue text-black font-semibold text-lg rounded-full hover:bg-white transition-all duration-300 glow-border disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-105 animate-glow-pulse ripple"
            >
              {isSubmitting ? (
                t('sending')
              ) : submitStatus === 'success' ? (
                t('messageSent')
              ) : submitStatus === 'error' ? (
                t('errorTryAgain')
              ) : (
                <>
                  {t('beginJourney')}
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
