# Stage 4: Client Design System

## Start when

The visual direction is approved, Pass A of `DESIGN.md` is complete, and the shared agency design system is available.

## Designer task

Create the client design system by extending the shared agency system. Keep the approved names and component structure. Change only the brand values required to express the approved direction.

## Cowork prompt

```text
Help me create the client design system in Figma from the shared agency system.

Read first:
- the approved client brief
- the approved visual direction
- the client DESIGN.md draft
- reference/01_DESIGN_SYSTEM_RULES.md
- reference/02_DESIGN_QUALITY_STANDARD.md
- reference/03_DESIGN_SYSTEM_CHECKLIST.md

Work in this order and stop after each step for Designer review:

1. Inspect the shared agency system and report its collections, naming and component
   structure. Identify anything you cannot verify.

2. Create an Extended Collection for the client. Inherit the shared system. Do not fork
   the base, rename a variable or duplicate a component.

3. Propose the minimum approved client overrides for colour, typography family and
   radius. Tie every override to the approved design thesis.

4. Apply the overrides using aliases. Keep Primitive, Semantic and Component tiers
   intact. Use the forward-slash naming standard exactly. Do not place raw values above
   the Primitive tier.

5. Check components, variants, interaction states, Auto Layout, responsive behaviour,
   long content and missing-content cases.

6. Run the DiscoverWeb design-standard skill and the Design plugin's design-system
   audit. Report every failure with the exact Figma location.

7. Complete reference/03_DESIGN_SYSTEM_CHECKLIST.md with PASS or FAIL. Do not recommend
   approval while a mandatory item fails.

Before changing Figma, show the proposed action and wait for my confirmation. Ask before
adding any variable or component not covered by the approved system.
If the available Figma access cannot perform an approved action, give me the exact manual
Figma steps and wait while I complete them. Do not claim the action was completed.
```

## Finish when

- [ ] The client system extends the shared system rather than duplicating it
- [ ] Approved names remain unchanged
- [ ] Every override supports the approved direction
- [ ] All properties are bound to the correct variables
- [ ] Required variants and states are present
- [ ] All mandatory audit failures are fixed
- [ ] The design-system checklist is complete

Continue to `05_DESIGN_MD_PASS_B.md` before starting the homepage.
