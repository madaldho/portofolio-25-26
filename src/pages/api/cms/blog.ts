import type { APIRoute } from 'astro';

// API endpoint for blog management with Contentful MCP integration
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.slug || !data.excerpt || !data.content) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create blog post entry in Contentful
    // Note: This would use Contentful MCP on the server side
    // For now, we'll simulate the response structure
    
    const entry = {
      id: `blog_${Date.now()}`,
      contentType: 'blogPost',
      fields: {
        title: { 'id-ID': data.title },
        slug: { 'id-ID': data.slug },
        excerpt: { 'id-ID': data.excerpt },
        content: { 'id-ID': data.content },
        tags: { 'id-ID': data.tags || [] },
        publishDate: { 'id-ID': data.publishDate },
      },
      status: data.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    // Get all blog posts from Contentful
    // This would use Contentful MCP to fetch entries
    
    const blogPosts = [
      // Simulated blog posts for now
      {
        id: 'sample_blog_1',
        contentType: 'blogPost',
        fields: {
          title: { 'id-ID': 'Selamat Datang di Blog Saya' },
          slug: { 'id-ID': 'selamat-datang-di-blog-saya' },
          excerpt: { 'id-ID': 'Ini adalah postingan blog pertama saya!' },
          content: { 'id-ID': '<p>Selamat datang di blog saya dimana saya berbagi pemikiran tentang teknologi dan pengembangan.</p>' },
          tags: { 'id-ID': ['selamat-datang', 'pengenalan'] },
          publishDate: { 'id-ID': new Date().toISOString() },
        },
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    return new Response(JSON.stringify(blogPosts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    
    if (!id) {
      return new Response(JSON.stringify({ 
        error: 'Entry ID is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update blog post in Contentful
    // This would use Contentful MCP to update the entry
    
    const updatedEntry = {
      id,
      contentType: 'blogPost',
      fields: {
        title: { 'id-ID': updateData.title },
        slug: { 'id-ID': updateData.slug },
        excerpt: { 'id-ID': updateData.excerpt },
        content: { 'id-ID': updateData.content },
        tags: { 'id-ID': updateData.tags || [] },
        publishDate: { 'id-ID': updateData.publishDate },
      },
      status: updateData.status || 'draft',
      createdAt: updateData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(updatedEntry), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error updating blog post:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ 
        error: 'Entry ID is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete blog post from Contentful
    // This would use Contentful MCP to delete the entry
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Blog post deleted successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};