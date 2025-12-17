// Client-side performance monitoring script
// This script should be loaded early in the page lifecycle

import { performanceMonitor } from '../utils/performance';

// Check if we're in development mode (localhost)
const isDev = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Helper function to safely send analytics (only in dev mode)
function sendAnalytics(data: object) {
  if (!isDev) return; // Skip in production to avoid 405 errors
  
  fetch('/api/analytics/performance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {}); // Silently fail
}

// Initialize performance monitoring when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePerformanceMonitoring);
} else {
  initializePerformanceMonitoring();
}

function initializePerformanceMonitoring() {
  // Performance monitoring is already initialized in the constructor
  // This function can be used for additional setup if needed
  
  // Monitor resource loading performance
  monitorResourceLoading();
  
  // Monitor user interactions
  monitorUserInteractions();
  
  // Monitor page visibility changes
  monitorPageVisibility();
}

function monitorResourceLoading() {
  if ('PerformanceObserver' in window) {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Log slow resources (> 1 second)
          if (entry.duration > 1000) {
            console.warn(`Slow resource: ${entry.name} took ${Math.round(entry.duration)}ms`);
            
            // Send to analytics (dev only)
            sendAnalytics({
              metric: 'slow_resource',
              value: Math.round(entry.duration),
              url: window.location.pathname,
              resource: entry.name,
              timestamp: Date.now(),
            });
          }
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource observer not supported:', error);
    }
  }
}

function monitorUserInteractions() {
  // Track long tasks that might impact user experience
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.warn(`Long task detected: ${Math.round(entry.duration)}ms`);
          
          // Send to analytics (dev only)
          sendAnalytics({
            metric: 'long_task',
            value: Math.round(entry.duration),
            url: window.location.pathname,
            timestamp: Date.now(),
          });
        });
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long task observer not supported:', error);
    }
  }
}

function monitorPageVisibility() {
  let pageLoadTime = Date.now();
  let isVisible = !document.hidden;
  
  document.addEventListener('visibilitychange', () => {
    const now = Date.now();
    
    if (document.hidden && isVisible) {
      // Page became hidden
      const timeVisible = now - pageLoadTime;
      
      // Send engagement metric (dev only)
      sendAnalytics({
        metric: 'page_engagement',
        value: timeVisible,
        url: window.location.pathname,
        timestamp: now,
      });
      
      isVisible = false;
    } else if (!document.hidden && !isVisible) {
      // Page became visible
      pageLoadTime = now;
      isVisible = true;
    }
  });
  
  // Track page unload
  window.addEventListener('beforeunload', () => {
    if (isVisible && isDev) {
      const timeVisible = Date.now() - pageLoadTime;
      
      // Use sendBeacon for reliable delivery (dev only)
      if ('sendBeacon' in navigator) {
        navigator.sendBeacon('/api/analytics/performance', JSON.stringify({
          metric: 'page_engagement',
          value: timeVisible,
          url: window.location.pathname,
          timestamp: Date.now(),
        }));
      }
    }
  });
}

// Export for use in other scripts
export { performanceMonitor };