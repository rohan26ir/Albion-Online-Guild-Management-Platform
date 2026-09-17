import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://albion-guild-platform.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/dashboard/settings',
          '/dashboard/admin/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}