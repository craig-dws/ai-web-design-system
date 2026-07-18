# Figma Design Systems: what to build and how to learn it

A starter note for Craig and Jeph, ahead of building our agency design system.

This note has two jobs. First, to explain what a design system is and what we specifically plan to build, in plain terms, for someone who uses Figma every day but has not built a design system before. Second, to give us both a short, vetted list of things to watch and read so we can learn this properly before we build it.

The short version: our own system already tells us what kind of design system to build, and it is the right kind. This note explains that choice, backs it with current industry best practice, and points to the best places to learn the skills.

---

## 1. Where this fits

We are standing up the AI Web Design System, which is the internal system that helps us take a website from brief to launch with AI assistance and a human approving every step. That system does not build a design system for us. It cannot, because a design system is a set of design decisions that live in Figma, and only a designer can make them.

So there is a clear order of events:

1. We finish setting up the AI Web Design System.
2. We run the short Breakdance write test, which decides whether the main build path works at all. Nothing else is worth doing until it passes.
3. We build our agency design system in Figma. This note is preparation for that step.
4. Only then do we use it on a real client pilot.

The design system is a prerequisite for everything downstream. Without agreed token names there is nothing for the Figma-to-build sync to map, and the AI has no definition of "right" to check its own work against. This is why it matters, and why it is worth learning properly rather than rushing.

---

## 2. What a design system actually is

A design system is a shared, reusable set of design decisions plus the components built from them, so that everything we make looks consistent and can be built quickly and checked against a standard.

It is useful to separate three sizes of the same idea, because the wrong size is a common and expensive mistake:

- A **design token** is a single named design decision. For example, the colour we use for a primary button, or our standard medium spacing. Tokens are the smallest and most valuable building block.
- A **UI kit** is a set of reusable components (buttons, cards, inputs) built from those tokens, for speed.
- A **full enterprise design system** adds heavy governance, exhaustive documentation, multi-team process, and continuous staffing. Nielsen Norman Group puts the minimum team for one at three dedicated people, and stresses it is never finished.

Here is the key decision, and the research is consistent on it: a full enterprise design system is the wrong target for a small agency. It needs a dedicated team we do not have and perpetual maintenance we cannot justify. What a small team should build first is a token-first foundation plus a small kit of the components we actually repeat. The industry name for this is a Minimum Viable Design System. The goal is not to "have a design system", it is to ship better work faster with less inconsistency.

This is exactly what our own documents already prescribe, which is reassuring. We are not choosing between approaches. We are executing a documented one, and it happens to match best practice.

---

## 3. The good news: our system already specifies what to build

Our own documents (`docs/22_design_system_reuse_model.md`, `docs/pilot-artefacts/03_figma_component_and_naming_standard.md`, and Prompt 3 in `START_HERE.md`) already define the design system in detail. Jeph is not being asked to invent an approach. She is being asked to build a specified one. Here is that specification in plain terms.

### A three-tier token model

Everything is built on three layers of tokens, each one referencing the layer below it (in Figma this reference is called aliasing):

1. **Primitive**: raw values with no meaning yet. For example `blue-500`, `space-4`, `radius-lg`. These rarely change and are shared across every client.
2. **Semantic**: what a value means. For example `color/brand/primary`, `color/surface/background`. This is the layer we change to re-theme for a different client. Semantic tokens point at primitive tokens.
3. **Component**: where a value is used. For example `button.bg.default`, `card.border`. These point at semantic tokens and almost never change, because the structure of a button is the same whatever the brand.

The rule is simple: semantic references primitive, component references semantic, and a raw value never appears above the primitive tier. This third tier is what lets one client be re-themed without touching how components are put together.

### The reuse model: build once, theme per client

We build one agency base kit. For each client we do not build a new design system. We create a Figma Extended Collection that inherits the base and overrides only colour, typography family, and radius. The client stays tied to the parent, so improvements to the base flow down. We never fork the base. That is the entire point of the model, and it is what makes this pay off across many client sites rather than being a cost per project.

Differentiation between clients still comes through easily. It lives in typography, spacing, colour, and composition, not in rebuilding the foundations each time.

### The scales and the core components

The base kit is a defined, finite piece of work:

- **Type scale** in rem on a 16px root, with roles for display, body, and utility text.
- **Spacing scale** on a strict 4pt or 8pt grid.
- **Radius and elevation scales.**
- **Core components**, one at a time, every property bound to a token, every one using Auto Layout: Button (all states), Input, Card, Section, Container, Nav, Footer.

That is close to the industry guidance of shipping roughly twelve to sixteen components first and growing from there, rather than trying to build everything up front.

### The naming standard is an API

Names use forward slashes, lower case, and hyphens for multi-word names. For example `color/brand/primary`, `color/surface/card`, `color/text/heading`, `spacing/md`, `radius/lg`. Components are named `Category/Component/Variant`, such as `Button/Primary`. States (default, hover, active, disabled) are variants, not separate components.

Treat semantic names as a published contract. Once a name is in use, changing it breaks every client that inherits it. Do not invent names outside the standard, and ask before adding a token the standard does not cover.

### How Jeph actually builds it

Per our setup, the designer works in Claude Desktop, in the Cowork tab, with the Figma plugin installed. She never needs Claude Code or Git. Set expectations honestly here: the Figma write tool (`use_figma`) is in beta, works section by section, cannot place images, needs fonts that already exist in the account, and should be used on a duplicate file. Claude will not build the base kit unattended. Jeph designs and decides; Claude speeds up naming, scales, individual components, and auditing. The build is done in the order above, stopping to review after each step, then running the `/design-system` command over the file and fixing everything it flags. A single hardcoded colour or off-scale spacing value counts as a defect, not a detail.

The base kit then gets a single, deliberate sign-off. Our docs call this the most consequential approval in the whole system, because everything built afterwards inherits it.

---

## 4. The building blocks, explained for a beginner

These are the Figma features the design system is made of. All of the following is from Figma's own documentation.

- **Design tokens** are named values that store your team's core design decisions: colour, font size, spacing, border radius, shadow. They give you one source of truth and let you make a global change in one place.
- **Variables** are how you build tokens in Figma. A variable stores one raw value, and crucially a variable can reference another variable. That referencing (aliasing) is what turns variables into a tiered token system. There are four kinds: colour, number, string, and boolean.
- **Styles** are the older Figma feature. They store a combination of properties at once, such as a gradient or a stack of shadows, which a single variable cannot. In practice you use both: variables for the token structure and theming, styles for composite effects like gradients and multi-layer shadows.
- **Modes** let one variable hold different values for different contexts, such as light and dark. Important distinction for us: we use modes for variation within a single brand (light or dark, breakpoints), and we use Extended Collections for the switch between clients. Do not use modes as the client brand switch.
- **Components, variants, and properties.** A component is a reusable element. Variants group related versions of it (a button's states) into one set. Properties make components flexible without multiplying them: a boolean property toggles something on or off, a text property marks editable copy, an instance-swap property allows a nested piece to be swapped. The big beginner win here is to use properties and variants instead of building dozens of near-identical copies.
- **Auto Layout** arranges elements by direction, spacing, padding, and alignment, and reflows automatically when content changes. It is how a button grows with its label and how a design communicates responsive intent. Our standard is Auto Layout on everything, with absolute positioning reserved only for deliberate overlaps.
- **Naming.** Use the slash convention to group things (`Button/Primary/Hover`). Name a component for what it is, not for how it currently looks. Consistent naming is what keeps design and code speaking the same language.

---

## 5. Why the structure matters for our AI build

Our design system does not just make Figma tidy. It is the contract the AI reads through the Figma MCP server when it builds a site. Figma's own guidance on making a file "AI-ready" is, almost line for line, the same discipline our standard already enforces:

- Use variables for colour, spacing, radius, and typography, so the AI references a token rather than guessing a value.
- Componentise anything reused, so the AI reuses rather than reinvents.
- Name layers semantically (`CardContainer`, not `Group 5`), so the AI can infer roles.
- Use Auto Layout to communicate responsive intent.
- Keep selections small and focused, one component or section at a time, or the output degrades.

One honest caveat, because it differs by our build target. Figma promotes a feature called Code Connect as the single best way to keep generated code consistent, and it is, but only when there is real code to connect to. That applies to our future Astro and Payload target. Our default target is WordPress and Breakdance, which has no code components to bind, so there we replace Code Connect with a hand-maintained mapping table from Figma names to Breakdance settings. The naming bridge doing that job is, in our docs' words, "the whole game". It only works if the names are identical on both sides, which is why the naming standard is strict.

---

## 6. Common mistakes to avoid

From current, reputable sources, here is what goes wrong on a first design system and how our approach already guards against it:

- **Building too much too soon.** Ship a small core, learn, then grow. Our base kit is deliberately a short, finite list.
- **Variant explosion.** People build dozens of near-identical component copies. Use variants and properties instead. One inherited example in the research was a single button existing as sixty separate frames, later collapsed to one component with a couple of variants and three properties.
- **Hardcoded values.** A literal hex or an off-scale spacing number breaks the whole point of tokens. Consume everything as a variable. Our standard treats a hardcoded value as a defect.
- **No single source of truth.** If design and build drift apart, inconsistencies creep back. Our source-of-truth model and identical naming on both sides prevent this.
- **Skipping documentation and governance.** A system nobody documents or owns gets used inconsistently and quietly dies. Keep "good enough" notes and improve them from real questions.
- **Detaching components.** If you find yourself detaching a component often, that is a signal the component is missing something, not a workflow quirk. Treat a high detach rate as a warning to fix the component.
- **Over-gatekeeping.** A system with slow, heavy approvals gets worked around. Keep review light and quick.

Note that a design system is a living product, not a one-off project. It is never truly finished, and that is normal.

---

## 7. Our path, in two stages

### Stage one: learn (both of us, before we build)

We each learn the parts relevant to our role. Jeph goes deeper on the Figma craft. Craig gets enough to make the strategy and approval calls. See the resource list below for a suggested order.

### Stage two: build (once the AI web system and the Breakdance test are done)

This follows Prompt 3 in `START_HERE.md`:

1. **Audit and foundations.** Set up the three variable collections in tier order (primitive, semantic, component), then the type, spacing, radius, and elevation scales.
2. **Core components.** Build Button, Input, Card, Section, Container, Nav, Footer, one at a time, every property bound to a token, all on Auto Layout.
3. **Audit.** Run `/design-system` over the file and fix everything it flags.
4. **Approve.** The base kit gets its single, deliberate sign-off before any client build uses it.
5. **Mirror and teach.** Craig, in Claude Code, mirrors the approved tokens into Breakdane's settings with identical names, and we teach Claude Design our base kit through the Figma route so AI concepting uses our brand rather than generic defaults.

Per client after that: a new Extended Collection overriding only colour, type family, and radius. Never a new system.

---

## 8. Learning resources

Everything below was checked. Where something could not be fully verified, it is flagged. YouTube hides exact video lengths from automated checks, so any durations are approximate.

### Best place to start

- **Figma Learn, "Figma Design for beginners (2025)"** (free, works on the free plan). Absolute-beginner grounding in frames, Auto Layout, components, prototyping. Good warm-up before design systems.
  https://help.figma.com/hc/en-us/articles/30848209492887-Course-overview-Figma-Design-for-beginners-2025
- **Figma Learn, "Introduction to design systems"** (free course, about two hours, written lessons plus videos). Concepts, then building, then documenting. This is the single best structured starting point.
  https://help.figma.com/hc/en-us/articles/14552901442839-Overview-Introduction-to-design-systems
  Lesson 3, building the system: https://help.figma.com/hc/en-us/articles/14548865734679-Lesson-3-Build-your-design-system

### YouTube (prefer 2023 onward, because Figma Variables changed everything)

- **Figma, official "Build it in Figma: Create a Design System" series.** Foundations, then components. The safest, most current watch-first pick.
  Foundations: https://www.youtube.com/watch?v=EK-pHkc5EL4
  Components: https://www.youtube.com/watch?v=9xUXTFzDDCo
  Components continued: https://www.youtube.com/watch?v=XCsVDvvlz4E
- **Figma, "A Guide to Auto Layout: Best Practices, Tips and Tricks."** Single-topic Auto Layout guide from a Figma advocate.
  https://www.youtube.com/watch?v=1odqpkfkDL8
- **UI Collective, "Build a Design System! Ep. 1: Figma Tokens and Variables Setup"** (Aug 2024). Colour scales, typography, spacing, radius and border tokens as Figma Variables.
  https://www.youtube.com/watch?v=HNJmWKndUA4
- **UI Collective, "Design System and Figma Variable Set Up, Full Tutorial"** (Jul 2025). End-to-end Variables setup. The most current single walkthrough here.
  https://www.youtube.com/watch?v=L-tpK7Eeuow
- **Sergei Chyrkov, "Figma Variables Explained! Build a Scalable Design System Step by Step."** Good for the "why" behind Variables.
  https://www.youtube.com/watch?v=tvObuIcAooE
- **DesignWithArash, "Master Auto Layout in 30 Minutes (plus Practice File)."** Auto Layout drill with a practice file.
  https://www.youtube.com/watch?v=rgbnAsmPaZk
- **TD Sunshine, "Figma VARIABLE MODES, design tokens tutorial"** (Jun 2023). Good on modes for light or dark and multi-brand. Flag: this is the oldest item here, so confirm the interface has not shifted before following exact clicks.
  https://www.youtube.com/watch?v=fB-4ikrt3mk

### Free full course

- **freeCodeCamp, "Create a Design System with Figma, Full Course"** (Heather Jones). One long, free, structured build covering tokens, variables, colour scales, type, dark mode, multi-brand, components.
  https://www.youtube.com/watch?v=RYDiDpW2VkM

### Reading (good for Craig especially)

- **Figma Blog, "Design system 102: How to build a design system."** Groundwork, then foundations, then building. Strong strategy view.
  https://www.figma.com/blog/design-systems-102-how-to-build-your-design-system/
- **Figma Reports, "Design systems 101," four free eBooks.** Getting started, building, driving adoption, measuring return. The adoption and ROI framing is useful for the owner.
  https://www.figma.com/reports/design-system-series/
- **Figma reference docs**, worth bookmarking:
  Variables: https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma
  Auto Layout: https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout

### Wiring the system into the AI build (for later, mainly Craig)

- **Figma Blog, "Introducing our MCP server."** How AI tools read Figma component, variable, and spacing context.
  https://www.figma.com/blog/introducing-figma-mcp-server/
- **Figma Learn, "Guide to the Figma MCP server."** The how-to: enabling the server, `get_variable_defs` to extract tokens, Code Connect.
  https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server

### Flagged, not fully verified (use with a check first)

- IntoDesignSystems, "Learn the Figma MCP Server" (existence seen in search only): https://www.intodesignsystems.com/blog/learn-figma-mcp-server
- LogRocket, "How to structure Figma files for MCP and AI code generation" (search only): https://blog.logrocket.com/ux-design/design-to-code-with-figma-mcp/
- figma/mcp-server-guide, official GitHub repo (search only): https://github.com/figma/mcp-server-guide
- Molly Hellmuth, "Design System Bootcamp" on Maven (paid cohort, reputable name, confirm price and dates): https://maven.com/ui-prep/design-system-bootcamp
- Heather Jones' own-site full course had an expired security certificate when checked, so use the freeCodeCamp version above, which is the same instructor.

### Suggested order

Jeph: Figma Design for beginners, then Introduction to design systems, then the Figma "Build it in Figma" series, then the UI Collective Variables tutorials.

Craig: Design system 102 and the Design systems 101 eBooks for the strategy and approval view, then the MCP blog and Learn guide when we wire it into the build.

---

## 9. How this note was made

This note combines two things: a read of our own AI Web Design System documents (chiefly `START_HERE.md`, `docs/22_design_system_reuse_model.md`, `docs/pilot-artefacts/02` and `03`, `docs/03_designer_workflow.md`, and `docs/07_figma_mcp_setup_and_handoff_contract.md`), and web research into current best practice and learning resources. The best-practice and resource claims are drawn from Figma's own documentation, Nielsen Norman Group, EightShapes (Nathan Curtis), Brad Frost, and Martin Fowler, with practitioner sources used only where they agreed with those. Anything that could not be fully verified is flagged as such above.
