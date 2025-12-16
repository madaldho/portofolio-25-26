import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    thumbnail: z.string().min(1),
    category: z.enum(['web', 'mobile', 'iot', 'ai-ml', 'other']),
    technologies: z.array(z.string()).min(1),
    liveUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.date(),
    gallery: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};

// Export types for use in components
export type ProjectCategory = 'web' | 'mobile' | 'iot' | 'ai-ml' | 'other';

export interface ProjectFrontmatter {
  title: string;
  description: string;
  thumbnail: string;
  category: ProjectCategory;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  publishedAt: Date;
  gallery?: string[];
}
