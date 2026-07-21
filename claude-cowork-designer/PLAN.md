# Plan: the DiscoverWeb design-consistency skill for Cowork

Status: approved | Skill name: discoverweb-design-standard

## The decision

Build one self-contained Cowork skill that encodes the agency-specific design standard and audits a design against it. Ship v1 now; bundle v2 base-kit adherence checks in the same skill, dormant until the base kit exists. Provision it org-wide so the whole team is consistent.

## 1. What exists, and what was missing

The standard itself is well covered in the repository: the token model and base-kit rules (docs/22), the naming standard and banned practices (the Figma naming standard), web design best practices (docs/23 Part A), the anti-AI-look constraints (the anti-ai-design-checklist and web-design skills), and the house style (CLAUDE.md). The designer's workflow and gates are in docs/25.

What was missing: all of that reaches Claude Code only. Cowork does not read `.claude/skills`. In Cowork the designer had the generic Design plugin, the Figma plugin, and a designer-pack of snapshot documents she must remember to attach. There was no agency-specific, self-contained, auto-triggering audit skill. This skill closes that gap.

## 2. The skill

Name: discoverweb-design-standard.

Trigger: audit a Figma design, design system, or pre-handoff file against the agency standard, covering token naming, base-kit rules, banned practices, the anti-AI-look constraints, and British and Australian house style. Use during Stage 1 design-system work and before any developer handoff.

What it produces: an item-by-item PASS or FAIL report, naming the specific frame, layer, or token, mirroring the structure of the pre-handoff self-check, with a must-fix list and an accept or reject verdict.

What it encodes: the naming standard and banned practices, the three-tier token model and base-kit rules, the five anti-AI-look constraints and the named generic looks, and the house style.

What it does not rebuild: the generic checks already in Anthropic's Design plugin (`/design-system`, `/design-critique`, `/accessibility-review`, `/ux-copy`, `/design-handoff`). The skill defers to those and adds only the agency-specific layer.

## 3. Self-contained, no repository access

The skill is a folder of SKILL.md plus reference files that carry the standard as literal content, with no repository paths. The designer invokes it by name or trigger in Cowork and gives it a screenshot, a description, or her Figma canvas. It states which mode it is in and what it could not check without canvas access.

## 4. Packaging and delivery

Source of truth stays in the repository at `.claude/skills/discoverweb-design-standard/`. The Cowork copy is a packaged export. Delivery is org-wide via the admin console or the `/v1/skills` endpoint (enabled by default for everyone, which is what keeps the team consistent), with self-install in Settings, then Capabilities, then Skills as the fallback. Skills need Code Execution and File Creation enabled. Keep in step by re-issuing on every standard or base-kit change, with a version bump in SKILL.md.

## 5. Sequencing

v1, live now and independent of the base kit: naming standard, banned practices, anti-AI-look, and house style. v2, bundled and dormant: base-kit adherence (Extended Collection inherits base and overrides only colour, type family, and radius; no fork; no rename; three-tier aliasing intact). v2 switches on once the base kit is built and its token list is pasted into reference/token-model.md.

## Decisions taken in review

1. Name: discoverweb-design-standard, chosen to avoid shadowing the Design plugin's `/design-system`.
2. Both stages: v1 live, v2 bundled and dormant in one package.
3. Duplication: recommended that this skill become the single Cowork-facing carrier of the checkable standard, with the designer-pack trimmed to workflow and narrative. Flagged as a follow-up, not done in this build.
4. Delivery: org-wide provisioning, because the skill is for the whole team.
5. Output shape: mirror the numbered structure of the pre-handoff self-check.

## Known limitations, stated honestly

- Audit depth depends on the Figma plugin. Without canvas access the skill cannot verify bindings, token names, off-scale spacing, or detached instances; it falls back to visual and copy checks and says so.
- The skill is another snapshot of the standard. It must be re-issued whenever the repository standard changes, or it will enforce an old bar confidently. The follow-up in decision 3 reduces how many snapshots exist.
