import { client } from '@/lib/apollo-client';
import { GET_ALL_POSTS, GET_ALL_CATEGORIES } from '@/lib/queries';
import { Post, Category } from '@/lib/types';
import PostCard from '@/components/PostCard';
import TerminalPrompt from '@/components/TerminalPrompt';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | DontKillMyVibe.dev',
  description: 'Browse all articles about AI development, vibe coding, and tech innovation.',
};

export const revalidate = 3600;

async function getPosts() {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
    });
    return data.posts.nodes as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const { data } = await client.query({
      query: GET_ALL_CATEGORIES,
    });
    return data.categories.nodes as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <div className="max-w-7xl mx-auto">
      <TerminalPrompt path="~/blog" command="ls -la" />
      
      <h1 className="text-4xl font-bold text-terminal-green mb-8 glow-text">
        All Articles
      </h1>

      {categories.length > 0 && (
        <div className="mb-8 border border-terminal-green/30 bg-terminal-bg-secondary p-4">
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono">
            <span className="text-terminal-green">filter --category=</span>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-terminal-cyan hover:text-terminal-amber transition-colors"
              >
                {category.name} ({category.count})
              </Link>
            ))}
          </div>
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="border border-terminal-amber/30 bg-terminal-bg-secondary p-8 text-center">
          <p className="text-terminal-amber font-mono">
            No posts found. Configure your WordPress GraphQL endpoint in .env.local
          </p>
        </div>
      )}
    </div>
  );
}
