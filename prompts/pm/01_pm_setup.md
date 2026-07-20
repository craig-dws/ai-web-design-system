# PM 01: Get set up

- **Who:** the Project Manager.
- **Tool:** **either Claude Cowork or Claude Code**, whichever suits the task.
  The PM does not *need* a terminal, but is not restricted from one.
- **How often:** once.

## Setup

Set up whichever surfaces you will use. Most PMs will want both.

**Cowork** (no terminal, good for briefs, research and writing):

1. **Claude Desktop** on the Team seat, working in the **Cowork** tab.
2. Install from claude.com/plugins, in Cowork:
   - **product-management**: `/write-spec`, `/competitive-brief`,
     `/synthesize-research`, `/product-brainstorming`, `/stakeholder-update`.
   - **design** (useful for reviewing what comes back): `/design-critique`,
     `/research-synthesis`.

**Claude Code** (in the repository, when you want the system's own skills):

3. Follow `developer/01_dev_setup.md` Part A to set up the machine, then
   `developer/02_connect_mcps.md`.
4. This gives you the repository's own skills, which Cowork cannot load:
   **`site-brief`** (the full Stage 0 workflow, which reads the docs and writes
   the brief into the client folder) and **`stage-gate`** (the between-stages
   checklist for every gate).

Then read two documents: `docs/25_end_to_end_lifecycle.md` (the lifecycle and the
gates) and `docs/24_open_questions_answered.md` (the live decisions).

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

## Which surface for which job

| Job | Best surface | Why |
|-----|--------------|-----|
| Writing the brief | **Claude Code** if you have it open | You can run the `site-brief` skill directly; it reads the docs and writes into the client folder |
| Writing the brief, no terminal | **Cowork** | Use the paste-in in `02_new_site_brief.md`, the same workflow by hand |
| Checking a gate | **Claude Code** | The `stage-gate` skill runs the checklist for the transition |
| Competitive and market research | **Cowork** | `/competitive-brief` and `/research-synthesis` from the plugins |
| Specs and stakeholder updates | **Cowork** | `/write-spec`, `/stakeholder-update` |

The rule to remember: **repository skills load in Claude Code only**. Cowork
loads plugins from claude.com/plugins, not this repository. That is why the same
workflow exists in both forms.
