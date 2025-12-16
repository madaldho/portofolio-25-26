import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  getNextIndex,
  getCurrentText,
  simulateFullCycle,
  cycleReturnsToStart,
} from './rotatingText';

/**
 * **Feature: portfolio-redesign, Property 13: Rotating Text Cycle Completeness**
 * **Validates: Requirements 1.6**
 * 
 * For any array of rotating texts and any number of cycles, the rotation SHALL cycle
 * through all texts in order and return to the first text after completing the array.
 */
describe('Rotating Text Cycle Completeness', () => {
  const sampleTexts = [
    "I explore AI & Machine Learning",
    "I build web applications",
    "I tinker with IoT devices",
    "I develop mobile apps",
    "I love cloud technologies",
  ];

  it('Property 13: getNextIndex cycles through all indices', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 1, max: 20 }),
        (currentIndex, totalTexts) => {
          const nextIndex = getNextIndex(currentIndex, totalTexts);
          
          // Next index should be within bounds
          expect(nextIndex).toBeGreaterThanOrEqual(0);
          expect(nextIndex).toBeLessThan(totalTexts);
          
          // Next index should be (current + 1) % total
          expect(nextIndex).toBe((currentIndex + 1) % totalTexts);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 13: Full cycle visits all texts exactly once', () => {
    const visited = simulateFullCycle(sampleTexts);
    
    // Should visit same number of texts
    expect(visited.length).toBe(sampleTexts.length);
    
    // Should visit each text exactly once
    const uniqueVisited = new Set(visited);
    expect(uniqueVisited.size).toBe(sampleTexts.length);
    
    // Should visit in order
    sampleTexts.forEach((text, index) => {
      expect(visited[index]).toBe(text);
    });
  });

  it('Property 13: Cycle returns to start after completing array', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (cycles) => {
          const result = cycleReturnsToStart(sampleTexts, cycles);
          expect(result).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 13: getCurrentText returns correct text for any index', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        (index) => {
          const text = getCurrentText(sampleTexts, index);
          const expectedIndex = index % sampleTexts.length;
          expect(text).toBe(sampleTexts[expectedIndex]);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 13: Empty array handling', () => {
    expect(getCurrentText([], 0)).toBe('');
    expect(simulateFullCycle([])).toEqual([]);
    expect(cycleReturnsToStart([], 5)).toBe(true);
  });

  it('Property 13: Single text array cycles correctly', () => {
    const singleText = ['Only one text'];
    
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        (startIndex) => {
          const nextIndex = getNextIndex(startIndex, 1);
          expect(nextIndex).toBe(0);
          expect(getCurrentText(singleText, startIndex)).toBe('Only one text');
        }
      ),
      { numRuns: 100 }
    );
  });
});
