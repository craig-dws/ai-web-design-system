/**
 * JSON-LD Schema Markup Generators
 *
 * Generates structured data for search engines and AI crawlers
 */

import type { Thing, WebSite, Organization, Article, Person, BreadcrumbList } from 'schema-dts';

/**
 * Generate WebSite schema markup
 */
export function generateWebsiteSchema(data: {
  name: string;
  url: string;
  description: string;
  searchUrl?: string;
}): WebSite {
  const schema: WebSite = {
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
  };

  if (data.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.searchUrl}?q={search_term_string}`,
      },
      // @ts-ignore - query-input is valid in SearchAction but not in schema-dts types
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}

/**
 * Generate Organization schema markup
 */
export function generateOrganizationSchema(data: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}): Organization {
  const schema: Organization = {
    '@type': 'Organization',
    name: data.name,
    url: data.url,
  };

  if (data.logo) {
    schema.logo = data.logo;
  }

  if (data.description) {
    schema.description = data.description;
  }

  if (data.sameAs && data.sameAs.length > 0) {
    schema.sameAs = data.sameAs;
  }

  if (data.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    };
  }

  return schema;
}

/**
 * Generate Article schema markup
 */
export function generateArticleSchema(data: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  image?: string;
  publisher?: {
    name: string;
    logo: string;
  };
}): Article {
  const schema: Article = {
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    url: data.url,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.author.name,
    } as Person,
  };

  if (data.author.url) {
    // @ts-ignore - url is valid but not in schema-dts Person type
    (schema.author as Person).url = data.author.url;
  }

  if (data.image) {
    schema.image = data.image;
  }

  if (data.publisher) {
    schema.publisher = {
      '@type': 'Organization',
      name: data.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: data.publisher.logo,
      },
    };
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema markup
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Convert schema object to JSON-LD script tag string
 */
export function schemaToJsonLd(schema: Thing): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...(schema as unknown as Record<string, unknown>),
  };
  return JSON.stringify(jsonLd);
}
