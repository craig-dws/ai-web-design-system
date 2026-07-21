# AI Web Design System v0.1

> **STATUS: PARTIALLY SUPERSEDED, 17 July 2026. This is no longer the governing specification. `CLAUDE.md` is.**
>
> Written when the system had **one build target**. It predates the two-target architecture, the Breakdance decision, the content-authority model, and several corrections in doc 01.
>
> **Where this and `CLAUDE.md` disagree, `CLAUDE.md` wins. Where this and doc 24 disagree on a decision, doc 24 wins.**
>
> **Still current and target-neutral:** the gate model, roles and decision rights, artefacts per stage, acceptance criteria, and the exception and rollback procedures. Those are the reason this document still exists.
>
> **Out of date:** anything implying WordPress is the only target, and the scope section, which predates Target B.
>
> Folding the gate model into a single current specification is outstanding work, recorded rather than done. Rewriting a governance document that is largely correct is lower value than proving the Breakdance write path.

Status: SUPERSEDED IN PART | Updated: 21 July 2026 | Owners: Project Manager, Designer and Dev Lead

This was the governing specification for how the agency uses AI (Claude Design, Claude Code, Figma MCP, Novamira, Breakdance) to take a website from brief to launch. v0.1 was the pilot version: deliberately minimal, honest about what is unproven.

The detailed workflows, prompts, setup, and templates live in the sibling documents in this folder. This document defines the rules those documents operate under.

---

## 1. Scope and exclusions

### In scope

- New WordPress website builds using Breakdance Pro, from an approved brief to a launched site.
- AI-assisted research, design ideation, design-system token work, code scaffolding, and supervised page assembly on staging.
- The design-to-development handoff between Figma and Breakdance.
- One low-risk pilot project, run under the phased plan in 10_pilot_implementation_plan.md.

### Out of scope for v0.1

- **Autonomous changes to any live production site**. Excluded entirely.
- **E-commerce and complex web applications**. v0.1 targets brochure and small marketing sites only.
- Migrations of existing large sites.
- Client self-service AI editing.
- Using the WordPress native AI Client, InstaWP, or Breakdance AI add-on in the pilot. These are evaluated separately and may enter v0.2.
- Any use of Novamira on production.

### Explicit non-goals

- **We are not trying to remove designers or developers**. AI accelerates tasks; humans own judgement, quality, and every approval.
- **We are not chasing first-draft speed**. We measure end-to-end delivery quality and defect rates, not how fast AI produces a rough draft (see 11_test_and_measurement_scorecard.md).

---

## 2. Workflow, brief to launch (one diagram)

```
[Brief approved]
      |
      v
(1) Discovery and requirements ....... gate: PM + client sign-off
      |
      v
(2) Sitemap and content architecture . gate: PM + client sign-off
      |
      v
(3) Visual direction / style ......... gate: client, advised by Designer
      |
      v
(4) Design system foundations ........ gate: Designer self-certification; PM records evidence
      |
      v
(5) High-fidelity design (Figma) ..... gate: client, with Designer review
      |     AI assists; human decides
      v
(6) Dev-ready handoff (contract) ..... gate: PM + Dev Lead accept
      |
      v
(7) Staging setup + token sync ....... gate: Dev Lead
      |     Figma MCP read -> Breakdance global settings (diff merge)
      v
(8) Homepage build on staging ........ gate: Designer + QA review
      |     AI assists under review
      v
(9) Subpage build on staging ......... gate: Designer + QA review
      |
      v
(10) QA, accessibility, performance ... gate: QA Lead
      |
      v
(11) Pre-launch review ............... gate: client + PM
      |
      v
(12) Production deployment ........... gate: PM final approval
      |     manual, backed up, rollback ready
      v
[Live site] -> post-launch verification -> Client Mode handover
```

Every arrow crossing into a new stage is a go or no-go gate. AI can prepare evidence for a gate. Only a human approves it.

---

## 3. Responsibilities and decision rights

Roles: PM (project manager), Designer, Dev Lead, Developer, QA, Client.

| Decision | Who decides | AI role |
|----------|-------------|---------|
| Scope and requirements | PM with client | Draft and summarise only |
| Visual direction | Client, advised by Designer | Generate options only |
| Design system token values | Designer | Suggest, never finalise |
| Design-system readiness | Designer self-certifies; PM records the required evidence | Prepare checklist and handoff evidence |
| Design sign-off (dev-ready) | Designer; Dev Lead accepts technical handoff | Prepare handoff evidence |
| Enabling Novamira AI Abilities | Dev Lead only | None |
| Accepting AI-generated build output | Designer and QA | Produce, never self-approve |
| Accessibility compliance | QA and Dev Lead | Scan and flag only |
| Production deployment | PM (final), executed by Dev Lead | None |

Single accountable owner rule: every stage has exactly one accountable person. The full activity-level RACI is in the source operating model and will be maintained alongside this spec.

---

## 4. Mandatory human approval gates

No stage may be skipped. The twelve gates in section 2 are mandatory. In addition, these actions always require a named human approval regardless of stage:

1. Enabling or re-confirming Novamira AI Abilities (Dev Lead).
2. Any `wp breakdance import_settings` run (must be a reviewed differential merge).
3. Any direct write to `_breakdance_data` postmeta.
4. Any use of `use_figma` to write back to Figma (duplicate file only).
5. Any promotion of staging to production.
6. Any exception to this system (logged, see section 9).

AI never gives final approval on anything. AI output is always a proposal.

---

## 5. Artefacts required at each stage

| Stage | Required artefact |
|-------|-------------------|
| Discovery | Signed brief; project intake (pilot artefact 01) |
| Architecture | Sitemap and content map |
| Visual direction | Style tiles, palette, type |
| Design foundations | Figma Variables, canonical token contract, derived DESIGN.md and design-system checklist (02) |
| High-fidelity design | Approved Figma frames (desktop, tablet, mobile) |
| Handoff | Signed handover contract (04); dev acceptance |
| Staging setup | Configured staging; AI context pack (05); MCP verified |
| Build | Staging pages; deviation notes |
| QA | QA and accessibility checklist (08) complete |
| Pre-launch | Test results, client demo record |
| Deployment | Backup and rollback plan; version tag |
| Post-launch | Verification record; Client Mode handover |

Throughout: the issue and exception log (09) and time and rework tracking (10) are kept live.

---

## 6. Acceptance criteria

A stage is complete only when its gate owner has signed off and its required artefact exists. Specific bars:

- **Dev-ready handoff**: passes the handover contract checklist in full. Missing items mean the handoff is rejected, not patched informally.
- **Build output**: matches the approved Figma at all defined breakpoints; deviations are logged and approved, not silent.
- **Accessibility**: WCAG 2.2 AA, verified by a human (automated scans assist but do not certify).
- **Performance**: meets the agreed Core Web Vitals or Lighthouse target for the project.
- **Launch**: pre-launch review passed, backup taken, rollback documented, PM approval recorded.

---

## 7. Source-of-truth rules

The authoritative system for each class of information, and when authority transfers, is defined in 13_source_of_truth_model.md. The rules in brief:

- **Requirements**: the signed brief, changed only by approved change request.
- **Design (before build)**: the approved Figma file.
- **Design tokens**: approved Figma variables and the version-controlled canonical token contract. `DESIGN.md` is a derived explanation, not token authority.
- **Production implementation**: Breakdance and the site database after launch.
- **AI instructions**: the version-controlled project context (CLAUDE.md and the AI context pack).
- **Decisions and exceptions**: the project decision log.

Authority transfers at gates, never silently. Figma leads until handoff; the build leads after. A live site is never overwritten from an old Figma without reconciling first.

---

## 8. Security and data-handling rules

1. **Novamira runs on staging only, never production**. This is enforced by us, because the plugin does not enforce it.
2. **One Claude project per client site**. Never share a Claude project or context across clients.
3. Secrets (Application Passwords, API keys) never go into committed files. Use environment variable references and gitignored local settings.
4. **The Novamira sandbox is not a security boundary**. Treat every AI-executable PHP path as privileged. Protect wp-config.php and production paths with permission deny rules and hooks.
5. Do not feed one client's content into another client's prompts or agent memory.
6. HTTPS is mandatory on all environments (also a WordPress 7.0 baseline requirement).
7. Keep pre-execution backups before any agent run that can write to the database.
8. **Domain-locking**: after any clone or environment move, Novamira abilities go dormant and must be re-confirmed by a human. Do not automate re-confirmation.
9. **Do not send sensitive personal data into AI tools**. Exclude it when summarising client content.

---

## 9. Exception and rollback procedures

### Exceptions

Any deviation from this system (skipping a gate, using a tool outside its scope, a manual override) is an exception. Every exception is logged in the issue and exception log (pilot artefact 09) and, if it teaches us something, the decisions and failures log (21). An exception needs the relevant gate owner's approval before it proceeds, or a written note of why it could not wait.

### Rollback

- **Design**: revert to the last approved Figma version; do not force live changes upstream.
- **Tokens or global settings**: restore the previous Breakdance global settings export (kept before every import).
- **Page or layout**: restore the backed-up `_breakdance_data` postmeta value, then `wp breakdance clear_cache`.
- **Site (agent failure)**: trigger Novamira URL safe-mode to skip sandbox files; restore from the pre-execution backup.
- **Production**: restore from the pre-deployment backup; the rollback plan is a launch prerequisite, not an afterthought.

Every risky step in the runbook (19) names its own rollback. If a step has no rollback, it does not run.

---

## 10. Versioning of this system

- **v0.1 (this document)**: pilot version. Minimal, honest about unproven areas.
- **v0.2**: revised after the pilot using the decisions and failures log (21) and the pilot review (pilot artefact 11). Expected to firm up the write path, expand scope, and possibly adopt Novamira Pro or the WordPress native AI Client.

Do not build a large internal knowledge base before the pilot proves the core. Create only what the pilot needs.
