# Prompt 2b: Onboard the designer

- **Who:** the designer.
- **Tool:** Claude Cowork, in the Claude Desktop app. No terminal, no Git, no
  Claude Code.
- **How often:** once. Work through it with her.

The designer never uses Claude Code or Git. She lives in Figma and Cowork. This
is not a paste-in prompt; it is a short setup checklist to work through together.

1. **Claude Desktop**, signed in on the Team seat. She works in the **Cowork** tab, never Code.
2. **Install the Design plugin** from claude.com/plugins. This gives her `/design-critique`, `/accessibility-review`, `/design-handoff`, `/design-system`, `/ux-copy`, `/user-research`, `/research-synthesis`.
3. **Install the Figma plugin** from claude.com/plugins. Needs a paid Figma Dev or Full seat. This is how Claude works on her canvas (`figma-use`, `figma-generate-design`, `figma-generate-library`).
4. **Claude Design for concepts only.** It is rate-limited (roughly 3 to 4 prompts a week on Pro) and **does not export to Figma**. Concepts inform the Figma work; they do not become it.
5. **Read two documents only**: `docs/25_end_to_end_lifecycle.md` and `docs/22_design_system_reuse_model.md`.
6. **Half a day on tokens**: Variables and collections, primitive vs semantic, aliasing, Extended Collections, Auto Layout. Then run `/design-system` on a real file and fix what it flags.
