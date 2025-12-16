import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Fetch real data from Contentful using the client-side API
    // This will be handled by the frontend contentful.ts functions
    // Return empty array to let frontend handle Contentful fetching
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // This would use MCP tools to create content in Contentful
    // For now, return success response
    const newProject = {
      id: `project_${Date.now()}`,
      contentType: 'simpleProject',
      fields: {
        title: { 'en-US': data.title },
        slug: { 'en-US': data.slug },
        description: { 'en-US': data.description },
        category: { 'en-US': data.category },
        featured: { 'en-US': data.featured }
      },
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(newProject), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return new Response(JSON.stringify({ error: 'Failed to create project' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};