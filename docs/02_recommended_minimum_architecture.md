# 02. Recommended Minimum Architecture

Status: v0.1 | Date: 14 July 2026 | Owner: Dev Lead

This document defines the smallest stack that delivers the intended value (faster, more consistent design-to-build) without over-committing to early-stage tooling. It deliberately favours the mature parts of the pipeline and keeps the risky parts (autonomous writes into Breakdance and Figma) behind human review.

## Design principle

Adopt AI where it is strong and proven, keep humans in control where the tooling is young. In practice that means: use AI heavily for research, design ideation, token extraction, and code scaffolding; use it cautiously and under review for writing into Breakdance; and do not use it for autonomous production changes at all.

## The minimum stack

| Layer | Choice | Why this and not more |
|-------|--------|-----------------------|
| Orchestration | Claude Code (local, per project) | Central command surface; one project per client site |
| Design | Figma with the remote Figma MCP server, optionally the Claude Design product for generative concepts | Remote server is the recommended path; needs a Professional Dev seat per operator |
| Design-to-code read | Figma MCP read tools plus Code Connect | The mature, reliable half of the pipeline |
| Build (target A) | Breakdance Pro on WordPress | Visual builder, Client Mode, WP-CLI, Global Settings import/export |
| Build (target B) | Astro plus Payload CMS | Code-owned front-end, tokens in code, headless content; see 08b |
| WordPress bridge (target A only) | Novamira (staging only) | The only WP MCP server with deep builder reach; treat as early-stage |
| Environments | Separate staging per client, HTTPS | Isolation, and Application Password support for the WordPress target |

Everything else (InstaWP, third-party Figma MCPs, Breakdance AI add-on, the WordPress native AI Client) is optional and evaluated separately, not part of the minimum.

## Two build targets, one front-half

The agency supports two build targets. The design and token front-half of the pipeline is shared and identical for both. Only the back-half (how the design becomes a running site) differs.

```
Shared front-half (build-target-neutral)
  Brief -> research -> design system -> Figma high-fidelity -> token extraction
                                                                     |
                        +--------------------------------------------+
                        |                                            |
                        v                                            v
   Target A: WordPress + Breakdance             Target B: Astro + Payload CMS
   tokens -> Breakdance Global Settings         tokens -> Tailwind config / CSS vars
   layout -> Breakdance elements (staging)      layout -> Astro components (code)
   content -> Client Mode                       content -> Payload collections/blocks
   bridge  -> Novamira (staging only)           bridge  -> none (code + Payload admin API)
```

Choose the target per client at intake, not mid-build. Rough guidance:

- **Breakdance** when the client needs to self-edit layout visually on a single low-ops host, and no-code turnaround matters more than raw performance.
- **Astro plus Payload** when performance and AI-crawler fidelity lead, the developer owns the front-end in code, and the client mainly edits structured content rather than rearranging layout. Note the trade: Payload adds a required always-on Node service plus a database, so it is a heavier ops surface than a single WordPress host, and Payload Cloud is no longer a safe managed option (self-host the Payload backend).

The workflows (03 designer, 04 developer), the source-of-truth model (13), the prompt sequence stages 1 to 4 (05), the skills and hooks (09), the best practices (23), and the design-system reuse model (22) apply to both targets. The target-specific detail lives in 08 (Breakdance) and 08b (Astro plus Payload), and each target has its own step-by-step runbook: 19 (Breakdance) and 19b (Astro plus Payload).

## Architecture diagram (text)

```
Designer                      Developer / Dev Lead
   |                                |
   v                                v
Figma (design SOT)          Claude Code (local, per client project)
   |   ^                           |    |    |
   |   | use_figma (beta,          |    |    |
   |   | human-gated, optional)    |    |    |
   |   |                           |    |    |
   +---+---- Figma MCP (remote) ---+    |    |
        get_design_context              |    |
        get_variable_defs               |    |
        get_screenshot                  |    |
        get_code_connect_map            |    |
                                        |    |
                        Novamira MCP ---+    |
                        (staging only)       |
                        execute-php,         |
                        read/write file,     |
                        WP-CLI               |
                                             |
                                             v
                              WordPress staging (HTTPS, PHP 8.3)
                                     + Breakdance Pro
                              content in _breakdance_data postmeta
                                             |
                              human review + QA + backup
                                             |
                                             v
                              WordPress production (no Novamira)
                                    Breakdance + Client Mode
```

Key point: production never carries Novamira. The AI pipeline lives entirely on staging. Promotion to production is a human, backed-up deployment step.

## Data and control flow

1. **Design flows Figma to Claude Code (read tools)**. This is the primary, high-trust direction.
2. Tokens flow Figma to Breakdance global settings via a differential merge, never a blind import.
3. **Layout is assembled on staging under review**. There is no supported layout write API, so this is either constrained JSON-patch on known-good blocks or builder-UI automation, both human-reviewed.
4. Code-to-canvas back into Figma (use_figma) is optional, beta, and only ever on a duplicate file.
5. **Staging to production is a manual, backed-up promotion**. Never point the agent at production.

## What we deliberately exclude from the minimum

- **Autonomous production changes**. The agent never touches a live client site.
- **Writing raw PHP layout files into WordPress**. Breakdance ignores them and it is a security risk.
- Blind `wp breakdance import_settings`. It overwrites the entire config. Differential merge only.
- Relying on `use_figma` for any production Figma edit. Beta, capped, duplicate-file only.
- Depending on the InstaMCP `execute_php` tool or Novamira on production.

## Seat and licence minimum per operator

- **Figma**: one Professional Dev seat (roughly US$12 per month) per person who runs the MCP. The free tier is too rate-limited to be usable.
- **Breakdance Pro**: agency licence covering staging and production sites.
- **Novamira Pro**: EUR 129 per year (Agency, 1,000 sites). Bought for the Breakdance write test, not deferred. The free-first strategy is SUPERSEDED (17 July 2026). It was written while Bricks was still a live option, on the reasoning that Bricks' own MCP might remove the need for Novamira. Once Breakdance was chosen, the Pro Breakdance specialization became the specific thing that must be tested, and free core cannot test it. See 24.
- **Claude Code**: standard subscription per operator.

## When to expand beyond the minimum

Only after the pilot (see 10 and 11) proves the write path is reliable enough. Candidate expansions, in order: the WordPress native AI Client for content generation; InstaWP for faster staging provisioning; a shared component library. (Novamira Pro is no longer an expansion; it is bought up front for the write test, see 24.)
