# Prompts

Each prompt is a separate file so it can be copied and pasted on its own. The
reasoning behind the setup prompts is in `START_HERE.md`.

There are three groups: **one-time system setup**, then a **per-project sequence
for the designer** and one **for the developer**.

## One-time setup

| File | Who | Tool | How often |
|------|-----|------|-----------|
| `01_stand_up_system_dev_lead.md` | Dev Lead | Claude Code | Once, ever, for the repo. Already run |
| `02a_onboard_developer_or_pm.md` | each dev or PM | Claude Code | Once per person |
| `02b_onboard_designer_cowork.md` | PM, working with the designer | Cowork | Once |
| `02c_connect_verify_mcps_developer.md` | each dev | Claude Code | Once per machine |
| `03a_base_kit_designer_cowork.md` | designer plus Design Lead | Cowork | Once, ever: the agency base kit |
| `03b_mirror_base_kit_dev.md` | Dev Lead | Claude Code | Once per build target |
| `03c_teach_claude_design.md` | Claude Design owner | Claude Design | Once, re-run on change |

Prompt 1 is not a per-person step. It builds the shared system and commits it;
everyone else inherits it by cloning. Prompt 2 onboards each person's machine.

## Designer, per project (`designer/`)

She works in Figma with Cowork. No terminal, no Git. Give her the documents first:
run `bash designer-pack/assemble.sh` and share `designer-pack/documents/`.

| File | When |
|------|------|
| `01_designer_setup.md` | Once, when she joins. Orients her on her role and gates |
| `02_concept_directions_claude_design.md` | Start of a project. Visual directions in Claude Design. **Gate 1a** |
| `03_build_design_system.md` | The base kit once, then an Extended Collection per client. **Gate 1b** |
| `04_handoff_self_check.md` | Before every handoff. **Gate 1d** |

## Developer, per project (`developer/`)

| File | When |
|------|------|
| `01_dev_setup.md` | Machine once, then once per client project |
| `02_accept_handoff.md` | **Gate 1d.** Accept or reject the dev-ready file |
| `03_tokens.md` | **Gate 2a.** Extract once, sync by reviewed diff |
| `04_build_page.md` | **Gates 2b and 2c.** One page at a time, tokens only |
| `05_qa_and_launch.md` | **Gates 3a to 3c.** QA, UAT triage, launch |

## The two rules that hold across all of them

1. **The design is the same for both build targets.** Brief, research, creative
   direction, design system and token extraction are identical whether the site is
   built in WordPress plus Breakdance or Astro plus Payload. Only the build
   differs. Never design differently for a target.
2. **Tokens are the contract.** Reference token names, never raw values. Without a
   token name there is no definition of "right" for a reviewer or an agent to
   check against, and review becomes guesswork.

## What is shared versus per person

Committed and shared, arriving with the clone and never recreated: `.claude/`
(agents, skills, commands, hooks, `settings.json`) and `.mcp.json`.

Per person and per machine, never committed: plugin installs, MCP authentication
(each person's own Figma sign-in), `settings.local.json`, and local environment
variables or secrets.
