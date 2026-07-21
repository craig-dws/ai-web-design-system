# Designer 07: Teach Claude Design the base kit (org-wide)

- **Who:** whoever owns the Claude Design account for the team.
- **Tool:** Claude Design.
- **How often:** once, and re-run whenever the base kit changes. This is a
  snapshot, not a live link.

Claude Design can be taught a design system, so that concepting uses our brand
and our tokens instead of generic defaults. This is the cheapest available fix
for AI-looking output, and it applies to everyone: once uploaded, the system
appears under **Design systems for everyone in your org**, which is exactly what
the Team plan is for.

In Claude Design: **Add a design system**. Two routes are offered.

| Route | What it reads | Use it? |
|-------|---------------|---------|
| **Create here** | Connect to **Figma** or GitHub, or upload slides and assets | **Yes, via Figma.** Our source of truth is Figma |
| **Create using Claude Code** (labelled BEST FIDELITY) | Runs `/design-sync` against a code package; reads tokens and **React components** | **Not for Target A.** We have no React components. Reconsider for a Target B (Astro) build that has a real code token layer |

**Take the Figma route** for the base kit. The "BEST FIDELITY" label is real but
conditional: it is best if you have React components. Connecting Figma gives
Claude Design the same tokens the rest of the pipeline uses, which is the point.

**Revisit for Target B.** An Astro plus Payload project has a real code token
layer, so the Claude Code route may genuinely be better there. Evaluate it when
the first Target B build exists, not before.

**A naming trap, already handled:** Anthropic's first-party command is
`/design-sync`. Our token skills are deliberately called `token-sync` (Target A)
and `token-to-code` (Target B). Do not rename either to `design-sync` or it will
shadow Anthropic's command and break this upload. See `docs/09`.

**Re-upload when the base kit changes.** A stale design system in Claude Design
is worse than none, because it produces confidently off-brand work. Make
re-upload part of the base kit's change process.

**Only build industry starters after the pilot.** A starter is the base kit plus
a sector default look. Building starters on an unproven base kit means
productionising a guess.
