/**
 * XML Sitemap Generation Utilities
 *
 * Generate XML sitemaps for search engines
 */

export interface SitemapEntry {
  url: string;
  lastmod?: Date | string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate XML sitemap from entries
 */
export function generateSitemap(entries: SitemapEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';
  const urlsetClose = '</urlset>';

  const urlEntries = entries.map((entry) => {
    const url = `    <loc>${escapeXml(entry.url)}</loc>`;
    const lastmod = entry.lastmod
      ? `    <lastmod>${formatDate(entry.lastmod)}</lastmod>`
      : '';
    const changefreq = entry.changefreq
      ? `    <changefreq>${entry.changefreq}</changefreq>`
      : '';
    const priority =
      entry.priority !== undefined
        ? `    <priority>${entry.priority.toFixed(1)}</priority>`
        : '';

    const parts = [url, lastmod, changefreq, priority].filter((part) => part !== '');

    return `  <url>\n${parts.join('\n')}\n  </url>`;
  });

  return [xmlHeader, urlsetOpen, ...urlEntries, urlsetClose].join('\n');
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format date to ISO 8601 (W3C) format
 */
function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toISOString();
}

/**
 * Generate sitemap index for multiple sitemaps
 */
export function generateSitemapIndex(sitemaps: Array<{ url: string; lastmod?: Date | string }>): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapindexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapindexClose = '</sitemapindex>';

  const sitemapEntries = sitemaps.map((sitemap) => {
    const loc = `    <loc>${escapeXml(sitemap.url)}</loc>`;
    const lastmod = sitemap.lastmod
      ? `    <lastmod>${formatDate(sitemap.lastmod)}</lastmod>`
      : '';

    const parts = [loc, lastmod].filter((part) => part !== '');

    return `  <sitemap>\n${parts.join('\n')}\n  </sitemap>`;
  });

  return [xmlHeader, sitemapindexOpen, ...sitemapEntries, sitemapindexClose].join('\n');
}
