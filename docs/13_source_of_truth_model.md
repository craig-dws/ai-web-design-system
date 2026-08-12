# 13. Source-of-Truth Model

Status: v0.2 | Date: 21 July 2026 | Owners: Designer, Project Manager and Dev Lead

This defines which system owns each class of information, and exactly when authority transfers from one system to another. The purpose is to prevent silent overwrites, where one tool undoes another's work because nobody agreed which was authoritative.

## The model

| Information | Authoritative source | Changed only by |
|-------------|----------------------|-----------------|
| Brand and visual direction | Approved Figma library | Designer, with client sign-off |
| Design tokens | Approved Figma variables and version-controlled canonical token contract | Designer in Figma; Developer or Dev Lead in the implementation mirror |
| Design-system explanation | Client `DESIGN.md`, derived from the approved sources | Designer; PM records evidence only |
| Component behaviour | Component specification (Figma plus notes) | Designer, reviewed by Dev |
| Page copy not yet delivered to the site | The Google Doc, once the human editor has revised it | The editor; pulled to markdown and delivered to the site |
| Page content, during the build | The site being built on staging | The build team, on the site; new pages and sections requested from ZilvaEdge |
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
   `DESIGN.md` explains the approved system but is not part of this machine authority chain.
4. **Build stage**. During the build, the version-controlled project files and Breakdance settings on staging become authoritative for implementation detail.
5. **Production stage**. After launch, the live Breakdance site and its database are the source of truth for content and functionality. Post-launch content edits happen in Breakdance (Client Mode for clients). Major design changes go back up to the Figma and token layer first, then flow down again.

## Content authority, stated precisely

Content authority moves once, at launch, and stating it flatly is what previously made this document contradict CLAUDE.md and 25. Phased, there is no conflict:

| Stage | Who is canonical | Where a copy change is made |
|-------|------------------|------------------------------|
| Written in ZilvaEdge | The markdown ZE produced | In ZE |
| Published to a Doc, editor revising, before it reaches the site | **The Google Doc** | In the Doc |
| Once the copy is on the built site (design, build, UAT) | **The site being built** | **On the site.** New pages and sections are requested from ZilvaEdge |
| At launch | Authority transfers to the client; the Doc is refreshed to match the launched site | Recorded as a gate |
| After launch | **The live Breakdance site** | In Breakdance, by the client in Client Mode |

The Doc's authority inside the editorial cycle is unchanged, and the reasoning for it is recorded in **24**: the editor is the final say on copy. What this table adds is the boundary where that cycle ends and the build begins.

**The rule that matters during the build: copy fixes are made on the site.** The client reviews and signs off the built site, so the site is the approval artefact. The Doc is how ZilvaEdge's copy reaches the site, not what governs it afterwards. The build team also has no access to the Doc and no way to pull from it, so routing fixes through the Doc is not a slower path for them, it is an unavailable one.

**The overwrite risk is real, and it is prevented in the tool rather than by the rule.** A release that re-pushed Doc copy over newer site copy would lose work silently. That is the failure the old Doc-is-canonical rule existed to prevent, and moving authority to the site does not make it go away; it moves where it is caught. ZilvaEdge's `site_repo_sync.py` refuses to release a page that has changed in the website repo since ZilvaEdge last released it, comparing against its own release commits. The refusal prints the diff command and requires an explicit `--allow-overwrite` to proceed, so an overwrite is possible but never silent.

**Built and verified on 12 August 2026** (ZilvaEdge commit `354149a`): seven regression tests, and verified against a real build repo carrying a committed build-team edit on a clean working tree, which is exactly the case the previous check missed. Note the shape of that miss, because it is the same lesson as the `update_manifest()` defect in 24: a working tree can be clean and the page still be ahead.

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
