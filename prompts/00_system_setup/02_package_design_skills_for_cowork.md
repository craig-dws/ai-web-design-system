# Setup 02: Package the design-consistency skill for Claude Cowork

Who: Dev Lead or a technical admin (the person who owns skill provisioning).
Where: **Claude Cowork** (the agentic mode in the Claude desktop app), pointed at this repository folder.
When: once, and again whenever the design standard or the base kit changes.

Why this exists: the designer works only in Cowork and never opens this repository. Cowork does not read this repository's `.claude/skills` folder, so none of our custom design skills reach her. This prompt produces a plan to package our agency-specific design-consistency knowledge into a self-contained skill she can use in Cowork. It creates a plan and stops. It does not build anything until you approve.

Run this in Cowork with this repository folder attached, then paste the block below.

```
[ROLE: You are helping an agency package its design-consistency knowledge into a
self-contained Claude skill that a non-technical designer can use in Claude Cowork.]

OBJECTIVE
Produce a PLAN to create the agency's design-consistency skill for Cowork. Create
the plan only. Do not build or write any skill files until I approve the plan.

CONTEXT YOU NEED, so you do not have to infer it:
- This folder is our internal "AI Web Design System". It takes a website from brief
  to launch. Design consistency across every client is a core goal.
- Consistency is enforced by a shared design system: one agency base kit of tokens
  and components, with a per-client theme layered on top (docs/22). A skill AUDITS
  adherence to that system; the tokens ENFORCE it. The base kit is the real
  backbone, not the skill.
- Our designer is NOT technical. She works only in Claude Cowork. She never opens
  this repository, never uses a terminal, and never uses Git.
- CRITICAL CONSTRAINT: Cowork does NOT read this repository's .claude/skills folder.
  Skills reach Cowork only by separate upload (the Skills API for org-wide
  provisioning, or a manual upload in Customize then Skills). So the skill you plan
  must be a SELF-CONTAINED, upload-ready package. It must not reference any file
  path in this repository, because the designer's Cowork cannot reach them.
  Everything the skill needs must live inside the skill itself.
- Skills do not sync across surfaces. The copy the developer uses in Claude Code and
  the copy the designer uses in Cowork are separate installs. Keep the source in
  this repository as the single source of truth; the Cowork copy is uploaded and
  kept in step by hand.
- Adopt, do not rebuild. Anthropic's Design plugin already gives Cowork generic
  consistency skills (/design-system, /design-critique, /accessibility-review). Do
  NOT rebuild those. Build only the AGENCY-SPECIFIC layer they cannot know: our
  token naming standard, our base-kit rules, our banned practices, our anti-AI-look
  rules, and our British and Australian English house style.

READ THESE FILES IN THIS FOLDER FIRST. They hold the standard the skill encodes:
- CLAUDE.md (the constitution and house style)
- docs/22_design_system_reuse_model.md (the base kit and the token model)
- docs/pilot-artefacts/03_figma_component_and_naming_standard.md (the naming
  standard and the banned practices)
- docs/23_best_practices.md (Part A, web design best practices)
- .claude/skills/anti-ai-design-checklist/SKILL.md and
  .claude/skills/web-design/SKILL.md (existing design knowledge to draw from;
  remember the Cowork skill must be self-contained, not a pointer to these)
- docs/25_end_to_end_lifecycle.md (Stage 1, where the designer actually works, so
  the skill fits her workflow)
- prompts/designer/ (her existing prompts, so the skill complements them and does
  not duplicate them)

THE PLAN MUST COVER:
1. What design-consistency knowledge already exists in this folder, and what is
   missing for the designer in Cowork today.
2. The MINIMAL set of agency-specific Cowork skills to create. Probably one or two,
   not many. For each: a name, a one-line trigger description, what it checks or
   produces, and exactly which of our standards it encodes. Explicitly name the
   consistency needs already met by Anthropic's Design plugin that must NOT be
   rebuilt.
3. How each skill works with NO repository access: fully self-contained, no repo
   paths, usable by a non-technical designer from Cowork's interface.
4. Packaging and delivery: how the skill reaches the designer's Cowork (the Skills
   API org-wide route for an admin, and the no-code manual upload she can do
   herself), and how we keep the Cowork copy in step with the source in this
   repository over time.
5. Sequencing: the base kit (docs/22) is the real backbone, and a consistency skill
   audits adherence to it, so the skill is most useful once the base kit exists.
   Say what a useful v1 can already check before the base kit is complete (the
   naming standard, banned practices, anti-AI-look, and house style).

CONSTRAINTS:
- British and Australian English. No em dashes, no en dashes, no emojis.
- Keep it minimal. We are closing one specific gap, not building a skill library.
- Do not rebuild what Anthropic's Design plugin already does.
- Everything must be usable by a non-technical designer in Cowork, with no terminal,
  no Git, and no repository access.

OUTPUT: the written plan, then a short list of questions for me before you build
anything.
```

After the plan is approved, the same session can write the self-contained skill package (a `SKILL.md` plus any reference files it needs, all inside the skill folder). Keep that source in this repository so Git remains the single source of truth, then upload a copy into Cowork by the route the plan recommends.
