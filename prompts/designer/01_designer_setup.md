# Designer 01: Get set up

- **Who:** the designer, with the PM or Dev Lead doing the prep first.
- **Tool:** Claude Cowork, in the Claude Desktop app. No terminal, no Git, no
  Claude Code.
- **How often:** once, when she joins the system.

---

## Part A. Prep, done by the PM or Dev Lead before she starts

She has **no repository**, so she cannot open anything at a `docs/...` path.
Produce her documents and hand them over:

1. From the repository root, run `bash designer-pack/assemble.sh`.
2. Share the resulting `designer-pack/documents/` folder with her: her shared
   Google Drive, or a folder on her machine.
3. Re-run the script and re-share whenever a source document changes. The pack is
   a snapshot, not a live link. A stale pack is worse than none, because she will
   follow an old standard confidently.

She also installs, from claude.com/plugins, **in Cowork** (not Claude Code):

- the **Design** plugin: `/design-critique`, `/accessibility-review`,
  `/design-handoff`, `/design-system`, `/ux-copy`, `/user-research`,
  `/research-synthesis`,
- the **Figma** plugin, which needs a paid Figma Dev or Full seat. This is how
  Claude works on her canvas (`figma-use`, `figma-generate-design`,
  `figma-generate-library`).

Confirm she is signed into **Claude Desktop on the Team seat** and works in the
**Cowork** tab, never Code.

---

## Part B. Her prompt

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

## Part C. Her first practice task

Half a day in Figma on tokens: Variables and collections, primitive versus
semantic, aliasing, Extended Collections, and Auto Layout. Then run
`/design-system` over a real file and fix everything it flags. A single hardcoded
hex or off-scale spacing value is a defect, not a detail.

## What she owns

Stage 1, Design. She produces the visual direction, the design system, the
homepage, the internal pages, and the dev-ready handoff. Her gates are **1a**
visual direction (client), **1b design system (Design Lead, the important one)**,
**1c** homepage (client), and **1d** handoff accepted (Dev Lead). She does not
touch the build or staging.

**The design is the same regardless of build target.** She never designs
differently for WordPress plus Breakdance versus Astro plus Payload.
