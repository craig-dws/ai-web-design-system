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
   their states. This is the real work.
   (**Gate 1b: the Design Lead approves the design system.** This is the most
   important gate in the whole process, because everything downstream inherits
   it.)
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

## Two honest notes

1. **The last two documents are reading, not tools.** They are written as Claude
   Code skills for the developer's environment. In Cowork she cannot invoke them
   as skills, but the guidance in them is ours and applies to her work. In Cowork
   she uses Anthropic's design plugin instead: `/design-critique`,
   `/accessibility-review`, `/design-handoff`, `/design-system`, `/ux-copy`.
2. **The workflow document has a Breakdance section.** That applies to Target A
   (WordPress plus Breakdance). The practical rules are the same either way:
   design every layout as flex or grid, keep structure shallow and reusable, and
   assume the client edits content, not layout. If the project is Target B (Astro
   plus Payload), ignore the Breakdance-specific naming but keep those rules.
