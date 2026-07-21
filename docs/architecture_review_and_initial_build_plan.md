# AI Web Design System Architecture Review and Initial Build Plan

Date: 17 July 2026

Review revision: 2

Repository baseline reviewed: commit `95b2639`

Review type: architecture, evidence, and implementation-readiness assessment

## Research question and scope

This review answers one question:

> Is the updated repository internally consistent and sufficiently proven to run its full system setup and begin a real Target A pilot?

The review covers the active root instructions, the 28 primary documents, the pilot artefacts, the updated commit, and the earlier architecture review. The quarantined `_ported-for-review/` tree was treated as historical input rather than current system authority.

Current or unstable product claims were checked against primary vendor documentation. Repository claims were checked against the files that an operator is instructed to read and execute.

## Executive summary

**Verdict: BLOCK the full-system build and real client pilot.**

The update is a material improvement. It correctly narrows Code Connect to the code target, describes hooks as guardrails rather than a security boundary, separates illustrative pilot entries from evidence, marks document 12 as partially superseded, removes the unverified execution-limit claim from the runbook, and records the current Breakdance and Novamira decisions more clearly.

The remaining blockers are narrower and repairable:

1. `CLAUDE.md`, the declared governing file, still conflicts with the new post-launch content-authority rule.
2. The decision to buy Novamira Pro for the viability test has not been propagated across active setup and recommendation documents.
3. Active setup instructions still state unverified Novamira abilities and a 30-second execution limit as facts.
4. The setup prompt and runbooks contain repository paths that do not exist.
5. The lifecycle document still tells operators to make pre-launch UAT copy changes directly on the staging site.
6. Code Connect was corrected in document 07 but remains overgeneralised elsewhere.
7. Figma capability text is already stale against current official documentation.
8. The Breakdance write path remains unproven. The repository itself now correctly identifies this as the viability gate for Target A.

The earlier recommendation to build a TypeScript merge-planning CLI first is withdrawn. A real Breakdance settings export and a bounded, disposable-staging write test should precede broader tooling. Building abstractions around an undocumented format before observing that format would invert the risk order.

The correct immediate sequence is:

```text
Repository consistency patch
        |
        v
Real Breakdance settings export
        |
        v
Disposable-staging Novamira Pro write test
        |
        +-- FAIL -> keep Breakdance building manual or reconsider Target A
        |
        +-- PASS -> define the supported write contract and build only the tooling it proves necessary
```

## What the update resolved

| Earlier issue | Current status | Evidence |
|---|---|---|
| Content authority was described as one flat rule | **Partially resolved** | `docs/13_source_of_truth_model.md:31-45` and `docs/25_end_to_end_lifecycle.md:135-151` now distinguish pre-launch and post-launch authority. The rule was not propagated to `CLAUDE.md` or the UAT section. |
| Document 24 contradicted itself about Breakdance and Novamira | **Resolved inside document 24** | Superseded text is labelled and the settled/open decision lists are explicit at `docs/24_open_questions_answered.md:415-428`. |
| Document 12 was presented as current governing scope | **Partially resolved** | `docs/12_ai_web_design_system_v0.1.md:3-13` marks it partially superseded and makes `CLAUDE.md` authoritative. Other index entries still call document 12 governing. |
| Document 19 asserted a 30-second Novamira limit | **Resolved in document 19** | `docs/19_implementation_runbook.md:19` now states that the limit is unverified and must not be relied on. Document 15 still asserts it. |
| Prompt library setup paths were stale | **Partially resolved** | `docs/14_prompt_library.md:255-263` routes operators to `START_HERE.md`, but stale reference text and other invalid paths remain. |
| Code Connect was treated as a Target A mechanism | **Resolved in document 07** | `docs/07_figma_mcp_setup_and_handoff_contract.md:62-68` restricts it to Target B and introduces a reviewed Target A mapping table. The correction is not repository-wide. |
| Hooks were described as strong protection | **Resolved conceptually** | `docs/09_skills_agents_commands_hooks.md:204-208` states their actual limits, including inability to inspect Novamira MCP execution. |
| Sample pilot outcomes resembled evidence | **Resolved** | `docs/pilot-artefacts/09_issue_and_exception_log.md:20-34` starts empty and separates worked examples. |

## Current system understanding

The repository defines an internal agency operating system for producing small marketing websites with AI assistance and named human approvals.

The stable principles are:

- The repository is the agency system, not a client website.
- Each client project is isolated.
- Content exists before design.
- Figma is authoritative for approved design until handoff.
- Design tokens are version controlled.
- AI never approves its own work.
- External writes are staging-only, backed up, reviewed, and recoverable.
- Production promotion is a human action.
- Target A is WordPress plus Breakdance.
- Target B is Astro plus Payload, but should not expand the initial pilot scope.

The intended Target A flow is:

```text
Signed brief
   |
Approved content: ZilvaEdge -> Google Doc -> reviewed markdown
   |
Approved Figma design and token system
   |
Reviewed Figma-to-Breakdance mapping
   |
Disposable staging build and human review
   |
QA, UAT, and human-controlled launch
   |
Live site becomes post-launch content authority
```

The central unresolved technical fact is whether a third-party write to Breakdance's undocumented layout structure produces a complete, natively editable, recoverable page. Until that is demonstrated, Target A is an architectural hypothesis rather than a proven delivery pipeline.

## Remaining findings

### 1. Governing content authority is still contradictory

**Severity: High**

**Status: Blocking**

`CLAUDE.md:67` says the Google Doc is authoritative for content "after publish." Documents 13 and 25 now say the Google Doc is authoritative before launch and the live site becomes authoritative after launch.

This is not a harmless wording difference. Document 12 says `CLAUDE.md` wins when documents disagree, so an operator following the authority hierarchy can override the corrected lifecycle model.

Required resolution:

- Change the governing table to distinguish `before launch` and `after launch`.
- Define `publish` and `launch`, or use only one term.
- State that a new post-launch article restarts the editorial cycle without making the old Google Doc authoritative for existing live-page edits.

### 2. The Novamira Pro decision is not propagated

**Severity: High**

**Status: Blocking**

Document 24 settles the decision: buy Novamira Pro for the write test. Active documents still say something different:

- `START_HERE.md:12`: do not buy Novamira Pro yet.
- `docs/02_recommended_minimum_architecture.md:107-112`: begin with free core and consider Pro after the pilot.
- `docs/16_plugin_recommendation_matrix.md:46`: use Novamira free for the pilot.
- `docs/18_novamira_recommendation.md:7` and `:41-47`: begin free and defer Pro until after a front-half pilot.
- `docs/19_implementation_runbook.md:28`: Pro or free-tier limits are both presented as acceptable.
- `docs/24_open_questions_answered.md:422-427`: buy Pro and run the viability test before other Target A work.

Required resolution:

- Make the purchase sequence explicit: no purchase before the setup reaches the human step; then buy Pro specifically for the disposable-staging write test.
- Mark the free-first strategy in documents 02, 16, and 18 as superseded.
- Do not describe a free-core test as equivalent to testing the Pro Breakdance specialisation.

### 3. Active setup instructions still assert unverified Novamira facts

**Severity: High**

**Status: Blocking before setup execution**

`docs/15_claude_code_setup_and_mcp_config.md:71-77` lists nine core abilities, includes Create Upload Link, and states a 30-second execution limit. `docs/01_current_state_findings_and_claims_to_verify.md:26` confirms eight abilities and treats Create Upload Link as unconfirmed. The same evidence ledger says the execution limit is unverified.

The safety consequence matters: an operator must not rely on an execution ceiling that may not exist.

Required resolution:

- Replace the downstream claim with the eight confirmed capabilities.
- Label machine identifiers and Create Upload Link as installation-time verification items.
- Remove the 30-second limit from every active instruction.
- Keep staging, backups, disposable environments, restricted credentials, and human review as the actual controls.

Novamira's current security documentation explicitly says the sandbox is not a security boundary, Execute PHP bypasses it, crash recovery does not roll back changes, and staging use is recommended rather than enforced: <https://novamira.ai/docs/security/>.

### 4. Operational paths do not match the repository

**Severity: High**

**Status: Blocking before copy-paste execution**

Verified locally:

- `C:\Apps\Websites\ai-web-design-system` does not exist.
- `C:\Apps\AI Web Design System` is the current repository.
- `docs/systems/ai-web-design-system-v0.1/pilot-artefacts/` does not exist.
- `docs/pilot-artefacts/` is the current pilot-artefact directory.

The stale locations appear in `START_HERE.md:7`, `docs/10_pilot_implementation_plan.md:54`, and `docs/19_implementation_runbook.md:32`.

Required resolution:

- Prefer repository-relative instructions instead of a developer-specific absolute path.
- Replace every old pilot-artefacts path with `docs/pilot-artefacts/`.
- Add an internal path check to documentation validation.

### 5. The UAT rule conflicts with the pre-launch content model

**Severity: Medium**

**Status: Blocking for a real pilot**

`docs/25_end_to_end_lifecycle.md:141-151` correctly says pre-launch copy changes happen in the Google Doc and are pulled into the build. The UAT section at `:159-164` then says content and copy fixes are made directly on the staging site.

UAT precedes launch. Therefore the second instruction violates the authority model and risks the next content pull silently overwriting accepted UAT changes.

Required resolution: route UAT copy fixes to the Google Doc, pull them into staging, and record the reviewed content revision at the UAT gate.

### 6. Code Connect is still overgeneralised outside document 07

**Severity: Medium**

**Status: Must be resolved before authoring Target A skills**

Document 07 now correctly states that Code Connect maps Figma components to code components and therefore belongs to Target B. Target A uses native Breakdance nodes, so it needs a reviewed, version-controlled Figma-to-Breakdance mapping table.

However:

- `docs/14_prompt_library.md:387` still calls Code Connect the single biggest accuracy lever without target scope.
- `docs/23_best_practices.md:40` explicitly recommends it for both targets.

Required resolution: scope every Code Connect recommendation to Target B or explicit custom code components. Route Target A instructions to the mapping table introduced in document 07.

### 7. Figma capability statements are stale

**Severity: Medium**

**Status: Documentation freshness issue**

`START_HERE.md:194`, documents 01, 05, and `docs/07_figma_mcp_setup_and_handoff_contract.md:56` say `use_figma` has no image or asset support.

Current official Figma documentation lists `download_assets`, `upload_assets`, image handling through `use_figma`, and cross-file asset transfer. The beta status remains current, but the no-image statement does not: <https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/>.

Required resolution:

- Correct the current capability statement.
- Centralise volatile tool limits in one dated capability matrix.
- Make other documents link to that matrix instead of copying fast-changing product facts.

### 8. Governing-document routing is still inconsistent

**Severity: Medium**

**Status: Must be resolved in the consistency patch**

Document 12 now says it is no longer the governing specification and that `CLAUDE.md` wins. `docs/00_README_and_index.md:52` and `docs/25_end_to_end_lifecycle.md:186` still call document 12 the governing specification.

Required resolution: describe document 12 as the retained gate and rollback model, point system authority to `CLAUDE.md`, and record that consolidation remains pending.

### 9. Hooks remain non-security controls

**Severity: Medium**

**Status: Correctly documented; implementation still requires testing**

The update correctly states that the sample hooks do not inspect `mcp__novamira__execute-php`, cannot see remote execution, and parse JSON fragily with `grep` and `sed`.

This finding no longer blocks documentation readiness, provided the implementation preserves the stated boundary:

- Hooks are operator feedback and accidental-error reduction.
- They are not proof that an unsafe MCP request cannot execute.
- The real boundary is no production credentials, disposable staging, snapshots, explicit enablement, pinned versions, least privilege where available, and human review.

Before any hook becomes load-bearing, replace shell regular-expression parsing with a small tested JSON parser and run escape tests on Windows paths and nested tool inputs.

### 10. Privacy and regulated-content controls remain incomplete

**Severity: Medium**

**Status: Blocking before a regulated client pilot**

The repository warns against sending sensitive personal data to AI, but it does not yet define data classification, client consent, retention, deletion, residency, incident handling, or which systems may hold regulated information.

This does not block a synthetic disposable-staging test. It does block using a medical or otherwise regulated client as the first pilot.

Required resolution: choose a low-risk brochure pilot with synthetic or approved non-sensitive content and create a data-handling standard before regulated use.

## Revised architectural assessment

### What should happen first

The system should not begin with a generic software platform or a speculative merge planner. The most valuable unknown is product viability, not implementation architecture.

The first technical evidence should be:

1. One real Breakdance Global Settings export.
2. One documented element-tree sample from a disposable staging site.
3. One Novamira Pro page-write attempt on that disposable site.
4. Native-editability verification in the Breakdance visual builder.
5. A deliberately malformed write and demonstrated recovery from a known snapshot.

This reveals whether Target A is viable and what, if anything, should be automated.

### What should remain manual initially

- Purchase and licence activation.
- Enabling Novamira abilities.
- Taking and validating the staging snapshot.
- Selecting the exact Figma frame and content fixture.
- Approving the proposed write.
- Opening the result in Breakdance and testing native editability.
- Triggering rollback.
- Deciding PASS or FAIL.
- Every production action.

### What may be automated during the viability test

- Read-only environment inspection.
- Export capture and hashing.
- Generation of a proposed element mapping.
- One explicitly approved staging write.
- Screenshot capture.
- Structured evidence recording.
- Comparison of before and after state.

### What remains excluded

- Real client data.
- Production credentials or production endpoints.
- Automatic promotion to production.
- Blind settings imports.
- Simultaneous Novamira and Respira access to the same site.
- Automatic content synchronisation.
- Target B implementation.
- Industry starter kits.
- Broad agent or skill rosters not needed by the test.

## Required evidence for the Breakdance write test

The test should produce one immutable evidence folder containing:

- Test identifier and date.
- Tool, plugin, WordPress, PHP, and Breakdance versions.
- Disposable staging URL identifier, with secrets excluded.
- Pre-test database and file snapshot identifiers.
- Hash of the real Breakdance settings export.
- Hash of the page's original `_breakdance_data`, if present.
- Approved Figma frame reference and content-fixture hash.
- Exact proposed operation and human approval record.
- Tool-call transcript with credentials redacted.
- Before and after screenshots.
- Post-write element tree and settings export.
- Native-editability checklist.
- Malformed-write result.
- Rollback execution and verification.
- Final PASS or FAIL decision with named approver.

## Acceptance criteria

The Target A viability test passes only if all of the following are true:

1. The page renders without fatal errors, unknown elements, or missing core structure.
2. Every created element opens and remains editable in the Breakdance visual builder.
3. Reopening, editing, saving, and reopening again preserves the structure.
4. Existing unrelated settings, pages, and content remain unchanged.
5. The output uses the approved token subset or records every deviation.
6. The test does not require production credentials.
7. The approved operation matches the operation actually executed.
8. A malformed or unsafe request is detected before damage, or the snapshot restores the site completely.
9. Cache clearing and post-write verification are successful.
10. A named human records PASS after reviewing the evidence.

Failure of any criterion means the automated Target A layout-write path is not adopted. It does not mean the entire agency system fails; the fallback is manual Breakdance construction using the same brief, Figma, token, handoff, and QA discipline.

## Updated staged plan

### Stage 0: Repository consistency patch

**Objective:** make active instructions deterministic before anyone copies a setup prompt.

Deliverables:

- Corrected content-authority table in `CLAUDE.md`.
- One Novamira purchase and test sequence across active documents.
- Corrected Novamira capability and execution-limit statements.
- Valid repository-relative paths.
- Corrected UAT copy workflow.
- Repository-wide Target A versus Target B Code Connect scope.
- Corrected Figma asset capabilities with one dated source location.
- Correct governing-document labels.
- Documentation link, path, and stale-claim checks.

Completion criteria:

- Searches return no contradictory active instruction for the decisions above.
- Every active internal path resolves.
- `START_HERE.md` can be followed from the current repository root.
- Historical statements are explicitly labelled and cannot be mistaken for instructions.
- No external service is contacted and no purchase is made during this stage.

### Stage 1: Acquire real target evidence

**Objective:** replace format assumptions with actual Breakdance evidence.

Deliverables:

- Disposable staging environment.
- Version inventory.
- Validated full snapshot.
- Real Breakdance settings export.
- Representative element-tree capture.
- Redacted evidence folder.

Completion criteria:

- Restore is tested before the write test.
- No client data or production credential exists in the environment.
- The evidence is sufficient to define the exact write and comparison.

### Stage 2: Run the 15-minute viability test

**Objective:** determine whether the Novamira Pro Breakdance specialisation can produce natively editable, recoverable output.

Completion criteria: all acceptance criteria in this report pass and a named human signs the result.

Decision on failure:

- Keep Breakdance construction manual, or reconsider Target A.
- Do not spend further time wrapping an unviable write path.

Decision on success:

- Record the exact supported operation, versions, constraints, and recovery steps.
- Continue to Stage 3 without generalising beyond what was tested.

### Stage 3: Build the smallest proven operating slice

Only after Stage 2 passes:

- Create the minimal project template.
- Implement only the skills needed for the tested flow.
- Formalise the Figma-to-Breakdance mapping table.
- Add evidence and gate records.
- Add tested JSON-parsing hooks as non-security guardrails.
- Run a homepage-only synthetic rehearsal.

Do not build a generic TypeScript platform unless the observed workflow produces a concrete need that a simple versioned template cannot meet.

### Stage 4: Low-risk real pilot

- Select one 5 to 8 page brochure site with non-sensitive content.
- Capture the manual baseline first.
- Run one target only.
- Review the homepage before subpages.
- Measure elapsed time, rework, deviations, defects, and human-review cost.
- Keep production promotion human-controlled.

### Stage 5: Optional expansion

Only evidence from the pilot can authorise:

- More page automation.
- Shared plugin packaging.
- Target B implementation.
- Content round-trip automation.
- Visual regression thresholds.
- SEO helper adoption.
- Industry starter systems.
- A broader agent roster.

## Updated initial Codex execution prompt

The following prompt is intentionally limited to Stage 0. It repairs the repository so the write test can be specified and authorised separately. It does not contact external systems.

```text
You are acting as the lead software architect and documentation consistency
engineer for the AI Web Design System repository.

OBJECTIVE

Make the active repository instructions internally consistent and copy-ready
for the Target A viability test. This is a repository-only documentation task.
Do not connect to WordPress, Figma, Novamira, Google Drive, ZilvaEdge, or any
other external service. Do not buy, install, publish, deploy, or delete
anything.

AUTHORITATIVE DECISIONS

Apply these decisions consistently across every active instruction:

1. Target A is WordPress plus Breakdance.
2. Target B is Astro plus Payload, but it is not part of the first pilot.
3. Content authority is phased:
   - ZilvaEdge markdown is authoritative while it is being written.
   - Once a human editor edits the Google Doc, the Doc is authoritative until
     launch. Pre-launch copy changes, including UAT changes, happen in the Doc
     and are pulled into staging.
   - At launch, authority for existing live-page content transfers to the live
     site. New post-launch content restarts the editorial cycle.
4. Buy Novamira Pro specifically for the disposable-staging Breakdance write
   test, but only when the setup reaches the explicit human purchase step.
   The earlier free-first and post-pilot-Pro strategies are superseded.
5. Do not rely on a 30-second Novamira execution limit. It is unverified.
6. Treat eight Novamira core abilities as confirmed. Treat Create Upload Link
   and exact machine identifiers as installation-time verification items.
7. Code Connect applies to Target B code components. Target A uses a reviewed,
   version-controlled Figma-to-Breakdance mapping table.
8. Hooks are guardrails and feedback, not a security boundary.
9. CLAUDE.md is the governing instruction file. Document 12 is retained for
   its gate, role, acceptance, exception, and rollback model but is not the
   current governing specification.
10. Figma product capabilities are volatile. Record them once in a dated
    capability section using current official documentation and link to it
    elsewhere.

READ FIRST

- README.md
- START_HERE.md
- CLAUDE.md
- docs/00_README_and_index.md
- docs/01_current_state_findings_and_claims_to_verify.md
- docs/02_recommended_minimum_architecture.md
- docs/07_figma_mcp_setup_and_handoff_contract.md
- docs/09_skills_agents_commands_hooks.md
- docs/10_pilot_implementation_plan.md
- docs/12_ai_web_design_system_v0.1.md
- docs/13_source_of_truth_model.md
- docs/14_prompt_library.md
- docs/15_claude_code_setup_and_mcp_config.md
- docs/16_plugin_recommendation_matrix.md
- docs/18_novamira_recommendation.md
- docs/19_implementation_runbook.md
- docs/23_best_practices.md
- docs/24_open_questions_answered.md
- docs/25_end_to_end_lifecycle.md
- docs/architecture_review_and_initial_build_plan.md

REQUIRED CHANGES

1. Propagate the authoritative decisions above through all active documents.
2. Replace the obsolete repository path with repository-relative wording.
3. Replace every nonexistent pilot-artefacts path with
   docs/pilot-artefacts/.
4. Fix the pre-launch UAT copy workflow.
5. Remove or label stale Novamira assertions.
6. Scope Code Connect consistently by target.
7. Correct the Figma no-image statement using current official Figma MCP
   documentation.
8. Correct every description that still calls document 12 governing.
9. Preserve historical reasoning only where it is explicitly labelled
   SUPERSEDED and cannot be mistaken for current instructions.
10. Do not broaden the architecture or build software during this task.

VALIDATION

- Inspect git status before and after editing.
- Preserve unrelated user work.
- Search the active repository for every superseded phrase and stale path.
- Verify every active relative path resolves.
- Check Markdown links.
- Check JSON and configuration examples for syntax where applicable.
- Run git diff --check.
- Review the final diff file by file.

STOP CONDITIONS

Stop and report if:

- Two authoritative decisions still conflict after applying the hierarchy.
- A proposed change would alter a real client artefact.
- A task would require network access, credentials, a purchase, installation,
  or any external write.
- Existing user changes overlap the same lines and intent is unclear.

FINAL RESPONSE

Return:

1. Outcome: PASS, REVIEW, or BLOCK.
2. Files changed.
3. Contradictions removed.
4. Validation commands and results.
5. Remaining uncertainties.
6. The single next action, which should be preparation of the disposable
   staging evidence pack. Do not run the write test without separate approval.
```

## Source strategy and limitations

Repository findings are based on the active files and commit `95b2639`. Current vendor claims were checked against:

- Figma MCP Server, Tools and prompts: <https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/>
- Novamira, Security and Best Practices: <https://novamira.ai/docs/security/>

The review did not run Novamira, inspect an installed ability registry, obtain a Breakdance settings export, or perform a WordPress write. Therefore it cannot confirm the write path, exact installed machine identifiers, native editability, or rollback completeness.

## Final verdict

**BLOCK.**

The repository is materially closer to execution readiness, but the active instructions still disagree on decisions that affect content overwrites, purchasing, safety assumptions, and the first technical test.

Confidence is high in the repository findings because the contradictions and invalid paths are directly observable. Confidence in Target A viability remains low until the disposable-staging write test produces evidence.

The safest next action is the Stage 0 repository consistency patch using the prompt above. After that patch passes, obtain a real Breakdance export and request separate approval for the disposable-staging write test.
