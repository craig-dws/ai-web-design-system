# 24. Open Questions Answered, with Decisions

Status: v0.2 | Date: 15 July 2026 | Owner: Dev Lead | Type: internal R&D decisions

Answers to the open question set, each with a decision and a confidence note. Facts were verified against live sources on 15 July 2026. Where a claim could not be verified, it says so.

**Read the three headline findings first.** They change decisions already made in this system.

## Headline findings

1. **Bricks now has first-party AI tooling and Breakdance does not.** Bricks 2.4 (beta, 15 July 2026) ships a native MCP and Abilities layer explicitly targeting Claude Code, plus a published JSON schema written for AI tools to read and write Bricks content. Breakdance has no equivalent. This is a genuine fork in the road for Target A.
2. **Rank Math ships an official MCP server**, built on the WordPress mcp-adapter, with documented Claude Code setup. That settles the SEO plugin question and validates mcp-adapter as the strategic direction.
3. **Claude Cowork is real and is the answer for the non-technical designer.** It is the agentic Claude with no terminal, and it hosts Anthropic's official Design skills. Claude Design, by contrast, has no native Figma export, which changes the assumed designer flow.

---

## Section A: Novamira

### Which is better, Novamira or the alternatives

**Decision: use WordPress mcp-adapter as the strategic default, and keep Novamira as a staging-only power tool for the gaps.** Novamira is not "better" or "worse", it is a different risk profile.

| Option | What it is | Verdict |
|--------|-----------|---------|
| WordPress mcp-adapter plus Automattic mcp-wordpress-remote | Official WP bridge from the core Abilities API to MCP, OAuth 2.1 | **The strategic default.** Backed by the WP core AI team, running in production on WordPress.com, standards-based permissions |
| Novamira | Raw PHP, filesystem, WP-CLI, $wpdb access | **Power tool, staging only.** Nothing else gives this depth. Least production-safe by its own design |
| Invizo MCP | Self-hosted plugin, 143+ scoped abilities | **Not yet.** Fewer than 10 active installs. Good security design on paper, no field testing |
| InstaWP InstaMCP | One-toggle MCP on InstaWP hosting | **Useful for throwaway demos**, not for client builds on our own server |

**The important nuance:** the two are not mutually exclusive and the balance shifts if we adopt Bricks. Bricks 2.4's own Abilities layer plus Rank Math's MCP would cover most of what we would otherwise need Novamira for, on the governed mcp-adapter path. That is the cleanest route to your stated goal of not depending on Novamira.

### What would we need extra memory for

**Answer: Novamira Pro's persistent memory stores project context and solved builder rules across sessions**, so the agent does not re-derive the same Breakdance or Bricks quirks every session, which saves tokens and improves consistency.

**Decision: we do not need it.** We already solve this problem better and for free with version-controlled context: `CLAUDE.md`, the AI context pack (pilot artefact 05), and our skills. Those are reviewable, diffable, and shared across the team. A vendor's opaque memory store is not. Revisit only if the pilot shows the agent repeatedly relearning the same builder rules despite the context pack.

### Do we need Pro to start building sites

**No.** Free core (nine abilities plus WP-CLI) is enough to prove the pilot's read-and-scaffold path and a supervised write. Pro (from EUR 49 per year) buys the builder specialization and memory.

**Decision (SUPERSEDED 17 July 2026): start on free core, do not buy Pro yet.** This was written while Bricks 2.4 was still a live option, on the reasoning that Bricks' own MCP might remove the need for Novamira entirely.

**Current decision: buy Novamira Pro for the write test.** Once Breakdance was chosen (Section C), that reasoning expired. Breakdance has no sanctioned layout path, so the Pro Breakdance specialization is the specific thing that has to be tested, and at EUR 129 per year for 1,000 sites the cost is not a factor worth deliberating over. Buy it, run the 15-minute write test, and let the result decide whether it stays.

---

## Section B: WordPress MCPs

### Are there other MCPs, and what about the two you linked

**Automattic/mcp-wordpress-remote** (github.com/Automattic/mcp-wordpress-remote): **real, actively maintained (v0.3.5, June 2026), and it is part of the answer.** Important correction to a common misreading: it is **not** a WordPress plugin and it does not expose WordPress functionality itself. It is a Node.js **proxy that runs on the developer's machine** and connects Claude Code to a site that has the **mcp-adapter plugin** installed. It supports OAuth 2.1 with PKCE (recommended), JWT, and Application Passwords. It works on self-hosted sites. It replaced the older Automattic/wordpress-mcp, which was archived on 19 January 2026.

So the real pairing is: **mcp-adapter (on the site) plus mcp-wordpress-remote (on the developer machine)**.

**Invizo MCP** (wordpress.org/plugins/invizo-mcp/): **real, updated 14 July 2026, but fewer than 10 active installs.** It exposes 143+ abilities across content, WooCommerce, Elementor/Gutenberg, Rank Math, and more, gated by `manage_options` with per-client revocable Application Passwords, scoped read/write/delete, and dry-run previews. The security design is genuinely good on paper.

**Decision: do not adopt Invizo yet.** A single small vendor with a sub-10 install base has had effectively no community scrutiny. Watch it.

**Others worth knowing:** WP Engine Smart Search AI MCP (hosted, read-only, WP Engine sites only), WordPress Studio (Automattic's local dev app, which is itself an MCP server), community page-builder MCPs for Elementor and Bricks (unofficial, varying quality), and Respira (commercial, multi-builder). And now **Rank Math's own MCP** (see Section E), which is the most relevant to us.

### Will the developer need to install WP locally

**No, not mandatory, but recommended for speed.** You have your own LiteSpeed staging server, which is the more representative environment (real caching, real stack). The trade-off is iteration speed and blast radius.

**Decision: use both, deliberately.**
- **Local (Automattic Studio or LocalWP)** for fast scaffolding and experimentation where nothing is client-visible. Studio is the most agent-native option, since it ships its own MCP server for local environments.
- **Your LiteSpeed staging server** as the representative environment for anything that will be promoted, with a snapshot taken before any agent run.

The reason local matters more with an agent in the loop than it would for a human: an agent executes many operations unattended, faster than you can review them, so a disposable local environment is where mistakes should happen.

### Should we be thinking about webMCP

**Not yet. It solves a different problem than the one you have.**

WebMCP is a **draft W3C Community Group proposal** (not a ratified standard) for a browser API (`navigator.modelContext`) that lets **a website expose tools to an AI agent visiting it in a browser**, so an agent can book a flight or fill a cart without screen-scraping. Chrome opened a public origin trial in Chrome 149 (May 2026). Firefox and Safari timelines are unconfirmed.

**Critically: this is about agents USING a finished site, not about us BUILDING sites.** It has no concept of a CMS admin, PHP, or content authoring. It is not an alternative to mcp-adapter or Novamira.

**Decision: park it as a watch item, not build tooling.** It becomes relevant later as a **client deliverable** ("agentic readiness"), conceptually next to the AI Readiness and GEO work we already do: implementing WebMCP tool registrations on a client's front end so shopping and booking agents can use their site. That is a 2027 service line conversation, not a v0.3 decision.

### Do we need Breakdance AI

**No. Your instinct is right, it is redundant.**

Breakdance AI is a **separate paid add-on** (needs Breakdance 2.0+ and its own licence, PHP 8.1+) and it is a **copywriting assistant only**. It fills existing sections with AI-written text (shorten, expand, formalise). It has no structured API, no MCP, and cannot build layouts.

**Decision: do not buy it.** We generate content in ZilvaEdge, which is far better at it and already carries our quality gates, compliance personas, and brand voice. Breakdance AI would be a worse duplicate of a capability we already have.

---

## Section C: Bricks vs Breakdance (the big decision)

### What is Bricks like, and would it be easier to integrate

**Verdict: yes, materially easier, and for structural reasons rather than taste.** This is the most consequential finding in this round.

| Factor | Bricks | Breakdance |
|--------|--------|-----------|
| First-party AI/MCP | **Bricks 2.4 beta ships native MCP and Abilities**, explicitly naming Claude Code, via a `Bricks > AI` admin screen | **None.** Breakdance AI is copywriting only |
| Data contract | **Published, versioned JSON schema**, documented by the vendor expressly so AI tools can read and write Bricks content without the UI | No published schema. Third parties reverse-engineer `_breakdance_data` |
| Design tokens | **Native.** Global Variables Manager outputs CSS custom properties and is explicitly called a design-token system; plus Style Manager, Global Classes, fluid clamp() scales | Global Settings for colour and type only. Anything token-like needs the third-party BreakColorUI plus manual copy-paste |
| Client editing | **Granular Client Role Manager** with custom capabilities per role | Single fixed Client Mode preset; vendor warns it "does not restrict privileges" |
| Figma tooling | Dedicated Figma-to-Bricks plugin (Fancy Framework), plus cross-builder FigPress | No first-party Figma import |
| Licensing | One-time lifetime from US$599 (unlimited) | Annual only, no lifetime |
| Positioning | Developer and agency oriented, class-first CSS | Batteries-included, faster for non-technical operators |

**Why this matters more than a feature list:** the whole risk in our Target A is that Breakdance has **no supported programmatic layout path**, so any "AI builds the page" work is unsupported reverse-engineering that can break on any update. Bricks removes that risk at the root: the vendor publishes the data contract *and* is building the MCP layer itself. "The vendor tells you the shape of the data" is a categorically different proposition from "a third party inferred it."

It also collapses several of our other problems at once: native design tokens (fixing the weakest link in our Figma-to-Breakdance token sync), and a real permissions model for client editing.

**The caveat, stated honestly:** Bricks 2.4's MCP layer is **beta as of 15 July 2026, not GA**. Adopting today means building on pre-GA functionality. Novamira Pro has a Bricks specialization needing only Bricks 2.3, so there is a stable interim path.

### DECISION (17 July 2026): stay on Breakdance

**Target A is WordPress plus Breakdance. Bricks is not adopted.** Decided by the Dev Lead. This supersedes the Bricks recommendation above, which is retained for the record because the analysis remains valid and may matter again later.

**Why the Bricks case was argued, and why it lost.** The Bricks case above rests on tooling: a published schema and a first-party MCP. The counter-arguments that decided it are operational and stronger:

- **Team familiarity and deliberate prior choice.** The agency migrated from Elementor to Breakdance on purpose, for native completeness. Breakdance is known, working, and licensed.
- **The Bricks case was partly argued against the wrong agency.** Several of the objections raised against Breakdance (CSS literacy, designer fit) do not apply here: the developer builds in flex and grid either way, and the designer never touches the builder at all. Those cancel out rather than favouring Bricks.
- **Switching cost is real and the benefit is speculative.** Bricks 2.4's MCP is beta. Trading a known builder for a beta integration is a poor risk trade.

**What this decision costs us, stated honestly.** Breakdance has **no sanctioned programmatic layout path**. Any agent that builds a Breakdance page is reverse-engineering the `_breakdance_data` postmeta tree via a third party. That risk is now a permanent feature of Target A, and it must be managed rather than wished away. See the Respira finding below, which demonstrates the failure mode concretely.

### The Breakdance layout-write options (Respira and Novamira)

Two third-party MCP servers can write Breakdance layouts. **Both reverse-engineer an undocumented internal format. Neither is sanctioned by Soflyy.**

| | Respira | Novamira Pro |
|---|---|---|
| Approach | Native `_breakdance_data` read and write, schema validation, `_nextNodeId` collision handling, 90-day snapshots, cascade rollback, copy-first approval | Native `_breakdance_data` read and write, Breakdance specialization (templates, element tree, design tokens, conditions, popups) |
| Native-editability claim | Not claimed for Breakdance | **Explicitly claimed**: output saved in Breakdance's native format and stays editable in Breakdance's own UI |
| Single-pass full page build | Claimed (8 layout patterns) | **Explicitly claimed** |
| Independent reviews | **None found** | Four or more independent review sites |
| Distribution | Off WordPress.org; MIT core on GitHub, proprietary licence layer | Free open-source core (AGPL-3.0); Pro is a paid layer |
| Cost at agency scale | From EUR 5.92 per month **per site** | **EUR 129 per year for 1,000 sites** |
| Maker | Solo founder | Ovation S.r.l. (Dynamic Content for Elementor team) |

**The decisive evidence on fragility.** On 25 June 2026, Breakdance 2.8.0 shipped. Within days, **every Respira write operation failed outright** (`Unknown Breakdance element type EssentialElements\Section`), fixed three days later in Respira 7.5.3. Fast response, but it proves the point: a routine builder point release can break the entire layout-write path with no warning. Plan for this to happen again, on both tools.

**A second Respira caution:** its own documentation contradicts itself. The marketing page claims deep native support (84 elements, 120+ schema properties, 8 layout patterns); the technical reference (`/docs/builders/breakdance`) describes four low-level tools and **explicitly advises against rewriting the element tree**, recommending writes be confined to a single managed Code Block. One page is stale and there is no way to tell which from outside.

**Decision: trial Novamira Pro first.** It is far cheaper at agency scale, makes the explicit native-editability claim that matters most, and has independent review coverage. Trial Respira second only if Novamira fails the test. **Do not run both against the same site** (two tools with independent `_nextNodeId` counters writing the same undocumented format is a plausible corruption source).

**The 15-minute test that settles it,** and which must run before Phase 3 of the pilot: on a disposable staging site, have Claude Code build a non-trivial page (multi-section, a Global Block, a header or footer assignment, one design-token change). Then open it in the Breakdance visual builder and check three things: it renders correctly; every element is still natively editable with no "unknown element" errors; and a forced malformed write is caught and rolled back. That test beats any vendor claim.

**Mandatory guardrails for Target A**, given no sanctioned write path:
1. **Snapshot before every agent write.** The vendor's rollback is a convenience; our backup is the actual safety net.
2. **Pin the Breakdance version** on client staging, and treat a Breakdance update as a change that requires re-testing the write path before it touches client work.
3. **Never let the agent write layout on production.** Staging only, promoted by a human.
4. **Keep the layout-write step swappable.** Skills call a capability ("build this page"), never a vendor tool name directly, so Respira, Novamira, or manual build can be substituted without rewriting the system.

---

## Section D: Design system across clients

### How do we adapt the design system so sites look different

**This is already answered in 22_design_system_reuse_model.md and the answer does not change.** One shared agency base kit plus a per-client brand theme. Distinctiveness comes from swapping the **semantic token layer** (colour, typography family, radius, spacing feel) on an unchanging foundation, not from rebuilding primitives.

Concretely: a base Figma collection, then one **Extended Collection per client** that inherits the base and overrides only what differs. Component structure stays identical, so a retheme never touches component anatomy.

**What changes with Bricks:** the mapping gets materially better. Bricks' Global Variables Manager is a real CSS-custom-property token layer, so Figma semantic tokens can map to Bricks variables by name, one-to-one. With Breakdance you can only do this for colour and typography presets, and anything more needs a third-party plugin and manual paste.

### Could we set up our own website templates for cheaper sites

**Yes, and this is the highest-leverage idea in your list.** It is exactly the "starter systems" layer in doc 22, made concrete.

**Decision: build 2 to 3 industry starters after the pilot, not before.** Each is the base kit plus a sector-appropriate default look and a subset of components (for example professional services, trades, health). A cheaper tier then becomes: pick a starter, swap the brand token layer, populate content, QA. That is a genuinely lower-effort SKU without dropping quality, because the foundations and accessibility work are already done and reused.

Do not build starters before the pilot proves the base kit and the token pipeline. You would be productionising an unproven foundation.

---

## Section E: WordPress stack

### Can AI update SEO, titles, metas, alt tags, and do we need a plugin

**No special plugin needed. And keep Rank Math.**

- **Rank Math stores everything as flat postmeta** (`rank_math_title`, `rank_math_description`, `rank_math_focus_keyword`, `rank_math_canonical_url`, `rank_math_robots`, and so on), so `wp post meta update <id> rank_math_title "..."` works today. WP-CLI boots WordPress core and calls `update_post_meta()` directly, so it bypasses REST and any `show_in_rest` gating entirely.
- **Alt text is core WordPress**, not an SEO plugin: postmeta `_wp_attachment_image_alt` on the attachment. Update via `wp post meta update`, or `wp media import --alt="..."`, or the core REST `alt_text` field on `/wp/v2/media/{id}`. No plugin required.
- **Rank Math now ships an official MCP server**, built on the WordPress mcp-adapter, exposed at `/wp-json/mcp/mcp-adapter-default-server`, with documented Claude Code setup via `@automattic/mcp-wordpress-remote` and an Application Password. Read tools include `rank-math/get-post-seo-meta`, `get-post-schema`, `audit-site-seo`. There is a human-approved `rank-math/fix-site-seo` write tool.

### Rank Math or The SEO Framework

**Decision: stay on Rank Math. Do not switch.** This is decisive, not marginal.

The two are equal at the floor (WP-CLI postmeta writes work on both). Above that, Rank Math has an official MCP server with Claude Code instructions, a headless REST endpoint, and a mature automation ecosystem. The SEO Framework has **no first-party agent story at all**: no MCP, no REST exposure (a community plugin exists because TSF does not ship it), no CLI commands. Automating TSF would mean writing and maintaining our own REST layer. Its lighter footprint is real but modest, and irrelevant on a properly configured LiteSpeed stack.

**Practical split:** use **WP-CLI for bulk writes**, and **Rank Math's MCP for reads, audits, and verification**.

### LiteSpeed (your staging server and cache)

**One finding here is important enough to become a hook.**

**`wp post meta update` does not fire `save_post`.** LiteSpeed Cache's automatic purge hangs off post-save hooks. So an agent that writes a title or alt text via WP-CLI will **successfully change the database and still serve the old value to visitors and crawlers** until the cache expires. This is a silent failure mode and exactly the kind of thing that makes a build "look done" and not be.

**Decision: every scripted SEO or content write must end with an explicit purge.**
```
wp post meta update 123 rank_math_title "New Title"
wp litespeed-purge post_id 123
```
Batch it where possible (`wp litespeed-purge post_id <id1> <id2> ...`), or `wp litespeed-purge all` for sitewide changes such as robots or redirects. **This becomes a PostToolUse hook** (see Section G).

**Other LiteSpeed notes:**
- **Keep ESI off.** It is off by default. ESI is implicated in a Bricks bug (stale `wpRestNonce` causing `Uncaught SyntaxError`) and Breakdance content duplication. If we ever enable it, exclude builder pages and Gravity Forms pages.
- **Check the "Cache REST API" toggle.** If our agent or Rank Math's MCP reads state over REST, cached JSON could feed the agent stale data. Add `wp-json/mcp` and `wp-json/rankmath` to "Do Not Cache URIs" if verification reads ever look stale.
- **.htaccess changes may need a server restart**, not just a cache purge.

### Gravity Forms

**Fully automatable, keep it.** REST API v2 gives full CRUD on forms and entries. WP-CLI support requires the free **Gravity Forms CLI Add-On** (`wp gf form create|import|export|update|...`). Forms serialise to portable JSON, so the agent can build and modify forms from a file, which is ideal for repeatable builds.

**Practical rule:** build the form via CLI or REST, then embed it with a **shortcode** in either builder rather than recreating it natively. Bricks has no native Gravity Forms element, and Breakdance pushes its own form builder. Watch the Bricks plus ESI plus Gravity Forms nonce issue (keep ESI off).

### What is "Native AI content, WordPress AI Client (core 7.0) plus a provider connector"

**Plain English: WordPress 7.0 added a provider-agnostic PHP API so that *plugins* can call an AI model without each shipping its own OpenAI or Anthropic SDK and its own API key.** The entry point is `wp_ai_client_prompt()`. A new **Settings then Connectors** screen stores the API key once per provider, and any AI-powered plugin on the site uses it without ever touching the key. There are separate first-party provider plugins for Anthropic, OpenAI and Google.

**Is it relevant to us? No, not for this pipeline.** It exists to proxy AI calls *through* WordPress for in-admin plugin features. We generate content in ZilvaEdge and write finished content in via WP-CLI, REST or MCP. Claude Code authenticates to Anthropic outside WordPress entirely.

**When it would matter:** only if we later want to hand a client a self-service AI button inside their own wp-admin (for example, "regenerate alt text for this gallery") without giving them Claude Code. That is a possible future product, not a current need. Do not confuse it with Rank Math's MCP server, which is a different layer.

### Connecting ZilvaEdge for content later

**Sensible and low-risk.** The clean seam is: ZilvaEdge produces approved content as markdown or structured data, and the build pipeline writes it in via WP-CLI or the Payload API. Keep content generation out of the build agent. It keeps our quality gates, compliance personas, and IRL where they already work, and keeps the build agent focused on structure. Defer until the build pipeline is proven.

---

## Section F: Team, tools and the designer

### Claude accounts, and what the non-technical designer should actually use

**Key correction to the assumed plan: Claude Design has no native Figma export.** It exports to Canva, PDF, PPTX, standalone HTML, or a share URL. So "Claude Design for ideas, then move into Figma" involves a manual rebuild, not an export. That is worth knowing before you design the workflow around it.

**What is actually true (verified 15 July 2026):**

- **Claude Cowork is real** and is the right home for the designer. It is agentic Claude with **no terminal**, in the Claude Desktop app alongside Chat and Code. Same architecture as Claude Code, no command line. Available on Pro, Max, Team, Enterprise (not Free).
- **Claude Design** is real but is **still a research preview**, powered by Opus 4.7, and is **tightly rate-limited** (reviewers report roughly 3 to 4 design prompts per week on Pro). It does build a design system from your codebase or design files, and it can package a **handoff bundle for Claude Code**. Treat it as a fast concepting and pitch tool, not a Figma replacement.
- **The Figma skills are real** and are the actual "Claude helps inside Figma" path: `figma-use` (writes to the Figma canvas), `figma-generate-design`, `figma-generate-library`, `figma-code-connect`, `figma-design-to-code` and others. Published by Figma (jointly with Anthropic), installable into Cowork or Claude Code. They need a paid Figma Full or Dev seat, currently free during beta.
- **The Claude Code app exists** but still requires Git and is built around repos, branches and diffs. **Not suitable for the designer.** She should use Cowork.

**Revised designer flow (my recommendation):**
1. **Claude Design** for initial concept directions and client-facing pitch visuals. Cheap, fast, rate-limited, disposable.
2. **Figma is the source of truth**, always. The design gets built properly there.
3. **Cowork plus the Figma skills** is how Claude helps her inside Figma: generating a library, assembling screens from real components, critiquing, checking accessibility. This replaces the assumed "Claude Design exports to Figma" step, which does not exist.
4. **Cowork plus the Design plugin skills** for the review work: `/design-critique`, `/accessibility-review`, `/design-handoff`, `/design-system`, `/ux-copy`.

### The Anthropic skills you listed are all real

Verified. Two sources:
- **`anthropics/knowledge-work-plugins`**: Anthropic's own open-source plugin collection (18 role-based plugins). The **design** plugin contains exactly the seven skills you listed. The **product-management** plugin contains the nine PM skills you listed (`/brainstorm` is shorthand for `product-brainstorming`).
- **`figma/mcp-server-guide`**: Figma-published, all twelve Figma skills confirmed.

Install for Cowork from claude.com/plugins, or in Claude Code:
```
claude plugin marketplace add anthropics/knowledge-work-plugins
claude plugin install design@knowledge-work-plugins
claude plugin install product-management@knowledge-work-plugins
```

**Decision: adopt these rather than building our own equivalents.** They are Anthropic-verified and free. We only build what they do not cover (Breakdance/Bricks limits, our brief agent, our stage gates).

### Plans

**Decision: move the team to the Claude Team plan.** Each person needs at least Pro to get Cowork, Claude Design, and Claude Code. But **Team adds org-wide plugin and skill provisioning**, so we curate an approved set once and push it to every seat, instead of three people separately hunting for and installing plugins and drifting apart. That directly serves your "we all need the same system on our computers" requirement, which is otherwise very hard to enforce.

Budget separately for **Figma paid seats** (Dev or Full) for whoever uses the Figma skills or the MCP. Free during beta, expected to become paid.

### Does the team need to learn design tokens, and what else in Figma

**Yes, tokens are non-negotiable.** They are the contract that makes the whole pipeline work. Without tokens, the AI emits hardcoded hex values, nothing is reusable, per-client theming collapses, and the design system is decorative rather than functional.

**Minimum Figma curriculum for the designer (in order):**
1. **Variables and collections**: what a token is, primitive vs semantic vs component tiers (doc 22), and **aliasing** (semantic references primitive, never a raw value).
2. **Extended Collections**: the mechanism for one base kit plus a per-client theme. This is how "all our sites look different" works.
3. **Modes**: light/dark and breakpoints *within* a brand, not as the brand switch.
4. **Auto Layout everywhere**: this is what maps to flex and grid in the builder. Absolute positioning is banned except for deliberate overlaps.
5. **Components and variants**, with consistent naming.
6. **Dev Mode basics**: enough to know what a developer sees and why naming matters.

**She does not need to code.** She needs to understand that a token name is an API. That is the whole ask. Realistically this is a half-day of teaching plus a build or two of practice, and the `/design-system` skill can audit her file and flag hardcoded values and naming inconsistencies, which is a good feedback loop.

### Would higgsfield.ai be useful

**Not for this system. It is solving a different problem.**

Higgsfield is an AI **video and image generation** platform (30+ models, Seedance, Kling, Veo, Sora, plus face swap, virtual try-on, Cinema Studio). It is aimed at content creators, filmmakers and marketers producing cinematic video and imagery at scale.

**It has nothing to do with web design, layout, design systems or code.** The only adjacency is generating hero imagery or background video as *creative assets*.

**Decision: no, not now.** We do not have an imagery bottleneck, and AI-generated hero imagery on client sites carries brand-fit and licensing questions we have not worked through. If an imagery need appears later, evaluate it then as an asset tool, not a design tool.

### Thoughts on the frontend-design skill, and could we make our own

**Yes, fork it. It is the best starting point available and it targets exactly our biggest quality risk: sites that look AI-generated.**

Anthropic's `frontend-design` skill (in `anthropics/claude-code`) frames Claude as "the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's." Its most useful parts:

- **The "Three AI Defaults to Avoid"**: it explicitly names the generic looks that betray AI output: the warm cream (#F4F1EA) plus serif plus terracotta combination; the near-black plus acid-green look; and the hairline-ruled broadsheet layout.
- **A two-pass loop: plan then critique, before any code.** Pass 1 produces a compact token system (4 to 6 named colours, 2+ type roles, layout in prose plus ASCII wireframes, and a defined "signature element"). Pass 2 critiques the plan against the brief and revises anything that reads as a generic default.
- **Principles worth keeping**: hero as thesis; typography carries personality; motion should be deliberate (it warns that ambient animation makes work feel AI-generated); a quality floor of responsive, visible focus, reduced-motion respect.
- **Copy treated as design material**, with its own rules.

**Decision: build our `/web-design` skill on this skeleton**, layered with our own brand and client rules (British and Australian English, the client's `audience_style_guide.md`, WCAG 2.2 AA, our token names, our builder's constraints). The plan-then-critique loop pairs naturally with our existing voice and style auditor.

---

## Section F2: Content (DECISION, 17 July 2026)

### Where content comes from

**CORRECTED (18 July 2026): content is a pluggable input from any source. It does not block anything, and no single source is mandated.** An earlier draft made ZE the required source and put its integration on the critical path. That was wrong on both counts.

Content can come from: the client, ZilvaEdge, or realistic placeholder for a pilot. The build accepts whichever is provided. ZE is the source we will most often reach for once it is wired up, but the system does not depend on it, and a build never waits on it.

### Design against real content where you have it (advice, not a gate)

Designing against final or realistic content beats lorem ipsum, because pouring real copy into a placeholder layout can break it, and a token and component system is what limits that damage. So **where content exists, use it; where it does not, placeholder is fine.** This is a quality recommendation, not a blocker. A pilot with placeholder content is valid.

**ZilvaEdge integration is therefore optional and can come whenever it suits, not a critical-path dependency.** An earlier draft said the opposite; this supersedes it. If and when we use ZE for content, the round-trip below applies. If we do not, nothing is missing.

### The round trip, and who is canonical

The chain is: **ZE writes markdown, it is published to a Google Doc, the human editor revises the Doc, and the Doc is pulled back to markdown before use.**

**The Google Doc is canonical once a human editor has touched it.** The local markdown is stale until pulled. This is a deliberate change to the source-of-truth model in 13, and it is chosen because it matches what is actually true: the editor is the final say on copy. Modelling markdown as canonical would fight the real workflow and produce drift rather than discipline.

### When the pull happens

**Never automatically.** An unattended sync could silently overwrite local work. It is an explicit step at exactly two points:

1. **Before design starts.** The designer needs the editor's final copy, not a draft.
2. **Before content populates the site.** The editor may have revised it again during the build.

The `stage-gate` skill checks Drive's `modifiedTime` against the manifest and reports ("the Doc changed 2 days ago, pull?") rather than asking blindly. An on-demand pull is also available.

### Tooling status

`drive_sync.py --pull-docs` was built in ZilvaEdge (commit `0680b1f`) to close this gap. `--pull` deliberately skips Google native files, so there was previously **no path back from a Doc at all**. It exports the Doc to markdown, undoes Google's escaping, splits tabbed Docs by tab, **preserves the local frontmatter** (the Doc never had it), archives before every overwrite, and refuses an empty export.

**A caution learned the hard way.** Testing it against real data exposed a defect in ZilvaEdge's `update_manifest()`: it matched deliverables on **bare filename**, so pushing one client's Doc stamped that Doc's ID onto every client sharing the filename. All six existing mappings were wrong, four clients pointed at a single Doc, and a pull wrote one client's report into another client's file. Fixed at root cause (path-based matching, commit `1065222`) and the poisoned data cleared.

Two things carry forward from that:

1. **`--pull-docs` verifies the Doc belongs to the client before writing, and refuses otherwise.** Keep that gate. It is what turned a client-data bleed into a refusal.
2. **The dry run looked perfect.** The fault only appeared against real data. Apply the same scepticism to the Breakdance write test: a passing dry run proves nothing.

### What still needs proving

The round trip has not yet been verified end to end on a real client Doc pushed with the fixed mapping. Until it has, treat the ZE content path as **built but unproven**, exactly as we treat the Breakdance write path.

---

## Section G: What agents, skills and hooks do we actually need

**The most important answer here is: far fewer than your list, and not yet.** You listed roughly 20 agents. Building 20 agents before a pilot is exactly the "magnificent internal knowledge kingdom before the pilot" that doc 12 warns against. Most would be speculative, unmaintained, and would fragment context.

Three principles:
1. **Adopt before building.** Anthropic's design and product-management plugins already cover critique, accessibility review, handoff, design systems, UX copy, research synthesis, specs and briefs. Do not rebuild them.
2. **Reuse ZilvaEdge.** We already have `accessibility_checker`, `performance_tester`, `technical_seo_analyst`, `ai_specialist_agent`, `critical_thinking_auditor`, `research-planner`, `content_brief_architect`, `skills_creator`, `prompt-engineering-consultant`, `code_archaeologist`, and the auditor and reviewer family. Point at them, do not clone them.
3. **Build only what is ours and load-bearing.** The builder's constraints, our brief, our stage gates.

### Build now (the pilot set)

| Item | Type | Why it must be ours |
|------|------|---------------------|
| `site-brief` | Skill (agent-backed) | Your "I need a new site for BRAND" trigger. Port the `content-brief` pattern. Nothing off-the-shelf knows our intake |
| `builder-limits` (Breakdance or Bricks) | Skill | The builder's constraints as an instruction: layout engine, element vocabulary, what it cannot do, Client Mode limits. This is the single highest-value skill we can write |
| `web-design` | Skill | Forked from Anthropic's `frontend-design`, plus our brand, tokens, and WCAG floor |
| `stage-gate` | Skill | The between-stages checklist (designer finished, dev ready, pre-launch). Your idea, and a good one |
| `token-sync` | Skill | Figma tokens into the builder's token layer, differential merge |
| `builder-builder` | Subagent | One page at a time from one approved frame, tokens only. Target-specific |
| `figma-token-extractor` | Subagent | Clean token export and mapping. Shared across targets |

That is **five skills and two subagents.** That is the whole pilot set. Everything else waits for evidence.

### Adopt, do not build

- **Anthropic design plugin**: `/design-critique`, `/accessibility-review`, `/design-handoff`, `/design-system`, `/ux-copy`, `/user-research`, `/research-synthesis`.
- **Anthropic product-management plugin**: `/write-spec`, `/competitive-brief`, `/synthesize-research`, `/product-brainstorming`, `/stakeholder-update`.
- **Figma plugin**: `figma-use`, `figma-generate-design`, `figma-generate-library`, `figma-code-connect`, `figma-design-to-code`.
- **ZilvaEdge agents** for accessibility, performance, SEO, AI readiness, critical review, research.

### Defer (build only when a real need appears)

Documentation, planner, orchestrators, strategists, analysts, code archaeologist, writers and editors, security, performance tuner, designers-with-personas, testing. Several of these already exist in ZilvaEdge; the rest are solutions looking for a problem at this stage. **Designers with different personas** in particular is a fun idea that would burn a lot of tokens and produce debate, not decisions. Revisit after the pilot.

### Hooks (build now, they are cheap and prevent real damage)

| Hook | Event | What it does |
|------|-------|--------------|
| `block-protected-paths` | PreToolUse | Deny writes to `wp-config.php`, `wp-settings.php`, production paths |
| `scan-dangerous-php` | PreToolUse | Block `eval`, `exec`, `shell_exec`, `system`, `passthru` before a write lands |
| `litespeed-purge` | PostToolUse | **New and important.** After any `wp post meta update` or DB-affecting command, run `wp litespeed-purge post_id <id>`. Postmeta writes do not fire `save_post`, so LSCache will not purge itself and the site silently serves stale values |

**Correction (17 July 2026): hooks are not a security boundary, and this table previously implied they were.** They match `Write|Edit|Bash` and therefore never fire on `mcp__novamira__execute-php`, which is the actual risk. They also cannot inspect code executed on a remote server. The real controls are staging-only with no production credentials in the environment, disposable environments, snapshot-before-write, permission deny rules, a pinned Breakdance version, and human review. Hooks catch honest mistakes. See doc 09 for the full statement.
| `builder-cache-clear` | PostToolUse | `wp breakdance clear_cache` (or the Bricks equivalent) after DB writes |
| `theme-or-lint-check` | PostToolUse | Lint changed PHP or run the builder's own checks |

---

## Section H: Remaining thoughts, answered briefly

- **"Design to a system instead of designing the page"**: covered at length in 25_end_to_end_lifecycle.md. Short version: you design the *rules* (tokens, components, states) once, then pages are assembled from them. The page stops being the unit of work.
- **"Everyone on the same system"**: solved by the Claude **Team plan** (org-wide skill provisioning) plus a version-controlled project template. Do not rely on three people installing the same things by hand.
- **"One-page design brief summary is really a PM stage"**: agreed, and that is how the lifecycle doc models it. The brief is produced in PM, not by the designer.
- **"Skills to help design to the proper layout, flex or grid"**: that is the `builder-limits` skill. It is the instruction that stops the designer producing something the builder cannot build editably.
- **"Prepare Breakdance, docs, global settings"**: that is `token-sync` plus the runbook (19). If we move to Bricks, this gets easier because its token layer is native.
- **"MCPs for cross-browser and responsiveness"**: we already have **Chrome DevTools MCP** (house rule: it is primary for verification and must run headless). Add Playwright only if we need a browser matrix Chrome DevTools cannot cover. Do not add tools we do not need.
- **"Creative research for the designer"**: `/competitive-brief` and `/research-synthesis` from the Anthropic plugins, plus our `research-planner`. Do not build a new one.
- **"The team may need help with Git"**: real, and it mostly affects the developer. Claude Code's desktop app has Git integration and can explain and perform commits. The **designer should not need Git at all**; she lives in Figma and Cowork. Keep it that way.
- **"The system should work without Novamira"**: harder now that Breakdance is chosen, but the discipline still holds. Design every skill to call *capabilities*, not Novamira tools, so the bridge (Novamira, Respira, or manual) is swappable. Note honestly that with Breakdance there is no sanctioned bridge to swap to, only another third party.

## Decision status (17 July 2026)

**Settled. Do not reopen without new evidence:**

1. **Target A is WordPress plus Breakdance.** Bricks was analysed and declined (Section C).
2. **Claude Team plan**, so the toolset is provisioned once and stays consistent.
3. **Content is a pluggable input from any source (client, ZilvaEdge, or placeholder). It never blocks a build.** ZE is optional, not on the critical path (Section F2).
4. **Buy Novamira Pro** for the write test. Do not buy Breakdance AI (Section D) or Respira yet.

**Open, in priority order:**

1. **Run the 15-minute Breakdance write test** (Section C). It can invalidate Target A, so nothing else in Target A should be built before it passes.
2. **Get one real Breakdance settings export.** Five minutes, and it replaces our assumptions about the format with the format.
3. **Confirm the pilot scope**, so the skills are built against a real job rather than in the abstract.
