# Start Here

How to stand this system up, and how to bring a team member onto it afterwards.

## Before you paste anything

1. Open a terminal in this repository (`C:\Apps\Websites\ai-web-design-system`) and run `claude`.
2. Have these to hand, because the prompt will stop and ask for them:
   - A Figma account with a **Professional Dev seat** (the free tier is too rate-limited to use).
   - Your **Claude Team plan** admin access (for org-wide plugin provisioning).
   - Your **LiteSpeed staging server** details, and a Breakdance Pro licence key.
   - **Novamira Pro** (EUR 129/yr Agency). Buy it at the human purchase step in Prompt 1, not
     before. It is bought specifically to run the Breakdance write test; free core cannot test
     the Pro Breakdance specialization. Do not buy Respira or Breakdance AI.

**This prompt does not build a website.** It builds the system that builds websites. Expect it to stop and ask you things. That is the design.

---

## Prompt 1: Stand up the system (run once, Dev Lead)

Paste this whole block into Claude Code in this repository.

```
[ROLE: Senior DevOps Engineer standing up an internal AI web design system]

OBJECTIVE: Build out this repository into a working system per its own specification.
Do what you can automatically. Where a step needs a human (a purchase, an OAuth click,
a licence key, a server action), STOP, tell me exactly what to do, and wait for me.

Do NOT build a client website. This repo is the system, not a site.

READ FIRST, in this order, and treat them as the specification:
- CLAUDE.md                                  (the constitution: constraints)
- docs/00_README_and_index.md                (index and reading order)
- docs/01_current_state_findings_and_claims_to_verify.md   (what is verified vs unproven)
- docs/02_recommended_minimum_architecture.md
- docs/24_open_questions_answered.md         (the live decisions; Section G is the roster)
- docs/25_end_to_end_lifecycle.md            (roles, stages, gates)
- docs/09_skills_agents_commands_hooks.md    (canonical config forms)
- docs/06_claude_code_project_structure.md
- docs/22_design_system_reuse_model.md
- docs/19_implementation_runbook.md          (Target A: WordPress plus Breakdance)

KEY DECISIONS ALREADY MADE. Do not relitigate them:
- Target A is WordPress plus Breakdance. Bricks was considered and declined.
- Breakdance has NO sanctioned programmatic layout path. Any layout write is
  reverse-engineering via a third party. Trial Novamira Pro before Respira. Keep the
  layout-write step swappable: skills call a CAPABILITY, never a vendor tool name.
- The designer never uses Claude Code. She uses Claude Cowork plus Figma.
- Content must exist BEFORE design. Content is client-supplied or written in ZilvaEdge.
- Adopt Anthropic's plugins rather than rebuilding them.

DIRECTIVES:

1. ENVIRONMENT. Report OS, node -v, npm -v, git --version, python --version, and whether
   Git Bash or WSL is present (hook scripts are bash). Flag anything missing. Do not install
   anything yet.

2. TRIAGE THE PORTED ASSETS. `_ported-for-review/` holds assets rescued from a retired
   experiment (Starter-Websites). They are NOT trusted: most date from November 2025, predate
   this system, and were written for an Astro-only monorepo. Read README.md's table first.
   For EACH item, decide and tell me: PROMOTE (with the changes needed), REWRITE, or DELETE.
   My guidance:
   - `agents/design/creative/` and `skills/design/` (metaphor grounding, differentiation
     verification, anti-ai-design-checklist): highest value, target-neutral, already exercised.
     Promote, but strip any Astro/Tailwind assumptions and align naming to this system.
   - `agents/website/` auditors (SEO, accessibility, AI-readiness, performance, security):
     they inspect rendered output, so they work against a Breakdance staging URL. Promote,
     retarget from "Astro build" to "staging URL", and check for overlap with ZilvaEdge's
     equivalents before duplicating.
   - `skills/figma/` plus `agents/figma-build-orchestrator.md`: PORT THE IDEA, REWRITE THE
     IMPLEMENTATION. The 2-phase discipline (extract tokens once, lock them, never re-extract,
     gate before build) is the best idea in there and it fixes our weakest link. Its emitter
     writes tailwind.config.cjs, which is meaningless to Breakdance Global Settings. Rewrite the
     emitter per target. Read `_ported-for-review/reference/Squad_Analysis_Report_Figma_Fidelity_Diagnosis.md`
     first; it explains why the discipline exists (30 to 40% accumulated fidelity loss).
   - `skills/project-constitution-management/`: promote as-is, it is target-neutral.
   - `packages/seo-utils/`: keep, but it needs a target wrapper. Do not wire it in yet.
   - Anything Astro-monorepo-specific: DELETE.
   Show me the triage table and WAIT for my approval before promoting or deleting anything.

3. BUILD `.claude/`. After I approve the triage, create the structure per docs/06 and the
   canonical minimal forms in docs/09. Never invent frontmatter fields.
   Skills to author (docs/24 Section G):
     site-brief, breakdance-limits, web-design, stage-gate, token-sync
   Subagents to author:
     builder-builder (capability-based, vendor-agnostic), figma-token-extractor
   Plus whatever you promoted in step 2.
   Where a skill needs knowledge we have not written, create it with an explicit TODO block.
   Do not invent facts. Do not guess at Breakdance internals; docs/08 and docs/24 are the source.

4. HOOKS. Write these into settings.json and .claude/hooks/, then chmod +x:
     block-protected-paths   (PreToolUse: deny writes to wp-config.php, wp-settings.php, production)
     scan-dangerous-php      (PreToolUse: block eval/exec/shell_exec/system/passthru)
     litespeed-purge         (PostToolUse: after wp post meta update or any DB write, run
                              wp litespeed-purge post_id <id>)
     breakdance-cache-clear  (PostToolUse: wp breakdance clear_cache after DB writes)
     lint-changed            (PostToolUse: lint changed PHP)
   Explain the litespeed-purge hook back to me and why it exists. If you cannot explain why it
   is needed, re-read docs/24 Section E before continuing.

5. MCP CONFIG. Write .mcp.json with figma (remote) and chrome-devtools. Secrets as ${ENV}
   references only. Do NOT add a WordPress bridge yet; that waits for the pilot test in step 8.

6. PERMISSIONS. settings.json: plan mode default. Deny Write(wp-config.php),
   Write(wp-settings.php), Bash(rm -rf *), Bash(sudo *), and anything matching
   import_settings or total_reset. Allow the MCP tools we need and safe Bash.

7. MANUAL STEPS. STOP and give me a numbered list of what only I can do. Expect at least:
     claude plugin install figma@claude-plugins-official   (then /plugin, OAuth)
     claude plugin marketplace add anthropics/knowledge-work-plugins
     claude plugin install design@knowledge-work-plugins
     claude plugin install product-management@knowledge-work-plugins
     Figma Professional Dev seat; Claude Team plan org-wide provisioning
     Breakdance Pro licence; staging server and Application Password
   Then WAIT.

8. VERIFY. After I confirm, run /mcp and report which servers connect. Run ONE read-only test
   per server. Do not perform any write until every read-only test passes.

9. REPORT. Finish with: what exists, what is pending, what you deleted, and the single next
   action. Be honest about anything you could not do or were unsure about.

CONSTRAINTS:
- Staging only. Never production. Never an agent write to a live client site.
- Do not install anything not named in the docs without asking.
- British and Australian English. No em dashes, no en dashes. No emojis.
- If the docs and your training knowledge disagree, the docs win. Say so and continue.
- If something in the docs looks wrong, say so. Do not silently work around it.
```

---

## Prompt 2: Onboard the team (once per person)

### Prompt 2a: A developer or PM (Claude Code)

```
[ROLE: Setup assistant onboarding a team member to an existing AI web design system]

OBJECTIVE: Configure THIS machine to match our agreed system exactly. The system already
exists and is documented. Do not redesign it. Match it.

READ FIRST: CLAUDE.md, docs/00_README_and_index.md, docs/25_end_to_end_lifecycle.md,
docs/06_claude_code_project_structure.md, docs/24_open_questions_answered.md

DIRECTIVES:
1. Ask which role this machine is for (Developer or Project Manager) and tailor the rest.
2. Report the environment (OS, node, npm, git, Git Bash or WSL). Flag anything missing.
3. Confirm the repo is cloned and current, and that .claude/ and .mcp.json are present from
   version control. Do NOT recreate them; they are shared and committed.
4. Create only the LOCAL, uncommitted pieces: settings.local.json and required environment
   variables. Confirm .gitignore excludes them.
5. Give me a numbered MANUAL STEPS list, then wait:
   - Claude Team seat confirmed
   - claude plugin install figma@claude-plugins-official, then /plugin and OAuth
   - claude plugin marketplace add anthropics/knowledge-work-plugins
   - claude plugin install product-management@knowledge-work-plugins
     (developers: also design@ and the Figma skills)
   - Figma Dev seat if they will use the Figma MCP
6. Verify with /mcp and one read-only test each. Report any difference from the reference
   machine as DRIFT. Do not fix drift by editing shared committed config.
7. Brief them in five lines on the lifecycle (docs/25): what their role owns, which gate they
   approve, and which skill they trigger first.

CONSTRAINTS: match the system, do not change shared config unilaterally. Staging only.
British and Australian English, no em dashes.

Finish with: ready or not ready, and any drift.
```

---

### Prompt 2b: The designer (Cowork only, no terminal, no Git)

She does not use Claude Code. Work through this with her once.

1. **Claude Desktop**, signed in on the Team seat. She works in the **Cowork** tab, never Code.
2. **Install the Design plugin** from claude.com/plugins. This gives her `/design-critique`, `/accessibility-review`, `/design-handoff`, `/design-system`, `/ux-copy`, `/user-research`, `/research-synthesis`.
3. **Install the Figma plugin** from claude.com/plugins. Needs a paid Figma Dev or Full seat. This is how Claude works on her canvas (`figma-use`, `figma-generate-design`, `figma-generate-library`).
4. **Claude Design for concepts only.** It is rate-limited (roughly 3 to 4 prompts a week on Pro) and **does not export to Figma**. Concepts inform the Figma work; they do not become it.
5. **Read two documents only**: `docs/25_end_to_end_lifecycle.md` and `docs/22_design_system_reuse_model.md`.
6. **Half a day on tokens**: Variables and collections, primitive vs semantic, aliasing, Extended Collections, Auto Layout. Then run `/design-system` on a real file and fix what it flags.

---

---

## Prompt 3: Build the agency design system base kit (once, Designer plus Dev Lead)

**This is a prerequisite for the pilot, and it is the one thing the setup prompt cannot do for you.** Prompt 1 scaffolds the repository. It cannot build a design system, because the design system lives in Figma and is a design decision, not a scaffolding task.

Without the base kit there are no token names. Without token names the Figma-to-Breakdance sync has nothing to map, and the AI has no contract to check its own output against. Everything downstream inherits this.

**Set expectations honestly.** Claude will not build this unattended, and the reason is judgement rather than tooling limits. `use_figma` is more capable than an earlier draft of this file claimed (see 26 for current, dated capabilities), but a design system is a set of decisions about a brand, and those are the designer's to make. Claude accelerates naming, scales, individual components, and auditing. Budget real design time, once, for an asset every future client build reuses.

**Read first:** `docs/22_design_system_reuse_model.md` (the model), `docs/pilot-artefacts/03_figma_component_and_naming_standard.md` (the naming standard), `docs/pilot-artefacts/02_design_system_checklist.md` (the exit gate).

### 3a. The designer builds it, in Claude Cowork

Work through this with Claude in Cowork, with the Figma plugin installed. Do it on a **duplicate file** first; `use_figma` is beta.

```
I am building our agency's shared design system base kit in Figma. It will be reused
across every client site, with only a brand theme swapped per client, so the naming is
more important than the styling.

Read our standard first and follow it exactly:
- docs/22_design_system_reuse_model.md
- docs/pilot-artefacts/03_figma_component_and_naming_standard.md

Help me build, in this order, and stop after each step so I can review:

1. THREE VARIABLE COLLECTIONS, in this tier order:
   - Primitive  (raw values, no meaning: blue-500, space-4, radius-lg)
   - Semantic   (intent, and the per-client brand knob: color.action.primary, surface.bg)
   - Component  (usage: button.bg.default, card.border)
   Semantic aliases Primitive. Component aliases Semantic. Never a raw value above tier 1.

2. THE SCALES:
   - Type scale in rem at a 16px base, roles for display, body and utility
   - Spacing scale on a strict 4pt or 8pt grid
   - Radius and elevation scales

3. THE CORE COMPONENTS, one at a time, every property bound to a token:
   Button (all states), Input, Card, Section, Container, Nav, Footer.
   Every component uses Auto Layout. Absolute positioning only for deliberate
   z-index overlaps.

4. AUDIT: run /design-system over the file and fix everything it flags. A single
   hardcoded hex or off-scale spacing value is a defect, not a detail.

Rules:
- Semantic token names are an API. Once a name ships, changing it breaks every client.
- Do not invent names. Use our standard.
- Ask me before adding a token that is not in the standard.
- British and Australian English.
```

**Then, per client:** create an **Extended Collection** that inherits the base and overrides only colour, typography family and radius. Do not fork the base. That is the whole point of the model.

**Gate:** the Design Lead approves the base kit before any client build uses it. This is the most consequential approval in the system.

### 3b. The Dev Lead mirrors it into Breakdance, in Claude Code

Once the base kit is approved, mirror it into the build target.

```
[ROLE: Design systems engineer]

OBJECTIVE: Mirror our approved Figma base kit into the Target A build layer, and record
the token contract, so the same names exist on both sides.

READ: docs/22_design_system_reuse_model.md, docs/08_breakdance_and_wordpress_plugin_stack.md,
docs/pilot-artefacts/03_figma_component_and_naming_standard.md

DIRECTIVES:
1. Extract the resolved SEMANTIC tokens from the approved Figma base kit with
   get_variable_defs. Scope calls to the collection; do not pull whole files.
2. Produce a mapping table: Figma semantic token name, resolved value, the Breakdance
   Global Settings target (Global Colours, Typography Presets), and the CSS custom
   property name. Names must be IDENTICAL on both sides. The naming bridge is the whole
   game: it is what lets the agent emit a token reference instead of a literal.
3. Flag any token with no clean Breakdance home. Do not invent a mapping. Report it.
4. Write the contract to docs/ as the canonical token reference, and generate the
   design-system rules file so every future session inherits it.
5. STOP. Show me the mapping for approval before touching any Breakdance settings.
6. On approval, apply it as a reviewed DIFFERENTIAL MERGE (never a blind
   import_settings), then clear cache and verify a page renders with the new tokens.

CONSTRAINTS: staging only; snapshot first; tokens not hex; never total_reset.
```

### 3c. Teach Claude Design the base kit (org-wide)

Claude Design can be taught a design system, so that concepting uses **our brand and our tokens** instead of generic defaults. This is the cheapest available fix for AI-looking output, and it applies to everyone: once uploaded, the system appears under **Design systems for everyone in your org**, which is exactly what the Team plan is for.

In Claude Design: **Add a design system**. Two routes are offered:

| Route | What it reads | Use it? |
|-------|---------------|---------|
| **Create here** | Connect to **Figma** or GitHub, or upload slides and assets | **Yes, via Figma.** Our source of truth is Figma |
| **Create using Claude Code** (labelled BEST FIDELITY) | Runs `/design-sync` against a code package; reads tokens and **React components** | **No, not for Target A.** We have no React components. Breakdance is not a React codebase |

**Take the Figma route.** The "BEST FIDELITY" label is real but conditional: it is best *if you have React components*, and for the Breakdance target we do not. Connecting Figma gives Claude Design the same tokens the rest of the pipeline uses, which is the point.

**Revisit for Target B.** An Astro plus Payload project has a real code token layer, so the Claude Code route may genuinely be better there. Evaluate it when the first Target B build exists, not before.

**A naming trap, already handled:** Anthropic's first-party command is `/design-sync`. Our Breakdance token skill is deliberately called **`token-sync`**. Do not rename it to `design-sync` or it will shadow Anthropic's command and break this upload. See `docs/09`.

**Re-upload when the base kit changes.** This is a snapshot, not a live link. A stale design system in Claude Design is worse than none, because it produces confidently off-brand work. Make re-upload part of the base kit's change process.

**Only build industry starters after the pilot.** A starter is the base kit plus a sector default look. Building starters on an unproven base kit means productionising a guess.

---

## What to do after the system is up, in order

1. **Run the 15-minute Breakdance write test** (`docs/24`, Section C). On a disposable staging site, have Claude Code build a real multi-section page via Novamira Pro, then open it in the Breakdance visual builder. Check it renders, that every element is still natively editable with no "unknown element" errors, and that a forced malformed write is caught. **This decides whether the Target A pipeline is viable at all.** Nothing else is worth doing until it passes.
2. **Build the agency base kit** (Prompt 3). The pilot cannot start without token names.
3. **Capture the baseline** (`docs/20`) from recent projects, so the pilot has something to compare against.
4. **Pick the pilot** (`docs/10`): a low-risk brochure site, 5 to 8 pages.

The order matters. Step 1 can invalidate the whole Target A approach, so do not invest in steps 2 to 4 before it passes.
