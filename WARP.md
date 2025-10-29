# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**DontKillMyVibe.dev** - A Next.js 16 headless WordPress blog with a retro terminal aesthetic. Built for AI development content, vibe coding philosophy, and tech insights.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production bundle (static export)
- `npm start` - Serve production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Cloudflare Pages (requires wrangler config)
- `npm run cf:build` - Build and deploy to Cloudflare Pages

### Environment Setup
Required environment variable in `.env.local`:
```
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

## Architecture

### Data Flow
This is a **statically generated site** (SSG) with Incremental Static Regeneration (ISR):
1. Build-time: All posts fetched via WordPress GraphQL and pre-rendered
2. Runtime: Pages revalidate every 3600 seconds (1 hour)
3. Apollo Client configured with `fetchPolicy: 'no-cache'` to prevent stale data

### WordPress Integration
- Headless CMS via WPGraphQL plugin
- Apollo Client (`lib/apollo-client.ts`) manages GraphQL connections
- All queries defined in `lib/queries.ts`
- Data shaped by TypeScript interfaces in `lib/types.ts`

### Rendering Strategy
- **App Router** (Next.js 16) with React Server Components as default
- Client Components used only for interactive features (search, newsletter, animations)
- Static export mode (`output: 'export'` in `next.config.ts`)
- Images unoptimized for static hosting compatibility

### Styling System
Terminal aesthetic powered by:
- Custom Tailwind theme with terminal color palette (`tailwind.config.ts`)
- Colors: `terminal-green` (#00ff00), `terminal-cyan` (#00ffff), `terminal-amber` (#ffbf00)
- Custom animations: `blink`, `typing`, `scanline`
- Global CRT effects via `scanline` and `crt-effect` classes in `app/layout.tsx`
- Monospace fonts: JetBrains Mono, Fira Code

### Component Architecture

#### Core Layout Components
- `TerminalHeader` - Site navigation with terminal styling
- `TerminalPrompt` - Breadcrumb-style path display (e.g., `user@dontKillMyVibe:~/blog/$`)
- Layout components wrap all pages in consistent terminal UI

#### Content Components
- `PostCard` - Blog post preview cards with terminal borders
- `CodeBlock` - Syntax highlighting via Shiki
- `TableOfContents` - Auto-generated from H2/H3 headings using regex parsing
- `SocialShare` - Terminal-styled share buttons

#### Interactive Components (Client)
- `TerminalInput` - Search input with terminal styling
- `NewsletterForm` - API route at `/app/api/newsletter/route.ts` (requires additional config)
- `TypingAnimation` - Character-by-character typing effect
- `LoadingSpinner` - ASCII-style loading animation

### Route Structure
- `/` - Home page with latest posts (queries 6 posts)
- `/blog` - All posts with category filters
- `/blog/[slug]` - Dynamic post pages with TOC and newsletter
- `/category/[slug]` - Category-filtered listings
- `/about` - Static about page
- `/search` - Client-side search interface

## Known Issues

### GraphQL Category Query Bug
**Issue**: The `GET_POSTS_BY_CATEGORY` query in `lib/queries.ts` passes a String to the `id` parameter, but WordPress GraphQL may expect an ID type depending on configuration.

**Location**: `lib/queries.ts` line 88-121

**Current implementation**:
```graphql
query GetPostsByCategory($slug: String!, $first: Int = 100) {
  category(id: $slug, idType: SLUG) {
    ...
  }
}
```

**Fix**: The query uses `idType: SLUG` which should work, but if errors persist, verify:
1. WPGraphQL plugin version supports `idType` parameter
2. WordPress permalink structure is configured
3. Category slugs are URL-safe

## Key Files for Common Tasks

### Adding/Modifying GraphQL Queries
- `lib/queries.ts` - All GraphQL query definitions
- `lib/types.ts` - TypeScript interfaces matching WPGraphQL schema
- `lib/apollo-client.ts` - Client configuration

### Styling Changes
- `tailwind.config.ts` - Terminal color palette and custom animations
- `app/globals.css` - Global styles, CRT effects, font imports
- `app/layout.tsx` - Scanline/CRT effect toggles

### Content Processing
- `lib/helpers.ts` - Utilities for reading time, date formatting, TOC generation, HTML stripping

### API Integration
- `app/api/newsletter/route.ts` - Newsletter API endpoint (supports Mailchimp, ConvertKit, EmailOctopus)

## WordPress Configuration

The WordPress site must have:
1. **WPGraphQL plugin** installed and activated
2. GraphQL endpoint accessible at `/graphql`
3. Posts published with categories/tags
4. Featured images uploaded (optional but recommended)

Image domains must be whitelisted in `next.config.ts` under `images.remotePatterns`.

## Path Aliases

TypeScript path alias `@/*` maps to root directory (configured in `tsconfig.json`).

Example: `import { client } from '@/lib/apollo-client'`
