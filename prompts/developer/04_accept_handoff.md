# Developer 04: Accept the handoff and extract the token contract

- **Who:** the Dev Lead, or whoever holds the Figma seat.
- **Tool:** Claude Code with the Figma MCP connected.
- **When:** **Gate 1d**, before any build work starts.
- **Needs:** Figma. **Does not need** the staging site, the builder, or any MCP
  other than Figma.

An incomplete handoff is **rejected, not patched informally**. Patching it
yourself hides the gap and guarantees the design and the build drift apart.

## This step is Figma-only, on purpose

This is the **last step that touches Figma**. Everything it produces is written
down and committed, so the build that follows needs no Figma access at all.

That split matters for two practical reasons:

- **You do not need the staging site connected to do this.** Design extraction is
  front-half work and target-neutral. Standing up Breakdance or Astro first, just
  to read a Figma file, would be backwards.
- **The person building does not need a Figma seat.** Seats are needed per person
  who runs the MCP, not per developer. Whoever holds the seat runs this once and
  hands over the artefacts.

```
[ROLE: Dev Lead accepting a design handoff and extracting the token contract]

OBJECTIVE: Decide whether this Figma file is genuinely dev-ready, and if it is, produce
the durable artefacts the build will run from. Do not start building. Do not fix gaps
yourself. You do not need the staging site or the builder for any of this.

READ FIRST: docs/pilot-artefacts/04_design_to_development_handover_contract.md, and
docs/22_design_system_reuse_model.md for the token model.

Figma file: [LINK]. Build target: [A or B].

DIRECTIVES:

1. Read the file's structure with the Figma read tools. Scope every get_design_context
   call to a single frame; it can exceed token limits on a whole page.

2. Check the handover contract item by item and report PASS or FAIL with the specific
   frame for each failure:
   - Frames for desktop, tablet and mobile
   - Status labels applied, Ready for Dev only where earned
   - Components and variants used, no loose one-off elements
   - Variables and tokens applied, NO hardcoded hex, no manual spacing
   - Spacing scale and breakpoint values documented
   - Responsive behaviour notes per key section
   - Interaction states: hover, active, focus, disabled
   - Form states: empty, filled, error, success, disabled
   Also check it against `.claude/reference/design-for-build-checklist.md`.

3. Flag any layout that cannot be expressed as flex or grid. It will not build cleanly
   on either target.

4. Give me a clear verdict: ACCEPT, or REJECT with the specific list the designer must
   fix. If it is borderline, say so and name the risk rather than waving it through.
   STOP HERE IF REJECTED. Do not extract from a design that is going to change.

5. ON ACCEPTANCE ONLY, extract the token contract. This is the ONE extraction for the
   whole build; nothing downstream re-extracts.
   - Run the figma-token-extractor subagent. Scope reads to the collection; do not pull
     whole files.
   - Produce the mapping table: Figma token name, resolved value, the target token home,
     and the CSS custom property name. Names must be IDENTICAL on both sides.
   - Report any token that resolves to a hardcoded value with no semantic home, and any
     token with no clean home on this target. On Target A the component tier has no clean
     home; that is known, report it rather than forcing it. Do NOT invent a mapping.
   - WRITE IT TO A FILE in the project and commit it, as the canonical token contract.
     The build reads this file, not Figma.

6. SAVE THE REFERENCE SCREENSHOTS YOURSELF. You have the Figma MCP; do not ask me to
   export anything by hand.
   - First LOOK: if reference images are already in the project (`design/frames/`), use
     them and only fill what is missing.
   - For each approved frame, at each breakpoint, call get_screenshot and save it to
     `design/frames/<page>-<breakpoint>.png`. Commit them.
   - These are reference pictures of the DESIGN, for checking a built page against. They
     are never uploaded to the site. They are NOT the content images (directive 7).
   - Report which frames you saved and any you could not.

7. PULL THE CONTENT ASSETS, only if the person building will not have Figma.
   The build normally pulls each raster image and SVG straight from the Figma frame,
   renames it from the design, optimises and uploads it. That step needs Figma, so if the
   builder has no seat it must be satisfied here instead.
   - Look in `design/assets/` first and only fill what is missing.
   - Download the raster assets and the SVGs from the approved frames into
     `design/assets/`, named descriptively from the design (kebab-case, what it shows plus
     its role, never the Figma layer name). Commit them.
   - Do NOT resize, optimise or upload here. That happens at build time through
     `.claude/tools/optimize-and-upload.py`, which sizes to about 2x display width and
     compresses. This step only gets the source files out of Figma.
   - Record the intended alt text alongside, read from the design, since the builder will
     not be able to read it from Figma later.
   - If the builder DOES have Figma, skip this: the build pulls per frame as it goes,
     which keeps the asset tied to the frame it came from.

8. Confirm the rest of the pack exists, and say plainly what is missing:
   - DESIGN.md, verified against Figma (Pass B complete, not DRAFT).
   - The breakpoint values and the responsive notes, in writing.

CONSTRAINTS:
- Read-only on Figma. Change nothing, build nothing.
- Do not fix design gaps yourself; they go back to the designer in Figma.
- Do not touch the staging site or the builder. That is the next step, and a different
  person may do it.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## What acceptance produces (the handover pack)

This step **produces** the pack, it does not ask anyone to assemble it. On
acceptance the project should contain, committed:

1. **The canonical token contract** (directive 5). The build reads this, not Figma.
2. **Reference screenshots** in `design/frames/` (directive 6), saved by this step.
3. **Content assets** in `design/assets/` (directive 7), **only if the builder has no
   Figma seat**. Otherwise the build pulls them per frame as it goes.
4. **`DESIGN.md`**, verified against Figma, marked READY not DRAFT.
5. **Breakpoints and responsive notes**, in writing.

With those, the build runs with **no Figma access**. See
`.claude/reference/building-without-figma.md`.

**Two different kinds of image, do not confuse them:**

- **Content assets** are the photos, icons and logos that go **on the site**. On a page
  that has a design, these come **from the Figma frame**: pulled, renamed from the design,
  resized to display size, optimised, uploaded.
- **Reference screenshots** are pictures **of the design**, used only to check a built
  page against. Never uploaded.

Separately, a page built with **no design** (most internal pages) has no assets to pull.
Those get placeholder blocks and are filled afterwards by the image-sourcing pass from the
client gallery, or stock, or generated (`prompts/source-images.md`).

Then move to `05_tokens.md`, which syncs the contract into the build target and
needs no Figma.
