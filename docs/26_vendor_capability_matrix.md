# 26. Vendor Capability Matrix

Status: v0.1 | Created: 17 July 2026 | Owner: Dev Lead

**This is the single place volatile vendor facts live. Do not restate a limit, tool name, or capability from this table anywhere else in the docs. Link here instead.**

## Why this exists

We asserted, across four documents, that Figma's `use_figma` had a 20kB per-call cap and no image support. Both had ceased to be true, and nobody noticed, because the claim was copied into prose in four places and none of them carried a date or a source. One of those claims was then used to justify a workflow decision.

Beta tooling changes weekly. Prose does not. The fix is not to be more careful; it is to stop duplicating volatile facts and to date the ones we keep.

**Rules:**

1. **A volatile fact lives here once**, with a source URL, a checked date, and a confidence level.
2. **Other documents link here.** They do not restate the number.
3. **Re-check before you rely on it.** If the checked date is more than about a month old and the decision matters, verify it and update the row.
4. **If a row is wrong, fix it here**, and the whole system corrects at once.

Confidence: **Confirmed** (checked against the vendor's own current docs), **Reported** (third-party sources agree, vendor silent), **Unverified** (asserted somewhere, not confirmed), **Contradicted** (we found it to be false).

## Figma MCP

| Capability | Status | Checked | Confidence |
|------------|--------|---------|------------|
| `use_figma` writes to the canvas | Works with pages, frames, components, variants, variables, styles, text, **and images** | 17 Jul 2026 | Confirmed |
| `use_figma` 20kB per-call cap | **No such limit in current docs.** We asserted this and it was wrong | 17 Jul 2026 | Contradicted |
| `use_figma` image support | **Supported.** Our earlier "no image support" claim was wrong | 17 Jul 2026 | Contradicted |
| `upload_assets` | Real. Uploads PNG, JPG, GIF, WebP into a file. Max 10MB per asset. As fills on nodes or as new frames | 17 Jul 2026 | Confirmed |
| `generate_figma_design` | Code-to-canvas: turns rendered UI into new Figma frames. **Not** the general write-back tool | 14 Jul 2026 | Confirmed |
| Read tools | `get_design_context`, `get_variable_defs`, `get_screenshot`, `get_code_connect_map`, `get_metadata`, `download_assets` | 14 Jul 2026 | Confirmed |
| `get_design_context` token overflow | Can exceed practical token limits on large pages. Scope to frames | 14 Jul 2026 | Reported |
| Seat requirement | Remote server usable on paid plans; a Professional Dev seat (about US$12/mo) per operator is the realistic minimum. Free tier heavily rate-limited | 14 Jul 2026 | Confirmed |

Source: https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/

**Standing caution:** `use_figma` is still beta by Figma's own labelling. Test on a duplicate file. That caution is about maturity, not about a specific numeric limit.

## Novamira

| Capability | Status | Checked | Confidence |
|------------|--------|---------|------------|
| Core abilities | **Eight confirmed**: Execute PHP, Read File, Write File, Edit File, Delete File, Disable File, Enable File, List Directory | 14 Jul 2026 | Confirmed |
| "Create Upload Link" as a ninth ability | On marketing pages, not confirmed as a distinct free ability | 14 Jul 2026 | Unverified |
| 30 second PHP execution limit | **Widely cited, not in the vendor's docs or changelog. Do not rely on it** | 14 Jul 2026 | Unverified |
| Domain locking | Abilities go dormant after a clone until a human re-confirms | 14 Jul 2026 | Confirmed |
| URL safe-mode kill switch | Real. Know where it is before starting | 14 Jul 2026 | Confirmed |
| Sandbox is a security boundary | **No.** The vendor states plainly it is not | 14 Jul 2026 | Confirmed |
| Dev and staging only | Vendor policy, **not enforced by the plugin** | 14 Jul 2026 | Confirmed |
| Pro pricing | From EUR 49/yr Personal (3 sites), EUR 129/yr Agency (1,000 sites) | 14 Jul 2026 | Confirmed |

Source: https://novamira.ai/docs/security/

## Breakdance

| Capability | Status | Checked | Confidence |
|------------|--------|---------|------------|
| Sanctioned programmatic layout path (2.x) | **Did not exist** in 2.x. No REST API; third parties reverse-engineer `_breakdance_data` | 14 Jul 2026 | Confirmed |
| **Native MCP (3.0)** | **Breakdance 3.0 ships a first-party MCP** (Settings then Agents & MCP). This is the big change: the write path is now vendor-owned, not reverse-engineered | 18 Jul 2026 | Confirmed |
| 3.0 MCP maturity | **Beta 1, days old. Its own docs say "coming soon".** No GA date, no independent testing, conversion fidelity unverified | 18 Jul 2026 | Confirmed (beta), Unverified (fidelity) |
| 3.0 MCP write scope | Creates pages, headers, footers, templates, forms, loops, Global Blocks, interactions. Mechanism: agent writes HTML/CSS, Breakdance converts to native elements (Container, Text, Image, Text Link, SVG Icon) | 18 Jul 2026 | Confirmed (as vendor claim) |
| 3.0 MCP output editable in builder | Claimed yes. Not independently verified | 18 Jul 2026 | Reported |
| 3.0 MCP auth | Application Password, **admin-equivalent access**. One-click "Agent Connector" install | 18 Jul 2026 | Confirmed |
| 3.0 MCP requirements and licensing | **Unknown.** PHP/WP version unstated. Pro-vs-free "not finalised" per Breakdance. Verify before relying on it | 18 Jul 2026 | Unconfirmed |
| 3.0 MCP with Claude Code | Names "Claude, Codex, Cursor". Standard MCP server, so Claude Code should work, but "Claude Code" not named literally | 18 Jul 2026 | Partially |
| REST API for creating layouts (2.x) | **Does not exist.** Superseded by the 3.0 native MCP above for anyone on 3.0 | 14 Jul 2026 | Confirmed |
| Layout storage | Structured JSON in the `_breakdance_data` postmeta | 14 Jul 2026 | Confirmed |
| WP-CLI | `status`, `clear_cache`, `export_settings`, `import_settings`, `replace_url`, `total_reset` | 14 Jul 2026 | Confirmed |
| `export_settings` / `import_settings` | **Pro (self-hosted) mode only** | 14 Jul 2026 | Confirmed |
| Breakdance AI | Separate paid add-on. Copywriting only. Cannot build layouts | 14 Jul 2026 | Confirmed |
| Token mapping depth | Colour and typography map at the semantic tier. Spacing partial. **No component-tier equivalent.** See 22 | 17 Jul 2026 | Confirmed |
| PHP | Core needs 7.4+, 8.3 recommended. 2.8 (25 Jun 2026) adds 8.4 support | 14 Jul 2026 | Confirmed |

## Respira

| Capability | Status | Checked | Confidence |
|------------|--------|---------|------------|
| Writes native `_breakdance_data` | Yes, with schema validation, `_nextNodeId` handling, snapshots | 17 Jul 2026 | Confirmed |
| Depth of Breakdance support | **Vendor's own docs contradict each other.** Marketing claims 84 elements; the technical reference advises against tree rewrites | 17 Jul 2026 | Contradicted |
| Broke on Breakdance 2.8.0 | Yes. All writes failed 25 Jun 2026, patched in 7.5.3 three days later | 17 Jul 2026 | Confirmed |
| Vendor sanction | **None.** Explicitly not affiliated with or endorsed by Soflyy | 17 Jul 2026 | Confirmed |
| Independent reviews | None found | 17 Jul 2026 | Confirmed |

## Claude

| Capability | Status | Checked | Confidence |
|------------|--------|---------|------------|
| Claude Cowork | Real. Agentic Claude, no terminal. The designer's surface. Pro and above | 15 Jul 2026 | Confirmed |
| Claude Design | Research preview. Rate-limited (roughly 3 to 4 prompts a week on Pro) | 15 Jul 2026 | Confirmed |
| Claude Design exports to Figma | **No.** Exports Canva, PDF, PPTX, HTML | 15 Jul 2026 | Confirmed |
| Claude Design accepts a design system | Yes. Via Figma connection, or `/design-sync` over a code package with React components | 17 Jul 2026 | Confirmed |
| Anthropic Design and PM plugins | Real, official, free. `anthropics/knowledge-work-plugins`. Work in Cowork **and** Claude Code | 15 Jul 2026 | Confirmed |
| Figma skills | Real, published by Figma. Need a paid Figma seat | 15 Jul 2026 | Confirmed |

## WordPress

| Capability | Status | Checked | Confidence |
|------------|--------|---------|------------|
| Current stable | 7.0 "Armstrong", 20 May 2026 | 14 Jul 2026 | Confirmed |
| AI Client in core | Yes. `wp_ai_client_prompt()`, Settings then Connectors. **Not needed by us**, see 24 | 14 Jul 2026 | Confirmed |
| mcp-adapter | The official Abilities-to-MCP bridge. Pairs with Automattic's `mcp-wordpress-remote` proxy | 15 Jul 2026 | Confirmed |
| Application Passwords | Require HTTPS, or `define('WP_ENVIRONMENT_TYPE','local')` exactly | 14 Jul 2026 | Confirmed |
| Rank Math MCP | Ships an official MCP server built on mcp-adapter | 15 Jul 2026 | Confirmed |
| `wp post meta update` fires `save_post` | **No.** LiteSpeed will not auto-purge. Purge explicitly | 15 Jul 2026 | Confirmed |
