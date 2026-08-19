# Developer 08: Add a page to an existing site

- **Who:** the developer.
- **Tool:** Claude Code, in the client's project folder.
- **When:** the client already has a website and wants a new page on it. Elementor,
  or Breakdance 2.x (no native MCP).
- **Not for:** a new build from a design. Use `06_build_page.md` for that. On
  Breakdance 3.0 with the native first-party MCP, use the normal build path.

## Before you paste

1. **A disposable local clone**, not the live site. LocalWP is the usual choice.
   Clone the **whole site** (All-in-One WP Migration, or LocalWP's own pull), not
   just a settings export: you need the site's existing pages to pattern from, and
   the same builder version.
2. **The layout-write capability bound for this project.** On this path that is
   typically Novamira Pro, connected to the **clone only**.
3. On a LocalWP clone, Application Passwords need
   `define('WP_ENVIRONMENT_TYPE','local');` in `wp-config.php`, then a site restart.

## The prompt

```
[ROLE: Developer adding a page to an existing client website]

OBJECTIVE: Add one new page to a site that already exists, so that it matches the site's
own patterns. Do not redesign the site and do not change its global settings.

Apply the `existing-site-page` skill, plus `elementor-limits` or `breakdance-limits` for
whichever builder this site uses.

WHAT I WILL GIVE YOU (ask for anything missing, do not guess):
- The site, and which builder it uses.
- The local clone I have connected, and confirmation it is a clone, not the live site.
- The page to add, and its type.
- The reference: EITHER a design file, OR (usually) the existing page on the site that is
  closest to what this page should be.
- The content, or confirmation that placeholder copy is acceptable for now.
- The slug, and where the page sits in the menu.

DIRECTIVES:

1. CONFIRM THE ENVIRONMENT FIRST. Verify you are pointed at the local clone and not the
   live site. Make ONE read-only call and show me what came back. Do not write anything
   until I confirm it is the clone.

2. TAKE THE INVENTORY, read-only, and show it to me before building. This step is not
   optional and it is what stops you hand-nesting bare widgets:
   - The builder and version, and whether the Pro tier is active.
   - Which structure generation the site uses (Elementor: section-and-column, or
     container. Breakdance: how Sections, Divs and Columns are actually used here).
   - The reusable units that already exist: saved Templates, Global Widgets, Global
     Blocks.
   - The token layer: the Elementor Kit's global colours and fonts, or the Breakdance
     Global Settings. Read them. Do NOT change them.
   - The structure of the reference page, read properly, as the pattern to follow.
   Tell me plainly what vocabulary the site gives you to work with.

3. BUILD BY PATTERNING, on the clone. Duplicate the closest existing page and adapt it.
   Do NOT compose the page from bare headings, text, images and buttons when a matching
   page already exists. Reuse the site's existing classes, components and spacing, and
   reference its existing tokens.
   IF THE PAGE NEEDS SOMETHING WITH NO EXISTING EQUIVALENT, STOP AND ASK ME. Do not
   improvise a bespoke section to fill the gap, and do not add or change a global setting.

4. SNAPSHOT BEFORE ANY WRITE that can affect the database.

5. VERIFY ON THE CLONE. Open the page in the builder and confirm every element is
   natively editable with no unknown-element errors. Check each breakpoint. Compare it
   against its sibling pages and tell me honestly where it differs.

6. PREPARE THE TRANSFER, then STOP for my approval. Do not touch the target site yourself.
   - Elementor: save as a Template and export the JSON. Tell me the import steps, and flag
     any images that will not resolve on the target and any Pro-only widgets used.
   - Breakdance: prepare the template or Global Block export, or the single page's
     `_breakdance_data`, and tell me exactly what to import and in what order.
   Include: what to snapshot on the target first, and what to clear or regenerate
   afterwards (builder cache, page cache, and on Elementor, Regenerate CSS & Data).

7. REPORT in plain language: what you built, what it patterned from, what still needs a
   person, and anything you could not match and why.

CONSTRAINTS:
- The clone or staging only. NEVER the live site. Promotion is a human, backed-up action.
- Never change global settings or tokens while adding a page.
- One page at a time.
- Do not invent builder internals. If you are unsure how this builder stores or moves
  something, say so and check rather than assuming.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## After it reports

1. Review the page on the clone yourself, in the builder, not just the rendered
   page.
2. Snapshot the target, then run the transfer steps it gave you.
3. Open the transferred page in the builder on the target and confirm it is still
   natively editable.
4. **A human promotes to live**, backed up.

## Why the inventory step is in capitals

An AI with no inventory falls back to the primitives it always knows and
hand-nests them. It renders, matches nothing and reuses nothing. That failure has
been seen on real builds, on Shopify and on WordPress builders alike. The
higher-level vocabulary was there; the agent just never went and read it. The
inventory step is the fix, and skipping it is the single most likely way this job
goes wrong.
