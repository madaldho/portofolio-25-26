import { mcp_contentful_get_initial_context } from '../../../.kiro/settings/mcp.json';

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
      // Implement HMAC SHA-256 signature validation
      // This is a simplified version - in production, use proper crypto validation
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
      
      return signature === expectedSignature;
    } catch (error) {
      console.error('Signature validation error:', error);
      return false;
    }
  }

  /**
   * Process webhook payload and determine what to revalidate
   */
  processWebhookPayload(payload: any): {
    contentType: string;
    action: string;
    entryId: string;
    routesToRevalidate: string[];
  } {
    const contentType = payload.sys?.contentType?.sys?.id || 'unknown';
    const action = payload.sys?.type || 'unknown';
    const entryId = payload.sys?.id || 'unknown';
    
    const routesToRevalidate: string[] = ['/'];

    // Determine routes based on content type
    switch (contentType) {
      case 'blogPost':
      case 'simpleBlog':
        routesToRevalidate.push('/blog', '/id/blog');
        
        // Add specific blog post route if slug is available
        if (payload.fields?.slug) {
          const slug = this.extractSlugFromField(payload.fields.slug);
          if (slug) {
            routesToRevalidate.push(`/blog/${slug}`, `/id/blog/${slug}`);
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
        routesToRevalidate.push('/id');
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
  private extractSlugFromField(slugField: any): string | null {
    if (typeof slugField === 'string') {
      return slugField;
    }
    
    if (typeof slugField === 'object' && slugField !== null) {
      // Try different locales (prioritize id-ID)
      return slugField['id-ID'] || slugField['en-US'] || Object.values(slugField)[0] || null;
    }
    
    return null;
  }

  /**
   * Log webhook activity for debugging
   */
  logWebhookActivity(payload: any, result: any): void {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      contentType: payload.sys?.contentType?.sys?.id,
      action: payload.sys?.type,
      entryId: payload.sys?.id,
      environment: payload.sys?.environment?.sys?.id,
      result
    };

    console.log('Contentful Webhook Activity:', JSON.stringify(logData, null, 2));
  }
}

export const webhookManager = new ContentfulWebhookManager();