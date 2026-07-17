# AI Web Design System v0.1: Baseline Measurement

Document 20 of the AI Web Design System v0.1 series.
Audience: Agency PMs, Dev Lead, Design Lead.
Status: Internal working document.

## Purpose

The scorecard in document 11 compares the pilot against how we deliver today. This document captures that "today" baseline from several recently completed projects, so the pilot has an honest reference point. Without a baseline, any pilot result is just a number with nothing to compare it to.

## What counts as a good baseline project

Choose 3 to 5 projects that resemble the pilot candidate:

- Brochure or small marketing sites (broadly comparable in page count and complexity to the pilot).
- Completed and launched within roughly the last 12 months, so records and memories are fresh.
- Built with the current manual process (no AI generation), so the comparison is fair.
- A mix if possible (one simple, one typical, one more involved) to give a realistic spread rather than a single flattering example.

Avoid outliers such as a project that went badly for reasons unrelated to process (a difficult client, a scope explosion, a staffing gap), unless you note that clearly.

## What to collect per past project

For each project, gather the following. Use records where they exist and estimate where they do not, following the estimation guidance below.

| Field | Meaning |
|-------|---------|
| Design hours | Total designer time (discovery, design, revisions) |
| Development hours | Total build time in the page builder plus any custom work |
| Handover / clarification time | Time spent on design to build questions and clarifications |
| QA hours | Time spent testing before launch |
| Rework hours | Time spent redoing work already "finished" (design or build) |
| Defects before launch | Count of issues found in QA before go live |
| Defects after launch | Count of issues found in the first 30 days after go live |
| Elapsed delivery time | Calendar days or weeks from kickoff to launch |
| Gross margin or internal delivery cost | Margin on the project, or internal cost to deliver |
| Designer satisfaction | Designer rating of the project, 1 to 5 |
| Developer satisfaction | Developer rating of the project, 1 to 5 |
| Client satisfaction | Client rating where available, 1 to 5 |

## Data collection table

Copy this into `pilot-artefacts/baseline.md` and complete one column per past project.

| Metric | Project A | Project B | Project C | Project D | Project E |
|--------|-----------|-----------|-----------|-----------|-----------|
| Project name | | | | | |
| Page count | | | | | |
| Launch date | | | | | |
| Design hours | | | | | |
| Development hours | | | | | |
| Handover / clarification time (hrs) | | | | | |
| QA hours | | | | | |
| Rework hours | | | | | |
| Defects before launch | | | | | |
| Defects after launch | | | | | |
| Elapsed delivery time (days) | | | | | |
| Gross margin or delivery cost | | | | | |
| Designer satisfaction (1 to 5) | | | | | |
| Developer satisfaction (1 to 5) | | | | | |
| Client satisfaction (1 to 5) | | | | | |
| Data quality (measured / estimated) | | | | | |

The final row records how solid the numbers are for that project, so the pilot review can weight them.

## Estimating where records are incomplete

Most agencies do not track everything cleanly. That is fine. Estimate honestly and mark the estimate.

- **Prefer real data**. Pull hours from timesheets or the time tracker, defects from the bug or QA log, dates from the project tool, and margin from finance.
- **If hours were not tracked, reconstruct them**. Ask the designer and developer for a considered estimate of total hours, or derive from the quoted budget and the known hourly rate, and mark the cell as estimated.
- For defects with no formal log, ask the team to recall roughly how many issues were found in QA and in the first month, and record it as an estimate with a note.
- For rework, estimate the share of design and build time that was redoing finished work; even a rough percentage is useful.
- For satisfaction, if no survey exists, ask the people involved to rate the project now from memory, 1 to 5, and note it as recalled.
- Where a figure is genuinely unknowable, leave it blank rather than guessing wildly, and note why.
- Mark every estimated cell clearly (for example append "(est)") so the averages can be read with the right confidence.

Be conservative. Do not flatter the manual baseline (that would make the pilot look artificially good) and do not inflate it (that would make the pilot look artificially bad). Aim for the most likely honest figure.

## Computing the baseline averages

For each metric, compute the average across the projects you collected. These averages become the baseline figures that document 11 compares against.

1. For hours, defects, elapsed time and cost, take the mean across projects. If one project is a clear outlier, compute the average both with and without it and note both.
2. For satisfaction, take the mean of the ratings you have.
3. Where a metric is per page (for example design versus build mismatches or defects), consider normalising by page count so the pilot comparison is like for like, since the pilot site may differ in size.
4. Record the sample size (how many projects fed each average) next to each figure, because an average of two projects is weaker than an average of five.

## Baseline summary template

Complete this and save it in `pilot-artefacts/baseline.md`. These figures populate the "Baseline source" column of document 11.

```
AI Web Design System v0.1 Baseline
Projects used (n = ):
Date range:
Prepared by:
Date prepared:

Metric                                  Baseline average   Sample size   Data quality
Design hours
Development hours
Handover / clarification time (hrs)
QA hours
Rework hours
Defects before launch
Defects after launch
Elapsed delivery time (days)
Gross margin or delivery cost
Designer satisfaction (1 to 5)
Developer satisfaction (1 to 5)
Client satisfaction (1 to 5)

Per page normalisation (if used):
- Defects before launch per page:
- Defects after launch per page:
- Design versus build mismatches per page (if recorded):

Notes on outliers and estimates:
```

## Handover to the scorecard

Once complete, the baseline averages are copied into document 11 as the "Baseline source" figures. The pilot then records its actuals against these numbers, and the pass, watch and fail bands in document 11 are read relative to this baseline.
