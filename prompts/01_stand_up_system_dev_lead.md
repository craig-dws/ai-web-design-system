# Prompt 1: Stand up the system

- **Who:** Dev Lead (a PM standing the system up is fine too).
- **Tool:** Claude Code, in this repository.
- **How often:** Once, ever, for the whole repository. This is not a per-person
  step. It was run on 19 July 2026 and the result is committed, so do not run it
  again unless you are deliberately rebuilding the system.

This prompt does not build a website. It builds the system that builds websites.
Expect it to stop and ask you for purchases, OAuth clicks, licence keys, and
server actions. That is the design.

Have these to hand, because it will stop and ask:
- A Figma account with a Professional Dev seat.
- Claude Team plan admin access (for org-wide plugin provisioning).
- Your LiteSpeed staging server details and a Breakdance Pro licence key.
- Novamira Pro (bought only when you reach the Breakdance write test, not before).

```
[ROLE: Senior DevOps Engineer standing up an internal AI web design system]

OBJECTIVE: Build out this repository into a working system per its own specification.
Do what you can automatically. Where a step needs a human (a purchase, an OAuth click,
a licence key, a server action), STOP, tell me exactly what to do, and wait for me.

Do NOT build a client website. This repo is the system, not a site.

READ FIRST, in this order, and treat them as the specification:
- CLAUDE.md                                  (the constitution: constraints)
- docs/00_README_and_index.md                (index and reading order)
- docs/01_current_state_findings_and_claims_to_verify.md   (what is verified vs unproven)
- docs/02_recommended_minimum_architecture.md
- docs/24_open_questions_answered.md         (the live decisions; Section G is the roster)
- docs/25_end_to_end_lifecycle.md            (roles, stages, gates)
- docs/09_skills_agents_commands_hooks.md    (canonical config forms)
- docs/06_claude_code_project_structure.md
- docs/22_design_system_reuse_model.md
- docs/19_implementation_runbook.md          (Target A: WordPress plus Breakdance)

KEY DECISIONS ALREADY MADE. Do not relitigate them:
- Target A is WordPress plus Breakdance. Bricks was considered and declined.
- Breakdance has NO sanctioned programmatic layout path. Any layout write is
  reverse-engineering via a third party. Trial Novamira Pro before Respira. Keep the
  layout-write step swappable: skills call a CAPABILITY, never a vendor tool name.
- The designer never uses Claude Code. She uses Claude Cowork plus Figma.
- Content is a pluggable input from any source (client, ZilvaEdge, or placeholder). It never blocks a build. Design against real content where you have it; placeholder is fine otherwise.
- Adopt Anthropic's plugins rather than rebuilding them.

DIRECTIVES:

1. ENVIRONMENT. Report OS, node -v, npm -v, git --version, python --version, and whether
   Git Bash or WSL is present (hook scripts are bash). Flag anything missing. Do not install
   anything yet.

2. TRIAGE THE PORTED ASSETS. `_ported-for-review/` holds assets rescued from a retired
   experiment (Starter-Websites). They are NOT trusted: most date from November 2025, predate
   this system, and were written for an Astro-only monorepo. Read README.md's table first.
   For EACH item, decide and tell me: PROMOTE (with the changes needed), REWRITE, or DELETE.
   My guidance:
   - `agents/design/creative/` and `skills/design/` (metaphor grounding, differentiation
     verification, anti-ai-design-checklist): highest value, target-neutral, already exercised.
     Promote, but strip any Astro/Tailwind assumptions and align naming to this system.
   - `agents/website/` auditors (SEO, accessibility, AI-readiness, performance, security):
     they inspect rendered output, so they work against a Breakdance staging URL. Promote,
     retarget from "Astro build" to "staging URL", and check for overlap with ZilvaEdge's
     equivalents before duplicating.
   - `skills/figma/` plus `agents/figma-build-orchestrator.md`: PORT THE IDEA, REWRITE THE
     IMPLEMENTATION. The 2-phase discipline (extract tokens once, lock them, never re-extract,
     gate before build) is the best idea in there and it fixes our weakest link. Its emitter
     writes tailwind.config.cjs, which is meaningless to Breakdance Global Settings. Rewrite the
     emitter per target. Read `_ported-for-review/reference/Squad_Analysis_Report_Figma_Fidelity_Diagnosis.md`
     first; it explains why the discipline exists (30 to 40% accumulated fidelity loss).
   - `skills/project-constitution-management/`: promote as-is, it is target-neutral.
   - `packages/seo-utils/`: keep, but it needs a target wrapper. Do not wire it in yet.
   - Anything Astro-monorepo-specific: DELETE.
   Show me the triage table and WAIT for my approval before promoting or deleting anything.

3. BUILD `.claude/`. After I approve the triage, create the structure per docs/06 and the
   canonical minimal forms in docs/09. Never invent frontmatter fields.
   Skills to author (docs/24 Section G):
     site-brief, breakdance-limits, web-design, stage-gate, token-sync
   Subagents to author:
     builder-builder (capability-based, vendor-agnostic), figma-token-extractor
   Plus whatever you promoted in step 2.
   Where a skill needs knowledge we have not written, create it with an explicit TODO block.
   Do not invent facts. Do not guess at Breakdance internals; docs/08 and docs/24 are the source.

4. HOOKS. Write these into settings.json and .claude/hooks/, then chmod +x:
     block-protected-paths   (PreToolUse: deny writes to wp-config.php, wp-settings.php, production)
     scan-dangerous-php      (PreToolUse: block eval/exec/shell_exec/system/passthru)
     litespeed-purge         (PostToolUse: after wp post meta update or any DB write, run
                              wp litespeed-purge post_id <id>)
     breakdance-cache-clear  (PostToolUse: wp breakdance clear_cache after DB writes)
     lint-changed            (PostToolUse: lint changed PHP)
   Explain the litespeed-purge hook back to me and why it exists. If you cannot explain why it
   is needed, re-read docs/24 Section E before continuing.

5. MCP CONFIG. Write .mcp.json with figma (remote) and chrome-devtools. Secrets as ${ENV}
   references only. Do NOT add a WordPress bridge yet; that waits for the pilot test in step 8.

6. PERMISSIONS. settings.json: plan mode default. Deny Write(wp-config.php),
   Write(wp-settings.php), Bash(rm -rf *), Bash(sudo *), and anything matching
   import_settings or total_reset. Allow the MCP tools we need and safe Bash.

7. MANUAL STEPS. STOP and give me a numbered list of what only I can do. Expect at least:
     claude plugin install figma@claude-plugins-official   (then /plugin, OAuth)
     claude plugin marketplace add anthropics/knowledge-work-plugins
     claude plugin install design@knowledge-work-plugins
     claude plugin install product-management@knowledge-work-plugins
     Figma Professional Dev seat; Claude Team plan org-wide provisioning
     Breakdance Pro licence; staging server and Application Password
   Then WAIT.

8. VERIFY. After I confirm, run /mcp and report which servers connect. Run ONE read-only test
   per server. Do not perform any write until every read-only test passes.

9. REPORT. Finish with: what exists, what is pending, what you deleted, and the single next
   action. Be honest about anything you could not do or were unsure about.

CONSTRAINTS:
- Staging only. Never production. Never an agent write to a live client site.
- Do not install anything not named in the docs without asking.
- British and Australian English. No em dashes, no en dashes. No emojis.
- If the docs and your training knowledge disagree, the docs win. Say so and continue.
- If something in the docs looks wrong, say so. Do not silently work around it.
```
