'use client';

import { useEffect, useState } from 'react';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-4 border border-terminal-green/30 bg-terminal-bg-secondary p-4">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-terminal-green/30">
        <span className="text-terminal-green font-mono text-sm">$</span>
        <h2 className="text-terminal-green font-mono text-sm font-bold">
          TABLE OF CONTENTS
        </h2>
      </div>
      <ul className="space-y-2 text-sm font-mono">
        {headings.map(({ level, text, id }) => (
          <li
            key={id}
            style={{ paddingLeft: `${(level - 2) * 0.75}rem` }}
          >
            <a
              href={`#${id}`}
              className={`block py-1 transition-colors hover:text-terminal-cyan ${
                activeId === id
                  ? 'text-terminal-cyan border-l-2 border-terminal-cyan pl-2'
                  : 'text-terminal-gray hover:border-l-2 hover:border-terminal-cyan hover:pl-2'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
