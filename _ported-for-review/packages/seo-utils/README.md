# @workspace/seo-utils

SEO utilities for schema markup, meta tags, sitemaps, and robots.txt generation.

## Features

- **Schema Markup:** JSON-LD structured data for search engines and AI crawlers
- **Meta Tags:** SEO-optimized meta tag generation
- **Sitemaps:** XML sitemap generation
- **robots.txt:** AI crawler-friendly robots.txt generation
- **llms.txt:** AI crawler metadata file generation

## Installation

This package is part of the Nx monorepo workspace. Import from TypeScript path alias:

```typescript
import { generateWebsiteSchema, generateMetaTags } from '@workspace/seo-utils';
```

## Usage

### Schema Markup

Generate JSON-LD structured data:

```typescript
import { generateWebsiteSchema, schemaToJsonLd } from '@workspace/seo-utils';

const schema = generateWebsiteSchema({
  name: 'My Website',
  url: 'https://example.com',
  description: 'Website description',
  searchUrl: 'https://example.com/search',
});

const jsonLd = schemaToJsonLd(schema);
// Use in <script type="application/ld+json">{jsonLd}</script>
```

Available schema generators:
- `generateWebsiteSchema()` - Website/WebSite schema
- `generateOrganizationSchema()` - Organization schema
- `generateArticleSchema()` - Article/BlogPosting schema
- `generateBreadcrumbSchema()` - BreadcrumbList schema

### Meta Tags

Generate SEO meta tags:

```typescript
import { generateMetaTags } from '@workspace/seo-utils';

const tags = generateMetaTags({
  title: 'Page Title',
  description: 'Page description for SEO',
  canonicalUrl: 'https://example.com/page',
  ogImage: 'https://example.com/og-image.jpg',
  keywords: ['seo', 'web development'],
});

// tags is array of {tag, attributes, content?} objects
```

Validate meta tag lengths:

```typescript
import { validateTitleLength, validateDescriptionLength } from '@workspace/seo-utils';

const titleCheck = validateTitleLength('My Page Title');
// { isValid: true, length: 14, recommendation: "..." }

const descCheck = validateDescriptionLength('Page description...');
// { isValid: true, length: 18, recommendation: "..." }
```

### Sitemaps

Generate XML sitemaps:

```typescript
import { generateSitemap } from '@workspace/seo-utils';

const sitemap = generateSitemap([
  {
    url: 'https://example.com/',
    lastmod: new Date(),
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    url: 'https://example.com/about',
    lastmod: '2025-10-31',
    changefreq: 'monthly',
    priority: 0.8,
  },
]);

// Returns XML sitemap string
```

For multiple sitemaps:

```typescript
import { generateSitemapIndex } from '@workspace/seo-utils';

const index = generateSitemapIndex([
  { url: 'https://example.com/sitemap-pages.xml', lastmod: new Date() },
  { url: 'https://example.com/sitemap-blog.xml', lastmod: new Date() },
]);
```

### robots.txt

Generate AI crawler-friendly robots.txt:

```typescript
import { generateRobotsTxt } from '@workspace/seo-utils';

const robotsTxt = generateRobotsTxt({
  allowAll: true,
  allowAICrawlers: true, // Explicitly allow GPTBot, ClaudeBot, etc.
  sitemapUrl: 'https://example.com/sitemap.xml',
  crawlDelay: 1,
});
```

Disallow specific paths:

```typescript
const robotsTxt = generateRobotsTxt({
  disallow: ['/admin', '/private'],
  allowAICrawlers: true,
  sitemapUrl: 'https://example.com/sitemap.xml',
});
```

### llms.txt

Generate AI crawler metadata file:

```typescript
import { generateLlmsTxt } from '@workspace/seo-utils';

const llmsTxt = generateLlmsTxt({
  siteUrl: 'https://example.com',
  siteName: 'My Company',
  description: 'We provide amazing services',
  contactEmail: 'info@example.com',
  preferredModel: 'Claude 3',
  additionalContext: 'Key information for AI understanding...',
});
```

## AI Crawler Optimization

This package is designed with AI-first principles:

1. **Explicit AI Crawler Allowlist:** `generateRobotsTxt()` explicitly allows:
   - GPTBot (ChatGPT)
   - ClaudeBot (Claude)
   - Google-Extended (Bard)
   - CCBot (Common Crawl)
   - Applebot-Extended (Apple Intelligence)

2. **Structured Data:** All schema generators follow schema.org standards for AI comprehension

3. **llms.txt Support:** Generate AI crawler metadata files per llmstxt.org spec

## Development

```bash
# Run tests
nx test seo-utils

# Watch mode
nx test seo-utils --watch

# Type check
nx type-check seo-utils

# Lint
nx lint seo-utils
```

## Testing

Tests use Vitest with >80% coverage requirement. Run tests:

```bash
pnpm nx test seo-utils
```

## API Reference

### Schema Generators

**`generateWebsiteSchema(data)`**
- `data.name` (string) - Website name
- `data.url` (string) - Website URL
- `data.description` (string) - Website description
- `data.searchUrl` (string, optional) - Search endpoint URL

**`generateOrganizationSchema(data)`**
- `data.name` (string) - Organization name
- `data.url` (string) - Organization URL
- `data.logo` (string, optional) - Logo image URL
- `data.description` (string, optional) - Organization description
- `data.sameAs` (string[], optional) - Social media URLs
- `data.address` (object, optional) - Physical address

**`generateArticleSchema(data)`**
- `data.headline` (string) - Article headline
- `data.description` (string) - Article description
- `data.url` (string) - Article URL
- `data.datePublished` (string) - Publication date (ISO 8601)
- `data.dateModified` (string, optional) - Modified date (ISO 8601)
- `data.author` (object) - Author {name, url?}
- `data.image` (string, optional) - Featured image URL
- `data.publisher` (object, optional) - Publisher {name, logo}

**`generateBreadcrumbSchema(breadcrumbs)`**
- `breadcrumbs` (Array<{name, url}>) - Breadcrumb items

**`schemaToJsonLd(schema)`**
- Converts schema object to JSON-LD string with @context

### Meta Tag Utilities

**`generateMetaTags(config)`**
- Returns array of meta tag objects
- See `MetaTagsConfig` type for full configuration options

**`validateTitleLength(title)`** / **`validateDescriptionLength(description)`**
- Returns validation result with recommendations

### Sitemap Utilities

**`generateSitemap(entries)`**
- `entries` (SitemapEntry[]) - Array of URL entries
- Returns XML sitemap string

**`generateSitemapIndex(sitemaps)`**
- `sitemaps` (Array<{url, lastmod?}>) - Array of sitemap URLs
- Returns XML sitemap index string

### robots.txt Utilities

**`generateRobotsTxt(config)`**
- `config.allowAll` (boolean, optional) - Allow all paths
- `config.disallow` (string[], optional) - Disallowed paths
- `config.allowAICrawlers` (boolean, optional) - Explicitly allow AI crawlers
- `config.sitemapUrl` (string) - Sitemap URL
- `config.crawlDelay` (number, optional) - Crawl delay in seconds

**`generateLlmsTxt(data)`**
- `data.siteUrl` (string) - Site URL
- `data.siteName` (string) - Site name
- `data.description` (string) - Site description
- `data.contactEmail` (string, optional) - Contact email
- `data.preferredModel` (string, optional) - Preferred AI model
- `data.additionalContext` (string, optional) - Additional context for AI

## Contributing

When adding new utilities:
1. Add function to appropriate file (`schema-generator.ts`, `meta-tags.ts`, etc.)
2. Export from `src/index.ts`
3. Add tests in `*.spec.ts` files
4. Update this README
5. Ensure >80% test coverage
