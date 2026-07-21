---
name: breakdance-limits
description: The Breakdance builder's constraints as an instruction, so a design or build stays within what Breakdance can build editably. Use when designing layout for Target A (WordPress plus Breakdance), when planning a build, or when deciding how an agent may safely touch Breakdance. Covers the element vocabulary, the layout engine, Client Mode limits, the absence of a layout API, and the ranked, safe ways to write. Facts come from docs/08 and docs/24; do not invent Breakdance internals.
---

# Breakdance limits

This is the single highest-value build skill on Target A. It keeps a design
buildable and keeps an agent inside the safe envelope. Everything here is
sourced from docs/08 and docs/24. Where a fact is not confirmed, it says so.

## How Breakdance stores content

- Layouts are structured JSON in the `_breakdance_data` postmeta on each post or
  page. It is data, not hand-written PHP. Never write raw PHP layout files;
  Breakdance ignores them and it is a security risk.
- The main content types are Templates, Headers, Footers, and Global Blocks.
  Global Blocks are reusable regions edited once and reflected everywhere.
- **Never hardcode custom post type slugs.** They vary between sites. Confirm
  them on the real install with `wp post-type list` before relying on any slug.

## Element vocabulary and layout engine

Design to what Breakdance builds natively, so the client can still edit it.

- The container element is **Div**, not "Container".
- The layout mechanism is the **Layout Engine** with Vertical, Horizontal, and
  Grid modes. It is not a branded "Auto Layout".
- Use **Section** and **Div** for structure; the **Columns** element for column
  arrangements; the **Post Loop Builder** for repeating content.
- In Figma terms: Auto Layout maps to Section and Div; column arrangements map
  to Columns; repeating content maps to the Post Loop Builder.

## Design tokens on Breakdance

- Breakdance Global Settings hold the token layer: Global Colours and Global
  Typography Presets. These are the semantic tier (docs/22).
- The honest mapping (docs/22): colour and typography map well at the semantic
  tier; spacing maps partially; there is no clean component-token home. Do not
  promise component-tier parity on Target A.
- Move tokens with the token-sync skill (differential merge), never a blind
  import.

## Client Mode limits

Client Mode lets a client edit text, images, and links, but not alter layout,
structure, or global design. Design so every routine client edit falls within
text, images, and links and never needs a structural change. The vendor warns
Client Mode "does not restrict privileges", so treat it as a UX guardrail, not a
security control.

## The layout-write path

**Breakdance 3.0 (beta, July 2026) ships a native, first-party MCP that writes
layouts.** This is the preferred path and it may resolve what used to be Target
A's central risk. It is Beta 1 and unproven, so it is tested before it touches
client work (see docs/27, the write test). If it passes, no third party is
needed.

**On Breakdance 2.x, or if the native MCP fails the write test,** there is no
sanctioned layout API, and any agent that builds a page is reverse-engineering an
undocumented internal format through a third party (Novamira, Respira). That is
managed risk, not removed. (docs/24 Section C, docs/26.)

Consequences that shape every build, on either path:

- **Snapshot before every agent write** that can affect the database or a live
  file. Our backup is the safety net, not the vendor's rollback. This matters as
  much on the native path, which uses admin-equivalent access.
- **Pin the Breakdance version** on client staging. A point release has already
  broken a third-party write path (2.8.0, June 2026), and a beta feature can
  change under you. A Breakdance update requires re-testing the write path before
  it touches client work.
- **Staging only.** The agent never writes layout on production.
- **Keep the layout-write step a capability**, never a hardcoded vendor tool, so
  the binding (native 3.0 MCP first, Novamira or Respira as fallback, or a manual
  build) is swappable (CLAUDE.md principle 5). See the builder-builder subagent.

## The five ways to target Breakdance, ranked safest first

Prefer the highest-ranked method that can do the job (docs/08).

1. **WP-CLI settings and cache.** `wp breakdance status`, `wp breakdance
   clear_cache`, and Pro settings export and import applied as a differential
   merge. Supported and predictable.
2. **Global Settings JSON import and export.** Move the token layer via exported
   and imported Global Settings JSON, differential merge only.
3. **Constrained JSON-patch on known-good Global Blocks or templates.** Patch
   only values inside a structure that already works. Never restructure.
   Validate before and after, back up `_breakdance_data` first, human-reviewed.
4. **Builder-UI browser automation.** Drive the builder through the supported UI
   so it respects the builder's own validation. Slower and more fragile; back up
   first, human-reviewed.
5. **Raw `_breakdance_data` writes (last resort).** Highest risk. A malformed
   write destroys the layout. Only when nothing above can do the job, always
   after backing up the postmeta, always human-reviewed, always followed by
   `wp breakdance clear_cache`.

## Command safety

- Always run `wp breakdance clear_cache` after any database write. Postmeta
  writes do not fire `save_post`, so a cache purge must be explicit.
- Never run `wp breakdance import_settings` blind. It overwrites the whole
  config. Differential merge only, with the diff reviewed.
- Never run `wp breakdance total_reset` from any automated path. It is
  destructive and human-gated.
- Settings export and import are Pro only. Confirm the licence before relying on
  them.

## TODO (confirm on a real install before hardcoding anything)

- The exact custom post type slugs (for example the template, header, and footer
  types). Confirm with `wp post-type list`.
- The full native element vocabulary beyond Div, Section, Columns, and Post Loop
  Builder. docs/01 confirms these; the complete set should be captured from a
  live Breakdance install and added here.
- The layout-write capability binding for the project (native Breakdance 3.0 MCP
  first; Novamira or Respira only as fallback if the native path fails the write
  test in docs/27). Record which binding is in use and the pinned Breakdance
  version in the project CLAUDE.md.
