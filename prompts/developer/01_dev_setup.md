# Developer 01: Set up your machine and a client project

- **Who:** the developer (or a PM who needs Claude Code).
- **Tool:** Claude Code.
- **How often:** machine setup once; project setup once per client site.

You inherit the shared system from version control: all skills, subagents,
commands, hooks and permissions arrive with the clone. **Do not recreate them.**
Prompt `00_system_setup/01_stand_up_system.md` was run once for the whole
repository and is not a per-person step.

---

## Part A. Your machine (once)

```
[ROLE: Setup assistant onboarding a team member to an existing AI web design system]

OBJECTIVE: Configure THIS machine to match our agreed system exactly. The system already
exists and is documented. Do not redesign it. Match it.

READ FIRST: CLAUDE.md, docs/00_README_and_index.md, docs/25_end_to_end_lifecycle.md,
docs/06_claude_code_project_structure.md, docs/24_open_questions_answered.md

DIRECTIVES:
1. Ask which role this machine is for (Developer or Project Manager) and tailor the rest.
2. Report the environment (OS, node, npm, git, Git Bash or WSL). Flag anything missing.
3. Confirm the repo is cloned and current, and that .claude/ and .mcp.json are present from
   version control. Do NOT recreate them; they are shared and committed.
4. Create only the LOCAL, uncommitted pieces: settings.local.json and required environment
   variables. Confirm .gitignore excludes them.
5. Give me a numbered MANUAL STEPS list, then wait:
   - Claude Team seat confirmed
   - claude plugin marketplace add anthropics/knowledge-work-plugins
   - claude plugin install design@knowledge-work-plugins
   - claude plugin install product-management@knowledge-work-plugins
   - Figma Professional Dev seat, needed to authenticate the Figma MCP
6. Verify with /mcp and one read-only test each. Report any difference from the reference
   machine as DRIFT. Do not fix drift by editing shared committed config.
7. Brief them in five lines on the lifecycle (docs/25): what their role owns, which gate they
   approve, and which skill they trigger first.

CONSTRAINTS: match the system, do not change shared config unilaterally. Staging only.
British and Australian English, no em dashes.

Finish with: ready or not ready, and any drift.
```

Then run `02_connect_mcps.md` to connect and verify the MCP servers. Do not skip
the read-only verification.

---

## Part B. A new client project (once per site)

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

---

## Before you build anything

The prerequisites, in order: the **agency base kit exists** (token names), the
**Designer has self-certified the design system and the PM has recorded the
evidence** (Gate 1b), and the **handoff is accepted**
(Gate 1d). Without token names there is no contract for the AI to check its own
output against, and reviewing its output becomes guesswork.

On **Target A** there is one more: the Breakdance write test must have passed.
Test the native Breakdance 3.0 MCP first (July 2026, beta, first-party); it is
the preferred path if it works, with Novamira or Respira as the fallback. Until
that test passes on a disposable staging site, do not build client pages on
Target A. See docs 24 and 26.
