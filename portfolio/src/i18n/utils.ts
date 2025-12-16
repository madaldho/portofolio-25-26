import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
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

export function getLocalizedUrl(url: string, locale: string): string {
  if (locale === defaultLang && !showDefaultLang) {
    return url;
  }
  return `/${locale}${url}`;
}

export function removeLocaleFromUrl(url: string): string {
  const segments = url.split('/');
  if (segments[1] in ui) {
    segments.splice(1, 1);
  }
  return segments.join('/') || '/';
}

export function getCurrentLocale(url: URL): keyof typeof ui {
  return getLangFromUrl(url);
}

export function getAlternateLanguages(currentUrl: URL) {
  const currentLang = getLangFromUrl(currentUrl);
  const route = removeLocaleFromUrl(currentUrl.pathname);
  
  return Object.keys(ui).map(lang => ({
    lang,
    url: getLocalizedUrl(route, lang),
    label: ui[lang as keyof typeof ui]['common.language'] || lang,
  })).filter(item => item.lang !== currentLang);
}

// Helper untuk mendapatkan metadata berdasarkan bahasa
export function getLocalizedMetadata(lang: keyof typeof ui) {
  const t = useTranslations(lang);
  
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords'),
  };
}

// Helper untuk format tanggal berdasarkan bahasa
export function formatDate(date: Date | string, lang: keyof typeof ui): string {
  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return lang === 'id' ? 'Tanggal tidak valid' : 'Invalid date';
  }
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

// Helper untuk format angka berdasarkan bahasa
export function formatNumber(number: number, lang: keyof typeof ui): string {
  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  
  return new Intl.NumberFormat(locale).format(number);
}