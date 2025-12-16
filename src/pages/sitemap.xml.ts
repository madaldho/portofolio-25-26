import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { contentfulClient } from '../utils/contentful';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://muhamadaliridho.me';
  
  try {
    // Static pages (English)
    const staticPages = [
      {
        url: '/',
        lastmod: new Date().toISOString().split('T')[0],
        priority: 1.0,
        changefreq: 'daily',
      },
      {
        url: '/blog',
        lastmod: new Date().toISOString().split('T')[0],
        priority: 0.9,
        changefreq: 'daily',
      },
      {
        url: '/certificates',
        lastmod: new Date().toISOString().split('T')[0],
        priority: 0.8,
        changefreq: 'weekly',
      },
    ];

    // Static pages (Indonesian)
    const staticPagesId = [
      {
        url: '/id',
        lastmod: new Date().toISOString().split('T')[0],
        priority: 1.0,
        changefreq: 'daily',
      },
      {
        url: '/id/blog',
        lastmod: new Date().toISOString().split('T')[0],
        priority: 0.9,
        changefreq: 'daily',
      },
    ];

    // Get blog posts from Contentful
    let blogPosts: any[] = [];
    try {
      if (contentfulClient) {
        const blogEntries = await contentfulClient.getEntries({
          content_type: 'blogPost',
          limit: 1000,
          order: ['-sys.updatedAt'],
        });
        
        blogPosts = blogEntries.items.map((post: any) => ({
          url: `/blog/${post.fields.slug}`,
          lastmod: post.sys.updatedAt.split('T')[0],
          priority: 0.8,
          changefreq: 'weekly',
        }));
      }
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error);
    }

    // Get projects from content collections
    let projects: any[] = [];
    try {
      const projectEntries = await getCollection('projects');
      projects = projectEntries.map((project) => ({
        url: `/projects/${project.slug}`,
        lastmod: project.data.publishedAt?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        priority: 0.7,
        changefreq: 'monthly',
      }));
    } catch (error) {
      console.error('Error fetching projects for sitemap:', error);
    }

    // Indonesian blog posts
    let blogPostsId: any[] = [];
    try {
      if (contentfulClient) {
        const blogEntriesId = await contentfulClient.getEntries({
          content_type: 'simpleBlog',
          limit: 1000,
          locale: 'id-ID',
          order: ['-sys.updatedAt'],
        });
        
        blogPostsId = blogEntriesId.items.map((post: any) => ({
          url: `/id/blog/${post.fields.slug}`,
          lastmod: post.sys.updatedAt.split('T')[0],
          priority: 0.8,
          changefreq: 'weekly',
        }));
      }
    } catch (error) {
      console.error('Error fetching Indonesian blog posts for sitemap:', error);
    }

    // Combine all pages
    const allPages = [...staticPages, ...staticPagesId, ...blogPosts, ...blogPostsId, ...projects];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return minimal sitemap on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
};