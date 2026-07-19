---
name: site-brief
description: Turn a short request such as "I need a new site for BRAND" into a structured, approved project brief for a website build. Use at Stage 0 (project management), before any design work starts. Asks the clarifying questions, researches the brand and its competitors, chooses the build target, and writes the brief into the client folder. Content is a pluggable input and never blocks this skill.
---

# Site Brief

Produce the Stage 0 brief that lets a designer start work. This is a project
management artefact, not a designer artefact (see docs/25). A short trigger from
the operator becomes a structured brief plus a competitive summary.

## What this skill is for

The operator triggers this with something as short as "I need a new site for
BRAND". You ask the questions the operator may not have thought of, research the
brand and its market, and write a brief that becomes the context for every
downstream stage. Once the brief exists, prompts everywhere else can be short,
because the brief carries the context.

## Steps

1. **Confirm the client folder.** Ask for the client slug and confirm the target
   folder. One project per client site (docs/06). Never mix clients.
2. **Ask the clarifying questions**, and stop for answers:
   - Business goals and what success looks like.
   - Primary and secondary audiences.
   - The page list and rough sitemap.
   - Tone, brand personality, and any non-negotiable brand rules.
   - Named competitors and any admired reference sites.
   - Constraints: deadline, budget tier, accessibility obligations, regulated
     niche (if any).
   - Content status and source (see the content note below).
   - Assets to hand: logo, imagery, existing brand guidelines.
3. **Research**, using the research and competitive capabilities available in the
   project (for example a competitive brief and a research synthesis). Record
   sources. Do not assert unverified facts.
4. **Choose the build target** with the operator: Target A (WordPress plus
   Breakdance, the default) or Target B (Astro plus Payload). The target is
   chosen here, not mid-build (docs/02, docs/25). Record the choice and the
   reason.
5. **Write the brief** into the client folder as markdown, following the intake
   template at docs/pilot-artefacts/01_project_intake_template.md. Include the
   sitemap, the chosen target, the audience, the goals, the competitive summary,
   and the asset inventory.
6. **Stop for approval.** The brief is approved by the PM and the client before
   design starts. Design does not begin without it (docs/25, Gate: brief
   approved).

## Content is a pluggable input, never a gate

Content comes from wherever it comes: the client, ZilvaEdge, or realistic
placeholder for a pilot. No source is required and **no missing content blocks
this brief or the build** (CLAUDE.md, Content). Record which source is expected
and whether it is present, then move on. Designing against real or realistic
content is a quality recommendation where you have it, not a prerequisite. A
pilot with placeholder content is valid.

Do not build content round-trip machinery here. If the client later chooses the
ZilvaEdge path, that round-trip is handled by the content system and pulled in
by the stage-gate skill as an advisory check, not as a dependency of this brief.

## Rules

- Ask before assuming. Never invent a business goal, an audience, or a
  competitor.
- Record the build target and the content source as explicit fields.
- British and Australian English. No em dashes, no en dashes, no emojis.
- The output is a brief for humans to approve. AI proposes, humans dispose.

## TODO (knowledge to confirm per project)

- The exact client folder convention for this agency is assumed to be one folder
  per client slug. Confirm the agreed root path and record it in the project
  CLAUDE.md.
- If a regulated niche applies (for example health), confirm the compliance
  obligations that the brief must flag. This system does not yet encode those
  rules; capture them from the client and the relevant standard.
