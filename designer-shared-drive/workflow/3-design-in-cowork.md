# 3. Design and systematise in Cowork (one tool, end to end)

Paste this into Claude Cowork, with the client folder (brief, brand assets, photos) attached and the
Figma plugin connected (a Full/edit Figma seat). This is the alternative to prompts 1 and 2: Cowork
designs **and** builds the design system in Figma in one place. Use it to compare against the
Claude Design to Claude Code path.

---

Design this client's site in Figma from the brief, and build a proper, build-ready design system. The
brief already carries the strategy, audience, voice and per-page notes, so design to what it says
rather than re-doing strategy. Load the Figma skills first.

**Read first:** the client brief and the brand assets (logo files, photos).

**Design:**
- **The homepage**, then **tablet and mobile** frames. Design to the brand palette and fonts exactly,
  with the roles the brief gives them, the signature accent dominant, modernised within the palette.
- **Match the voice to the visual** (the brief's tone section), follow the homepage notes, and put the
  primary call to action in the header, the body and the foot, with tap-to-call on mobile.
- **Avoid the AI look:** intentional asymmetry and spatial rhythm, brand-specific colour, unexpected
  hierarchy, not centred and uniform. Honour the brief's "what to avoid".
- **WCAG 2.2 AA contrast** on every pair. Where a bright brand colour fails on white, use it as a
  field or on a dark ground, not as text or a thin mark on white.

**Build the design system (this is what makes it buildable):**
- **Three-tier tokens** (primitive to semantic to component), named to the agency token model, no
  duplicated raw values, every variable scoped with `var(--...)` syntax.
- **Components with variants including hover**, text exposed as properties.
- **Structured for Breakdance:** each band a full-bleed frame around a fixed container; Header and
  Footer as single components (Global Blocks).
- **QA:** zero unbound fills or strokes, zero unstyled text, zero default names, contrast to AA.
- **Check against `reference/design-for-build-checklist.md`.**
- **Produce the Breakdance token export** (variables to Global Settings), the bridge to the build.

British and Australian English, no em dashes, no emojis unless the brand calls for them.
