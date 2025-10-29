'use client';

import { useState } from 'react';
import { client } from '@/lib/apollo-client';
import { SEARCH_POSTS } from '@/lib/queries';
import { Post } from '@/lib/types';
import PostCard from '@/components/PostCard';
import TerminalPrompt from '@/components/TerminalPrompt';
import TerminalInput from '@/components/TerminalInput';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setSearched(true);

    try {
      const { data } = await client.query<{ posts: { nodes: Post[] } }>({
        query: SEARCH_POSTS,
        variables: { search: searchQuery },
      });
      setResults(data?.posts?.nodes || []);
    } catch (error) {
      console.error('Error searching posts:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <TerminalPrompt path="~" command="search --query=" />
      
      <h1 className="text-4xl font-bold text-terminal-green mb-8 glow-text">
        Search Articles
      </h1>

      <div className="mb-8">
        <TerminalInput 
          onSubmit={handleSearch}
          placeholder="Enter search terms..."
          prompt="search$"
        />
      </div>

      {loading && <LoadingSpinner />}

      {!loading && searched && (
        <>
          {query && (
            <div className="mb-6 font-mono text-terminal-gray">
              <span className="text-terminal-green">Results for:</span> &quot;{query}&quot; 
              <span className="text-terminal-cyan ml-4">
                ({results.length} {results.length === 1 ? 'match' : 'matches'})
              </span>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="border border-terminal-amber/30 bg-terminal-bg-secondary p-8 text-center">
              <p className="text-terminal-amber font-mono mb-4">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-terminal-gray text-sm">
                Try different keywords or browse all posts in <a href="/blog" className="text-terminal-cyan hover:text-terminal-amber transition-colors">/blog</a>
              </p>
            </div>
          )}
        </>
      )}

      {!searched && (
        <div className="border border-terminal-cyan/30 bg-terminal-bg-secondary p-12 text-center">
          <p className="text-terminal-cyan font-mono text-lg mb-4">
            $ Type your search query and press Enter
          </p>
          <div className="text-terminal-gray text-sm space-y-2">
            <p>• Search by title, content, or tags</p>
            <p>• Use specific keywords for better results</p>
            <p>• Try searching for &quot;AI&quot;, &quot;vibe coding&quot;, or &quot;tutorial&quot;</p>
          </div>
        </div>
      )}
    </div>
  );
}
