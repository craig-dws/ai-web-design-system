# Designer Start Here

This folder contains the working instructions, prompts and reference files the Designer needs for website design projects.

Work through the files in number order. Do not skip a stage because each stage supplies an approved input for the next one.

## First-time setup

Complete these once:

1. Open `01_FIRST_TIME_SETUP.md` and set up the DiscoverWeb design-standard skill, the Anthropic Design plugin, the Figma plugin and the Figma connector.
2. Run the setup check prompt in that file.
3. If the agency base design system does not exist, complete `02_BUILD_AGENCY_DESIGN_SYSTEM.md`.

Do not rebuild the agency design system for every client. It is built once and then extended for each client.

## Every client project

Use these files in order:

1. `stages/01_CONFIRM_THE_BRIEF.md`
2. `stages/02_VISUAL_DIRECTION.md`
3. `stages/03_DESIGN_MD_PASS_A.md`
4. `stages/04_CLIENT_DESIGN_SYSTEM.md`
5. `stages/05_DESIGN_MD_PASS_B.md`
6. `stages/06_HOMEPAGE.md`
7. `stages/07_INTERNAL_PAGES.md`
8. `stages/08_HANDOFF.md`
9. `stages/09_BUILD_REVIEW.md`

Each stage file explains:

- what the Designer needs before starting
- what the Designer must produce
- the prompt to paste into Cowork
- what must be approved before continuing

## What the Project Manager supplies

Before the Designer starts a client project, the Project Manager supplies:

- the approved client brief
- sitemap and required page list
- client goals and priority conversion action
- available content and assets
- brand guidelines and logo files
- approved reference sites and competitor notes
- known constraints and open questions

The Designer confirms the brief and records a concise design interpretation note (a markdown file in the client folder, not Figma). The Designer does not create a second project brief or change the approved scope.

## The three rules to remember

1. Figma is the approved design source. Every design change is recorded in Figma.
2. Use named variables and components. Do not use hardcoded colour, type or spacing values.
3. AI assists and audits. The Designer makes the design decisions and confirms the work.

## Folder map

| Folder or file | Purpose |
|---|---|
| `01_FIRST_TIME_SETUP.md` | Set up the Designer's Cowork workspace |
| `02_BUILD_AGENCY_DESIGN_SYSTEM.md` | Build the shared agency design system once |
| `stages/` | The client-project workflow and prompts in order |
| `reference/` | Design rules, quality standards, checklists and the DESIGN.md template |

The separate `claude-cowork-designer` folder contains the skill package used during first-time setup.

If an instruction is unclear or an approved input is missing, stop and ask the Project Manager. Do not guess.
