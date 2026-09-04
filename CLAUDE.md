# Project Constitution: AI Web Design System

Version 0.5 | 26 July 2026 | Owners: Project Manager and Dev Lead

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

1. **AI proposes, humans dispose.** No AI output is approved by AI. Every gate is approved by a human before the next stage builds on it. Recording who approved is optional; the approval itself is not. This rule outranks every other consideration.
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
| **Content, during the build** | **The site being built.** The client reviews and signs off the built site, so that is the approval artefact. The Doc delivers ZilvaEdge's copy onto the site; it does not govern it afterwards. This covers design, build, and UAT. New pages and sections are requested from ZilvaEdge |
| **Content, after launch** | **The live Breakdance site.** The client owns it in Client Mode from launch. New post-launch content restarts the editorial cycle (ZE, Doc, editor, pull) |
| Implementation, after handoff | The build (Breakdance on staging, or the repository for Target B) |
| AI instructions | This file plus the project's context pack |
| Decisions | `docs/24_open_questions_answered.md` and the decision log |

**Authority transfers at gates, never silently.** Figma leads until handoff; the build leads after. If it changes the design it goes back to Figma; if it changes copy already on the site it happens on the site; if it needs new copy, a new page or a new section it is requested from ZilvaEdge.

## Content

**Content is a pluggable input from any source. It does not block anything.** The system accepts content from wherever it comes: client-supplied, written in ZilvaEdge, or realistic placeholder for a pilot. No source is required, and no content source is a dependency of the build.

**Recommended, not required: design against real or realistic content where you have it.** Designing against final content beats lorem ipsum, because pouring real copy into a placeholder layout later can break it. This is advice that improves quality, not a gate that stops work. A pilot with placeholder content is perfectly valid.

**ZilvaEdge is one optional content source, not part of the pipeline.** If you choose to source content from ZE, the flow is: ZE writes markdown, it is published to a Google Doc, the human editor edits the Doc, and the Doc is pulled back to markdown before use (see 13, 24). If you do not use ZE, none of that applies and nothing is missing. The content round-trip is a convenience for the ZE path only; it is never a prerequisite for building.

**"Launch" is the single transfer point. There is no separate "publish" event for authority purposes.** Publishing a Doc does not transfer authority; launching the site does. What transfers at launch is who owns the site copy and how new content is made: before launch the build team maintains it on staging, after launch the client owns it in Client Mode and new content restarts the editorial cycle. The Doc is refreshed at launch so ZilvaEdge's records match the launched site.

**This includes UAT.** The client reviews the staging site, so **UAT copy fixes are made on the site.** That is the artefact they are signing off, and the build team can act on the feedback directly. Anything larger than a fix, a new page or a new section, is requested from ZilvaEdge. Record the reviewed site state at the UAT gate. A release cannot silently undo those fixes: ZilvaEdge refuses to release a page that has changed in the website repo since it last released it, and an overwrite needs an explicit `--allow-overwrite`.

**ZilvaEdge integration is a content seam, not code coupling.** ZE owns content and its quality gates. This system consumes approved markdown. Neither imports the other.

## Roles and gates

| Role | Tool |
|------|------|
| Project Manager | Claude Cowork, and Claude Code where it helps. Does not need a terminal, but is not barred from one |
| Designer | Figma (source of truth) plus Claude Cowork. **Never needs Claude Code or Git** |
| Developer | Claude Code (CLI or VS Code) |

Gates in full: `docs/12`. The most important and most-skipped gate is **approving the design system** before anything is built on it, because everything downstream inherits it. The design is approved before handoff to the build; anything the build then derives (tokens, responsive scale) is approved before pages are built on it.

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
11. No new script in ZilvaEdge without the operator's approval; extend an existing one with a flag first. Exception, 2026-08-19: where an approved plan names the new file, create it. The plan naming it is the approval, and reuse-by-default otherwise drives an agent to edit a live collector rather than add a new one.
12. No class without a scope prefix, and no prefix that lies. `sw-` sitewide, `gb-` global block, `wg-` widget, `pg-` page only, `sc-` section only. Widening a class's reach is a rename (`docs/28`).

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
| Class naming convention | `docs/28_class_naming_convention.md` |

## Talking to the operator

Explain the terms below in plain words the first time each appears in a reply. This applies to conversation in the terminal. The documents in `docs/` keep their existing vocabulary.

| Term | Say this instead |
|------|------------------|
| Target A / Target B | WordPress plus Breakdance / Astro plus Payload |
| tokens | the named colour, type and spacing values the design is built from |
| gate | the point where a human approves before the next stage starts, and name which one |
| postmeta, `_breakdance_data` | where WordPress stores the page layout in the database |
| MCP | the connection that lets Claude drive another tool |
| UAT | the client's review of the staging site before launch |
| ZE | ZilvaEdge, the content system |
| Client Mode | the restricted Breakdance editing mode the client gets at launch |
| WCAG 2.2 AA | the accessibility standard, certified by a person |

Always say which build target a statement applies to. Most rules here apply to one target and not the other, and a reader cannot tell which unless it is said.
