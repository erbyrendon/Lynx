import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
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

    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    setIsSubmitting(false);

    setTimeout(() => {
      setFormData({ name: '', email: '', business: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-metallic-silver/5" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Activate Your <span className="gradient-text">LYNX Intelligence</span>
          </h2>
          <p className="text-xl text-gray-400">
            Clarity, flow, and silent power — ready to transform your business.
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
                placeholder="Your Name"
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
                placeholder="Email Address"
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
              placeholder="Business Name"
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
              placeholder="Tell us about your automation needs..."
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
                'Sending...'
              ) : submitStatus === 'success' ? (
                'Message Sent!'
              ) : (
                <>
                  Begin the Journey
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
