// SEO Manager for optimizing content for "Muhamad Ali Ridho" keyword
// Handles meta tags, schema markup, and SEO optimization

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: string;
  };
  schema: SchemaMarkup;
}

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface PageData {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export class SEOManager {
  private readonly primaryKeyword = 'Muhamad Ali Ridho';
  private readonly siteUrl = 'https://muhamadaliridho.me';
  private readonly defaultImage = '/og-image.png';

  // Generate comprehensive meta tags
  generateMetaTags(page: PageData): string {
    const title = this.optimizeTitle(page.title);
    const description = this.optimizeDescription(page.description);
    const canonicalUrl = `${this.siteUrl}${page.url}`;
    const imageUrl = page.image ? `${this.siteUrl}${page.image}` : `${this.siteUrl}${this.defaultImage}`;

    return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${this.generateKeywords(page.tags).join(', ')}" />
    <meta name="author" content="${this.primaryKeyword}" />
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${page.type || 'website'}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:site_name" content="${this.primaryKeyword} - Tech Portfolio" />
    ${page.publishedTime ? `<meta property="article:published_time" content="${page.publishedTime}" />` : ''}
    ${page.modifiedTime ? `<meta property="article:modified_time" content="${page.modifiedTime}" />` : ''}
    ${page.author ? `<meta property="article:author" content="${page.author}" />` : ''}
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:creator" content="@muhamadaliridho" />
    
    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    `;
  }

  // Generate schema markup for different page types
  generateSchemaMarkup(type: 'person' | 'article' | 'website', data?: any): SchemaMarkup {
    const baseSchema = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'person':
        return {
          ...baseSchema,
          '@type': 'Person',
          name: this.primaryKeyword,
          url: this.siteUrl,
          image: `${this.siteUrl}/profile-photo.jpg`,
          jobTitle: 'Tech Enthusiast & Full Stack Developer',
          description: 'Tech Enthusiast exploring AI, IoT, Web Development, and more. Building the future one project at a time.',
          knowsAbout: [
            'Web Development',
            'Mobile Development',
            'Internet of Things (IoT)',
            'Artificial Intelligence',
            'Machine Learning',
            'JavaScript',
            'TypeScript',
            'React',
            'Node.js',
            'Python',
            'Arduino',
            'ESP32'
          ],
          sameAs: [
            'https://github.com/muhamadaliridho',
            'https://linkedin.com/in/muhamadaliridho',
            'https://twitter.com/muhamadaliridho'
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance Developer'
          },
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Tech University'
          }
        };

      case 'article':
        return {
          ...baseSchema,
          '@type': 'Article',
          headline: data?.title || '',
          description: data?.description || '',
          image: data?.image ? `${this.siteUrl}${data.image}` : `${this.siteUrl}${this.defaultImage}`,
          author: {
            '@type': 'Person',
            name: this.primaryKeyword,
            url: this.siteUrl
          },
          publisher: {
            '@type': 'Person',
            name: this.primaryKeyword,
            logo: {
              '@type': 'ImageObject',
              url: `${this.siteUrl}/logo.png`
            }
          },
          datePublished: data?.publishedTime || new Date().toISOString(),
          dateModified: data?.modifiedTime || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${this.siteUrl}${data?.url || ''}`
          },
          keywords: data?.tags?.join(', ') || ''
        };

      case 'website':
        return {
          ...baseSchema,
          '@type': 'WebSite',
          name: `${this.primaryKeyword} - Tech Portfolio`,
          description: 'Tech Enthusiast exploring AI, IoT, Web Development, and more. Building the future one project at a time.',
          url: this.siteUrl,
          author: {
            '@type': 'Person',
            name: this.primaryKeyword
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${this.siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        };

      default:
        return baseSchema;
    }
  }

  // Optimize title for SEO with primary keyword
  optimizeTitle(title: string | any): string {
    // Convert to string if not already
    const titleStr = typeof title === 'string' ? title : String(title || '');
    
    // If title already contains the primary keyword, return as is
    if (titleStr.toLowerCase().includes(this.primaryKeyword.toLowerCase())) {
      return titleStr;
    }

    // For homepage
    if (titleStr.toLowerCase().includes('home') || titleStr === 'Muhamad Ali Ridho') {
      return `${this.primaryKeyword} - Tech Enthusiast | AI, IoT & Web Development Portfolio`;
    }

    // For blog posts and other pages
    return `${titleStr} | ${this.primaryKeyword} - Tech Blog`;
  }

  // Optimize description for SEO
  optimizeDescription(description: string | any): string {
    // Convert to string if not already
    const desc = typeof description === 'string' ? description : String(description || '');
    
    // Ensure description contains primary keyword
    if (!desc.toLowerCase().includes(this.primaryKeyword.toLowerCase())) {
      return `${desc} Learn more from ${this.primaryKeyword}, a tech enthusiast exploring AI, IoT, and web development.`;
    }

    return desc;
  }

  // Generate SEO-optimized keywords
  private generateKeywords(tags?: string[]): string[] {
    const baseKeywords = [
      this.primaryKeyword,
      'Tech Enthusiast',
      'Full Stack Developer',
      'Web Development',
      'AI Development',
      'IoT Projects',
      'JavaScript Developer',
      'React Developer',
      'Node.js Developer',
      'Tech Blog',
      'Programming Portfolio'
    ];

    if (tags && tags.length > 0) {
      return [...baseKeywords, ...tags];
    }

    return baseKeywords;
  }

  // Generate structured data for breadcrumbs
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${this.siteUrl}${crumb.url}`
      }))
    };
  }

  // Generate FAQ schema for blog posts
  generateFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaMarkup {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  // Generate sitemap XML
  generateSitemap(pages: Array<{ url: string; lastmod?: string; priority?: number }>): string {
    const urls = pages.map(page => `
    <url>
      <loc>${this.siteUrl}${page.url}</loc>
      <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
      <priority>${page.priority || 0.8}</priority>
      <changefreq>weekly</changefreq>
    </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${this.siteUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>${urls}
</urlset>`;
  }

  // Generate robots.txt
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin-aldho/

# Allow all other content
Allow: /blog/
Allow: /projects/
Allow: /about/
Allow: /contact/

# Crawl delay
Crawl-delay: 1`;
  }

  // Optimize content for keyword density
  optimizeContentForKeyword(content: string, targetKeyword: string = this.primaryKeyword): string {
    const words = content.split(' ');
    const keywordCount = content.toLowerCase().split(targetKeyword.toLowerCase()).length - 1;
    const keywordDensity = (keywordCount / words.length) * 100;

    // Optimal keyword density is 1-2%
    if (keywordDensity < 1) {
      // Add keyword naturally if density is too low
      const sentences = content.split('. ');
      if (sentences.length > 2) {
        sentences[1] += ` This article by ${targetKeyword} explores`;
        return sentences.join('. ');
      }
    }

    return content;
  }

  // Validate SEO requirements
  validateSEO(page: PageData): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Title validation
    if (!page.title) {
      issues.push('Title is missing');
    } else if (page.title.length > 60) {
      issues.push('Title is too long (should be under 60 characters)');
    } else if (!page.title.toLowerCase().includes(this.primaryKeyword.toLowerCase())) {
      issues.push(`Title should include "${this.primaryKeyword}"`);
    }

    // Description validation
    if (!page.description) {
      issues.push('Description is missing');
    } else if (page.description.length > 160) {
      issues.push('Description is too long (should be under 160 characters)');
    } else if (page.description.length < 120) {
      issues.push('Description is too short (should be at least 120 characters)');
    }

    // URL validation
    if (!page.url) {
      issues.push('URL is missing');
    } else if (page.url.length > 100) {
      issues.push('URL is too long');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }
}

// Export singleton instance
export const seoManager = new SEOManager();