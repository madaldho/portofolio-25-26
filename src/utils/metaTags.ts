export interface MetaTagsConfig {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export interface GeneratedMetaTags {
  title: string;
  description: string;
  'og:title': string;
  'og:description': string;
  'og:image': string;
  'og:url': string;
  'og:type': string;
  'og:site_name'?: string;
  'twitter:card': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
}

export function generateMetaTags(config: MetaTagsConfig): GeneratedMetaTags {
  const {
    title,
    description,
    image,
    url,
    siteName = 'Muhamad Ali Ridho',
    twitterCard = 'summary_large_image',
  } = config;

  return {
    title,
    description,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': 'website',
    'og:site_name': siteName,
    'twitter:card': twitterCard,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
}

export function validateMetaTags(tags: GeneratedMetaTags): { valid: boolean; missing: string[] } {
  const requiredFields: (keyof GeneratedMetaTags)[] = [
    'title',
    'description',
    'og:title',
    'og:description',
    'og:image',
    'og:url',
    'twitter:card',
  ];

  const missing: string[] = [];

  for (const field of requiredFields) {
    const value = tags[field];
    if (!value || (typeof value === 'string' && value.trim().length === 0)) {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}
