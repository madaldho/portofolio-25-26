import { z } from 'zod';

// Project schema for validation
export const projectSchema = z.object({
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
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectCategory = 'web' | 'mobile' | 'iot' | 'ai-ml' | 'other';

// Validation function
export function validateProject(data: unknown): { success: boolean; error?: string } {
  const result = projectSchema.safeParse(data);
  if (result.success) {
    return { success: true };
  }
  return { success: false, error: result.error.message };
}

// Filter projects by category
export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory | 'all'
): Project[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter(p => p.category === category);
}

// Sort projects by date
export function sortProjectsByDate(projects: Project[], order: 'asc' | 'desc' = 'desc'): Project[] {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}
