import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  // Always return Indonesian
  return 'id' as keyof typeof ui;
}

export function useTranslations(lang: keyof typeof ui = 'id') {
  return function t(key: keyof typeof ui['id']) {
    return ui['id'][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui = 'id') {
  return function translatePath(path: string) {
    // No language prefix needed - single language
    return path;
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop();

  if (path === undefined) {
    return '/';
  }

  return '/' + path;
}

export function getLocalizedUrl(url: string): string {
  // No localization needed - single language
  return url;
}

export function removeLocaleFromUrl(url: string): string {
  return url;
}

export function getCurrentLocale(): keyof typeof ui {
  return 'id';
}

// Helper untuk mendapatkan metadata
export function getLocalizedMetadata() {
  const t = useTranslations('id');
  
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
  };
}

// Helper untuk format tanggal (Indonesian)
export function formatDate(date: Date | string): string {
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Tanggal tidak valid';
  }
  
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

// Helper untuk format angka (Indonesian)
export function formatNumber(number: number): string {
  return new Intl.NumberFormat('id-ID').format(number);
}
