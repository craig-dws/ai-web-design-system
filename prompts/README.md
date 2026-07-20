# Prompts

One file per prompt, arranged by **who runs it**. Copy and paste the block inside
each file. The reasoning behind the setup is in `START_HERE.md`.

```
prompts/
  00_system_setup/   once ever, for the whole repository
  pm/                Project Manager, Stage 0
  designer/          Designer, Stage 1
  developer/         Developer, Stages 2 and 3
```

## 00_system_setup (once, ever)

| File | Who | Tool |
|------|-----|------|
| `01_stand_up_system.md` | Dev Lead | Claude Code |

This builds the shared system and commits it. **It is not a per-person step and
it has already been run.** Everyone else inherits the result by cloning the
repository. Nobody re-runs it.

## pm/ (Project Manager)

Works in Cowork. No terminal needed.

| File | When |
|------|------|
| `01_pm_setup.md` | Once, when joining |
| `02_new_site_brief.md` | Start of every project. **Gate: brief approved.** Design does not start without it |

## designer/ (Designer)

Works in Figma with Cowork. No terminal, no Git. **Give her the documents first:**
run `bash designer-pack/assemble.sh` and share `designer-pack/documents/`.

| File | When |
|------|------|
| `01_designer_setup.md` | Once, when joining. Includes the prep the PM does first |
| `02_concept_directions.md` | Start of a project. Visual directions in Claude Design. **Gate 1a** |
| `03_build_agency_base_kit.md` | **Once, ever.** The shared agency base kit |
| `04_client_design_system.md` | Once per client. An Extended Collection, never a fork. **Gate 1b** |
| `05_handoff_self_check.md` | Before every handoff. **Gate 1d** |
| `06_teach_claude_design.md` | Once, and re-run whenever the base kit changes |

## developer/ (Developer)

| File | When |
|------|------|
| `01_dev_setup.md` | Machine once, then once per client project |
| `02_connect_mcps.md` | Once per machine. Connect and verify the MCP servers |
| `03_mirror_base_kit.md` | Once per build target, after the base kit is approved |
| `04_accept_handoff.md` | **Gate 1d.** Accept or reject the dev-ready file |
| `05_tokens.md` | **Gate 2a.** Extract once, sync by reviewed diff |
| `06_build_page.md` | **Gates 2b and 2c.** One page at a time, tokens only |
| `07_qa_and_launch.md` | **Gates 3a to 3c.** QA, UAT triage, launch |

## The three rules that hold across all of them

1. **The design is the same for both build targets.** Brief, research, creative
   direction, design system and token extraction are identical whether the site is
   built in WordPress plus Breakdance or Astro plus Payload. Only the build
   differs. Never design differently for a target.
2. **Tokens are the contract.** Reference token names, never raw values. Without a
   token name there is no definition of "right" for a reviewer or an agent to
   check against, and review becomes guesswork.
3. **AI proposes, humans dispose.** Every gate has a named human owner. Nothing
   AI-generated ships unreviewed, and no agent ever touches production.

## Shared versus per person

Committed and shared, arriving with the clone and never recreated: `.claude/`
(agents, skills, commands, hooks, `settings.json`) and `.mcp.json`.

Per person and per machine, never committed: plugin installs, MCP authentication
(each person's own Figma sign-in), `settings.local.json`, and local environment
variables or secrets.

## A note on skills versus prompts

Our skills (`site-brief`, `web-design`, and the rest) live in `.claude/` and load
in **Claude Code only**. The PM and the designer work in **Cowork**, which does
not load them. That is why their work is provided here as paste-in prompts, and
why the designer's reference material is handed over as documents.
