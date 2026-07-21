---
version: alpha
name: "[CLIENT NAME]"
description: "[ONE-SENTENCE DESCRIPTION OF THE APPROVED VISUAL SYSTEM]"
---

# [CLIENT NAME] Design System

> Status: DRAFT
> Owner: [DESIGNER NAME]
> Last verified: [YYYY-MM-DD]
> Approved Figma source: [URL OR PATH]
> Canonical token contract: [PATH]
> Approved brief: [URL OR PATH]

Remove every square-bracket placeholder before changing the status to `READY`. Keep the front matter minimal unless a tested exporter can preserve the canonical token names, types, aliases and values without alteration.

## Overview

### Purpose and intended response

[Explain who the experience is for, what it must help them do and how it should feel. Use concrete visual and behavioural language.]

### Design principles

- [Observable principle and how it changes a design decision]
- [Observable principle and how it changes a design decision]
- [Observable principle and how it changes a design decision]

### Deliberate exclusions

- [A visual or interaction approach that must not be used, with the reason]

## Colors

Describe roles and usage. Reference exact approved token names from the canonical token contract instead of creating a second token list by hand.

| Role | Canonical token or source | Resolved value when verified | Usage | Do not use for |
|---|---|---|---|---|
| [ROLE] | [EXACT TOKEN NAME OR SOURCE] | [APPROVED VALUE] | [USAGE] | [EXCLUSION] |

Include contrast intent and any colour combinations that require manual verification. Do not claim accessibility certification from automated checks alone.

## Typography

| Role | Approved style values | Canonical token or style | Usage and limits |
|---|---|---|---|
| [ROLE] | [FAMILY, SIZE, WEIGHT, LINE HEIGHT AND LETTER SPACING] | [EXACT NAME] | [USAGE] |

Record hierarchy, line length, wrapping, long-heading and fallback behaviour.

## Layout

### Grid and spacing

[Describe container logic, columns, gutters, spacing rhythm and alignment rules.]

### Responsive behaviour

[Describe how hierarchy, navigation, components and content change across approved breakpoints. Explain intent, not framework syntax.]

### Content resilience

[Describe behaviour for long titles, missing images, extra items, empty states, errors, translated content or other relevant stress cases.]

## Elevation & Depth

[Describe approved borders, shadows, overlays and layering. State when flat treatment is preferred.]

## Shapes

[Describe corner radii, strokes, masks and any relationship between shape and component role.]

## Imagery & Iconography

[Describe subject matter, composition, crop, treatment, icon family and accessibility requirements.]

## Motion

[Describe purposeful transitions, duration or easing sources, reduced-motion behaviour and prohibited decorative motion. Write `Not used` if motion is outside scope.]

## Components

For each important component, document when to use it, required variants, states and content constraints. Do not duplicate the complete component inventory if Figma already provides it.

### [COMPONENT NAME]

- **Purpose:** [WHEN AND WHY IT IS USED]
- **Approved source:** [FIGMA COMPONENT OR DOCUMENTATION LINK]
- **Variants and states:** [DEFAULT, HOVER, FOCUS, ACTIVE, DISABLED, ERROR, LOADING OR OTHER RELEVANT STATES]
- **Content rules:** [LABEL, LENGTH, IMAGE OR DATA CONSTRAINTS]
- **Responsive behaviour:** [BEHAVIOUR]
- **Accessibility notes:** [DESIGN-TIME REQUIREMENTS]

## Do's and Don'ts

| Do | Do not | Why |
|---|---|---|
| [CONCRETE APPROVED PRACTICE] | [CONCRETE PROHIBITED PRACTICE] | [RATIONALE] |

## Token Source and Provenance

- **Figma file:** [URL OR PATH]
- **Variables collection:** [EXACT COLLECTION NAME]
- **Figma version, branch or last verified date:** [IDENTIFIER]
- **Canonical token contract:** [PATH]
- **Extraction method and version, if used:** [TOOL AND VERSION OR `MANUAL READ-ONLY VERIFICATION`]
- **Known differences or limitations:** [NONE OR EXPLANATION]

## Approval and Change History

| Date | Status or change | Evidence | Owner |
|---|---|---|---|
| [YYYY-MM-DD] | Gate 1a visual direction approved; Pass A drafted | [LINK OR RECORD] | [DESIGNER] |
| [YYYY-MM-DD] | Gate 1b self-certification complete; Pass B verified | [CHECKLIST AND FIGMA EVIDENCE] | [DESIGNER] |

The Project Manager records that the evidence and gate status exist. The Designer remains accountable for design correctness, and the Developer confirms implementation feasibility during handoff.
