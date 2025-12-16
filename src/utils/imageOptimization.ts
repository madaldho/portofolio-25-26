// Image optimization utilities for better performance

export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  loading?: 'lazy' | 'eager';
  sizes?: string;
  alt: string;
}

export interface ResponsiveImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export class ImageOptimizer {
  private static readonly DEFAULT_QUALITY = 80;
  private static readonly DEFAULT_SIZES: ResponsiveImageSizes = {
    mobile: 480,
    tablet: 768,
    desktop: 1200,
    wide: 1920,
  };

  // Generate responsive image sizes
  static generateResponsiveSizes(
    baseUrl: string,
    sizes: Partial<ResponsiveImageSizes> = {},
    format: 'webp' | 'avif' | 'jpeg' = 'webp'
  ): string {
    const finalSizes = { ...this.DEFAULT_SIZES, ...sizes };
    
    const srcSet = Object.entries(finalSizes)
      .map(([breakpoint, width]) => {
        const optimizedUrl = this.getOptimizedUrl(baseUrl, {
          width,
          format,
          quality: this.DEFAULT_QUALITY,
        });
        return `${optimizedUrl} ${width}w`;
      })
      .join(', ');

    return srcSet;
  }

  // Generate sizes attribute for responsive images
  static generateSizesAttribute(
    sizes: Partial<ResponsiveImageSizes> = {}
  ): string {
    const finalSizes = { ...this.DEFAULT_SIZES, ...sizes };
    
    return [
      `(max-width: ${finalSizes.mobile}px) ${finalSizes.mobile}px`,
      `(max-width: ${finalSizes.tablet}px) ${finalSizes.tablet}px`,
      `(max-width: ${finalSizes.desktop}px) ${finalSizes.desktop}px`,
      `${finalSizes.wide}px`,
    ].join(', ');
  }

  // Get optimized image URL (works with Astro's image service)
  static getOptimizedUrl(
    src: string,
    options: Partial<ImageOptions> = {}
  ): string {
    if (src.startsWith('http')) {
      // External image - return as is or use external optimization service
      return src;
    }

    // For local images, Astro will handle optimization automatically
    // This is a placeholder for additional optimization logic
    const params = new URLSearchParams();
    
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.quality) params.set('q', options.quality.toString());
    if (options.format) params.set('f', options.format);

    const queryString = params.toString();
    return queryString ? `${src}?${queryString}` : src;
  }

  // Generate blur placeholder for loading states
  static generateBlurPlaceholder(
    src: string,
    width: number = 20,
    height: number = 20
  ): string {
    // This would typically generate a low-quality, small version of the image
    // For now, return a data URL with a simple gradient
    const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
    
    if (!canvas) {
      // Fallback for server-side rendering
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo=';
    }

    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Create a simple gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }

  // Preload critical images
  static preloadImage(src: string, options: Partial<ImageOptions> = {}): void {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = this.getOptimizedUrl(src, options);
    
    if (options.sizes) {
      link.setAttribute('imagesizes', options.sizes);
    }
    
    document.head.appendChild(link);
  }

  // Lazy load images with intersection observer
  static setupLazyLoading(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          
          if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
          }
          
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01,
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Convert Contentful image URLs to optimized versions
  static optimizeContentfulImage(
    url: string,
    options: Partial<ImageOptions> = {}
  ): string {
    if (!url.includes('ctfassets.net')) {
      return url;
    }

    const params = new URLSearchParams();
    
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.quality) params.set('q', options.quality.toString());
    if (options.format) params.set('fm', options.format);
    
    // Contentful-specific optimizations
    params.set('fit', 'fill'); // or 'pad', 'crop', 'scale'
    params.set('f', 'face'); // Focus on faces if present
    
    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  // Generate WebP and AVIF sources for picture element
  static generatePictureSources(
    src: string,
    options: Partial<ImageOptions> = {}
  ): Array<{ srcset: string; type: string; sizes?: string }> {
    const sources = [];
    
    // AVIF (best compression, newer browsers)
    sources.push({
      srcset: this.getOptimizedUrl(src, { ...options, format: 'avif' }),
      type: 'image/avif',
      sizes: options.sizes,
    });
    
    // WebP (good compression, wide support)
    sources.push({
      srcset: this.getOptimizedUrl(src, { ...options, format: 'webp' }),
      type: 'image/webp',
      sizes: options.sizes,
    });
    
    return sources.filter(source => source.srcset);
  }
}

// Initialize lazy loading when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      ImageOptimizer.setupLazyLoading();
    });
  } else {
    ImageOptimizer.setupLazyLoading();
  }
}

export default ImageOptimizer;