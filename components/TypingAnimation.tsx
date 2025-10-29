'use client';

import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypingAnimation({ 
  text, 
  speed = 50, 
  className = '' 
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-blink">█</span>
      )}
    </span>
  );
}
