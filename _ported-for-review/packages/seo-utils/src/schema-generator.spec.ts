import { describe, it, expect } from 'vitest';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateArticleSchema,
  schemaToJsonLd,
} from './schema-generator';

describe('schema-generator', () => {
  describe('generateWebsiteSchema', () => {
    it('should generate valid WebSite schema', () => {
      const schema = generateWebsiteSchema({
        name: 'Test Site',
        url: 'https://test.com',
        description: 'A test website',
      });

      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Test Site');
      expect(schema.url).toBe('https://test.com');
      expect(schema.description).toBe('A test website');
    });

    it('should include search action when searchUrl provided', () => {
      const schema = generateWebsiteSchema({
        name: 'Test Site',
        url: 'https://test.com',
        description: 'A test website',
        searchUrl: 'https://test.com/search',
      });

      expect(schema.potentialAction).toBeDefined();
      expect(schema.potentialAction?.['@type']).toBe('SearchAction');
    });
  });

  describe('generateOrganizationSchema', () => {
    it('should generate valid Organization schema', () => {
      const schema = generateOrganizationSchema({
        name: 'Test Company',
        url: 'https://test.com',
        logo: 'https://test.com/logo.png',
      });

      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Test Company');
      expect(schema.logo).toBe('https://test.com/logo.png');
    });
  });

  describe('generateArticleSchema', () => {
    it('should generate valid Article schema', () => {
      const schema = generateArticleSchema({
        headline: 'Test Article',
        description: 'Article description',
        url: 'https://test.com/article',
        datePublished: '2025-10-31',
        author: {
          name: 'John Doe',
        },
      });

      expect(schema['@type']).toBe('Article');
      expect(schema.headline).toBe('Test Article');
      expect(schema.datePublished).toBe('2025-10-31');
    });
  });

  describe('schemaToJsonLd', () => {
    it('should convert schema to JSON-LD string', () => {
      const schema = generateWebsiteSchema({
        name: 'Test Site',
        url: 'https://test.com',
        description: 'A test website',
      });

      const jsonLd = schemaToJsonLd(schema);
      const parsed = JSON.parse(jsonLd);

      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('WebSite');
    });
  });
});
