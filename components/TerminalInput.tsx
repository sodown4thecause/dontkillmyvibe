'use client';

import { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  prompt?: string;
}

export default function TerminalInput({ 
  onSubmit, 
  placeholder = 'Enter command...',
  prompt = '~/$'
}: TerminalInputProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <div className="border border-terminal-green/30 bg-terminal-bg-secondary p-4 font-mono">
      <div className="flex items-center gap-3">
        <span className="text-terminal-green flex items-center gap-2">
          <Search className="w-4 h-4" />
          {prompt}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[#e0e0e0] outline-none placeholder:text-terminal-gray cursor"
          autoFocus
        />
      </div>
    </div>
  );
}
