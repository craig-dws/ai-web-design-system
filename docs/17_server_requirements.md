# 17. Server Requirements

Status: v0.1 | Date: 14 July 2026 | Owner: Dev Lead

Requirements for the staging and production environments of both build targets. Target A is WordPress with Breakdance, using Breakdance 3.0's native MCP as the primary write bridge (Novamira only as fallback if the native path fails the write test, see 27). Target B is Astro with a Payload CMS backend. The Breakdance figures are an engineering estimate synthesised from Breakdance's own recommendations and the WordPress 7.0 baseline. They are not a single vendor-cited spec sheet. Confirm against the client's actual hosting. Sections below are split by target.

# Target A: WordPress plus Breakdance

## Staging environment (where the AI pipeline runs)

| Requirement | Recommended | Minimum | Rationale |
|-------------|-------------|---------|-----------|
| WordPress | 7.0+ | 6.9 | Novamira needs 6.9+; 7.0 is current stable |
| PHP | 8.3 | 8.1 | 8.3 recommended for Breakdance; 8.1 is the floor if Breakdance AI is used |
| Database | MariaDB 10.11+ or MySQL 8.0+ | as WP baseline | WordPress 7.0 baseline |
| Memory limit | 512M | 256M | Builder plus AI and MCP calls both consume memory |
| Max execution time | 120s | 60s | LLM round-trips and execute-php can exceed the 30s default |
| HTTPS | Mandatory | Mandatory | Application Passwords require it; WordPress 7.0 baseline |
| CPU | Dual core or better | Dual core | Breakdance recommendation |

## Non-negotiable settings

1. HTTPS on every environment. Application Passwords will not generate over HTTP. The only exception is a genuine local box with `define('WP_ENVIRONMENT_TYPE','local')` in wp-config.php, and the value must be exactly `local` (not `development`).
2. Server-level caching plus Brotli or Gzip compression, per Breakdance's own guidance. Remember AI writes bypass cache hooks, so pair with `wp breakdance clear_cache`.
3. **WP-CLI available on the staging host**. The safe automation channel (status, clear_cache, export_settings, import_settings) depends on it.
4. **Automated or on-demand backups before agent runs**. This is the rollback mechanism.

## Production environment (no AI pipeline)

Production runs Breakdance and Client Mode only. It carries no MCP server and no Novamira. Standard hardened WordPress hosting: PHP 8.3, HTTPS, managed backups, a security plugin, and server-level caching. The same PHP and database baselines apply so that a staging-to-production promotion behaves consistently.

## Two provisioning routes

1. **Traditional managed WordPress hosting**. Provision a staging subdomain per client (for example staging-clientname.agency.com), install Breakdance Pro (its native 3.0 MCP is the primary write bridge; add Novamira only as fallback if the native path fails the write test), and follow the runbook (19).
2. **InstaWP (optional, evaluate for v0.2)**. Provides rapid staging provisioning and InstaMCP. The InstaWP CLI can also spin up local disposable sites via WordPress Playground (WASM PHP plus SQLite) with no Docker or MySQL, which is useful for throwaway experiments. Not part of the v0.1 minimum.

# Target B: Astro plus Payload

Target B is a split deployment: a static Astro front-end and a separate, always-on Payload backend. This is a different shape from WordPress, where a single host does everything. Novamira does not apply to this target.

## Astro front-end (static)

| Requirement | Recommended | Notes |
|-------------|-------------|-------|
| Output | Static HTML/CSS/JS | Astro SSG; content baked at build time |
| Host | Any static host or CDN | Your own Nginx, Netlify, Vercel, or S3 plus CloudFront |
| Runtime | None at serve time | Stateless; no server process to run for the front-end |
| Build runner | Node 20.9+ with pnpm | Used at build time only, to run Astro and fetch from Payload |

## Payload backend (persistent Node service)

| Requirement | Recommended | Minimum | Rationale |
|-------------|-------------|---------|-----------|
| Node.js | 20.x LTS | 20.9.0 | Payload 3.x floor is 20.9.0 |
| Database | PostgreSQL 15+ or MongoDB 7+ | as adapter supports | Payload persists content here; pick one and standardise |
| Memory | 1GB+ for the Node service | 512M | Node plus the admin build; separate from the DB host |
| File storage | S3-compatible or local disk plus CDN | local disk | Media uploads; a CDN in front for delivery |
| Email provider | Any SMTP or transactional API | required for auth flows | Password resets, admin invites |
| HTTPS | Mandatory | Mandatory | Admin auth and API over TLS |

## Non-negotiable settings (Target B)

1. **Do not architect around Payload Cloud**. The first-party managed host paused new sign-ups after the Figma acquisition. Self-host the Node service plus database (Railway, DigitalOcean, AWS, or your own VPS).
2. **Publish triggers a rebuild**. A static Astro site freezes content at build time, so a client edit in Payload must fire a rebuild-and-redeploy webhook, or the affected sections must use Astro on-demand rendering. Decide this per client and document it.
3. Back up the Payload database on the same discipline as any content store: scheduled, off-site, and restore-tested.
4. **In local development, reassign a port**: Astro and Payload both default to 4321.
5. Keep Payload and Astro as separate packages, or exclude Payload's server code from Vite dependency optimisation, so a shared monorepo build does not break on path aliases.

## Capacity note (Target B)

The Payload backend is an always-on service with an ongoing hosting cost and an operations surface that the WordPress target does not have on top of its single host. Size the Node service and database for the editorial load (a handful of concurrent editors is light), not for public traffic, since public traffic hits the static Astro front-end, not Payload. Revisit if you add Astro on-demand rendering that queries Payload at request time.

# Shared operator notes

## Windows operator note

The hook scripts in this system (see 09) are bash scripts. Operators on a Windows workstation need Git Bash or WSL for those hooks to run. The WordPress staging server itself is Linux regardless. This is a workstation requirement, not a server one.

## Capacity note

These figures cover a single low-traffic staging site with one operator running one Claude Code session at a time. Run one AI session per site at a time; concurrent agents writing to the same Breakdance database risk conflicting writes. If the agency scales to many simultaneous AI builds, revisit memory and execution limits and consider container isolation per site.
