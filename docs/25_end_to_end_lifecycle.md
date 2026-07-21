# 25. End-to-End Lifecycle: PM, Design, Develop

Status: v0.3 | Date: 21 July 2026 | Owners: Project Manager, Designer and Dev Lead | Audience: the whole team

The high-level life cycle of a site build, what AI does at each stage, who approves what, and where changes happen. This is the team-facing map. The target-specific detail lives in 08 (Breakdance), 08b (Astro plus Payload), and the runbooks (19, 19b).

## The principle: design to a system, not to a page

This is the idea the whole workflow rests on, so it is worth being precise about.

**Designing a page** means making a hundred small decisions inside one canvas: this heading is 42px, this gap looks about right, this blue is close enough. Every decision is local. The page looks good. Then the next page needs the same heading, and someone re-decides it slightly differently. By page six you have four blues, three heading sizes, and no way to change any of it centrally. Every new page costs roughly what the last one cost. **Effort scales linearly with pages.**

**Designing to a system** means you make those decisions **once, as rules**, and then pages are assembled from the rules. You decide the type scale, the spacing scale, the colour roles, the component anatomy and their states. Each is named. A page then becomes a *composition* of things that already exist and already work, rather than a fresh set of decisions.

Three things follow, and they are why this matters commercially:

- **The unit of work stops being the page.** Once the system exists and the homepage is approved, an internal page is assembly, not invention. This is exactly the acceleration you were hoping for: "design internal pages from our approved design." That is not a shortcut, it is the intended behaviour of a system.
- **Change becomes central.** Change the semantic token, every page follows. Under page-design, the same change is a manual sweep with misses.
- **AI only works this way.** An agent given "make it look like the mockup" guesses and produces plausible slop. An agent given "use `color.action.primary` and `space.md`, compose from these components" produces something correct and reviewable. **Tokens are the contract that makes AI output checkable.** Without them there is no definition of "right" for a reviewer or an agent to check against.

The cost is honest: **the first page is slower.** You are building the system, not just a page. The payoff starts around page two or three and compounds. On a five-page brochure site the system pays for itself; on a one-page microsite it may not.

## Roles and tools

| Role | Primary tool | Also uses |
|------|-------------|-----------|
| **Project Manager** | Claude Cowork, and Claude Code where it helps | `/write-spec`, `/competitive-brief` in Cowork; the `site-brief` and `stage-gate` skills in Claude Code |
| **Designer** | Figma (source of truth) plus Claude Cowork | Claude Design for concepts, Figma skills, `/design-critique`, `/accessibility-review` |
| **Developer** | Claude Code | Figma MCP, the builder MCP, WP-CLI, Git |

**The designer never needs Claude Code or Git.** Cowork is agentic Claude without a terminal, and the Figma skills let Claude work directly on her canvas. Keep it that way.

**A consequence worth knowing: this repository's skills load in Claude Code only.** Cowork loads plugins from claude.com/plugins, not from `.claude/`. So anyone working in Cowork cannot invoke `site-brief`, `stage-gate`, `web-design` or the rest. Two things follow. The designer is handed her reference documents as a folder (`designer-pack/`, produced by `designer-pack/assemble.sh`) rather than being pointed at `docs/` paths she cannot open. And the PM has the same workflow available both ways: the `site-brief` skill in Claude Code, or the paste-in equivalent in Cowork (`prompts/pm/`).

## The lifecycle

```
STAGE 0  PROJECT MANAGEMENT (set up the job)
  intake -> research -> content + assets -> brief -> choose build target
  GATE: brief approved (PM + client)
                    |
                    v
STAGE 1  DESIGN (build the system, then the pages)
  concepts -> design system (tokens + components) -> homepage -> internal pages
  GATE 1a: visual direction approved (client)
  GATE 1b: design system self-certified (Designer); evidence recorded (PM)   <-- the important one
  GATE 1c: homepage approved (client)
  GATE 1d: dev-ready handoff accepted (Dev Lead)
                    |
                    v
STAGE 2  DEVELOP (assemble from the system)
  staging setup -> token sync -> components -> homepage -> subpages
  GATE 2a: token sync verified (Dev Lead)
  GATE 2b: homepage build reviewed (Designer + QA)
  GATE 2c: subpages reviewed (Designer + QA)
                    |
                    v
STAGE 3  QA, UAT AND LAUNCH
  QA + accessibility + performance -> client UAT -> fixes -> launch
  GATE 3a: QA passed (QA Lead)
  GATE 3b: client UAT sign-off
  GATE 3c: launch approved (PM)
```

---

## Stage 0: Project management

**Goal: hand the designer a job that is ready to start.** This is where your "one-page design brief summary" belongs. It is a PM artefact, not a designer artefact, and you were right about that.

**What happens:** the PM triggers the `site-brief` skill with something as short as *"I need a new site for BRAND"*. The skill asks the clarifying questions (business goals, audience, pages, tone, competitors, constraints, content status, deadline), researches the brand and its competitors, and writes a structured brief into the standard client folder. Assets, images, sitemap, sample sites and client wants all land in a known structure.

**What AI does:** asks the questions, researches, drafts the brief, produces a competitive brief. **What the human does:** answers, corrects, approves.

**The build target is chosen here, not later** (Breakdance/Bricks or Astro plus Payload). Changing it mid-build is expensive.

**Artefacts out:** approved brief, content and assets in the folder structure, sitemap, chosen target.
**Gate:** brief approved by PM and client. Design does not start without it.

**Why this stage exists:** it is what makes short prompts possible everywhere downstream. The brief is the context, so nobody has to write an essay to the AI later.

---

## Stage 1: Design

**Goal: an approved design system plus an approved homepage, from which every other page can be assembled.**

### 1.1 Concepts

**Claude Design** for fast, disposable directions and client-facing pitch visuals. It is rate-limited (roughly 3 to 4 prompts a week on Pro), so use it for divergence, not production. Our `/web-design` skill (forked from Anthropic's `frontend-design`) enforces a real point of view and screens out the generic AI looks.

**Note the constraint honestly: Claude Design does not export to Figma.** It exports Canva, PDF, PPTX, HTML. Concepts inform the Figma work; they do not become it.

**Gate 1a:** visual direction approved by the client.

### 1.2 Design system (the real work)

The designer builds the system in **Figma**: the Variables collections (primitive, semantic, component), the type and spacing scales, the components and their states. She starts from the **agency base kit** and creates a **client Extended Collection** that overrides only colour, type family and radius (see 22).

**AI helps here** via Cowork plus the Figma skills (`figma-generate-library`, `figma-use`) and `/design-system` to audit for hardcoded values and naming drift.

**Gate 1b: the Designer self-certifies the design system and the PM records the checklist and evidence.** This is the most important gate in the whole process and the easiest to skip. The Designer completes and verifies the client `DESIGN.md` as a derived design record. The PM checks completeness, not design correctness. Everything downstream inherits this foundation. If the tokens are wrong or unnamed here, the AI will emit wrong values on every page and no amount of later review will fix it economically.

### 1.3 Homepage, then internal pages

Homepage first, at full fidelity, composed from the system. Then internal pages, which should be **fast**, because they are assembly. This is where the AI acceleration you were hoping for actually lands: with an approved system and homepage, generating internal page layouts from the approved design is a legitimate and reviewable operation, not a gamble.

**Gate 1c:** homepage approved by the client.

### 1.4 Handoff

The handover contract (pilot artefact 04) is signed. **Changes and client feedback at this stage happen in Figma**: your instinct is right. Figma comments, designer revises, re-approve. Nothing goes to the build until the handoff is accepted.

**Gate 1d:** Dev Lead accepts the dev-ready file. An incomplete handoff is rejected, not patched informally.

---

## Stage 2: Develop

**Goal: the approved design, running on staging, still editable by the client.**

### 2.1 Staging and token sync

Staging provisioned (your LiteSpeed server, snapshot taken). Tokens flow from Figma into the builder's token layer by **differential merge, never a blind import**.

**Gate 2a:** Dev Lead verifies the token sync. A page rendered with the new tokens is spot-checked.

### 2.2 Components, homepage, subpages

Components built from tokens, then the homepage, then subpages **one at a time**, each scoped to one approved frame, each verified with a screenshot diff against Figma.

**AI does:** extract the frame, map it to builder elements or Astro components, reference tokens, assemble, screenshot, diff, patch.
**Humans do:** review every page. Nothing AI-generated ships unreviewed.

**Gates 2b and 2c:** Designer and QA review the homepage, then the subpages.

### Where do changes happen during the build?

You asked whether changes are done in AI or on site. **It depends on the class of change, and getting this wrong is how design and build drift apart.**

| Change type | Where it happens | Why |
|-------------|-----------------|-----|
| **Copy or content**, pre-launch | **In the Google Doc, then pull** | The Doc is canonical until launch (13). Copy typed into Breakdance is silently overwritten by the next pull |
| **Copy or content**, post-launch | On site, in Client Mode | Authority transferred to the live site at launch |
| **Image swap** | On site | Images are not carried by the content round-trip |
| **Design change** (layout, spacing scale, colour, component anatomy) | **Back in Figma**, then re-sync | Figma leads until launch (13). Fixing it only on the site guarantees drift |
| **Token value change** | Figma, then differential merge | Central by definition |
| **Small CSS nudge** for a technical constraint | On site, **and logged** | Record it in the deviation register with a rationale, or reflect it back to Figma |
| **Bug** | On site | It is a build defect, not a design decision |

**The rule: if it changes the design, it goes back to Figma. If it changes the copy, it goes back to the Google Doc, until launch transfers content authority to the site.**

An earlier version of this document said copy changes simply happen "on site". That was wrong, and it contradicted 13 and the constitution. It is only true after launch. Before launch it would lose the editor's work at the next pull.

---

## Stage 3: QA, UAT and launch

**QA:** breakpoints, cross-browser (Chrome DevTools MCP, headless), WCAG 2.2 AA, Lighthouse and Core Web Vitals, token and component adherence, design-versus-build diff. AI assists with scans; **a human certifies accessibility.**

**Client UAT:** the client reviews the **staging site**, not Figma. By now the design is approved and built; what they are testing is the real thing.

**Where does UAT feedback go?** Triage it on arrival, using the same table above. **UAT happens before launch, so the pre-launch rules still apply.**

- **Content and copy fixes** go **in the Google Doc, then pull into staging.** Not typed onto the staging site. This is the one that catches people out: UAT feels like the end, so typing the client's copy fix straight onto staging feels harmless. It is not. The Doc is still canonical until launch, so the next pull would silently discard the client's accepted change. Record the reviewed content revision at the UAT gate.
- **"Can we change the design"** is a design change. It goes back to Figma, gets re-approved, and re-syncs. If it is late and large, it is a change request, not a fix.
- **Bugs** are fixed on site. They are build defects, not content or design decisions.

Do not let a UAT list quietly become a redesign done directly on the site. That is the single most common way a systemised build degrades back into a hand-maintained page.

**Launch:** backed up, rollback documented, promoted by a human. Then Client Mode or Payload admin handover and training.

**Gates 3a, 3b, 3c:** QA Lead, client, PM.

---

## Where AI actually earns its keep

Being honest about this matters for measuring it (11):

- **Strong:** research and competitive briefs; drafting the brief; concept divergence; extracting and mapping tokens; assembling subpages from an approved system; screenshot diffing; accessibility and SEO scanning; content population.
- **Moderate:** building the design system (accelerates, but the designer decides); building the homepage.
- **Weak or not yet:** anything requiring taste without a brief; layout invention; writing directly into Breakdance's undocumented data structure; certifying accessibility.

**The pattern:** AI is strong once a system exists and weak while the system is being invented. That is another argument for putting real effort into Stage 1.2 and not rushing it.

## Related documents

- [12_ai_web_design_system_v0.1.md](12_ai_web_design_system_v0.1.md) - the full gate list. Partially superseded; CLAUDE.md governs, but the gate model there is still current
- [22_design_system_reuse_model.md](22_design_system_reuse_model.md) - the base kit and per-client theme model
- [24_open_questions_answered.md](24_open_questions_answered.md) - decisions behind this workflow
- [13_source_of_truth_model.md](13_source_of_truth_model.md) - who owns what, and when authority moves
