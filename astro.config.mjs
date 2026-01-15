// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://muhamadaliridho.me',

  // Full SSR mode for dynamic content
  output: 'server',

  adapter: vercel(),

  // Single language - Indonesian only
  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
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

  integrations: [sitemap(), partytown()],
});