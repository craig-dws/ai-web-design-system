import { describe, it, expect } from 'vitest';
import {
  generateMetaTags,
  validateDescriptionLength,
  validateTitleLength,
} from './meta-tags';

describe('meta-tags', () => {
  describe('generateMetaTags', () => {
    it('should generate basic meta tags', () => {
      const tags = generateMetaTags({
        title: 'Test Page',
        description: 'This is a test page description',
        canonicalUrl: 'https://test.com/page',
      });

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'description', content: 'This is a test page description' },
          }),
          expect.objectContaining({
            tag: 'link',
            attributes: { rel: 'canonical', href: 'https://test.com/page' },
          }),
        ])
      );
    });

    it('should include keywords when provided', () => {
      const tags = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
        canonicalUrl: 'https://test.com',
        keywords: ['seo', 'test', 'astro'],
      });

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'keywords', content: 'seo, test, astro' },
          }),
        ])
      );
    });

    it('should include author when provided', () => {
      const tags = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
        canonicalUrl: 'https://test.com',
        author: 'John Doe',
      });

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'author', content: 'John Doe' },
          }),
        ])
      );
    });

    it('should add noindex meta tag when specified', () => {
      const tags = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
        canonicalUrl: 'https://test.com',
        noindex: true,
      });

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'robots', content: 'noindex, nofollow' },
          }),
        ])
      );
    });

    it('should generate Open Graph tags', () => {
      const tags = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
        canonicalUrl: 'https://test.com',
        ogImage: 'https://test.com/image.jpg',
        ogType: 'article',
      });

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'meta',
            attributes: { property: 'og:title', content: 'Test Page' },
          }),
          expect.objectContaining({
            tag: 'meta',
            attributes: { property: 'og:description', content: 'Test description' },
          }),
          expect.objectContaining({
            tag: 'meta',
            attributes: { property: 'og:url', content: 'https://test.com' },
          }),
          expect.objectContaining({
            tag: 'meta',
            attributes: { property: 'og:type', content: 'article' },
          }),
          expect.objectContaining({
            tag: 'meta',
            attributes: { property: 'og:image', content: 'https://test.com/image.jpg' },
          }),
        ])
      );
    });

    it('should generate Twitter Card tags', () => {
      const tags = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
        canonicalUrl: 'https://test.com',
        ogImage: 'https://test.com/image.jpg',
        twitterCard: 'summary',
      });

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'twitter:card', content: 'summary' },
          }),
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'twitter:title', content: 'Test Page' },
          }),
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'twitter:description', content: 'Test description' },
          }),
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'twitter:image', content: 'https://test.com/image.jpg' },
          }),
        ])
      );
    });

    it('should default to summary_large_image for Twitter Card', () => {
      const tags = generateMetaTags({
        title: 'Test Page',
        description: 'Test description',
        canonicalUrl: 'https://test.com',
      });

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'meta',
            attributes: { name: 'twitter:card', content: 'summary_large_image' },
          }),
        ])
      );
    });
  });

  describe('validateDescriptionLength', () => {
    it('should validate optimal description length', () => {
      const result = validateDescriptionLength('This is a good description that is not too long.');

      expect(result.isValid).toBe(true);
      expect(result.length).toBe(48);
      expect(result.recommendation).toContain('optimal');
    });

    it('should validate slightly long but acceptable description', () => {
      const result = validateDescriptionLength(
        'This is a slightly longer description that is still acceptable for search engines but getting close to the limit of one hundred sixty characters for sure now.'
      );

      expect(result.isValid).toBe(true);
      expect(result.length).toBe(158);
      expect(result.recommendation).toContain('slightly long');
    });

    it('should flag too long description', () => {
      const longText = 'A'.repeat(170);
      const result = validateDescriptionLength(longText);

      expect(result.isValid).toBe(false);
      expect(result.length).toBe(170);
      expect(result.recommendation).toContain('too long');
    });
  });

  describe('validateTitleLength', () => {
    it('should validate optimal title length', () => {
      const result = validateTitleLength('Good Title');

      expect(result.isValid).toBe(true);
      expect(result.length).toBe(10);
      expect(result.recommendation).toContain('optimal');
    });

    it('should validate slightly long but acceptable title', () => {
      const result = validateTitleLength('This is a slightly longer title but still okay for SEO purposes');

      expect(result.isValid).toBe(true);
      expect(result.length).toBe(63);
      expect(result.recommendation).toContain('slightly long');
    });

    it('should flag too long title', () => {
      const longTitle = 'This is an extremely long title that exceeds the recommended seventy character limit';
      const result = validateTitleLength(longTitle);

      expect(result.isValid).toBe(false);
      expect(result.length).toBe(84);
      expect(result.recommendation).toContain('too long');
    });
  });
});
