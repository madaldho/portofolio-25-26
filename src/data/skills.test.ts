import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { skillCategories, type SkillCategory, type Skill } from './skills';

/**
 * **Feature: portfolio-redesign, Property 3: Skills Data Organization**
 * **Validates: Requirements 4.3**
 * 
 * For any skill category in the skills data, the category SHALL have a non-empty name,
 * a valid icon identifier, and a non-empty array of skills where each skill has at least
 * a name property.
 */
describe('Skills Data Organization', () => {
  it('Property 3: Every skill category has required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...skillCategories),
        (category: SkillCategory) => {
          // Category must have non-empty name
          expect(category.name).toBeDefined();
          expect(typeof category.name).toBe('string');
          expect(category.name.trim().length).toBeGreaterThan(0);

          // Category must have valid icon identifier
          expect(category.icon).toBeDefined();
          expect(typeof category.icon).toBe('string');
          expect(category.icon.trim().length).toBeGreaterThan(0);

          // Category must have non-empty skills array
          expect(Array.isArray(category.skills)).toBe(true);
          expect(category.skills.length).toBeGreaterThan(0);

          // Each skill must have at least a name
          category.skills.forEach((skill: Skill) => {
            expect(skill.name).toBeDefined();
            expect(typeof skill.name).toBe('string');
            expect(skill.name.trim().length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 3: Skill levels are valid when present', () => {
    const validLevels = ['beginner', 'intermediate', 'advanced'];
    
    fc.assert(
      fc.property(
        fc.constantFrom(...skillCategories),
        (category: SkillCategory) => {
          category.skills.forEach((skill: Skill) => {
            if (skill.level !== undefined) {
              expect(validLevels).toContain(skill.level);
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('All skill categories are unique by name', () => {
    const names = skillCategories.map(c => c.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});
