'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        });
        setHtml(highlighted);
      } catch (error) {
        setHtml(`<pre><code>${code}</code></pre>`);
      }
    };

    highlightCode();
  }, [code, language]);

  return (
    <div className="my-6 border border-terminal-green/30 bg-terminal-bg-secondary overflow-hidden">
      {filename && (
        <div className="px-4 py-2 bg-terminal-bg-elevated border-b border-terminal-green/30 flex items-center justify-between">
          <span className="text-terminal-cyan text-sm font-mono">{filename}</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-terminal-red" />
            <div className="w-2 h-2 rounded-full bg-terminal-amber" />
            <div className="w-2 h-2 rounded-full bg-terminal-green" />
          </div>
        </div>
      )}
      <div 
        className="p-4 overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
