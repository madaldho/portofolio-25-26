import { createClient } from 'contentful';
import type { ContentfulClientApi, Entry, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Contentful Configuration
interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
  previewAccessToken: string;
  environment: string;
  host?: string;
}

// Contentful Asset Type
export interface ContentfulAsset {
  sys: { id: string };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

// Project from Contentful (using the 'project' content type)
export interface ContentfulProject {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    description: Document; // Contentful Rich Text
    shortDescription: string;
    thumbnail: ContentfulAsset;
    gallery?: ContentfulAsset[];
    category: 'web' | 'mobile' | 'iot' | 'ai-ml' | 'other';
    technologies: string[]; // Array of strings based on actual content type
    liveUrl?: string;
    sourceUrl?: string;
    featured: boolean;
    completedDate: string;
  };
}

// Simple Project from Contentful (using the 'simpleProject' content type)
export interface ContentfulSimpleProject {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    description: string; // Short description
    content?: string; // Full content (Markdown)
    thumbnail?: ContentfulAsset; // Optional uploaded image
    imageUrl?: string; // Optional fallback URL
    gallery?: ContentfulAsset[]; // Gallery images
    category: string;
    technologies?: string[]; // Optional tech stack
    liveUrl?: string;
    sourceUrl?: string;
    featured: boolean;
    completedDate?: string;
  };
}

// Blog Post from Contentful (using the 'blogPost' content type)
export interface ContentfulBlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: Document; // Contentful Rich Text
    featuredImage: ContentfulAsset;
    tags: string[];
    publishDate: string;
    readingTime?: number;
  };
}



// Certificate from Contentful
export interface ContentfulCertificate {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    issuer: string;
    issueDate: string;
    description?: string;
    certificateImage?: ContentfulAsset;
    imageUrl?: string;
    credentialUrl?: string;
    category?: 'programming' | 'cloud' | 'design' | 'marketing' | 'other';
    featured: boolean;
  };
}

// Profile from Contentful
export interface ContentfulProfile {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    title: string;
    bio: string;
    avatar?: ContentfulAsset;
    location?: string;
    email?: string;
    socialLinks?: Record<string, any>;
    resume?: ContentfulAsset;
    skills?: string[];
  };
}

// Create Contentful clients
const createContentfulClient = (preview = false): ContentfulClientApi<undefined> => {
  const config: ContentfulConfig = {
    spaceId: import.meta.env.CONTENTFUL_SPACE_ID || 'hbrrn0bf99r5',
    accessToken: preview
      ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN || ''
      : import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
    previewAccessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN || '',
    environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  };

  if (!config.spaceId || !config.accessToken) {
    console.warn('Contentful configuration missing. Using fallback data.');
    throw new Error('Contentful configuration is incomplete');
  }

  return createClient({
    space: config.spaceId,
    accessToken: config.accessToken,
    host: config.host,
    environment: config.environment,
  });
};

// Main client for published content
export const contentfulClient = (() => {
  try {
    return createContentfulClient(false);
  } catch (error) {
    console.warn('Failed to create Contentful client:', error);
    return null;
  }
})();

// Preview client for draft content
export const previewClient = (() => {
  try {
    return createContentfulClient(true);
  } catch (error) {
    console.warn('Failed to create Contentful preview client:', error);
    return null;
  }
})();

// API Functions for Projects (full project content type)
export async function getProjects(preview = false, locale?: string): Promise<ContentfulProject[]> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error('Contentful client not available');
    }

    const query: any = {
      content_type: 'project',
      order: ['-fields.completedDate'],
      include: 2, // Include linked entries and assets
    };

    if (locale) {
      query.locale = locale;
    }

    const entries = await client.getEntries(query);

    return entries.items as unknown as ContentfulProject[];
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error);
    return [];
  }
}

export async function getProject(slug: string, preview = false, locale?: string): Promise<ContentfulProject | null> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error('Contentful client not available');
    }

    const query: any = {
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    };

    if (locale) {
      query.locale = locale;
    }

    const entries = await client.getEntries(query);

    return (entries.items[0] as unknown as ContentfulProject) || null;
  } catch (error) {
    console.error(`Error fetching project "${slug}" from Contentful:`, error);
    return null;
  }
}

// API Functions for Simple Projects
export async function getSimpleProjects(preview = false, locale?: string): Promise<ContentfulSimpleProject[]> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error('Contentful client not available');
    }

    const query: any = {
      content_type: 'simpleProject',
      order: ['-sys.createdAt'],
    };

    if (locale) {
      query.locale = locale;
    }

    const entries = await client.getEntries(query);

    return entries.items as unknown as ContentfulSimpleProject[];
  } catch (error) {
    console.error('Error fetching simple projects from Contentful:', error);
    return [];
  }
}

// API Functions for Blog Posts (full blog post content type)
export async function getBlogPosts(preview = false, locale?: string): Promise<ContentfulBlogPost[]> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      console.warn('Contentful client not available');
      return [];
    }

    const entries = locale
      ? await client.getEntries({
        content_type: 'blogPost',
        order: ['-fields.publishDate'],
        include: 2,
        locale: locale,
      })
      : await client.getEntries({
        content_type: 'blogPost',
        order: ['-fields.publishDate'],
        include: 2,
      });

    return entries.items as unknown as ContentfulBlogPost[];
  } catch (error) {
    console.warn('Error fetching blog posts from Contentful:', error);
    return [];
  }
}

export async function getBlogPost(slug: string, preview = false, locale?: string): Promise<ContentfulBlogPost | null> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error('Contentful client not available');
    }

    const entries = locale
      ? await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
        include: 2,
        locale: locale,
      })
      : await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      });

    return (entries.items[0] as unknown as ContentfulBlogPost) || null;
  } catch (error) {
    console.error(`Error fetching blog post "${slug}" from Contentful:`, error);
    return null;
  }
}



// API Functions for Certificates
export async function getCertificates(preview = false, locale?: string): Promise<ContentfulCertificate[]> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      console.warn('Contentful client not available');
      return [];
    }

    const query: any = {
      content_type: 'certificate',
      order: ['-fields.issueDate'],
    };

    if (locale) {
      query.locale = locale;
    }

    const entries = await client.getEntries(query);

    return entries.items as unknown as ContentfulCertificate[];
  } catch (error) {
    console.warn('Error fetching certificates from Contentful:', error);
    return [];
  }
}

// Get single project by slug
export async function getSimpleProject(slug: string, preview = false, locale?: string): Promise<ContentfulSimpleProject | null> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error('Contentful client not available');
    }

    const query: any = {
      content_type: 'simpleProject',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    };

    if (locale) {
      query.locale = locale;
    }

    const entries = await client.getEntries(query);

    return (entries.items[0] as unknown as ContentfulSimpleProject) || null;
  } catch (error) {
    console.error(`Error fetching project "${slug}" from Contentful:`, error);
    return null;
  }
}

// API Functions for Profile
export async function getProfile(preview = false, locale?: string): Promise<ContentfulProfile | null> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      throw new Error('Contentful client not available');
    }

    const entries = await client.getEntries({
      content_type: 'profile',
      limit: 1,
      include: 2,
      ...(locale && { locale }),
    });

    return (entries.items[0] as unknown as ContentfulProfile) || null;
  } catch (error) {
    console.error('Error fetching profile from Contentful:', error);
    return null;
  }
}

// Utility function to get optimized image URL from Contentful
export function getOptimizedImageUrl(
  asset: ContentfulAsset,
  options: {
    width?: number;
    height?: number;
    format?: 'webp' | 'jpg' | 'png';
    quality?: number;
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
  } = {}
): string {
  if (!asset?.fields?.file?.url) {
    return '';
  }

  const baseUrl = asset.fields.file.url.startsWith('//')
    ? `https:${asset.fields.file.url}`
    : asset.fields.file.url;

  const params = new URLSearchParams();

  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.format) params.set('fm', options.format);
  if (options.quality) params.set('q', options.quality.toString());
  if (options.fit) params.set('fit', options.fit);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// Utility function to validate Contentful response
export function validateContentfulEntry(entry: any): boolean {
  return (
    entry &&
    entry.sys &&
    entry.sys.id &&
    entry.sys.createdAt &&
    entry.sys.updatedAt &&
    entry.fields &&
    typeof entry.fields === 'object'
  );
}

// Error handling utility
export class ContentfulError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'ContentfulError';
  }
}

// Check if Contentful is configured
export function isContentfulConfigured(): boolean {
  return !!(
    import.meta.env.CONTENTFUL_SPACE_ID &&
    import.meta.env.CONTENTFUL_ACCESS_TOKEN
  );
}

// Fallback data for when Contentful is not available
export const fallbackProjects: ContentfulSimpleProject[] = [
  {
    sys: {
      id: 'fallback-1',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    fields: {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'Modern portfolio website built with Astro and Tailwind CSS',
      category: 'web',
      featured: true,
    },
  },
  {
    sys: {
      id: 'fallback-2',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
    fields: {
      title: 'IoT Weather Station',
      slug: 'iot-weather-station',
      description: 'ESP32-based weather monitoring system with web dashboard',
      category: 'iot',
      featured: false,
    },
  },
];



// Testimonial from Contentful
export interface ContentfulTestimonial {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar?: ContentfulAsset;
    featured: boolean;
  };
}

// Service from Contentful
export interface ContentfulService {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    description: string;
    icon: string; // Icon name string
    features?: string[];
    featured: boolean;
  };
}

// API Functions for Testimonials
export async function getTestimonials(preview = false, locale?: string): Promise<ContentfulTestimonial[]> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      console.warn('Contentful client not available');
      return [];
    }

    const query: any = {
      content_type: 'testimonial',
      order: ['-sys.createdAt'],
    };

    if (locale) {
      query.locale = locale;
    }

    const entries = await client.getEntries(query);
    return entries.items as unknown as ContentfulTestimonial[];
  } catch (error) {
    console.warn('Error fetching testimonials from Contentful:', error);
    return [];
  }
}

// API Functions for Services
export async function getServices(preview = false, locale?: string): Promise<ContentfulService[]> {
  try {
    const client = preview ? previewClient : contentfulClient;
    if (!client) {
      console.warn('Contentful client not available');
      return [];
    }

    const query: any = {
      content_type: 'service',
      order: ['sys.createdAt'],
    };

    if (locale) {
      query.locale = locale;
    }

    const entries = await client.getEntries(query);
    return entries.items as unknown as ContentfulService[];
  } catch (error) {
    console.warn('Error fetching services from Contentful:', error);
    return [];
  }
}

// Fallback Testimonials (English)
export const fallbackTestimonialsEn: ContentfulTestimonial[] = [
  {
    sys: { id: 't1', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    fields: {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechStart Inc',
      quote: 'Ali delivered an exceptional web application that scaled with our user growth. His attention to detail and performance optimization is outstanding.',
      featured: true,
    }
  },
  {
    sys: { id: 't2', createdAt: '2024-01-02', updatedAt: '2024-01-02' },
    fields: {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      quote: 'Working with Ali was seamless. He understood our requirements immediately and suggested improvements we hadn\'t thought of. Highly recommended for AI integrations.',
      featured: true,
    }
  },
  {
    sys: { id: 't3', createdAt: '2024-01-03', updatedAt: '2024-01-03' },
    fields: {
      name: 'David Smith',
      role: 'Founder',
      company: 'EcoSolutions',
      quote: 'The IoT dashboard Ali built for us is intuitive and robust. It completely transformed how we monitor our field sensors.',
      featured: true,
    }
  }
];

// Fallback Testimonials (Indonesian)
export const fallbackTestimonialsId: ContentfulTestimonial[] = [
  {
    sys: { id: 't1', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    fields: {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechStart Inc',
      quote: 'Ali mengirimkan aplikasi web luar biasa yang berskala seiring pertumbuhan pengguna kami. Perhatiannya terhadap detail dan optimasi kinerja sangat luar biasa.',
      featured: true,
    }
  },
  {
    sys: { id: 't2', createdAt: '2024-01-02', updatedAt: '2024-01-02' },
    fields: {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      quote: 'Bekerja dengan Ali sangat lancar. Dia memahami kebutuhan kami dengan segera dan menyarankan perbaikan yang tidak kami pikirkan. Sangat direkomendasikan untuk integrasi AI.',
      featured: true,
    }
  },
  {
    sys: { id: 't3', createdAt: '2024-01-03', updatedAt: '2024-01-03' },
    fields: {
      name: 'David Smith',
      role: 'Founder',
      company: 'EcoSolutions',
      quote: 'Dashboard IoT yang Ali bangun untuk kami intuitif dan kuat. Ini benar-benar mengubah cara kami memantau sensor lapangan kami.',
      featured: true,
    }
  }
];

export const fallbackTestimonials = fallbackTestimonialsEn;

// Fallback Services (English)
export const fallbackServicesEn: ContentfulService[] = [
  {
    sys: { id: 's1', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    fields: {
      title: 'Web App Development',
      description: 'High-performance, scalable web applications built with modern frameworks like Astro, React, and Next.js.',
      icon: 'code',
      features: ['Custom Architecture', 'Performance Optimization', 'SEO-ready'],
      featured: true,
    }
  },
  {
    sys: { id: 's2', createdAt: '2024-01-02', updatedAt: '2024-01-02' },
    fields: {
      title: 'AI Solutions',
      description: 'Integrating intelligent agents and machine learning models to automate workflows and enhance user experience.',
      icon: 'cpu',
      features: ['LLM Integration', 'Automation Scripts', 'Smart Analysis'],
      featured: true,
    }
  },
  {
    sys: { id: 's3', createdAt: '2024-01-03', updatedAt: '2024-01-03' },
    fields: {
      title: 'IoT Systems',
      description: 'End-to-end IoT solutions from firmware to cloud dashboards for real-time monitoring and control.',
      icon: 'wifi',
      features: ['Firmware Development', 'MQTT/WebSocket', 'Real-time Dashboards'],
      featured: true,
    }
  }
];

// Fallback Services (Indonesian)
export const fallbackServicesId: ContentfulService[] = [
  {
    sys: { id: 's1', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    fields: {
      title: 'Pengembangan Web App',
      description: 'Aplikasi web berkinerja tinggi dan skalabel yang dibangun dengan framework modern seperti Astro, React, dan Next.js.',
      icon: 'code',
      features: ['Arsitektur Kustom', 'Optimasi Performa', 'Siap SEO'],
      featured: true,
    }
  },
  {
    sys: { id: 's2', createdAt: '2024-01-02', updatedAt: '2024-01-02' },
    fields: {
      title: 'Solusi AI',
      description: 'Mengintegrasikan agen cerdas dan model machine learning untuk mengotomatisasi alur kerja dan meningkatkan pengalaman pengguna.',
      icon: 'cpu',
      features: ['Integrasi LLM', 'Skrip Otomasi', 'Analisis Cerdas'],
      featured: true,
    }
  },
  {
    sys: { id: 's3', createdAt: '2024-01-03', updatedAt: '2024-01-03' },
    fields: {
      title: 'Sistem IoT',
      description: 'Solusi IoT end-to-end dari firmware hingga dashboard cloud untuk pemantauan dan kontrol real-time.',
      icon: 'wifi',
      features: ['Pengembangan Firmware', 'MQTT/WebSocket', 'Dashboard Real-time'],
      featured: true,
    }
  }
];

// Maintain internal backward compatibility if needed, using EN as default
export const fallbackServices = fallbackServicesEn;