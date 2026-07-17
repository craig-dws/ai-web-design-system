# 18. Novamira: A Decisive Recommendation

Status: v0.1 | Date: 14 July 2026 | Owner: Dev Lead | Decision type: adopt with strict constraints

## The decision

Adopt Novamira for the pilot, on staging only, free core edition to start, wrapped in the guardrails below. Do not put it near a production client site. Re-evaluate at pilot close before committing to Novamira Pro or to Novamira as a standing agency dependency.

This is a qualified yes, not an endorsement to build the agency's future on it today.

## Why yes

1. **It is the only tool that does the job**. No other WordPress MCP server offers comparable depth into a builder like Breakdance. The realistic alternatives (the WordPress native AI Client, InstaMCP) are either outbound-only content generation or generic core toolsets. If we want an agent that can meaningfully manipulate a Breakdance staging site, Novamira is the option that exists.
2. **It is real and from a credible vendor**. Free, open-source core (GitHub use-novamira/novamira) from Ovation S.r.l., the established team behind Dynamic Content for Elementor. Not an anonymous script.
3. **The setup is genuinely low-friction**. Enable AI Abilities, generate an Application Password, paste the setup prompt into Claude Code, and the agent configures itself.
4. The Pro Breakdance specialization is the exact capability we would want if the pilot proves the write path (templates, element tree, design tokens, conditions, popups), and Pro adds persistent memory that reduces token cost across sessions.
5. **It has real safety features**: domain-locking that goes dormant after a clone, and a URL safe-mode kill-switch. (A frequently cited 30-second execution limit is unverified against the vendor's own docs; do not rely on it as a control.)

## Why constrained

1. **It is very young**. Stable v1.0 shipped around March to April 2026. As of July 2026 that is roughly three to four months of production history, on a bi-weekly release cadence, with the security model still being tightened (a v1.9.0 fix hardening write-file against base64 and binary payloads shows gaps are still being found and closed). This is not a battle-tested dependency.
2. **The sandbox is not a security boundary**. The vendor says so plainly. `execute-php` runs with full plugin privileges over the database and filesystem. A hallucinated or badly-scoped command could truncate data or delete core directories.
3. **Crash recovery does not roll back**. It disables a fatal file so the site stays up, but whatever database or state change already happened is not undone. Our own backups are the real safety net.
4. **Access control is all-or-nothing**. One admin-only toggle grants full PHP execution to whatever AI client is connected. There is no granular multi-operator model, which is a poor fit for an agency without our own process wrapper.
5. **Dev and staging only is policy, not enforcement**. Nothing in the plugin stops production use. The discipline has to come from us.
6. It runs against the grain of where WordPress core is going, and that path is now more concrete than it was. WordPress has its own governed AI path: the Abilities API in core since 6.9, the AI Client and Connectors in 7.0, and WordPress/mcp-adapter as the canonical, permission-gated bridge from abilities to MCP. The older Automattic/wordpress-mcp was archived in January 2026 in favour of it. Novamira is deliberately the opposite approach, raw primitives rather than declared abilities. If the core path becomes the de facto standard, Novamira could become a strategic dead end. This is a watch item, not a reason to avoid it now, but it is a firmer fork than v0.1's first draft implied.

## The guardrails (mandatory conditions of adoption)

These are the non-negotiable conditions under which we use Novamira. They are also reflected in the governance spec (12, section 8) and the runbook (19).

1. **Staging only**. Never install or enable Novamira on a production site. Production carries no MCP server.
2. Only the Dev Lead may enable or re-confirm AI Abilities.
3. Pre-execution backup before every agent run that can write to the database. Keep the previous Breakdance global settings export and the previous `_breakdance_data` postmeta value.
4. **No blind imports**. `wp breakdance import_settings` runs only as a reviewed differential merge.
5. Permission deny rules and hooks protect wp-config.php, wp-settings.php, and production paths; a PreToolUse hook scans for dangerous PHP before any write (see 09).
6. Keep the URL safe-mode kill-switch documented and to hand for every staging site.
7. Re-confirm abilities manually after any environment clone (domain-locking will force this; do not automate it).
8. Log every meaningful Novamira intervention in the decisions and failures log (21) so v0.2 is evidence-based.

## Free vs Pro

Start on free core. Its eight abilities plus WP-CLI are enough to prove the pilot's read-and-scaffold path and to test a supervised write. Move to Novamira Pro (from EUR 49 per year Personal, EUR 129 per year Agency) only if the pilot shows the Breakdance specialization and persistent memory materially improve build reliability. That is a v0.2 decision, made against the scorecard (11), not now.

## Sequencing note: prove the front-half first

A sharper, lower-risk sequencing than "adopt Novamira from pilot one": run the first pilot with no Novamira at all. The value of this whole system lives in the design and token front-half (Figma to tokens to Breakdance Global Settings via a reviewed export and import differential merge) and in scaffolding, not in an agent writing `_breakdance_data`, which is the least supported and highest blast-radius operation in the stack. Prove that front-half against the baseline (20) and the scorecard (11), then introduce Novamira's write automation in a second pilot where its incremental value and risk can be isolated cleanly. This does not change the decision to adopt Novamira; it changes when its riskiest capability is switched on. Note also that this back-half concern is specific to Breakdance: the Astro plus Payload build target (see 08b) has no equivalent WordPress write-automation risk, because its front-end is code the developer owns and Payload content is authored through a governed admin API.

## Alternatives to Novamira (and when they win)

Novamira is not the only way to let an agent work on WordPress. It is the most powerful and the least safe. The alternatives trade raw power for a governed, auditable surface.

| Alternative | What it is | How it compares to Novamira |
|-------------|------------|-----------------------------|
| WordPress mcp-adapter | The official WordPress bridge from the Abilities API to MCP; permission-gated, schema-validated | The credible production-safe path. No raw PHP, file, or database execution. The agent can only do what has been explicitly registered as an ability. Younger as an MCP surface, less builder depth |
| WordPress 7.0 AI Client plus Abilities API | Native core AI: outbound prompts (wp_ai_client_prompt) plus registered abilities; mcp-adapter sits on top | The long-term sanctioned direction. Best for governed content generation and curated actions, not for deep Breakdance layout manipulation |
| InstaWP InstaMCP | A REST plus Application Password MCP bridge, one-toggle on InstaWP hosting | Much safer blast radius (REST-bounded, no PHP or DB execution) and agency-friendly across many sites, but cannot do what Novamira does inside a builder |
| Community WP MCP servers | Various REST or JSON-RPC servers (posts, media, WooCommerce, Elementor) | Mostly hobby-grade and unaudited. Treat as prototypes, not dependencies |

The single most important alternative is architectural, not another plugin: the Astro plus Payload build target (08b) removes the need for Novamira entirely. There is no raw-PHP execution surface, the front-end is version-controlled code, and content is authored through Payload's governed admin API. If the governance and safety concerns around Novamira weigh heavily for a given client, choosing Target B is the cleanest way to sidestep them.

Recommendation: use Novamira only for the Breakdance target, staging only, as set out above. Where a governed WordPress path is preferred, adopt mcp-adapter (built on the Abilities API). Where safety and performance lead, prefer the Astro plus Payload target, which needs no WordPress MCP bridge at all.

## What would change this recommendation

- If the pilot shows the write path is too unreliable to supervise economically, we downgrade Novamira to a research tool only and lean on the mature read pipeline plus manual Breakdance building.
- If WordPress core's native AI tooling reaches builder-level capability, we re-run this comparison and likely migrate.
- If a Novamira security incident emerges in the wild, we suspend use pending review.
