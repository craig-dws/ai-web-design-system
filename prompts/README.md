# Setup and onboarding prompts

Each prompt is a separate file so it can be copied and pasted on its own. The
source narrative, with the reasoning behind each, is in `START_HERE.md`.

| File | Who runs it | Tool | How often |
|------|-------------|------|-----------|
| `01_stand_up_system_dev_lead.md` | Dev Lead (or PM standing the system up) | Claude Code | Once, ever, for the repo. Already run on 19 July 2026 |
| `02a_onboard_developer_or_pm.md` | Each developer or PM | Claude Code | Once per person |
| `02b_onboard_designer_cowork.md` | The designer | Claude Cowork (no terminal) | Once |
| `02c_connect_verify_mcps_developer.md` | Each developer | Claude Code | Once per machine, or whenever MCP access breaks |
| `03a_base_kit_designer_cowork.md` | Designer plus Design Lead | Claude Cowork | Once, to build the base kit |
| `03b_mirror_base_kit_dev.md` | Dev Lead | Claude Code | Once per build target, after the base kit is approved |
| `03c_teach_claude_design.md` | Whoever owns Claude Design | Claude Design | Once, and re-run when the base kit changes |

## The order

1. **Prompt 1** builds the shared system and commits it. It is run once, by one
   person, for the whole repository. Nobody else runs it. Everyone else inherits
   the result by cloning or pulling the repo.
2. **Prompt 2a, 2b, 2c** onboard each person's own machine. They do not rebuild
   the shared system; they set up the local, uncommitted pieces and connect the
   tools. 2c is the focused MCP connect-and-verify helper for developers.
3. **Prompt 3a, 3b, 3c** build the agency design system base kit. This is the one
   thing the setup prompt cannot do for you, because a design system is a design
   decision made in Figma. Without it there are no token names, and nothing
   downstream has a contract to check against.

## What is shared versus per person

Committed and shared (arrive with the clone, never recreated): `.claude/`
(agents, skills, commands, hooks, `settings.json`) and `.mcp.json` (the MCP
server definitions).

Per person and per machine (never committed): plugin installs, MCP
authentication (each person's own Figma sign-in), `settings.local.json`, and any
local environment variables or secrets.
