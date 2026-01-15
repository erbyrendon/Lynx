import { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} px-3 py-2 bg-electric-blue text-black text-sm font-medium rounded-lg whitespace-nowrap z-50 animate-fade-in-scale`}
        >
          {content}
          <div className="absolute w-2 h-2 bg-electric-blue transform rotate-45" style={{
            bottom: position === 'top' ? '-4px' : 'auto',
            top: position === 'bottom' ? '-4px' : 'auto',
            right: position === 'left' ? '-4px' : 'auto',
            left: position === 'right' ? '-4px' : 'auto',
          }} />
        </div>
      )}
    </div>
  );
}
