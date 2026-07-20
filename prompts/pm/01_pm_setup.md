# PM 01: Get set up

- **Who:** the Project Manager.
- **Tool:** Claude Cowork, in the Claude Desktop app. No terminal needed.
- **How often:** once.

## Setup

1. **Claude Desktop** on the Team seat, working in the **Cowork** tab.
2. Install from claude.com/plugins, in Cowork:
   - **product-management**: `/write-spec`, `/competitive-brief`,
     `/synthesize-research`, `/product-brainstorming`, `/stakeholder-update`.
   - **design** (useful for reviewing what comes back): `/design-critique`,
     `/research-synthesis`.
3. Read two documents: `docs/25_end_to_end_lifecycle.md` (the lifecycle and the
   gates) and `docs/24_open_questions_answered.md` (the live decisions).

If you also need Claude Code (for example to stand the system up or to push to
the repository), use `developer/01_dev_setup.md` Part A. Your day-to-day PM work
does not require it.

## What you own

**Stage 0, Project Management.** You turn a request into a brief a designer can
start from, and you own the **brief approved** gate. Design does not start
without it. You also own **Gate 3c, launch approved**, at the other end.

Your job at Stage 0:

1. Intake: what the client wants, and what they actually need.
2. Research the brand and its competitors.
3. Decide the **build target** with the Dev Lead: Target A (WordPress plus
   Breakdance) or Target B (Astro plus Payload). **Chosen here, not mid-build**,
   because changing it later is expensive.
4. Write the brief and get it approved by you and the client.

## Two things that will save you trouble

- **Content never blocks a build.** It is a pluggable input from any source: the
  client, ZilvaEdge, or realistic placeholder for a pilot. Record which source is
  expected and move on. A pilot with placeholder content is perfectly valid.
  Designing against real content is a quality recommendation, not a gate.
- **The build target is a Stage 0 decision.** Ask the Dev Lead before committing
  to one. Roughly: Breakdance when the client needs to self-edit layout visually
  on one low-ops host; Astro plus Payload when performance leads, the developer
  owns the front end in code, and the client mainly edits structured content.

## A note on the site-brief skill

Our `site-brief` skill lives in the repository as a Claude Code skill, so **it
cannot be invoked in Cowork**. `02_new_site_brief.md` is the same workflow as a
paste-in prompt you can use in Cowork without a terminal.
