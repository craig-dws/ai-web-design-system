import { describe, it, expect } from 'vitest';
import { generateSitemap, generateSitemapIndex } from './sitemap-builder';

describe('sitemap-builder', () => {
  describe('generateSitemap', () => {
    it('should generate valid XML sitemap with single entry', () => {
      const entries = [
        {
          url: 'https://test.com/',
          lastmod: new Date('2025-10-31'),
          changefreq: 'daily' as const,
          priority: 1.0,
        },
      ];

      const sitemap = generateSitemap(entries);

      expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(sitemap).toContain('<loc>https://test.com/</loc>');
      expect(sitemap).toContain('<lastmod>2025-10-31T00:00:00.000Z</lastmod>');
      expect(sitemap).toContain('<changefreq>daily</changefreq>');
      expect(sitemap).toContain('<priority>1.0</priority>');
      expect(sitemap).toContain('</urlset>');
    });

    it('should generate sitemap with multiple entries', () => {
      const entries = [
        {
          url: 'https://test.com/',
          priority: 1.0,
        },
        {
          url: 'https://test.com/about',
          changefreq: 'monthly' as const,
          priority: 0.8,
        },
        {
          url: 'https://test.com/blog',
          lastmod: '2025-10-31',
          changefreq: 'weekly' as const,
          priority: 0.9,
        },
      ];

      const sitemap = generateSitemap(entries);

      expect(sitemap).toContain('<loc>https://test.com/</loc>');
      expect(sitemap).toContain('<loc>https://test.com/about</loc>');
      expect(sitemap).toContain('<loc>https://test.com/blog</loc>');
      expect(sitemap).toContain('<priority>1.0</priority>');
      expect(sitemap).toContain('<priority>0.8</priority>');
      expect(sitemap).toContain('<priority>0.9</priority>');
    });

    it('should handle minimal entry with only URL', () => {
      const entries = [
        {
          url: 'https://test.com/simple',
        },
      ];

      const sitemap = generateSitemap(entries);

      expect(sitemap).toContain('<loc>https://test.com/simple</loc>');
      expect(sitemap).not.toContain('<lastmod>');
      expect(sitemap).not.toContain('<changefreq>');
      expect(sitemap).not.toContain('<priority>');
    });

    it('should escape XML special characters in URLs', () => {
      const entries = [
        {
          url: 'https://test.com/page?param1=value1&param2=value2',
        },
      ];

      const sitemap = generateSitemap(entries);

      expect(sitemap).toContain('&amp;');
      expect(sitemap).not.toContain('&param2');
    });

    it('should format dates as ISO 8601', () => {
      const date = new Date('2025-10-31T12:30:00.000Z');
      const entries = [
        {
          url: 'https://test.com/',
          lastmod: date,
        },
      ];

      const sitemap = generateSitemap(entries);

      expect(sitemap).toContain('<lastmod>2025-10-31T12:30:00.000Z</lastmod>');
    });

    it('should handle string dates', () => {
      const entries = [
        {
          url: 'https://test.com/',
          lastmod: '2025-10-31',
        },
      ];

      const sitemap = generateSitemap(entries);

      expect(sitemap).toContain('<lastmod>2025-10-31T00:00:00.000Z</lastmod>');
    });

    it('should handle all changefreq values', () => {
      const frequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'] as const;

      frequencies.forEach((freq) => {
        const entries = [
          {
            url: 'https://test.com/',
            changefreq: freq,
          },
        ];

        const sitemap = generateSitemap(entries);
        expect(sitemap).toContain(`<changefreq>${freq}</changefreq>`);
      });
    });
  });

  describe('generateSitemapIndex', () => {
    it('should generate sitemap index with multiple sitemaps', () => {
      const sitemaps = [
        {
          url: 'https://test.com/sitemap-pages.xml',
          lastmod: new Date('2025-10-31'),
        },
        {
          url: 'https://test.com/sitemap-blog.xml',
          lastmod: '2025-10-30',
        },
      ];

      const index = generateSitemapIndex(sitemaps);

      expect(index).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(index).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(index).toContain('<loc>https://test.com/sitemap-pages.xml</loc>');
      expect(index).toContain('<loc>https://test.com/sitemap-blog.xml</loc>');
      expect(index).toContain('<lastmod>2025-10-31T00:00:00.000Z</lastmod>');
      expect(index).toContain('</sitemapindex>');
    });

    it('should handle sitemap without lastmod', () => {
      const sitemaps = [
        {
          url: 'https://test.com/sitemap.xml',
        },
      ];

      const index = generateSitemapIndex(sitemaps);

      expect(index).toContain('<loc>https://test.com/sitemap.xml</loc>');
      expect(index).not.toContain('<lastmod>');
    });

    it('should escape XML special characters in sitemap URLs', () => {
      const sitemaps = [
        {
          url: 'https://test.com/sitemap.xml?version=1&type=all',
        },
      ];

      const index = generateSitemapIndex(sitemaps);

      expect(index).toContain('&amp;');
      expect(index).not.toContain('&type');
    });
  });
});
