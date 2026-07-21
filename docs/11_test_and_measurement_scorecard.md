# AI Web Design System v0.1: Test and Measurement Scorecard

Document 11 of the AI Web Design System v0.1 series.
Audience: Agency PMs, Designer and Dev Lead.
Status: Internal working document.

## Purpose

This scorecard is the instrument that decides whether the AI assisted pipeline actually works. It deliberately measures end to end quality and defects, not just how fast a first draft appears. A pipeline that produces a fast first draft but multiplies rework, defects or handoff friction is a net loss, and this scorecard is designed to expose that.

## How to use this document

1. **Establish the baseline first using document 20**. Every metric here compares against a baseline figure.
2. Agree the target and the pass, watch and fail bands with the PM, Dev Lead and Designer before the pilot starts.
3. **Record actuals during and after the pilot**. Populate the summary template at the end.
4. **Read the whole scorecard together**. A single green metric does not prove success; a cluster of red or watch results in defects, rework or satisfaction outweighs a speed gain.

## Band convention

- **Pass**: the metric meets or beats target. The pipeline is working for this dimension.
- **Watch**: the metric is close to baseline or shows a mixed signal. Investigate before scaling.
- **Fail**: the metric is worse than baseline beyond tolerance. This dimension is a blocker.

Direction column shows whether lower or higher is better.

## 1. Effort

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Design hours | Total designer time on the project | Timesheet or time tracker per project | Doc 20 average | Lower than baseline (down) | Pass: down 20% or more; Watch: within 20% either way; Fail: up more than 10% |
| Dev hours | Total developer and build time | Timesheet or time tracker | Doc 20 average | Lower than baseline (down) | Pass: down 20% or more; Watch: within 20%; Fail: up more than 10% |
| PM hours | Total project management and coordination time | Timesheet or time tracker | Doc 20 average | Hold or lower (down) | Pass: at or below baseline; Watch: up to 15% above; Fail: more than 15% above |

Note: read effort together with rework and defects. Saving design hours while doubling dev rework is not a win.

## 2. Handoff quality

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Handoff questions | Count of clarification questions from design to build | Tally in the issue log during handoff | Doc 20 estimate | Fewer (down) | Pass: down 30% or more; Watch: within 30%; Fail: more than baseline |
| Post handoff design revisions | Design changes requested after build started | Tally in the issue log | Doc 20 estimate | Fewer (down) | Pass: down 30% or more; Watch: within 30%; Fail: more than baseline |

## 3. Rework and defects

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Pre launch defects | Defects found in QA before launch | QA defect log count | Doc 20 average | Fewer (down) | Pass: down 25% or more; Watch: within 25%; Fail: more than baseline |
| Post launch defects | Defects found in first 30 days after launch | Support and bug tracker count | Doc 20 average | Fewer (down) | Pass: down 25% or more; Watch: within 25%; Fail: more than baseline |
| Design versus build mismatches | Places where the built page does not match the approved design | Side by side review count per page | Doc 20 estimate | Fewer (down) | Pass: down 30% or more; Watch: within 30%; Fail: more than baseline |

This group is the heart of the test. AI can generate quickly and still drift from the design or introduce silent regressions. Weight this group heavily in the overall read.

## 4. Accessibility and responsiveness

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| WCAG AA violations | Count of AA level accessibility violations | Automated audit plus manual check per page | Doc 20 estimate or industry norm | Zero blocking (down) | Pass: zero blocking violations; Watch: minor non blocking only; Fail: any blocking violation at launch |
| Breakpoint errors | Layout breakages across defined breakpoints | Manual review at each breakpoint per page | Doc 20 estimate | Fewer (down) | Pass: zero; Watch: 1 to 2 minor; Fail: any breaking a primary breakpoint |

## 5. Performance

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Lighthouse performance | Lighthouse performance score on key pages | Lighthouse audit (mobile and desktop) | Doc 20 or prior project score | Meet or beat target (up) | Pass: 90 or above mobile; Watch: 75 to 89; Fail: below 75 |
| Core Web Vitals | LCP, INP and CLS on key pages | Field or lab measurement | Google thresholds | All in "good" (up) | Pass: all three in good; Watch: one needs improvement; Fail: any poor |

## 6. Consistency

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Token and component adherence | Share of elements using approved tokens and components rather than ad hoc values | Manual audit of a page sample against the token map | Doc 20 estimate | Higher (up) | Pass: 95% or above; Watch: 85 to 94%; Fail: below 85% |

Token adherence is a leading indicator. Low adherence predicts future maintenance pain even if the pilot pages look correct.

## 7. Satisfaction

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Designer satisfaction | Designer rating of the process and output | Short survey, 1 to 5 scale | Doc 20 estimate | Hold or higher (up) | Pass: 4 or above; Watch: 3; Fail: below 3 |
| Developer satisfaction | Developer rating of the process and output | Short survey, 1 to 5 scale | Doc 20 estimate | Hold or higher (up) | Pass: 4 or above; Watch: 3; Fail: below 3 |
| Client satisfaction | Client rating of the delivered site | Short survey or feedback, 1 to 5 scale | Doc 20 where available | Hold or higher (up) | Pass: 4 or above; Watch: 3; Fail: below 3 |

## 8. Financial

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Delivery cost or gross margin | Internal cost to deliver, or gross margin on the project | Finance figures against effort and tool cost | Doc 20 average | Lower cost or higher margin (better) | Pass: margin up 10% or more; Watch: within 10%; Fail: margin down |
| Time to delivery | Elapsed calendar time from start to launch | Project dates | Doc 20 average | Shorter (down) | Pass: down 20% or more; Watch: within 20%; Fail: longer than baseline |

## 9. AI specific

| Metric | Definition | How measured | Baseline source | Target and direction | Pass / Watch / Fail |
|--------|------------|--------------|-----------------|----------------------|---------------------|
| Percent of AI outputs needing major correction | Share of AI generated pages or artefacts needing substantial human rewrite | Tally from document 21 decisions log | New metric, no baseline | Lower (down) | Pass: below 20%; Watch: 20 to 40%; Fail: above 40% |
| AI tool cost | Monthly cost of AI tooling attributable to delivery | Figma Dev seat (about US$12 per operator per month), Novamira licence (Pro EUR 49 to 249 per year), Claude usage | New metric | Justified by savings | Pass: well below effort savings; Watch: comparable; Fail: exceeds savings |
| Key person reliance | Whether the pipeline can run without one specific individual | Assessment at pilot review | New metric | Low reliance (down) | Pass: two or more can run it; Watch: one plus partial cover; Fail: single point of failure |

Key person reliance matters because Novamira and the wider pipeline are early stage. If only one person can operate it safely, the capability is fragile regardless of the other scores.

## Overall scorecard summary template

Copy this into `pilot-artefacts/scorecard.md` and complete it at the pilot review.

```
AI Web Design System v0.1 Pilot Scorecard
Project:
Dates:
Baseline reference (doc 20):

Group                          Result (Pass / Watch / Fail)   Notes
1. Effort
2. Handoff quality
3. Rework and defects
4. Accessibility and responsiveness
5. Performance
6. Consistency
7. Satisfaction
8. Financial
9. AI specific

Headline metrics
- End to end effort vs baseline:
- Total defects (pre + post launch) vs baseline:
- Design versus build mismatches vs baseline:
- Token and component adherence:
- Percent of AI outputs needing major correction:
- Net financial effect:

Overall verdict: Adopt / Adopt with changes / Do not adopt
Rationale (2 to 4 sentences):
Top three lessons (from doc 21):
Recommended changes for v0.2:
```

## Reading the result

Adopt only if the rework and defects group holds or improves AND at least one of effort or financial improves AND satisfaction does not fall. A speed or cost gain bought with more defects, more mismatches or lower satisfaction is recorded as "Adopt with changes" at best, and the specific failure feeds document 21 and system v0.2.
