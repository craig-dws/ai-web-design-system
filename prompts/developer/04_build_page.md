# Developer 04: Build one page

- **Who:** the developer.
- **Tool:** Claude Code, in the client project.
- **When:** **Gates 2b and 2c**, homepage first, then subpages.

**One page at a time, from one approved frame, tokens only, verified against the
design.** The homepage is slower because it establishes the components. Subpages
should then be fast, because they are assembly from an approved system rather
than fresh invention. That acceleration is the whole point of designing to a
system.

There are shortcuts here and they all cost more than they save.

```
[ROLE: Developer building one page from an approved frame]

OBJECTIVE: Build the single page "[PAGE NAME]" to match the approved Figma frame
"[FRAME NAME]". One page only.

Build target: [A or B]

DIRECTIVES:
1. Delegate to the right subagent:
   - Target A: builder-builder. Apply the breakdance-limits skill. Call the project's bound
     layout-write CAPABILITY, never a vendor tool by name.
   - Target B: astro-component-builder. If the content model needs a new block type, use
     payload-schema-modeller first, and never apply a migration silently.
2. Scope to the single frame. Call get_design_context and get_screenshot on that frame
   only; a whole-page call can exceed token limits.
3. Use get_code_connect_map where components are mapped, so you reference real components
   rather than inventing them.
4. Reference token names for every colour, type and spacing value. NEVER hardcode. If a
   token is missing, STOP and report it rather than approximating one.
5. Snapshot before any write that can affect a database or a live file.
6. Build only this page. Do not touch other pages, global settings, or unrelated files.
7. Then run the visual QA pass: screenshot the built page, compare it to the frame, and
   patch discrepancies using token references only. Report anything you could not match
   and why.
8. Return the staging preview URL and stop for review.

CONSTRAINTS:
- Staging only. Never production. Never a raw PHP layout file on Target A.
- One page. If you find yourself editing a second page, stop and tell me.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## Optional, where the design has a strong point of view

Run the **metaphor-grounding-verifier** subagent to check that each design
decision traces to a named token and the approved frame rather than being an
unexplained default, and the **anti-ai-design-checklist** skill for the
anti-generic constraints.

## Review

Nothing AI-generated ships unreviewed. **The designer and QA review the homepage
(Gate 2b), then the subpages (Gate 2c).** If a change alters the design, it goes
back to Figma and re-syncs; it is not fixed only on the built site. A small CSS
nudge for a genuine technical constraint is allowed, but it gets logged in the
deviation register with a rationale.
