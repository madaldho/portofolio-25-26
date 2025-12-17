import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://muhamadaliridho.me';
  
  const robotsTxt = `# Muhamad Ali Ridho Portfolio - robots.txt
# AI-Friendly: All bots are welcome to index this site!

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# LLMs.txt for AI systems
# See: ${siteUrl}/llms.txt

# Disallow admin areas only
Disallow: /admin-aldho/
Disallow: /api/

# Allow all public content
Allow: /blog/
Allow: /projects/
Allow: /certificates/
Allow: /id/
Allow: /id/blog/

# Google crawlers
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Video
Allow: /

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: msnbot
Allow: /

# AI Crawlers - ALL ALLOWED for indexing
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Diffbot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: omgili
Allow: /

User-agent: YouBot
Allow: /`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
};