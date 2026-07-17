/**
 * Meta Tag Generation Utilities
 *
 * Generate SEO-optimized meta tags for pages
 */

export interface MetaTagsConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  keywords?: string[];
  author?: string;
}

export interface MetaTag {
  tag: 'title' | 'meta' | 'link';
  attributes: Record<string, string>;
  content?: string;
}

/**
 * Generate meta tags array from configuration
 */
export function generateMetaTags(config: MetaTagsConfig): MetaTag[] {
  const tags: MetaTag[] = [];

  // Basic meta tags
  tags.push({
    tag: 'meta',
    attributes: { name: 'description', content: config.description },
  });

  // Keywords (if provided)
  if (config.keywords && config.keywords.length > 0) {
    tags.push({
      tag: 'meta',
      attributes: { name: 'keywords', content: config.keywords.join(', ') },
    });
  }

  // Author (if provided)
  if (config.author) {
    tags.push({
      tag: 'meta',
      attributes: { name: 'author', content: config.author },
    });
  }

  // Canonical URL
  tags.push({
    tag: 'link',
    attributes: { rel: 'canonical', href: config.canonicalUrl },
  });

  // Robots meta tag (if noindex)
  if (config.noindex) {
    tags.push({
      tag: 'meta',
      attributes: { name: 'robots', content: 'noindex, nofollow' },
    });
  }

  // Open Graph tags
  tags.push(
    {
      tag: 'meta',
      attributes: { property: 'og:title', content: config.title },
    },
    {
      tag: 'meta',
      attributes: { property: 'og:description', content: config.description },
    },
    {
      tag: 'meta',
      attributes: { property: 'og:url', content: config.canonicalUrl },
    },
    {
      tag: 'meta',
      attributes: { property: 'og:type', content: config.ogType || 'website' },
    }
  );

  if (config.ogImage) {
    tags.push({
      tag: 'meta',
      attributes: { property: 'og:image', content: config.ogImage },
    });
  }

  // Twitter Card tags
  tags.push(
    {
      tag: 'meta',
      attributes: { name: 'twitter:card', content: config.twitterCard || 'summary_large_image' },
    },
    {
      tag: 'meta',
      attributes: { name: 'twitter:title', content: config.title },
    },
    {
      tag: 'meta',
      attributes: { name: 'twitter:description', content: config.description },
    }
  );

  if (config.ogImage) {
    tags.push({
      tag: 'meta',
      attributes: { name: 'twitter:image', content: config.ogImage },
    });
  }

  return tags;
}

/**
 * Validate meta description length
 */
export function validateDescriptionLength(description: string): {
  isValid: boolean;
  length: number;
  recommendation: string;
} {
  const length = description.length;
  const ideal = 155;
  const max = 160;

  if (length <= ideal) {
    return {
      isValid: true,
      length,
      recommendation: 'Description length is optimal.',
    };
  } else if (length <= max) {
    return {
      isValid: true,
      length,
      recommendation: 'Description is slightly long but acceptable.',
    };
  } else {
    return {
      isValid: false,
      length,
      recommendation: `Description is too long (${length} chars). Shorten to ${ideal} characters or less.`,
    };
  }
}

/**
 * Validate title length
 */
export function validateTitleLength(title: string): {
  isValid: boolean;
  length: number;
  recommendation: string;
} {
  const length = title.length;
  const ideal = 60;
  const max = 70;

  if (length <= ideal) {
    return {
      isValid: true,
      length,
      recommendation: 'Title length is optimal.',
    };
  } else if (length <= max) {
    return {
      isValid: true,
      length,
      recommendation: 'Title is slightly long but acceptable.',
    };
  } else {
    return {
      isValid: false,
      length,
      recommendation: `Title is too long (${length} chars). Shorten to ${ideal} characters or less.`,
    };
  }
}
