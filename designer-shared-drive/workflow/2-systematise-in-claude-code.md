# 2. Build the Figma design system in Claude Code

After Claude Design's **"transfer to Claude Code"**, paste its transfer prompt into Claude Code, then
add the block below so the design system is built to the agency standard and is ready for Breakdance.
Claude Code needs the Figma MCP connected (a Full/edit Figma seat).

---

Also apply the agency design-system standard when you build this in Figma. Load the Figma workflow
skill first.

- **Tokens, three tiers.** Primitive to semantic to component, named to the agency **token model**
  (`reference/design-for-build-checklist.md` and the token-model reference). Semantic aliases
  primitive, component aliases semantic, no duplicated raw values, no raw value above the primitive
  tier. Derive them from the brief palette plus the transferred page. Give every variable a scope and
  the `var(--...)` web code syntax.
- **Components with states.** Build the page's repeating elements as Figma components with variants,
  **including hover** (Breakdance needs every interactive element to ship with its hover state). Expose
  text as component properties.
- **Structure for Breakdance.** Each band is a full-bleed frame wrapping a fixed-width container
  (maps to Section then Div). Header and Footer are single components so they become Global Blocks.
- **Fonts.** If the brief's font is not a webfont, substitute the closest licensed webfont and record
  it (per the standard). Confirm the fonts are available in Figma.
- **QA before you finish:** zero unbound fills or strokes, zero unstyled text, zero default layer
  names, and contrast checked to WCAG 2.2 AA on the tight pairs.
- **Check the result against `reference/design-for-build-checklist.md`** and report any gap.

**Then produce the Breakdance token export** from the Figma variables, the values that populate
Breakdance Global Settings (Colours, Palette, Typography, Containers). This is the bridge to the
build. Say what you exported and where it is.
