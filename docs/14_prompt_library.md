# 14. Prompt Library

**AI Web Design System v0.1** | Internal developer and PM reference

This document holds the actual, copy-pasteable prompts used across a design-to-WordPress build. The sequence in which they are issued, and the reasoning behind that order, is in [05_claude_design_prompt_sequence.md](05_claude_design_prompt_sequence.md).

Each prompt uses a `[ROLE]`, `OBJECTIVE`, `DIRECTIVES` structure. Paste the whole block, then fill in the bracketed placeholders (for example `[CLIENT]`, `[FIGMA_FRAME]`, `[STAGING_URL]`) before sending.

## (a) Design-system scaffolding prompt

Use at Stage 2. Assists the Designer with the Figma design system. The separate guided prompt in `prompts/designer/05_create_design_md.md` creates and verifies the client `DESIGN.md` in two passes.

```
[ROLE] You are an Elite Design Systems Architect.

OBJECTIVE
Create a Figma design system for [CLIENT] that will be the single source
of truth for every page we build.

DIRECTIVES
1. Create a Local Variables collection. Every value the design uses must be
   a variable in this collection. Nothing hardcoded.
2. Use semantic token names, not literal ones. For example:
   color/brand/primary, color/brand/secondary, color/text/default,
   color/surface/default, color/border/subtle. Never name a token after
   its value (no color/blue/500 as a public token).
3. Build a type scale in rem at a base of 16px. Define steps such as
   font-size/xs, sm, base, lg, xl, 2xl, 3xl with matching line-height
   tokens. State the rem value for each.
4. Build a spacing scale on a 4pt and 8pt grid: space/1 = 4px,
   space/2 = 8px, space/3 = 12px, space/4 = 16px, and so on. All layout
   spacing must reference these.
5. Create master components using Auto Layout for: button (with variants),
   input, card, navigation bar, footer, and section container. Components
   must consume the tokens above, never raw hex or pixel values.
6. Do not use any hardcoded hex value anywhere. If you need a colour that
   does not exist, add a semantic token for it and explain why.
7. When the system is complete, audit the variables, bindings, components and
   states. Do not create or overwrite DESIGN.md in this prompt.

Report the collection name, the full token list, the audit findings and the
canonical token-contract path. The Designer will run the separate two-pass
DESIGN.md prompt after the Figma work is reviewed.
Do not design any pages yet.
```

## (b) Initial website-design prompt

Use at Stage 3. Turns the brief into a first full homepage concept.

```
[ROLE] You are a Senior Product Designer working inside an established
design system.

OBJECTIVE
Design a first full homepage concept in Figma for [CLIENT], based on the
brief below, using only the existing design system.

BRIEF
[PASTE CREATIVE BRIEF: audience, value proposition, primary call to action,
required sections, tone, any must-have content]

DIRECTIVES
1. Read the design system first. Call get_variable_defs to load the tokens
   and use only those tokens for colour, type, and spacing.
2. Compose the page from the existing master components. If you need a new
   component, base it on the system and note it as a proposed addition.
3. Lay the page out with Auto Layout so it is responsive by construction.
4. Cover, at minimum: hero, value proposition, primary services or
   features, social proof, and a closing call to action.
5. Do not introduce any hardcoded hex or off-scale spacing.
6. When done, call get_screenshot on the homepage frame and include it so
   we can review the concept.

Return the frame name and the screenshot. This is a concept for review, not
a final. Stop after the homepage.
```

## (c) Figma-to-Breakdance translation prompt

Use at Stage 5. Extracts tokens and applies them to Breakdance via a differential merge.

```
[ROLE] You are a Senior DevOps Engineer responsible for a live WordPress
staging site running Breakdance.

OBJECTIVE
Translate the Figma design tokens into Breakdance global settings on the
staging site WITHOUT destroying any existing configuration.

DIRECTIVES
1. Call get_variable_defs to read the current, resolved design tokens from
   Figma (colours, type scale, spacing).
2. Export the current Breakdance settings first:
   wp breakdance export_settings
   Read the exported JSON carefully. It contains existing global variables,
   custom CSS, and clamp() based fluid typography we must not lose.
3. Perform a DIFFERENTIAL MERGE, not an overwrite:
   - Preserve every existing key.
   - Preserve all custom CSS exactly.
   - Preserve all clamp() functions exactly.
   - Add or update ONLY the global variables that the Figma tokens require.
   - If a token maps to an existing variable, update its value in place and
     keep the variable name.
4. Write the merged result to a new JSON file. Show me the diff between the
   exported settings and the merged settings before importing.
5. Import the merged settings:
   wp breakdance import_settings [merged-file.json]
6. Clear the cache:
   wp breakdance clear_cache
7. Verify:
   wp breakdance status

WARNING
Never blind-overwrite Breakdance settings. Never run total_reset. A blind
import wipes custom CSS and fluid typography and is treated as an incident.
Back up the relevant postmeta before you import.

Report the diff you applied, the import result, and the status output.
```

## (d) Repeatable subpage-generation prompt

Use at Stage 6, once per page.

```
[ROLE] You are a Senior Frontend Developer building pages in Breakdance
from an approved Figma design.

OBJECTIVE
Build the single page [PAGE NAME] in Breakdance on staging so it matches
the Figma frame [FIGMA_FRAME].

DIRECTIVES
1. Scope to the one frame. Call get_design_context on [FIGMA_FRAME] only,
   and call get_screenshot on the same frame. Do not load the whole file.
2. Reference established Breakdance global variables for all colour, type,
   and spacing. Do NOT hardcode values. If a needed variable is missing,
   stop and tell me rather than inventing a literal.
3. Map the layout structure:
   - Auto Layout frames become Section and Div elements.
   - Column arrangements become the Columns element.
   - Use the Post Loop Builder for any repeating content (listings, cards
     driven by posts, team members, and similar).
4. Do NOT write raw PHP layout files. Build through Breakdance elements and
   its data structures only.
5. Commit to this one page. Do not touch other pages or global settings.
6. After building, clear cache with wp breakdance clear_cache and return
   the staging preview URL for this page.

Report the elements you used, any missing variables, and the staging
preview URL. Stop after this one page.
```

## (e) Visual-QA and diff prompt

Use after (d), per page, to check the build against the design.

```
[ROLE] You are a Senior Frontend Developer doing visual QA.

OBJECTIVE
Compare the built page at [STAGING_URL] against the Figma frame
[FIGMA_FRAME] and correct any layout discrepancies.

DIRECTIVES
1. Capture the built page: take a fresh get_screenshot of [FIGMA_FRAME] for
   the reference, and capture the live rendered page at [STAGING_URL].
2. Compare them side by side. List every discrepancy: spacing, alignment,
   type size, colour, component state, responsive behaviour.
3. For each discrepancy, patch the Breakdance layout using global variables
   only. Do not hardcode values and do not write raw PHP.
4. Do not restructure anything that already matches. Fix only what differs.
5. After patching, run wp breakdance clear_cache and re-check.

Report the discrepancy list, what you changed for each, and confirm the
page now matches. Stop after this one page.
```

## Astro plus Payload variants (Build Target B)

Prompts (a) and (b) are build-target-neutral and unchanged: the design system and homepage concept are the same work regardless of target. Prompt (e), visual QA, is also reusable as written if you point `[STAGING_URL]` at the Astro preview URL. Only stages 5 and 6 differ. The prompts below replace (c) and (d) when the target is Astro plus Payload. See [08b_astro_payload_build_target.md](08b_astro_payload_build_target.md) for the stack.

### (c-astro) Figma-to-code token sync and Payload content model

Use at Stage 5. Syncs tokens into the code layer and models the content in Payload. Replaces (c).

```
[ROLE] You are a Senior Frontend Engineer setting up an Astro plus Payload
project from an approved Figma design system.

OBJECTIVE
Sync the Figma design tokens into the Astro code token layer, and model the
site's content in Payload, WITHOUT hardcoding any design value.

DIRECTIVES
1. Call get_variable_defs to read the current, resolved design tokens from
   Figma (colours, type scale, spacing, radius, effects).
2. Write these tokens into the code token layer, not into Payload:
   - Tailwind config theme values and/or CSS custom properties.
   - Use the SAME semantic token names agreed at handoff (for example
     color/brand/primary maps to a matching Tailwind or CSS variable name).
   - Do not invent values. If a token has no home, stop and ask.
3. Model the content in Payload from the page inventory:
   - Collections for repeatable types (Pages, Posts, Services, Team).
   - Globals for single-instance content (header, footer, navigation,
     contact details).
   - One Blocks type per reusable design section (Hero, CTA, Feature grid,
     Gallery), with typed fields that match what the design renders.
4. Keep names consistent across Figma variables, the code token layer, and
   Payload block field names so the mapping stays one to one.
5. Payload holds content and layout composition only. It must never hold a
   design token.
6. Produce a migration for any database-affecting Payload schema change and
   show it for review before applying.

Report the token file changes, the Payload collections, globals and blocks
you defined, and any migration to be reviewed. Do not build pages yet.
```

### (d-astro) Repeatable Astro component and page build

Use at Stage 6, once per page. Replaces (d).

```
[ROLE] You are a Senior Frontend Developer building Astro components and
pages from an approved Figma design, backed by Payload content.

OBJECTIVE
Build the single page [PAGE NAME] as Astro components that render the
matching Payload content, so it matches the Figma frame [FIGMA_FRAME].

DIRECTIVES
1. Scope to the one frame. Call get_design_context on [FIGMA_FRAME] only,
   and get_screenshot on the same frame. Do not load the whole file. Where
   components are mapped, call get_code_connect_map and reference the real
   Astro components rather than inventing new ones.
2. Reference token names for all colour, type, and spacing (Tailwind classes
   or CSS variables). Do NOT hardcode a hex or an off-scale spacing value.
   If a needed token is missing, stop and tell me rather than inventing one.
3. Build one Astro component per Payload Block type used on this page, plus
   any shared layout region (header, footer) not already built.
4. Wire the page to fetch its content from Payload at build time (REST or
   GraphQL for a decoupled deploy, or the Local API in a shared repo), and
   render the Blocks array to the matching components in order.
5. Commit to this one page and its components. Do not touch unrelated pages.
6. After building, run the Astro build or dev preview and return the preview
   URL for this page.

Report the components you built, the Payload queries used, any missing
tokens, and the preview URL. Stop after this one page.
```

Then run prompt (e) as written, with `[STAGING_URL]` set to the Astro preview URL, to diff the built page against the Figma frame.

## System setup prompts

**These have moved to `START_HERE.md` in the repository root, which is the maintained copy.**

They are kept below as reference only and may drift. If the two disagree, START_HERE wins. Do not paste from here without checking it against START_HERE first: the paths in this file were stale for a period because the docs moved when the system got its own repository.

### (f) Initial system setup prompt (run once, by the Dev Lead)

Paste into Claude Code in the root of the Starter-Websites repository. It reads the system docs, sets up what it can, and tells you what only a human can do.

```
[ROLE: Senior DevOps Engineer setting up an internal AI web design system]

OBJECTIVE: Stand up the AI Web Design System on this machine, end to end. Do what you
can automatically. Where a step needs a human (a purchase, an OAuth click, a licence
key, a server action), STOP, tell me exactly what to do, and wait.

READ FIRST, in this order, and treat them as the specification:
- docs/00_README_and_index.md
- docs/01_current_state_findings_and_claims_to_verify.md
- docs/02_recommended_minimum_architecture.md
- docs/06_claude_code_project_structure.md
- docs/09_skills_agents_commands_hooks.md
- docs/15_claude_code_setup_and_mcp_config.md
- docs/19_implementation_runbook.md   (WordPress target)
- docs/19b_astro_payload_implementation_runbook.md  (Astro target)
- docs/24_open_questions_answered.md  (current decisions)

DIRECTIVES:
1. Report the environment first: OS, node -v, npm -v, git --version, python --version,
   and whether Git Bash or WSL is available (the hooks are bash scripts). Flag anything missing.
2. Confirm which build target this machine is for: A (WordPress plus a builder) or
   B (Astro plus Payload), or both. Ask if not stated.
3. Create the .claude structure per doc 06: CLAUDE.md, settings.json,
   settings.local.json (gitignored), skills/, agents/, commands/, hooks/. Use only the
   canonical minimal frontmatter forms in doc 09. Do not invent fields.
4. Scaffold the pilot skills and subagents from doc 24 Section G:
   skills: site-brief, builder-limits, web-design, stage-gate, token-sync
   subagents: builder-builder, figma-token-extractor
   Where a skill needs knowledge we have not written yet, create it with a clear TODO
   block rather than inventing content.
5. Write the hooks from doc 24 Section G into settings.json and .claude/hooks/:
   block-protected-paths, scan-dangerous-php, litespeed-purge, builder-cache-clear,
   theme-or-lint-check. chmod +x the scripts. Explain the litespeed-purge hook to me,
   because it prevents a silent stale-cache failure.
6. Write .mcp.json with the servers we actually use, secrets as ${ENV} references only:
   figma (remote), the WordPress bridge for target A, chrome-devtools. Never put a
   credential in a committed file.
7. Set permissions in settings.json: plan mode default; deny Write(wp-config.php),
   Write(wp-settings.php), Bash(rm -rf *), Bash(sudo *); allow the MCP tools we need and
   safe Bash. Never allow a blind import_settings or any total_reset.
8. STOP and give me a numbered MANUAL STEPS list for everything you cannot do yourself.
   Expect at least: installing and authorising the Figma plugin
   (claude plugin install figma@claude-plugins-official, then /plugin and OAuth); the
   Anthropic plugins (claude plugin marketplace add anthropics/knowledge-work-plugins,
   then design@ and product-management@); licence keys; the staging server and its
   Application Password; and Claude Team plan provisioning.
9. After I confirm the manual steps are done, verify: run /mcp, report which servers are
   connected, then run ONE read-only test per server and report the result. Perform no
   write until every read-only test passes.

CONSTRAINTS:
- Do not touch production. Staging only.
- Do not install anything not named in the docs without asking.
- British and Australian English in anything you write. No em dashes, no en dashes.
- If a doc and your training knowledge disagree, the doc wins. Say so and continue.

Finish with: what is installed, what is pending, and the single next action.
```

### (g) Team-member onboarding prompt (once per person)

**For a developer or PM (Claude Code):**

```
[ROLE: Setup assistant onboarding a team member to an existing AI web design system]

OBJECTIVE: Configure THIS machine to match our agreed system exactly. The system already
exists and is documented. Do not redesign it. Match it.

READ FIRST:
- docs/00_README_and_index.md
- docs/06_claude_code_project_structure.md
- docs/15_claude_code_setup_and_mcp_config.md
- docs/24_open_questions_answered.md
- docs/25_end_to_end_lifecycle.md

DIRECTIVES:
1. Ask which role this machine is for (Developer or Project Manager) and tailor the rest.
2. Report the environment (OS, node, npm, git, Git Bash or WSL) and flag anything missing.
3. Verify the repository is cloned and current, and that .claude/ and .mcp.json are present
   from version control. Do NOT recreate them; they are shared and committed.
4. Create only the LOCAL, uncommitted pieces: settings.local.json and any required
   environment variables. Confirm .gitignore already excludes them.
5. Give me a numbered MANUAL STEPS list for this person, then wait:
   - Claude plan check (Team seat; Pro at minimum)
   - claude plugin install figma@claude-plugins-official, then /plugin and OAuth
   - claude plugin marketplace add anthropics/knowledge-work-plugins
     then claude plugin install product-management@knowledge-work-plugins
     (developers also want the Figma skills; PMs mainly want product-management)
   - A Figma paid seat (Dev or Full) if they will use the Figma MCP
   - Any credentials to obtain, never to be committed
6. Verify: run /mcp, confirm the same servers connect as on the reference machine, and run
   one read-only test each. Report any difference as a DRIFT item. Do not silently fix drift
   by editing shared committed config.
7. Brief them on the lifecycle (doc 25) in five lines: what their role owns, which gate they
   approve, and which skill they trigger first.

CONSTRAINTS:
- Match the existing system. If something looks wrong, raise it; do not unilaterally change
  shared committed config.
- Staging only. Never production.
- British and Australian English. No em dashes, no en dashes.

Finish with: ready or not ready, and any drift from the reference machine.
```

**For the designer (Claude Cowork, no terminal):** a checklist to work through together, not a prompt to paste. She should never need Claude Code.

1. **Claude Desktop installed**, signed in on a Team (or Pro) seat. She works in the **Cowork** tab, not Code.
2. **Install the Design plugin** from claude.com/plugins (Anthropic verified). It gives her `/design-critique`, `/accessibility-review`, `/design-handoff`, `/design-system`, `/ux-copy`, `/user-research`, `/research-synthesis`.
3. **Install the Figma plugin** from claude.com/plugins. Needs a paid Figma Dev or Full seat. This is how Claude works on her canvas (`figma-use`, `figma-generate-design`, `figma-generate-library`).
4. **Claude Design for concepts only.** It is rate-limited and does **not** export to Figma.
5. **Read doc 25** (the lifecycle) and **doc 22** (the design-system reuse model). Those two, nothing else.
6. **Half a day on tokens**: Variables and collections, primitive vs semantic, aliasing, Extended Collections, Auto Layout. Then run `/design-system` on a real file and fix what it flags.

## How to adapt these prompts

- Keep the `[ROLE]`, `OBJECTIVE`, `DIRECTIVES` skeleton. It is what makes the output predictable.
- **Replace placeholders before sending**. Never send a prompt with a bracket still in it.
- **Tighten, do not loosen, the constraints**. If a client build has extra rules (a fixed grid, a mandated plugin), add them as numbered directives rather than relaxing existing ones.
- **Preserve the safety directives verbatim**: scope to frames, tokens not hex, differential merge not overwrite, no raw PHP, one page at a time. These are the guardrails, not decoration.
- If a stage keeps producing drift, the fix depends on the target. **Target B (Astro):** add a Code Connect mapping (`get_code_connect_map`) for the components involved; it is the biggest accuracy lever there. **Target A (Breakdance):** Code Connect does not apply, because Breakdance elements are builder nodes, not code components. Use the reviewed Figma-to-Breakdance mapping table instead (see 07).
- **These prompts are for the web-build system only**. They are separate from the ZilvaEdge content-system prompts and agents.
