import TerminalPrompt from '@/components/TerminalPrompt';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | DontKillMyVibe.dev',
  description: 'Learn about DontKillMyVibe.dev - exploring AI development, vibe coding, and tech innovation.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <TerminalPrompt path="~" command="cat about.md" />
      
      <article className="border border-terminal-green/30 bg-terminal-bg-secondary p-8">
        <h1 className="text-4xl font-bold text-terminal-green mb-8 glow-text">
          About DontKillMyVibe.dev
        </h1>

        <div className="space-y-6 text-terminal-white leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-terminal-cyan mb-4 glow-text">
              <span className="text-terminal-amber">$</span> whoami
            </h2>
            <p className="mb-4">
              Welcome to DontKillMyVibe.dev, a terminal-inspired space where AI development meets 
              creative coding philosophy. This blog explores the intersection of cutting-edge technology 
              and the art of maintaining your coding flow.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-terminal-cyan mb-4 glow-text">
              <span className="text-terminal-amber">$</span> cat mission.txt
            </h2>
            <div className="border-l-4 border-terminal-green pl-6 space-y-4 text-terminal-white">
              <p>
                <span className="text-terminal-green font-bold">&gt;</span> Demystify AI development 
                for developers at all levels
              </p>
              <p>
                <span className="text-terminal-green font-bold">&gt;</span> Explore vibe coding - 
                the philosophy of maintaining flow and productivity
              </p>
              <p>
                <span className="text-terminal-green font-bold">&gt;</span> Share insights on vibe marketing 
                and authentic developer outreach
              </p>
              <p>
                <span className="text-terminal-green font-bold">&gt;</span> Keep you updated with the latest 
                AI news and trends
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-terminal-cyan mb-4 glow-text">
              <span className="text-terminal-amber">$</span> ls topics/
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-terminal-green/30 p-4 bg-terminal-bg-elevated">
                <h3 className="text-terminal-green font-bold mb-2">AI Development</h3>
                <p className="text-sm text-terminal-gray">
                  Tutorials, best practices, and deep-dives into AI/ML technologies, 
                  from foundational concepts to advanced implementations.
                </p>
              </div>
              <div className="border border-terminal-cyan/30 p-4 bg-terminal-bg-elevated">
                <h3 className="text-terminal-cyan font-bold mb-2">Vibe Coding</h3>
                <p className="text-sm text-terminal-gray">
                  Techniques and philosophies for maintaining coding flow, productivity, 
                  and creative momentum in your development work.
                </p>
              </div>
              <div className="border border-terminal-amber/30 p-4 bg-terminal-bg-elevated">
                <h3 className="text-terminal-amber font-bold mb-2">Vibe Marketing</h3>
                <p className="text-sm text-terminal-gray">
                  Authentic approaches to developer marketing, community building, 
                  and connecting with technical audiences.
                </p>
              </div>
              <div className="border border-terminal-green/30 p-4 bg-terminal-bg-elevated">
                <h3 className="text-terminal-green font-bold mb-2">AI News</h3>
                <p className="text-sm text-terminal-gray">
                  Latest updates, breakthroughs, and analysis from the rapidly 
                  evolving world of artificial intelligence.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-terminal-cyan mb-4 glow-text">
              <span className="text-terminal-amber">$</span> echo $PHILOSOPHY
            </h2>
            <div className="bg-terminal-bg-elevated p-6 border border-terminal-green/30 font-mono text-sm">
              <p className="text-terminal-green mb-2"># Don&apos;t Kill the Vibe</p>
              <p className="text-terminal-white">
                In development, as in life, maintaining the right energy is crucial. 
                This site is built on the principle that great code comes from a place 
                of flow, curiosity, and genuine passion. Whether you&apos;re building AI 
                models, crafting elegant code, or growing a developer community, 
                the vibe matters.
              </p>
            </div>
          </section>

          <section className="border-t border-terminal-green/30 pt-6 mt-8">
            <p className="text-terminal-cyan font-mono">
              <span className="text-terminal-green">$</span> Ready to dive in? 
              <a href="/blog" className="text-terminal-amber hover:text-terminal-white transition-colors ml-2">
                cd /blog
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
