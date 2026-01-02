// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://muhamadaliridho.me',
  output: 'server', // Full SSR mode for dynamic content
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    isr: {
      // On-demand ISR with bypass token for Contentful webhooks
      bypassToken: process.env.ISR_BYPASS_TOKEN || 'muhamad-ali-ridho-isr-token-2024',
      // Cache pages for 1 hour by default for better performance
      expiration: 60 * 60, // 1 hour
      // Exclude API routes and admin pages from caching
      exclude: [
        /^\/api\/.+/,
        /^\/admin-aldho\/.+/,
        /^\/id\/admin-aldho\/.+/
      ],
    },
  }),
  
  // Internationalization configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  
  // Build optimizations for Vercel
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  
  // Vite configuration for performance
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: ['contentful'],
            utils: ['zod', 'marked'],
          },
        },
      },
    },
    plugins: [tailwindcss()],
    define: {
      // Make environment variables available to the client
      'import.meta.env.SITE_URL': JSON.stringify(process.env.SITE_URL || 'https://muhamadaliridho.me'),
      'import.meta.env.SITE_TITLE': JSON.stringify(process.env.SITE_TITLE || 'Muhamad Ali Ridho - Tech Enthusiast'),
      'import.meta.env.SITE_DESCRIPTION': JSON.stringify(process.env.SITE_DESCRIPTION || 'Portfolio of Muhamad Ali Ridho, a Tech Enthusiast exploring AI, IoT, Web Development, and more.'),
    },
  },
  
  // Enhanced image optimization
  image: {
    domains: ['images.unsplash.com', 'images.ctfassets.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  
  // Prefetch configuration for better performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  
  // Experimental features for optimization (Astro 5.x)
  experimental: {
    svgo: {
      plugins: [
        'preset-default',
        {
          name: 'removeViewBox',
          active: false,
        },
      ],
    },
    clientPrerender: true,
  },
  
  // Security headers and redirects
  redirects: {
    '/home': '/',
    '/portfolio': '/',
  },
});