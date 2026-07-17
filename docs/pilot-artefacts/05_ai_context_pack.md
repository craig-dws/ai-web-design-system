# AI Context Pack

AI Web Design System v0.1 (Pilot). This is the per-project context pack given to Claude Code at the start of a build. Fill every field. This example is a filled skeleton; replace the bracketed values for the real project.

Project: [Codename, e.g. acme-2607]  |  Prepared by: [Name]  |  Date: [YYYY-MM-DD]

## Project Overview

- **Client**: [Client name]
- **What we are building**: [e.g. a five-page marketing site on the existing WordPress install]
- **Design source**: [Figma file link], status Dev Ready
- **Handover contract**: [link to signed 04_design_to_development_handover_contract.md]

## Stack

- Claude Code (build agent)
- Figma MCP (reads the design and tokens)
- Breakdance (WordPress page builder, the build target)
- Novamira on staging (AI abilities, staging only)
- **WordPress on staging**: [staging URL]

## Token Source of Truth

- The Figma Local Variables collection is the single source of truth for colour, type, and spacing.
- **Read tokens via Figma MCP**. Do not invent values.
- **Mirror file, if used**: [path to DESIGN.md or tokens export]

## Breakdance Conventions and Element Vocabulary

Build with the Breakdance element vocabulary. Preferred elements:

| Element | Use |
|---------|-----|
| Section | Top-level page band, one concept per section |
| Div | Grouping and layout wrapper inside a section |
| Columns | Multi-column layout within a section |
| Post Loop Builder | Dynamic listings (blog, services, team) |
| Global Blocks | Shared header, footer, and repeated components |

- Map Figma components to Global Blocks where the element repeats.
- Use Breakdance spacing and layout controls that reflect the token scale.

## Protected Paths (never modify)

- wp-config.php
- Production site and production database
- [Any other locked path for this project]

## Hard Rules

- **No raw PHP layout files**. Build layout in Breakdance only.
- **Differential merge only**. Change the minimum, never wholesale-replace working data.
- Always back up _breakdance_data before edits, and clear the Breakdance cache after.
- **Staging only**. No production changes without explicit sign-off and a separate release step.
- **Use tokens for all colour, type, and spacing**. No hardcoded values.

## Approved Prompts

- Run only prompts and agents listed in 06_approved_prompts_and_agent_instructions.md.
- **Canonical prompt text lives in the prompt library**: [14_prompt_library.md].

## CLAUDE.md Location

- **Project CLAUDE.md**: [path, e.g. the project repo root CLAUDE.md]
- This context pack is read alongside CLAUDE.md at the start of every session.

## Open Notes for the Build

- [Anything the agent should know: known quirks, client preferences, priority order]
