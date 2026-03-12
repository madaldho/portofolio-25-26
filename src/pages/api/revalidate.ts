import type { APIRoute } from 'astro';
import crypto from 'crypto';

function getBypassToken(): string | null {
  const token = import.meta.env.ISR_BYPASS_TOKEN;
  if (!token) {
    console.error('ISR_BYPASS_TOKEN environment variable is not set');
    return null;
  }
  return token;
}

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ url, request }) => {
  try {
    const rawBody = await request.text();

    // Verify the request is from Contentful webhook
    const contentfulSecret = import.meta.env.CONTENTFUL_WEBHOOK_SECRET;
    const signature = request.headers.get('x-contentful-webhook-signature')
      || request.headers.get('x-contentful-signature');

    if (contentfulSecret) {
      if (!signature) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Missing webhook signature',
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!verifyWebhookSignature(rawBody, signature, contentfulSecret)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid webhook signature',
        }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      // No secret configured - reject in production, warn in development
      if (import.meta.env.PROD) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Webhook secret not configured',
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.warn('CONTENTFUL_WEBHOOK_SECRET not configured. Skipping signature verification in development.');
    }

    const body = JSON.parse(rawBody);

    // Get the content type and action from Contentful webhook
    const contentType = body.sys?.contentType?.sys?.id;
    const action = body.sys?.type;
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
        routesToInvalidate.push('/blog');
        routesToInvalidate.push('/id/blog');

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
        routesToInvalidate.push('/projects');
        break;

      case 'certificate':
        routesToInvalidate.push('/certificates');
        break;

      default:
        break;
    }

    // Invalidate sitemap
    routesToInvalidate.push('/sitemap.xml');

    const bypassToken = getBypassToken();
    if (!bypassToken) {
      return new Response(JSON.stringify({
        success: false,
        error: 'ISR bypass token not configured',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Revalidation error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET handler requires admin auth token for manual revalidation
export const GET: APIRoute = async ({ url, request }) => {
  // Require an authorization header for manual revalidation
  const authHeader = request.headers.get('authorization');
  const adminPassword = import.meta.env.ADMIN_PASSWORD;

  if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Unauthorized',
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const route = url.searchParams.get('route') || '/';
  const bypassToken = getBypassToken();

  if (!bypassToken) {
    return new Response(JSON.stringify({
      success: false,
      error: 'ISR bypass token not configured',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
