# 08b. Astro plus Payload Build Target

Status: v0.1 | Date: 14 July 2026 | Owner: Dev Lead

This document is the Astro plus Payload counterpart to 08 (Breakdance and WordPress). It covers how the shared design and token front-half becomes a running site on the Astro plus Payload target: the stack, how content and design tokens are stored, the developer build steps, the client editing story, deployment and server needs, and the safe ways an AI agent may work in this target.

The front-half of the pipeline (brief, research, design system, Figma high-fidelity, token extraction) is identical to the Breakdance target. See 02 for the fork, 03 and 04 for the workflows, and 05 stages 1 to 4 for the shared prompt sequence. This document replaces 08 for stages 5 and 6 when the chosen target is Astro plus Payload.

## What this stack is

| Layer | Choice | Notes |
|-------|--------|-------|
| Front-end | Astro (static site generation by default) | Ships zero JavaScript by default; content baked to HTML at build time for AI-crawler fidelity and Core Web Vitals |
| Styling and tokens | Tailwind plus CSS custom properties | The design token layer lives in code, not in a CMS. This is the key difference from Breakdance Global Settings |
| Content | Payload CMS (headless) | TypeScript, code-first config, MIT licence, free and self-hosted. Exposes REST, GraphQL, and a Local API |
| Content runtime | Node service plus a database | Payload 3.x installs into a Next.js app; needs Node 20.9 or later and MongoDB, PostgreSQL, or SQLite (three first-party adapters). Payload pins to specific Next.js version ranges, so it is not "any" Next.js version |
| Bridge for the agent | None equivalent to Novamira | The front-end is code the developer owns; content is authored through Payload's governed admin and API. There is no raw-PHP execution surface |

Two facts worth flagging to the team, both confirmed July 2026:

1. **Payload was acquired by Figma on 17 June 2025**. The team joined Figma; the MIT licence, the GitHub repository, and self-hosting are unchanged. Design tool and CMS are now the same company, which is a useful alignment story, not a lock-in.
2. Payload Cloud, the first-party managed host, paused new sign-ups after the acquisition. Do not architect around it. Plan on a self-hosted Node service plus database (or a generic Node host such as Railway, DigitalOcean, or your own VPS).

## How content and tokens are stored

This is the mirror of "how Breakdance stores content", and it splits cleanly.

1. **Design tokens live in code**, not in Payload. Colour, typography, spacing, radius, and effects flow from Figma variables into the Tailwind config and CSS custom properties, and Astro components consume them by name. Payload never holds a design token. This matches the constitution's "design system in code" model.
2. **Content lives in Payload** as typed structures:
   - **Collections**: repeatable content types (Pages, Posts, Services, Team).
   - **Globals**: single-instance content (site header, footer, navigation, contact details).
   - **Fields**: typed fields, including relationships between documents.
   - **Blocks field**: an ordered array of schema-defined block types (Hero, CTA, Feature grid, Gallery) that an editor stacks and reorders to compose a page. This is Payload's closest analogue to Breakdance Global Blocks.
3. **The important distinction from Breakdance**: a Payload Block defines data and schema only. The visual output is the matching Astro component the developer writes. Editors compose layout by choosing and ordering blocks; they do not visually author the internals of a block on a canvas. True in-context visual editing exists only in Payload's paid enterprise Visual Editor, which is out of scope for v0.1.

## Developer build steps (stages 5 and 6 for this target)

These replace the Breakdance-specific steps in 04. Steps 1 to 4 of 04 (review the Figma handoff, extract tokens via the Figma MCP scoped to frames, map components, review the token set) are unchanged.

### Stage 5 equivalent: token sync and content model

1. **Sync the extracted Figma tokens into the code token layer**: write the resolved values into the Tailwind config and CSS custom properties, using the same semantic token names agreed at handoff. This is the Astro equivalent of the Breakdance Global Settings sync. Keep names identical across Figma variables, the Tailwind or CSS token layer, and any Payload block field names so the mapping stays one to one.
2. **Model the content in Payload**: define the Collections, Globals, Fields, and the Blocks that the page inventory needs. One Payload Block type per reusable design section. Keep the schema honest to the design so an editor never needs a field the design cannot render.
3. **Human review gate**: the Dev Lead reviews the token layer for completeness and the content model against the sitemap before any page is built.

### Stage 6 equivalent: build components and pages

1. Build one Astro component per Payload Block type, and per shared layout region (header, footer). Reference token names for all colour, type, and spacing. Never hardcode a hex or an off-scale spacing value; a hardcoded value is a defect, exactly as in the Breakdance path.
2. Use `get_design_context` and `get_screenshot` scoped to a single frame, and `get_code_connect_map` where components are mapped. Code Connect is the single biggest fidelity lever here too: map Figma components to the Astro components so the model references real implementations rather than inventing them.
3. **Build one page at a time**. Wire the Astro pages to fetch content from Payload at build time (REST or GraphQL for a decoupled deploy, or the Local API in a shared repo), and render the Blocks array to the matching components.
4. **Run a visual QA and diff pass**: screenshot the built page, compare it to the Figma frame, and patch discrepancies using token references only. A page is done only when its screenshot diff is clean and a developer has reviewed the preview.

## Client editing story

- **Clients edit content in Payload's auto-generated admin**: a clean, structured form UI, with role-based access control down to the field level.
- Payload Live Preview renders the Astro front-end inside the admin with real-time updates, but this is not automatic: the Astro front-end must implement Payload's live-preview client for it to work. Budget for that wiring if the client wants it.
- Compared with Breakdance Client Mode, this is structured content editing, not on-canvas visual editing. Clients change the content of fields and the order of blocks; they do not drag layout around. Design the content model so every routine client edit is a field change or a block reorder, never a structural one. This is the Astro equivalent of "structure content so Client Mode edits stay within text, images, and links".

## Deployment and server requirements

Astro plus Payload is a split deployment, unlike WordPress which is a single host.

1. **Astro front-end**: static output served from any host or CDN (your own Nginx, Netlify, Vercel, or S3 plus CloudFront). Cheap, fast, and stateless.
2. **Payload backend**: a persistent Node service (Node 20.9 or later) plus a database (MongoDB, PostgreSQL, or SQLite), file storage, and typically an email provider and a CDN for media. This cannot be static. Self-host it (Payload Cloud is not a safe managed option, see above).
3. **Rebuild on publish**: pure static generation freezes content at build time. A client edit in Payload must trigger a rebuild and redeploy of the Astro site (a publish webhook), or specific sections must be rendered with Astro on-demand rendering instead of static. Decide this per client.
4. **Default dev ports do not collide, but check anyway**: the Astro dev server defaults to port 4321 and Payload (running inside Next.js) defaults to port 3000, so out of the box they run side by side without conflict. Astro deliberately moved off port 3000 to 4321 partly to avoid clashing with tools like Next.js. Only reassign a port if you have changed a default or run another service on 3000 or 4321.

Server sizing for the Payload backend is an engineering estimate, as in 17. Update 17 with the Node plus database staging and production requirements for this target before the first Astro plus Payload pilot.

## The ways an AI agent can work in this target, ranked by safety

Ranked safest first. This is the Astro plus Payload equivalent of the five ways an agent can target Breakdance, and it is materially safer because there is no raw-PHP execution surface and the front-end is version-controlled code.

1. **Edit version-controlled Astro components and config (safest).** The agent edits `.astro`, Tailwind config, and CSS files in the repository, under the same hooks, linting, and human review as any code change. Changes are diffable and revertible in Git.
2. **Define or edit Payload config (Collections, Globals, Blocks) in code.** Schema is TypeScript in the repository, reviewed like any other code. A migration is required for database-affecting changes; review it.
3. **Read content through the Payload API.** Read-only queries via REST, GraphQL, or the Local API to understand existing content. No write.
4. **Author or update content through the Payload admin API (constrained, reviewed).** Writing content documents through Payload's governed API is far safer than a raw database write because Payload validates against the schema and access control. Still human-reviewed, still backed up first.
5. **Direct database writes (last resort).** Writing to MongoDB or PostgreSQL directly, bypassing Payload validation. Highest risk; avoid. Use the admin API instead.

## Watch-outs

1. **Payload adds an always-on Node service and a database**. It is a heavier ops surface than a single WordPress host. Price this into the client engagement.
2. **Payload Cloud is not a safe managed option post-acquisition**. Self-host the backend.
3. **Content is frozen at build for a static Astro site**. Wire a rebuild webhook on publish, or use on-demand rendering for dynamic sections.
4. In a shared Astro plus Payload monorepo, Vite may try to parse Payload's server code and break on path aliases. Keep them in separate packages, or exclude Payload from Vite dependency optimisation and use relative imports.
5. **There is no first-party Astro package for Payload**. Integration is generic REST or GraphQL fetch, or a community Local-API plugin. Treat community plugins as convenience, not a supported dependency.
6. **Design tokens are code, not CMS config**. The naming bridge (identical token names across Figma, Tailwind or CSS, and Payload block fields) is what lets the Figma MCP emit the right token instead of a literal. Guard it.

## Related documents

- [02_recommended_minimum_architecture.md](02_recommended_minimum_architecture.md) - the two-target fork
- [08_breakdance_and_wordpress_plugin_stack.md](08_breakdance_and_wordpress_plugin_stack.md) - the Breakdance target this mirrors
- [04_developer_workflow.md](04_developer_workflow.md) - the developer workflow (steps 1 to 4 shared)
- [05_claude_design_prompt_sequence.md](05_claude_design_prompt_sequence.md) - the shared prompt sequence
- [17_server_requirements.md](17_server_requirements.md) - server requirements (update for the Node plus database backend)
- [22_design_system_reuse_model.md](22_design_system_reuse_model.md) - the shared-base design-system model
