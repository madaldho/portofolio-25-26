import type { APIRoute } from 'astro';
import crypto from 'crypto';

// Webhook endpoint for Contentful to trigger rebuilds
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
    console.log('Contentful webhook received:', {
      topic: request.headers.get('x-contentful-topic'),
      contentType: payload.sys?.contentType?.sys?.id,
      entryId: payload.sys?.id,
      timestamp: new Date().toISOString(),
    });
    
    // Trigger Vercel deployment if deploy hook is configured
    const deployHook = import.meta.env.VERCEL_DEPLOY_HOOK;
    if (deployHook) {
      try {
        const deployResponse = await fetch(deployHook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'contentful-webhook',
            trigger: request.headers.get('x-contentful-topic'),
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
    
    // Determine if this is a content change that requires rebuild
    const topic = request.headers.get('x-contentful-topic');
    const shouldRebuild = [
      'ContentManagement.Entry.publish',
      'ContentManagement.Entry.unpublish',
      'ContentManagement.Entry.delete',
      'ContentManagement.Asset.publish',
      'ContentManagement.Asset.unpublish',
      'ContentManagement.Asset.delete',
    ].includes(topic || '');
    
    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Webhook processed successfully',
      rebuild: shouldRebuild,
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