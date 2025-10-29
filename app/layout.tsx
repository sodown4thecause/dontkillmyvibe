import type { Metadata } from "next";
import "./globals.css";
import TerminalHeader from "@/components/TerminalHeader";

export const metadata: Metadata = {
  title: "DontKillMyVibe.dev | AI Development & Vibe Coding",
  description: "Exploring AI development, vibe coding philosophy, and the latest in AI innovation. Terminal-themed tech blog for developers.",
  keywords: ["AI development", "vibe coding", "vibe marketing", "AI news", "software development", "tech blog"],
  authors: [{ name: "DontKillMyVibe.dev" }],
  openGraph: {
    title: "DontKillMyVibe.dev",
    description: "AI Development & Vibe Coding",
    type: "website",
    locale: "en_US",
    siteName: "DontKillMyVibe.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "DontKillMyVibe.dev",
    description: "AI Development & Vibe Coding",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scanline crt-effect">
        <TerminalHeader />
        <main className="pt-32 px-4 min-h-screen">
          {children}
        </main>
        <footer className="border-t border-terminal-green/30 bg-terminal-bg-secondary mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between text-sm">
              <p className="text-terminal-gray font-mono">
                <span className="text-terminal-green">user@dontKillMyVibe:~/$</span> echo &quot;© 2025 DontKillMyVibe.dev&quot;
              </p>
              <p className="text-terminal-cyan">
                Built with Next.js & WordPress
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
