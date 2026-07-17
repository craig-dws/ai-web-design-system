# AI Web Design System v0.1: Pilot Implementation Plan

Document 10 of the AI Web Design System v0.1 series.
Audience: Agency PMs, Dev Lead, Design Lead.
Status: Internal working document.

## Purpose

This plan defines a single, low risk pilot to test whether the AI assisted web design pipeline (Claude Code plus Figma MCP plus a build target) produces end to end quality gains, not just faster first drafts. The pilot runs in phased maturity so that human control tightens where the risk is highest, and so that we can abort at any phase boundary without harming a live client site.

## Which build target the pilot uses

The system supports two build targets (see 02): Target A, WordPress plus Breakdance plus Novamira, and Target B, Astro plus Payload. Phases 1 and 2 below are identical for both. Phases 3 and 4 are written for Target A, because its supervised write path into Breakdance is the riskier one and is what the pilot most needs to prove. For a Target B pilot, replace the Breakdance write activities in Phases 3 and 4 with the code and content work in 08b: token sync into the Tailwind or CSS layer, Payload content modelling, and one Astro page built per review cycle. There is no Novamira and no `_breakdance_data` write on Target B, so its Phase 3 and 4 rollbacks are ordinary Git reverts plus a Payload content restore rather than a postmeta restore.

Run the first pilot on one target only. Recommended: run a Target A pilot first if a client needs visual self-editing, or, following the sequencing note in 18, run an early Target A pilot with no Novamira (front-half only) or a Target B pilot to prove the shared front-half before switching on the riskiest write capability.

## The stack under test

| Component | Role in pilot | Notes |
|-----------|---------------|-------|
| Claude Code (local) | Orchestrator and operator interface | Runs on the operator machine |
| Figma MCP (remote, https://mcp.figma.com/mcp) | Reads design context and tokens from Figma | Professional Dev seat about US$12 per month per operator |
| Breakdance Pro (WordPress) | Page builder and delivery target | No REST API for layouts; treat DB writes with care |
| Novamira (WP MCP server plugin) | Lets Claude Code operate WordPress and Breakdance | Very young (about 3 to 4 months old); dev and staging only |
| WordPress 7.0 "Armstrong" | Platform | Application Passwords require HTTPS |

Treat Novamira as early stage. Its sandbox is not a security boundary, the dev and staging only rule is policy and not enforced by the plugin, and abilities can be domain locked with a safe mode kill switch. A frequently cited 30-second PHP execution cap is unverified against Novamira's own docs, so do not rely on it as a control. Never point it at production during the pilot. This row applies to Target A only; a Target B pilot has no Novamira.

## Pilot candidate selection

Choose a small brochure site of 5 to 8 pages with these characteristics:

- New build or a full rebuild, so there is no live traffic to disturb.
- A cooperative internal or friendly client, ideally an agency owned or low stakes project.
- A conventional information architecture (Home, About, Services, one or two service detail pages, Contact, plus one or two supporting pages).
- No e commerce, no membership, no complex integrations.
- A flexible deadline with at least one week of slack.

If no external low risk client is available, run the pilot on an agency marketing microsite so that all learnings are captured without client exposure.

## Prerequisites (all must be complete before Phase 1 entry)

1. Tooling installed and verified per document 19 (Claude Code, Figma plugin OAuth complete, Breakdance Pro licensed, Novamira installed on staging with an Application Password).
2. Staging provisioned over HTTPS with PHP 8.3 and WordPress 7.0. If HTTPS is unavailable on a local build, set `define('WP_ENVIRONMENT_TYPE','local')` so Application Passwords function.
3. Baseline captured per document 20 (averages from 3 to 5 recent comparable projects).
4. Scorecard prepared per document 11 with targets and pass, watch and fail bands agreed.
5. Pilot artefacts folder created and populated (see below).
6. A named operator, Design Lead, Dev Lead and PM assigned, and a review slot booked for each phase gate.

## Pilot artefacts folder

The **templates** live in `docs/pilot-artefacts/` in this repository. The **filled-in copies** for a real pilot live in the client's own project, never here, because this repository holds no client work (see CLAUDE.md).

Copy the templates you need into the client project at the start of the pilot, so the review has one source of truth per engagement.

Expected contents:

- `client_brief.md` (scope, pages, brand, content sources).
- `figma_file_link.md` (Figma file URL and frame naming convention).
- `design_tokens.md` (agreed colour, type, spacing and radius tokens).
- `breakdance_global_settings_backup/` (exported settings and postmeta backups).
- `scorecard.md` (working copy of document 11 for this pilot).
- `baseline.md` (working copy of document 20 output).
- `issue_and_exception_log.md` (lightweight running log during the build).
- `decisions_and_failures_log.md` (the richer capture record; see document 21).

## Phased maturity

Each phase has an objective, entry criteria, activities, human gates, exit criteria and a rollback path. AI authority increases only after the prior phase passes its gate.

### Phase 1: AI for research and planning only

- **Objective**: Use AI to accelerate discovery, sitemap and content planning. No design output, no build output.
- **Entry criteria**: All prerequisites complete. Pilot candidate confirmed.
- **Activities**: Competitor and reference research, sitemap draft, page by page content outline, component inventory, accessibility and performance targets defined.
- **Human gates**: Design Lead and PM sign off the sitemap and content plan. Dev Lead confirms the component inventory is buildable in Breakdance.
- **Exit criteria**: Approved sitemap, approved content plan, approved component inventory recorded in the artefacts folder.
- **Rollback**: None required; this phase produces documents only. If quality is poor, revert to fully manual planning and record the reason in document 21.

### Phase 2: Claude Design previews and Claude Code token extraction and planning

- **Objective**: Designers use Claude assisted previews to explore layout options; developers use Claude Code to extract Figma tokens and produce a build plan. No writes to WordPress yet.
- **Entry criteria**: Phase 1 exit met. Figma file exists with named frames per the convention.
- **Activities**: Generate design previews for review; scope `get_design_context` to individual frames (never a whole page) to avoid token overflow; extract tokens; draft the token to Breakdance mapping; produce the build plan.
- **Human gates**: Design Lead approves the visual direction. Dev Lead approves the token mapping and build plan.
- **Exit criteria**: Approved token map and build plan in the artefacts folder. Zero unresolved token conflicts.
- **Rollback**: Discard AI previews and proceed with manual design. No system state changes to undo.

### Phase 3: AI generates Breakdance global settings and one page under full human review

- **Objective**: First controlled write to staging. AI generates Breakdance global settings (the token layer) and builds a single page (the homepage).
- **Entry criteria**: Phase 2 exit met. `_breakdance_data` postmeta and current global settings backed up to the artefacts folder.
- **Activities**: Export current Breakdance settings; apply a differential merge of the new tokens; import; run `wp breakdance clear_cache`; confirm status; generate the homepage; full human review of both settings and page.
- **Human gates**: Dev Lead reviews every settings change line by line before acceptance. Design Lead reviews the rendered homepage against the Figma frame. PM confirms scope adherence. No change is accepted without this triple sign off.
- **Exit criteria**: Homepage matches the approved design within agreed tolerance, global settings verified, no console or accessibility regressions on the page.
- **Rollback**: Restore global settings from the backup, restore `_breakdance_data` postmeta, run `wp breakdance clear_cache`, and rebuild the homepage manually. Record the trigger in document 21.

### Phase 4: AI generates subpages under review

- **Objective**: Scale generation to the remaining pages, keeping human review on every page.
- **Entry criteria**: Phase 3 exit met and stable.
- **Activities**: Generate subpages one at a time or in small batches; back up before each batch; review each page against its Figma frame and content outline; run QA and accessibility per page.
- **Human gates**: Design Lead and Dev Lead review each subpage before acceptance. PM tracks effort and rework against the scorecard.
- **Exit criteria**: All pages built, reviewed and accepted; full site QA and accessibility pass complete; scorecard populated.
- **Rollback**: Restore the affected page or batch from backup, run `wp breakdance clear_cache`, and rebuild manually. Record in document 21.

## Suggested timeline

A 4 to 6 week window is realistic for a first pilot including setup and review overhead.

| Week | Focus | Key output |
|------|-------|------------|
| 1 | Prerequisites, tooling, staging, baseline capture | Environment verified; baseline recorded |
| 2 | Phase 1 research and planning | Approved sitemap and content plan |
| 3 | Phase 2 previews and token extraction | Approved token map and build plan |
| 4 | Phase 3 global settings and homepage | Homepage accepted under full review |
| 5 | Phase 4 subpages | Remaining pages built and reviewed |
| 6 | QA, accessibility, scorecard, pilot review | Scorecard complete; go or no go recommendation |

Compress to 4 weeks only if the site is at the small end (5 pages) and the team is already tooled up.

## Roles

| Role | Responsibility in the pilot |
|------|------------------------------|
| PM | Owns the plan, the timeline, scorecard tracking and the pilot review; guards scope |
| Design Lead | Owns design direction, Figma frames and visual review at every gate |
| Dev Lead | Owns tooling, all WordPress and Breakdance writes, backups and technical review |
| Operator | Runs Claude Code sessions, prompts and captures outputs into artefacts |

The operator may be the Dev Lead during the pilot. Keep a second person familiar with the pipeline to reduce key person reliance (tracked as an AI specific metric in document 11).

## Pilot success criteria

Declare the pilot a success if, measured against the baseline in document 20 and the bands in document 11:

- End to end delivery effort (design plus dev plus PM hours) falls, or holds while quality improves.
- Pre launch and post launch defects do not increase, and design versus build mismatches fall.
- Accessibility (WCAG AA) and performance (Core Web Vitals) targets are met.
- Token and component adherence is at or above the agreed threshold.
- Designer, developer and client satisfaction hold or improve.
- No production incident and no unrecoverable data loss occurred.

## Pilot abort criteria

Abort the pilot, revert to manual delivery and record the reason in document 21 if any of these occur:

- A phase gate fails twice for the same root cause.
- AI output requires major correction on more than half of generated pages.
- A Novamira write causes data loss that backups cannot cleanly recover.
- The pipeline points at or affects production at any time.
- Total effort exceeds the manual baseline by more than an agreed margin with no offsetting quality gain.
- Key person reliance means the pipeline cannot run without one specific individual and that cannot be mitigated within the pilot.

Aborting is a valid and useful outcome. The decisions and failures log (document 21) captures why, and feeds directly into system v0.2.
