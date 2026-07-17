# 16. Plugin Recommendation Matrix

Status: v0.1 | Date: 14 July 2026 | Owner: Dev Lead

The recommended WordPress plugin stack for an AI-assisted Breakdance build. Kept deliberately lean: each plugin earns its place, and fewer plugins means fewer surfaces for an AI agent to break and fewer conflicts with the Application Password and MCP flow.

Recommendations are given as a primary pick and an alternative. Confirm current licensing and compatibility with the client's hosting before committing on any given project.

## Core build stack

| Role | Primary pick | Alternative | Notes |
|------|--------------|-------------|-------|
| Visual builder | Breakdance Pro | Bricks | Breakdance chosen for Client Mode, WP-CLI, and Global Settings import/export; Novamira has a Breakdance specialization |
| WP MCP bridge | Novamira (staging only) | InstaMCP | Staging only; see 18. InstaMCP if we adopt InstaWP hosting |
| Design tokens | Breakdance Global Settings | none needed | Global Settings JSON is the token layer; no extra plugin |

## Supporting stack

| Role | Primary pick | Alternative | Notes |
|------|--------------|-------------|-------|
| Forms | Fluent Forms | WS Form | Both integrate with Breakdance; Novamira has form specializations |
| SEO | The SEO Framework | Rank Math | Lightweight, no upsell noise; Rank Math if the client wants schema depth |
| Caching and performance | WP Rocket | FlyingPress | Server-level caching preferred where available; pair with Breakdance clear_cache |
| Security | Solid Security or Wordfence | Patchstack | See warning below: these can block Application Passwords |
| Backup | UpdraftPlus | Jetpack VaultPress Backup | Pre-execution backups are mandatory before AI writes |
| Staging and migration | WP Migrate or host staging | InstaWP | InstaWP adds Playground-based local dev if adopted |
| Custom fields | ACF | Meta Box | Only if the project needs custom data; Novamira has field specializations |

## Optional and evaluate-later

| Role | Option | Decision |
|------|--------|----------|
| Native AI content | WordPress AI Client (core 7.0) plus a provider connector | Evaluate for v0.2; the governed core path for content generation |
| Breakdance AI | Breakdance AI add-on | Separate paid plugin, needs PHP 8.1+; evaluate only if in-builder AI editing proves useful |

## Important interactions and warnings

1. **Security plugins can break setup**. Patchstack, Solid Security, and Wordfence have been reported to block WordPress Application Password generation, which both Novamira and the WordPress REST MCP path depend on. On a staging site, be ready to whitelist the Application Password flow or temporarily relax the relevant rule, and record it as an exception.
2. **Fewer plugins is safer with an autonomous agent**. Every active plugin loads into the same PHP runtime that Novamira's execute-php can reach. Keep staging lean.
3. **Caching hides AI changes**. AI agents write directly to the database and do not trigger dashboard cache hooks. Always finish an agent write sequence with `wp breakdance clear_cache` and, if a page cache plugin is active, purge it too.
4. **Backup before every agent run**. This is the real rollback mechanism, because Novamira crash recovery does not undo state changes.
5. **Confirm Breakdance mode**. `export_settings` and `import_settings` are Pro (self hosted) mode only. Confirm licensing before scripting any token sync.

## Minimum viable set for the pilot

For the low-risk pilot, install only: Breakdance Pro, Novamira (free, staging), Fluent Forms, The SEO Framework, a caching plugin, a security plugin (with the Application Password exception handled), and UpdraftPlus. Add anything else only when a specific requirement demands it.
