# Build the Agency Design System Once

Complete this only if the shared agency design system does not already exist.

The agency design system is the reusable foundation for every client. Client identity is added later by extending the shared system, not by rebuilding it.

## Before starting

The Designer needs:

- a safe Figma practice file or a duplicate working file
- the Design and Figma plugins connected in Cowork
- the DiscoverWeb design-standard skill enabled
- `reference/01_DESIGN_SYSTEM_RULES.md`
- `reference/02_DESIGN_QUALITY_STANDARD.md`
- `reference/03_DESIGN_SYSTEM_CHECKLIST.md`

## What to build

1. Primitive variables for raw colour, spacing, radius and elevation values.
2. Semantic variables describing intent, such as `color/brand/primary` and `color/text/body`.
3. Component variables describing usage, such as `button/background/default`.
4. A type scale based on a 16px root.
5. A spacing scale based on a consistent 4pt or 8pt grid.
6. Core components with Auto Layout, variants and interaction states.
7. A documented naming and status system.

## Cowork prompt

Connect the working Figma file and paste:

```text
Help me build the shared agency design system in Figma. Read these files first:
- reference/01_DESIGN_SYSTEM_RULES.md
- reference/02_DESIGN_QUALITY_STANDARD.md
- reference/03_DESIGN_SYSTEM_CHECKLIST.md

Work in this order and stop after each numbered step for Designer review:

1. Propose the complete variable architecture using three collections:
   Primitive, Semantic and Component. Use the forward-slash naming standard exactly.
   Semantic variables must alias Primitive variables. Component variables must alias
   Semantic variables. Do not place a raw value above the Primitive collection.

2. Propose the type, spacing, radius and elevation scales. Explain the purpose of each
   step and flag any value outside the agreed scale.

3. Build or help me build these core components one at a time using Auto Layout:
   Button, Input, Card, Section, Container, Navigation and Footer. Include all relevant
   variants and states.

4. Check naming, bindings, resizing behaviour and content resilience. Report every
   hardcoded value, detached instance, unnamed layer and off-scale spacing value.

5. Run the DiscoverWeb design-standard skill and the Design plugin's design-system
   audit. Treat the results as review evidence, not approval.

6. Complete reference/03_DESIGN_SYSTEM_CHECKLIST.md with PASS or FAIL and exact Figma
   locations. Do not mark the system ready while any mandatory item fails.

Before changing the Figma file, show the proposed action and wait for my confirmation.
Do not invent a token name that is not covered by the standard. Ask me first.
If the available Figma access cannot perform an approved action, give me the exact manual
Figma steps and wait while I complete them. Do not claim the action was completed.
```

## Final checks

- [ ] All three variable collections exist and alias correctly
- [ ] Forward-slash naming is consistent
- [ ] No hardcoded colour, typography or spacing values remain
- [ ] Core components use Auto Layout
- [ ] Required variants and states exist
- [ ] Desktop, tablet and mobile behaviour is documented
- [ ] The DiscoverWeb audit has no unresolved mandatory failure
- [ ] The Designer has completed the design-system checklist
- [ ] The Project Manager has recorded the checklist and Figma link

Once approved for use, publish the Figma library and record its version and date. Future clients extend this system. The Designer does not fork or rename it.
