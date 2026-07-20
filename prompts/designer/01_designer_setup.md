# Designer 01: Get set up

- **Who:** the designer, herself.
- **Tool:** Claude Cowork, in the Claude Desktop app.
- **How often:** once, when she joins the system.

Before she runs this, someone must give her the documents. From the repository
root, run `bash designer-pack/assemble.sh` and share the resulting
`designer-pack/documents/` folder with her (shared Drive, or a folder on her
machine). She has no repository, so this folder is the only way she can read the
standard.

She also needs, from claude.com/plugins, in **Cowork** (not Claude Code):
- the **Design** plugin (`/design-critique`, `/accessibility-review`,
  `/design-handoff`, `/design-system`, `/ux-copy`),
- the **Figma** plugin (needs a paid Figma Dev or Full seat).

Then she pastes this into Cowork, with her documents folder attached or pointed at.

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

## Her first practice task, after the above

Half a day in Figma on tokens: Variables and collections, primitive versus
semantic, aliasing, Extended Collections, and Auto Layout. Then run
`/design-system` over a real file and fix everything it flags. A single hardcoded
hex or off-scale spacing value is a defect, not a detail.
