---
name: existing-site-page
description: Add a page to an existing client website that is already built, matching what the site already does. Use when the job is a new page on a live Elementor or Breakdance site rather than a new build from a design. Covers cloning the site to a disposable local environment, taking an inventory of the site's own patterns, building by patterning an existing page, and transferring only the finished page back. Works with or without a design file.
---

# Add a page to an existing site

A different job from a new build. There is no design system to establish and no
tokens to sync: **the site already has them, and the new page must match.** The
measure of success is that a visitor cannot tell which page was added later.

This applies to **Elementor** and to **Breakdance 2.x** (no native MCP). On
Breakdance 3.0 with the native first-party MCP, use the normal build path
instead; this skill is for the reverse-engineering path.

## The design source, when there is no design

Most of these jobs have no Figma frame, and that is expected. **The reference is
then an existing page of the same type on the site itself.** Sitting a new page
next to a built sibling and matching its structure is not a compromise; it is the
correct method, because the site's own pages are the design system.

Where a design file does exist, use it, but still take the inventory first: the
page must be built from the site's existing components, not from new ones
invented to match a drawing.

## Why the inventory step is not optional

An AI with no inventory falls back to the primitives it always knows (heading,
text, image, button) and hand-nests them into a bespoke pile. It renders, and it
matches nothing, reuses nothing, and is miserable to maintain. This has been
observed on real builds across builders. It is the same failure as emitting a raw
hex value instead of a token name: **the higher-level vocabulary existed, and the
agent never went and read it.**

So the rule is: **enumerate what exists, then compose only from that.** If
something needed has no existing equivalent, **stop and ask**. Never improvise a
bespoke section to fill the gap.

## The loop

### 1. Clone the site to a disposable local environment

- Clone the **whole site** (LocalWP, or All-in-One WP Migration, or the host's own
  pull). A global-settings-only export is **not** enough: it carries the tokens but
  none of the page patterns you need to match, and none of the version context.
- **Match the versions.** The clone must run the same builder version, and the
  same theme and plugins, as the target. Version skew is the most common cause of
  a page that will not import cleanly.
- Confirm you are working on the clone. **Never point an agent at the live site.**

### 2. Connect the agent to the clone only

- On the local clone, Application Passwords need HTTPS or
  `define('WP_ENVIRONMENT_TYPE','local');` in `wp-config.php`. LocalWP is not
  HTTPS by default, so that line is usually required. **Restart the site** after
  editing wp-config so PHP reloads it.
- Bind the layout-write capability for this project only. On this path that is
  typically Novamira Pro. The capability is bound in the project; skills and
  agents call the capability, never the vendor tool by name.
- **Verify with one read-only call before any write.**

### 3. Take the inventory (read-only)

Record, in the project, before building:

- The **builder and version**, and whether the Pro tier is active.
- The **structure generation** in use (for Elementor, section-and-column versus
  container; for Breakdance, how Sections, Divs and Columns are actually used on
  this site).
- The **reusable units**: saved Templates, Global Widgets, Global Blocks.
- The **token layer**: the Elementor Kit's global colours and fonts, or the
  Breakdance Global Settings. Read them; do not change them.
- **One or two representative pages** of the type being added, read structurally,
  as the pattern to follow.

### 4. Build on the clone by patterning an existing page

- **Duplicate the closest existing page and adapt it.** Do not compose from bare
  elements. This is the "constrained patch on a known-good structure" method and
  it is far safer than a build from scratch.
- Reuse the site's existing classes, components and spacing. Reference the site's
  existing tokens rather than introducing values.
- **Do not change global settings.** Restyling a global colour changes every page
  on the site. If the page genuinely needs a new shared component or token, stop
  and ask for a human decision.
- Keep the client's editing experience consistent: the new page should be editable
  the same way as its siblings.

### 5. Transfer only the finished page

- **Elementor:** save the page as a Template, export it as JSON, import that JSON
  on the target, apply it, then regenerate CSS. First-party and no raw write. This
  is the clean path.
- **Breakdance 2.x:** there is no equally clean single-page export. Move it via
  Breakdance's own template or Global Block export where that fits, or by copying
  the one new page's `_breakdance_data` postmeta across. Because the page is
  **new**, there is no existing layout to destroy, which makes it materially lower
  risk than editing an existing page, but it is still snapshot-first and
  human-reviewed.
- **Snapshot the target before the transfer**, every time.
- After the transfer: clear the builder cache and any page cache, and regenerate
  CSS on Elementor. A postmeta write does not fire `save_post`, so automatic
  purges may not run.

### 6. Verify, then a human promotes

- Open the transferred page **in the builder** on the target and confirm every
  element is natively editable, with no unknown-element errors.
- Check it renders at each breakpoint and matches its sibling pages.
- **Promotion to the live site is a human, backed-up action.** No agent writes to
  production.

## Rules

- Staging or local only. Never an agent write to a live client site.
- Snapshot before every write that can affect a database or a live file.
- Compose from the site's existing vocabulary. Stop and ask rather than inventing.
- Do not change global settings or tokens while adding a page.
- One page at a time, verified before the next.
- British and Australian English. No em dashes, no en dashes, no emojis.

## TODO (confirm per site)

- The builder and version, and pin the clone to match.
- The layout-write capability binding for this project, and one verified
  read-only call before any write.
- Whether the client's licence covers the Pro features any existing page relies
  on (Elementor Pro widgets, Breakdance Pro settings export).
