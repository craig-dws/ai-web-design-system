# 09. Skills, Subagents, Slash Commands and Hooks

**AI Web Design System v0.1** | Internal developer and PM reference

This document defines the Skills, Subagents, Slash commands and Hooks the web-build system should ship inside each client site project. Every example uses the canonical, minimal Claude Code config forms. Do not add frontmatter fields beyond those shown.

These are **web-build** automations. They are separate from the existing ZilvaEdge content-system agents and skills. They live in the client site build project (see [06_claude_code_project_structure.md](06_claude_code_project_structure.md)), not in the ZilvaEdge repository.

**Two build targets, two automation sets.** The first half of this document (token-sync, breakdance-builder, wp-security-auditor, the WordPress hooks) is for **Target A: WordPress plus Breakdance**. The section "Astro plus Payload automations" is for **Target B**. A project installs only the set for its chosen target. The `figma-token-extractor` subagent is shared, since token extraction from Figma is target-neutral.

## Canonical forms in one line each

- **Skill**: `.claude/skills/<name>/SKILL.md`, YAML frontmatter with only `name` and `description`, then a markdown body.
- **Subagent**: `.claude/agents/<name>.md`, frontmatter `name`, `description`, optional `tools`, optional `model`; body is the system prompt.
- **Slash command**: `.claude/commands/<name>.md`; optional frontmatter `description`, `argument-hint`, `allowed-tools`; body is the prompt; use `$ARGUMENTS` or `$1 $2` for args.
- **Hook**: configured in `settings.json` under `"hooks"`, keyed by event name, each with a matcher and a command; a hook blocks a call via exit code 2 or a JSON `permissionDecision` of `"deny"` or `"ask"`.

## Skill: token-sync

Orchestrates the token extraction and Breakdance sync step. Invoked with `/token-sync`.

**Do not rename this to `design-sync`.** Claude Design ships a first-party `/design-sync` command that uploads a design system to Claude Design (it reads tokens and React components from a code package). A skill of the same name would shadow it and break that upload. Ours syncs Figma tokens into Breakdance, which is a different job.

File: `.claude/skills/token-sync/SKILL.md`

```markdown
---
name: token-sync
description: Sync Figma design tokens into Breakdance global variables on staging using a safe differential merge. Use when the design system tokens have changed and need to be reflected in the Breakdance build, or when the operator runs /token-sync. Reads Figma variables, exports current Breakdance settings, merges without overwriting custom CSS or clamp() functions, imports, and clears cache.
---

# Design Sync

Sync the Figma design tokens into Breakdance global variables on the staging
site without destroying existing configuration.

## Steps

1. Read the current design tokens from Figma with get_variable_defs.
2. Export the current Breakdance settings: `wp breakdance export_settings`.
3. Perform a differential merge:
   - Preserve every existing key.
   - Preserve all custom CSS exactly.
   - Preserve all clamp() functions exactly.
   - Add or update only the global variables the Figma tokens require.
4. Write the merged JSON to a new file and show the diff for review.
5. Pause for human approval of the diff before importing.
6. Import the merged settings: `wp breakdance import_settings <file>`.
7. Clear cache: `wp breakdance clear_cache`.
8. Verify: `wp breakdance status`.

## Rules

- Never blind-overwrite settings. Never run total_reset.
- Back up the relevant postmeta before importing.
- Reference variables, never hardcoded hex or off-scale spacing.
```

## Subagents

Three web-build subagents. Each is a single `.md` file whose body is the system prompt.

### figma-token-extractor

File: `.claude/agents/figma-token-extractor.md`

```markdown
---
name: figma-token-extractor
description: Extracts resolved design tokens from Figma and maps them to Breakdance global variable names. Use when you need a clean token export before a Breakdance sync. Read-only on Figma; does not write to WordPress.
tools: mcp__figma__get_variable_defs, mcp__figma__get_design_context, mcp__figma__get_metadata, Read, Write
---

You extract design tokens from Figma and produce a clean mapping to
Breakdance global variables.

Process:
1. Call get_variable_defs to read the resolved tokens (colour, type, spacing).
2. Scope any get_design_context call to selected frames only. It can exceed
   token limits on large pages.
3. Produce a mapping table: Figma token name, resolved value, proposed
   Breakdance global variable name.
4. Use semantic names throughout. Flag any token that resolves to a
   hardcoded value with no semantic home.

You do not write to WordPress and you do not import anything. You output the
token export and the mapping only.
```

### breakdance-builder

File: `.claude/agents/breakdance-builder.md`

```markdown
---
name: breakdance-builder
description: Builds a single page in Breakdance on staging from an approved Figma frame, using established global variables. Use for per-subpage generation. Never writes raw PHP; never touches production.
tools: mcp__figma__get_design_context, mcp__figma__get_screenshot, mcp__figma__get_code_connect_map, mcp__novamira__*, Bash, Read, Write
---

You build one Breakdance page at a time from an approved Figma frame.

Rules:
1. Scope to the single target frame. Call get_design_context and
   get_screenshot on that frame only.
2. Reference established Breakdance global variables for all colour, type,
   and spacing. Never hardcode values. If a needed variable is missing,
   stop and report it.
3. Map Auto Layout to Section and Div; columns to the Columns element; use
   the Post Loop Builder for repeating content.
4. Never write raw PHP layout files. Build through Breakdance elements only.
5. Commit to one page. Do not touch other pages or global settings.
6. After building, run `wp breakdance clear_cache` and return the staging
   preview URL.
```

### wp-security-auditor

File: `.claude/agents/wp-security-auditor.md`

```markdown
---
name: wp-security-auditor
description: Audits the staging WordPress and Breakdance build for security issues before a client review or a production handover. Read-only; reports findings and does not change files.
tools: Read, Grep, Glob, Bash
model: opus
---

You audit the staging WordPress site and the Breakdance build for security
issues. You are read-only. You report; you do not fix.

Check for:
1. Dangerous PHP in any custom code: eval, exec, shell_exec, system,
   passthru, assert with dynamic input, base64_decode feeding eval.
2. Secrets committed to the repository or hardcoded in files (API keys,
   Application Passwords, database credentials).
3. Application Passwords served over plain HTTP on a non-local environment.
4. File permissions and world-writable paths flagged by the host.
5. Breakdance custom code blocks that execute unfiltered input.

Output a findings list ranked HIGH, MEDIUM, LOW, each with the file, the
line, the risk, and a recommended fix. Do not edit any file.
```

## Slash commands

Two web-build slash commands.

### /new-subpage

File: `.claude/commands/new-subpage.md`

```markdown
---
description: Build one new subpage in Breakdance from a named Figma frame
argument-hint: <page-name> <figma-frame>
allowed-tools: mcp__figma__get_design_context, mcp__figma__get_screenshot, mcp__novamira__*, Bash(wp breakdance clear_cache)
---

Build the single page "$1" in Breakdance on staging so it matches the Figma
frame "$2".

Delegate to the breakdance-builder subagent. Enforce these rules:
- Scope to the frame "$2" only.
- Reference Breakdance global variables; never hardcode values.
- Map Auto Layout to Section and Div; use the Post Loop Builder for
  repeating content.
- Never write raw PHP.
- Build only this one page, then run wp breakdance clear_cache and return
  the staging preview URL.

Then run a visual QA pass: screenshot the built page, compare to "$2", and
patch any layout discrepancies using global variables only.
```

### /deploy-staging

File: `.claude/commands/deploy-staging.md`

```markdown
---
description: Sync tokens and clear caches to refresh the staging build
argument-hint: [optional note]
allowed-tools: mcp__figma__get_variable_defs, Bash(wp breakdance export_settings*), Bash(wp breakdance clear_cache), Bash(wp breakdance status)
---

Refresh the staging build. Context note: $ARGUMENTS

Steps:
1. Run the token-sync skill to bring Breakdance global variables in line
   with the current Figma tokens (differential merge, human-reviewed diff,
   never a blind overwrite).
2. After the sync, run wp breakdance clear_cache.
3. Run wp breakdance status and report the result.

Do not import settings without showing the diff first. Do not run
total_reset.
```

## Hooks

Four hooks in `.claude/settings.json`. They block edits to protected paths, scan for dangerous PHP before writes, lint changed PHP, and clear the Breakdance cache after database-affecting operations.

The hook scripts live in `.claude/hooks/`. A `PreToolUse` hook blocks a call by exiting with code 2 (or by returning JSON with `permissionDecision` of `"deny"`).

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/block-protected-paths.sh"
          }
        ]
      },
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/scan-dangerous-php.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/phpcs-changed.sh"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/breakdance-clear-cache.sh"
          }
        ]
      }
    ]
  }
}
```

### block-protected-paths.sh (PreToolUse)

Blocks any Write or Edit to `wp-config.php` or a production path. The hook reads the tool input from stdin and exits 2 to deny.

```bash
#!/usr/bin/env bash
# Deny writes to wp-config.php and any production path.
input="$(cat)"
path="$(printf '%s' "$input" | grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"file_path"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')"

case "$path" in
  *wp-config.php|*/production/*|*/live/*)
    echo "Blocked: $path is a protected path and must not be edited by the agent." >&2
    exit 2
    ;;
esac
exit 0
```

### scan-dangerous-php.sh (PreToolUse)

Scans the content being written for dangerous PHP execution calls before the Write lands. Exits 2 to deny if a match is found.

```bash
#!/usr/bin/env bash
# Block Writes that introduce dangerous PHP execution sinks.
input="$(cat)"
path="$(printf '%s' "$input" | grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"([^"]*)".*/\1/')"

# Only scan PHP files.
case "$path" in
  *.php) ;;
  *) exit 0 ;;
esac

content="$(printf '%s' "$input" | grep -oE '"(content|new_string)"[[:space:]]*:.*')"
if printf '%s' "$content" | grep -qiE '\b(eval|exec|shell_exec|system|passthru|proc_open|popen)\s*\('; then
  echo "Blocked: dangerous PHP execution call detected in $path (eval/exec/shell_exec/system/passthru). Refactor to avoid it." >&2
  exit 2
fi
exit 0
```

### phpcs-changed.sh (PostToolUse)

Runs phpcs on a changed PHP file after a Write or Edit. Non-blocking: it reports issues but exits 0 so the workflow continues. Change the final line to `exit 2` if you want lint failures to block.

```bash
#!/usr/bin/env bash
# Lint the changed PHP file with phpcs (report-only).
input="$(cat)"
path="$(printf '%s' "$input" | grep -oE '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"([^"]*)".*/\1/')"

case "$path" in
  *.php) ;;
  *) exit 0 ;;
esac

if command -v phpcs >/dev/null 2>&1 && [ -f "$path" ]; then
  phpcs --standard=WordPress "$path" || echo "phpcs reported issues in $path (review above)."
fi
exit 0
```

### breakdance-clear-cache.sh (PostToolUse)

After a Bash command that affects the database (an import, a URL replace, a settings change), clears the Breakdance cache so staging reflects the change.

```bash
#!/usr/bin/env bash
# After a DB-affecting Breakdance/WP command, clear the Breakdance cache.
input="$(cat)"
cmd="$(printf '%s' "$input" | grep -oE '"command"[[:space:]]*:[[:space:]]*"[^"]*"' | sed -E 's/.*"command"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')"

if printf '%s' "$cmd" | grep -qE 'breakdance (import_settings|replace_url)|wp (post|option|db) '; then
  wp breakdance clear_cache && echo "Breakdance cache cleared after DB-affecting operation."
fi
exit 0
```

Make the scripts executable once:

```bash
chmod +x .claude/hooks/*.sh
```

## Astro plus Payload automations (Target B)

For the Astro plus Payload target, the automations work on version-controlled code and the Payload schema rather than on a live WordPress database. There is no Novamira and no raw-PHP surface, so the hooks protect secrets and the repository rather than a database.

### Skill: token-to-code

File: `.claude/skills/token-to-code/SKILL.md`

```markdown
---
name: token-to-code
description: Sync Figma design tokens into the Astro code token layer (Tailwind config and CSS custom properties) using the shared semantic token names. Use when the design system tokens have changed and need to be reflected in the Astro build, or when the operator runs /token-to-code. Reads Figma variables, updates the token files, and shows the diff for review.
---

# Token to Code

Sync the Figma design tokens into the Astro code token layer without breaking
the naming bridge.

## Steps

1. Read the current design tokens from Figma with get_variable_defs.
2. Map each token to its semantic name (identical across Figma, Tailwind, and CSS).
3. Update the Tailwind config and the CSS custom properties with the resolved values.
4. Show the diff for review. Pause for human approval before committing.
5. Do not rename tokens. Change values only, unless a new token was agreed at handoff.

## Rules

- Preserve the semantic token names exactly. The naming bridge is the whole game.
- Never hardcode a value in a component when a token exists.
- Tokens live in code, never in Payload.
```

### Subagent: astro-component-builder

File: `.claude/agents/astro-component-builder.md`

```markdown
---
name: astro-component-builder
description: Builds one Astro component or page from an approved Figma frame, referencing the code token layer and wiring content from Payload. Use for per-component and per-subpage generation on the Astro plus Payload target. Edits version-controlled code only; never touches production.
tools: mcp__figma__get_design_context, mcp__figma__get_screenshot, mcp__figma__get_code_connect_map, Read, Write, Edit, Bash
---

You build one Astro component or page at a time from an approved Figma frame.

Rules:
1. Scope to the single target frame. Call get_design_context and get_screenshot on that frame only.
2. Reference token names for all colour, type, and spacing. Never hardcode a value. If a needed token is missing, stop and report it.
3. Build one Astro component per Payload block type and per layout region.
4. Wire content from Payload via its API or Local API; render the Blocks array to the matching components.
5. Commit to one component or page. Do not touch unrelated files.
6. After building, note the local preview and leave the change for human review in Git.
```

### Subagent: payload-schema-modeller

File: `.claude/agents/payload-schema-modeller.md`

```markdown
---
name: payload-schema-modeller
description: Defines or edits the Payload content model (Collections, Globals, Fields, Blocks) in TypeScript to match the sitemap and design. Use when modelling content for the Astro plus Payload target. Edits schema code only; flags when a database migration is required.
tools: Read, Write, Edit, Grep, Glob, Bash
---

You model content in Payload as TypeScript config.

Rules:
1. Define one Block type per reusable design section (Hero, CTA, Feature grid, Gallery).
2. Keep the schema honest to the design: never add a field the design cannot render, and never omit one it needs.
3. Use Collections for repeatable content and Globals for single-instance content.
4. When a change affects the database, say so explicitly and produce the migration; do not apply it silently.
5. Never place a design token in Payload. Content and tokens stay separate.
```

### Slash command: /new-astro-page

File: `.claude/commands/new-astro-page.md`

```markdown
---
description: Build one new Astro page from a named Figma frame, wired to Payload
argument-hint: <page-name> <figma-frame>
allowed-tools: mcp__figma__get_design_context, mcp__figma__get_screenshot, Read, Write, Edit, Bash(npm run*)
---

Build the single Astro page "$1" so it matches the Figma frame "$2".

Delegate to the astro-component-builder subagent. Enforce these rules:
- Scope to the frame "$2" only.
- Reference code tokens; never hardcode values.
- Build one component per block type; wire content from Payload.
- Commit only this one page.

Then run a visual QA pass: screenshot the built page, compare to "$2", and patch any discrepancies using token references only.
```

### Hooks (Target B)

For Astro plus Payload, the hooks protect secrets and the repository. There is no cache to clear; a publish triggers a rebuild instead. Configure in `.claude/settings.json`.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/block-secrets-and-prod.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/astro-check-changed.sh" }
        ]
      }
    ]
  }
}
```

The `block-secrets-and-prod.sh` hook denies writes to `.env` files and any production path (exit 2). The `astro-check-changed.sh` hook runs `astro check` or eslint on changed `.astro` and `.ts` files after a write (report-only; change the final line to `exit 2` to make lint failures blocking).

## How the pieces fit

| Layer | Target | What it does |
|-------|--------|--------------|
| Skill `token-sync` | A (Breakdance) | Token extraction and safe Breakdance merge |
| Skill `token-to-code` | B (Astro) | Sync tokens into Tailwind config and CSS vars |
| Subagent `figma-token-extractor` | Shared | Clean token export and mapping |
| Subagent `breakdance-builder` | A | Builds one Breakdance page from one frame |
| Subagent `astro-component-builder` | B | Builds one Astro component or page from one frame |
| Subagent `payload-schema-modeller` | B | Models Payload Collections, Globals, and Blocks |
| Subagent `wp-security-auditor` | A | Read-only WordPress security audit |
| Command `/new-subpage` | A | Per-page Breakdance build plus visual QA |
| Command `/new-astro-page` | B | Per-page Astro build plus visual QA |
| Command `/deploy-staging` | A | Sync and cache refresh |
| Hooks (A) | A | Block protected paths, scan PHP, lint, clear cache |
| Hooks (B) | B | Block secrets and production, run astro check or eslint |

## Related documents

- [05_claude_design_prompt_sequence.md](05_claude_design_prompt_sequence.md)
- [06_claude_code_project_structure.md](06_claude_code_project_structure.md)
- [14_prompt_library.md](14_prompt_library.md)
- [15_claude_code_setup_and_mcp_config.md](15_claude_code_setup_and_mcp_config.md)
