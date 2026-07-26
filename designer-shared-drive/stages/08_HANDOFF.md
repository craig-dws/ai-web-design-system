# Stage 8: Design Handoff

## Start when

All required pages are complete, approved and checked at desktop, tablet and mobile sizes.

## Designer task

Prepare one complete, unambiguous Figma handoff. An incomplete handoff is returned for correction rather than being filled in during the build.

## Cowork prompt

```text
Audit this Figma file for design handoff.

Read first:
- the READY client DESIGN.md
- reference/01_DESIGN_SYSTEM_RULES.md
- reference/03_DESIGN_SYSTEM_CHECKLIST.md
- reference/04_HANDOFF_CHECKLIST.md

Use live Figma inspection where available and state any access limitation. Report PASS or
FAIL for every checklist item with the exact page, frame, component or layer.

Check:
1. Variables and bindings, including hardcoded and off-scale values
2. Naming of variables, components, variants, frames and layers
3. Reusable components and detached or one-off elements
4. Interaction and form states
5. Desktop, tablet and mobile behaviour
6. Contrast evidence, focus intent, labels and reduced-motion notes
7. Flex or grid compatible layout structure and Auto Layout
8. Frame status labels
9. Content-length and missing-content assumptions
10. Image behaviour and supplied assets
11. DESIGN.md alignment and unresolved questions

Run the DiscoverWeb design-standard skill and the Design plugin's handoff audit. Treat
their output as evidence for Designer review.

Finish with:
- mandatory fixes before handoff
- non-blocking notes
- checks you could not perform
- ACCEPT or REJECT recommendation

Do not change the Figma file during the audit. Wait for Designer instructions.
```

## Handoff is ready when

- [ ] Every mandatory item in `reference/04_HANDOFF_CHECKLIST.md` passes
- [ ] Every approved frame is marked `Dev Ready`
- [ ] `DESIGN.md`, assets and Figma notes are current
- [ ] Open questions have an owner and due date
- [ ] The Designer has signed the handoff checklist
- [ ] The receiving Developer has accepted the handoff

If the handoff is rejected, fix the recorded issues and rerun this stage.

Continue to `09_BUILD_REVIEW.md` after a page is available for review.
