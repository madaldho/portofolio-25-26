import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { techInterests, type TechInterest } from './interests';

/**
 * **Feature: portfolio-redesign, Property 5: Tech Interests Data Completeness**
 * **Validates: Requirements 4.6, 5.1, 5.2**
 * 
 * For any tech interest in the interests data, the interest SHALL contain id (unique string),
 * name (non-empty string), icon (valid identifier), description (non-empty string),
 * and color (valid hex color string).
 */
describe('Tech Interests Data Completeness', () => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  it('Property 5: Every tech interest has all required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...techInterests),
        (interest: TechInterest) => {
          // Must have unique id (non-empty string)
          expect(interest.id).toBeDefined();
          expect(typeof interest.id).toBe('string');
          expect(interest.id.trim().length).toBeGreaterThan(0);

          // Must have non-empty name
          expect(interest.name).toBeDefined();
          expect(typeof interest.name).toBe('string');
          expect(interest.name.trim().length).toBeGreaterThan(0);

          // Must have valid icon identifier
          expect(interest.icon).toBeDefined();
          expect(typeof interest.icon).toBe('string');
          expect(interest.icon.trim().length).toBeGreaterThan(0);

          // Must have non-empty description
          expect(interest.description).toBeDefined();
          expect(typeof interest.description).toBe('string');
          expect(interest.description.trim().length).toBeGreaterThan(0);

          // Must have valid hex color
          expect(interest.color).toBeDefined();
          expect(typeof interest.color).toBe('string');
          expect(hexColorRegex.test(interest.color)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 5: All interest IDs are unique', () => {
    const ids = techInterests.map(i => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('Property 5: currentlyLearning is valid array when present', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...techInterests),
        (interest: TechInterest) => {
          if (interest.currentlyLearning !== undefined) {
            expect(Array.isArray(interest.currentlyLearning)).toBe(true);
            interest.currentlyLearning.forEach(item => {
              expect(typeof item).toBe('string');
              expect(item.trim().length).toBeGreaterThan(0);
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
