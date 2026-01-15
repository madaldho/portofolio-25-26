import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ url, request }) => {
  try {
    const body = await request.json();
    
    // Verify the request is from Contentful webhook
    const contentfulSecret = import.meta.env.CONTENTFUL_WEBHOOK_SECRET;
    const signature = request.headers.get('x-contentful-webhook-signature');
    
    if (contentfulSecret && signature) {
      // In production, verify the webhook signature here
      // For now, we'll skip verification for development
    }

    // Get the content type and action from Contentful webhook
    const contentType = body.sys?.contentType?.sys?.id;
    const action = body.sys?.type; // 'Entry', 'Asset', etc.
    const entryId = body.sys?.id;
    
    console.log('Contentful webhook received:', {
      contentType,
      action,
      entryId,
      environment: body.sys?.environment?.sys?.id
    });

    // Define routes to invalidate based on content type
    const routesToInvalidate: string[] = [];
    
    // Always invalidate homepage for any content change
    routesToInvalidate.push('/');
    routesToInvalidate.push('/id');
    
    // Invalidate specific routes based on content type
    switch (contentType) {
      case 'blogPost':
      case 'simpleBlog':
        // Invalidate blog pages
        routesToInvalidate.push('/blog');
        routesToInvalidate.push('/id/blog');
        
        // If we have the slug, invalidate specific blog post
        if (body.fields?.slug) {
          const slug = typeof body.fields.slug === 'string' 
            ? body.fields.slug 
            : body.fields.slug['id-ID'] || body.fields.slug['en-US'];
          
          if (slug) {
            routesToInvalidate.push(`/blog/${slug}`);
            routesToInvalidate.push(`/id/blog/${slug}`);
          }
        }
        break;
        
      case 'project':
      case 'simpleProject':
        // Invalidate project-related pages
        routesToInvalidate.push('/projects');
        break;
        
      case 'certificate':
        // Invalidate certificates page
        routesToInvalidate.push('/certificates');
        break;
        
      default:
        // For unknown content types, just invalidate main pages
        break;
    }

    // Invalidate sitemap
    routesToInvalidate.push('/sitemap.xml');

    const bypassToken = import.meta.env.ISR_BYPASS_TOKEN || 'muhamad-ali-ridho-isr-token-2024';
    const results = [];

    // Invalidate each route
    for (const route of routesToInvalidate) {
      try {
        const revalidateUrl = `https://${url.host}${route}`;
        
        const res = await fetch(revalidateUrl, {
          method: 'HEAD',
          headers: {
            'x-prerender-revalidate': bypassToken,
          },
        });

        const wasInvalidated = res.headers.get('X-Vercel-Cache') === 'REVALIDATED';
        
        results.push({
          route,
          success: wasInvalidated,
          status: res.status,
          cache: res.headers.get('X-Vercel-Cache')
        });

        console.log(`Revalidated ${route}:`, wasInvalidated);
      } catch (error) {
        console.error(`Failed to revalidate ${route}:`, error);
        results.push({
          route,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Revalidation completed',
      contentType,
      entryId,
      results,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// Also support GET for manual testing
export const GET: APIRoute = async ({ url }) => {
  const route = url.searchParams.get('route') || '/';
  const bypassToken = import.meta.env.ISR_BYPASS_TOKEN || 'muhamad-ali-ridho-isr-token-2024';
  
  try {
    const revalidateUrl = `https://${url.host}${route}`;
    
    const res = await fetch(revalidateUrl, {
      method: 'HEAD',
      headers: {
        'x-prerender-revalidate': bypassToken,
      },
    });

    const wasInvalidated = res.headers.get('X-Vercel-Cache') === 'REVALIDATED';

    return new Response(JSON.stringify({
      success: true,
      route,
      wasInvalidated,
      cache: res.headers.get('X-Vercel-Cache'),
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};