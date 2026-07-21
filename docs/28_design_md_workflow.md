# 28. DESIGN.md Workflow

Status: v1.0 | Date: 21 July 2026 | Owners: Designer and Project Manager | Audience: Designer, PM and Developer

## Decision

Use one `DESIGN.md` for each client project when AI-assisted design or implementation will benefit from a concise, readable account of the approved visual system.

`DESIGN.md` is a **derived design record**. It explains the approved design intent and points to its sources. It is not the source of truth for Figma variables, the canonical token contract, production components, builder settings or agent behaviour.

The format is useful but still emerging. Google's public DESIGN.md specification is alpha. Keep the file narrative-first, use minimal front matter, and test any lint or export tooling before making it part of a gate.

## Ownership in a one-designer team

| Role | Responsibility |
|---|---|
| Project Manager | Completes onboarding, assembles the approved brief, assets and references, copies the blank template into the client project, and records that the required evidence exists. The PM does not make or approve design decisions. |
| Designer | Makes the design decisions, owns and maintains `DESIGN.md`, verifies it against Figma, and self-certifies the design system at Gate 1b. |
| Client | Approves the visual direction at Gate 1a and the homepage design at Gate 1c. |
| Developer or Dev Lead | Confirms that tokens, components and responsive behaviour are technically implementable at Gate 1d or Gate 2a. |

There is no independent design peer review in this team structure. The explicit checklist, source comparison and client approval reduce risk but do not replace an experienced second designer.

## When to create it

Create it in two passes:

1. **Pass A, after Gate 1a:** the Designer records the approved visual direction, intended response, key principles and explicit exclusions. The file remains `DRAFT` and must not invent final token values.
2. **Pass B, before Gate 1b closes:** after the Figma variables, components and states are complete, the Designer verifies the document against Figma, adds exact provenance and references the canonical token contract. Remove all pending markers before marking it `READY`.

Do not create it during PM onboarding. At that point the PM should only provide the template and the source material. Do not use it for a very small project with no reusable visual system, no AI-assisted handoff and no future maintenance need.

## Source hierarchy

When two sources disagree, resolve the conflict rather than silently choosing one.

1. The signed brief controls client requirements and scope.
2. The approved Figma file controls visual design, variables, components and states.
3. The version-controlled canonical token contract controls machine-consumed token names and values.
4. `DESIGN.md` explains those approved sources for humans and AI tools.
5. `CLAUDE.md`, `AGENTS.md` or tool-specific rule files control agent behaviour. `DESIGN.md` does not replace them.

## What to include

Every final file should include:

- status, client name, owner, last verified date and source links or paths
- the design rationale and the response the experience should create
- colour, typography, layout, spacing, responsive behaviour, elevation and shape rules
- imagery, iconography and motion guidance where relevant
- component usage, variants, interaction states and content-resilience rules
- accessibility requirements that are visible at design time
- concrete do and do not guidance
- Figma and canonical-token provenance
- approval and change history

Useful optional additions include breakpoint intent, localisation or long-content behaviour, data-visualisation rules, platform-specific variants and known implementation constraints.

## What not to include

Do not put the following in `DESIGN.md`:

- passwords, API keys, private credentials or personal data
- MCP commands, deployment steps or other operational instructions
- a duplicate of the full brief, discovery notes or competitor research
- abandoned concepts or unapproved visual directions
- guessed values, renamed tokens or manually copied values that cannot be verified
- production code, CMS configuration or framework-specific instructions in a shared design record
- vague statements such as "modern and clean" without observable design rules
- claims that an automated check certifies accessibility or design quality

Link to authoritative material instead of duplicating it. Keep the document short enough to review whenever the design changes.

## Token and front-matter rules

Use the minimal front matter in `docs/templates/DESIGN.template.md`. Do not manually author a second token system in YAML.

This repository uses semantic dotted names such as `color.action.primary`. The Design Tokens Community Group format reserves periods for path notation, so do not rename tokens merely to satisfy an exporter. If a tested tool cannot preserve the canonical names and hierarchy, keep the exact values in the canonical token contract and reference that contract from `DESIGN.md`.

An export is evidence only when the tool version is pinned, the output is reviewed and a diff confirms that names, types, aliases and values were preserved.

## Creation and update workflow

1. PM copies `docs/templates/DESIGN.template.md` into the client project as `DESIGN.md` and supplies the approved brief, assets and reference links.
2. Designer runs `prompts/designer/05_create_design_md.md` after Gate 1a and completes Pass A.
3. Designer builds the Figma variables, components and required states.
4. Designer reruns the same prompt in Pass B, with read-only Figma inspection, and resolves every mismatch or pending item.
5. Designer completes the design-system checklist and signs the Gate 1b self-certification.
6. PM records the file path, evidence and gate status. The PM checks completeness, not design correctness.
7. Developer verifies implementation feasibility during handoff.

Update `DESIGN.md` whenever an approved design decision changes. Record the change, verify it against Figma and the canonical token contract, and avoid editing generated token exports by hand.

## Primary references

- Google Labs, DESIGN.md repository and alpha specification: <https://github.com/google-labs-code/design.md>
- Figma, create design system rules skill: <https://github.com/figma/mcp-server-guide/blob/main/skills/figma-create-design-system-rules/SKILL.md>
- Figma, custom rules and structured-file guidance: <https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/> and <https://developers.figma.com/docs/figma-mcp-server/structure-figma-file/>
- Design Tokens Community Group format, stable 2025.10: <https://www.designtokens.org/tr/2025.10/format/>
- Anthropic, Claude Design system setup and prompting guidance: <https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design> and <https://support.claude.com/en/articles/7996857-my-prompt-isn-t-giving-me-a-helpful-answer>
