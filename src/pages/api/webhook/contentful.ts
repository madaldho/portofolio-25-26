import type { APIRoute } from 'astro';
import crypto from 'crypto';

// Webhook endpoint for Contentful to trigger ISR revalidation
export const POST: APIRoute = async ({ request }) => {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-contentful-signature');
    
    // Verify webhook signature if secret is provided
    const webhookSecret = import.meta.env.CONTENTFUL_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return new Response('Unauthorized', { status: 401 });
      }
    }
    
    // Parse the webhook payload
    const payload = JSON.parse(body);
    
    // Log webhook event for debugging
    const topic = request.headers.get('x-contentful-topic');
    console.log('Contentful webhook received:', {
      topic,
      contentType: payload.sys?.contentType?.sys?.id,
      entryId: payload.sys?.id,
      timestamp: new Date().toISOString(),
    });
    
    // Determine if this is a content change that requires ISR revalidation
    const shouldRevalidate = [
      'ContentManagement.Entry.publish',
      'ContentManagement.Entry.unpublish',
      'ContentManagement.Entry.delete',
      'ContentManagement.Asset.publish',
      'ContentManagement.Asset.unpublish',
      'ContentManagement.Asset.delete',
    ].includes(topic || '');
    
    // Trigger ISR revalidation for affected pages
    if (shouldRevalidate) {
      const isrBypassToken = import.meta.env.ISR_BYPASS_TOKEN || 'muhamad-ali-ridho-isr-token-2024';
      const siteUrl = import.meta.env.SITE_URL || 'https://muhamadaliridho.me';
      
      // Pages to revalidate based on content type
      const pagesToRevalidate = [];
      const contentType = payload.sys?.contentType?.sys?.id;
      
      if (contentType === 'simpleProject' || contentType === 'project') {
        pagesToRevalidate.push('/', '/id/', '/projects', '/id/projects');
        
        // If it's a specific project, also revalidate its detail page
        if (payload.fields?.slug) {
          pagesToRevalidate.push(`/projects/${payload.fields.slug}`, `/id/projects/${payload.fields.slug}`);
        }
      } else if (contentType === 'blogPost') {
        pagesToRevalidate.push('/blog', '/id/blog');
        
        if (payload.fields?.slug) {
          pagesToRevalidate.push(`/blog/${payload.fields.slug}`, `/id/blog/${payload.fields.slug}`);
        }
      } else {
        // For other content types, revalidate homepage
        pagesToRevalidate.push('/', '/id/');
      }
      
      // Trigger ISR revalidation for each page
      const revalidationResults = [];
      for (const page of pagesToRevalidate) {
        try {
          const revalidateUrl = `${siteUrl}${page}?__prerender_bypass=${isrBypassToken}`;
          const response = await fetch(revalidateUrl, {
            method: 'GET',
            headers: {
              'User-Agent': 'Contentful-Webhook-ISR-Revalidation',
            },
          });
          
          revalidationResults.push({
            page,
            status: response.status,
            success: response.ok,
          });
          
          console.log(`ISR revalidation for ${page}: ${response.status}`);
        } catch (error) {
          console.error(`Failed to revalidate ${page}:`, error);
          revalidationResults.push({
            page,
            status: 'error',
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
      
      console.log('ISR revalidation completed:', revalidationResults);
    }
    
    // Trigger Vercel deployment if deploy hook is configured (fallback)
    const deployHook = import.meta.env.VERCEL_DEPLOY_HOOK;
    if (deployHook && shouldRevalidate) {
      try {
        const deployResponse = await fetch(deployHook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'contentful-webhook',
            trigger: topic,
            entry: payload.sys?.id,
          }),
        });
        
        if (deployResponse.ok) {
          console.log('Vercel deployment triggered successfully');
        } else {
          console.error('Failed to trigger Vercel deployment:', deployResponse.statusText);
        }
      } catch (error) {
        console.error('Error triggering Vercel deployment:', error);
      }
    }
    
    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Webhook processed successfully',
      revalidated: shouldRevalidate,
      timestamp: new Date().toISOString(),
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// Health check endpoint
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    status: 'healthy',
    service: 'contentful-webhook',
    timestamp: new Date().toISOString(),
    environment: import.meta.env.MODE,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};