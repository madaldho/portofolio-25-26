# Muhamad Ali Ridho - Portfolio Website

A modern, performance-focused portfolio website built with Astro 5.x, showcasing projects, skills, and professional experience with premium UI/UX design and comprehensive SEO optimization.

## 🚀 Features

- **Modern Tech Stack**: Built with Astro 5.x, TypeScript, and Tailwind CSS 4.x
- **Content Management**: Integrated with Contentful CMS for dynamic content
- **Performance Optimized**: Static site generation with optimal loading speeds
- **SEO Friendly**: Comprehensive SEO optimization targeting "Muhamad Ali Ridho" and "madaldho"
- **Responsive Design**: Mobile-first approach with smooth animations
- **Dark/Light Mode**: System preference detection with manual toggle
- **Interactive Elements**: Custom cursor effects and micro-interactions
- **Accessibility**: WCAG 2.1 AA compliant with proper keyboard navigation
- **Auto-Deployment**: Contentful webhook integration for automatic rebuilds

## 🛠️ Tech Stack

### Core Framework

- **Astro 5.x** - Static site generator with component islands
- **TypeScript** - Type-safe development
- **Node.js** - ES modules support

### Styling & UI

- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Custom CSS** - Global styles and animations
- **Responsive Design** - Mobile-first breakpoints

### Content Management

- **Contentful** - Headless CMS for dynamic content
- **Astro Content Collections** - Type-safe content with Zod schemas
- **Rich Text Rendering** - Contentful rich text support

### Performance & SEO

- **Image Optimization** - Astro's built-in image service with WebP/AVIF support
- **Bundle Optimization** - Code splitting and minification
- **Core Web Vitals Monitoring** - Performance tracking and analytics
- **Schema.org Markup** - Rich snippets for search engines
- **Dynamic Sitemap** - Auto-generated XML sitemap
- **RSS Feed** - Blog content syndication

### Development Tools

- **Vitest** - Unit testing framework
- **Zod** - Runtime type validation
- **Fast-check** - Property-based testing
- **Lighthouse** - Performance auditing
- **JSDOM** - SEO validation testing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your Contentful credentials to `.env.local`:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_WEBHOOK_SECRET=your_webhook_secret
VERCEL_DEPLOY_HOOK=your_vercel_deploy_hook_url
SITE_URL=http://localhost:4321
```

5. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

## 📝 Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Optimized production build with validation
- `npm run build:basic` - Basic Astro build without optimizations
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests

### Performance & SEO

- `npm run seo:validate` - Validate SEO elements and structure
- `npm run lighthouse` - Run Lighthouse performance audit
- `npm run perf:audit` - Complete performance audit pipeline
- `npm run optimize:build` - Run optimized build with analysis

### Setup & Maintenance

- `npm run setup:images` - Download placeholder images from Unsplash
- `npm run deploy:vercel` - Build and deploy to Vercel

## 🏗️ Project Structure

```
portfolio/
├── .astro/           # Astro generated files
├── .kiro/            # Kiro AI assistant configuration
├── dist/             # Production build output
├── public/           # Static assets
├── scripts/          # Build and optimization scripts
└── src/              # Source code
    ├── components/   # Astro components
    │   ├── SEO.astro           # Comprehensive SEO component
    │   ├── OptimizedImage.astro # Performance-optimized images
    │   └── ...
    ├── content/      # Content collections
    ├── data/         # Static data files
    ├── layouts/      # Page layouts
    ├── pages/        # Route pages
    │   ├── api/      # API endpoints
    │   │   ├── webhook/        # Contentful webhooks
    │   │   └── analytics/      # Performance analytics
    │   ├── sitemap.xml.ts      # Dynamic sitemap
    │   ├── robots.txt.ts       # SEO robots file
    │   └── rss.xml.ts          # RSS feed
    ├── scripts/      # Client-side scripts
    ├── styles/       # Global styles
    └── utils/        # Utility functions
        ├── seoManager.ts       # SEO optimization utilities
        ├── performance.ts      # Performance monitoring
        └── imageOptimization.ts # Image optimization utilities
```

## 🎨 Content Types

### Projects

Technical projects with categories:

- Web Development
- Mobile Development
- IoT Projects
- AI/ML Projects
- Other

### Blog Posts

Dynamic blog content managed through Contentful with:

- Rich text content
- Featured images
- Tags and categories
- SEO optimization
- Auto-rebuild on publish

### Skills & Experience

- Technical expertise levels
- Professional journey timeline
- Technology interests
- Social media links

## 🚀 Deployment

This site is optimized for deployment on Vercel with automatic rebuilds:

### Vercel Setup

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure Contentful webhooks for auto-deployment
4. Deploy automatically on push to main branch

### Environment Variables for Production

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_WEBHOOK_SECRET=your_webhook_secret
VERCEL_DEPLOY_HOOK=your_vercel_deploy_hook_url
SITE_URL=https://muhamadaliridho.me
SITE_TITLE=Muhamad Ali Ridho - Tech Enthusiast
SITE_DESCRIPTION=Portfolio of Muhamad Ali Ridho, a Tech Enthusiast exploring AI, IoT, Web Development, and more.
```

### Contentful Webhook Configuration

Set up webhooks in Contentful to trigger rebuilds:

- **URL**: `https://your-domain.com/api/webhook/contentful`
- **Events**: Entry publish, unpublish, delete
- **Secret**: Use `CONTENTFUL_WEBHOOK_SECRET` for verification

## 🔧 Configuration

### Astro Configuration

The `astro.config.mjs` file includes optimizations for:

- Static site generation
- Image optimization with Sharp
- CSS minification and code splitting
- Prefetching strategies
- SVG optimization
- Vercel-specific optimizations

### Vercel Configuration

The `vercel.json` file includes:

- Security headers
- Cache optimization
- Redirects and rewrites
- Build configuration

## 🧪 Testing & Validation

### Run Tests

```bash
npm run test
```

### SEO Validation

```bash
npm run seo:validate
```

### Performance Audit

```bash
npm run perf:audit
```

Tests include:

- Component unit tests
- Data validation tests
- Property-based testing with fast-check
- SEO element validation
- Performance monitoring

## 📊 Performance Optimizations

This site is optimized for:

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Excellent ratings
- **SEO**: Targeting #1 ranking for "Muhamad Ali Ridho" and "madaldho"
- **Accessibility**: WCAG 2.1 AA compliance
- **Image Optimization**: WebP/AVIF with responsive sizing
- **Bundle Optimization**: Code splitting and tree shaking
- **Caching**: Optimal cache headers and CDN configuration

### SEO Features

- Comprehensive meta tags and Open Graph
- Schema.org structured data (Person, Website, Article)
- Dynamic sitemap generation
- RSS feed for blog content
- Breadcrumb navigation
- Internal linking optimization
- Local SEO for Jakarta, Indonesia

### Performance Monitoring

- Core Web Vitals tracking
- Resource loading monitoring
- User engagement analytics
- Performance budget enforcement

## 🔄 Auto-Deployment Workflow

1. Content editor publishes/updates content in Contentful
2. Contentful sends webhook to `/api/webhook/contentful`
3. Webhook validates signature and triggers Vercel deployment
4. Site rebuilds automatically with new content
5. Performance metrics are tracked and reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and validation: `npm run test && npm run seo:validate`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Muhamad Ali Ridho**

- Website: [muhamadaliridho.me](https://muhamadaliridho.me)
- GitHub: [@muhamadaliridho](https://github.com/muhamadaliridho)
- LinkedIn: [muhamadaliridho](https://linkedin.com/in/muhamadaliridho)
- Email: aldhoproject@gmail.com

---

Built with ❤️ using Astro, TypeScript, and modern web technologies. Optimized for performance, SEO, and user experience.
