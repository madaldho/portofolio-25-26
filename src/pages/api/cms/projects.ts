import type { APIRoute } from 'astro';

function isAuthenticated(request: Request): boolean {
  // Check for session cookie or authorization header
  const authHeader = request.headers.get('authorization');
  const adminPassword = import.meta.env.ADMIN_PASSWORD;

  if (!adminPassword) return false;

  // Support Bearer token auth
  if (authHeader === `Bearer ${adminPassword}`) return true;

  // Support cookie-based auth (admin-auth cookie)
  const cookies = request.headers.get('cookie') || '';
  return cookies.includes('admin-auth=true');
}

// Input validation for project data
function validateProjectInput(data: Record<string, unknown>): string[] {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
    errors.push('Title is required and must be a non-empty string');
  }
  if (!data.slug || typeof data.slug !== 'string' || !data.slug.trim()) {
    errors.push('Slug is required and must be a non-empty string');
  }
  if (!data.description || typeof data.description !== 'string' || !data.description.trim()) {
    errors.push('Description is required and must be a non-empty string');
  }
  if (!data.category || typeof data.category !== 'string') {
    errors.push('Category is required');
  }
  if (data.featured !== undefined && typeof data.featured !== 'boolean') {
    errors.push('Featured must be a boolean');
  }

  return errors;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return empty array - frontend handles Contentful fetching
    return new Response(JSON.stringify({ success: true, data: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch projects',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    // Validate input
    const errors = validateProjectInput(data);
    if (errors.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        errors,
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newProject = {
      id: `project_${Date.now()}`,
      contentType: 'simpleProject',
      fields: {
        title: { 'id-ID': String(data.title).trim() },
        slug: { 'id-ID': String(data.slug).trim() },
        description: { 'id-ID': String(data.description).trim() },
        category: { 'id-ID': String(data.category) },
        featured: { 'id-ID': Boolean(data.featured) },
      },
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify({
      success: true,
      data: newProject,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to create project',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
