import type { APIRoute } from 'astro';
import { contentfulClient } from '../utils/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://muhamadaliridho.me';
  const siteTitle = 'Muhamad Ali Ridho - Tech Blog';
  const siteDescription = 'Latest tech insights, tutorials, and thoughts from Muhamad Ali Ridho, a tech enthusiast exploring AI, IoT, and web development.';
  
  try {
    // Fetch blog posts from Contentful
    const blogEntries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      limit: 20,
      order: '-sys.createdAt',
    });

    const items = blogEntries.items.map((post: any) => {
      const title = post.fields.title || 'Untitled Post';
      const slug = post.fields.slug || '';
      const description = post.fields.excerpt || post.fields.description || '';
      const content = post.fields.content 
        ? documentToHtmlString(post.fields.content)
        : description;
      const pubDate = new Date(post.sys.createdAt).toUTCString();
      const link = `${siteUrl}/blog/${slug}`;
      
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>hello@muhamadaliridho.me (Muhamad Ali Ridho)</author>
      <category>Technology</category>
    </item>`;
    }).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteTitle}]]></title>
    <description><![CDATA[${siteDescription}]]></description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <managingEditor>hello@muhamadaliridho.me (Muhamad Ali Ridho)</managingEditor>
    <webMaster>hello@muhamadaliridho.me (Muhamad Ali Ridho)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${siteUrl}/og-image.png</url>
      <title>${siteTitle}</title>
      <link>${siteUrl}</link>
      <width>1200</width>
      <height>630</height>
    </image>
    <category>Technology</category>
    <category>Web Development</category>
    <category>AI</category>
    <category>IoT</category>
    <category>Programming</category>
${items}
  </channel>
</rss>`;

    return new Response(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // Return minimal RSS feed on error
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${siteTitle}]]></title>
    <description><![CDATA[${siteDescription}]]></description>
    <link>${siteUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;

    return new Response(fallbackRss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
};