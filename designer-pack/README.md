# Designer pack

Everything the designer needs, in one folder she can actually open. She has no
repository, no Git and no terminal, so she cannot read `docs/...` paths. This
folder is what gets handed to her, or synced to her shared Drive.

**How to produce it:** run `bash designer-pack/assemble.sh` from the repository
root. It copies the current versions of her documents into
`designer-pack/documents/`. That folder is deliberately not committed, so there
is never a stale second copy of a document living in Git.

**Re-run it whenever the source documents change.** This is a snapshot, not a
live link. A stale pack is worse than none, because she will follow an old
standard confidently.

---

## What the designer actually does

She owns Stage 1, Design. She works in **Figma**, which is the design source of
truth, with **Claude Cowork** as her AI assistant. She never touches Claude Code,
Git, the page builder, or the staging site.

Her job, in order:

1. **Interpret the brief.** Read the brief from the PM, confirm goals, audiences,
   pages and constraints, and produce a one-page design brief summary.
2. **Choose the foundation.** Start from the agency base kit wherever possible,
   so tokens and naming stay consistent across clients.
3. **Visual direction.** Produce one or two distinct directions, not more, and
   get written client sign-off on one before building full layouts.
   (**Gate 1a: visual direction approved by the client.**)
4. **Build the design system.** The Figma Variable collections (primitive,
   semantic, component), the type and spacing scales, and the components with
   their states. Draft `DESIGN.md` after Gate 1a, then verify and finish it from
   the completed Figma system.
   (**Gate 1b: the Designer self-certifies the design system and the PM records
   the checklist and evidence.** This is the most important gate in the whole
   process, because everything downstream inherits it.)
5. **Build the homepage at full fidelity**, composed from the system.
   (**Gate 1c: homepage approved by the client.**)
6. **Build the internal pages.** These should be fast, because they are assembly
   from an approved system rather than fresh invention.
7. **Hand off.** Mark frames Ready for Dev and satisfy the handover contract.
   (**Gate 1d: the Dev Lead accepts the dev-ready file.**)
8. **Answer questions during the build**, and **review the built site** against
   Figma at all three breakpoints before sign-off.

Two rules that matter most:

- **Token names are an API.** Every colour, type, spacing and radius decision is
  a named Figma Variable, never a hardcoded value. Without token names the
  developer's tooling has nothing to map and no way to check its own output.
- **If it changes the design, it goes back to Figma.** Design changes are never
  fixed only on the built site, or the design and the build drift apart.

## What is in `documents/`

| File | What it is for |
|------|----------------|
| `01_designer_workflow.md` | Her step-by-step workflow and the handoff checklist. Start here |
| `02_lifecycle.md` | Where she sits in the whole process, and which gates she owns |
| `03_design_system_reuse_model.md` | One shared base kit plus a per-client theme, and the three-tier token model |
| `04_figma_naming_standard.md` | The naming standard. Follow it exactly; do not invent names |
| `05_design_system_checklist.md` | The Gate 1b exit checklist for the design system |
| `06_handover_contract.md` | The Gate 1d contract the file must satisfy before handoff |
| `07_web_design_principles.md` | Our design point of view, and the quality floor |
| `08_anti_ai_design_checklist.md` | The five constraints that stop work looking AI-generated |
| `09_design_md_workflow.md` | Ownership, timing, source boundaries, required content and exclusions for DESIGN.md |
| `10_DESIGN_TEMPLATE.md` | The client-level DESIGN.md template. The PM copies it into the project; the Designer completes it |
| `11_CREATE_DESIGN_MD_PROMPT.md` | Guided two-pass Cowork prompt for drafting and verifying DESIGN.md |

## Two honest notes

1. **Documents 07 and 08 are reference copies.** The installable Cowork version
   of the agency checks is the DiscoverWeb design-standard skill in
   `claude-cowork-designer/`. It uses these standards and works alongside
   Anthropic's Design plugin commands such as `/design-critique`,
   `/accessibility-review`, `/design-handoff`, `/design-system` and `/ux-copy`.
2. **The design is the same for both build targets.** Whether the site is built
   in WordPress plus Breakdance or Astro plus Payload, the design system, tokens,
   components and states do not change. The workflow document sets out the build
   constraints that apply to both, and keeps the per-target detail as reference
   only. You never design differently for a target.
