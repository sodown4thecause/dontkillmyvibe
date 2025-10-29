import Link from 'next/link';
import Image from 'next/image';
import { formatDate, stripHtml } from '@/lib/helpers';
import { Post } from '@/lib/types';
import { Calendar, User, Tag } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const excerpt = stripHtml(post.excerpt);

  return (
    <article className="border border-terminal-green/30 bg-terminal-bg-secondary hover:border-terminal-green hover:shadow-glow-green transition-all group">
      <div className="p-4 border-b border-terminal-green/30 bg-terminal-bg-elevated">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
          <span className="text-terminal-green text-xs font-bold">ACTIVE</span>
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="block">
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative h-48 overflow-hidden border-b border-terminal-green/30">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold text-terminal-green mb-3 glow-text group-hover:text-terminal-cyan transition-colors">
            {post.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-terminal-gray mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author.node.name}
            </span>
          </div>

          {post.categories.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.nodes.map((category) => (
                <span
                  key={category.slug}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-terminal-cyan/50 text-terminal-cyan"
                >
                  <Tag className="w-3 h-3" />
                  {category.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-[#e0e0e0] leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          <div className="mt-4 text-terminal-amber hover:text-terminal-green transition-colors">
            <span className="font-mono">&gt; Read more_</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
