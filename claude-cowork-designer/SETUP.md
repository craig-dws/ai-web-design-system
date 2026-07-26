# Setup and installation

This skill can be installed once for the whole organisation or individually by each person. Organisation-wide installation is recommended because everyone receives the same approved version.

Prerequisite for every route: skills need Code Execution and File Creation turned on for the account or workspace. If they are off, the skill will not run.

## Route 1: org-wide, recommended (admin does this once)

Available on Team and Enterprise plans. This installs the skill for everyone at once. Verified against Anthropic's help centre, July 2026.

Who can do it: only an organisation Owner can add or remove organisation-wide skills. An admin who is not an Owner cannot.

Before you start, turn on the two capabilities the skill needs, in the organisation settings: Code Execution and File Creation, and Skills. Skills will not run without Code Execution.

Steps:

1. Sign in as an Owner.
2. Go to `Organization settings`, then `Skills`.
3. In the Organisation skills section, click "+ Add".
4. Select `discoverweb-design-standard.zip`.
5. The skill is provisioned to all users in your organisation immediately.

What your team sees: the skill is enabled by default for everyone. A member can toggle it off for themselves if they want, but cannot delete it.

Scripted alternative: teams that manage skills through the API can upload and version the skill via the `/v1/skills` endpoint, pinning a version or tracking `latest`. Use this only if you want the update process automated.

## Route 2: self-install, fallback (each person)

If org-wide provisioning is not available to you:

1. In Cowork, open `Customize`, then `Skills`.
2. Select `+`, then `Create skill`.
3. Select `Upload a skill`.
4. Upload `discoverweb-design-standard.zip`.
5. Confirm it appears and is enabled.

## Install the Design and Figma plugins

In Cowork, open `Customize`, then `Plugins`, then `Browse plugins`. Install:

- The Design plugin, for the generic commands this skill defers to: `/design-critique`, `/accessibility-review`, `/design-system`, `/design-handoff`, `/ux-copy`.
- The Figma plugin from `Anthropic & Partners`, which includes Figma skills and the Figma MCP connection.

## Connect Figma

The connector is included with the Figma plugin but must be configured for each person's Figma account.

1. In Cowork, open `Customize`, then `Plugins`.
2. Open the installed Figma plugin and select its `Connectors` tab.
3. Open the included Figma connector and select `Connect` or `Configure`.
4. Sign in with the account used for agency design work and approve the requested access.

Without a working Figma connection, the skill can assess supplied images and descriptions but cannot claim checks that require direct file access.

## Keeping the team in step over time

The repository is the single source of truth. When the naming standard, the banned practices, the base kit, or the house style changes:

1. Update the skill source in the repository at `.claude/skills/discoverweb-design-standard/`.
2. Bump the version line in SKILL.md.
3. Re-package and re-upload: via the admin console or the `/v1/skills` endpoint for the org route, or hand out a fresh file for the self-install route.

A stale skill confidently enforces an old standard, which is worse than no skill. Fold re-issue into the same change process that re-runs the designer-pack and re-uploads the Claude Design system.
