import { MetadataRoute } from 'next';
import { TOOLS } from '@/constants/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://TurboTool.com';

  const toolUrls = TOOLS.map((tool) => {
    // Strip query parameters for clean sitemap URLs
    const cleanPath = tool.href.split('?')[0];
    return {
      url: `${baseUrl}${cleanPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  // Filter out duplicates (e.g. if multiple tools point to same base route)
  const uniqueToolUrls = Array.from(new Map(toolUrls.map(item => [item.url, item])).values());

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...uniqueToolUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
  ];
}
