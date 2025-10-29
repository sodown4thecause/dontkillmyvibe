'use client';

import Link from 'next/link';
import { Minus, Square, X } from 'lucide-react';

export default function TerminalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg-secondary border-b border-terminal-green/30">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <button className="w-3 h-3 rounded-full bg-terminal-red hover:shadow-glow-red transition-all" aria-label="Close" />
          <button className="w-3 h-3 rounded-full bg-terminal-amber hover:shadow-glow-amber transition-all" aria-label="Minimize" />
          <button className="w-3 h-3 rounded-full bg-terminal-green hover:shadow-glow-green transition-all" aria-label="Maximize" />
        </div>

        {/* Site title */}
        <Link href="/" className="flex-1 text-center">
          <h1 className="text-terminal-green font-bold text-lg glow-text hover:text-terminal-cyan transition-colors">
            DontKillMyVibe.dev
          </h1>
        </Link>

        {/* Placeholder for symmetry */}
        <div className="w-[68px]" />
      </div>

      {/* Navigation */}
      <nav className="border-t border-terminal-green/30 bg-terminal-bg px-4 py-2">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link 
              href="/" 
              className="text-terminal-cyan hover:text-terminal-amber transition-colors glow-text"
            >
              ~
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              className="text-terminal-cyan hover:text-terminal-amber transition-colors"
            >
              /blog
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="text-terminal-cyan hover:text-terminal-amber transition-colors"
            >
              /about
            </Link>
          </li>
          <li>
            <Link 
              href="/search" 
              className="text-terminal-cyan hover:text-terminal-amber transition-colors"
            >
              /search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
