# Setup and installation

This skill is for the whole team, so install it once org-wide and everyone gets the same version. A no-code self-install is given as a fallback.

Prerequisite for every route: skills need Code Execution and File Creation turned on for the account or workspace. If they are off, the skill will not run.

## Route 1: org-wide, recommended (admin does this once)

Available on Team and Enterprise plans. This installs the skill for everyone at once. Verified against Anthropic's help centre, July 2026.

Who can do it: only an organisation Owner can add or remove organisation-wide skills. An admin who is not an Owner cannot.

Before you start, turn on the two capabilities the skill needs, in the organisation settings: Code Execution and File Creation, and Skills. Skills will not run without Code Execution.

Steps:

1. Sign in as an Owner.
2. Go to Organisation settings, then Skills.
3. In the Organisation skills section, click "+ Add".
4. Select the file `discoverweb-design-standard.zip` (or `discoverweb-design-standard.skill`; both are the same zip and contain SKILL.md). If the picker only accepts `.zip`, use the `.zip` copy included in this package.
5. The skill is provisioned to all users in your organisation immediately.

What your team sees: the skill is enabled by default for everyone. A member can toggle it off for themselves if they want, but cannot delete it.

Scripted alternative: teams that manage skills through the API can upload and version the skill via the `/v1/skills` endpoint, pinning a version or tracking `latest`. Use this only if you want the update process automated.

## Route 2: self-install, fallback (each person)

If org-wide provisioning is not available to you:

1. In the Claude app, open Settings, then Capabilities, then Skills.
2. Upload discoverweb-design-standard.skill.
3. Confirm it appears and is enabled.

## The two Cowork plugins the designer also needs

This skill audits a design. To let Claude read the actual Figma canvas, the designer installs two plugins in Cowork (not Claude Code), from claude.com/plugins:

- The Design plugin, for the generic commands this skill defers to: `/design-critique`, `/accessibility-review`, `/design-system`, `/design-handoff`, `/ux-copy`.
- The Figma plugin, which needs a paid Figma Dev or Full seat. This is how Claude works on the canvas and can check variables, bindings, and naming. Without it, the skill runs in screenshot or description mode only, which cannot verify token bindings.

If a team member has not installed these, ask Claude in Cowork: "walk me through installing the Design plugin and the Figma plugin from claude.com/plugins", and follow the steps. The skill will also prompt for this when it detects it cannot read the canvas.

## Keeping the team in step over time

The repository is the single source of truth. When the naming standard, the banned practices, the base kit, or the house style changes:

1. Update the skill source in the repository at `.claude/skills/discoverweb-design-standard/`.
2. Bump the version line in SKILL.md.
3. Re-package and re-upload: via the admin console or the `/v1/skills` endpoint for the org route, or hand out a fresh file for the self-install route.

A stale skill confidently enforces an old standard, which is worse than no skill. Fold re-issue into the same change process that re-runs the designer-pack and re-uploads the Claude Design system.
