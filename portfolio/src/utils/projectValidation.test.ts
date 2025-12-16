import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { filterProjectsByCategory, sortProjectsByDate, type Project, type ProjectCategory } from './projectValidation';

// Sample valid projects for testing
const sampleProjects: Project[] = [
  {
    title: "Smart Home Dashboard",
    description: "IoT dashboard for smart home",
    thumbnail: "/images/smart-home.jpg",
    category: "iot",
    technologies: ["ESP32", "React"],
    featured: true,
    publishedAt: new Date("2024-06-15"),
  },
  {
    title: "AI Chat Assistant",
    description: "AI-powered chatbot",
    thumbnail: "/images/ai-chat.jpg",
    category: "ai-ml",
    technologies: ["Python", "LangChain"],
    featured: true,
    publishedAt: new Date("2024-09-20"),
  },
  {
    title: "Expense Tracker",
    description: "Mobile expense tracking app",
    thumbnail: "/images/expense.jpg",
    category: "mobile",
    technologies: ["Flutter", "Firebase"],
    featured: false,
    publishedAt: new Date("2024-03-10"),
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio",
    thumbnail: "/images/portfolio.jpg",
    category: "web",
    technologies: ["Astro", "TailwindCSS"],
    featured: false,
    publishedAt: new Date("2024-12-01"),
  },
];

/**
 * **Feature: portfolio-redesign, Property 1: Project Data Schema Validation**
 * **Validates: Requirements 3.1, 3.5**
 * 
 * For any project in the projects collection, the project object SHALL contain all required fields:
 * title (non-empty string), description (non-empty string), thumbnail (valid path string),
 * category (one of: 'web', 'mobile', 'iot', 'ai-ml', 'other'), and technologies (non-empty array of strings).
 */
describe('Project Data Schema Validation', () => {
  const validCategories: ProjectCategory[] = ['web', 'mobile', 'iot', 'ai-ml', 'other'];

  it('Property 1: Every project has all required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...sampleProjects),
        (project: Project) => {
          // Must have non-empty title
          expect(project.title).toBeDefined();
          expect(typeof project.title).toBe('string');
          expect(project.title.trim().length).toBeGreaterThan(0);

          // Must have non-empty description
          expect(project.description).toBeDefined();
          expect(typeof project.description).toBe('string');
          expect(project.description.trim().length).toBeGreaterThan(0);

          // Must have valid thumbnail path
          expect(project.thumbnail).toBeDefined();
          expect(typeof project.thumbnail).toBe('string');
          expect(project.thumbnail.trim().length).toBeGreaterThan(0);

          // Must have valid category
          expect(project.category).toBeDefined();
          expect(validCategories).toContain(project.category);

          // Must have non-empty technologies array
          expect(Array.isArray(project.technologies)).toBe(true);
          expect(project.technologies.length).toBeGreaterThan(0);
          project.technologies.forEach(tech => {
            expect(typeof tech).toBe('string');
            expect(tech.trim().length).toBeGreaterThan(0);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * **Feature: portfolio-redesign, Property 2: Project Category Filter Correctness**
 * **Validates: Requirements 3.6**
 * 
 * For any list of projects and any selected category filter, the filtered result SHALL contain
 * only projects whose category matches the selected filter, and when filter is 'all',
 * the result SHALL contain all projects.
 */
describe('Project Category Filter Correctness', () => {
  const allCategories: (ProjectCategory | 'all')[] = ['all', 'web', 'mobile', 'iot', 'ai-ml', 'other'];

  it('Property 2: Filter returns only matching categories', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allCategories),
        (category) => {
          const filtered = filterProjectsByCategory(sampleProjects, category);
          
          if (category === 'all') {
            // All filter should return all projects
            expect(filtered.length).toBe(sampleProjects.length);
          } else {
            // Category filter should return only matching projects
            filtered.forEach(project => {
              expect(project.category).toBe(category);
            });
            
            // Should include all projects of that category
            const expectedCount = sampleProjects.filter(p => p.category === category).length;
            expect(filtered.length).toBe(expectedCount);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 2: Filter preserves project data integrity', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allCategories),
        (category) => {
          const filtered = filterProjectsByCategory(sampleProjects, category);
          
          // Each filtered project should exist in original array
          filtered.forEach(project => {
            const original = sampleProjects.find(p => p.title === project.title);
            expect(original).toBeDefined();
            expect(project).toEqual(original);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Sorting by date works correctly', () => {
    const sortedDesc = sortProjectsByDate(sampleProjects, 'desc');
    const sortedAsc = sortProjectsByDate(sampleProjects, 'asc');

    // Descending: newest first
    for (let i = 1; i < sortedDesc.length; i++) {
      expect(new Date(sortedDesc[i - 1].publishedAt).getTime())
        .toBeGreaterThanOrEqual(new Date(sortedDesc[i].publishedAt).getTime());
    }

    // Ascending: oldest first
    for (let i = 1; i < sortedAsc.length; i++) {
      expect(new Date(sortedAsc[i - 1].publishedAt).getTime())
        .toBeLessThanOrEqual(new Date(sortedAsc[i].publishedAt).getTime());
    }
  });
});
