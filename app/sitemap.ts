import type { MetadataRoute } from 'next'

const BASE_URL = 'https://albionguildplatform.com' // Replace with your actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Public Pages ──
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },

    // ── Marketplace Pages ──
    {
      url: `${BASE_URL}/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/builds`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },

    // ── Dashboard Pages (if public accessible) ──
    // Note: Only include if these pages are public, otherwise exclude for SEO
    {
      url: `${BASE_URL}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dashboard/members`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/dashboard/guild`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard/alliance`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard/builds`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard/marketplace`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dashboard/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dashboard/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/dashboard/calculators`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // ── Blog/News Pages (dynamic) ──
    // You can fetch these from your CMS/database
    ...getBlogPosts().map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // ── Build Pages (dynamic) ──
    ...getBuilds().map((build) => ({
      url: `${BASE_URL}/builds/${build.slug}`,
      lastModified: new Date(build.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}

// Example: Fetch dynamic blog posts
function getBlogPosts() {
  // Replace this with your actual data fetching
  // This could be from a database, CMS, or API
  return [
    {
      slug: 'getting-started-with-albion',
      updatedAt: new Date('2024-01-15'),
    },
    {
      slug: 'best-pvp-builds-2024',
      updatedAt: new Date('2024-02-20'),
    },
    // Add more blog posts...
  ]
}

// Example: Fetch builds
function getBuilds() {
  // Replace this with your actual data fetching
  return [
    {
      slug: 'fire-mage-pvp-build',
      updatedAt: new Date('2024-03-10'),
    },
    {
      slug: 'tank-guild-raid-build',
      updatedAt: new Date('2024-03-15'),
    },
    // Add more builds...
  ]
}