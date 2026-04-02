import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ContactFormData {
  name: string;
  email: string;
  business: string;
  message: string;
  website: string;
}

export default function ContactTab() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    business: '',
    message: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-fill from chatbot funnel if user came via "Schedule a Consultation" CTA
  useEffect(() => {
    const raw = sessionStorage.getItem('lynx_chat_prefill');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.message) {
        setFormData(prev => ({ ...prev, message: data.message }));
      }
    } catch { /* ignore malformed data */ }
    sessionStorage.removeItem('lynx_chat_prefill');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        setFormData({ name: '', email: '', business: '', message: '', website: '' });
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
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-300">
                {t('yourName')}
              </label>
              <input
                id="contact-name"
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
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-300">
                {t('emailAddress')}
              </label>
              <input
                id="contact-email"
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
            <label htmlFor="contact-business" className="mb-2 block text-sm font-medium text-gray-300">
              {t('businessName')}
            </label>
            <input
              id="contact-business"
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

          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-gray-300">
              {t('automationNeeds')}
            </label>
            <textarea
              id="contact-message"
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
