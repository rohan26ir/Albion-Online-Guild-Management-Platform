import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Albion Game - The All-in-One Gaming Platform',
    short_name: 'Albion Game',
    description: 'The All-in-One Gaming Platform for Albion Online players. Marketplace, calculators, builds, guild tools, maps, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}