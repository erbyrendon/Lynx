import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: React.ReactNode[];
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

export default function Carousel({
  items,
  autoAdvance = true,
  autoAdvanceInterval = 6000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoAdvance || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [autoAdvance, autoAdvanceInterval, items.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-gray-700 hover:border-electric-blue transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-electric-blue group-hover:scale-110 transition-transform" strokeWidth={1.5} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-gray-700 hover:border-electric-blue transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-electric-blue group-hover:scale-110 transition-transform" strokeWidth={1.5} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-electric-blue w-8'
                : 'bg-gray-700 hover:bg-gray-600 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
