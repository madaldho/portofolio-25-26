import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { journeyMilestones, type JourneyMilestone } from './journey';

/**
 * **Feature: portfolio-redesign, Property 4: Journey Timeline Chronological Order**
 * **Validates: Requirements 4.4**
 * 
 * For any journey milestones array, the milestones SHALL be sortable by year in chronological order,
 * and each milestone SHALL have year, title, and description fields.
 */
describe('Journey Timeline Chronological Order', () => {
  it('Property 4: Every milestone has required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...journeyMilestones),
        (milestone: JourneyMilestone) => {
          // Must have year (valid year string)
          expect(milestone.year).toBeDefined();
          expect(typeof milestone.year).toBe('string');
          expect(milestone.year.trim().length).toBeGreaterThan(0);
          expect(parseInt(milestone.year)).toBeGreaterThan(2000);
          expect(parseInt(milestone.year)).toBeLessThanOrEqual(2030);

          // Must have non-empty title
          expect(milestone.title).toBeDefined();
          expect(typeof milestone.title).toBe('string');
          expect(milestone.title.trim().length).toBeGreaterThan(0);

          // Must have non-empty description
          expect(milestone.description).toBeDefined();
          expect(typeof milestone.description).toBe('string');
          expect(milestone.description.trim().length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 4: Milestones are in chronological order', () => {
    for (let i = 1; i < journeyMilestones.length; i++) {
      const prevYear = parseInt(journeyMilestones[i - 1].year);
      const currYear = parseInt(journeyMilestones[i].year);
      expect(currYear).toBeGreaterThanOrEqual(prevYear);
    }
  });

  it('Property 4: Milestones can be sorted chronologically', () => {
    const sorted = [...journeyMilestones].sort(
      (a, b) => parseInt(a.year) - parseInt(b.year)
    );
    
    // Verify sorting produces valid chronological order
    for (let i = 1; i < sorted.length; i++) {
      expect(parseInt(sorted[i].year)).toBeGreaterThanOrEqual(parseInt(sorted[i - 1].year));
    }
  });

  it('Property 4: Optional fields are valid when present', () => {
    journeyMilestones.forEach(milestone => {
      if (milestone.icon !== undefined) {
        expect(typeof milestone.icon).toBe('string');
        expect(milestone.icon.trim().length).toBeGreaterThan(0);
      }
      if (milestone.highlight !== undefined) {
        expect(typeof milestone.highlight).toBe('boolean');
      }
    });
  });
});
