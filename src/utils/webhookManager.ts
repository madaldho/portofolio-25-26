import crypto from 'crypto';

interface WebhookConfig {
  name: string;
  url: string;
  topics: string[];
  headers?: Record<string, string>;
  filters?: Array<{
    equals: Array<{ doc: string; }>;
  }>;
}

export class ContentfulWebhookManager {
  private spaceId: string;
  private accessToken: string;
  private environment: string;

  constructor() {
    this.spaceId = import.meta.env.CONTENTFUL_SPACE_ID || '';
    this.accessToken = import.meta.env.CONTENTFUL_ACCESS_TOKEN || '';
    this.environment = import.meta.env.CONTENTFUL_ENVIRONMENT || 'master';
  }

  /**
   * Create or update webhook in Contentful for ISR
   */
  async setupISRWebhook(siteUrl: string): Promise<boolean> {
    try {
      const webhookUrl = `${siteUrl}/api/revalidate`;
      
      const webhookConfig: WebhookConfig = {
        name: 'Muhamad Ali Ridho Portfolio ISR',
        url: webhookUrl,
        topics: [
          'Entry.publish',
          'Entry.unpublish',
          'Entry.archive',
          'Entry.unarchive',
          'Entry.delete',
          'Asset.publish',
          'Asset.unpublish',
          'Asset.archive',
          'Asset.unarchive',
          'Asset.delete'
        ],
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Source': 'contentful-isr'
        },
        filters: [
          {
            equals: [
              { doc: 'sys.environment.sys.id' }
            ]
          }
        ]
      };

      // In a real implementation, you would use Contentful Management API
      // For now, we'll return true to indicate setup is ready
      console.log('Webhook configuration ready:', webhookConfig);
      
      return true;
    } catch (error) {
      console.error('Failed to setup ISR webhook:', error);
      return false;
    }
  }

  /**
   * Validate webhook signature from Contentful
   */
  validateWebhookSignature(payload: string, signature: string, secret: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
      
      // Use timing-safe comparison to prevent timing attacks
      if (signature.length !== expectedSignature.length) return false;
      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );
    } catch (error) {
      console.error('Signature validation error:', error);
      return false;
    }
  }

  /**
   * Process webhook payload and determine what to revalidate
   */
  processWebhookPayload(payload: Record<string, unknown>): {
    contentType: string;
    action: string;
    entryId: string;
    routesToRevalidate: string[];
  } {
    const sys = payload.sys as Record<string, unknown> | undefined;
    const contentType = ((sys?.contentType as Record<string, unknown>)?.sys as Record<string, unknown>)?.id as string || 'unknown';
    const action = sys?.type as string || 'unknown';
    const entryId = sys?.id as string || 'unknown';
    
    const routesToRevalidate: string[] = ['/'];

    // Determine routes based on content type
    switch (contentType) {
      case 'blogPost':
      case 'simpleBlog':
        routesToRevalidate.push('/blog');
        
        // Add specific blog post route if slug is available
        const fields = payload.fields as Record<string, unknown> | undefined;
        if (fields?.slug) {
          const slug = this.extractSlugFromField(fields.slug);
          if (slug) {
            routesToRevalidate.push(`/blog/${slug}`);
          }
        }
        break;

      case 'project':
      case 'simpleProject':
        routesToRevalidate.push('/projects');
        break;

      case 'certificate':
        routesToRevalidate.push('/certificates');
        break;

      default:
        // For unknown content types, just revalidate main pages
        break;
    }

    // Always revalidate sitemap
    routesToRevalidate.push('/sitemap.xml');

    return {
      contentType,
      action,
      entryId,
      routesToRevalidate
    };
  }

  /**
   * Extract slug from Contentful field (handles both string and localized object)
   */
  private extractSlugFromField(slugField: unknown): string | null {
    if (typeof slugField === 'string') {
      return slugField;
    }
    
    if (typeof slugField === 'object' && slugField !== null) {
      const obj = slugField as Record<string, unknown>;
      // Try different locales (prioritize id-ID)
      const value = obj['id-ID'] || obj['en-US'] || Object.values(obj)[0];
      return typeof value === 'string' ? value : null;
    }
    
    return null;
  }

  /**
   * Log webhook activity for debugging
   */
  logWebhookActivity(payload: Record<string, unknown>, result: unknown): void {
    const timestamp = new Date().toISOString();
    const sys = payload.sys as Record<string, unknown> | undefined;
    const logData = {
      timestamp,
      contentType: ((sys?.contentType as Record<string, unknown>)?.sys as Record<string, unknown>)?.id,
      action: sys?.type,
      entryId: sys?.id,
      environment: ((sys?.environment as Record<string, unknown>)?.sys as Record<string, unknown>)?.id,
      result
    };

    console.log('Contentful Webhook Activity:', JSON.stringify(logData, null, 2));
  }
}

export const webhookManager = new ContentfulWebhookManager();
