import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Marcus Chen',
    role: 'First-time Client',
    rating: 5,
    text: 'The booking process was seamless, and the artist took the time to understand exactly what I wanted. The studio was pristine, and the final result exceeded my expectations. Highly recommend!',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'Sarah Williams',
    role: 'Returning Client',
    rating: 5,
    text: 'I\'ve gotten three tattoos here now, and each experience has been incredible. The artists are true professionals who genuinely care about their craft. The atmosphere is welcoming and the attention to detail is unmatched.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    name: 'David Rodriguez',
    role: 'Cover-up Specialist',
    rating: 5,
    text: 'After a bad experience at another shop, I was hesitant. But the team here transformed my old tattoo into something I\'m proud to show off. Their expertise in cover-ups is phenomenal.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export default function Proof() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
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
    <section ref={sectionRef} id="proof" className="py-32 bg-gradient-to-b from-dark-gray to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 via-transparent to-metallic-silver/5 animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real experiences from real clients who trust us with their vision
          </p>
        </div>

        <div
          className={`max-w-5xl mx-auto mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 hover:border-electric-blue transition-colors duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <video
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/CLiente_Tattoo_prueba_lynx.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-gray-400 mt-4 italic">Watch our client showcase their fresh ink</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            const delay = (index + 1) * 200 + 500;

            return (
              <div
                key={index}
                className={`relative group p-8 rounded-2xl bg-gradient-to-br from-dark-gray to-black border border-gray-800 hover:border-electric-blue transition-all duration-700 overflow-hidden cursor-pointer hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 ripple" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-electric-blue/30"
                    />
                    <div>
                      <h3 className="font-semibold text-white text-lg">{review.name}</h3>
                      <p className="text-gray-400 text-sm">{review.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-electric-blue fill-electric-blue" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-electric-blue/30 mb-3" />

                  <p className="text-gray-300 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
