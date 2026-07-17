# AI Web Design System v0.1: Designer Workflow

Internal reference for agency designers. This document describes the exact, numbered workflow a designer follows, from receiving a brief through to handing off a developer-ready Figma file. It also records where Claude Design and the Figma MCP may assist, and where a human must make the decision.

Companion documents:

- `04_developer_workflow.md` (what happens after handoff)
- `07_figma_mcp_setup_and_handoff_contract.md` (MCP setup and the formal handoff contract)
- `08_breakdance_and_wordpress_plugin_stack.md` (the build platform and its limits)

## Principle

AI accelerates production. It does not own taste, brand judgement, accessibility sign-off, or client relationships. Every AI-assisted output is a draft until a human designer accepts it. When in doubt, a human decides.

## What "Claude Design" means here

The phrase is ambiguous, so this document is specific. There are three surfaces:

1. The **Claude Design product**: Anthropic's visual-creation canvas (Anthropic Labs, launched April 2026), for generative design, prototypes, and concepts. It can hand a design bundle to Claude Code. This is the surface meant wherever this document says "Claude Design can generate options" or "summarise research".
2. **Claude Code plus the Figma MCP**: the developer-facing surface that reads a Figma file (tokens, structure, screenshots) and builds. This is a developer tool, covered in 04.
3. **Claude artifacts**: general one-off design generation inside a chat. Useful for quick internal mockups, not the system of record.

For a designer, treat the Claude Design product and Figma as the two places design happens. Figma remains the design source of truth for handoff regardless of where a concept was first generated.

## The workflow

### Step 1: Interpret the brief and research

1. Read the full brief, the client research pack, and any brand or style guides supplied.
2. Confirm the deliverable list, page inventory, target audiences, primary conversion goals, and any regulatory constraints (for example AHPRA for medical clients).
3. **Note technical constraints early**. The site will be built in Breakdance, so plan layouts the Layout Engine can produce natively (see the Breakdance limits section below).
4. **Produce a one-page design brief summary**: goals, audiences, tone, must-have sections, references, and open questions.

AI may assist: Claude Design can summarise research, extract page requirements, suggest a page inventory, and draft mood or tone notes.

Human must decide: whether the interpretation is correct, which conversion goals take priority, and how brand personality is expressed. Confirm open questions with the project manager before proceeding.

### Step 2: Choose a design-system foundation or starter

1. Decide whether to start from the agency base kit, a Breakdance-compatible starter template, or a blank file.
2. Prefer the agency base kit so tokens, spacing scales, and component naming stay consistent across projects and translate cleanly to Breakdance Global Settings.
3. Record the chosen foundation in the file cover page so developers know the origin.

AI may assist: suggest a suitable starter based on the brief and list what would need to change.

Human must decide: the final foundation choice, because it sets constraints for the whole project.

### Step 3: Visual direction and client sign-off

1. **Produce one or two distinct visual directions (not more)**. Each shows the homepage hero, a content section, a card or list pattern, and the primary call to action.
2. Present type, colour, spacing, and imagery approach with short rationale tied to the brief.
3. Obtain written client sign-off on one direction before building full layouts. Do not proceed to high-fidelity layouts without it.

AI may assist: generate variation options, draft rationale copy, and mock placeholder imagery for internal review only.

Human must decide: which direction is presented, and the reading of client feedback. Sign-off is a human-to-client step and is never delegated to AI.

### Step 4: High-fidelity layouts with Variables and Auto Layout

1. Build the approved direction into full page layouts at desktop width first.
2. Use Figma Variables for every design decision that should become a token: colour, typography (family, size, weight, line height), spacing scale, radius, and effects. Do not hardcode values that belong in a token.
3. Use Auto Layout on every frame that will stack, wrap, or reflow. This mirrors how Breakdance Section, Div, and Columns behave and makes the developer mapping direct.
4. Build reusable components with variants for anything that repeats (buttons, cards, form fields, navigation items). Name them clearly and consistently.
5. **Keep structure honest**. If a layout cannot be built with flex or grid, it cannot be built cleanly in Breakdance either, so redesign it.

AI may assist: generate first-pass layouts from the approved direction, propose token names, and flag values that should be Variables rather than raw numbers.

Human must decide: visual hierarchy, spacing rhythm, and whether a component is genuinely reusable or page-specific.

### Step 5: Responsive rules and breakpoints

1. **Define behaviour at three widths as a minimum**: desktop, tablet, and mobile.
2. Use the agency standard breakpoints unless the brief requires otherwise. Record the exact pixel values in the file.
3. **For each major section, document what changes across breakpoints**: column count, stacking order, font scale, image treatment, and any element that is hidden.
4. Build at least the key templates at all three widths so the developer sees intent rather than guessing.

AI may assist: propose responsive variants and flag sections likely to break at narrow widths.

Human must decide: reflow order and what may be hidden on mobile, since these are content-priority calls.

### Step 6: Interaction and accessibility states

1. **Design the interactive states for every interactive element**: default, hover, focus, active, and disabled. Focus states are mandatory and must be visible.
2. **Design form states**: empty, filled, focused, error, and success, with example error messaging.
3. Check colour contrast against WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text and meaningful non-text elements). Record pass or fail for each text-on-background pair.
4. Provide accessible names and labels for icons, buttons, and form fields. Note the intended label text where it is not visible.
5. Note reduced-motion behaviour for any animation.

AI may assist: generate a contrast report, suggest label text, and list states that are missing.

Human must decide: whether a borderline contrast result is acceptable, and how error and empty states read to a real user.

### Step 7: Prepare design-system artefacts and component docs

1. **Assemble a design-system page or file section**: the token list, the type scale, the spacing scale, and the component library with variant names.
2. **Document each reusable component**: purpose, variants, states, and any content-length assumptions.
3. Confirm token names are the ones developers will use in Breakdance Global Settings so mapping is one to one.

AI may assist: draft component documentation and produce a token table from the Variables.

Human must decide: naming conventions and which components are promoted to the shared library.

### Step 8: Asset export

1. Export images at the correct dimensions and at 1x and 2x where needed.
2. Prefer SVG for icons and logos, and modern raster formats (WebP or AVIF) for photography, with sensible fallbacks noted.
3. Name assets predictably and place them where the developer expects them.
4. Note any asset the developer must source or the client must supply.

AI may assist: list required assets and flag missing exports.

Human must decide: final crop, art direction, and image quality.

### Step 9: Mark frames developer-ready

1. **Apply a clear status label to every frame**: for example Ready for Dev, In Progress, or Needs Review.
2. Only frames that pass the self-check (Step 10) may be labelled Ready for Dev.
3. Confirm the file satisfies the Designer-to-Developer Handoff Contract in `07_figma_mcp_setup_and_handoff_contract.md`.

AI may assist: check that all pages have status labels and flag frames missing one.

Human must decide: the final Ready for Dev call.

### Step 10: Self-check before handoff

Run the handoff checklist at the end of this document. Do not hand off a file that fails any mandatory item.

AI may assist: run an automated pass of the checklist and report gaps.

Human must decide: sign the file off for handoff.

### Step 11: Answer developer questions

1. Monitor the open-questions log and the deviation register during the build.
2. **Answer promptly**. If a developer proposes a deviation, decide whether to accept it, adjust the design, or reject it.
3. Every accepted deviation must be reflected back into Figma or recorded in the deviation register so the file and the build stay in sync.

AI may assist: draft answers and summarise the deviation register.

Human must decide: every design deviation.

### Step 12: Review the built site

1. Review the staging build against the Figma file at all three breakpoints.
2. Check interaction states, focus visibility, form behaviour, and accessibility in the browser, not only in Figma.
3. Log issues clearly, separating true defects from acceptable platform differences.
4. Sign off only when the build matches intent or the differences are recorded and accepted.

AI may assist: compare screenshots to Figma frames and list discrepancies.

Human must decide: whether the build is acceptable for launch.

## What designers must know about Breakdance limits

The site is built in Breakdance on WordPress. Design within these limits so the build is clean and stays editable.

| Area | What Breakdance can do | Design implication |
|------|------------------------|--------------------|
| Layout Engine | Flexbox and CSS grid through Section, Div, and Columns elements | Design every layout as flex or grid. If it cannot be expressed that way, redesign it. |
| Structure | Nesting of Sections and Divs, standard elements, Post Loops, Global Blocks | Build with reusable, nestable blocks in mind, not one-off pixel placement. |
| Scripting | No exotic client-side scripts as part of standard build | Avoid designs that depend on bespoke scripting or unusual interactions. |
| Client Mode (planned) | Will later restrict clients to editing text, images, and links only | Design so clients only ever need to change text, images, and links, never structure. |

Practical rules:

1. Every section should be a flex or grid arrangement of Section, Div, and Columns.
2. **Keep structure shallow and predictable**. Deep or clever nesting is harder to build and to maintain.
3. **Assume clients will edit content, not layout**. Do not design a layout that breaks when text length changes, and always state content-length assumptions.
4. Avoid animations or interactions that would need custom code outside the platform's native capability.

## Designer handoff checklist

Mark each item before labelling the file Ready for Dev.

- [ ] Design brief summary present and open questions resolved or logged
- [ ] Foundation or starter recorded on the cover page
- [ ] Client has signed off the visual direction in writing
- [ ] All key pages built at desktop, tablet, and mobile
- [ ] Figma Variables used for colour, typography, spacing, radius, and effects (no stray hardcoded values)
- [ ] Auto Layout applied to all frames that stack, wrap, or reflow
- [ ] Reusable components built as components with clearly named variants
- [ ] Breakpoints defined with exact pixel values
- [ ] Responsive behaviour documented per major section (columns, order, scale, hidden elements)
- [ ] Interaction states designed: default, hover, focus, active, disabled
- [ ] Form states designed: empty, filled, focused, error, success
- [ ] WCAG 2.2 AA contrast checked and recorded for all text-on-background pairs
- [ ] Accessible names and labels noted for icons, buttons, and fields
- [ ] Reduced-motion behaviour noted for any animation
- [ ] Design-system page complete: tokens, type scale, spacing scale, component library
- [ ] Component docs written (purpose, variants, states, content-length assumptions)
- [ ] Assets exported at correct sizes and formats, named predictably
- [ ] Reusable versus page-specific components flagged
- [ ] Every frame carries a status label; Ready for Dev applied only to passing frames
- [ ] File satisfies the Designer-to-Developer Handoff Contract
- [ ] All layouts achievable with the Breakdance Layout Engine (flex or grid via Section, Div, Columns)
