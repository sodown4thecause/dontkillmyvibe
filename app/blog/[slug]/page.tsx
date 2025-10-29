import { client } from '@/lib/apollo-client';
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from '@/lib/queries';
import { Post } from '@/lib/types';
import TerminalPrompt from '@/components/TerminalPrompt';
import SocialShare from '@/components/SocialShare';
import { formatDate, calculateReadingTime, generateTableOfContents } from '@/lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import NewsletterForm from '@/components/NewsletterForm';

export const revalidate = 3600;

async function getPost(slug: string) {
  try {
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });
    return data.postBy as Post | null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
    });
    const posts = data.posts.nodes as Post[];
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | DontKillMyVibe.dev',
    };
  }

  return {
    title: `${post.title} | DontKillMyVibe.dev`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.node.name],
      images: post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto">
        <TerminalPrompt path="~/blog" command={`cat ${slug}.md`} />
        <div className="border border-terminal-red/30 bg-terminal-bg-secondary p-8 text-center">
          <p className="text-terminal-red font-mono text-xl mb-4">
            Error: Post not found
          </p>
          <Link 
            href="/blog"
            className="text-terminal-cyan hover:text-terminal-amber transition-colors font-mono"
          >
            cd ../blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = post.content ? calculateReadingTime(post.content) : '';
  const toc = post.content ? generateTableOfContents(post.content) : [];

  return (
    <div className="max-w-7xl mx-auto">
      <TerminalPrompt path="~/blog" command={`cat ${post.slug}.md`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <article className="lg:col-span-3">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-terminal-green mb-4 glow-text">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-terminal-gray mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author.node.name}
              </span>
              {readingTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readingTime}
                </span>
              )}
            </div>

            {post.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.nodes.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm border border-terminal-cyan/50 text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-bg transition-all"
                  >
                    <Tag className="w-3 h-3" />
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative h-96 mb-8 border border-terminal-green/30 overflow-hidden">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div 
            className="wp-content prose prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* Tags */}
          {post.tags && post.tags.nodes.length > 0 && (
            <div className="border-t border-terminal-green/30 pt-8 mb-8">
              <div className="flex flex-wrap gap-2">
                <span className="text-terminal-green font-mono text-sm">tags:</span>
                {post.tags.nodes.map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-2 py-1 text-xs border border-terminal-gray/50 text-terminal-gray font-mono"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Share */}
          <SocialShare url={`/blog/${post.slug}`} title={post.title} />
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {toc.length > 0 && <TableOfContents headings={toc} />}
          <NewsletterForm />
        </aside>
      </div>
    </div>
  );
}
