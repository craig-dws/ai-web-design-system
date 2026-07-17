# AI Web Design System v0.1: Developer Workflow

Internal reference for agency developers. This document describes the exact, numbered workflow from reviewing approved designs through to launch and handover, building in Breakdance on WordPress.

Companion documents:

- `03_designer_workflow.md` (what happens before handoff)
- `07_figma_mcp_setup_and_handoff_contract.md` (MCP setup and the formal handoff contract)
- `08_breakdance_and_wordpress_plugin_stack.md` (platform, plugin stack, and safe automation)

## Principle

The developer reproduces the approved design faithfully, keeps the site editable for the client, and never trades long-term maintainability for a short-term shortcut. AI assists with extraction and drafting. A human reviews and owns every write to the site or its database.

## The workflow

### Step 1: Review the approved Figma file

1. Confirm the file satisfies the Designer-to-Developer Handoff Contract (see the companion document).
2. Confirm every page frame is labelled Ready for Dev and that desktop, tablet, and mobile frames exist.
3. Read the responsive rules, interaction states, content-length assumptions, and open-questions log.
4. **Raise anything unclear with the designer before building**. Do not guess.

### Step 2: Extract tokens and context via Figma MCP

Use the Figma MCP tools to read the design, not to eyeball values.

1. Select the specific frame or component in Figma before each call. Scope every call to the selection, not the whole file. `get_design_context` can exceed token limits on large pages, so never call it against an entire file.
2. `get_variable_defs` to pull the token definitions (colour, type, spacing, radius, effects).
3. `get_design_context` on a selected frame to understand structure and applied tokens.
4. `get_screenshot` on a selected frame for a visual reference alongside the extracted data.
5. **Record the token set**. This becomes the source for Breakdance Global Settings.

Human must review: the extracted token set for completeness and sane naming before it is used.

### Step 3: Map design components to Breakdance elements

1. **Map each Figma component to its Breakdance equivalent**: sections to Section, containers to Div, column groups to Columns, repeating content to a Post Loop, and shared regions to Global Blocks.
2. Record the mapping so the intent is traceable.
3. Reserve Element Studio for genuinely custom elements that no native element can produce. Do not build with Element Studio by default.

### Step 4: Set Breakdance Global Settings from tokens

1. **Enter the extracted tokens into Breakdance Global Settings**: colours, typography, spacing, and effects.
2. Set these through the Breakdance UI, or via `wp breakdance import_settings` if you are on Breakdance Pro (settings import and export are Pro-only).
3. **See the hard rule below before running any settings import**. Never import a full config blindly.

### Step 5: Build templates and pages with native elements

1. **Build shared templates first**: header, footer, and any archive or single templates.
2. **Build pages using native elements**: Section, Div, Columns, Post Loop Builder, and Global Blocks.
3. Use Global Blocks for anything that repeats across pages so a single edit updates everywhere.
4. Match the Figma responsive rules exactly at each breakpoint.
5. Only reach for Element Studio when a native build genuinely cannot produce the element.

### Step 6: Preserve editability

1. Structure content so a client in Client Mode can edit text, images, and links without touching layout.
2. Name sections, blocks, and templates clearly inside Breakdance.
3. Avoid fragile nesting and avoid embedding content in ways a client cannot safely change.
4. Keep custom CSS minimal and documented.

### Step 7: Document deviations

1. Any departure from the Figma design goes in the deviation register with the reason.
2. Small developer CSS fixes must reflect back into Figma or be logged in the deviation register so design and build stay in sync.
3. Get designer agreement on anything that changes visual intent.

### Step 8: Responsive and cross-browser testing

1. Test at desktop, tablet, and mobile against the Figma frames.
2. Test on current versions of the major browsers and on real mobile where possible.
3. Confirm reflow order, stacking, font scaling, and hidden elements match the design.

### Step 9: Accessibility

1. Verify visible focus states on all interactive elements.
2. Verify accessible names and labels on icons, buttons, and form fields.
3. Re-check colour contrast in the browser against WCAG 2.2 AA.
4. Test keyboard navigation and logical tab order.
5. Confirm reduced-motion behaviour where animation exists.

### Step 10: Performance

1. Confirm images are correctly sized and served in modern formats.
2. Confirm caching and performance plugins are configured (see the plugin stack document).
3. Run a performance audit and address regressions before launch.

### Step 11: Deployment with backups and rollback

1. Take a full backup (files and database) before deployment.
2. Deploy from staging to production using the agency's standard process.
3. Run `wp breakdance clear_cache` after any database write.
4. If URLs changed between environments, use `wp breakdance replace_url` rather than a blind search and replace.
5. **Keep a tested rollback path**. Confirm you can restore the pre-deploy backup before you need to.

### Step 12: Client training in Client Mode

1. Enable and configure Client Mode so the client can edit text, images, and links only.
2. Walk the client through editing content safely, without exposing layout controls.
3. Provide a short written guide covering what they can change and what to leave alone.
4. Confirm backups and support arrangements at handover.

## Hard rule: how the AI agent may and may not touch the build

This rule is mandatory. It exists because a careless write can destroy a site's layout data.

1. **The AI agent must NOT write raw PHP layout files**. Breakdance layouts are structured data, not hand-written PHP. Hand-written PHP layout files are outside the platform and break editability.
2. The AI agent must NOT blindly run `wp breakdance import_settings`. That command overwrites the whole configuration. A blind import destroys existing settings.
3. **Any settings change must be a differential merge**: read the current settings, change only the intended values, and write back a merged result that a human has reviewed.
4. Always back up the `_breakdance_data` postmeta before any database write that touches layout data.
5. Always run `wp breakdance clear_cache` after any database write.
6. **Breakdance has NO REST API for creating layouts**. Layout automation is therefore limited to one of two human-reviewed approaches:
   - Constrained JSON-patch applied to known-good templates or Global Blocks (change specific values within a validated structure), or
   - Builder-UI browser automation (drive the Breakdance builder interface).
   Both are always reviewed by a human before and after they run.

See `08_breakdance_and_wordpress_plugin_stack.md` for the full ranking of safe interaction methods.

## Developer acceptance checklist

Complete before marking the build ready for launch.

- [ ] Figma file confirmed to satisfy the Handoff Contract
- [ ] Tokens extracted via Figma MCP with calls scoped to selected frames
- [ ] Token set reviewed by a human for completeness and naming
- [ ] Component-to-Breakdance mapping recorded
- [ ] Global Settings populated from tokens (UI or Pro-only import via differential merge)
- [ ] Templates built: header, footer, and required archive or single templates
- [ ] Pages built with native elements (Section, Div, Columns, Post Loop, Global Blocks)
- [ ] Element Studio used only where a native build is genuinely impossible
- [ ] Repeating regions built as Global Blocks
- [ ] Content structured so Client Mode edits stay within text, images, and links
- [ ] Deviations logged in the deviation register and reflected back into Figma where relevant
- [ ] Responsive behaviour matches Figma at desktop, tablet, and mobile
- [ ] Cross-browser testing complete on current major browsers
- [ ] Accessibility verified: focus states, labels, contrast, keyboard order, reduced motion
- [ ] Performance checked and caching configured
- [ ] Full backup taken before deployment
- [ ] `_breakdance_data` postmeta backed up before any DB write
- [ ] `wp breakdance clear_cache` run after any DB write
- [ ] `wp breakdance replace_url` used for any environment URL change
- [ ] Tested rollback path in place
- [ ] Client Mode configured and client trained with a written guide
- [ ] No raw PHP layout files written; no blind `import_settings` run
