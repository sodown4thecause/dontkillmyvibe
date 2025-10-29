'use client';

import { useEffect, useState } from 'react';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export default function LoadingSpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % spinnerFrames.length);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="font-mono text-terminal-green text-2xl glow-text">
        {spinnerFrames[frame]} Loading...
      </div>
    </div>
  );
}
