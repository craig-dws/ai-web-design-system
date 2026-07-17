# 01. Current State Findings and Claims Requiring Verification

Status: v0.1 | Date: 14 July 2026 | Owner: Dev Lead | Type: internal R&D

This document records what we currently believe to be true about the proposed AI web design stack, separates confirmed fact from unconfirmed or corrected claims, and lists what still needs first-hand verification on our own hardware before we rely on any of it. It is the evidence base for the rest of the system. Every downstream document inherits the corrections recorded here, not the raw source research in docs/research/web-design.

## How to read this document

Each claim carries a verdict:

- **Confirmed**. Verified against an authoritative or vendor source in July 2026.
- **Corrected**. The original research was wrong or imprecise; the corrected statement is given.
- **Unconfirmed**. Plausible but not verifiable from public sources; must be proven in our own environment.
- **Contradicted**. The original research is materially wrong.

The two source files (AI Web Design System.md and AI Website design.md) were written as confident mid-2026 directives. Much of the strategy is sound. A meaningful minority of the technical specifics were imprecise, mislabelled, or stated as settled when they are early-stage. Treat the source research as a strong first draft, not ground truth.

## A. Confirmed findings (safe to build on)

1. **The core toolchain exists and is real**: Claude Code (local orchestration), the Figma MCP server (design ingestion), Breakdance Pro (WordPress visual builder), and Novamira (WordPress MCP server plugin). None of these are vapourware.
2. Claude Code installs the official Figma plugin with `claude plugin install figma@claude-plugins-official`, then `/plugin`, the Installed tab, and an OAuth browser flow. This is the correct current method.
3. **Figma offers two MCP server architectures**. The remote server (https://mcp.figma.com/mcp) is the recommended default, needs no desktop app, and carries the broadest tool set including the write and canvas tools. The desktop server runs locally, is selection based, and requires a Dev or Full seat on a paid plan.
4. Breakdance stores builder content as structured JSON in the `_breakdance_data` postmeta on each post. It does not use raw PHP template files. An AI agent that writes a PHP template into a sandbox will be ignored by Breakdance.
5. **Breakdance exposes real WP-CLI commands**: `status`, `clear_cache`, `export_settings`, `import_settings`, `replace_url`, `total_reset`, and others. `export_settings` and `import_settings` are Pro (self hosted) mode only. `total_reset` is destructive.
6. Breakdance Client Mode restricts clients to editing text, swapping images, updating links, and adding content inside existing elements. Clients cannot add, delete, or rearrange elements, or change global settings.
7. Novamira is a genuine, free (AGPL-3.0), open-source WordPress plugin (GitHub use-novamira/novamira) from Ovation S.r.l., the team behind Dynamic Content for Elementor. It registers eight confirmed core abilities on activation: Execute PHP, Read File, Write File, Edit File, Delete File, Disable File, Enable File, and List Directory (one PHP-execution ability plus seven filesystem abilities). "Create Upload Link" appears on marketing pages but is not confirmed as a distinct free ability; treat it as unconfirmed. The current release is 1.9.0 (8 July 2026); stable v1.0 shipped on 10 March 2026.
8. **Novamira setup is**: install and activate, enable AI Abilities in Configuration, generate a WordPress Application Password, then paste Novamira's setup prompt into Claude Code so the agent writes its own MCP configuration.
9. WordPress 7.0 ("Armstrong") shipped on 20 May 2026 and is the current stable release. It includes the AI Client in core (entry point `wp_ai_client_prompt()`, with a Settings then Connectors screen for keys and OAuth).
10. WordPress Application Passwords require HTTPS. The only override is `define('WP_ENVIRONMENT_TYPE','local')` in wp-config.php, and the value must be exactly `local`.
11. **InstaWP and InstaMCP 1.1 are real**. InstaMCP connects 13 AI clients via a single toggle. The InstaWP CLI uses WordPress Playground (WASM PHP plus SQLite) for local sites without Docker or MySQL.
12. "Claude Design" is a real, named Anthropic product, launched 17 April 2026 as an Anthropic Labs research preview (powered by Claude Opus 4.7), available on Pro, Max, Team, and Enterprise plans. It is a standalone visual-creation canvas that produces designs, prototypes, slides, and code-powered prototypes, and can hand a design bundle to Claude Code for implementation. It is a separate surface from the Figma MCP integration. This matters because our documents have used "Claude Design" loosely: there are now three distinct surfaces that phrase could mean, and each stage of our workflow must say which one it means. See the note in section B.

## B. Corrected claims (source research was wrong or imprecise)

| Topic | Original claim | Correction |
|-------|----------------|------------|
| Figma write-back tool | `generate_figma_design` writes generated UI back to the canvas | `generate_figma_design` is the code-to-canvas tool (turns rendered UI into flat Figma frames). The real general write-back tool is `use_figma`. **Correction, 17 July 2026:** we then asserted it had a 20kB per-call cap and no image support. Both were wrong by the time we wrote them. Current capabilities live in 26, the capability matrix, dated and sourced. This row is why 26 exists |
| WordPress AI naming | "WordPress 7.0 finalised the Abilities API"; "WordPress AI Client API" | The PHP Abilities API shipped in WordPress 6.9 (Dec 2025); the client-side half shipped in 7.0. It is not "finalised" (a further core expansion is only a 7.1 proposal). The outbound feature is called the "AI Client", not the "AI Client API" |
| Novamira and Abilities API | Novamira registers primitives with the WordPress Abilities API | Novamira does not build on the native Abilities API. It is the philosophical opposite: raw PHP, file, and database primitives rather than declared, schema'd abilities. The two can co-exist but are not integrated |
| Breakdance AI | Breakdance AI is a built-in feature | Breakdance AI is a separate paid add-on plugin (needs Breakdance 2.0+ and its own licence) and requires PHP 8.1+, while Breakdance core needs PHP 7.4+ |
| PHP version | PHP 8.4 recommended for Breakdance 2.8 | Breakdance 2.8 (25 June 2026) adds PHP 8.4 support, but 8.3 remains the recommended version |
| Breakdance elements | "Container" element; "Auto Layout" | The element is called Div, not Container. The feature is the Layout Engine (Vertical, Horizontal, Grid modes), not a branded Auto Layout. Post Loop Builder is the precise element name |
| Novamira specializations | 30 builder specializations including Breakdance node trees, custom post types, global settings | 30 specializations across builders, themes, forms, fields, SEO, and WooCommerce (not all builders). The Breakdance specialization covers templates, element tree, design tokens, conditions, and popups |
| Novamira sandbox | The sandbox is a safety mechanism | The vendor states the sandbox is not a security boundary. `execute-php` runs with full plugin privileges over `$wpdb`, all loaded plugins, and the PHP runtime; filesystem writes are sandbox-restricted but the runtime is not. Crash recovery soft-disables a fatal file but does not roll back state changes already made |
| Novamira 30-second execution limit | Stated as a fact in the source research | Unverified. The 30-second limit appears in third-party summaries but is not in Novamira's official docs or changelog. Do not assert it. The confirmed safety features are domain-locking after a clone and a URL safe-mode kill-switch |
| create_design_system_rules | Listed as a Figma MCP tool the model invokes | It is a Figma Agent Skill (`figma-create-design-system-rules`), not an MCP write tool. It does not appear in the MCP tool list. Treat it as project guidance the skill generates, not a callable tool |
| "Claude Design" | Used loosely to mean "Claude helping with design" | "Claude Design" is now a specific Anthropic product (see A.12). Three surfaces share the phrase: (a) the Claude Design product, (b) Claude Code plus the Figma MCP, (c) Claude artifacts. Every workflow step must name which one it means |

## C. Unconfirmed claims (prove in our own environment before relying on them)

1. The exact Breakdance custom post type slugs (for example breakdance_template, breakdance_header). Confirm with `wp post-type list` on a live install before hardcoding anything.
2. Novamira's exact registered ability identifiers and whether they use a `novamira/` namespace. Capability names are confirmed; the exact machine IDs are not published. Check against the installed plugin.
3. The claim that an AI agent can reliably build a full Breakdance page by writing `_breakdance_data` JSON. There is no REST API for creating layouts. Writing full layout JSON from scratch is moderate-to-high risk because Breakdance performs client-side validation, ID generation, and dependency resolution that a script will not replicate. We must test how far this actually gets before we design a pipeline around it.
4. **The "64-character token" detail for InstaMCP**. Not found in InstaWP documentation. Do not assert it.
5. **The end-to-end fidelity of Figma to Breakdance generation**. The read pipeline (get_design_context, get_variable_defs, get_screenshot) is mature. The write path into Breakdance is the weak link and must be measured on a real page.
6. Combined server requirements for Breakdance plus an MCP plugin under concurrent AI load. Our figures are an engineering estimate, not a single cited spec (see 17_server_requirements.md).

## D. Material risks surfaced by the research

1. **Novamira is very young**. Stable v1.0 shipped around March to April 2026. As of July 2026 it has roughly three to four months of production history, a bi-weekly release cadence, and a security model still being hardened (a v1.9.0 fix rejecting base64 or binary payloads in write-file shows gaps are still being closed). It is credible but early-stage. Do not treat it as a hardened production dependency.
2. **Novamira access control is all-or-nothing**. A single admin-only toggle exposes full PHP execution to whichever AI client is connected. This is weak for a multi-operator agency.
3. **Breakdance has no supported programmatic layout-creation API**. Any "AI builds the page" workflow is inherently unsupported and may break on Breakdance updates.
4. Figma canvas write-back (use_figma) is beta, remote-only, and capped. Do not build a production "AI writes into our Figma library" workflow yet.
5. WordPress core is moving toward its own governed AI path, and it hardened faster than the source research implied. The Abilities API shipped in core in 6.9 (Dec 2025); WordPress/mcp-adapter is now the canonical bridge from those abilities to MCP (permission-gated, schema-validated, no arbitrary PHP), and the older Automattic/wordpress-mcp was archived on 19 January 2026. Novamira is the deliberate opposite approach (raw PHP and filesystem primitives). If the core path becomes the de facto agency standard, Novamira could become a strategic dead end. This is a genuine fork to watch, not merely a footnote.
6. Security plugins (Patchstack, Solid Security, Wordfence) can block the Application Password generation that both Novamira and the WordPress REST MCP path depend on.

## E. Verification actions before the pilot

These must be completed and recorded before Phase 3 of the pilot (AI generating anything on the staging site). See 10_pilot_implementation_plan.md.

1. Stand up one staging site and confirm Breakdance CPT slugs and Novamira ability IDs first-hand.
2. Run a controlled test of `use_figma` on a duplicate Figma file and record output quality and limits.
3. Run a controlled test of AI-generated Breakdance global settings via differential merge, then measure how much of a single page the agent can build safely.
4. Confirm the Application Password flow works on our security stack, or document the exception.
5. Record baseline metrics from recent projects (see 20_baseline_measurement.md) so the pilot has something to compare against.

## Sources

Verification was performed on 14 July 2026 against: Figma developer docs and help centre; Anthropic and Claude Code documentation; novamira.ai (site, docs, security, changelog) and independent reviews; breakdance.com documentation and release notes; make.wordpress.org and developer.wordpress.org; instawp.com. Full source URLs are held in the verification briefs that produced this document.
