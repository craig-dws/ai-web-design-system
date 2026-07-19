# Prompt 2c: Connect and verify the MCP servers (developer)

- **Who:** each developer.
- **Tool:** Claude Code, in the cloned repository.
- **How often:** once per machine, and again any time MCP access breaks.

This is a focused helper for the part of onboarding that trips people up:
getting the two MCP servers connected and verified. The server definitions are
already committed in `.mcp.json` (a remote Figma server and a local
chrome-devtools server), so you are not setting the servers up, only connecting
and authenticating them on your machine. Run this after, or instead of, the MCP
step in `02a`.

What only you can do, and why: the Figma sign-in uses OAuth with a one-time
security value generated at connect time, so no one can hand you a working link
in advance. Claude Code opens the correct page itself when you run `/mcp`.

```
[ROLE: Setup assistant connecting and verifying this machine's MCP servers for our AI web design system]

OBJECTIVE: Get the two committed MCP servers, figma and chrome-devtools, connected and verified
on THIS machine. Do NOT redefine or edit the servers; they are shared and committed in .mcp.json.

READ FIRST: CLAUDE.md, and .mcp.json (to see the two server definitions). Do not change either.

DIRECTIVES:
1. Confirm the repo is cloned and current and that .mcp.json is present from version control,
   defining exactly two servers: figma (remote, https://mcp.figma.com/mcp) and chrome-devtools
   (local, launched via npx, headless). If .mcp.json is missing, STOP: the repo is not current,
   pull main first. Do not recreate the file.

2. Report the environment and flag anything missing:
   - node -v and npm -v (npx launches chrome-devtools).
   - Whether Google Chrome or Chromium is installed. chrome-devtools launches Chrome headless,
     so without a Chrome install it will not connect. Check the usual OS install locations.
   - Whether Git Bash or a bash is present (the repo's hooks are bash).

3. Trust the project MCP servers. A newly pulled or newly created .mcp.json is only picked up
   when Claude Code starts and shows a one-time "trust this project's MCP servers?" prompt.
   If /mcp does not list figma and chrome-devtools, tell me to relaunch Claude Code in this repo
   and approve that trust prompt, then continue.

4. Authenticate Figma. Tell me to run /mcp, select figma, and complete the OAuth in the browser
   using my OWN Figma Professional Dev seat. Explain that the sign-in link is generated at
   connect time and cannot be supplied in advance. Do NOT ask me for any authorisation code,
   token, or callback URL; Claude Code stores the credential itself.

5. Confirm chrome-devtools. It should connect automatically once Chrome is installed and the
   server is trusted. It must run headless (house rule). If it fails, the usual cause is a
   missing Chrome install; guide me to install Chrome, not to edit .mcp.json.

6. Note on the Figma plugin: our figma MCP server already comes from .mcp.json, so you do NOT
   need the figma@claude-plugins-official plugin just to connect. Install that plugin only if I
   want the write-to-canvas Figma skills (figma-use, figma-generate-library). If I do, warn me
   that it registers a second figma server on top of the committed one, and help me keep only
   one so the tools are not duplicated.

7. VERIFY, read-only. Once /mcp shows both figma and chrome-devtools connected, run exactly ONE
   read-only test each and report the result. Do not perform any write.
   - figma: call whoami and confirm it returns my handle and a Figma Dev (or Full) seat.
   - chrome-devtools: navigate headless to https://example.com and take a snapshot; confirm the
     page rendered.

8. Report DRIFT. Compare what connected against the expected two servers plus the account-level
   claude.ai connectors. Report any difference as drift. Do NOT fix drift by editing shared
   committed config.

CONSTRAINTS:
- Do not recreate or edit .mcp.json or any shared committed config. Connect and authenticate only.
- Staging only. Never production.
- Do not ask me for OAuth codes, tokens, or callback URLs.
- British and Australian English. No em dashes, no en dashes, no emojis.

Finish with: which servers are connected and verified, and any drift.
```

## Quick reference: what "connected" looks like

Running `/mcp` should show your account-level claude.ai connectors plus:

- **figma**: Status connected, Auth authenticated, roughly 26 tools, config
  location your repo's `.mcp.json`.
- **chrome-devtools**: connected (launched via npx, headless).

If figma shows connected but not authenticated, the OAuth is not finished: run
`/mcp`, pick figma, and sign in. If chrome-devtools is absent, check that Chrome
is installed and that you approved the project trust prompt.
