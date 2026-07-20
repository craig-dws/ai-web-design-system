# Developer 01: Set up your machine and a client project

- **Who:** the developer.
- **Tool:** Claude Code.
- **How often:** machine setup once; project setup once per client site.

## A. Your machine (once)

1. `prompts/02a_onboard_developer_or_pm.md` for the general onboarding.
2. `prompts/02c_connect_verify_mcps_developer.md` to connect and verify the MCP
   servers. Do not skip the read-only verification.

You inherit the shared system from version control: all skills, subagents,
commands, hooks and permissions arrive with the clone. Do not recreate them.

## B. A new client project (once per site)

**One Claude Code project per client site. Never share a project across clients.**
The isolation is the point: a prompt written for one client must never be able to
reach another client's database or files. Client work never lives in the system
repository.

```
[ROLE: Developer standing up a new client site project]

OBJECTIVE: Create the Claude Code project for a new client site, scaffolded from our
system. Do not build any page yet.

READ FIRST: docs/06_claude_code_project_structure.md, CLAUDE.md, and the approved brief
for this client.

DIRECTIVES:
1. Ask me for: the client slug, the build target (A: WordPress plus Breakdance, or B:
   Astro plus Payload), the Figma file, the staging URL, and the production URL (recorded
   so we know what never to touch).
2. Create the project directory OUTSIDE this system repository. No client work lives here.
3. Copy in the shared .claude assets and .mcp.json from the system repo. For the chosen
   target, keep the relevant skills and subagents:
   - Target A: breakdance-limits, token-sync, builder-builder, wp-security-auditor
   - Target B: token-to-code, astro-component-builder, payload-schema-modeller
   - Both: site-brief, web-design, stage-gate, figma-token-extractor, the auditors, the
     creative pipeline, critical-reviewer, persona-reviewer
4. Write the project CLAUDE.md from the skeleton in docs/06, filled in for this client:
   stack, conventions, token source of truth, protected paths, dos and don'ts.
5. Record the staging URL, the Figma file and (Target A) the pinned builder version as
   ENVIRONMENT REFERENCES in settings.local.json or .env. Never hardcode them and never
   commit a secret.
6. Confirm .gitignore excludes settings.local.json and .env.
7. On Target A, bind the layout-write capability: add the chosen vendor MCP tool to the
   builder-builder subagent's tools in THIS project only. The system template stays
   vendor-neutral.
8. STOP and show me the project structure for approval before anything is built.

CONSTRAINTS:
- Staging only. Never production. Never an agent write to a live client site.
- No secrets in committed files. Environment references only.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## Before you build anything

The prerequisites, in order: the **agency base kit exists** (token names), the
**design system is approved** (Gate 1b), and the **handoff is accepted**
(Gate 1d). Without token names there is no contract for the AI to check its own
output against, and reviewing its output becomes guesswork.

On **Target A** there is one more: the Breakdance write test must have passed.
Breakdance has no sanctioned layout path, so until that test passes on a
disposable staging site, do not build client pages on Target A.
