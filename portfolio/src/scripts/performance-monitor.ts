// Client-side performance monitoring script
// This script should be loaded early in the page lifecycle

import { performanceMonitor } from '../utils/performance';

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
            
            // Send to analytics
            fetch('/api/analytics/performance', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                metric: 'slow_resource',
                value: Math.round(entry.duration),
                url: window.location.pathname,
                resource: entry.name,
                timestamp: Date.now(),
              }),
            }).catch(() => {}); // Silently fail
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
          
          // Send to analytics
          fetch('/api/analytics/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              metric: 'long_task',
              value: Math.round(entry.duration),
              url: window.location.pathname,
              timestamp: Date.now(),
            }),
          }).catch(() => {}); // Silently fail
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
      
      // Send engagement metric
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: 'page_engagement',
          value: timeVisible,
          url: window.location.pathname,
          timestamp: now,
        }),
      }).catch(() => {}); // Silently fail
      
      isVisible = false;
    } else if (!document.hidden && !isVisible) {
      // Page became visible
      pageLoadTime = now;
      isVisible = true;
    }
  });
  
  // Track page unload
  window.addEventListener('beforeunload', () => {
    if (isVisible) {
      const timeVisible = Date.now() - pageLoadTime;
      
      // Use sendBeacon for reliable delivery
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