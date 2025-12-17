// CMS Manager for Admin Dashboard
// Handles content creation, editing, and management through Contentful MCP

export interface BlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishDate: string;
  status: 'draft' | 'published';
}

export interface ProjectData {
  title: string;
  slug: string;
  description: string;
  category: 'web' | 'mobile' | 'iot' | 'ai-ml' | 'other';
  featured: boolean;
  technologies?: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export interface ContentEntry {
  id: string;
  contentType: 'blogPost' | 'simpleProject';
  fields: Record<string, any>;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export class CMSManager {
  private spaceId: string;
  private environmentId: string;
  private useLocalStorage: boolean;

  constructor() {
    this.spaceId = import.meta.env.CONTENTFUL_SPACE_ID || 'hbrrn0bf99r5';
    this.environmentId = import.meta.env.CONTENTFUL_ENVIRONMENT || 'master';
    // Use localStorage as fallback when MCP is not available on client-side
    this.useLocalStorage = typeof window !== 'undefined';
  }

  // Blog Post Management
  async createBlogPost(data: BlogPostData): Promise<ContentEntry | null> {
    try {
      // Try to use server-side API endpoint with Contentful MCP
      if (!this.useLocalStorage) {
        const response = await fetch('/api/cms/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          return await response.json();
        }
      }

      // Fallback to localStorage with better structure
      const entry: ContentEntry = {
        id: `blog_${Date.now()}`,
        contentType: 'blogPost',
        fields: {
          title: { 'en-US': data.title },
          slug: { 'en-US': data.slug },
          excerpt: { 'en-US': data.excerpt },
          content: { 'en-US': data.content },
          tags: { 'en-US': data.tags },
          publishDate: { 'en-US': data.publishDate },
        },
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store in localStorage for demo purposes
      this.saveToLocalStorage('blogPosts', entry);
      
      // Dispatch event for UI updates
      window.dispatchEvent(new CustomEvent('contentCreated', {
        detail: { type: 'Blog Post', title: data.title }
      }));
      
      return entry;
    } catch (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
  }

  async createProject(data: ProjectData): Promise<ContentEntry | null> {
    try {
      if (!this.useLocalStorage) {
        // Try to use server-side API endpoint
        const response = await fetch('/api/cms/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          return await response.json();
        }
      }

      // Fallback to localStorage
      const entry: ContentEntry = {
        id: `project_${Date.now()}`,
        contentType: 'simpleProject',
        fields: {
          title: { 'en-US': data.title },
          slug: { 'en-US': data.slug },
          description: { 'en-US': data.description },
          category: { 'en-US': data.category },
          featured: { 'en-US': data.featured },
        },
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store in localStorage for demo purposes
      this.saveToLocalStorage('projects', entry);
      
      return entry;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  }

  async updateContent(id: string, data: Partial<BlogPostData | ProjectData>): Promise<ContentEntry | null> {
    try {
      // Get existing content
      const blogPosts = this.getFromLocalStorage('blogPosts');
      const projects = this.getFromLocalStorage('projects');
      
      let entry = blogPosts.find((p: ContentEntry) => p.id === id) || 
                  projects.find((p: ContentEntry) => p.id === id);
      
      if (!entry) {
        throw new Error('Content not found');
      }

      // Update fields
      Object.keys(data).forEach(key => {
        if (data[key as keyof typeof data] !== undefined) {
          entry.fields[key] = { 'en-US': data[key as keyof typeof data] };
        }
      });

      entry.updatedAt = new Date().toISOString();

      // Save back to localStorage
      if (entry.contentType === 'blogPost') {
        const updatedPosts = blogPosts.map((p: ContentEntry) => p.id === id ? entry : p);
        localStorage.setItem('cms_blogPosts', JSON.stringify(updatedPosts));
      } else {
        const updatedProjects = projects.map((p: ContentEntry) => p.id === id ? entry : p);
        localStorage.setItem('cms_projects', JSON.stringify(updatedProjects));
      }

      return entry;
    } catch (error) {
      console.error('Error updating content:', error);
      return null;
    }
  }

  async deleteContent(id: string): Promise<boolean> {
    try {
      const blogPosts = this.getFromLocalStorage('blogPosts');
      const projects = this.getFromLocalStorage('projects');
      
      const updatedBlogPosts = blogPosts.filter((p: ContentEntry) => p.id !== id);
      const updatedProjects = projects.filter((p: ContentEntry) => p.id !== id);
      
      localStorage.setItem('cms_blogPosts', JSON.stringify(updatedBlogPosts));
      localStorage.setItem('cms_projects', JSON.stringify(updatedProjects));
      
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      return false;
    }
  }

  async publishContent(id: string): Promise<boolean> {
    try {
      const entry = await this.updateContent(id, { status: 'published' } as any);
      if (entry) {
        entry.publishedAt = new Date().toISOString();
        entry.status = 'published';
      }
      return !!entry;
    } catch (error) {
      console.error('Error publishing content:', error);
      return false;
    }
  }

  async getAllBlogPosts(): Promise<ContentEntry[]> {
    try {
      // Import Contentful functions dynamically to avoid SSR issues
      const { getBlogPosts, isContentfulConfigured } = await import('./contentful');
      
      if (isContentfulConfigured()) {
        const contentfulPosts = await getBlogPosts();
        if (contentfulPosts.length > 0) {
          // Transform Contentful blog posts to match CMS Manager structure
          return contentfulPosts.map(post => ({
            id: post.sys.id,
            contentType: 'blogPost' as const,
            fields: {
              title: { 'en-US': post.fields.title },
              slug: { 'en-US': post.fields.slug },
              excerpt: { 'en-US': post.fields.excerpt },
              content: { 'en-US': post.fields.content },
              tags: { 'en-US': post.fields.tags },
              publishDate: { 'en-US': post.fields.publishDate }
            },
            status: 'published' as const,
            createdAt: post.sys.createdAt,
            updatedAt: post.sys.updatedAt,
            publishedAt: post.sys.updatedAt
          }));
        }
      }
    } catch (error) {
      console.warn('Error fetching blog posts from Contentful:', error);
    }
    
    return this.getFromLocalStorage('blogPosts');
  }

  async getAllProjects(): Promise<ContentEntry[]> {
    try {
      // Import Contentful functions dynamically to avoid SSR issues
      const { getSimpleProjects, isContentfulConfigured } = await import('./contentful');
      
      if (isContentfulConfigured()) {
        const contentfulProjects = await getSimpleProjects();
        if (contentfulProjects.length > 0) {
          // Transform Contentful projects to match CMS Manager structure
          return contentfulProjects.map(project => ({
            id: project.sys.id,
            contentType: 'simpleProject' as const,
            fields: {
              title: { 'en-US': project.fields.title },
              slug: { 'en-US': project.fields.slug },
              description: { 'en-US': project.fields.description },
              category: { 'en-US': project.fields.category },
              featured: { 'en-US': project.fields.featured }
            },
            status: 'published' as const,
            createdAt: project.sys.createdAt,
            updatedAt: project.sys.updatedAt,
            publishedAt: project.sys.updatedAt
          }));
        }
      }
    } catch (error) {
      console.warn('Error fetching projects from Contentful:', error);
    }
    
    return this.getFromLocalStorage('projects');
  }

  async getContentStats(): Promise<{ blogPosts: number; projects: number; published: number }> {
    const blogPosts = await this.getAllBlogPosts();
    const projects = await this.getAllProjects();
    const allContent = [...blogPosts, ...projects];
    const published = allContent.filter(item => item.status === 'published').length;

    return {
      blogPosts: blogPosts.length,
      projects: projects.length,
      published,
    };
  }

  async getRecentActivity(): Promise<ContentEntry[]> {
    const blogPosts = await this.getAllBlogPosts();
    const projects = await this.getAllProjects();
    const allContent = [...blogPosts, ...projects];
    
    return allContent
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }

  // Utility methods
  private saveToLocalStorage(type: 'blogPosts' | 'projects', entry: ContentEntry): void {
    const existing = this.getFromLocalStorage(type);
    existing.push(entry);
    localStorage.setItem(`cms_${type}`, JSON.stringify(existing));
  }

  private getFromLocalStorage(type: 'blogPosts' | 'projects'): ContentEntry[] {
    try {
      const data = localStorage.getItem(`cms_${type}`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // Generate slug from title
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Validate blog post data
  static validateBlogPost(data: Partial<BlogPostData>): string[] {
    const errors: string[] = [];
    
    if (!data.title?.trim()) errors.push('Title is required');
    if (!data.excerpt?.trim()) errors.push('Excerpt is required');
    if (!data.content?.trim()) errors.push('Content is required');
    if (!data.publishDate) errors.push('Publish date is required');
    
    return errors;
  }

  // Validate project data
  static validateProject(data: Partial<ProjectData>): string[] {
    const errors: string[] = [];
    
    if (!data.title?.trim()) errors.push('Title is required');
    if (!data.description?.trim()) errors.push('Description is required');
    if (!data.category) errors.push('Category is required');
    
    return errors;
  }
}

// Export singleton instance
export const cmsManager = new CMSManager();