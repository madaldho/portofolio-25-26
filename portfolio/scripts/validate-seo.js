#!/usr/bin/env node

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';

console.log('🔍 Starting SEO validation...\n');

// SEO validation rules
const seoRules = {
  title: {
    required: true,
    maxLength: 60,
    mustContain: ['Muhamad Ali Ridho'],
    description: 'Title tag optimization',
  },
  metaDescription: {
    required: true,
    minLength: 120,
    maxLength: 160,
    mustContain: ['Muhamad Ali Ridho'],
    description: 'Meta description optimization',
  },
  headings: {
    required: true,
    h1Count: 1,
    mustHaveH1: true,
    description: 'Heading structure validation',
  },
  images: {
    required: true,
    mustHaveAlt: true,
    description: 'Image accessibility validation',
  },
  links: {
    required: true,
    internalLinksCount: 5,
    description: 'Internal linking validation',
  },
  schema: {
    required: true,
    types: ['Person', 'WebSite'],
    description: 'Schema.org structured data validation',
  },
  openGraph: {
    required: true,
    properties: ['og:title', 'og:description', 'og:image', 'og:url'],
    description: 'Open Graph meta tags validation',
  },
  twitter: {
    required: true,
    properties: ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'],
    description: 'Twitter Card meta tags validation',
  },
};

// Validation results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: [],
};

function validatePage(filePath, pageName) {
  console.log(`📄 Validating ${pageName}...`);
  
  if (!existsSync(filePath)) {
    results.failed++;
    results.details.push({
      page: pageName,
      type: 'error',
      message: 'File does not exist',
    });
    return;
  }

  const html = readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Validate title
  const title = document.querySelector('title');
  if (title) {
    const titleText = title.textContent.trim();
    
    if (titleText.length > seoRules.title.maxLength) {
      results.warnings++;
      results.details.push({
        page: pageName,
        type: 'warning',
        rule: 'title',
        message: `Title too long: ${titleText.length} chars (max: ${seoRules.title.maxLength})`,
      });
    }
    
    const hasKeyword = seoRules.title.mustContain.some(keyword => 
      titleText.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      results.passed++;
      results.details.push({
        page: pageName,
        type: 'success',
        rule: 'title',
        message: `Title contains target keyword: "${titleText}"`,
      });
    } else {
      results.failed++;
      results.details.push({
        page: pageName,
        type: 'error',
        rule: 'title',
        message: `Title missing target keywords: ${seoRules.title.mustContain.join(', ')}`,
      });
    }
  } else {
    results.failed++;
    results.details.push({
      page: pageName,
      type: 'error',
      rule: 'title',
      message: 'Title tag missing',
    });
  }

  // Validate meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const content = metaDescription.getAttribute('content') || '';
    
    if (content.length < seoRules.metaDescription.minLength) {
      results.warnings++;
      results.details.push({
        page: pageName,
        type: 'warning',
        rule: 'metaDescription',
        message: `Meta description too short: ${content.length} chars (min: ${seoRules.metaDescription.minLength})`,
      });
    } else if (content.length > seoRules.metaDescription.maxLength) {
      results.warnings++;
      results.details.push({
        page: pageName,
        type: 'warning',
        rule: 'metaDescription',
        message: `Meta description too long: ${content.length} chars (max: ${seoRules.metaDescription.maxLength})`,
      });
    } else {
      results.passed++;
      results.details.push({
        page: pageName,
        type: 'success',
        rule: 'metaDescription',
        message: `Meta description length optimal: ${content.length} chars`,
      });
    }
    
    const hasKeyword = seoRules.metaDescription.mustContain.some(keyword => 
      content.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (!hasKeyword) {
      results.warnings++;
      results.details.push({
        page: pageName,
        type: 'warning',
        rule: 'metaDescription',
        message: `Meta description missing target keywords: ${seoRules.metaDescription.mustContain.join(', ')}`,
      });
    }
  } else {
    results.failed++;
    results.details.push({
      page: pageName,
      type: 'error',
      rule: 'metaDescription',
      message: 'Meta description missing',
    });
  }

  // Validate headings
  const h1Elements = document.querySelectorAll('h1');
  if (h1Elements.length === 1) {
    results.passed++;
    results.details.push({
      page: pageName,
      type: 'success',
      rule: 'headings',
      message: 'Single H1 tag found',
    });
  } else if (h1Elements.length === 0) {
    results.failed++;
    results.details.push({
      page: pageName,
      type: 'error',
      rule: 'headings',
      message: 'No H1 tag found',
    });
  } else {
    results.warnings++;
    results.details.push({
      page: pageName,
      type: 'warning',
      rule: 'headings',
      message: `Multiple H1 tags found: ${h1Elements.length}`,
    });
  }

  // Validate images
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });

  if (images.length > 0) {
    if (imagesWithoutAlt === 0) {
      results.passed++;
      results.details.push({
        page: pageName,
        type: 'success',
        rule: 'images',
        message: `All ${images.length} images have alt text`,
      });
    } else {
      results.failed++;
      results.details.push({
        page: pageName,
        type: 'error',
        rule: 'images',
        message: `${imagesWithoutAlt} out of ${images.length} images missing alt text`,
      });
    }
  }

  // Validate Open Graph
  seoRules.openGraph.properties.forEach(property => {
    const ogTag = document.querySelector(`meta[property="${property}"]`);
    if (ogTag && ogTag.getAttribute('content')) {
      results.passed++;
      results.details.push({
        page: pageName,
        type: 'success',
        rule: 'openGraph',
        message: `${property} found`,
      });
    } else {
      results.failed++;
      results.details.push({
        page: pageName,
        type: 'error',
        rule: 'openGraph',
        message: `${property} missing`,
      });
    }
  });

  // Validate Twitter Cards
  seoRules.twitter.properties.forEach(property => {
    const twitterTag = document.querySelector(`meta[name="${property}"]`);
    if (twitterTag && twitterTag.getAttribute('content')) {
      results.passed++;
      results.details.push({
        page: pageName,
        type: 'success',
        rule: 'twitter',
        message: `${property} found`,
      });
    } else {
      results.failed++;
      results.details.push({
        page: pageName,
        type: 'error',
        rule: 'twitter',
        message: `${property} missing`,
      });
    }
  });

  // Validate Schema.org
  const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
  if (schemaScripts.length > 0) {
    let validSchemas = 0;
    schemaScripts.forEach(script => {
      try {
        const schema = JSON.parse(script.textContent);
        if (schema['@type']) {
          validSchemas++;
          results.passed++;
          results.details.push({
            page: pageName,
            type: 'success',
            rule: 'schema',
            message: `Schema.org ${schema['@type']} found`,
          });
        }
      } catch (error) {
        results.failed++;
        results.details.push({
          page: pageName,
          type: 'error',
          rule: 'schema',
          message: 'Invalid JSON-LD schema',
        });
      }
    });
  } else {
    results.failed++;
    results.details.push({
      page: pageName,
      type: 'error',
      rule: 'schema',
      message: 'No Schema.org markup found',
    });
  }

  // Validate canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && canonical.getAttribute('href')) {
    results.passed++;
    results.details.push({
      page: pageName,
      type: 'success',
      rule: 'canonical',
      message: 'Canonical URL found',
    });
  } else {
    results.failed++;
    results.details.push({
      page: pageName,
      type: 'error',
      rule: 'canonical',
      message: 'Canonical URL missing',
    });
  }

  console.log(`✅ ${pageName} validation completed\n`);
}

// Validate critical pages
const distPath = './dist';
if (!existsSync(distPath)) {
  console.error('❌ Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Validate homepage
validatePage(join(distPath, 'index.html'), 'Homepage');

// Validate blog pages (if they exist)
const blogPath = join(distPath, 'blog');
if (existsSync(blogPath)) {
  validatePage(join(blogPath, 'index.html'), 'Blog Index');
  
  // Validate individual blog posts
  try {
    const blogFiles = readdirSync(blogPath).filter(file => 
      file.endsWith('.html') && file !== 'index.html'
    );
    
    blogFiles.slice(0, 3).forEach(file => { // Validate first 3 blog posts
      validatePage(join(blogPath, file), `Blog Post: ${file}`);
    });
  } catch (error) {
    console.log('⚠️  Could not read blog directory');
  }
}

// Validate 404 page
validatePage(join(distPath, '404.html'), '404 Page');

// Generate report
console.log('📊 SEO Validation Report');
console.log('========================');
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`⚠️  Warnings: ${results.warnings}`);
console.log(`📊 Total checks: ${results.passed + results.failed + results.warnings}\n`);

// Show details
console.log('📋 Detailed Results:');
console.log('====================');

const groupedResults = results.details.reduce((acc, detail) => {
  if (!acc[detail.page]) {
    acc[detail.page] = { success: [], error: [], warning: [] };
  }
  acc[detail.page][detail.type].push(detail);
  return acc;
}, {});

Object.entries(groupedResults).forEach(([page, details]) => {
  console.log(`\n📄 ${page}:`);
  
  details.success.forEach(detail => {
    console.log(`  ✅ ${detail.message}`);
  });
  
  details.warning.forEach(detail => {
    console.log(`  ⚠️  ${detail.message}`);
  });
  
  details.error.forEach(detail => {
    console.log(`  ❌ ${detail.message}`);
  });
});

// SEO recommendations
console.log('\n💡 SEO Recommendations:');
console.log('========================');
console.log('• Ensure all pages have unique, descriptive titles under 60 characters');
console.log('• Write compelling meta descriptions between 120-160 characters');
console.log('• Use only one H1 tag per page with target keywords');
console.log('• Add alt text to all images for accessibility and SEO');
console.log('• Include Schema.org markup for rich snippets');
console.log('• Set up Google Search Console and submit sitemap');
console.log('• Monitor Core Web Vitals and page speed');
console.log('• Build quality backlinks and internal linking structure');
console.log('• Regularly update content and maintain freshness');
console.log('• Optimize for local SEO with location-based keywords');

// Exit with appropriate code
const hasErrors = results.failed > 0;
if (hasErrors) {
  console.log('\n❌ SEO validation completed with errors. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('\n🎉 SEO validation completed successfully!');
  console.log('🚀 Your site is optimized for search engines!');
  process.exit(0);
}