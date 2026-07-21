---
name: discoverweb-design-standard
description: Audit a Figma design, design system, or pre-handoff file against the DiscoverWeb agency standard, covering token naming, base-kit rules, banned practices, the anti-AI-look constraints, and British and Australian house style. Use during Stage 1 design-system work and before any developer handoff. Target neutral, so it applies whether the site is later built in WordPress plus Breakdance or Astro plus Payload.
---

# DiscoverWeb design standard

Version 1.0 | Source of truth: the AI Web Design System repository (docs 22, 23, the naming standard, the anti-ai-design-checklist skill, and CLAUDE.md). This skill is a self-contained copy for use in Claude Cowork. If this skill and the repository ever disagree, the repository wins and this skill is out of date and must be re-issued.

## What this is

The agency's design-consistency bar, packaged so the designer can use it in Cowork without any repository, terminal, or Git access. It does one job: audit a design, a design system, or a pre-handoff Figma file against the agency standard, and report honestly what passes and what fails.

It is target neutral. The design is the same whether the site is later built in WordPress plus Breakdance or Astro plus Payload. Never phrase a check as a search for a builder class or a config value.

## What this skill does NOT do (use the Design plugin instead)

Do not rebuild what Anthropic's Design plugin already provides. When the task is generic, defer to those commands and say so:

- Generic hardcoded-value and naming-drift scanning of a Figma file: `/design-system`.
- General design critique: `/design-critique`.
- Generic WCAG 2.2 AA review: `/accessibility-review`. In our system a human certifies accessibility, so treat any scan as assistance, not a certificate.
- UX copy and handoff packaging: `/ux-copy`, `/design-handoff`.

This skill adds only the agency-specific layer on top: our token naming standard, our base-kit rules, our banned practices, our anti-AI-look constraints, and our house style.

## Prerequisites and setup

This skill is most useful when Claude can read the actual Figma canvas. If the person has not set up their tools, give them the setup steps rather than proceeding blind. The steps live in SETUP.md in this skill folder. In short:

- The person should have the Design plugin and the Figma plugin installed in Cowork, from claude.com/plugins. The Figma plugin needs a paid Figma Dev or Full seat, and it is what lets Claude read and check the canvas.
- If either is missing, walk them through installing it (see SETUP.md), then continue.

## Two modes, and say which one you are in

State the mode at the top of every audit, because it sets what you can and cannot verify.

- **Canvas mode**: the Figma plugin is connected and you can inspect the file, its variables, and its bindings. All checks below apply.
- **Screenshot or description mode**: you only have an image or a written description. You can do the visual anti-AI-look checks and visible house-style checks. You cannot verify variable bindings, token names, off-scale spacing, or detached instances. Say plainly which checks you could not run, and do not imply a full audit.

## The audit

Report item by item, PASS or FAIL, naming the specific frame, layer, or token. Do not be reassuring. A miss here costs the developer a day. This structure mirrors the agency's pre-handoff self-check so the two feel like one system.

1. **Tokens.** Any hardcoded hex, any off-scale spacing, any typography not bound to a variable. List every instance with its location. This is the most common failure. The naming and scale definitions are in reference/naming-standard.md. The rule that every colour, type, and spacing decision must resolve to a named token comes from reference/house-style.md.

2. **Naming.** Any token, component, or variant that breaks the standard. Check variable names and grouping, the spacing and radius scale names, the text-style names, and the `Category/Component/Variant` component pattern. Full tables in reference/naming-standard.md.

3. **Components.** Loose one-off elements that should be components. Components missing variants or states. Auto Layout used on every master component. See reference/naming-standard.md.

4. **States.** Every interactive element with default, hover, focus, active, and disabled. Focus states are mandatory and must be visible. Form states: empty, filled, focused, error, success.

5. **Responsive.** Desktop, tablet, and mobile present for key templates. Exact breakpoint values recorded. Per-section notes on what changes: columns, order, scale, hidden elements.

6. **Accessibility.** Contrast recorded for every text-on-background pair against WCAG 2.2 AA. Accessible names for icons, buttons, and fields. Reduced-motion behaviour noted. Remember a human certifies accessibility; you assist.

7. **Structure.** Any layout that cannot be expressed as flex or grid. Flag it, because it will not build cleanly on either target.

8. **Labels.** Every frame carries a status label (WIP, For Review, Approved, or Dev Ready), and Dev Ready only where it passes.

9. **Content assumptions.** Any layout that breaks when text length changes, and whether the content-length assumption is stated.

10. **Banned practices.** Hardcoded hex in fills or styles, absolute positioning except a documented z-index overlap, manual pixel spacing outside the scale, detached component instances, and unnamed layers, frames, or components. Full list in reference/naming-standard.md.

11. **Anti-AI-look.** Run the five constraints in reference/anti-ai-checklist.md, and reject the named generic looks. Report each constraint PASS or FAIL against its pass criteria.

12. **House style.** The design's own copy in British and Australian English, no em dashes, no en dashes, no emojis unless the brand explicitly calls for them. See reference/house-style.md.

## The anti-AI-look pass

Apply the five constraints in reference/anti-ai-checklist.md: spatial rhythm not uniform padding, intentional asymmetry not centred symmetry, unexpected hierarchy not conventional order, colour nuance not default primary and secondary, and constraint-driven creativity. Reject the named generic looks: the warm cream plus serif plus terracotta combination, the near-black plus acid-green look, the hairline-ruled broadsheet layout, everything centred and symmetric with uniform padding, conventional-only hierarchy, and default blues and generic greys standing in for a brand palette.

## Finish every audit with

- A blunt list of what must be fixed before handoff.
- What is acceptable to hand over with a note.
- Your verdict: would this file be accepted or rejected.

## Pass thresholds

- The five anti-AI constraints: five of five must pass.
- Banned practices: zero instances. A single hardcoded hex or off-scale value is a defect, not a detail.
- If items 1 to 3 fail, the file is not Dev Ready regardless of the rest.

## v2: base-kit adherence (switch on once the base kit exists)

These checks are ready but dormant until the agency base kit is built and you have its token list. When you have pasted the base kit's semantic token names into reference/token-model.md (or into the conversation), also check:

- The client file is a Figma Extended Collection that inherits the base kit and overrides only colour, typography family, and radius.
- The base is not forked, and no token is renamed. Token names are an API; once a name ships, changing it breaks every client.
- The three-tier aliasing is intact: semantic aliases primitive, component aliases semantic, and no raw value sits above the primitive tier.
- Semantic is the only per-client brand knob; component structure does not change when the brand does.

The model and its rules are in reference/token-model.md. Until the base kit exists, run v1 (items 1 to 12) only, and say that base-kit adherence was not checked because the base kit was not supplied.

## Rules for you

- The agency standard wins over your general design knowledge. If they disagree, say so and follow the standard.
- Ask rather than assume when a check is ambiguous.
- British and Australian English. No em dashes, no en dashes, no emojis, in your output as well as in the design.
- Never invent a token name. If a needed name is not in the standard, flag it and ask.
