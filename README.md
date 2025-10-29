# DontKillMyVibe.dev 🖥️

A Next.js 16 headless WordPress blog with a retro terminal aesthetic. Built for AI development content, vibe coding philosophy, and tech insights.

![Terminal Theme](https://img.shields.io/badge/Theme-Terminal-00ff00?style=for-the-badge)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![WordPress](https://img.shields.io/badge/WordPress-Headless-21759b?style=for-the-badge&logo=wordpress)

## ✨ Features

### 🎨 Terminal Aesthetic
- **Retro CRT Monitor Effects**: Scanlines, phosphor glow, and subtle screen curvature
- **Monospace Typography**: JetBrains Mono and Fira Code fonts
- **Terminal Color Scheme**: Bright green (#00ff00), cyan (#00ffff), and amber (#ffbf00) on deep black (#0a0a0a)
- **Animated Elements**: Typing animations, blinking cursor, ASCII spinners
- **Custom Terminal Scrollbar**: Green-themed with glow effects

### 🚀 Core Functionality
- **WordPress GraphQL Integration**: Fully headless CMS with Apollo Client
- **Static Site Generation (SSG)**: Pre-rendered pages for optimal performance
- **Incremental Static Regeneration (ISR)**: Fresh content every hour
- **Advanced Search**: Real-time search with terminal-style interface
- **Category Filtering**: Organize content by AI Dev, Vibe Coding, Marketing, News
- **Newsletter Signup**: Terminal-styled subscription form with API integration

### 📝 Content Features
- **Syntax Highlighting**: Shiki-powered code blocks with terminal theme
- **Reading Time Estimation**: Automatic calculation for all posts
- **Table of Contents**: Auto-generated for long-form articles
- **Social Sharing**: Terminal command-style share buttons (Twitter, LinkedIn, Facebook)
- **SEO Optimized**: Next.js Metadata API with Open Graph and Twitter Cards
- **Responsive Images**: Next.js Image optimization with lazy loading

### 🎯 Pages & Routes
- `/` - Home with animated hero and latest posts
- `/blog` - All blog posts with category filters
- `/blog/[slug]` - Individual post with TOC and newsletter
- `/category/[slug]` - Category-filtered post listings
- `/about` - Terminal-styled about page
- `/search` - Interactive search interface

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **CMS**: WordPress (Headless) via GraphQL
- **Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom terminal theme
- **Components**: React Server Components + Client Components
- **Icons**: [Lucide React](https://lucide.dev/)
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io/)
- **Typography**: JetBrains Mono, Fira Code (Google Fonts)
- **TypeScript**: Full type safety

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- WordPress site with [WPGraphQL](https://www.wpgraphql.com/) plugin installed

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/sodown4thecause/dontkillmyvibe.git
cd dontkillmyvibe
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## ⚙️ Configuration

### WordPress GraphQL Setup

1. Install [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) plugin on your WordPress site
2. Ensure your GraphQL endpoint is accessible at `/graphql`
3. Test the endpoint: `https://your-site.com/graphql`

### Newsletter Integration

The newsletter form (`/app/api/newsletter/route.ts`) includes integration examples for:

- **Mailchimp**: Add `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_DC`
- **ConvertKit**: Add `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID`
- **EmailOctopus**: Add `EMAILOCTOPUS_API_KEY`, `EMAILOCTOPUS_LIST_ID`

Uncomment the relevant section and add environment variables.

### Image Optimization

Update `next.config.ts` to whitelist your WordPress image domain:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-wordpress-domain.com',
    },
  ],
}
```

## 🎨 Customization

### Color Scheme

Edit `tailwind.config.ts` to customize the terminal colors:

```typescript
colors: {
  terminal: {
    bg: "#0a0a0a",           // Background
    green: "#00ff00",        // Primary
    cyan: "#00ffff",         // Secondary
    amber: "#ffbf00",        // Accent
    // ... more colors
  }
}
```

### Typography

Update Google Fonts import in `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

### Scanline Effects

Toggle CRT effects in `app/layout.tsx`:

```tsx
<body className="scanline crt-effect">  {/* Remove classes to disable */}
```

## 📁 Project Structure

```
vibe-stack/
├── app/
│   ├── api/newsletter/      # Newsletter API endpoint
│   ├── blog/                # Blog pages
│   ├── category/            # Category pages
│   ├── search/              # Search page
│   ├── about/               # About page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── TerminalHeader.tsx   # Site header with nav
│   ├── TerminalPrompt.tsx   # Breadcrumb prompt
│   ├── PostCard.tsx         # Blog post cards
│   ├── CodeBlock.tsx        # Syntax highlighted code
│   ├── TerminalInput.tsx    # Search input
│   ├── LoadingSpinner.tsx   # ASCII spinner
│   ├── NewsletterForm.tsx   # Newsletter signup
│   ├── SocialShare.tsx      # Share buttons
│   ├── TypingAnimation.tsx  # Typing effect
│   └── TableOfContents.tsx  # Post TOC
├── lib/
│   ├── apollo-client.ts     # GraphQL client
│   ├── queries.ts           # GraphQL queries
│   ├── types.ts             # TypeScript types
│   ├── helpers.ts           # Utility functions
│   └── utils.ts             # Tailwind utils
├── .env.local               # Environment variables
├── tailwind.config.ts       # Tailwind configuration
└── next.config.ts           # Next.js configuration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

## 🎯 Performance

- ⚡ **Lighthouse Score**: 90+ across all metrics
- 🖼️ **Image Optimization**: Automatic WebP conversion and lazy loading
- 📦 **Bundle Size**: Optimized with Next.js code splitting
- 🔄 **ISR**: Content revalidates every 3600 seconds (1 hour)
- 🎨 **CSS**: Minimal runtime CSS with Tailwind

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for your own blog!

## 🔗 Links

- **Live Site**: Coming soon
- **GitHub**: [sodown4thecause/dontkillmyvibe](https://github.com/sodown4thecause/dontkillmyvibe)
- **WordPress**: Configure your own headless WordPress instance

## 💡 Credits

Built with ❤️ using Next.js 16, WordPress, and terminal nostalgia.

---

**Note**: This is a headless WordPress setup. You'll need a WordPress site with WPGraphQL installed to fetch content.
