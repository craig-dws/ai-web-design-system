# AI Web Design System v0.1: Breakdance and WordPress Plugin Stack

Internal reference. This document covers how Breakdance stores content, the real WP-CLI commands, Client Mode, the Breakdance AI add-on, the recommended plugin stack, and the ranked, safe ways an AI agent may interact with Breakdance.

Companion documents:

- `04_developer_workflow.md` (developer workflow, including the hard rule on writes)
- `07_figma_mcp_setup_and_handoff_contract.md` (design handoff)

## How Breakdance stores content

1. Breakdance stores layouts as structured JSON in the `_breakdance_data` postmeta on each post or page. It is data, not hand-written PHP.
2. The main content types are Templates, Headers, Footers, and Global Blocks. Global Blocks are reusable regions edited in one place and reflected everywhere they appear.
3. **Do not hardcode custom post type slugs**. Confirm the real slugs on the site first with `wp post-type list`. Slugs vary between sites and assuming them causes silent failures.

Because the layout is structured data keyed to specific postmeta, any careless overwrite can destroy a page's layout. Treat every write with the caution set out in the developer workflow hard rule.

## The real WP-CLI commands

| Command | Purpose | Notes |
|---------|---------|-------|
| `wp breakdance status` | Report Breakdance status | Safe, read-only. |
| `wp breakdance clear_cache` | Clear the Breakdance cache | Run after any database write. |
| `wp breakdance export_settings` | Export Global Settings | Pro only. The safe way to capture the token layer. |
| `wp breakdance import_settings` | Import Global Settings | Pro only. Overwrites the whole config. Never run blindly; do a differential merge. |
| `wp breakdance replace_url` | Replace URLs across Breakdance data | Use for environment URL changes instead of a blind search and replace. |
| `wp breakdance total_reset` | Reset Breakdance | DESTRUCTIVE. Human-gated only. Never run from automation. |

## Global Settings import and export as the safe token layer

Global Settings hold the design tokens (colours, typography, spacing, effects). Export and import of these settings (Pro only) is the safe, intended way to move the token layer between environments or to apply a designer's token set.

The rule is still a differential merge. Read the current settings, change only the intended values, review the result, then write back. A full blind import overwrites everything.

## Client Mode capabilities and limits

Client Mode restricts what a client can do in the builder so they cannot break the layout.

- **Purpose**: let clients safely edit content without touching structure.
- **Intended scope**: editing text, images, and links.
- **Limit**: clients should not be able to alter layout, structure, or global design decisions.

Design and build with this in mind. Structure content so every routine client edit falls within text, images, and links, and never requires a structural change.

## Breakdance AI add-on

- **Breakdance AI is a separate, paid add-on**. It is not part of core Breakdance.
- Breakdance AI requires PHP 8.1 or later.
- Breakdance core requires PHP 7.4 or later, with PHP 8.3 recommended.
- Version 2.8 (released 25 June 2026) adds PHP 8.4 support, but PHP 8.3 remains the recommended version.

Plan hosting PHP versions accordingly. If the Breakdance AI add-on is in use, the environment must be on PHP 8.1 or later.

## Recommended plugin stack

| Role | Recommended | Notes |
|------|-------------|-------|
| Builder | Breakdance Pro | Required for Global Settings import and export and for the full element set. The core of the build. |
| Forms | A dedicated forms plugin | Use one forms solution consistently across projects; capture submissions reliably and confirm spam protection. |
| SEO | A dedicated SEO plugin | Titles, metas, sitemaps, and schema. Keep configuration consistent with the SEO team's standards. |
| Caching and performance | A caching and performance plugin | Page cache, asset optimisation. Always run `wp breakdance clear_cache` after builder changes so cached output is fresh. |
| Security | A security plugin | Firewall, login protection, malware scanning. |
| Backup | A backup plugin | Scheduled off-site backups of files and database. Confirm restores actually work. |
| Staging | A staging solution | Build and test on staging, then deploy to production. Never build directly on production. |

Choose one product per role and use it consistently across projects so the team builds and maintains a predictable stack.

## The five ways an AI agent can target Breakdance, ranked by safety

Ranked safest first. Prefer the highest-ranked method that can do the job.

### 1. WP-CLI settings and cache (safest)

Use `wp breakdance status`, `wp breakdance clear_cache`, and the Pro settings export and import (as a differential merge). These are the supported, predictable commands.

Caveat: `import_settings` still overwrites the whole config, so only ever apply it as a reviewed differential merge, never blind.

### 2. Global Settings JSON import and export

Move the token layer via exported and imported Global Settings JSON.

Caveat: same differential-merge rule. Read, change only intended values, review, write back. Clear the cache afterwards.

### 3. Constrained JSON-patch on known-good Global Blocks or templates

Apply a narrow, validated patch to specific values within a known-good structure (a Global Block or template that already works).

Caveat: only patch values, never restructure. Validate the structure before and after. Back up `_breakdance_data` first. Human-reviewed.

### 4. Builder-UI browser automation

Drive the Breakdance builder interface through browser automation to build or change layouts.

Caveat: slower and more fragile than data methods, but it goes through the supported UI so it respects the builder's own validation. Human-reviewed, and take a backup before running.

### 5. Raw `_breakdance_data` writes (last resort)

Write directly to the `_breakdance_data` postmeta.

Caveat: highest risk. A malformed write destroys the layout. Use only when nothing above can do the job, always after backing up the postmeta, always human-reviewed, and always followed by `wp breakdance clear_cache`.

Note on why these are the options: Breakdance has NO REST API for creating layouts. That is why layout automation reduces to constrained JSON-patch on known-good templates (method 3) or builder-UI browser automation (method 4), both human-reviewed. There is no supported programmatic layout-creation endpoint to lean on.

## Watch-outs

1. **Breakdance has no REST API for creating layouts**. Do not design an automation that assumes one.
2. `import_settings` overwrites the whole config. Only ever apply it as a reviewed differential merge.
3. `total_reset` is destructive and human-gated. Never call it from automation.
4. Always back up `_breakdance_data` postmeta before any database write that touches layout data.
5. Always run `wp breakdance clear_cache` after any database write.
6. **Never hardcode custom post type slugs**. Confirm them with `wp post-type list` first.
7. **Never write raw PHP layout files**. Breakdance layouts are structured data, not PHP.
8. **Settings import and export are Pro only**. Confirm the licence before relying on them.
9. Breakdance AI is a separate paid add-on and needs PHP 8.1 or later; core needs PHP 7.4 or later with 8.3 recommended.
10. Use `wp breakdance replace_url` for environment URL changes, not a blind database search and replace.
11. Build and test on staging, never directly on production.
