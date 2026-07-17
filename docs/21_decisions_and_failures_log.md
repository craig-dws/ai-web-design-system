# AI Web Design System v0.1: Decisions and Failures Log

Document 21 of the AI Web Design System v0.1 series.
Audience: Agency PMs, Dev Lead, Design Lead, operator.
Status: Internal working document, maintained live during the pilot.

## Purpose

This is the richer decision capture record for the pilot. It captures, as they happen, every meaningful moment where the AI assisted pipeline succeeded, failed, was overridden or hit a limit. It is the primary qualitative evidence that feeds system v0.2. The scorecard (document 11) tells us what happened in numbers; this log tells us why, and what to change.

Fill it in during the pilot, not from memory afterwards. A short entry written at the moment is worth far more than a reconstruction at the review.

## What to log

Create an entry whenever any of the following occurs:

- AI output is rejected outright.
- A human substantially rewrites the AI result.
- The workflow is bypassed (someone did it manually instead of through the pipeline).
- The design system cannot represent a requirement.
- Breakdance requires manual correction after AI generation.
- The AI lacks the context it needed to do the job.
- The system saves significant time.
- Governance or review introduces significant delay.

If in doubt, log it. Over capture is cheap; a missed lesson is not.

## Category taxonomy (fixed legend)

Use exactly these category codes. Do not invent new ones during the pilot; if something genuinely does not fit, use OTHER and describe it, and propose a new code for v0.2.

| Code | Category | Meaning |
|------|----------|---------|
| REJECT | AI output rejected | The AI output was discarded and not used |
| REWRITE | Substantial human rewrite | The output was kept in principle but heavily rewritten by a human |
| BYPASS | Workflow bypassed | The task was done manually outside the pipeline |
| DSLIMIT | Design system limit | The design system could not represent a requirement |
| BDFIX | Breakdance manual correction | Breakdance needed manual fixing after AI generation |
| NOCTX | AI lacked context | The AI did not have the information it needed |
| TIMESAVE | Significant time saved | The pipeline clearly saved meaningful time |
| GOVDELAY | Governance delay | Review or governance added significant delay |
| OTHER | Other | Anything meaningful that does not fit above |

## Log table template

Copy this table into `pilot-artefacts/decisions_and_failures_log.md` and add one row per event. IDs run sequentially (DFL-001, DFL-002, and so on).

| ID | Date | Phase | Category | What happened | Why | Time impact | Action / lesson | Owner |
|----|------|-------|----------|---------------|-----|-------------|-----------------|-------|
| DFL-001 | | | | | | | | |

Column notes:

- **Phase**: the pilot phase from document 10 (Phase 1 to Phase 4), or Setup.
- **Category**: one code from the legend above.
- **Time impact**: a signed estimate, for example "-3 hrs saved" or "+2 hrs lost". Keep it honest and rough is fine.
- **Action / lesson**: what we did in the moment and what should change in the system as a result.
- **Owner**: who owns the follow up action.

## Worked examples

These three rows show the level of detail expected. They are illustrative.

| ID | Date | Phase | Category | What happened | Why | Time impact | Action / lesson | Owner |
|----|------|-------|----------|---------------|-----|-------------|-----------------|-------|
| DFL-001 | 2026-07-15 | Phase 3 | BDFIX | AI generated the homepage hero but the spacing tokens did not apply to the section padding, so it rendered with default padding | Breakdance section padding was set outside the global token layer, so the token merge did not reach it | +1.5 hrs lost | Manually corrected padding, then added a pre generation note that section level spacing must be mapped explicitly in the token map. Update the token translation prompt for v0.2 | Dev Lead |
| DFL-002 | 2026-07-16 | Phase 2 | NOCTX | AI proposed a testimonials layout the client had already rejected in an earlier project | The pilot brief did not include prior client feedback, so the AI had no way to know | +0.5 hr lost | Added a "client no go list" to the Phase 1 brief template so prior rejections are always fed in | PM |
| DFL-003 | 2026-07-18 | Phase 4 | TIMESAVE | AI generated three near identical service subpages from one approved pattern in minutes, all passing review with only minor copy tweaks | The pattern was well defined and the token layer was already locked from Phase 3 | -4 hrs saved | Confirmed that repeatable, pattern based pages are the strongest use case; recommend leading with these in v0.2 | Design Lead |

## Reviewing the log at the pilot review

At the pilot review, work through the log as a group:

1. **Count entries by category**. A cluster of REJECT, REWRITE or BDFIX points to where the pipeline is weakest.
2. **Sum the time impact column**. Compare the total time saved (TIMESAVE) against total time lost (everything with a positive impact) for a rough net picture, and cross check it against the effort metrics in document 11.
3. Pull out DSLIMIT and NOCTX entries specifically; these define the boundaries of what the system can do today and what must be fixed before scaling.
4. Read GOVDELAY entries against the quality outcomes; if governance added delay but prevented defects, that is a good trade and should be kept.
5. Turn the strongest lessons into concrete changes for system v0.2 (prompt changes, template changes, new checks, scope rules) with named owners.
6. Feed the top three lessons into the scorecard summary in document 11.

## Relationship to the issue and exception log

There are two records during the pilot, and they serve different purposes.

- `pilot-artefacts/issue_and_exception_log.md` is the lightweight, in the moment running log. It is a quick capture of anything odd or blocking as the build proceeds, so nothing is forgotten. It is fast and low friction.
- This document (the decisions and failures log) is the richer, structured record. Meaningful items from the lightweight log are promoted here with full detail (category, why, time impact, lesson, owner).

In practice the operator jots quick notes in the issue and exception log during a session, then at the end of each session or phase promotes the significant ones into this decisions and failures log. This document is the one that feeds system v0.2; the lightweight log is a working scratchpad that need not survive the pilot.
