import { useEffect, useRef, useState } from 'react';
import { useMousePosition, useCursorActive } from '../hooks/useMousePosition';

export default function CustomCursor() {
  const position = useMousePosition();
  const isActive = useCursorActive();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${position.x}px`;
      cursorRef.current.style.top = `${position.y}px`;
    }
  }, [position]);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`cursor-ring ${isActive ? 'active' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
    />
  );
}
