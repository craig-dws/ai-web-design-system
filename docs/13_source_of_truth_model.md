# 13. Source-of-Truth Model

Status: v0.1 | Date: 14 July 2026 | Owner: Dev Lead and Design Lead

This defines which system owns each class of information, and exactly when authority transfers from one system to another. The purpose is to prevent silent overwrites, where one tool undoes another's work because nobody agreed which was authoritative.

## The model

| Information | Authoritative source | Changed only by |
|-------------|----------------------|-----------------|
| Brand and visual direction | Approved Figma library | Design Lead, with client sign-off |
| Design tokens | Version-controlled token spec and DESIGN.md | Design Lead, synced to Breakdance |
| Component behaviour | Component specification (Figma plus notes) | Designer, reviewed by Dev |
| Page content, before launch | The Google Doc, once the human editor has revised it | The editor; pulled to markdown before use |
| Page content, after launch | The live Breakdance site | The client, in Client Mode |
| Production implementation | Breakdance and the site database | Dev Lead, post-launch |
| AI instructions | Version-controlled project context (CLAUDE.md, AI context pack) | Dev Lead |
| Decisions and exceptions | Project decision log | Whoever makes the decision |
| Requirements and scope | The signed brief | Approved change request only |

## Lifecycle: when authority transfers

Authority is not fixed. It moves at defined gates and never silently.

1. **Requirements stage**. The signed brief is authoritative for scope. It changes only by an approved change request.
2. **Design stage**. Once visual direction and components are approved, the Figma file is the design source of truth. Nobody hand-edits the live site to force a look. Changes flow Figma to build.
3. **Token layer**. The token specification (mirrored into Breakdance global settings) is the translation layer. Figma token values and the code or Breakdance values must stay in lockstep, kept aligned by differential merge, never blind import.
4. **Build stage**. During the build, the version-controlled project files and Breakdance settings on staging become authoritative for implementation detail.
5. **Production stage**. After launch, the live Breakdance site and its database are the source of truth for content and functionality. Post-launch content edits happen in Breakdance (Client Mode for clients). Major design changes go back up to the Figma and token layer first, then flow down again.

## Content authority, stated precisely

Content authority moves once, at launch, and stating it flatly is what previously made this document contradict CLAUDE.md and 25. Phased, there is no conflict:

| Stage | Who is canonical | Where a copy change is made |
|-------|------------------|------------------------------|
| Written in ZilvaEdge | The markdown ZE produced | In ZE |
| Published to a Google Doc, editor revising | **The Google Doc** | In the Doc, then pull to markdown |
| Design and build (pre-launch) | **The Google Doc** | **In the Doc, then pull.** Not typed into Breakdance |
| At launch | Authority transfers | Recorded as a gate |
| After launch | **The live Breakdance site** | In Breakdance, by the client in Client Mode |

**The rule that matters during the build: do not type copy directly into Breakdance before launch.** The next pull from the Doc would overwrite it, and the loss would be silent. Fix it in the Doc and pull. This is the opposite of the post-launch rule, which is why the stage matters more than the instinct.

**After launch, new content restarts the cycle.** A new blog post written in ZE goes ZE, Doc, editor, pull, publish. It does not get typed into the site first.

## Transfer rules

- **Figma leads until the dev-ready handoff is accepted**. The build leads after it.
- A live site is never overwritten from an older Figma file without first reconciling the differences and recording them.
- Every transfer happens at a gate with a named approver (see 12, section 4).
- When the build must diverge from Figma (for performance or a technical constraint), the divergence is recorded in the design deviation register, with a rationale and an approver. It is never left as a silent difference.

## Deviation register (template)

| ID | Description of deviation | Rationale | Approved by |
|----|--------------------------|-----------|-------------|
| D-01 | [what differs from Figma] | [why] | [name and date] |

## Bi-directional flow, handled safely

The tooling technically allows both directions (Figma to build via the read tools, and build or code back to Figma via use_figma). We constrain this:

- Default direction is Figma to build, until launch.
- Build to Figma (use_figma) is optional, beta, and only on a duplicate file, used to capture an as-built state deliberately, never as an automatic sync.
- **We never run an automatic two-way sync**. Every cross-direction update is a human decision, logged.

## Why this matters for the AI pipeline

The agent will happily read from Figma and write to Breakdance in the same session. Without this model, a well-meaning "sync the changes" prompt can overwrite custom developer work in Breakdance, or a re-import of an old Figma can wipe as-built refinements. The source-of-truth model plus the differential-merge rule (see 04 and 14) is what prevents that.
