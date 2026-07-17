# Approved Prompts and Agent Instructions

AI Web Design System v0.1 (Pilot). The register of prompts and agents cleared for pilot use. Only items listed here may be run. Each entry names the purpose, who may run it, the human gate before and after, and when it was last reviewed.

Canonical prompt text lives in the prompt library. Do not paste prompt bodies here; point to the library entry: [14_prompt_library.md].

## Register

| Name | Purpose | Who may run | Human gate | Version, last reviewed |
|------|---------|-------------|------------|------------------------|
| [Token extract] | Read Figma variables, produce token set | Developer, Dev Lead | Gate before: file is Dev Ready. Gate after: Dev Lead checks token set | [v0.1, YYYY-MM-DD] |
| [Component build] | Build a component in Breakdance from Figma | Developer | Gate before: tokens locked. Gate after: visual QA vs Figma | [v0.1, YYYY-MM-DD] |
| [Page assembly] | Assemble a page from built components | Developer | Gate before: components approved. Gate after: QA checklist | [v0.1, YYYY-MM-DD] |
| [Content placement] | Place approved copy into the build | Developer | Gate before: copy is final. Gate after: proofread | [v0.1, YYYY-MM-DD] |
| [Accessibility pass] | Check and fix accessibility issues | Developer, Dev Lead | Gate before: page built. Gate after: manual AA re-check | [v0.1, YYYY-MM-DD] |

Add rows as prompts are approved. Never run an unlisted prompt against a project.

## Rules for Use

- **Run approved prompts only**. Anything new must be added here and reviewed first.
- Every prompt has a human before it (inputs are ready) and a human after it (output is checked).
- Record the prompt library reference next to each entry so the exact text is traceable.
- If a prompt is changed, bump the version and update the last-reviewed date.

## Canonical Prompt Reference

Paste or link the canonical prompt library location here:

- **Prompt library**: [14_prompt_library.md]
- **Notes**: [Any project-specific overrides, with approval]

## Sign-off

- **Register maintained by**: [Name]
- **Last reviewed**: [YYYY-MM-DD]
