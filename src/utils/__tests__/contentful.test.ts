import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { validateContentfulEntry, getOptimizedImageUrl } from '../contentful';
import type { ContentfulAsset } from '../contentful';

describe('Contentful Utilities', () => {
  /**
   * **Feature: portfolio-redesign, Property 14: Contentful API Response Validation**
   * 
   * For any Contentful API response, the response SHALL contain valid entry structure 
   * with sys metadata (id, createdAt, updatedAt) and fields object, and all required 
   * fields SHALL be present according to the content type schema.
   * 
   * **Validates: Requirements 11.1, 11.4**
   */
  it('Property 14: validates Contentful entry structure', () => {
    fc.assert(fc.property(
      fc.record({
        sys: fc.record({
          id: fc.string({ minLength: 1 }),
          createdAt: fc.date().map(d => d.toISOString()),
          updatedAt: fc.date().map(d => d.toISOString()),
        }),
        fields: fc.dictionary(fc.string(), fc.anything()),
      }),
      (validEntry) => {
        expect(validateContentfulEntry(validEntry)).toBe(true);
      }
    ), { numRuns: 100 });
  });

  it('Property 14: rejects invalid Contentful entries', () => {
    fc.assert(fc.property(
      fc.oneof(
        fc.constant(null),
        fc.constant(undefined),
        fc.record({}), // Missing sys
        fc.record({ sys: fc.record({}) }), // Missing sys fields
        fc.record({ 
          sys: fc.record({
            id: fc.string({ minLength: 1 }),
            createdAt: fc.date().map(d => d.toISOString()),
            updatedAt: fc.date().map(d => d.toISOString()),
          })
          // Missing fields
        }),
      ),
      (invalidEntry) => {
        expect(validateContentfulEntry(invalidEntry)).toBe(false);
      }
    ), { numRuns: 100 });
  });

  /**
   * **Feature: portfolio-redesign, Property 20: Contentful Asset URL Validation**
   * 
   * For any Contentful asset, the asset URL SHALL be a valid HTTPS URL pointing to 
   * Contentful's CDN, and image assets SHALL support query parameters for resizing 
   * and format conversion.
   * 
   * **Validates: Requirements 12.3, 13.2**
   */
  it('Property 20: generates valid optimized image URLs', () => {
    fc.assert(fc.property(
      fc.record({
        fields: fc.record({
          file: fc.record({
            url: fc.oneof(
              fc.constant('//images.ctfassets.net/space/asset.jpg'),
              fc.constant('https://images.ctfassets.net/space/asset.png'),
            ),
          }),
        }),
      }),
      fc.record({
        width: fc.option(fc.integer({ min: 1, max: 2000 })),
        height: fc.option(fc.integer({ min: 1, max: 2000 })),
        format: fc.option(fc.constantFrom('webp', 'jpg', 'png')),
        quality: fc.option(fc.integer({ min: 1, max: 100 })),
        fit: fc.option(fc.constantFrom('pad', 'fill', 'scale', 'crop', 'thumb')),
      }),
      (asset, options) => {
        const optimizedUrl = getOptimizedImageUrl(asset as ContentfulAsset, options);
        
        // Should return a valid HTTPS URL
        expect(optimizedUrl).toMatch(/^https:\/\//);
        
        // Should contain Contentful CDN domain
        expect(optimizedUrl).toContain('ctfassets.net');
        
        // Should include query parameters if options provided
        if (options.width) {
          expect(optimizedUrl).toContain(`w=${options.width}`);
        }
        if (options.height) {
          expect(optimizedUrl).toContain(`h=${options.height}`);
        }
        if (options.format) {
          expect(optimizedUrl).toContain(`fm=${options.format}`);
        }
        if (options.quality) {
          expect(optimizedUrl).toContain(`q=${options.quality}`);
        }
        if (options.fit) {
          expect(optimizedUrl).toContain(`fit=${options.fit}`);
        }
      }
    ), { numRuns: 100 });
  });

  it('Property 20: handles missing asset gracefully', () => {
    fc.assert(fc.property(
      fc.oneof(
        fc.constant(null),
        fc.constant(undefined),
        fc.record({}),
        fc.record({ fields: fc.record({}) }),
      ),
      (invalidAsset) => {
        const result = getOptimizedImageUrl(invalidAsset as ContentfulAsset);
        expect(result).toBe('');
      }
    ), { numRuns: 100 });
  });

  it('validates complete Contentful project structure', () => {
    const validProject = {
      sys: {
        id: 'project-123',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
      fields: {
        title: 'Test Project',
        slug: 'test-project',
        description: { nodeType: 'document', content: [] },
        shortDescription: 'A test project',
        thumbnail: {
          fields: {
            file: {
              url: '//images.ctfassets.net/space/image.jpg',
            },
          },
        },
        category: 'web',
        technologies: [],
        featured: false,
        completedDate: '2024-01-01T00:00:00Z',
      },
    };

    expect(validateContentfulEntry(validProject)).toBe(true);
  });

  it('validates complete Contentful blog post structure', () => {
    const validBlogPost = {
      sys: {
        id: 'post-123',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
      fields: {
        title: 'Test Blog Post',
        slug: 'test-blog-post',
        excerpt: 'This is a test blog post excerpt',
        content: { nodeType: 'document', content: [] },
        featuredImage: {
          fields: {
            file: {
              url: '//images.ctfassets.net/space/featured.jpg',
            },
          },
        },
        tags: ['test', 'blog'],
        publishDate: '2024-01-01T00:00:00Z',
        readingTime: 5,
      },
    };

    expect(validateContentfulEntry(validBlogPost)).toBe(true);
  });
});