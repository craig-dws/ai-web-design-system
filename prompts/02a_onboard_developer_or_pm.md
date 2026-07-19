# Prompt 2a: Onboard a developer or PM

- **Who:** each developer or Project Manager, on their own machine.
- **Tool:** Claude Code, in the cloned repository.
- **How often:** once per person.

This does not rebuild the shared system. The `.claude/` assets (agents, skills,
commands, hooks, settings) and `.mcp.json` arrive with the clone and must not be
recreated. This prompt sets up only the local, uncommitted pieces and connects
the tools. For the MCP connection specifically, `02c` is a focused helper you can
run after this.

Prerequisite: the repository must be cloned and current, which means `main` has
to be pushed to the shared remote first.

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
   - claude plugin install figma@claude-plugins-official, then /plugin and OAuth
   - claude plugin marketplace add anthropics/knowledge-work-plugins
   - claude plugin install product-management@knowledge-work-plugins
     (developers: also design@ and the Figma skills)
   - Figma Dev seat if they will use the Figma MCP
6. Verify with /mcp and one read-only test each. Report any difference from the reference
   machine as DRIFT. Do not fix drift by editing shared committed config.
7. Brief them in five lines on the lifecycle (docs/25): what their role owns, which gate they
   approve, and which skill they trigger first.

CONSTRAINTS: match the system, do not change shared config unilaterally. Staging only.
British and Australian English, no em dashes.

Finish with: ready or not ready, and any drift.
```
