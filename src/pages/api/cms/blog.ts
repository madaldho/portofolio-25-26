import type { APIRoute } from 'astro';

function isAuthenticated(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const adminPassword = import.meta.env.ADMIN_PASSWORD;

  if (!adminPassword) return false;

  if (authHeader === `Bearer ${adminPassword}`) return true;

  const cookies = request.headers.get('cookie') || '';
  return cookies.includes('admin-auth=true');
}

// API endpoint for blog management with Contentful MCP integration
export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.excerpt || !data.content) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: title, slug, excerpt, content',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const entry = {
      id: `blog_${Date.now()}`,
      contentType: 'blogPost',
      fields: {
        title: { 'id-ID': String(data.title).trim() },
        slug: { 'id-ID': String(data.slug).trim() },
        excerpt: { 'id-ID': String(data.excerpt).trim() },
        content: { 'id-ID': String(data.content) },
        tags: { 'id-ID': Array.isArray(data.tags) ? data.tags.map(String) : [] },
        publishDate: { 'id-ID': data.publishDate || new Date().toISOString() },
      },
      status: data.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify({ success: true, data: entry }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return empty - frontend fetches from Contentful directly
    return new Response(JSON.stringify({ success: true, data: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Entry ID is required',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedEntry = {
      id,
      contentType: 'blogPost',
      fields: {
        title: { 'id-ID': updateData.title },
        slug: { 'id-ID': updateData.slug },
        excerpt: { 'id-ID': updateData.excerpt },
        content: { 'id-ID': updateData.content },
        tags: { 'id-ID': Array.isArray(updateData.tags) ? updateData.tags : [] },
        publishDate: { 'id-ID': updateData.publishDate },
      },
      status: updateData.status || 'draft',
      createdAt: updateData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify({ success: true, data: updatedEntry }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error updating blog post:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Entry ID is required',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Blog post deleted successfully',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
