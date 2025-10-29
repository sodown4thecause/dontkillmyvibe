import { client } from '@/lib/apollo-client';
import { GET_POSTS_BY_CATEGORY, GET_ALL_CATEGORIES } from '@/lib/queries';
import { Post } from '@/lib/types';
import PostCard from '@/components/PostCard';
import TerminalPrompt from '@/components/TerminalPrompt';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 3600;

async function getCategoryPosts(slug: string) {
  try {
    const { data }: { data: any } = await client.query({
      query: GET_POSTS_BY_CATEGORY,
      variables: { slug },
    });
    return {
      posts: (data.category?.posts?.nodes || []) as Post[],
      category: data.category,
    };
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return { posts: [], category: null };
  }
}

export async function generateStaticParams() {
  try {
    const { data }: { data: any } = await client.query({
      query: GET_ALL_CATEGORIES,
    });
    const categories = data.categories.nodes;
    
    return categories.map((category: { slug: string }) => ({
      slug: category.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await getCategoryPosts(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found | DontKillMyVibe.dev',
    };
  }

  return {
    title: `${category.name} | DontKillMyVibe.dev`,
    description: `Browse all articles in the ${category.name} category.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { posts, category } = await getCategoryPosts(slug);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto">
        <TerminalPrompt path="~/category" command={`ls ${slug}`} />
        <div className="border border-terminal-red/30 bg-terminal-bg-secondary p-8 text-center">
          <p className="text-terminal-red font-mono text-xl mb-4">
            Error: Category not found
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

  return (
    <div className="max-w-7xl mx-auto">
      <TerminalPrompt path="~/category" command={`ls ${category.slug}`} />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-terminal-green mb-2 glow-text">
          {category.name}
        </h1>
        <p className="text-terminal-gray font-mono">
          {category.count} {category.count === 1 ? 'post' : 'posts'} found
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="border border-terminal-amber/30 bg-terminal-bg-secondary p-8 text-center">
          <p className="text-terminal-amber font-mono">
            No posts found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
