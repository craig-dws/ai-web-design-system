---
name: web-design
description: Give a website a real point of view and screen out the generic AI look, before any build. Use during Stage 1 concepting and whenever a design needs a critique against a brief. Runs a two-pass plan-then-critique loop, enforces token-first thinking, names the generic AI defaults to avoid, and holds a WCAG 2.2 AA quality floor. Target-neutral. Pairs with the anti-ai-design-checklist and grounded-metaphor-generation skills.
---

# Web design

Forked in spirit from Anthropic's frontend-design skill and layered with our
brand, token, and accessibility rules (docs/24, Section F). The job is to make
design decisions deliberate and checkable, so AI output is reviewable rather
than plausible slop. Design to a system, not to a page (docs/25).

Frame the work as a design lead at a studio known for giving every client a
visual identity that could not be mistaken for anyone else's.

## The two-pass loop, before any code or build

**Pass 1: plan.** Produce a compact plan, not a layout:

- A small token system: 4 to 6 named colours, 2 or more type roles, spacing
  feel, radius feel. Names only, mapped to our semantic token vocabulary
  (docs/22). Never raw hex where a token name belongs.
- Layout described in prose plus ASCII wireframes.
- A defined **signature element**: the one thing that makes this site itself.
- The hero stated as a thesis, not decoration.

**Pass 2: critique.** Critique the plan against the brief and revise anything
that reads as a generic default. Only after Pass 2 does anything get built.

## The generic AI defaults to avoid

Name and reject the looks that betray AI output:

- The warm cream plus serif plus terracotta combination.
- The near-black plus acid-green look.
- The hairline-ruled broadsheet layout.

For the full constraint set (spatial rhythm, intentional asymmetry, unexpected
hierarchy, colour nuance, constraint-driven creativity), apply the
anti-ai-design-checklist skill rather than restating it here. For a
research-grounded concept, use grounded-metaphor-generation.

## Principles to hold

- **Typography carries personality.** Choose type with intent.
- **Motion is deliberate.** Ambient animation makes work feel AI-generated.
  Reduced-motion is respected.
- **Copy is design material**, with its own rules. British and Australian
  English. No em dashes, no en dashes, no emojis in the design's copy unless the
  brand explicitly calls for them.
- **Token-first.** Every colour, type, and spacing decision references a token
  name, so a reviewer and an agent can check it. Without a token name there is no
  definition of "right" (CLAUDE.md principle 2).

## The quality floor (non-negotiable)

- Responsive at the project's defined breakpoints.
- Visible keyboard focus on every interactive element.
- Reduced-motion respected.
- WCAG 2.2 AA. Automated scans assist; a human certifies accessibility
  (CLAUDE.md).

## Build-target neutrality

This skill runs identically for Target A and Target B. It produces a point of
view and a token-named plan. How that plan becomes a running site differs by
target and is handled by the builder-builder subagent and the target's runbook.
Never bake a build target into the design plan.

## TODO (per project)

- Wire the client's own voice rules by reading its audience_style_guide.md where
  one exists. This system does not ship that file; it comes from the client's
  content set. Until present, apply the house style above.
- Confirm the project's breakpoint set from the approved Figma file before
  asserting responsive behaviour.
