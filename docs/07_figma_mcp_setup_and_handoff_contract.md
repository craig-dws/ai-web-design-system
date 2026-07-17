# AI Web Design System v0.1: Figma MCP Setup and Handoff Contract

Internal reference. Part A explains how to set up the Figma MCP for Claude Code. Part B is the formal Designer-to-Developer Handoff Contract that every developer-ready Figma file must satisfy.

Companion documents:

- `03_designer_workflow.md` (designer workflow)
- `04_developer_workflow.md` (developer workflow)
- `08_breakdance_and_wordpress_plugin_stack.md` (build platform)

## Part A: Figma MCP setup for Claude Code

### Installation

1. **Install the plugin**: `claude plugin install figma@claude-plugins-official`
2. Restart Claude Code so the plugin loads.
3. Run `/plugin`.
4. Open the Installed tab and select figma.
5. Complete the OAuth flow in the browser and allow access when prompted.
6. Re-run `/plugin` and confirm figma shows as connected.

If it does not show as connected, restart Claude Code and repeat the OAuth step.

### Remote server versus desktop server

There are two ways to connect. Choose based on the operator's Figma seat and needs.

| Aspect | Remote server (recommended) | Desktop server |
|--------|-----------------------------|----------------|
| Endpoint | `https://mcp.figma.com/mcp` | Local, via the Figma desktop app |
| Desktop app required | No | Yes |
| Seat required | Works within plan limits | Dev or Full seat on a paid plan |
| Seats that cannot use it | Not applicable | View and Collab seats cannot use it |
| Write and canvas tools | Included | Not included |
| Selection model | Can work by URL or selection | Selection-based (reads current selection) |

Use the remote server by default. It needs no desktop app and it is the only option that includes the write and canvas tools. Use the desktop server only where the workflow specifically needs the local, selection-based behaviour and the operator holds a Dev or Full seat on a paid plan.

### The real tools

Read and generate tools:

| Tool | Purpose |
|------|---------|
| `get_design_context` | Structure and applied tokens for a selected frame. Can exceed token limits on large pages, so scope it to a selection, never a whole file. |
| `get_variable_defs` | Variable and token definitions (colour, type, spacing, radius, effects). |
| `get_screenshot` | Visual reference image of a selected frame. |
| `get_code_connect_map` | Mapping between Figma components and connected code components. |
| `get_metadata` | Lightweight metadata about the selection or file. |
| `download_assets` | Download exported assets. |

Remote-only write and canvas tools:

| Tool | Purpose and constraints |
|------|-------------------------|
| `use_figma` | The real write-back tool. Works with frames, components, variables, styles, text and images. Still beta by Figma's labelling, so test on a duplicate file first. For current limits see 26, the capability matrix; do not restate them here. |
| `generate_figma_design` | Code to canvas. Turns rendered UI into flat Figma frames. |
| `create_new_file` | Creates a new Figma file. |

Note: `create_design_system_rules` is a bundled SKILL, not one of the read or write tools above.

### Accuracy and licensing notes

1. **Code Connect is the biggest accuracy lever, but only on Target B.** Mapping Figma components to real code components (via `get_code_connect_map`) is what makes generated output reference real implementations instead of inventing them. **It requires code components to map to.**

   **It does not apply to Target A.** Breakdance elements are not code components; they are builder nodes in a serialized JSON tree. There is nothing for Code Connect to bind to unless we author custom code elements in Element Studio, which we do not do by default. Earlier drafts of this document listed Code Connect as a Target A accuracy lever. That was wrong and it is corrected here.

   **What replaces it on Target A:** a reviewed, version-controlled **mapping table** from Figma component names to Breakdance element structures, maintained by hand and treated as part of the handoff contract. It is less elegant and it is the honest option. Do not claim Code Connect parity between the targets.

2. A Professional-plan Dev seat (around US$12 per month) per operator is the realistic minimum. Free and Starter plans are heavily rate-limited and will slow or block real work.

## Part B: Designer-to-Developer Handoff Contract

A Figma file is not developer-ready until it satisfies every item below. The developer confirms this contract at Step 1 of the developer workflow before building.

### What a developer-ready file must contain

1. All page frames at desktop, tablet, and mobile widths.
2. A status label on every frame (for example Ready for Dev, In Progress, Needs Review).
3. Components and variants with clear, consistent names.
4. Variables and tokens for colour, typography, spacing, and effects.
5. Spacing rules and breakpoints stated with exact pixel values.
6. Documented responsive behaviour per major section (column count, stacking order, font scaling, hidden elements).
7. **Interaction states**: default, hover, focus, active, and disabled.
8. **Form states**: empty, filled, focused, error, and success, with example messaging.
9. Content-length assumptions (minimum and maximum text lengths a layout must tolerate).
10. Image behaviour (crop, aspect ratio, fit, and fallback).
11. Accessibility notes (contrast results, accessible names and labels, keyboard and focus intent, reduced-motion behaviour).
12. Reusable versus page-specific flags on components.
13. Animation notes for any motion.
14. Exported assets, correctly sized and named.
15. An open-questions log.
16. Client approval status recorded.

### Developer acceptance criteria

The developer accepts the file for build only when:

- Every item in the contract above is present and legible.
- Every page frame is labelled Ready for Dev at all three breakpoints.
- Tokens are complete and consistently named, so they map one to one to Breakdance Global Settings.
- Responsive rules are unambiguous at each breakpoint.
- All interaction and form states are specified.
- Accessibility notes are sufficient to build to WCAG 2.2 AA.
- The client approval status shows the design is signed off.

If any criterion fails, the file is returned to the designer with the gaps listed. The developer does not start building against an incomplete file.

### Change management

1. **Post-handoff design changes are a new, signed iteration**. They do not enter the build as informal edits. The designer versions the file, records what changed, and the change is signed off before the developer applies it.
2. Small developer CSS fixes must reflect back into Figma, or be recorded in the deviation register, so the design file and the built site never drift apart.
3. The deviation register is the single record of every accepted difference between design and build. It is reviewed at the built-site review step.
