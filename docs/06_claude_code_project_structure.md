# 06. Claude Code Project Structure

**AI Web Design System v0.1** | Internal developer and PM reference

This document defines the recommended per-project Claude Code structure for a design-to-WordPress build. It covers the `.claude/` directory, the `.mcp.json` file, configuration inheritance, what to commit versus what to gitignore, and a recommended `CLAUDE.md` skeleton for a client site build.

## One project per client site

Run one Claude Code project per client site. Never share a project across sites. Each site has its own staging environment, its own Breakdance settings, its own tokens, and its own protected paths. Sharing a project risks a prompt written for one site touching another site's database or files. The isolation is the point.

## Directory tree

```
client-site-build/
├── .claude/
│   ├── settings.json            # committed: shared team config, permissions, hooks
│   ├── settings.local.json      # gitignored: personal overrides, local secrets refs
│   ├── CLAUDE.md                # committed: project brief and conventions
│   ├── skills/
│   │   └── design-sync/
│   │       └── SKILL.md         # committed: design sync workflow skill
│   ├── agents/
│   │   ├── figma-token-extractor.md    # committed
│   │   ├── breakdance-builder.md       # committed
│   │   └── wp-security-auditor.md      # committed
│   ├── commands/
│   │   ├── new-subpage.md       # committed
│   │   └── deploy-staging.md    # committed
│   └── hooks/
│       ├── scan-dangerous-php.sh       # committed: PreToolUse scan
│       ├── phpcs-changed.sh            # committed: PostToolUse lint
│       └── breakdance-clear-cache.sh   # committed: PostToolUse cache clear
├── .mcp.json                    # committed: MCP server definitions (secrets via ${ENV})
├── .env                         # gitignored: actual secret values
├── .gitignore
└── (theme, child theme, or exported artefacts as the build requires)
```

Note: `CLAUDE.md` can live at the project root or inside `.claude/`. This system keeps it inside `.claude/` so all Claude Code configuration sits under one directory. Either location is read.

## Configuration inheritance order

Claude Code merges settings from several sources. When the same setting is defined in more than one place, the higher-precedence source wins. From highest to lowest precedence:

| Precedence | Source | Purpose |
|------------|--------|---------|
| 1 (highest) | Managed (enterprise) policy | Organisation-wide rules that cannot be overridden |
| 2 | Command line arguments | Per-invocation overrides |
| 3 | Local project settings (`settings.local.json`) | Personal, machine-specific, not committed |
| 4 | Shared project settings (`settings.json`) | Team defaults for this project, committed |
| 5 (lowest) | User settings (`~/.claude/settings.json`) | Personal defaults across all projects |

The practical consequence: a permission or hook the team commits in `settings.json` is overridden by a developer's `settings.local.json`, which is overridden by a command line flag, which is overridden by managed policy. Put team guardrails in `settings.json`; keep them strict, since managed policy is the only thing above the command line.

## Commit versus gitignore

Commit everything that defines how the project works so the whole team shares it. Gitignore everything personal or secret.

**Commit:**

- `.claude/settings.json`
- `.claude/CLAUDE.md`
- `.claude/skills/`, `.claude/agents/`, `.claude/commands/`, `.claude/hooks/`
- `.mcp.json` (it references secrets by `${ENV}` name only, never values)

**Gitignore:**

- `.claude/settings.local.json`
- `.env` and any file holding real secret values
- Local build artefacts, caches, and exports that are regenerated

A minimal `.gitignore` for the build:

```gitignore
.claude/settings.local.json
.env
.env.*
*.local
```

## Recommended CLAUDE.md skeleton

Use this as the starting `CLAUDE.md` for a client site build. Fill in the bracketed values. Keep it short and specific; it is loaded into context on every session, so padding costs tokens.

```markdown
# [CLIENT] Site Build

## Project overview
Design-to-WordPress build for [CLIENT]. Design lives in Figma
([FIGMA FILE]). Build target is the Breakdance staging site at
[STAGING_URL]. Production is [PRODUCTION_URL]; we never touch it from here.

## Stack
- WordPress 7.0 (Armstrong) on [HOST]
- Breakdance (Pro) as the page builder
- Figma as the design source of truth
- Claude Code with the Figma MCP and the Novamira WordPress MCP

## Breakdance conventions
- Auto Layout maps to Section and Div; column arrangements map to Columns.
- Repeating content uses the Post Loop Builder.
- Never write raw PHP layout files. Build through Breakdance elements only.
- Never blind-import settings. Always export first, then differential merge.
- Always run wp breakdance clear_cache after any DB-affecting operation.
- Content lives in the _breakdance_data postmeta. Back it up before writes.

## Token source of truth
- Figma Local Variables are the source of truth for design tokens.
- Breakdance global variables mirror the Figma tokens.
- Reference variables, never hardcoded hex or off-scale spacing.
- DESIGN.md (generated by create_design_system_rules) documents the tokens.

## Protected paths (do not edit)
- wp-config.php
- Anything under the production environment.
- .env and any secret-bearing file.

## Dos
- Scope Figma reads to selected frames (get_design_context can exceed limits).
- Work one page at a time and return a staging preview URL.
- Verify every built page against Figma with a screenshot diff.

## Don'ts
- Do not run wp breakdance total_reset.
- Do not run destructive shell commands (rm -rf, sudo).
- Do not commit secrets. Secrets are referenced via ${ENV} in .mcp.json.
```

## Relationship to the ZilvaEdge content system

This project structure is for web-build projects only. It is separate from the existing ZilvaEdge content-system agents and skills. The web-build agents, skills, commands, and hooks defined in [09_skills_agents_commands_hooks.md](09_skills_agents_commands_hooks.md) live inside the client site build project, not in the ZilvaEdge repository.

## Related documents

- [05_claude_design_prompt_sequence.md](05_claude_design_prompt_sequence.md)
- [09_skills_agents_commands_hooks.md](09_skills_agents_commands_hooks.md)
- [15_claude_code_setup_and_mcp_config.md](15_claude_code_setup_and_mcp_config.md)
