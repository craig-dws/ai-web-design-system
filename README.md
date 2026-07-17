# AI Web Design System

The agency's system for taking a website from brief to launch using AI, with humans approving every gate.

This repository is **the system, not a website**. No client work lives here. Client sites are their own projects (see `docs/06_claude_code_project_structure.md`: one Claude Code project per client site, the isolation is the point).

## Start here

1. **`docs/00_README_and_index.md`** — the document index and reading order.
2. **`docs/01_current_state_findings_and_claims_to_verify.md`** — what is verified, what is corrected, what is still unproven. Read before trusting any tooling claim.
3. **`docs/25_end_to_end_lifecycle.md`** — the team-facing lifecycle (PM, Design, Develop, UAT).
4. **`docs/24_open_questions_answered.md`** — the live decisions and their reasoning.

## What this system is

- **Shared front-half, target-specific back-half.** Brief, research, creative direction, design system and token extraction are the same regardless of what the site is built in. Only the build differs.
- **Build target A: WordPress plus Breakdance.** The agency's chosen default.
- **Build target B: Astro plus Payload CMS.** For performance-led, code-owned builds.
- **Design to a system, not to a page.** Tokens are the contract that makes AI output checkable. Without them there is no definition of "right" for a reviewer or an agent to check against.
- **AI proposes, humans dispose.** No AI output is approved by AI. Every gate has a named human owner.

## Repository layout

| Path | Purpose |
|------|---------|
| `docs/` | The system specification. The numbered docs are the source of truth |
| `docs/pilot-artefacts/` | The lean templates the pilot needs (intake, handover contract, QA checklist, and so on) |
| `docs/research/` | The original source research the system was built from |
| `_ported-for-review/` | Assets carried over from the retired Starter-Websites experiment. **Not live.** See below |
| `.claude/` | Skills, agents, commands and hooks (to be built) |

## `_ported-for-review/` (read this before using anything in it)

These assets were rescued from the `Starter-Websites` experiment before it was retired. They are **not wired in and not trusted yet**. Most date from November 2025 and predate the current system, so they need review and updating before promotion into `.claude/`.

| Ported | Why it was kept | Status |
|--------|-----------------|--------|
| `agents/design/creative/` | The creative pipeline: metaphor research, metaphor grounding, differentiation verification. Pre-code, design-intent, target-neutral, and already exercised on real work. This is the differentiation layer | Review, then promote |
| `skills/design/` | `anti-ai-design-checklist`, `grounded-metaphor-generation`, `creative-meta-prompting`, `agentic-rag-methodology` | Review, then promote |
| `agents/website/` | SEO, accessibility, AI-readiness, performance and security auditors. They inspect rendered output, so they work against a Breakdance staging URL as readily as an Astro build | Review, then promote |
| `agents/research/` | Stack-neutral research agents | Review, then promote |
| `agents/figma-build-orchestrator.md` plus `skills/figma/` | The 2-phase Figma discipline: extract tokens once, lock them, never re-extract, gate before build. **Port the idea, rewrite the implementation** — the current emitter writes `tailwind.config.cjs`, which means nothing to Breakdance Global Settings | Rewrite per target |
| `skills/project-constitution-management/` | Keeps a constitution honest and under a token ceiling. Target-neutral and genuinely reusable | Review, then promote |
| `packages/seo-utils/` | Tested TypeScript emitting JSON-LD, including `medical-schema.ts`. The best-engineered code from the old repo | Needs a target wrapper |
| `reference/Squad_Analysis_Report_Figma_Fidelity_Diagnosis.md` | The post-mortem that produced the 2-phase discipline. Explains 30 to 40% accumulated fidelity loss. Keep as rationale | Reference only |

Nothing in `_ported-for-review/` should be treated as current until it has been reviewed against `docs/`. Where the two disagree, `docs/` wins.

## Provenance

Superseded the `Starter-Websites` experiment (an Nx/pnpm Astro monorepo whose constitution explicitly prohibited WordPress, which made it unable to host this system). The system specification moved here intact; the Astro site factory was retired.

## House style

British and Australian English. No em dashes, no en dashes, no double hyphens in prose. No emojis. Internal documentation, so tool names, paths and code are used freely.
