import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { generateMetaTags, validateMetaTags, type MetaTagsConfig } from './metaTags';

/**
 * **Feature: portfolio-redesign, Property 10: Meta Tags Generation Completeness**
 * **Validates: Requirements 8.2, 8.4**
 * 
 * For any page in the portfolio, the generated meta tags SHALL include: title, description,
 * og:title, og:description, og:image, og:url, and twitter:card properties with non-empty values.
 */
describe('Meta Tags Generation Completeness', () => {
  // Generator for valid meta tag configs
  const metaConfigArb = fc.record({
    title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    description: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
    image: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
    url: fc.webUrl(),
  });

  it('Property 10: Generated meta tags contain all required fields', () => {
    fc.assert(
      fc.property(metaConfigArb, (config: MetaTagsConfig) => {
        const tags = generateMetaTags(config);
        const validation = validateMetaTags(tags);

        expect(validation.valid).toBe(true);
        expect(validation.missing).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 10: All required meta tag values are non-empty', () => {
    fc.assert(
      fc.property(metaConfigArb, (config: MetaTagsConfig) => {
        const tags = generateMetaTags(config);

        // Check all required fields have non-empty values
        expect(tags.title.trim().length).toBeGreaterThan(0);
        expect(tags.description.trim().length).toBeGreaterThan(0);
        expect(tags['og:title'].trim().length).toBeGreaterThan(0);
        expect(tags['og:description'].trim().length).toBeGreaterThan(0);
        expect(tags['og:image'].trim().length).toBeGreaterThan(0);
        expect(tags['og:url'].trim().length).toBeGreaterThan(0);
        expect(tags['twitter:card'].trim().length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 10: Meta tags preserve input values correctly', () => {
    fc.assert(
      fc.property(metaConfigArb, (config: MetaTagsConfig) => {
        const tags = generateMetaTags(config);

        // Title and description should match input
        expect(tags.title).toBe(config.title);
        expect(tags.description).toBe(config.description);
        expect(tags['og:title']).toBe(config.title);
        expect(tags['og:description']).toBe(config.description);
        expect(tags['og:image']).toBe(config.image);
        expect(tags['og:url']).toBe(config.url);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 10: Twitter card has valid value', () => {
    fc.assert(
      fc.property(metaConfigArb, (config: MetaTagsConfig) => {
        const tags = generateMetaTags(config);
        expect(['summary', 'summary_large_image']).toContain(tags['twitter:card']);
      }),
      { numRuns: 100 }
    );
  });
});
