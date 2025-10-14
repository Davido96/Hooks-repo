import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com'; // Replace with your actual domain

  // For now, I'll add the static routes I know about.
  // You can expand this later to include dynamic routes (e.g., for user profiles).
  const staticRoutes = [
    '/',
    '/about',
    '/login',
    '/fan-signup',
    '/creator-signup',
    '/community-guidelines',
    '/terms',
    '/fan-privacy',
    '/creator-privacy',
  ];

  const sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
 
  return sitemap;
}