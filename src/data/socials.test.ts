import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { socialLinks, type SocialLink } from './socials';

/**
 * **Feature: portfolio-redesign, Property 11: Social Links Data Validation**
 * **Validates: Requirements 6.4**
 * 
 * For any social link in the socials data, the link SHALL contain platform name (non-empty string),
 * url (valid URL format), and icon (valid identifier).
 */
describe('Social Links Data Validation', () => {
  const urlRegex = /^(https?:\/\/|mailto:).+/;

  it('Property 11: Every social link has required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...socialLinks),
        (link: SocialLink) => {
          // Must have non-empty platform name
          expect(link.platform).toBeDefined();
          expect(typeof link.platform).toBe('string');
          expect(link.platform.trim().length).toBeGreaterThan(0);

          // Must have valid URL format
          expect(link.url).toBeDefined();
          expect(typeof link.url).toBe('string');
          expect(urlRegex.test(link.url)).toBe(true);

          // Must have valid icon identifier
          expect(link.icon).toBeDefined();
          expect(typeof link.icon).toBe('string');
          expect(link.icon.trim().length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 11: All platform names are unique', () => {
    const platforms = socialLinks.map(l => l.platform);
    const uniquePlatforms = new Set(platforms);
    expect(uniquePlatforms.size).toBe(platforms.length);
  });

  it('Property 11: URLs are properly formatted', () => {
    socialLinks.forEach(link => {
      // Should start with http://, https://, or mailto:
      expect(link.url).toMatch(/^(https?:\/\/|mailto:)/);
    });
  });
});
