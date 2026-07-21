# 15. Claude Code Setup and MCP Configuration

**AI Web Design System v0.1** | Internal developer and PM reference

This document gives the exact setup steps and concrete MCP configuration for a design-to-WordPress build. Follow it top to bottom on a fresh client site project.

## 1. Install Claude Code

```bash
npm i -g @anthropic-ai/claude-code
```

Verify:

```bash
claude --version
```

Start Claude Code in the project directory:

```bash
cd client-site-build
claude
```

## 2. Install the Figma MCP plugin and authorise

The Figma MCP is installed as a plugin from the official plugin marketplace, then authorised over OAuth.

```bash
claude plugin install figma@claude-plugins-official
```

Then:

1. Restart Claude Code.
2. Run `/plugin`.
3. Open the **Installed** tab.
4. Select **figma**.
5. Complete the **OAuth** flow in the browser when prompted.

The recommended transport is the remote server endpoint `https://mcp.figma.com/mcp`. The remote server is required for the write-back tools (`use_figma`, BETA) and code-to-canvas generation (`generate_figma_design`).

A **Professional Dev** seat (around US$12 per month) is the realistic minimum for the tooling we rely on. `create_design_system_rules` is a bundled skill that ships with the plugin.

Figma tools available after install:

| Tool | Use |
|------|-----|
| `get_design_context` | Read design context for selected frames (scope to frames; can exceed token limits on large pages) |
| `get_variable_defs` | Read resolved design tokens |
| `get_screenshot` | Capture a frame image for concept review and visual QA |
| `get_code_connect_map` | Read Code Connect mappings (biggest accuracy lever) |
| `get_metadata` | Read frame and node metadata |
| `download_assets` | Download exported assets |
| `use_figma` | Write back to Figma (remote only, BETA) |
| `generate_figma_design` | Generate canvas from code (remote only) |

## 3. Install Novamira on the staging site and paste its setup prompt

**Primary path is the native Breakdance 3.0 MCP, not this Novamira config.** For Target A the primary layout-write path is the native Breakdance 3.0 MCP, connected inside WordPress via Breakdance Settings then Agents and MCP (one-click Agent Connector, Application Password auth), not through the Novamira MCP configuration shown in this section. Test it first (see 27). The Novamira setup below applies **only if the native path fails the write test**; buy no Novamira licence before then.

Novamira is a free WordPress MCP server plugin (Pro tiers run about EUR 49 to 249 per year). It is installed on the staging WordPress site, not on the developer machine.

Steps:

1. Install and activate the Novamira plugin on the **staging** site.
2. In wp-admin, open **Novamira > Configuration**.
3. Enable the **AI Abilities** you need.
4. Use **Copy prompt** to copy Novamira's generated setup prompt.
5. **Paste that prompt into Claude Code**. The agent uses it to write its own MCP configuration for the Novamira server.

Novamira's **eight confirmed** core abilities: Execute PHP, Read File, Write File, Edit File, Delete File, Disable File, Enable File, and List Directory. ("Create Upload Link" appears on marketing pages and is often counted as a ninth, but doc 01 records it as unconfirmed as a distinct free ability. Do not plan around it.)

Guardrails to respect:

- **Development and staging only.** This is policy, not enforced by the plugin. Never point Novamira at production.
- The sandbox is **not** a security boundary. Treat every ability as if it runs with full site privileges.
- **Domain-locking** and a **URL safe-mode kill-switch** are confirmed. Know where the kill-switch is before you start.
- **Do not rely on the widely-cited 30 second PHP execution limit.** It appears only in third-party summaries, not in Novamira's own docs or changelog, and doc 01 records it as unverified. Assume there is no execution ceiling until we have measured one. Our real controls are backups, staging-only, and disposable environments, not a vendor limit that may not exist.

## 4. Verify the MCP servers

```
/mcp
```

Confirm the `figma` and `chrome-devtools` servers show as connected before running any build prompt. That is what the committed `.mcp.json` contains. The WordPress write bridge (the native Breakdance 3.0 MCP, or Novamira as fallback) is added only at pilot time, after the write test.

## Concrete .mcp.json

Place this at the project root. It is committed to version control. Secrets are referenced by `${ENV}` name only; no secret value ever appears in this file.

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    },
    "novamira": {
      "type": "http",
      "url": "https://staging.example.com/wp-json/novamira/mcp",
      "headers": {
        "Authorization": "Bearer ${WP_APP_PW}"
      }
    }
  }
}
```

The `novamira` server here stands in for the WordPress MCP endpoint; use the exact URL and header scheme that Novamira's copied setup prompt produces. The `${WP_APP_PW}` reference is resolved from the environment at runtime.

## The `claude mcp add` equivalents

The same two servers can be registered from the command line instead of by editing `.mcp.json`:

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp

claude mcp add --transport http novamira \
  https://staging.example.com/wp-json/novamira/mcp \
  --header "Authorization: Bearer ${WP_APP_PW}"
```

Use `--scope project` if you want the entry written to the committed `.mcp.json` rather than to your local config.

## Keeping secrets out of version control

Three layers keep secrets safe:

1. **Environment variables.** Real values live in a gitignored `.env` (or your shell environment / a secrets manager). `.mcp.json` references them by name with `${WP_APP_PW}`.

   ```bash
   # .env  (gitignored)
   WP_APP_PW=xxxx xxxx xxxx xxxx xxxx xxxx
   ```

2. **settings.local.json.** Personal, machine-specific overrides go here. It is gitignored and never committed.

3. **.gitignore.** Enforces the above.

   ```gitignore
   .claude/settings.local.json
   .env
   .env.*
   ```

If a secret ever lands in a committed file, rotate it immediately. Rotation is the fix; deleting the commit is not enough.

## Permissions block for settings.json

Put this in the committed `.claude/settings.json`. It defaults to plan mode, denies the dangerous operations outright, and allows the MCP tools and safe Bash the build needs.

```json
{
  "permissions": {
    "defaultMode": "plan",
    "deny": [
      "Write(wp-config.php)",
      "Bash(rm -rf *)",
      "Bash(sudo *)"
    ],
    "allow": [
      "mcp__figma__*",
      "mcp__novamira__*",
      "Bash(wp breakdance status)",
      "Bash(wp breakdance clear_cache)",
      "Bash(wp breakdance export_settings*)",
      "Bash(git status)",
      "Bash(git diff*)",
      "Read(*)"
    ]
  }
}
```

Notes:

- `defaultMode: "plan"` means Claude proposes actions for review before executing. Keep it as the default for a live staging build.
- The `deny` list wins over `allow`. `wp-config.php` writes, `rm -rf`, and `sudo` are blocked regardless of anything else.
- `wp breakdance import_settings` and `wp breakdance total_reset` are deliberately **not** in `allow`. Imports are destructive if done wrong and total_reset is destructive by design, so they require an explicit approval each time rather than a standing allow.

## Application Password gotcha (WP_ENVIRONMENT_TYPE)

WordPress Application Passwords are used to authenticate the WordPress MCP connection. Application Passwords require HTTPS. On a local staging site served over plain HTTP, the Application Passwords feature is hidden and will not generate a credential.

The supported workaround for a local environment is to declare the environment type in `wp-config.php` exactly:

```php
define('WP_ENVIRONMENT_TYPE', 'local');
```

With `WP_ENVIRONMENT_TYPE` set to `local`, WordPress permits Application Passwords over HTTP for local development. Use HTTPS on any staging site that is not local. Remember that `wp-config.php` is a protected path (see the permissions deny list), so this edit is made by hand, not by the agent.

For reference, WordPress 7.0 "Armstrong" (20 May 2026) also ships an AI Client in core (`wp_ai_client_prompt()`, configured under **Settings > Connectors**). That is separate from the MCP setup above and is not required for this build, but it is available on the platform.

## Related documents

- [06_claude_code_project_structure.md](06_claude_code_project_structure.md)
- [09_skills_agents_commands_hooks.md](09_skills_agents_commands_hooks.md)
- [05_claude_design_prompt_sequence.md](05_claude_design_prompt_sequence.md)
