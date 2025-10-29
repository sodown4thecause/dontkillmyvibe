import Link from 'next/link';
import { client } from '@/lib/apollo-client';
import { GET_ALL_POSTS } from '@/lib/queries';
import { Post } from '@/lib/types';
import PostCard from '@/components/PostCard';
import TerminalPrompt from '@/components/TerminalPrompt';
import TypingAnimation from '@/components/TypingAnimation';
import NewsletterForm from '@/components/NewsletterForm';

export const revalidate = 3600; // Revalidate every hour

async function getPosts() {
  try {
    interface GetAllPostsData {
      posts: {
        nodes: Post[];
      };
    }
    const { data } = await client.query<GetAllPostsData>({
      query: GET_ALL_POSTS,
      variables: { first: 6 },
    });
    if (!data) {
      return [];
    }
    return data.posts.nodes as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto">
      <TerminalPrompt path="~" command="cat welcome.txt" />
      
      <section className="mb-16 border border-terminal-green/30 bg-terminal-bg-secondary p-8">
        <div className="text-terminal-green text-4xl md:text-6xl font-bold mb-6 glow-text">
          <TypingAnimation text="DontKillMyVibe.dev" speed={80} />
        </div>
        
        <div className="space-y-2 text-[#e0e0e0] font-mono">
          <p className="text-lg">
            <span className="text-terminal-cyan">&gt;</span> Exploring AI Development
          </p>
          <p className="text-lg">
            <span className="text-terminal-cyan">&gt;</span> Mastering Vibe Coding
          </p>
          <p className="text-lg">
            <span className="text-terminal-cyan">&gt;</span> Latest AI News & Insights
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link 
            href="/blog"
            className="border border-terminal-green bg-terminal-green/10 px-6 py-3 text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all font-mono hover:shadow-glow-green"
          >
            cd /blog
          </Link>
          <Link 
            href="/about"
            className="border border-terminal-cyan bg-terminal-cyan/10 px-6 py-3 text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-bg transition-all font-mono hover:shadow-glow-cyan"
          >
            cat about.md
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-terminal-green glow-text">
            <span className="text-terminal-amber">$</span> ls /blog/latest
          </h2>
          <Link 
            href="/blog"
            className="text-terminal-cyan hover:text-terminal-amber transition-colors font-mono text-sm"
          >
            view all →
          </Link>
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
              No posts found. Configure your WordPress GraphQL endpoint in .env.local
            </p>
          </div>
        )}
      </section>

      <section className="mt-16">
        <NewsletterForm />
      </section>
    </div>
  );
}
