---
name: elementor-limits
description: The Elementor builder's constraints as an instruction, so a page stays within what Elementor can build editably. Use when adding or editing pages on an Elementor site, or when deciding how an agent may safely touch Elementor. Covers how Elementor stores layout, the element vocabulary, the template export and import path, global settings, and the ranked safe ways to write. Confirm version-specific details on the real site; do not invent Elementor internals.
---

# Elementor limits

The Elementor counterpart to `breakdance-limits`. It keeps a page buildable and
keeps an agent inside the safe envelope.

**Elementor is not one of the agency's build targets for new sites.** The agency
migrated from Elementor to Breakdance deliberately (docs/24). This skill exists
for a different job: **adding or editing pages on an existing client site that is
already built in Elementor.** Do not propose Elementor for a new build.

## How Elementor stores content

- Layout is **JSON in the `_elementor_data` postmeta** on each post or page. It is
  data, not template files. Never hand-write PHP templates to produce layout.
- Page-level settings live in `_elementor_page_settings`.
- **Elementor generates a CSS file per post** (typically
  `uploads/elementor/css/post-<id>.css`). A database write that does not
  regenerate CSS can render stale or unstyled. Elementor > Tools >
  **Regenerate CSS & Data** is the manual fix.
- The active **Kit** holds the global settings (Site Settings: global colours,
  global fonts). This is the token layer.

## Element vocabulary

Elementor's structure has two generations, and a site may contain both:

- **Classic:** Section > Column > Widget.
- **Container (flexbox, and grid in later versions):** Container > Widget, with
  nested containers instead of section-and-column.

**Confirm which the site uses before building**, by opening a representative
existing page. Match whatever the site already uses. Do not introduce containers
into a section-and-column site, or the new page will not match and the client's
editing experience will differ page to page.

Widgets are the atomic elements (Heading, Text Editor, Image, Button, Icon Box,
and so on). **Templates** and **Global Widgets** (Pro) are the reusable units.

## The lesson that matters most: compose, do not re-invent

An AI given no inventory will fall back to the primitives it always knows
(heading, text, image, button) and hand-nest them into a bespoke pile. The result
is one level above raw HTML: it renders, but it matches nothing, reuses nothing,
and is painful to maintain.

**The site's existing pages, templates and global widgets are the vocabulary.**
Before building anything:

1. **Inventory what exists.** List the saved Templates, any Global Widgets, and
   the structure of one or two representative pages of the type you are adding.
2. **Pattern from an existing page.** Copy a similar page and adapt it. Do not
   compose a new page from bare widgets when a matching page already exists.
3. **If the page genuinely needs something with no existing equivalent, stop and
   ask.** Do not improvise a bespoke section to fill the gap.

## Design tokens on Elementor

- **Site Settings (the Kit) is the token layer**: Global Colours and Global Fonts.
  These are the semantic tier.
- Where a widget references a global colour or font, it updates centrally. Where
  it carries a local override, it does not. **Prefer global references.**
- On an existing site, **the tokens already exist and are not yours to change.**
  Read them and use them. Changing a global colour restyles every page on the
  site, so it is a deliberate, human-approved act, never a side effect of adding
  a page.

## The transfer path (this is Elementor's real advantage)

Elementor has a **first-party single-page transfer path**, which Breakdance lacks:

1. Save the finished page as a **Template** (or use Save as Template on the page).
2. **Export the template as a JSON file.**
3. **Import that JSON** on the target site (Templates > Saved Templates > Import).
4. Apply it to the target page, then regenerate CSS.

This moves one page without any raw database write, and it is supported by the
vendor. **Prefer it over any postmeta copy.** It is the main reason an Elementor
page-add is lower risk than the Breakdance equivalent.

Caveats to check every time:
- **Images and media are referenced, not embedded.** Imported templates may point
  at the source site's attachments. Confirm images resolve on the target, and
  re-upload where they do not.
- **Elementor Pro widgets** in a template require Pro active on the target site.
- **Version skew breaks imports.** Build on a clone running the **same Elementor
  version** as the target.

## The ways to target Elementor, ranked safest first

1. **Template export and import (JSON).** First-party, no raw write. The default.
2. **Elementor's own UI**, driven by a human or by browser automation. Respects
   the builder's validation.
3. **Read `_elementor_data`** to understand an existing page's structure. Read-only
   is always safe and is how you learn the site's vocabulary.
4. **Constrained patch of `_elementor_data`** on a copy of a known-good page.
   Change values inside a structure that already works; never restructure.
   Snapshot first, human-reviewed.
5. **Raw `_elementor_data` write from scratch (last resort).** Highest risk. A
   malformed write destroys the layout. Snapshot first, human-reviewed, and
   regenerate CSS afterwards.

## Command and write safety

- **Snapshot before every write** that can affect the database. Our backup is the
  safety net.
- **Regenerate CSS after any database write** to layout or global settings, or the
  site can serve stale styling. Elementor > Tools > Regenerate CSS & Data.
- **Purge the page cache too** where a caching plugin is active. A postmeta write
  does not fire `save_post`, so an automatic purge may not happen.
- **Never write to production.** Build on a local clone or staging; a human
  promotes.
- Confirm the **Elementor version and whether Pro is active** before relying on
  any Pro-only feature.

## TODO (confirm on the real site, do not assume)

- Which structure generation the site uses (section-and-column, or container).
- The Elementor and Elementor Pro versions, and pin the local clone to match.
- Whether the site uses Global Widgets or saved Templates as its reusable units.
- Novamira's exact Elementor abilities on the licence in use. Novamira comes from
  the Dynamic Content for Elementor team, so Elementor coverage is plausible, but
  our own docs confirm only the core abilities (PHP execution plus filesystem)
  and a Breakdance specialization. **Verify against the installed plugin before
  relying on an Elementor-specific ability** (docs/01, docs/24).
