import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { metric, value, url, timestamp, userAgent } = data;

    // Validate required fields
    if (!metric || typeof value !== 'number') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid metric data'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Log performance metrics (in production, you'd send to analytics service)
    const performanceData = {
      metric,
      value,
      url: url || '/',
      timestamp: timestamp || Date.now(),
      userAgent: userAgent || 'unknown',
      date: new Date().toISOString(),
    };

    // In development, log to console
    if (import.meta.env.DEV) {
      console.log('Performance Metric:', performanceData);
    }

    // In production, you would:
    // 1. Send to Google Analytics
    // 2. Send to custom analytics service
    // 3. Store in database for analysis
    // 4. Send to monitoring service like DataDog, New Relic, etc.

    // Example: Send to Google Analytics (if gtag is available)
    // This would typically be done client-side, but shown for reference
    /*
    if (typeof gtag !== 'undefined') {
      gtag('event', metric, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        custom_parameter_url: url,
        non_interaction: true,
      });
    }
    */

    // Example: Send to custom analytics service
    /*
    await fetch('https://your-analytics-service.com/api/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ANALYTICS_API_KEY}`,
      },
      body: JSON.stringify(performanceData),
    });
    */

    return new Response(JSON.stringify({
      success: true,
      message: 'Performance metric recorded'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing performance metric:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Health check endpoint
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    status: 'healthy',
    service: 'performance-analytics',
    timestamp: new Date().toISOString(),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};