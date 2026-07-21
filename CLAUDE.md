# Project Constitution: AI Web Design System

Version 0.3 | 17 July 2026 | Owners: Dev Lead and Design Lead

This file holds **constraints**. The detail lives in `docs/`. If this file and `docs/` disagree, raise it rather than guessing. If `docs/` and your training knowledge disagree, `docs/` wins.

Keep this file under roughly 10,000 tokens. Anything longer belongs in `docs/` with a link from here.

## What this is

The agency's system for taking a website from brief to launch using AI, with a human approving every gate.

**This repository is the system, not a website.** No client work lives here. Each client site is its own project with its own Claude Code instance (`docs/06_claude_code_project_structure.md`).

## Build targets are a first-class axis

Every rule below states which target it applies to. Nothing in this system may structurally exclude a target.

| Target | Stack | Status |
|--------|-------|--------|
| **A** | WordPress plus Breakdance | **Default.** The agency's chosen builder |
| **B** | Astro plus Payload CMS | For performance-led, code-owned builds |

**Shared front-half, target-specific back-half.** Brief, research, creative direction, design system and token extraction are identical regardless of target. Only the build differs. Never write a front-half skill that assumes a target.

## Core principles

1. **AI proposes, humans dispose.** No AI output is approved by AI. Every gate has a named human owner. This rule outranks every other consideration.
2. **Design to a system, not to a page.** Tokens are the contract that makes AI output checkable. Without a token name there is no definition of "right" for an agent or a reviewer to check against.
3. **Token first, one page at a time, verified.** Reference token names, never raw values. Build one page per operation. Diff the result against the design.
4. **Adopt before building.** Anthropic's design and product-management plugins, the Figma skills, and ZilvaEdge's existing agents already cover a great deal. Do not rebuild what exists.
5. **Capabilities, not vendors.** Skills call a capability ("build this page", "write tokens"), never a vendor tool name directly. The layout-write vendor must stay swappable.

## Hard rules

### Applies to all targets

- **Never touch production with an agent.** Staging only. Promotion to production is a human, backed-up action.
- **Snapshot before every agent write** that can affect a database or a live file. A vendor's rollback is a convenience; our backup is the safety net.
- **No secrets in committed files.** Environment variable references only. Application Passwords, licence keys and API keys never enter version control.
- **One Claude Code project per client site.** Never share a project across clients. Context must not bleed between clients.
- **No client work in this repository.**
- **Accessibility is certified by a human.** WCAG 2.2 AA. Automated scans assist; they do not certify.

### Target A: WordPress plus Breakdance

- **Breakdance 3.0 (beta) introduces a first-party MCP that writes layouts.** This is new (July 2026) and it changes the central risk: the write path may finally be vendor-owned rather than reverse-engineered. **But it is Beta 1 and unproven.** Until it reaches a stable release with published requirements and has passed our own write test, treat it as promising, not settled. Test the native MCP FIRST; it is the preferred path if it works. See `docs/24` and `docs/26`.
- **The 2.x position still applies as the fallback:** on 2.x, or if the native 3.0 MCP fails our test, any agent that writes layout is reverse-engineering the `_breakdance_data` postmeta tree through a third party (Novamira or Respira). That is managed risk, not a wished-away one.
- **Pin the Breakdance version** on client staging, on either path. A Breakdance point release has already broken a third-party write path completely (2.8.0, June 2026), and a beta feature can change under you. Treat a Breakdance update as a change that requires re-testing the write path before it touches client work.
- **Never write raw PHP layout files.** Breakdance ignores them and it is a security risk.
- **Never run a blind `wp breakdance import_settings`.** It overwrites the entire configuration. Differential merge only, with the diff reviewed.
- **Never run `wp breakdance total_reset`** in any automated path.
- **Always clear cache after a database write**: `wp breakdance clear_cache`, and `wp litespeed-purge post_id <id>` on LiteSpeed. `wp post meta update` does not fire `save_post`, so LiteSpeed will not purge itself and the site will silently serve stale values.

### Target B: Astro plus Payload

- **Tokens live in code**, never in Payload. Payload holds content only.
- **Schema changes are code and require review.** Migrations are never applied silently.
- **Prefer the Payload admin API over direct database writes.**

## Source of truth

| Information | Authority |
|-------------|-----------|
| Requirements and scope | The signed brief; changed only by approved change request |
| Design, before handoff | The approved Figma file |
| Design tokens | The version-controlled token specification |
| **Content, before launch** | **The Google Doc**, once the human editor has revised it. The local markdown is stale until pulled. This covers design, build, and UAT |
| **Content, after launch** | **The live Breakdance site.** Authority transfers at launch. New post-launch content restarts the editorial cycle (ZE, Doc, editor, pull) |
| Implementation, after handoff | The build (Breakdance on staging, or the repository for Target B) |
| AI instructions | This file plus the project's context pack |
| Decisions | `docs/24_open_questions_answered.md` and the decision log |

**Authority transfers at gates, never silently.** Figma leads until handoff; the build leads after. If it changes the design it goes back to Figma; if it changes the content it happens in the content system.

## Content

**Content is a pluggable input from any source. It does not block anything.** The system accepts content from wherever it comes: client-supplied, written in ZilvaEdge, or realistic placeholder for a pilot. No source is required, and no content source is a dependency of the build.

**Recommended, not required: design against real or realistic content where you have it.** Designing against final content beats lorem ipsum, because pouring real copy into a placeholder layout later can break it. This is advice that improves quality, not a gate that stops work. A pilot with placeholder content is perfectly valid.

**ZilvaEdge is one optional content source, not part of the pipeline.** If you choose to source content from ZE, the flow is: ZE writes markdown, it is published to a Google Doc, the human editor edits the Doc, and the Doc is pulled back to markdown before use (see 13, 24). If you do not use ZE, none of that applies and nothing is missing. The content round-trip is a convenience for the ZE path only; it is never a prerequisite for building.

**"Launch" is the single transfer point. There is no separate "publish" event for authority purposes.** Publishing a Doc does not transfer authority; launching the site does. Before launch the Doc wins; after launch the live site wins.

**This includes UAT.** UAT happens before launch, so **UAT copy fixes go in the Doc and are pulled into staging**, not typed onto the staging site. Typing them onto staging means the next pull silently discards the client's accepted changes. Record the reviewed content revision at the UAT gate.

**ZilvaEdge integration is a content seam, not code coupling.** ZE owns content and its quality gates. This system consumes approved markdown. Neither imports the other.

## Roles and gates

| Role | Tool |
|------|------|
| Project Manager | Claude Cowork, and Claude Code where it helps. Does not need a terminal, but is not barred from one |
| Designer | Figma (source of truth) plus Claude Cowork. **Never needs Claude Code or Git** |
| Developer | Claude Code (CLI or VS Code) |

Gates in full: `docs/12`. The most important and most-skipped gate is **design system approval** (Design Lead), because everything downstream inherits it.

## Prohibitions

1. No agent writes to production, on any target.
2. No AI output ships unreviewed.
3. No client work in this repository.
4. No secrets in committed files.
5. No raw PHP layout files (Target A).
6. No blind settings import or `total_reset` (Target A).
7. No hardcoded colour, type or spacing values where a token exists.
8. No skill that assumes a build target in the shared front-half.
9. No vendor tool name hardcoded in a skill; call the capability.
10. No automatic content sync that can overwrite local work.
11. No new script in ZilvaEdge without the operator's approval; extend an existing one with a flag first.

## House style

British and Australian English. No em dashes, no en dashes, no double hyphens in prose (CLI flags in code are fine). No emojis. Internal documentation, so tool names, paths and code are used freely.

## Where the detail lives

| Need | Document |
|------|----------|
| Index and reading order | `docs/00_README_and_index.md` |
| What is verified vs unproven | `docs/01_current_state_findings_and_claims_to_verify.md` |
| Architecture and the two targets | `docs/02_recommended_minimum_architecture.md` |
| The lifecycle (PM, Design, Develop, UAT) | `docs/25_end_to_end_lifecycle.md` |
| Live decisions and their reasoning | `docs/24_open_questions_answered.md` |
| Design-system reuse across clients | `docs/22_design_system_reuse_model.md` |
| Skills, agents, commands, hooks | `docs/09_skills_agents_commands_hooks.md` |
| Prompts, including setup | `docs/14_prompt_library.md` |
| Build runbooks | `docs/19` (Target A), `docs/19b` (Target B) |
| Best practices | `docs/23_best_practices.md` |
