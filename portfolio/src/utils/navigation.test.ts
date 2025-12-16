import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getActiveSection, isWithinSection, getScrollTarget, type Section } from './navigation';

/**
 * **Feature: portfolio-redesign, Property 12: Navigation Active Section Detection**
 * **Validates: Requirements 2.2**
 * 
 * For any scroll position and array of section positions, the active section detection
 * function SHALL return the section whose top boundary is closest to but not below
 * the current scroll position.
 */
describe('Navigation Active Section Detection', () => {
  // Sample sections for testing
  const sampleSections: Section[] = [
    { id: 'home', top: 0, height: 800 },
    { id: 'about', top: 800, height: 600 },
    { id: 'interests', top: 1400, height: 500 },
    { id: 'projects', top: 1900, height: 700 },
    { id: 'contact', top: 2600, height: 400 },
  ];

  it('Property 12: Returns correct section for scroll positions', () => {
    // Test specific scroll positions
    const testCases = [
      { scroll: 0, expected: 'home' },
      { scroll: 100, expected: 'home' },
      { scroll: 700, expected: 'home' },
      { scroll: 800, expected: 'about' },
      { scroll: 1300, expected: 'about' },
      { scroll: 1400, expected: 'interests' },
      { scroll: 1900, expected: 'projects' },
      { scroll: 2600, expected: 'contact' },
    ];

    testCases.forEach(({ scroll, expected }) => {
      const result = getActiveSection(scroll, sampleSections, 0);
      expect(result).toBe(expected);
    });
  });

  it('Property 12: Active section is always one of the provided sections', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }),
        (scrollPosition) => {
          const result = getActiveSection(scrollPosition, sampleSections, 0);
          
          if (result !== null) {
            const sectionIds = sampleSections.map(s => s.id);
            expect(sectionIds).toContain(result);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 12: Returns first section when scrolled to top', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -100, max: 50 }),
        (scrollPosition) => {
          const result = getActiveSection(scrollPosition, sampleSections, 0);
          expect(result).toBe('home');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 12: Returns null for empty sections array', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }),
        (scrollPosition) => {
          const result = getActiveSection(scrollPosition, [], 0);
          expect(result).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 12: Offset affects section detection correctly', () => {
    // With offset of 100, section should change 100px earlier
    const result1 = getActiveSection(700, sampleSections, 100);
    expect(result1).toBe('about'); // 700 + 100 = 800, which is about section

    const result2 = getActiveSection(600, sampleSections, 100);
    expect(result2).toBe('home'); // 600 + 100 = 700, still in home
  });

  it('isWithinSection correctly identifies position within bounds', () => {
    const section: Section = { id: 'test', top: 100, height: 200 };
    
    expect(isWithinSection(100, section)).toBe(true);
    expect(isWithinSection(200, section)).toBe(true);
    expect(isWithinSection(299, section)).toBe(true);
    expect(isWithinSection(300, section)).toBe(false);
    expect(isWithinSection(99, section)).toBe(false);
  });

  it('getScrollTarget calculates correct offset', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5000 }),
        fc.integer({ min: 0, max: 200 }),
        (elementTop, headerOffset) => {
          const result = getScrollTarget(elementTop, headerOffset);
          expect(result).toBe(Math.max(0, elementTop - headerOffset));
          expect(result).toBeGreaterThanOrEqual(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});
