# Stage 5: DESIGN.md Pass B and Design-System Approval

## Start when

The client Figma variables, components, states and responsive rules are complete.

## Designer task

Verify `DESIGN.md` against the completed Figma system, remove every pending marker and self-certify the design system.

## Cowork prompt

```text
Help me complete Pass B of the client DESIGN.md using read-only Figma inspection.

Read first:
- the approved brief and visual direction
- the current client DESIGN.md
- reference/05_DESIGN_MD_GUIDE.md
- reference/DESIGN.template.md
- reference/01_DESIGN_SYSTEM_RULES.md
- reference/03_DESIGN_SYSTEM_CHECKLIST.md

First state whether you can inspect the live Figma canvas or only screenshots. List any
check that the available access cannot support.

Then:
1. Verify every DESIGN.md statement against approved Figma or an approved source.
2. Record the exact Figma file, collection names and verification date.
3. Add exact approved variable names and resolved values where the template requests them.
4. Verify component purposes, variants, states, responsive behaviour and content limits.
5. Report hardcoded values, missing bindings, off-scale values, unnamed layers, incomplete
   states and differences between DESIGN.md and Figma.
6. Run the DiscoverWeb design-standard skill and the Design plugin's design-system audit.
7. Resolve every [PENDING AFTER FIGMA] marker and every template placeholder.
8. Complete the design-system checklist with evidence.

Do not rename a variable, guess a value or treat an automated audit as approval. Unresolved
contradictions block READY status.

Show the complete proposed DESIGN.md, evidence summary, remaining limitations and a
recommendation of DRAFT or READY. Wait for Designer confirmation before saving.
```

## Designer self-certification

The Designer may mark the design system ready only when:

- [ ] `DESIGN.md` contains no placeholder or pending marker
- [ ] `DESIGN.md` matches approved Figma
- [ ] The design-system checklist passes
- [ ] Audit failures have been fixed or recorded as approved exceptions
- [ ] Approval evidence and the Figma link are recorded

The Project Manager records the completed checklist and file locations. The Project Manager does not make the design decision.

Do not start the homepage before this stage is complete.

Continue to `06_HOMEPAGE.md`.
