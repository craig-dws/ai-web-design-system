# Building without a Figma seat

The Figma MCP needs a paid Figma seat, and a seat is needed **per person who runs
the MCP**, not per developer. So a developer can build a whole site without one,
because the Figma-dependent work happens once, up front, in
`04_accept_handoff.md`.

This is the normal arrangement, not a workaround.

## Nobody exports anything by hand

The handoff step **has** the Figma MCP, so it does the fetching itself: it reads
the tokens, writes the token contract, and saves the reference screenshots into
`design/frames/`. It looks in the project first and only fills what is missing.

The build sessions then **look in the folder**. They do not ask for artefacts and
they do not open Figma. If something is missing, the answer is to re-run the
handoff step, not to hand-export a file.

## The split

| Step | Needs Figma | Needs the build target |
|------|-------------|------------------------|
| Accept the handoff, extract tokens, save reference frames (`04_accept_handoff.md`) | **Yes** | No |
| Sync the contract into the build (`05_tokens.md`) | No | **Yes** |
| Build pages (`06_build_page.md`) | No | **Yes** |
| QA and launch (`07_qa_and_launch.md`) | No | **Yes** |

Extraction is front-half work and target-neutral, so it does not need the staging
site to exist. Do not stand up a builder just to read a Figma file.

## What the project holds after handoff

1. **The canonical token contract.** Every colour, type and spacing value the build
   references, names identical on both sides. This is what makes tokens a
   build-time lookup rather than a Figma lookup.
2. **`design/frames/`.** Reference pictures of the design, per frame per
   breakpoint, for checking a built page against. Never uploaded to the site.
3. **`DESIGN.md`**, verified against Figma and marked READY, not DRAFT (docs/28).
4. **Breakpoints and responsive notes**, in writing.

## Content images are a separate thing entirely

They are **not** pulled from Figma, and they are not part of this pack.

Pages are built with **placeholder blocks** at the correct display size
(`image-placeholder.md`), and every placeholder is logged under **Outstanding
images** in the page record. The real images are sourced **after** the build
(`prompts/source-images.md`): the client gallery first, then stock or generated if
approved, always optimised and uploaded through
`.claude/tools/optimize-and-upload.py` with proper alt text.

That pass runs after the layout is settled, so images pour into a stable layout
rather than a moving one. A missing Figma seat has no bearing on it.

## What is genuinely lost without a seat

| Lost | Covered by |
|------|-----------|
| `get_variable_defs` | Nothing lost. Tokens live in the build after Gate 2a |
| `get_design_context` | `DESIGN.md` plus the saved reference frames |
| `get_screenshot` | The saved `design/frames/` images |
| `get_code_connect_map` | Only relevant if the project uses Code Connect |

The build still screenshots the **built** page with the chrome-devtools MCP, which
needs no Figma. The comparison is against the saved reference frame.

## The one rule that keeps this honest

**Re-run the handoff step whenever the design changes**, so the contract and the
reference frames are regenerated together. They are a snapshot, not a live link,
and a developer with no Figma access cannot tell that a design has moved.

If a token turns out to be missing mid-build, it goes back to the designer in
Figma and the seat holder re-runs `04_accept_handoff.md`. Never grow a second
extraction, and never invent the value in the build.
