# Agency Operating Model  

This agency “operating system” organizes collaboration between design and development around clear roles, tools, and checkpoints. Designers own *creative direction* and user experience, while developers own *technical implementation* and quality. AI (Claude Design/Code) is used to accelerate tasks (like generating mockups or code) but **never to replace human judgment**. For example, Claude Design can prototype visual ideas or generate style suggestions, but “it doesn’t claim to replace designers”. Likewise, Claude Code can draft code or update components, but all changes require human review.  

Key elements of the operating model include:  

- **Roles & tools**: Designers work primarily in Figma and Claude Design; developers use Breakdance + Claude Code (with Novamira or MCP bridges for WordPress integration); PMs coordinate and define requirements. Each role has distinct responsibilities (see RACI matrix below).  
- **Source-of-truth systems**: The project brief and approved requirements form the initial source of truth; approved Figma files become the design source; version-controlled tokens/configuration act as the translation layer; the live Breakdance/WordPress site is the production truth; and the code repository/handbook is the technical truth. We ensure authority shifts unambiguously at each stage (design sign-off, code merge, launch) and record any deviations. For instance, a published Figma design is authoritative until development begins, after which the implementation (in code/Breakdance) is authoritative.  
- **Design system layers**: We use a multi-tiered design system. Core *agency foundations* (accessibility rules, spacing/grid scales, naming conventions, QA standards, common patterns) are shared everywhere. *Starter systems* (industry-specific templates) provide optional scaffolding for new projects (e.g. professional services, e‑commerce) but can be overridden. Each client has its own *brand layer* (colours, type, imagery, voice). Finally, *site-specific components* (unique layouts or interactions) live only in that project. Updates to foundations or starters cascade down, but brand/site layers are versioned per project to avoid breaking existing sites. This layered token approach (primitive → semantic → component tokens) ensures consistency while allowing customisation.  

**Embed:** A collaborative operating model ties these elements together, with designers, developers and AI each contributing at the right stage.  

 *Figure: High-level agency operating model. Designers and PMs define vision in Figma/Claude Design; Claude Code/Novamira bridge to Breakdance/WordPress for development. Checkpoints (gates) enforce approvals. (Image: Unsplash)*  

> *Sources:* Authoritative tool documentation and industry guides underpin this model. Claude Design and Figma are used for design intent; Claude Code and Novamira link to WordPress with controlled permissions. Breakdance supports visual building and client editing with “Client Mode” controls. A RACI framework (below) clarifies who does each task. Formal gate reviews at each phase (design signoff, development review, etc.) ensure quality. 


## RACI-Style Roles & Responsibilities  

The table below summarises each key activity, who does it, and what approvals or AI assistance apply. (R=Responsible, A=Accountable, C=Consulted, I=Informed.) Mandatory human approval is required for all decision points; AI (Claude) may assist by drafting content or code, but cannot finalize decisions. 

| **Activity**               | **R**                  | **A**            | **C**                            | **AI-assisted?**                                | **Approval**                     | **Deliverable**                | **Done when**                        |
|----------------------------|------------------------|------------------|----------------------------------|-----------------------------------------------|-----------------------------------|--------------------------------|---------------------------------------|
| **Discovery & requirements** – Gather client goals, audience and constraints. | Project Manager (PM) | PM               | Designer, SEO Specialist        | Yes – AI can research competitors, summarise briefs (e.g. using Claude Design or Web searches). | PM/client sign-off on brief      | Requirements document (scope, personas, objectives) | Client and PM approved requirements. |
| **Sitemap & content architecture** – Define pages, content types, SEO. | SEO/Content Specialist | PM            | Designer, Dev Lead              | Yes – AI can suggest site structures or content outlines, but outputs need review. | PM/design lead sign-off           | Sitemap diagram, content map       | Approved by PM/Designer and client.   |
| **Visual direction & style guide** – Establish look & feel, brand mood. | Lead Designer         | Design Lead      | PM, Client                      | Yes – Claude Design may generate moodboards or style proposals, under designer’s supervision. | Designer & client approval       | Style tiles, colour palette, typography guidelines | Client approves visual direction.     |
| **Design-system foundations** – Define global tokens, spacing scale, grid, conventions. | Design Lead           | Design Lead      | Dev Lead, QA                    | Partial – AI can list design token suggestions, but humans finalize naming/values. | Design Lead approval             | Figma styles & shared tokens (colours, fonts, spacing) | Tokens documented & synced to dev.   |
| **Client brand layer** – Apply client branding (colours, fonts, imagery style). | Designer             | Client           | Design Lead                    | Yes – AI can adapt foundation tokens to brand (e.g. color variants) then reviewed. | Client approval                 | Branded component library in Figma  | Client signs off brand setup.         |
| **High-fidelity designs & components** – Create page designs, responsive layouts, interactive states. | Designer             | Design Lead      | PM, Dev                         | Yes – Claude Design can draft layouts or variants, but designer refines them. | Design Lead & client sign-off    | Approved Figma frames and components (desktop/mobile) | All approved with notes on interactions and A11Y. |
| **Accessibility requirements** – Ensure designs meet WCAG and local standards. | Designer/UX Specialist | Designer     | Dev Lead, QA                   | No – AI can flag issues, but accessibility decisions need human audit. | Design Lead/QA sign-off          | A11Y checklist entries (labels, contrasts)   | A11Y pass (manual/automated test).     |
| **Figma handoff prep** – Document components, assets, breakpoints, annotations. | Designer             | Designer         | Dev                           | Partial – AI might generate spec text from design, but human checks it. | Design Lead review               | Figma file with clear component names, styles, comments | File marked “Dev ready” per checklist. |
| **Component documentation** – Write usage notes for dev (in Figma or docs). | Designer             | Designer         | Dev                           | Yes – AI can draft usage docs, but developer verifies accuracy. | Design Lead & Dev review         | Spec sheets or figma notes          | Documentation complete and reviewed. |
| **Development planning** – Break design into tasks/​components. | Dev Lead/Engineer     | Dev Lead         | Designer, PM, QA              | Yes – AI (Claude Code) can help outline steps and generate code skeletons from design tokens. | Dev Lead & PM sign-off           | Development plan (tasks, priorities, timeline) | Plan accepted by team.              |
| **Breakdance setup & global settings** – Configure site (theme, globals). | WordPress Developer   | Dev Lead         | QA                            | Partial – AI can recommend defaults, but admin sets them manually. | Dev Lead review                 | Breakdance global styles/presets (buttons, forms, typography) | Verified staging site matches design. |
| **Component implementation** – Build Breakdance components/templates. | Dev                   | Dev Lead         | Designer, QA                  | Yes – Claude Code or Novamira can code sections from tokens, under “plan” mode. | Dev Lead sign-off                | Implemented Breakdance blocks per Figma components | Cross-page tests pass (styles match design). |
| **Responsive implementation** – Ensure layouts adapt to breakpoints. | Dev                   | Dev Lead         | Designer                      | No – AI can suggest media queries, but human tests and adjusts. | Dev Lead & QA approval          | Responsive variants (tablet/mobile templates) | Visual QA passes at all breakpoints.  |
| **Content population** – Insert final copy and images. | Content Specialist    | PM               | Designer, Dev                | No – content is provided by humans. | PM review                       | All pages populated with real content | Content approved by PM/client.       |
| **Forms & integrations** – Implement forms, chatbots, third-party APIs. | Dev                   | Dev Lead         | PM, QA                       | No – requires manual setup, though AI can draft code stubs. | Dev Lead review                 | Working forms and integrations    | QA confirms functionality.          |
| **SEO implementation** – Add meta tags, semantic markup. | SEO Specialist       | SEO Specialist   | PM, Dev                      | Partial – AI can suggest meta copy, but SEO specialist verifies. | SEO & PM review                 | Completed SEO checklist in code   | SEO passes audit (e.g. Yoast/SEOPress). |
| **Analytics & tracking** – Configure analytics tools. | Dev                   | Dev Lead         | PM, QA                       | No – implemented manually. | Dev Lead & PM sign-off           | Analytics scripts installed       | Test events fire correctly.          |
| **Performance & security** – Optimize speed and harden site. | Dev                   | Dev Lead         | QA                          | Yes – AI tools can suggest optimisations, but dev applies fixes. | Dev Lead & QA sign-off          | Performance tuning (caching, minification); security plugins | Speed and security scans pass.      |
| **Testing (functional & A11Y)** – QA testing, browser checks. | QA                   | QA Lead         | Dev, PM                     | Partial – Automated tests (Lighthouse, axe) may use AI, but QA tests. | QA Lead approval                | Test reports                      | All critical bugs fixed.             |
| **Deployment & rollback** – Publish to production, prepare rollback. | Dev                   | Dev Lead         | PM                          | No – manual or CI/CD process. | PM final approval               | Live site updated; version tags    | Smoke test confirms live site.      |
| **Client training & documentation** – Show client how to edit. | Dev/PM                | PM               | Designer (for style)       | No – human demo and docs. | PM/Client sign-off              | Training materials; client can edit in Breakdance “Client Mode” | Client confirms they can manage content. |
| **Post-launch maintenance** – Ongoing support. | PM                   | PM               | Dev, Designer             | No – retainer-managed. | PM updates                       | Issue logs, updates            | SLA metrics met.                    |

**Notes:**  
- **AI-assisted activities** are indicated above. Claude can speed up repetitive tasks (drafting copy, generating code from tokens, suggesting design variants) but **humans must approve** all outputs. For example, Claude Code’s “plan” mode can propose code, but developers confirm and execute it.  
- **Mandatory human approval:** Every major deliverable (brief, sitemap, style guide, Figma designs, code merges, accessibility compliance, etc.) requires sign-off by the specified accountable person and often the client. Skipping approvals is prohibited as it risks rework and misalignment. In project management terms, each phase ends with a go/no-go gate to ensure quality.  
- **Deliverables & completion criteria** are defined above. We ensure *one accountable person per task*, and consult cross-functional experts as needed. This RACI-style matrix aligns with industry best practice for clarity and avoids overlap.  



## Designer Workflow  

1. **Interpret brief & research**: The designer reviews the approved project brief and any user/client requirements. They research the client’s brand, audience, and competitors (with help from Claude Design or web searches as needed) to inform design direction.  
2. **Choose design foundation**: Select an appropriate *design-system foundation* for the client (e.g. starting from agency spacing scale, colour system, typography). If the client falls into a known category (e.g. professional services, healthcare), the designer may start from an existing *starter system* template to speed up work, but it’s treated as a draft that will be customised.  
3. **Establish visual direction**: Create moodboards or style tiles showing colour palette, fonts, imagery style, and component examples. Claude Design can generate variations of moodboards or suggest colour palettes to spark ideas, but the designer curates and finalises the look. Designer documents these in Figma, then obtains stakeholder approval (e.g. client sign-off) before proceeding.  
4. **Design high-fidelity layouts**: Build the site pages in Figma at full fidelity. This includes defining desktop, tablet and mobile versions. Designers use the agency’s token system (global styles and component library) as the basis, then layer on client-specific branding. All components, typography, spacing, and colours are defined using Figma Styles (tokens) and Components. Claude Design may assist by proposing page layouts or repetitive patterns, but designers adjust them for polish.  
5. **Establish responsive rules**: In Figma, clearly specify breakpoints and how elements reflow (e.g. which elements stack or hide on mobile). Document any fluid spacing or content length assumptions. Designers do not rely on AI for responsiveness; they manually ensure layouts make sense at each breakpoint and document the behaviour.  
6. **Define interactions & states**: Specify all interface states (hover, active, focus, form validation, etc.) and interactions (modals, accordions, etc.) within Figma. Describe keyboard navigation and accessibility considerations (labels, alt text placeholders). Designers ensure the design meets WCAG contrast guidelines and label forms properly. AI tools can check color contrast or generate alt-text suggestions, but the designer verifies them for accuracy and context.  
7. **Prepare design system artifacts**: Finalize all Variables (tokens), Color Styles, Text Styles, Effects, and Components in Figma. Ensure naming is consistent with agency conventions. Write documentation in Figma (notes or separate spec sheets) for each component: when to use it, what props it has (e.g. options of a button), and any exceptions. Claude may draft initial spec text from design, but designer edits it.  
8. **Asset preparation**: Export necessary design assets at correct resolutions (images, SVG icons) into appropriately named folders. Designers optimise images for web (compression, format). Claude could suggest image crops or quality settings, but designers check the results.  
9. **Mark frames “dev-ready”**: In Figma, mark all frames and components as ready for handoff (e.g. use a tag or color label). Run a self-check: all text styles, colors, and components must have final names; there should be no off-layout layers. Designers ensure every element has a defined role (so Breakdance can reproduce it) and no “hidden” info.  
10. **Respond to developer questions**: During development, developers may ask clarifying questions. The designer is responsible for answering, referring back to the approved designs. Minor design tweaks requested by devs (due to technical constraints) should be reviewed and documented by designers, not applied automatically.  
11. **Review implementation**: Once the site is built, the designer tests it against the Figma designs. Any unintentional deviations are logged as bugs. The designer approves any differences that are intentional (for performance or technical reasons) and updates the design documentation if needed.  

**What designers need to know (not learn deeply):** Breakdance’s key capabilities/limits (e.g. it’s a visual builder that uses a flexbox/grid system – designers should not design layouts that Breakdance can’t handle, like overly complex custom scripts). Designers should understand that all layouts can be edited natively later in Breakdance and that client “Client Mode” will later restrict style edits. They should respect spacing scales and avoid unnecessarily exotic fonts or images (as these can bloat performance). For accessibility, designers follow standard WCAG guidelines (alt-text, contrasts) – they do *not* need to become WP developers but should be aware of form label requirements and dynamic content flows.  


## Developer Workflow  

1. **Review approved designs**: The developer studies the final Figma file. They verify every component, style, and interaction is clearly documented. If the developer finds any ambiguous or impractical design (e.g. pixel-perfect grid that won’t translate easily), they flag it now.  
2. **MCP inspection via Figma**: Using Claude Code’s Figma MCP integration, developers can capture designs or copy design tokens directly into their environment. The Code Panel in Figma lets devs inspect CSS/Swift/XML for components. They extract design tokens (colors, fonts, spacing) and confirm them. If needed, they use Claude Code to convert those into token files or CSS variables for Breakdance.  
3. **Map components to Breakdance**: For each design component, the dev determines how it will be implemented in Breakdance (e.g. “This 2-column section maps to a Breakdance Section + Column element”). They note any custom requirements (e.g. a composite element that may need a Breakdance symbol).  
4. **Set up global styles & presets**: In Breakdance’s global settings, the dev configures global typography, colours, form styles, etc., mirroring the Figma Styles. This preserves native editability. They create Breakdance Presets for repeated elements (buttons, headings) so content editors can choose them. All global values come directly from design tokens to keep consistency.  
5. **Implement templates and pages**: Using Breakdance’s theme builder, the dev creates templates (header, footer, home, blog list, etc.) and pages. They build the layout using native elements (Sections, Columns, Loop Builders for lists) so the output remains editable. They use Breakdance’s “Element Studio” only if a truly custom element is needed. They ensure dynamic data (menus, post loops) uses Breakdance Dynamic Data features.  
6. **Preserve editability**: At all times, the dev avoids locking content. Text should remain text layers, not images. Layouts use flexible containers (flex/grid in Breakdance) so editors can adjust content length or order. The dev avoids inline styles that editors can’t change.  
7. **Document deviations**: If the dev must diverge (e.g. using a different approach for performance or constraints), they document the rationale in code comments or the project doc. This ensures designers know why the live site may not exactly match Figma.  
8. **Responsive and cross-browser testing**: The dev tests each breakpoint. They may tweak CSS in Breakdance to match the design’s responsive behaviour. Accessibility checks (aria labels, focus order, keyboard navigation) are done – AI tools like Lighthouse or axe can assist but dev ensures fixes. Performance testing (page speed, image optimization) is performed (Breakdance’s lightweight code usually helps).  
9. **Provide feedback to designers**: If a design proved impossible, the dev proposes alternatives (with mockups or notes). For example, if an image gallery’s intended animation isn’t supported, the dev shows a live proof-of-concept. Designers then approve or adjust.  
10. **Prepare deployment**: The dev sets up version control (Breakdance sites can export to Git or use WP migrations) and staging domains. They create backups (both WP export and code snapshots). A rollback plan is documented.  
11. **Document the site**: The developer or tech writer creates a brief doc outlining the site architecture, how to create new pages using the templates and components, and any custom fields. This includes any Shortcodes, Forms, or ACF fields used.  
12. **Ongoing support**: The dev ensures future pages can be added by content teams using the same pattern. They train the client (or staff) on editing content in Breakdance’s client mode.  

**Constraints:** Claude Code and tools like Novamira can write to the WordPress site, but developers should use *manual/plan* permission modes by default. Production changes via AI must always be reviewed and tested. Local development (using Git) is preferred over live edits.  

> *Fact:* The Breakdance “Client Mode” feature lets clients edit only text, images, and links – “design changes are off limits”. Developers will use this to define what clients can change post-launch (e.g. content editors can swap images or update text without altering layout). 


## Designer–Developer Handoff Specification  

A smooth handoff requires a complete Figma package. The **developer-ready Figma file** must include:  

- All approved **page frames** (desktop, tablet, mobile) for each template.  
- **Page status** labels (e.g. “Approved”, “Draft”) so developers know which are final.  
- **Components and variants** for UI elements (buttons, cards, forms, etc.), with clear naming.  
- **Global styles and tokens** (Typography, Colors, Spacing, Effects).  
- Defined **spacing rules** (margins, gutters) and **breakpoints**.  
- Documented **responsive behaviour** (notes on how elements reflow).  
- **Interaction states** (hover, focus, disabled) and **form states** (error, success).  
- **Content length assumptions** (e.g. “heading up to 60px height”, or sample character counts) for text elements.  
- **Image behaviour** (e.g. “cover”, “inline”, lazy-loading notes).  
- **Accessibility notes** (e.g. “ensure alt tags”, “heading order”).  
- Clear identification of **reusable vs page-specific elements**.  
- Any **animations/motion** requirements (described or linked to prototypes).  
- All **assets** (icons, logos, images) exported or marked for export.  
- A list of **unresolved questions or TODOs**.  
- The **client approval status** for each deliverable.  

**Checklists:**  

- *Designer Handoff Checklist:* Ensure all above items are in Figma; run an automated style/token sync check; mark components as “dev ready”; commit the Figma file to the shared project.  

- *Developer Acceptance Checklist:* Verify presence of all frames, tokens, and component variants; check for consistent naming; confirm breakpoints and content notes; review any AI-generated specs for clarity. If anything is missing or unclear, reject the handoff for completion.  

**Change management:** If design changes occur after handoff, treat them as a new iteration. Document the change request, update the Figma file, and issue a new sign-off. Small CSS fixes in development can be noted but must eventually reflect back into Figma or a design deviation log.  

**Final design-versus-build review:** Before launch, the designer and developer jointly review the live site against Figma, using a checklist of all design details above. Any intentional deviations (e.g. performance-driven adjustments) are noted in a “Design Deviation Register” for client transparency.  

> *Source:* Figma’s developer handoff best practices emphasize using components, styles, and the code panel to minimize back-and-forth. Treating Figma as a “single source of truth” before development (and code as the truth after) avoids overwrites.  


## Source-of-Truth Lifecycle  

We define a staged “source of truth” (SOT) model so everyone knows which system controls each piece of information:

1. **Requirements SOT:** The signed client brief/requirements document (likely stored in the project repository or PM tool) is authoritative for scope and features. Only changes via approved change requests.  
2. **Figma SOT (Design Stage):** Once visual direction and components are approved, the Figma file is the design SOT. Designers shouldn’t manually update the live site to force a look; changes flow from Figma→code.  
3. **Design Tokens SOT:** The central repository of design tokens (e.g. a shared JSON or code library) acts as the translation layer between design and implementation. Tokens in Figma should sync to code so values remain in lockstep.  
4. **Code SOT (Dev Stage):** During development, the version-controlled code and Breakdance settings become the SOT for implementation details. Only after all QA and approvals does the site go live.  
5. **Production SOT:** The live Breakdance/WordPress site is the final SOT for content and functionality. After launch, any edits are made in Breakdance’s editor (or via hotfixes in code). Major design edits after launch require revisiting the Figma/design tokens layer.  
6. **Project repository SOT:** Throughout, the Git repo (or project files) holds the definitive code, config and documentation (including CLAUDE.md instructions and migration scripts).  

Transitions between stages are gate-controlled. For example, “authority moves” when the client approves the design (Figma SOT takes over) and when QA passes the site (production SOT takes over). The approver (designer, PM) signs off on each transition. Deviations are logged: if the live site differs from Figma, it’s recorded in the deviation register (with rationale). To avoid silent overwrites, we never re-import an old Figma into a live site without first reconciling changes.  

> *Insight:* Modern tools support bi-directional flow: Figma can import live pages (via Claude Code capture), and code can follow Figma. But we designate clear checkpoints: normally “Figma→code” until launch, then any “code→Figma” only happens if we intentionally update designs from actual UI (e.g. using the Figma plug-in to sync code back when needed).  


## Agency vs Project Design-System Model  

Our design system has distinct layers (inspired by Figma’s token hierarchy) to balance reuse and uniqueness:

- **Agency Foundations (core layer):** Global standards and tokens *shared across all projects*. This includes:
  - **Accessibility Standards** (WCAG guidelines, form label rules, keyboard behavior).  
  - **Spacing Scale & Grids** (e.g. an 8px base scale, 12-column grid logic).  
  - **Naming Conventions** (for tokens, components, CSS classes).  
  - **Interaction Conventions** (e.g. how primary buttons animate, form validation cues).  
  - **Quality standards** (performance budgets, SEO checklist items).  
  - **Common Patterns** (hero section, CTA block, card layouts).  
  These live in a *master design system* library (Figma Team Library or similar) that designers copy into each new project. We update foundations here and version-release them – clients get updates only if the team manually merges them into that project’s library.  
- **Starter Systems (accelerators):** Optional, narrow templates for industries (e.g. “professional services starter” with a businesslike style). These include a subset of components and placeholder tokens appropriate to that domain. Teams may clone a starter as a starting point, but they must override its brand layer tokens. Starters are stored separately and do not force changes on projects once copied.  
- **Client Brand Layer:** Unique to each client. Contains their *logo, brand colours, brand typography, tone of voice, icon style, imagery guidelines*. This layer is built into the project’s design library. None of these values are updated centrally after approval; they remain sandboxed. For example, a client’s signature red stays the same across their site, even if the agency’s “primary color” token changes.  
- **Site-Specific Components:** Finally, any *custom patterns or one-off interactions* live only in that site. These might be special hero animations or integration-specific widgets. They’re documented but not reused elsewhere.  

**Update flow:** Agency foundations can be updated globally (e.g. adding a new token). A project will incorporate foundation updates only if the team merges them in during maintenance (we do not auto-push changes to live sites). Brand and site layers are one-off; if the agency updates a core style (like spacing), we handle it per project.  

> *Example:* If we decide to change the base spacing unit from 8px to 10px in the foundation, we update the “Global Spacing” token. Projects using that token see the change if we pull a new library version, but any custom spacing (site-specific) is untouched. This ensures updates improve consistency without breaking client sites unexpectedly.  


## Multi-Project Governance & Security  

Managing many simultaneous sites requires strong isolation and consistency:  

- **Project naming & structure:** Each project has a unique codename (e.g. `clientname-YYMM`). Folders and repositories use that name. For example, `Figma Team` has a separate project file and library named after the client. Git repos are per-site. A global folder (or team library) holds shared assets.  
- **Figma organization:** Designers use a Figma Organization with teams for each client group. Shared assets (foundations, starter libraries) live in one org-wide library. Individual client files are only in their client’s team. Designers and devs are invited only to relevant teams to prevent cross-client leaks.  
- **Claude Projects and MCP:** Each WordPress site has its own Claude Code project (its own `.claude` folder). We list the project in Claude’s UI for that site. The `.mcp.json` config for connecting Claude to WordPress is stored per-project in version control, with its unique application-password and endpoint. Developers do NOT share one Claude project across multiple sites.  
- **WordPress environments:** We use separate WP environments for each client (different databases and domains). Staging domains follow a pattern (e.g. `staging-clientname.agency.com`). Credentials (WP admin accounts, API keys) are stored securely per-project (e.g. in the dev’s local `.claude/CLAUDE.local.md` or a secrets manager).  
- **Permissions:** Only project team members have access. Use Breakdance’s “Client Mode” to give clients limited editing rights (text and images only). Internally, designers have Figma Editor access, devs have code push rights, PMs have read or comment rights. Claude Code access is tied to personal accounts; we do not share tokens.  
- **Client data separation:** All content (text/images) is entered per client WP instance. We never import data from one client to another. If an AI tool has memory (Claude Code auto-memory), ensure it is scoped: do not feed one client’s content into another client’s prompts. In practice, we use separate Claude “projects” and CLAUDE.md files so context does not bleed.  
- **Skills and prompts:** The agency maintains a library of shared prompts and skills (in `skills/` under `.claude`) for generic tasks (e.g. “generate Call To Action copy”). Project-specific prompts (e.g. “use Client X style”) are kept in the project’s CLAUDE.md. We treat all prompts and skills as agency intellectual property, so even AI-generated text is managed as code under version control.  
- **Versioning & archiving:** Templates and common prompts are tagged with versions. Completed projects are archived (Figma files made read-only, repos tagged) so clients’ live sites remain unchanged unless deliberately updated. Access is revoked for users who leave.  
- **Data security:** To minimise AI context leaks, we avoid sending sensitive client data into AI tools unless necessary. For instance, when using Claude to summarise a client’s content, we exclude personal data. We train staff on AI data privacy.  

> *Risk note:* With multiple AI agents, there is a risk of one session “remembering” another. By scoping memory to the project (via CLAUDE.md and separate Claude projects) and disabling “web shortcuts” in Claude for confidential contexts, we ensure clients’ info stays isolated.  


## Claude Code & MCP Governance  

To standardize AI-assisted development, we organise Claude Code configuration into layers:  

- **Agency-level config:** In `/etc/claude-code/CLAUDE.md` or a global directory (managed by IT), we define broad policies and skills applicable to all projects. This includes coding standards (PEP8/PHP-CS-Fixer rules, sanitized input rules), Breakdance conventions, global security checks (e.g. “do not disable CSRF”), and library references (agency QA checklist, documentation format). These files load at the start of every session. We also manage organization-wide pre-approved “agents” or workflows (like a built-in code-review agent) here.  
- **Role-level config:** Each role has tailored instructions or skills. For example, a designer-facing Claude Code profile might have commands for inspecting Figma or generating moodboards, whereas a developer’s profile includes tools for running `npm` or testing performance. This can be done via separate CLAUDE.(role).md files or subagents. These are stored in the home directory and loaded by users in that role. They do not override project rules but provide general shortcuts (e.g. “/generate-component-doc” skill).  
- **Project-level config:** Every project repo has its own `.claude/CLAUDE.md`, `.claude/settings.json`, `.claude/.mcp.json`, etc. This contains the specific instructions and memory for that client (approved components, design tokens values, project directory structure). For example, the project CLAUDE.md includes “Use WordPress site X for testing”, “Breakdance theme Y conventions”, and any client-specific rules. The `.mcp.json` defines the URL and credentials of that WP site. These project files are checked into Git (except secrets which go in local ignored files).  

**Inheritance and isolation:** The load order is global → user → project → local. Project rules override user rules, and both override global defaults if needed. We avoid conflicts by not duplicating CLAUDE.md entries; for instance, project CLAUDE.md handles site-specific tokens, whereas global CLAUDE.md handles generic style rules. To prevent accidental overrides, critical paths (like the WP database or production branch) are marked protected in Claude Code’s permission settings.  

> *Example:* The agency-wide CLAUDE.md might say “Always sanitize user input in SQL queries”. A project CLAUDE.md adds “Client X uses ACF field `price` for product cost.” When a dev runs Claude Code, it sees both. For local testing, each dev has a CLAUDE.local.md to store personal sandbox URLs (which is in .gitignore).  

  

## Collaboration & Concurrency  

To handle simultaneous edits safely:  

- **Version control:** All code and project config is under Git. Developers branch for features; merge requests undergo code review. Figma has branching for major changes (invite-only drafts) or use version history. We avoid two devs editing the same page by coordinating tasks. If necessary, use feature branches and merge in Breakdance via theme export/import.  
- **Design changes during dev:** Once handoff is done, the design is “frozen” except for agreed changes. If a designer needs to update a pattern, they create a new version of the component in Figma and label the change request. The dev team evaluates impact and schedules it (often in a new sprint) to avoid derailing current work.  
- **Shared components:** If multiple pages use one component, a change by one designer requires the designer to mark it as global. Developers then update all instances. Communication (via comments or tickets) is key: any component update is documented so other team members know to pull the new version.  
- **Content changes:** If content edits come from the client mid-project, the PM logs them. Minor copy fixes are made in staging (since Breakdance “client mode” lets content editors change text). If changes affect layout, the designer reviews and possibly revises the design. We treat urgent content fixes as patch releases on staging first.  
- **AI vs Human conflicts:** Claude Code runs in a controlled mode. For example, if Claude suggests a code edit that conflicts with a human’s recent change, the developer reviews the suggestion manually. We instruct AI in “plan” mode rather than “auto” mode, so human must apply changes. In effect, the human is always “in the loop” to catch conflicts.  
- **Environment drift:** Local and staging environments are kept in sync via migrations. Before pulling code or data, devs reset their local WP to a known state (e.g. import a latest DB dump). We use migrations (WP CLI or plugins) so that changing a component in one environment is tracked.  
- **Concurrent MCp usage:** Only one Claude Code session should be active per WP site to avoid conflicting writes. We recommend developers coordinate (like unlocking a “working copy” check-out). Novamira’s WP plugin does not handle concurrent agents well, so we ensure one user at a time or use separate containers.  
- **After approval hotfixes:** If the client requests an urgent change post-approval, we follow a strict process: clone production to staging, make the change (with review), get fresh sign-off, then deploy. We log the change in the project documentation and update Figma only if it alters the design.  

> *Example:* Two devs editing the homepage would use separate branches and communicate. If one dev adds a global header element while the other modifies layout, they merge branches in Git. If conflicts, they resolve them together, guided by the agreed design.  

  

## Approval Gates  

We establish formal go/no-go checkpoints at every major milestone to prevent scope creep. For each gate, we specify the *owner* (who prepares evidence) and *approver* (who signs off), what artifacts are required, and the AI role:

1. **Project Brief Approval** – *Owner:* PM; *Approver:* Client & PM. *Evidence:* Signed brief or SOW document. *AI role:* (Prep: Summarising client info, extracting requirements.) *No AI approval.* *Consequence:* No dev work begins without it (scope or contract risk).  
2. **Sitemap/Content Architecture Approval** – *Owner:* PM/SEO; *Approver:* Client & PM. *Evidence:* Site map diagram and content plan. *AI:* Generate draft structure. *No AI approval.* *Consequence:* Misaligned pages or missed content.  
3. **Visual Direction Approval** – *Owner:* Lead Designer; *Approver:* Client (via design review) & Design Lead. *Evidence:* Moodboard or style tile presentation. *AI:* Moodboard ideas, style variants. *No AI final approval.* *Consequence:* Off-brand design.  
4. **Homepage Design Approval** – *Owner:* Designer; *Approver:* Client & PM. *Evidence:* Full homepage mockup (desktop/mobile), plus style guide. *AI:* Draft layout for review. *No AI final approval.* *Consequence:* Key UX errors propagate site-wide.  
5. **Design-System Foundations Approval** – *Owner:* Design Lead; *Approver:* Design Lead (or Committee). *Evidence:* Documented tokens/styles (color, type, spacing). *AI:* Token suggestions, copy of naming conventions. *AI cannot finalize values.* *Consequence:* Inconsistent UI foundations.  
6. **Full Figma Handoff Approval** – *Owner:* Designer; *Approver:* PM & Dev Lead. *Evidence:* Complete Figma file (see handoff checklist). *AI:* Automated export of styleguide. *AI cannot approve completeness.* *Consequence:* Dev starts with missing info, causing rework.  
7. **Development Plan Approval** – *Owner:* Dev Lead; *Approver:* PM & Dev Lead. *Evidence:* Task breakdown, timeline, risk plan. *AI:* Draft task list from design tokens. *Consequence:* Poor planning or missed steps.  
8. **Global Breakdance Settings Approval** – *Owner:* Dev Lead; *Approver:* Dev Lead. *Evidence:* Config document listing global styles/presets matched to design. *AI:* None (manual dev task). *Consequence:* Mismatch between design tokens and site.  
9. **Reusable Components Approval** – *Owner:* Dev Lead; *Approver:* Dev Lead & Designer. *Evidence:* List of components built and their Figma counterparts. *AI:* Generate component code stubs from Figma. *Consequence:* Key components missing or duplicated.  
10. **Homepage Implementation Review** – *Owner:* Dev; *Approver:* Designer & QA. *Evidence:* Staging homepage on Breakdance. *AI:* Visual diff reports (if available). *Consequence:* Homepage bugs go live.  
11. **Subpage Implementation Review** – *Owner:* Dev; *Approver:* Designer & QA. *Evidence:* Sample subpages (blog, contact, etc.). *AI:* None (visual test by humans). *Consequence:* Sitewide inconsistencies.  
12. **Responsive Review** – *Owner:* QA; *Approver:* PM/QA. *Evidence:* Report of layout at all breakpoints. *AI:* Automated screenshot comparisons. *Consequence:* Broken mobile UX.  
13. **Accessibility Review** – *Owner:* QA; *Approver:* Dev Lead/Accessibility Expert. *Evidence:* A11Y audit report (contrast, labels, keyboard). *AI:* Automated accessibility scans (e.g. axe); *AI cannot certify compliance alone*. *Consequence:* Legal/compliance risk.  
14. **Pre-launch Review** – *Owner:* PM; *Approver:* Client & PM. *Evidence:* Final staging demo, test results (performance/SEO). *AI:* Generate site summary report. *Consequence:* Launch with critical issues.  
15. **Production Deployment Approval** – *Owner:* Dev Lead; *Approver:* PM. *Evidence:* Rollback-ready deployment plan. *AI:* None (dev-led action). *Consequence:* Risky code push without plan.  
16. **Post-launch Verification** – *Owner:* Dev/QA; *Approver:* PM. *Evidence:* Live site checks complete (analytics tracking, performance baseline). *AI:* Monitor uptime and errors. *Consequence:* Missed post-launch defects.  

> *Gate reviews are standard best practice* – by checking criteria at each stage, we “protect budget and deliver value” rather than blindly pushing forward. AI can prepare drafts and reports for each gate, but only **humans approve**.  


## Training & Adoption Plan  

We roll out this system in phases, with training for each role:

- **Initial setup:** IT/project lead installs necessary tools (Figma licences, Breakdance plugin, Claude Code, Novamira if used). They configure shared libraries (Figma Team Library for foundations) and set up a demo project.  
- **Designer training:** Workshops on the new workflow: how to use Claude Design (prompting, iterating designs), how to organize Figma (libraries, version history, code panel), and how to prepare handoff packages. Include hands-on on using AI safely (e.g. “verify all outputs”). Provide cheat-sheets on design tokens and Breakdance constraints (responsive rules).  
- **Developer training:** Sessions on Claude Code usage (especially permission modes and .claude management), on integrating with Breakdance (using Novamira or native tools), and on how to import Figma specs into code (via tokens or MCP). Cover the new branching/deployment process and client mode controls.  
- **PM training:** Train project managers on drafting briefs, writing CLAUDE.md rules (for project memory), and monitoring AI usage costs. Emphasize governance: how to run gate reviews and keep documentation.  
- **Security training:** Include a module on AI safety (no sensitive data in prompts), and on WordPress security in Breakdance (use latest WP version, secure passwords, etc.).  
- **Prompt-library training:** Demonstrate the shared prompt library and how to add project-specific prompts. Encourage writing short, explicit prompts; show common anti-patterns.  
- **Pilot projects:** Start with a pilot on a low-risk client: apply AI only to research and planning (Prompting → Figma Ideas). In the next pilot, add Claude Code for dev planning. Only in the third pilot allow Claude to generate code under strict review. Collect feedback each time.  
- **Competency checks:** After training, have staff complete a checklist: e.g. “Can you create a CLAUDE.md and run a session?” “Can you extract tokens from Figma?” “Can you run a performance audit?” Address gaps with refreshers.  
- **Documentation & support:** Maintain a central guide (in wiki or project repo) on all processes above. Assign a “process owner” (maybe a lead PM) to update docs as tools evolve. Establish an internal support channel (e.g. a Slack channel) for quick questions during the pilot.  
- **Staged adoption:** Follow a maturity model:
  1. *Learning:* Staff use AI only for research/prompts.
  2. *Design integration:* Designers use Claude Design previews; devs use Claude Code for planning.
  3. *Test implementation:* Small sections coded with AI, but with full human review.
  4. *Standard process:* AI assists in every stage under documented rules.
  5. *Review:* The team constantly audits AI outputs; we never jump to full automation of any step.  

**Key:** Do not move to full automation before proven success in pilots. Each phase requires sign-off before proceeding to the next tool capability.  


## Performance Measures  

We track metrics on each project to verify real improvement (not just AI-generated volume). Key measures include:  

- **Effort metrics (before vs after):** Log total design hours, development hours, and PM hours on similar past projects. Compare with AI-assisted projects. Expect lower hours on routine tasks (e.g. wireframing, code scaffolding), with quality maintained or improved.  
- **Handoff quality:** Count “handoff questions” logged by developers (issues due to unclear designs) and number of design revisions after dev starts. A decrease indicates smoother handoff.  
- **Rework & defects:** Track number of fixes needed post-launch (design mismatches, code bugs, accessibility issues). AI should *not* increase defect rates.  
- **Accessibility & responsiveness:** Number of accessibility violations or responsive layout errors found in QA. These should be zero (or at least not higher than without AI), since we enforce A11Y reviews.  
- **Performance:** Use tools like Lighthouse to measure page speed before and after. Ensure AI-driven code is as performant as hand-coded (Breakdance tends to be fast).  
- **Consistency:** Manually audit pages for consistent use of styles/components. Well-implemented tokens should yield highly consistent UI.  
- **Client satisfaction:** Survey clients after launch on design quality, speed of delivery, and any AI-related concerns.  
- **Staff satisfaction & learning:** Survey designers/devs on whether AI tools made work easier or introduced friction; track time spent on training.  
- **Financials:** Compare gross margin and time-to-delivery on projects (shorter cycles with equal or higher quality should improve margin).  
- **AI cost:** Monitor Claude/Novamira usage charges vs value gained (e.g. time saved).  
- **Skill reliance:** Track if output is overly dependent on any one expert (we should avoid “only Alice knows how to use Claude”). Training and process docs should reduce this risk.  
- **Quality of AI suggestions:** For a sample of AI-generated work, record % of suggestions requiring major correction. Ideally this declines as staff refine prompts.  

Importantly, we look for actual quality improvements (fewer defects, more reuse) rather than *just* faster first drafts. AI should reduce drudgery and errors, not produce a messy output at speed.  

> *Bottom line:* If AI use merely generated more draft content that took hours to fix, that’s not success. We measure end-to-end delivery speed, defect counts, and client satisfaction to ensure the workflow truly adds value.  


## Deliverables and Governance Outputs  

We produce the following artifacts to enact this system:  

- **Operating-Model Diagram:** A visual flow (as above) showing roles, tools, and handoff gates.  
- **RACI Matrix:** A table (as above) mapping tasks to roles and approval points.  
- **Designer Workflow Guide:** A step-by-step workflow (text and checklist) describing each design stage and AI usage rules.  
- **Developer Workflow Guide:** Similarly, a development process with coding standards, Breakdance setup, and AI tool guidelines.  
- **Handoff Checklists:** Formal lists for designers to submit and developers to verify a “dev-ready” design (see *Designer-to-Developer Handoff* above).  
- **Dev-Ready Figma Definition:** A concise spec of all required Figma elements and statuses (as above in Handoff Spec).  
- **Source-of-Truth Model:** A chart or table outlining which system is authoritative at each stage and how authority transitions (described above).  
- **Approval Workflow:** A list of project phases with required sign-offs and evidence (as detailed in *Approval Gates*).  
- **Design-System Model Diagram:** A diagram showing the four-layer model (foundation → starter → brand → site).  
- **Claude Code Config Inheritance Diagram:** A schematic showing agency/user/project/local CLAUDE.md cascading (based on).  
- **Security & Data Policy:** A written policy on credentials management, environment separation, AI data handling (partially outlined above).  
- **MCP Permissions Model:** Guidelines on how Claude/Novamira credentials are managed per user/project (including .mcp.json in version control, and access controls).  
- **Change-Management Procedure:** Steps for handling post-approval changes (in *Collaboration* above).  
- **Design Deviation Register Template:** A table template to log intentional design vs. build differences (columns: Description, Rationale, Approved by).  
- **Training Plan & Competency Checklist:** As above in *Training & Adoption*, plus a checklist (e.g. “I can use Claude Code with manual mode”, “I can add a token to Figma and extract it”).  
- **Pilot Rollout Plan:** A schedule outlining 3 pilot projects of increasing complexity (e.g. small brochure site → medium e-commerce → complex portal) with stage gates.  
- **Performance Scorecard:** A living spreadsheet tracking the metrics listed above across projects.  
- **Process Review Schedule:** A calendar or plan for revisiting this workflow (e.g. quarterly retrospectives).  
- **System Ownership Matrix:** Who maintains what (e.g. Design Lead owns style library, Dev Lead owns repository and builds, PM owns process docs, CTO/IT owns Claude/Novamira setup).  

By producing these documents and tools, the agency ensures that the AI-augmented process is transparent, trainable, and measurable. 

