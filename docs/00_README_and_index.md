# AI Web Design System v0.1

Status: DRAFT v0.1 | Date: 14 July 2026 | Owners: Dev Lead and Design Lead

An internal system for taking a website from brief to launch using AI (the Claude Design product, Claude Code, the Figma MCP server, and Novamira) across two build targets: WordPress with Breakdance, and Astro with Payload CMS. The design and token front-half is shared; only the back-half build differs. This is the pilot version. It is deliberately minimal, honest about what is unproven, and built to be revised into v0.2 after a real pilot.

Note on "Claude Design": it is now a specific Anthropic product (Anthropic Labs, April 2026), distinct from Claude Code plus the Figma MCP. Where documents say "Claude Design" they should name which surface they mean; see 01 (A.12 and B) and 03.

## Read this first

1. The technical claims in the original research (docs/research/web-design) were verified on 14 July 2026. Some were wrong or overstated. This folder uses the corrected facts. If you find a conflict, 01_current_state_findings_and_claims_to_verify.md wins over the source research.
2. **The single most important rules**: Novamira runs on staging only; the AI never touches production; every gate needs a named human approver; back up before every agent write; never blind-import Breakdance settings.
3. If you are standing the system up for the first time, go straight to 19_implementation_runbook.md and work through it, keeping 15_claude_code_setup_and_mcp_config.md open beside you.

## What was built and why

The user asked for a full investigation and a complete, versioned system split into usable documents. We verified the stack against live sources first (Figma MCP, Novamira, Breakdance, WordPress 7.0, Claude Code), corrected the claims, then wrote the system on top of the corrected facts. The headline corrections and the decisive Novamira call are in 01 and 18.

## Document index

### Investigation and architecture

| File | Purpose |
|------|---------|
| 01_current_state_findings_and_claims_to_verify.md | Confirmed facts, corrections, unconfirmed claims, risks, verification actions |
| 02_recommended_minimum_architecture.md | The smallest sound stack, with a text diagram and exclusions |

### Workflows and handoff

| File | Purpose |
|------|---------|
| 03_designer_workflow.md | Exact designer workflow, brief to dev-ready Figma |
| 04_developer_workflow.md | Exact developer workflow, approved design to launch |
| 07_figma_mcp_setup_and_handoff_contract.md | Figma MCP setup plus the design-to-dev handoff contract |
| 08_breakdance_and_wordpress_plugin_stack.md | Build target A: how the agent safely targets Breakdance; the plugin stack |
| 08b_astro_payload_build_target.md | Build target B: the Astro plus Payload stack, build steps, and safe agent methods |

### Prompts, Claude Code, automation

| File | Purpose |
|------|---------|
| 05_claude_design_prompt_sequence.md | The order prompts are used across a project, and why |
| 06_claude_code_project_structure.md | Per-project .claude structure and CLAUDE.md skeleton |
| 09_skills_agents_commands_hooks.md | The skills, subagents, commands and hooks to define |
| 14_prompt_library.md | The actual copy-pasteable prompts |
| 15_claude_code_setup_and_mcp_config.md | Exact setup and concrete MCP configuration |

### The system, governance, decisions

| File | Purpose |
|------|---------|
| 12_ai_web_design_system_v0.1.md | The governing spec: scope, gates, roles, source of truth, security, rollback |
| 13_source_of_truth_model.md | Which system owns each class of information, and when authority moves |
| 16_plugin_recommendation_matrix.md | Recommended WordPress plugin stack (Breakdance target) |
| 17_server_requirements.md | Staging and production server requirements (update for the Payload Node plus database backend) |
| 18_novamira_recommendation.md | The decisive Novamira call, plus alternatives, constrained (Breakdance target only) |
| 19_implementation_runbook.md | Step-by-step build runbook for Target A (WordPress plus Breakdance) |
| 19b_astro_payload_implementation_runbook.md | Step-by-step build runbook for Target B (Astro plus Payload) |
| 22_design_system_reuse_model.md | One shared agency base kit plus a per-client theme; the three-tier token model for both targets |
| 23_best_practices.md | Web design, web dev, and AI-for-web-dev best practices, for both targets |
| 24_open_questions_answered.md | Answers and decisions: Novamira vs alternatives, Bricks vs Breakdance, the WP MCPs, webMCP, the SEO stack, LiteSpeed, the agent/skill/hook triage |
| 25_end_to_end_lifecycle.md | The team-facing life cycle: PM, Design, Develop, UAT, with gates and where changes happen |
| 26_vendor_capability_matrix.md | **The single home for volatile vendor facts**, dated and sourced. Never restate a vendor limit in another document; link here instead |

### Pilot and measurement

| File | Purpose |
|------|---------|
| 10_pilot_implementation_plan.md | The phased pilot plan on a low-risk site |
| 11_test_and_measurement_scorecard.md | Metrics, targets, and pass or fail bands |
| 20_baseline_measurement.md | Capturing the pre-AI baseline to compare against |
| 21_decisions_and_failures_log.md | Rich decision capture during the pilot, feeds v0.2 |

### Pilot artefacts (templates)

In pilot-artefacts/. The only artefacts the pilot needs. Copy into a live project as required.

| File | Purpose |
|------|---------|
| 01_project_intake_template.md | Project intake |
| 02_design_system_checklist.md | Design-system readiness gate |
| 03_figma_component_and_naming_standard.md | Figma variable and component naming |
| 04_design_to_development_handover_contract.md | Signed handoff contract |
| 05_ai_context_pack.md | Per-project context pack for Claude Code |
| 06_approved_prompts_and_agent_instructions.md | Register of approved prompts and agents |
| 07_permissions_matrix.md | Who can do what across the tools |
| 08_qa_and_accessibility_checklist.md | Pre-launch QA and WCAG 2.2 AA |
| 09_issue_and_exception_log.md | Lightweight running issue log |
| 10_time_and_rework_tracking.md | Baseline vs AI-assisted effort tracking |
| 11_pilot_review_template.md | End-of-pilot review |

## Suggested reading order

1. 01 (findings) and 02 (architecture) to understand what is real, what we are building, and the two build targets.
2. 12 (the system) and 13 (source of truth) for the rules.
3. 22 (design-system reuse) for the one-kit, per-client-theme model that both targets share.
4. 18 (Novamira) for the key adoption decision on the Breakdance target.
5. 15 to set up Claude Code, then the runbook for your target: 19 (WordPress plus Breakdance) or 19b (Astro plus Payload).
6. 03, 04, 05, 14 to run a build, then 08 (Breakdance) or 08b (Astro plus Payload) for the chosen target, with 23 (best practices) alongside.
7. 10, 20, 11, 21 and the pilot artefacts to run and measure the pilot.

## House style

British and Australian English. No em dashes, en dashes, or double hyphens in prose (CLI flags and markdown table rules in code are fine). No emojis. These are internal documents, so tool names, file paths, and code are used freely, unlike client-facing deliverables.

## Provenance

Source research: docs/research/web-design (AI Web Design System.md, AI Website design.md). Verified against Figma, Anthropic and Claude Code, Novamira, Breakdance, WordPress core, and InstaWP sources on 14 July 2026. Where the source research and the verification disagree, the verification prevails and is recorded in 01.
