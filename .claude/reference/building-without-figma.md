# Building without a Figma seat

The Figma MCP needs a paid Figma seat, and a seat is needed **per person who runs
the MCP**, not per developer. So a developer can build a whole site without one,
provided the Figma-dependent work is done once, up front, by whoever holds the
seat.

This is the normal arrangement, not a workaround.

## The split

| Step | Needs Figma | Needs the build target |
|------|-------------|------------------------|
| Accept the handoff, extract the token contract (`04_accept_handoff.md`) | **Yes** | No |
| Sync the contract into the build (`05_tokens.md`) | No | **Yes** |
| Build pages (`06_build_page.md`) | No | **Yes** |
| QA and launch (`07_qa_and_launch.md`) | No | **Yes** |

Extraction is front-half work and target-neutral, so it does not require the
staging site to exist yet. Do not stand up a builder just to read a Figma file.

## The handover pack

Four artefacts. With them, the build runs with no Figma access.

1. **The canonical token contract.** Committed in the project. Every colour, type
   and spacing value the build references, with names identical on both sides.
   This is what makes tokens a build-time lookup rather than a Figma lookup.
2. **`DESIGN.md`**, verified against Figma and marked READY, not DRAFT. The
   readable account of the approved visual system (docs/28).
3. **Frame exports (PNG), per frame per breakpoint.** This is the one people
   forget, and without it there is nothing to verify a built page against.
4. **Breakpoint values and responsive notes**, in writing. The handover contract
   already requires these.

## What is genuinely lost, and the substitute

| Lost | Substitute |
|------|-----------|
| `get_variable_defs` | Nothing lost. Tokens live in the build after Gate 2a |
| `get_design_context` | `DESIGN.md` plus the frame exports |
| `get_screenshot` | **The supplied PNG exports.** This is the real gap if they are missing |
| `get_code_connect_map` | Only relevant if the project uses Code Connect |

The build still screenshots the **built** page with the chrome-devtools MCP, which
needs no Figma. The comparison is against the supplied PNG instead of a live
frame. If the exports were never supplied, nobody is checking the build against
the design, so treat missing exports as a blocked handoff, not a detail.

## The one rule that keeps this honest

**Re-issue the pack whenever the design changes.** The pack is a snapshot, not a
live link. A developer with no Figma access cannot tell that a design moved, so
they will build confidently to a stale pack. Where designs are frozen before the
build starts this rarely bites, but the rule is what makes that safe rather than
lucky.

If a token turns out to be missing mid-build, it goes back to the designer in
Figma, and the seat holder re-runs the extraction in `04_accept_handoff.md` to
reissue the contract. Never grow a second extraction, and never invent the value
in the build.
