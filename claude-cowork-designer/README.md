# DiscoverWeb design standard: Cowork skill package

This package puts the agency's design-consistency standard into Claude Cowork, so the designer and the whole team check every design against the same bar. It closes one gap: Cowork does not read the repository's `.claude/skills` folder, so the skill has to be uploaded separately. Everything needed to install and use it is in here.

## Which file do I open?

- **You are the designer, or you work in Cowork and just want to use this:** open `INSTALL-FOR-DESIGNER.md`. It walks you through installing the skill and the two plugins in about ten minutes, and you can let Claude guide you through it.
- **You are the admin and want the whole team set up at once:** open `SETUP.md` for org-wide provisioning.
- **You are the Owner setting standing house rules for the team:** open `ORG-AND-PROJECT-INSTRUCTIONS.md` for the organisation and project instructions to paste in.
- **You want to understand or revise the standard behind the skill:** open `PLAN.md`, and `RUN-THE-PLAN-PROMPT.md` to regenerate the plan when the standard changes.

## What is in this package

- `discoverweb-design-standard.skill` : the skill, ready to upload into Cowork. This is the file you install.
- `INSTALL-FOR-DESIGNER.md` : plain-English install guide for a non-technical person.
- `COWORK-GUIDED-SETUP-PROMPT.md` : a prompt to paste into Cowork that guides the whole setup and verifies it.
- `SETUP.md` : install and org-wide provisioning steps, including the two plugins.
- `ORG-AND-PROJECT-INSTRUCTIONS.md` : the always-on house rules to paste into Cowork (organisation instructions for the team, project instructions for design work).
- `PLAN.md` : the approved plan behind this skill.
- `RUN-THE-PLAN-PROMPT.md` : the prompt that generates the plan.

This folder is the Cowork delivery kit. It holds what a person needs to install and use the skill. The skill source of truth lives separately in the repository at `.claude/skills/discoverweb-design-standard/`, where Claude Code loads it. Update the source there, then re-issue the upload files here.

## What the skill does

Once installed, ask Claude in Cowork to "run the DiscoverWeb design standard over this Figma file". It audits the design against the agency's token naming, banned practices, the anti-AI-look constraints, and the British and Australian house style, then reports PASS or FAIL item by item, names the exact frames or layers that fail, lists what must be fixed, and gives an accept-or-reject verdict. It defers to Anthropic's Design plugin for the generic checks (`/design-system`, `/design-critique`, `/accessibility-review`) rather than rebuilding them.

## Scope

- v1 is live now: naming standard, banned practices, anti-AI-look, and house style. None of these need the agency base kit to exist.
- v2 is bundled and dormant: base-kit adherence checks switch on once the base kit is built and its token list is pasted into `discoverweb-design-standard/reference/token-model.md`.

## Keeping the team in step

The repository is the source of truth. When the standard or the base kit changes, update the source, bump the version in `SKILL.md`, then re-issue: re-provision through the admin console for the team, or hand out a fresh `.skill` file. A stale skill enforces an old standard confidently, so make re-issue part of the change process. Full detail in `SETUP.md`.

## A follow-up to decide (not done here)

To cut the number of copies of the standard that can drift, consider trimming the naming standard, banned practices, and house style out of the designer-pack and letting this skill be the single Cowork-facing carrier of them. The pack would then hold only what a skill cannot check: workflow, gates, lifecycle, and the handover narrative.
