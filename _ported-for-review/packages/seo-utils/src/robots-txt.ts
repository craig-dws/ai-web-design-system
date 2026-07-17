/**
 * robots.txt Generation Utilities
 *
 * Generate AI crawler-friendly robots.txt files
 */

export interface RobotsTxtConfig {
  allowAll?: boolean;
  disallow?: string[];
  allowAICrawlers?: boolean;
  sitemapUrl: string;
  crawlDelay?: number;
}

/**
 * AI crawler user agents
 */
const AI_CRAWLERS = [
  'GPTBot',           // OpenAI (ChatGPT)
  'ClaudeBot',        // Anthropic (Claude)
  'Google-Extended',  // Google Bard
  'CCBot',            // Common Crawl
  'anthropic-ai',     // Anthropic alternate
  'Applebot-Extended', // Apple Intelligence
];

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(config: RobotsTxtConfig): string {
  const lines: string[] = [];

  // General bot rules
  lines.push('User-agent: *');

  if (config.allowAll) {
    lines.push('Allow: /');
  } else if (config.disallow && config.disallow.length > 0) {
    config.disallow.forEach((path) => {
      lines.push(`Disallow: ${path}`);
    });
  } else {
    lines.push('Allow: /');
  }

  if (config.crawlDelay) {
    lines.push(`Crawl-delay: ${config.crawlDelay}`);
  }

  lines.push('');

  // AI crawler specific rules
  if (config.allowAICrawlers) {
    AI_CRAWLERS.forEach((crawler) => {
      lines.push(`User-agent: ${crawler}`);
      lines.push('Allow: /');
      lines.push('');
    });
  }

  // Sitemap
  lines.push(`Sitemap: ${config.sitemapUrl}`);

  return lines.join('\n');
}

/**
 * Generate llms.txt for AI crawler metadata
 * See: https://llmstxt.org/
 */
export function generateLlmsTxt(data: {
  siteUrl: string;
  siteName: string;
  description: string;
  contactEmail?: string;
  preferredModel?: string;
  additionalContext?: string;
}): string {
  const lines: string[] = [];

  lines.push(`# ${data.siteName}`);
  lines.push('');
  lines.push(`> ${data.description}`);
  lines.push('');
  lines.push(`Site: ${data.siteUrl}`);

  if (data.contactEmail) {
    lines.push(`Contact: ${data.contactEmail}`);
  }

  if (data.preferredModel) {
    lines.push(`Preferred Model: ${data.preferredModel}`);
  }

  lines.push('');
  lines.push('## About');
  lines.push('');

  if (data.additionalContext) {
    lines.push(data.additionalContext);
  }

  return lines.join('\n');
}
