# Designer 05: Create and verify the client DESIGN.md

- **Who:** the Designer, with the PM preparing the inputs and recording the evidence.
- **Tool:** Claude Cowork with the Figma plugin and the installed design-standard skill.
- **How often:** Pass A after Gate 1a, then Pass B before Gate 1b closes. Re-run after an approved design-system change.

The PM copies `10_DESIGN_TEMPLATE.md` from the designer pack into the client project as `DESIGN.md` and supplies the approved brief, assets and references. The Designer owns the content and the design decisions. The PM checks that the required file, checklist and evidence exist, but does not approve design correctness.

Use the same prompt for both passes. It must ask only for information that is missing or contradictory, in small ordered batches. It must not conduct a generic interview when the approved sources already contain the answer.

```text
Act as my guided design-documentation partner. Help me create or update the client
DESIGN.md without inventing design decisions, token values or approvals.

Read these sources before asking questions:
- the approved client brief: [PATH OR LINK]
- the approved Gate 1a visual direction and client approval record: [PATH OR LINK]
- 10_DESIGN_TEMPLATE.md
- 09_design_md_workflow.md
- 04_figma_naming_standard.md
- 05_design_system_checklist.md
- the current DESIGN.md, if this is Pass B or a later update

Authority and permissions:
- The signed brief controls requirements and scope.
- Approved Figma controls visual design, variables, components and states.
- The canonical token contract controls machine-consumed token names and values.
- DESIGN.md is a derived explanation of those sources.
- Do not change Figma, project files or source documents unless I explicitly approve a
  separate write. Figma inspection in this workflow is read-only.
- Do not make a client, Designer, PM or developer approval on anyone's behalf.

First, determine the mode:
- PASS A if Gate 1a is approved but the complete Figma design system is not yet ready.
- PASS B if the Figma variables, components and states are ready for Gate 1b verification.
- UPDATE if an already approved system has changed.

Then show a compact source inventory with:
1. facts already established
2. missing information
3. contradictions that must be resolved
4. sources you could not access

Do not ask me to repeat anything found in an authoritative source. Ask no more than four
questions at a time, wait for my answers, and use this order:

Round 1: purpose, audience response, approved design thesis and deliberate exclusions.
Round 2: colour roles, typography hierarchy and their intended usage.
Round 3: layout, spacing, responsive behaviour, elevation, shapes and content resilience.
Round 4: imagery, iconography, motion and reduced-motion behaviour.
Round 5: key components, variants, interaction states, accessibility requirements, and
concrete do and do not examples.

Skip any round whose answers are complete. If I give a preference that conflicts with an
approved source, identify the conflict and ask me to resolve it. Do not silently choose.

PASS A rules:
- Create a narrative-first DRAFT using the template.
- Record the approved design intent, observable principles and exclusions.
- Do not invent final tokens or imply that exploratory values are approved.
- Mark information that genuinely depends on completed Figma work as
  [PENDING AFTER FIGMA].
- Stop after showing the proposed Pass A draft and ask me to confirm it before saving.

PASS B and UPDATE rules:
- Confirm whether the Figma plugin can inspect the live canvas or only a screenshot. State
  the limitation before drawing conclusions.
- Inspect Figma read-only. Record the exact file, variables collection, version, branch or
  verification date used.
- Extract or verify exact approved token names and references. Never rename a token and
  never replace an alias with a guessed raw value.
- Report missing bindings, hardcoded values, off-scale values, incomplete components,
  absent states and mismatches with the draft DESIGN.md.
- Run the installed DiscoverWeb design-standard audit and `/design-system` where available.
  Treat their results as evidence for Designer review, not as approval or accessibility
  certification. If either tool is unavailable, say so and continue with the manual checks.
- If dotted canonical names cannot be represented safely in DESIGN.md front matter, keep
  the minimal front matter, preserve the exact names in the canonical token contract and
  link to it. Do not create an alternative naming scheme.
- Resolve every [PENDING AFTER FIGMA] marker and every square-bracket placeholder before
  proposing READY status. Unresolved contradictions block the final file.

Final quality check:
- Every statement is sourced, visible in approved Figma, or explicitly confirmed by me.
- The file follows 10_DESIGN_TEMPLATE.md and remains concise enough to review after changes.
- Guidance is concrete and testable, not vague language such as "modern and clean".
- It includes purpose, colours, typography, layout, responsive behaviour, depth, shapes,
  imagery, iconography, motion where relevant, components, states, content resilience,
  accessibility requirements, do and do not guidance, provenance and change history.
- It contains no secrets, operational commands, duplicate research, abandoned concepts,
  production code, builder-specific instructions or unsupported accessibility claims.
- It does not replace the brief, Figma, canonical token contract, CLAUDE.md or AGENTS.md.
- It uses British and Australian English, with no em dashes, en dashes or emojis.

Finish by showing:
1. the complete proposed DESIGN.md
2. a source and evidence summary
3. any blockers or review limitations
4. your recommendation: keep DRAFT or mark READY

Wait for my confirmation before saving or replacing DESIGN.md. After saving, read the file
back and confirm that no placeholders or pending markers remain when its status is READY.
```

## Gate 1b record

After Pass B, the Designer fixes all must-fix items, reruns the design-system checklist and signs the Gate 1b self-certification. The PM records the `DESIGN.md` path, checklist and Figma evidence. The homepage does not start until that record is complete.

This is a one-designer workflow, so the self-certification is explicit. Client approval at Gate 1a and developer feasibility review at Gate 1d remain separate controls.
