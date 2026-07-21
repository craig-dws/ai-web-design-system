# Designer 01: Orientation and training

- **Who:** the designer, with the PM or Dev Lead preparing access and documents first.
- **Tool:** Claude Cowork, in the Claude Desktop app. No terminal, no Git, no
  Claude Code.
- **How often:** once, after her Cowork skill and plugins are installed.

---

## Before starting

Complete the installation steps in
`claude-cowork-designer/INSTALL-FOR-DESIGNER.md`. Confirm the DiscoverWeb design
standard skill, Design plugin and Figma plugin are available and working.

The designer has no repository access, so the PM or Dev Lead must also:

1. Run `bash designer-pack/assemble.sh` from the repository root.
2. Share the resulting `designer-pack/documents/` folder with her.
3. Rebuild and re-share the pack whenever a source document changes.

---

## Orientation prompt

She pastes this into Cowork, with her documents folder attached or pointed at.

```
I am the designer at our agency. I am setting myself up on our AI web design system for
the first time. I work in Figma, which is our design source of truth, and I use you in
Cowork to help. I never use a terminal, Git, or the page builder.

I have given you our documents folder. Read these first, in this order:
- 00_START_HERE.md
- 01_designer_workflow.md
- 02_lifecycle.md

Then help me get oriented. Please:

1. Summarise back to me, in plain language, what I own and what I do not. Include the
   four gates I am involved in and who approves each one.

2. Tell me the single most important gate and why everything downstream depends on it.

3. Explain our token model in a way I can act on: what primitive, semantic and component
   tiers are, what aliasing means, and why a token name matters more than the styling.
   Read 03_design_system_reuse_model.md and 04_figma_naming_standard.md for this.

4. Give me a short checklist of what "dev-ready" means for a file I hand over, drawn from
   06_handover_contract.md, so I know the finish line before I start.

5. Tell me the five things that most often go wrong for a designer on this system, and how
   to avoid each.

Then stop and let me ask questions. Do not start designing anything yet.

Rules for you:
- Our standard wins over your general knowledge. If they disagree, say so and follow ours.
- British and Australian English. No em dashes, no en dashes, no emojis.
- Ask me rather than assume.
```

---

## First practice task

Half a day in Figma on tokens: Variables and collections, primitive versus
semantic, aliasing, Extended Collections, and Auto Layout. Then run
`/design-system` over a real file and fix everything it flags. A single hardcoded
hex or off-scale spacing value is a defect, not a detail.

## What she owns

Stage 1, Design. She produces the visual direction, the design system, the
homepage, the internal pages, and the dev-ready handoff. Her gates are **1a**
visual direction (client), **1b design system (Designer self-certification, with
the PM recording the evidence, the important one)**,
**1c** homepage (client), and **1d** handoff accepted (Dev Lead). She does not
touch the build or staging.

**The design is the same regardless of build target.** She never designs
differently for WordPress plus Breakdance versus Astro plus Payload.
