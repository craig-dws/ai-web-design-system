import { describe, it, expect } from 'vitest';
import { generateRobotsTxt, generateLlmsTxt } from './robots-txt';

describe('robots-txt', () => {
  describe('generateRobotsTxt', () => {
    it('should generate robots.txt with allowAll', () => {
      const robots = generateRobotsTxt({
        allowAll: true,
        sitemapUrl: 'https://test.com/sitemap.xml',
      });

      expect(robots).toContain('User-agent: *');
      expect(robots).toContain('Allow: /');
      expect(robots).toContain('Sitemap: https://test.com/sitemap.xml');
    });

    it('should generate robots.txt with disallow rules', () => {
      const robots = generateRobotsTxt({
        disallow: ['/admin', '/private', '/api'],
        sitemapUrl: 'https://test.com/sitemap.xml',
      });

      expect(robots).toContain('User-agent: *');
      expect(robots).toContain('Disallow: /admin');
      expect(robots).toContain('Disallow: /private');
      expect(robots).toContain('Disallow: /api');
      expect(robots).toContain('Sitemap: https://test.com/sitemap.xml');
    });

    it('should include AI crawler rules when enabled', () => {
      const robots = generateRobotsTxt({
        allowAll: true,
        allowAICrawlers: true,
        sitemapUrl: 'https://test.com/sitemap.xml',
      });

      expect(robots).toContain('User-agent: GPTBot');
      expect(robots).toContain('User-agent: ClaudeBot');
      expect(robots).toContain('User-agent: Google-Extended');
      expect(robots).toContain('User-agent: CCBot');
      expect(robots).toContain('User-agent: anthropic-ai');
      expect(robots).toContain('User-agent: Applebot-Extended');
    });

    it('should not include AI crawler rules when disabled', () => {
      const robots = generateRobotsTxt({
        allowAll: true,
        allowAICrawlers: false,
        sitemapUrl: 'https://test.com/sitemap.xml',
      });

      expect(robots).not.toContain('User-agent: GPTBot');
      expect(robots).not.toContain('User-agent: ClaudeBot');
    });

    it('should include crawl delay when specified', () => {
      const robots = generateRobotsTxt({
        allowAll: true,
        crawlDelay: 10,
        sitemapUrl: 'https://test.com/sitemap.xml',
      });

      expect(robots).toContain('Crawl-delay: 10');
    });

    it('should default to Allow: / when no disallow specified', () => {
      const robots = generateRobotsTxt({
        sitemapUrl: 'https://test.com/sitemap.xml',
      });

      expect(robots).toContain('User-agent: *');
      expect(robots).toContain('Allow: /');
    });

    it('should ensure AI crawlers have Allow: / directive', () => {
      const robots = generateRobotsTxt({
        disallow: ['/admin'],
        allowAICrawlers: true,
        sitemapUrl: 'https://test.com/sitemap.xml',
      });

      const lines = robots.split('\n');
      const gptBotIndex = lines.findIndex((line) => line === 'User-agent: GPTBot');

      expect(gptBotIndex).toBeGreaterThan(-1);
      expect(lines[gptBotIndex + 1]).toBe('Allow: /');
    });
  });

  describe('generateLlmsTxt', () => {
    it('should generate basic llms.txt', () => {
      const llmsTxt = generateLlmsTxt({
        siteUrl: 'https://test.com',
        siteName: 'Test Site',
        description: 'A test website for AI crawlers',
      });

      expect(llmsTxt).toContain('# Test Site');
      expect(llmsTxt).toContain('> A test website for AI crawlers');
      expect(llmsTxt).toContain('Site: https://test.com');
      expect(llmsTxt).toContain('## About');
    });

    it('should include contact email when provided', () => {
      const llmsTxt = generateLlmsTxt({
        siteUrl: 'https://test.com',
        siteName: 'Test Site',
        description: 'A test website',
        contactEmail: 'contact@test.com',
      });

      expect(llmsTxt).toContain('Contact: contact@test.com');
    });

    it('should include preferred model when provided', () => {
      const llmsTxt = generateLlmsTxt({
        siteUrl: 'https://test.com',
        siteName: 'Test Site',
        description: 'A test website',
        preferredModel: 'claude-3-opus',
      });

      expect(llmsTxt).toContain('Preferred Model: claude-3-opus');
    });

    it('should include additional context when provided', () => {
      const llmsTxt = generateLlmsTxt({
        siteUrl: 'https://test.com',
        siteName: 'Test Site',
        description: 'A test website',
        additionalContext: 'This site specializes in AI-optimized content for large language models.',
      });

      expect(llmsTxt).toContain('This site specializes in AI-optimized content');
    });

    it('should format all fields correctly', () => {
      const llmsTxt = generateLlmsTxt({
        siteUrl: 'https://example.com',
        siteName: 'Example Site',
        description: 'Example description',
        contactEmail: 'info@example.com',
        preferredModel: 'gpt-4',
        additionalContext: 'Additional information about the site.',
      });

      const lines = llmsTxt.split('\n');

      expect(lines[0]).toBe('# Example Site');
      expect(lines[2]).toBe('> Example description');
      expect(lines[4]).toBe('Site: https://example.com');
      expect(lines[5]).toBe('Contact: info@example.com');
      expect(lines[6]).toBe('Preferred Model: gpt-4');
    });
  });
});
