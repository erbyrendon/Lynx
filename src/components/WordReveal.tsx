interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function WordReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 30,
}: WordRevealProps) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block animate-word-fade-up ${className}`}
          style={{
            animationDelay: `${delay + i * staggerDelay}ms`,
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </>
  );
}
