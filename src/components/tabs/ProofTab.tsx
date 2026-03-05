import { useState, useEffect, useRef } from 'react';
import { Star, Quote, Play, Building2, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const featuredClient = {
  businessName: 'Ink & Soul Tattoo Studio',
  owner: 'Elena Martinez',
  role: 'Owner & Lead Artist',
  location: 'Portland, Oregon',
  service: 'Complete Digital Transformation & Brand Refresh',
  rating: 5,
  videoFile: '/CLiente_Tattoo_prueba.mp4',
  testimonial: 'Working with Lynx was transformative for our business. They didn\'t just build us a website—they completely reimagined how we connect with clients. Our online booking system has cut administrative time by 60%, and the custom portfolio showcase they designed has become our best sales tool. What impressed me most was their understanding of the tattoo industry. They took time to learn our craft, our challenges, and our vision. The result? A 140% increase in quality bookings and a waiting list that\'s grown from 2 weeks to 3 months.',
  results: [
    { icon: TrendingUp, label: '140% increase in bookings', value: '140%' },
    { icon: Users, label: 'Waiting list growth', value: '3 months' },
    { icon: Building2, label: 'Admin time saved', value: '60%' }
  ],
  image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400'
};

const clientReviews = [
  {
    name: 'Michael Thompson',
    businessName: 'Thompson & Associates Law Firm',
    role: 'Managing Partner',
    service: 'Website Redesign & SEO Strategy',
    rating: 5,
    text: 'Our old website was turning potential clients away. Lynx rebuilt it from the ground up with a focus on user experience and conversion. Within three months, our consultation requests doubled, and we\'re now ranking on page one for our key practice areas. Their attention to detail and responsiveness throughout the project was exceptional.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Sarah Chen',
    businessName: 'Bloom Organic Skincare',
    role: 'Founder & CEO',
    service: 'E-commerce Platform & Marketing Automation',
    rating: 5,
    text: 'As a small business competing with major brands, we needed every advantage. Lynx built us a beautiful e-commerce platform that converts visitors into customers at nearly 4x the industry average. The automated email campaigns they set up have become our most profitable marketing channel. They truly invested in understanding our brand values and our customers.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'James Rodriguez',
    businessName: 'Fitness First Training Center',
    role: 'Owner',
    service: 'Member Portal & Class Booking System',
    rating: 5,
    text: 'The custom member portal Lynx developed has revolutionized how we operate. Members can book classes, track progress, and manage their accounts seamlessly. Our front desk staff went from spending 80% of their time on administrative tasks to focusing on member experience. The system paid for itself in labor savings within 4 months.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Dr. Amanda Foster',
    businessName: 'Foster Dental Wellness',
    role: 'Practice Owner',
    service: 'Patient Management System & Telehealth Integration',
    rating: 5,
    text: 'Lynx delivered exactly what we needed during a critical transition to hybrid care. The patient portal they built integrates perfectly with our existing systems, and the telehealth functionality opened up a new revenue stream. Patient satisfaction scores increased by 35% since launch. Their healthcare industry knowledge was evident in every decision.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export default function ProofTab() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div ref={sectionRef} className="p-12">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'en' ? 'Client' : 'Historias de'} <span className="gradient-text">{language === 'en' ? 'Success Stories' : 'Éxito'}</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Real results from businesses we\'ve helped transform through strategic digital solutions'
              : 'Resultados reales de empresas que hemos ayudado a transformar a través de soluciones digitales estratégicas'}
          </p>
        </div>

        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative p-10 rounded-3xl bg-gradient-to-br from-dark-gray/80 to-black border-2 border-electric-blue/30 hover:border-electric-blue transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent rounded-3xl" />

            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-electric-blue/20 border border-electric-blue/40">
                  <p className="text-xs font-semibold text-electric-blue uppercase tracking-wider">
                    {language === 'en' ? 'Featured Client' : 'Cliente Destacado'}
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={featuredClient.image}
                      alt={featuredClient.businessName}
                      className="w-20 h-20 rounded-full object-cover border-2 border-electric-blue/50"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{featuredClient.businessName}</h3>
                      <p className="text-gray-400">{featuredClient.owner}, {featuredClient.role}</p>
                      <p className="text-sm text-electric-blue">{featuredClient.location}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      {language === 'en' ? 'Service Provided' : 'Servicio Proporcionado'}
                    </p>
                    <p className="text-white font-medium">{featuredClient.service}</p>
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(featuredClient.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-electric-blue fill-electric-blue" />
                    ))}
                  </div>

                  <Quote className="w-10 h-10 text-electric-blue/30 mb-4" />
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    {featuredClient.testimonial}
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                    {featuredClient.results.map((result, idx) => {
                      const Icon = result.icon;
                      return (
                        <div key={idx} className="text-center">
                          <Icon className="w-6 h-6 text-electric-blue mx-auto mb-2" />
                          <p className="text-2xl font-bold text-white mb-1">{result.value}</p>
                          <p className="text-xs text-gray-400">{result.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-electric-blue/40 hover:border-electric-blue transition-colors duration-500 group w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative">
                      <video
                        className="w-full h-auto"
                        controls
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={featuredClient.videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center gap-2 text-white">
                          <Play className="w-3 h-3" />
                          <p className="text-xs font-medium">
                            {language === 'en' ? 'Video Testimonial' : 'Testimonio en Video'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-3">
            {language === 'en' ? 'More Client' : 'Más'} <span className="gradient-text">{language === 'en' ? 'Testimonials' : 'Testimonios'}</span>
          </h3>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            {language === 'en'
              ? 'Trusted by businesses across industries to deliver results that matter'
              : 'Confiado por empresas de todas las industrias para entregar resultados que importan'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {clientReviews.map((review, index) => {
            const delay = (index + 1) * 150 + 600;

            return (
              <div
                key={index}
                className={`relative group p-8 rounded-2xl bg-gradient-to-br from-dark-gray to-black border border-gray-800 hover:border-electric-blue transition-all duration-700 overflow-hidden hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 ripple" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-electric-blue/30"
                      />
                      <div>
                        <h4 className="font-bold text-white text-lg">{review.name}</h4>
                        <p className="text-sm text-electric-blue font-medium">{review.businessName}</p>
                        <p className="text-xs text-gray-400">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-electric-blue fill-electric-blue" />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 pb-4 border-b border-gray-800">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                      {language === 'en' ? 'Service' : 'Servicio'}
                    </p>
                    <p className="text-sm text-gray-300 font-medium">{review.service}</p>
                  </div>

                  <Quote className="w-7 h-7 text-electric-blue/30 mb-3" />

                  <p className="text-gray-300 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
