# Technology Stack

## Core Framework

- **Astro 5.x**: Static site generator with component islands architecture
- **TypeScript**: Strict type checking enabled
- **Node.js**: ES modules (`"type": "module"`)

## Styling & UI

- **Tailwind CSS 4.x**: Utility-first CSS framework with Vite plugin
- **Custom CSS**: Global styles and animations in `src/styles/`
- **Responsive Design**: Mobile-first approach with breakpoints

## Content Management

- **Contentful**: Headless CMS for dynamic content
- **Astro Content Collections**: Type-safe content with Zod schemas
- **Rich Text**: Contentful rich text renderer for formatted content

## Development Tools

- **Vitest**: Unit testing framework
- **Zod**: Runtime type validation and schema definition
- **Fast-check**: Property-based testing library

## Common Commands

### Development

```bash
npm run dev          # Start development server (localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
```

### Setup & Maintenance

```bash
npm install          # Install dependencies
npm run setup:images # Download placeholder images from Unsplash
```

## Environment Configuration

- **Environment Variables**: Use `.env.local` for local development
- **Required Variables**: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_TOKEN`
- **Build Variables**: `SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`

## Performance Optimizations

- **Static Generation**: Astro's default output mode
- **Image Optimization**: Built-in Astro image service
- **CSS Minification**: Enabled in Vite config
- **Prefetching**: Viewport-based prefetching enabled
