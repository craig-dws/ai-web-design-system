# Prompt 2b: Onboard the designer

- **Who:** the designer.
- **Tool:** Claude Cowork, in the Claude Desktop app. No terminal, no Git, no
  Claude Code.
- **How often:** once. Work through it with her.

The designer never uses Claude Code or Git. She lives in Figma and Cowork. This
is not a paste-in prompt; it is a short setup checklist to work through together.

## Before you sit down with her (PM or Dev Lead does this first)

She has no repository, so she cannot read anything at a `docs/...` path. Produce
her documents and give them to her:

1. From the repository root, run `bash designer-pack/assemble.sh`.
2. Share the resulting `designer-pack/documents/` folder with her: put it in her
   shared Google Drive, or copy it to a folder on her machine.
3. Re-run the script and re-share whenever a source document changes. The pack is
   a snapshot, not a live link.

In Cowork she can then point Claude at that folder, so "read our standard" means
a real file she actually has.

## The setup, with her

1. **Claude Desktop**, signed in on the Team seat. She works in the **Cowork** tab, never Code.
2. **Install the Design plugin** from claude.com/plugins. This gives her `/design-critique`, `/accessibility-review`, `/design-handoff`, `/design-system`, `/ux-copy`, `/user-research`, `/research-synthesis`.
3. **Install the Figma plugin** from claude.com/plugins. Needs a paid Figma Dev or Full seat. This is how Claude works on her canvas (`figma-use`, `figma-generate-design`, `figma-generate-library`).
4. **Claude Design for concepts only.** It is rate-limited (roughly 3 to 4 prompts a week on Pro) and **does not export to Figma**. Concepts inform the Figma work; they do not become it.
5. **Point Cowork at her documents folder** (the designer pack) so she can ask Claude to read the standard and the checklists.
6. **Read two documents first**: `01_designer_workflow.md` (her step-by-step and the handoff checklist) and `02_lifecycle.md` (where she sits and which gates she owns). `00_START_HERE.md` in the pack orients her.
7. **Half a day on tokens**: Variables and collections, primitive vs semantic, aliasing, Extended Collections, Auto Layout. Then run `/design-system` on a real file and fix what it flags.

## What she owns

Stage 1, Design. She produces the visual direction, the design system, the
homepage, the internal pages, and the dev-ready handoff. Her gates are 1a visual
direction (client), **1b design system (Design Lead, the important one)**, 1c
homepage (client), and 1d handoff accepted (Dev Lead). She does not touch the
build or staging.
