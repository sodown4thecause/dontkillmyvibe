'use client';

import { Share2 } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const shareData = {
    title,
    url: `https://dontkillmyvibe.dev${url}`,
  };

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedTitle = encodeURIComponent(shareData.title);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="border border-terminal-green/30 bg-terminal-bg-secondary p-4">
      <div className="flex items-center gap-3 text-sm font-mono">
        <Share2 className="w-4 h-4 text-terminal-green" />
        <span className="text-terminal-green">share --platform=</span>
        <button
          onClick={() => handleShare('twitter')}
          className="text-terminal-cyan hover:text-terminal-amber transition-colors"
        >
          twitter
        </button>
        <span className="text-terminal-gray">|</span>
        <button
          onClick={() => handleShare('linkedin')}
          className="text-terminal-cyan hover:text-terminal-amber transition-colors"
        >
          linkedin
        </button>
        <span className="text-terminal-gray">|</span>
        <button
          onClick={() => handleShare('facebook')}
          className="text-terminal-cyan hover:text-terminal-amber transition-colors"
        >
          facebook
        </button>
      </div>
    </div>
  );
}
