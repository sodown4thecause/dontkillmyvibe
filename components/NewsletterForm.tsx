'use client';

import { useState, FormEvent } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Replace with your actual newsletter API endpoint
      // Example: Mailchimp, ConvertKit, EmailOctopus, etc.
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully subscribed! Check your email.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="border border-terminal-green/30 bg-terminal-bg-secondary p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-terminal-green mb-2 glow-text flex items-center gap-2">
          <Mail className="w-5 h-5" />
          <span className="text-terminal-amber">$</span> subscribe --newsletter
        </h3>
        <p className="text-terminal-gray text-sm font-mono">
          Get AI dev updates, vibe coding tips, and the latest posts delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-terminal-bg border border-terminal-cyan/50 px-4 py-3 text-terminal-white placeholder:text-terminal-gray focus:outline-none focus:border-terminal-green focus:shadow-glow-green transition-all font-mono disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 bg-terminal-green/10 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all font-mono hover:shadow-glow-green disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>

        {message && (
          <div className={`flex items-center gap-2 text-sm font-mono p-3 border ${
            status === 'success' 
              ? 'bg-terminal-green/10 border-terminal-green/30 text-terminal-green' 
              : 'bg-terminal-red/10 border-terminal-red/30 text-terminal-red'
          }`}>
            {status === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{message}</span>
          </div>
        )}
      </form>

      <p className="text-terminal-gray text-xs mt-4 font-mono">
        <span className="text-terminal-cyan"># </span>
        No spam, unsubscribe anytime. Your email stays private.
      </p>
    </div>
  );
}
