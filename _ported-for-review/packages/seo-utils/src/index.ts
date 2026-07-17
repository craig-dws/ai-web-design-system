/**
 * @workspace/seo-utils
 *
 * SEO utilities for schema markup, meta tags, sitemaps, and robots.txt generation
 */

// Schema markup generators
export {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  schemaToJsonLd,
} from './schema-generator';

// Meta tag generators
export {
  generateMetaTags,
  validateDescriptionLength,
  validateTitleLength,
  type MetaTagsConfig,
  type MetaTag,
} from './meta-tags';

// Sitemap builders
export {
  generateSitemap,
  generateSitemapIndex,
  type SitemapEntry,
} from './sitemap-builder';

// robots.txt generators
export {
  generateRobotsTxt,
  generateLlmsTxt,
  type RobotsTxtConfig,
} from './robots-txt';

// Medical schema generators
export {
  generatePhysicianSchema,
  generateMedicalBusinessSchema,
  generateFAQPageSchema,
  generateMedicalProcedureSchema,
  generateMedicalConditionSchema,
} from './medical-schema';
