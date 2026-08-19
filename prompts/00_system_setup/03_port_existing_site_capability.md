# Port the existing-site capability into the starter kit

- **Who:** the developer or Dev Lead.
- **Tool:** Claude Code, opened in the **starter kit** folder, in a **fresh chat**.
- **How often:** once.

## What this is for

The capability to **add a page to a client site that already exists** (Elementor,
or Breakdance 2.x with no native MCP) was drafted in the system repo. It needs to
live in the starter kit, because that is what actually runs builds.

The drafts exist but are **unverified**. They were written against the system
repo's specification, and the starter kit has diverged from it. The prompt below
therefore treats the drafts as **input, not truth**, and checks everything against
the starter kit's own conventions before copying anything.

Paste the block below into a fresh Claude Code chat opened in the starter kit.

---

```
[ROLE: Developer porting a drafted capability into the starter kit, carefully]

OBJECTIVE: Add the "add a page to an existing site" capability to THIS starter kit, so a
client project can do Elementor and Breakdance 2.x page additions. Verify before you
change anything, and test after.

TWO REPOS, DO NOT CONFUSE THEM:
- THIS repo, the starter kit (you are in it): the lean per-client build kit. It is what
  actually runs builds, and its conventions WIN.
- The system repo at C:\Apps\Websites\ai-web-design-system: the full specification, docs,
  and the drafts you are porting. Read from it. Do NOT write to it.

THE DRAFTS TO PORT (read-only, from the system repo):
- .claude/skills/existing-site-page/SKILL.md
- .claude/skills/elementor-limits/SKILL.md
- prompts/developer/existing-site-page.md

TREAT THESE AS UNVERIFIED. They were written against the system repo and contain
assumptions that may not hold here. Where a draft and this starter kit disagree, THIS KIT
WINS, and say so in your report rather than silently following the draft.

=== PHASE 0: BEFORE CHECKS. Change nothing. ===

0.1 Record the baseline and show it to me:
    - `git status` and `git log --oneline -5`. THERE MAY BE UNCOMMITTED WORK HERE. Do not
      stash, revert or clobber it. Report it and ask me what to do before you touch git.
    - The full list of `.claude/skills/`, `.claude/reference/`, `prompts/` and
      `.claude/tools/`.
    Save this baseline; you will diff against it in Phase 3.

0.2 Learn this kit's ACTUAL conventions by reading whole files, not by grepping for
    keywords. Read at minimum:
    - START-HERE.md and prompts/README.md (how prompts are written and indexed)
    - .claude/CLAUDE.md (the client-project rules and the operator's plain-language rule)
    - .claude/reference/build-standards.md and limitations.md
    - .claude/skills/breakdance-limits/SKILL.md (the pattern a limits skill follows here)
    - prompts/new-page.md and prompts/guided-build.md (how a build prompt is actually
      written, including the report format it must send the operator)

0.3 Report back, BEFORE building, and STOP:
    - The skill frontmatter convention this kit uses (fields, exactly).
    - The prompt file convention (naming, structure, the operator report shape).
    - How this kit expects images and assets to be handled.
    - Which of the drafts' assumptions are WRONG for this kit, item by item.
    - Whether this capability belongs as prompts + skills here, or as something else.
    Wait for my approval before Phase 2.

=== PHASE 1: KNOWN TRAPS. Verify each one yourself; do not take my word for it. ===

These are real mistakes already made on this work. Confirm the truth from this kit's files
and state what you found:

1. CONTENT ASSETS ARE PULLED FROM FIGMA on a page that has a design. The process is: pull
   from Figma, rename from the design, resize to display size, optimise, upload. SVGs are
   inlined. Placeholders are for pages built with NO design, they are not the default.
   Check .claude/CLAUDE.md and prompts/guided-build.md. An earlier draft claimed the
   opposite; do not repeat it.
2. DO NOT CONCLUDE FROM A KEYWORD GREP. This kit expresses steps in prose ("pull the exact
   assets from the Figma frame"), not by tool name. A search for a tool name will miss it.
   Read whole prompts.
3. THIS KIT TARGETS BREAKDANCE 3.0 BETA via the Agent Connector native MCP. The capability
   you are adding is a DIFFERENT path: Elementor, or Breakdance 2.x, via a third-party
   bridge on a disposable local clone. Do not merge the two paths or imply the native MCP
   tools exist on the old path.
4. NUMBERED prompt files mean a step in a sequence; UNNUMBERED means a standalone job.
   Check what this kit actually does and follow it.

=== PHASE 2: BUILD. Only after I approve Phase 0.3. ===

2.1 Work on a branch. Do not commit my uncommitted work into it.

2.2 Port the capability, ADAPTED to this kit's conventions, not copied:
    - A limits skill for Elementor, matching the shape of breakdance-limits here.
    - The existing-site workflow (clone the whole site to a disposable local environment,
      connect the bridge to the clone only, take a READ-ONLY INVENTORY of the site's own
      patterns, build by patterning an existing page, transfer only the finished page,
      human promotes).
    - A paste-in prompt following this kit's prompt conventions, including the operator
      report shape this kit uses, written for a project manager who never runs commands.

2.3 The single most important rule to encode: THE INVENTORY STEP IS A HARD STOP. An agent
    with no inventory falls back to the primitives it always knows (heading, text, image,
    button) and hand-nests them, which renders but matches and reuses nothing. The agent
    must enumerate the site's existing pages, templates, global blocks and tokens, show
    them, and compose ONLY from that. If something needed has no existing equivalent it
    STOPS and asks. This has already failed on a real build; it is the point of the work.

2.4 Also encode: confirm you are on the CLONE and not the live site, with one read-only
    call, before any write. Snapshot before every write. Never change global settings while
    adding a page. Staging or local only, a human promotes to production.

2.5 Update this kit's prompts/README.md (or its index equivalent) so the new prompt is
    discoverable and its "when to use" is unambiguous against the existing new-page prompt.

=== PHASE 3: AFTER CHECKS AND TESTS. Run every one and show the output. ===

3.1 STRUCTURAL TESTS, show the commands and results:
    - Skill frontmatter contains ONLY this kit's permitted fields. No invented fields.
    - Every skill `name:` matches its folder name.
    - Every file reference and cross-reference resolves to a file that actually exists.
    - No em dashes, no en dashes, no double hyphens in prose, no emojis.
    - British and Australian English spelling.

3.2 CONSISTENCY TESTS against this kit:
    - The new material does not contradict limitations.md, build-standards.md or
      breakdance-limits. Quote any tension you find rather than smoothing it over.
    - It does not imply the Breakdance 3.0 native MCP tools exist on the 2.x or Elementor
      path.
    - The new prompt's "when to use" cannot be confused with new-page.md. State the
      difference in one line in each.

3.3 DIFF REVIEW:
    - Re-run the Phase 0.1 inventory and show me exactly what changed, added and modified.
    - `git diff` summary. Confirm my pre-existing uncommitted work is untouched.

3.4 DRY-RUN TEST, read-only, no writes:
    - Walk through the new prompt against a REAL scenario I give you (I will name a site
      and a page) and show what it WOULD do at each step, especially what the inventory
      step would enumerate and where it would stop to ask.
    - Do not connect to any site or write anything for this. It is a paper test of whether
      the prompt actually holds together.

3.5 Report honestly:
    - What you built, and where it differs from the drafts and why.
    - Every test, pass or fail, with the evidence.
    - What you could NOT verify, and what would be needed to verify it.
    - Anything in the drafts you judged wrong, and what you did instead.

=== CONSTRAINTS ===
- Do NOT write to the system repo. Read-only there.
- Do NOT touch my uncommitted work. Ask first on anything git.
- Do NOT commit until I have seen the Phase 3 report. Do not push at all without asking.
- Staging or a local clone only. Never production, never a live client site.
- Do not invent builder internals. If you are unsure how Elementor or Breakdance stores or
  moves something, say so and mark it to confirm, rather than asserting it.
- Write for a project manager who never runs commands: plain language, explain each
  technical term the first time it appears.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

---

## The real test cases, when you get to Phase 3.4

Two live client sites, both already built:

- **allsparkelectrical.net**, Elementor.
- **lunadigitalmarketing.com.au**, Breakdance.

Neither is on the Breakdance 3.0 native MCP path, which is exactly why this
capability is needed. The environment for the real job is a **LocalWP clone** of
the site, with **Novamira Pro** connected to the clone only.

Start with the Elementor site. Elementor has a first-party single-page transfer
path (save as Template, export JSON, import, regenerate CSS), so it is materially
lower risk than the Breakdance equivalent, which has no equally clean export.
