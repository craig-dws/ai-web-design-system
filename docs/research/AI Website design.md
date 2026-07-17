# **Master Directive: Agency-Scale Agentic Web Dev Stack (Mid-2026)**

The web development landscape of mid-2026 is defined by the maturation of the Model Context Protocol (MCP), a standardized architecture allowing localized artificial intelligence agents to autonomously interact with cloud-based design repositories and remote server runtimes1. For digital marketing agencies, this paradigm shift replaces manual transcription of design variables with bidirectional, agent-driven infrastructure. The optimal stack for this operation pairs a local orchestration engine (Claude Code) with a design ingestion pipeline (Figma MCP) and a remote execution environment powered by the Breakdance Builder ecosystem on WordPress.  
Bridging these environments safely requires sophisticated middleware, specifically a WordPress MCP server such as Novamira, which translates natural language orchestration into functional PHP execution and database manipulation1. This directive outlines the exhaustive technical architecture, exact command-line operations, prompt engineering strategies, and mandatory operational guardrails required to establish a secure, agency-scale autonomous deployment pipeline.

## **Phase 1: Agency Toolchain Setup**

The efficacy of an agentic pipeline relies entirely on the security and latency of the communication channels established between the orchestration engine, the design repository, and the remote staging environment. The following subsections detail the strict configuration parameters for each node in the stack.

### **The Orchestration Engine: Claude Code and Figma MCP Configuration**

Claude Code serves as the central command-line interface orchestration engine. Running locally on the developer's machine, it routes intents between the designer's Figma canvas and the staging server's execution environment. To ingest structured design data, the orchestration engine must interface with the official Anthropic Figma MCP plugin.  
Figma provides two primary MCP server architectures: desktop and remote. The desktop architecture, operating on a local port, is artificially bottlenecked for free users and requires the active presence of the Figma desktop application5. Conversely, the remote server architecture is mandatory for agency collaboration, as it bypasses local application dependencies, avoids strict usage limitations, and exposes advanced canvas-write capabilities5. By installing the official plugin from Anthropic's marketplace, the remote server is configured automatically, bringing agent skills for common workflows directly into the terminal environment5.

Bash  
npm install \-g @anthropic-ai/claude-code  
claude plugin install figma@claude-plugins-official  
claude  
/plugin

Executing these commands initializes the installation, after which the developer navigates to the Installed tab within the CLI interface and triggers the OAuth authorization page5. Upon successful authentication, Claude Code gains access to a suite of critical Figma MCP tools. Tools such as get\_design\_context return framework-specific code for selected frames, while get\_variable\_defs extracts the raw design system tokens (colors, typography, spacing) required for downstream builder configuration9.

| Figma MCP Tool | Operational Function within the Agency Pipeline |
| :---- | :---- |
| get\_design\_context | Extracts structural hierarchy, auto-layout parameters, and bounds for a selected node. |
| get\_variable\_defs | Retrieves the precise design variables and styles bound to a Figma selection. |
| get\_screenshot | Captures a visual reference of the selection, crucial for allowing the AI to visually verify spatial relationships. |
| generate\_figma\_design | A remote-only tool enabling the agent to write generated UI back to a Figma canvas. |
| get\_code\_connect\_map | Retrieves mappings between Figma node IDs and corresponding components in the codebase. |

For agencies requiring advanced, project-wide variable management outside the scope of the official plugin, third-party solutions such as figma-console-mcp can be deployed via npx to enable bidirectional token synchronization and comprehensive design system extraction11.

### **Staging Environment Specifications and WordPress 7.0 Integration**

The staging environment must be explicitly architected to support bidirectional AI interactions while mitigating the severe risks associated with autonomous code execution. By mid-2026, WordPress 7.0 finalized the integration of the Abilities API, fundamentally altering how artificial intelligence interfaces with the core platform4. While the standard WordPress AI Client API handles outbound tasks (e.g., generating content via a third-party LLM), the Abilities API handles inbound tasks, allowing external agents to query capabilities and execute registered tools directly within the WordPress runtime4.  
The staging server must adhere to strict infrastructure prerequisites to support this framework safely. The environment demands PHP 8.1 at a minimum, though PHP 8.4 is fully supported and recommended for environments running Breakdance 2.816. Furthermore, HTTPS is strictly mandatory. The WordPress Application Password system, which serves as the authentication backbone for incoming MCP requests, will categorically refuse to generate or transmit credentials over unencrypted HTTP connections unless a specific local development override is explicitly defined in wp-config.php1.

| Infrastructure Requirement | Specification | Rationale for Agentic Workflow |
| :---- | :---- | :---- |
| Core Version | WordPress 6.9+ (7.0+ Recommended) | Mandatory for native Abilities API support and tool registration. |
| PHP Runtime | PHP 8.1 \- 8.4 | Required by Breakdance AI and cryptographic standards. |
| Security Protocol | Strict HTTPS | Mandatory for Application Password generation and secure transport. |
| User Permissions | Administrator Role | Required to grant the manage\_options capability to the MCP agent. |

### **WordPress MCP Server Integration: Novamira Deployment**

To translate Claude Code's orchestration into WordPress manipulation, a robust MCP server must be installed on the staging environment. Novamira operates as this crucial middleware. Unlike traditional REST API integrations that offer a restrictive menu of predefined actions, Novamira provides the agent with direct access to the PHP runtime, WP-CLI execution, database querying ($wpdb), and full filesystem traversal1.  
Deployment begins by installing the Novamira plugin via the standard WordPress administrative interface. Upon activation, the developer must navigate to the Novamira settings panel and explicitly enable "AI Abilities"1. This crucial step registers core primitives such as execute-php, write-file, and read-file with the WordPress Abilities API, making them discoverable to connected agents4.  
To finalize the connection, the developer generates a new Application Password specifically designated for the AI agent1. The Novamira dashboard provides an auto-setup prompt containing the secure endpoint and credentials. Pasting this prompt into the local Claude Code terminal allows the agent to autonomously generate its own MCP configuration file, restart the session, and immediately begin mapping the active WordPress environment1.

### **Alternative Infrastructure: InstaWP and InstaMCP Evaluation**

For agencies seeking to eliminate server configuration overhead, InstaWP presents a highly viable, managed alternative. InstaWP provides rapid provisioning of staging environments and ships with an integrated MCP server known as InstaMCP (version 1.1)2.  
InstaMCP allows connections to 13 distinct AI clients with a single toggle, bypassing the need for manual plugin installation or application password generation2. The platform automatically generates a secure 64-character token and connection URL. For local development, the InstaWP CLI leverages WordPress Playground, utilizing WASM PHP and SQLite to instantiate disposable environments without Docker or MySQL dependencies21.

| Feature | Novamira AI (Self-Hosted Staging) | InstaMCP (InstaWP Managed Cloud) |
| :---- | :---- | :---- |
| Deployment Model | Manual plugin installation and configuration. | Single-toggle dashboard activation. |
| Authentication | WordPress Application Passwords. | Automated 64-character token generation. |
| Builder Expertise | Deep builder-specific tools (Novamira Pro). | Standard WordPress core toolsets. |
| Local Capabilities | Requires local server software (e.g., Nginx/Apache). | Runs via CLI using WASM PHP (Playground). |

While InstaMCP drastically reduces friction, Novamira Pro remains the superior choice for Breakdance-centric workflows. Novamira Pro encompasses dedicated architectural specializations for 30 distinct builders and plugins, including native integration with Breakdance's node trees, custom post types, and global settings, granting the agent end-to-end expertise rather than relying on generic PHP manipulation24.

## **Anomaly Detection: Risk and Blindspot Mitigation**

Relying on autonomous agents for structural web development introduces highly specific technical vulnerabilities. Executing a standard "happy path" without anticipating the architectural idiosyncrasies of visual builders will invariably result in pipeline failure. The following anomalies must be actively managed by the DevOps engineer.

### **The Breakdance Sandbox Trap**

Novamira's primary safety mechanism for file generation is a dedicated, crash-recoverable directory located at wp-content/novamira-sandbox/19. Files written to this directory are automatically loaded by WordPress via a must-use plugin loader. If a generated file causes a fatal error, Novamira's crash recovery detects the failure and soft-disables the file, ensuring the site remains operational24.  
However, this safeguard creates a fundamental trap when working with modern visual builders. Breakdance Builder does not rely on raw PHP templates for page construction. Instead, Breakdance stores its layouts, global blocks, headers, and templates as serialized JSON arrays within custom post types (e.g., breakdance\_template, breakdance\_header) and database options29. If an AI agent attempts to build a page by writing a standard PHP template file into the Novamira sandbox, Breakdance will completely ignore the file, and the visual interface will remain empty.  
To ensure Breakdance actually reads the AI-generated templates without breaking the WordPress database, the agent must be explicitly restricted from generating raw PHP layout files. Instead, the orchestration relies on three distinct interaction vectors. First, for global settings, the agent must generate a valid JSON configuration file and invoke Novamira's WP-CLI integration to run wp breakdance import\_settings, which safely parses and injects the JSON into the correct database options31. Second, for layout generation, the agent must leverage the Novamira Pro Breakdance specialization, which exposes dedicated MCP tools designed to interact directly with Breakdance's internal node structure and REST APIs24. Finally, when raw database manipulation is strictly necessary, the agent utilizes the execute-php tool to interact safely with Breakdance's internal PHP classes rather than writing static files3.

### **Figma Variable Drift and Differential Merging**

A critical workflow error occurs when a designer updates the Figma file after the initial WordPress build has been established. If the developer prompts the AI to broadly "sync" the changes, the agent is likely to extract the new Figma tokens, generate a fresh Breakdance JSON payload, and execute a blind wp breakdance import\_settings command. This action is destructive; it will instantly overwrite the entire active Breakdance configuration, destroying any custom developer logic, advanced clamp() functions, manually added CSS variables, or specialized Breakdance Elements configurations that were implemented in the interim29.  
To prevent variable drift and destructive overwrites, best practices dictate prompting Claude Code to perform a differential ("diff") update. The agent must first use the execute-php or WP-CLI tools to extract and read the active Breakdance settings JSON currently residing in the staging server's database31. Simultaneously, the agent extracts the updated variable definitions from Figma using get\_variable\_defs9. The orchestration prompt must explicitly mandate an Abstract Syntax Tree (AST) or JSON key comparison. The agent merges the arrays by updating only the specific values of matching token keys (e.g., brand colors, base typography) while rigorously preserving any unrecognized keys or developer-injected strings. Only after this differential merge is complete does the agent push the patched JSON back to the server.

### **Security Risks and Server-Level Kill-Switches**

The feature that makes Novamira indispensable—direct PHP runtime access—represents its most severe vulnerability. The execute-php tool bypasses standard filesystem sandboxes, running code with the full WordPress environment loaded, including access to the database via $wpdb and all active plugins4. An agent hallucination or a poorly constructed prompt could result in the execution of infinite loops, arbitrary database truncation, or the accidental deletion of core directories such as wp-admin or wp-includes4.  
Stringent operational security measures and permission scopes must be enforced at the infrastructure level to prevent the agent from accidentally wiping the staging server.  
First, Novamira must never be enabled on a production site containing live client data; it is explicitly architected for development and staging environments only1. Second, execution boundaries must be enforced. Novamira imposes a hard 30-second execution time limit on all direct code calls to prevent runaway PHP scripts from consuming server resources3. Third, the DevOps engineer must verify that Novamira's domain-locking verification is active. This defensive mechanism records the host domain upon activation; if a database is cloned or moved to a new environment, all AI abilities remain dormant until a human administrator manually re-confirms access, thereby preventing orphaned agent credentials from compromising live environments4. Finally, the operations team must maintain access to the manual safe mode kill-switch. By appending a specific safe mode flag to any URL, the server instantly skips all sandbox files and suspends execution, allowing human developers to safely debug and recover the environment following a critical agent failure27.

## **Phase 2: Design System Prompts & Pipeline**

The success of the deployment pipeline is predicated on the precision of the prompts used to govern the translation of visual assets into structural data. The following master prompts are engineered to guide the designer, the developer, and the layout generation systems deterministically.

### **The Initial Design Prompt**

To ensure the downstream pipeline functions without variable collision, the Figma file must be rigorously structured. The designer utilizes this prompt within Claude Code to scaffold the initial design system layout via the Figma MCP.  
\[ROLE: Elite Design Systems Architect\]  
OBJECTIVE: Scaffold a comprehensive, scalable Figma Design System optimized for automated ingestion via the Figma MCP server.  
DIRECTIVES:

1. Initialize a new Figma file and establish a centralized Local Variables collection.  
2. Define core design tokens using strict semantic naming conventions:  
   * Colors: color/brand/primary, color/surface/background, color/text/heading, color/text/body.  
   * Typography: Create explicit text styles defining font-family, font-size (in rem equivalents scaled at base 16px), font-weight, line-height, and letter-spacing for H1 through H6, and Body Large/Medium/Small.  
   * Spacing: Define an auto-layout spacing scale (e.g., spacing/xs to spacing/xxl) mapped to a strict 4pt or 8pt grid.  
3. Construct master components for global UI elements (Buttons, Cards, Inputs). Every component MUST utilize Auto Layout. Absolute positioning is strictly forbidden unless simulating overlapping z-index elements.  
4. Apply the newly created variables to all properties within the master components. The presence of hardcoded hex values or absolute pixel spacing will result in downstream pipeline failure.

Execute the create\_design\_system\_rules tool to output a DESIGN.md file capturing these structural conventions for all subsequent agent context in this repository.

### **The Translation Prompt**

This prompt is executed by the developer within Claude Code. It instructs the agent to extract the structured variables from Figma, translate them into the JSON schema expected by Breakdance, and inject them into the staging server via WP-CLI.  
\[ROLE: Senior DevOps Engineer & AI Orchestrator\]  
OBJECTIVE: Bridge the Figma Design System to the WordPress Breakdance environment while preventing destructive variable drift.  
CONTEXT: You are connected to the Figma MCP and the Novamira WordPress MCP on a staging server.  
DIRECTIVES:

1. Execute the Figma MCP tool get\_variable\_defs on the active Figma Design System file to extract all color, typography, and spacing variables.  
2. Execute the Novamira WP-CLI command wp breakdance export\_settings \--file=/tmp/current\_breakdance\_globals.json to retrieve the active site settings.  
3. Parse both the extracted Figma JSON payload and the current Breakdance JSON payload.  
4. Perform a differential merge. Translate the Figma variables into the Breakdance Global Settings schema. Ensure Figma typography maps to Breakdance's Global Typography settings, and Figma colors map to Breakdance's Global Colors array. You MUST retain any existing keys, custom CSS strings, or clamp() functions present in the current Breakdance JSON that are not explicitly updated by Figma.  
5. Save the merged output as breakdance\_globals\_sync.json locally.  
6. Using the Novamira write-file tool, upload this JSON file to the WordPress staging server.  
7. Using the Novamira WP-CLI integration, execute: wp breakdance import\_settings /path/to/uploaded/breakdance\_globals\_sync.json  
8. Execute wp breakdance clear\_cache to purge the CSS cache and force regeneration based on the new tokens.

Validate success by running wp breakdance status and confirm no errors are present.

### **The Page Generation Prompt**

Once the global settings are synchronized, the agent translates specific Figma frames into Breakdance structures utilizing Novamira Pro's deep builder knowledge.  
\[ROLE: Senior Frontend Developer\]  
OBJECTIVE: Generate a native Breakdance Builder page layout based on a Figma composite frame.  
DIRECTIVES:

1. Execute get\_design\_context on the provided Figma Frame URL to extract the structural hierarchy, auto-layout parameters, and bound variables. Execute get\_screenshot for visual verification context.  
2. Cross-reference the extracted design context with the active Breakdance Global Settings. You must not hardcode colors or typography; explicitly reference the established Breakdance global variables.  
3. Utilize the Novamira Pro Breakdance specialization tools to construct the page. Do not write raw PHP templates to the sandbox.  
4. Map Figma Auto Layout frames to Breakdance native Section and Container elements. Ensure Figma flex-direction properties correctly translate to Breakdance horizontal or vertical alignments.  
5. Identify areas implying dynamic content (e.g., repeating blog post cards). Instruct the Novamira tool to insert Breakdance's native dynamic "Posts List" or "Post Loop Builder" element rather than statically rendering individual HTML cards.  
6. Commit the layout to a new WordPress page titled "AI Generated Layout" ensuring the Breakdance visual editor mode is activated for the post.

Provide a URL to the staging server preview upon completion.

## **Phase 3: The Step-by-Step Build Guide**

To transition a project seamlessly from initial design to a fully staged, AI-generated Breakdance environment, the agency must adhere to a chronological deployment pipeline. This sequence ensures deterministic outcomes and prevents architectural conflicts between the platforms.

1. **Figma Finalization and Rule Generation:** The design team finalizes the Figma interface, ensuring all components leverage Auto Layout and all visual properties are tethered to the centralized Local Variables collection. The designer executes create\_design\_system\_rules to generate a foundational DESIGN.md file, which is committed to the project repository to provide the AI with rigid architectural conventions10.  
2. **Infrastructure Provisioning:** The DevOps engineer provisions a fresh WordPress staging environment. If utilizing InstaWP, the CLI command instawp local create \--name client-staging \-1 rapidly spins up a local WASM PHP sandbox21. For traditional hosting, Breakdance Builder Pro and Novamira Pro are installed and activated.  
3. **Authentication and Handshake:** The DevOps engineer generates a WordPress Application Password. The auto-setup prompt is copied from the Novamira dashboard and executed within the local Claude Code instance, establishing the authenticated, bidirectional MCP handshake1.  
4. **Global Settings Differential Synchronization:** The developer executes the Translation Prompt within Claude Code. The agent reads the Figma variables, retrieves the current staging server state, performs a non-destructive differential merge of the Breakdance JSON schema, and executes wp breakdance import\_settings via WP-CLI to align the visual foundations9.  
5. **Component and Layout Mapping:** The developer feeds specific Figma Frame URLs into Claude Code using the Page Generation Prompt. Claude invokes get\_design\_context and get\_screenshot from Figma, maps the structural output to native Breakdance nodes via Novamira's builder specialization tools, and saves the layouts directly to specific WordPress page IDs9.  
6. **Dynamic Data Binding and Loop Construction:** The developer instructs Claude to identify repeating structures within the generated layouts. The agent converts these static AI-generated grids into Breakdance "Global Blocks" or custom query loops. Utilizing Novamira's field plugin specializations, the agent binds Advanced Custom Fields (ACF) or WooCommerce product data directly into the Breakdance UI elements4.  
7. **Human Verification and Cache Invalidation:** The Quality Assurance team reviews the staging site. Any identified visual discrepancies are communicated back to Claude Code alongside a new screenshot captured via the Figma MCP. The agent visually verifies the anomaly, patches its own layout logic, and executes wp breakdance clear\_cache to ensure the frontend reflects the final database state9.

## **Phase 4: Operational Guardrails**

Managing a multi-agent pipeline requires a transition in operational oversight. Human developers must pivot from writing manual syntax to managing state, version control, and infrastructure boundaries. The following guardrails are mandatory for agency-scale deployments.

* **Mandatory State Backups:** Artificial intelligence agents iterate with extreme velocity and can cause widespread database corruption if a logic loop fails or hallucinates a destructive command. Automated server-level backups or instant pre-execution snapshots (such as those provided natively by InstaWP) must be taken before every major prompt execution4.  
* **Version-Controlled Sandbox Management:** The wp-content/novamira-sandbox/ directory must be strictly tracked via Git. Operations teams must employ commit hooks that automatically scan for and disable files containing blacklisted or dangerous PHP functions (e.g., eval, exec, shell\_exec) before they are committed to the repository or executed on the server.  
* **Persistent Memory Curation:** Novamira Pro stores project-specific context and agent decisions persistently across sessions to reduce token consumption and improve accuracy4. Developers must actively curate this memory layer. Agents must be instructed to call novamira/memory-save when a complex Breakdance layout rule is successfully solved, and developers must utilize novamira/memory-delete to prune outdated styling instructions, ensuring the agent's context window remains highly relevant and efficient4.  
* **Automated Cache Invalidation:** AI agents operate headlessly and communicate directly with databases and file systems; they do not trigger standard WordPress administrative dashboard hooks. Consequently, every sequence of agent-driven layout modifications must conclude with an explicit, automated WP-CLI call (specifically wp breakdance clear\_cache) to purge stale assets and ensure the browser accurately renders the underlying database state17.

#### **Works cited**

1. Novamira AI Review 2026: WordPress MCP Server That Lets AI Build Your Site \- Zyniti, [https://zyniti.com/blog/novamira-ai-review](https://zyniti.com/blog/novamira-ai-review)  
2. WordPress Development Simplified: The InstaWP AI Stack, [https://instawp.com/wordpress-development-simplified/](https://instawp.com/wordpress-development-simplified/)  
3. Novamira: Give Your AI Agent Full Access to WordPress \- Dynamic.ooo, [https://www.dynamic.ooo/novamira-give-your-ai-agent-full-access-to-wordpress/](https://www.dynamic.ooo/novamira-give-your-ai-agent-full-access-to-wordpress/)  
4. Novamira Pro Review: WordPress MCP Server with Memory \- UnleashWP, [https://www.unleash-wp.com/blog/novamira-pro-review/](https://www.unleash-wp.com/blog/novamira-pro-review/)  
5. Claude Code and Figma: Set up the MCP server, [https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server)  
6. Figma AI Agents: Set Up Claude Code to Design on Your Canvas | FindSkill.ai, [https://findskill.ai/blog/figma-ai-agents-claude-code-setup/](https://findskill.ai/blog/figma-ai-agents-claude-code-setup/)  
7. Set up the remote server (recommended) | Developer Docs, [https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)  
8. Figma MCP vs Figma API for AI Agents (2026) \- Scalekit, [https://www.scalekit.com/blog/figma-mcp-vs-api](https://www.scalekit.com/blog/figma-mcp-vs-api)  
9. Tools and prompts | Developer Docs, [https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)  
10. Figma MCP \+ Claude Code: Design-to-Code Setup Guide \- Vibe Coding Academy, [https://www.vibecodingacademy.ai/blog/figma-mcp-claude-code-complete-guide](https://www.vibecodingacademy.ai/blog/figma-mcp-claude-code-complete-guide)  
11. Figma Console MCP Server \- NPM, [https://www.npmjs.com/package/figma-console-mcp](https://www.npmjs.com/package/figma-console-mcp)  
12. neozhehan/figma-edit-mcp \- GitHub, [https://github.com/neozhehan/figma-edit-mcp](https://github.com/neozhehan/figma-edit-mcp)  
13. Figma Console MCP: AI-Powered Design System Management That Changes Everything, [https://southleft.com/insights/ai/figma-console-mcp-ai-powered-design-system-management/](https://southleft.com/insights/ai/figma-console-mcp-ai-powered-design-system-management/)  
14. Novamira MCP Features Explained: What AI Can Really Do Inside WordPress, [https://createpresshub.com/novamira-mcp-wordpress-features-guide-2026/](https://createpresshub.com/novamira-mcp-wordpress-features-guide-2026/)  
15. News \- Novamira, [https://novamira.ai/news/](https://novamira.ai/news/)  
16. Installation and Settings \- Breakdance AI Documentation, [https://breakdance.com/documentation/breakdance-ai/installation-and-settings/](https://breakdance.com/documentation/breakdance-ai/installation-and-settings/)  
17. Latest Updates & Roadmap | Breakdance, [https://breakdance.com/updates/](https://breakdance.com/updates/)  
18. How to Connect Claude to WordPress Using Novamira \- GetRizwan, [https://getrizwan.com/how-to-connect-claude-to-wordpress-using-novamira/](https://getrizwan.com/how-to-connect-claude-to-wordpress-using-novamira/)  
19. Web Design WordPress tramite il plugin Novamira.ai \- Creazione Siti Web, [https://www.mrtux.it/web-design-wordpress-tramite-il-plugin-novamira-ai](https://www.mrtux.it/web-design-wordpress-tramite-il-plugin-novamira-ai)  
20. Novamira \- Full WordPress access for AI agents, [https://novamira.ai/](https://novamira.ai/)  
21. Introducing InstaWP CLI: Build, Deploy, and Manage WordPress From Your Terminal, [https://instawp.com/instawp-cli-guide/](https://instawp.com/instawp-cli-guide/)  
22. How to Make Your WordPress Site AI-Agent Ready (2026 Developer Guide) \- InstaWP, [https://instawp.com/safe-wordpress-sandbox-for-ai-agents/](https://instawp.com/safe-wordpress-sandbox-for-ai-agents/)  
23. How to Add or Remove Space Between WordPress Blocks (Paragraphs, Columns, and Sections) \- InstaWP, [https://instawp.com/how-to-add-or-remove-blank-space-between-wordpress-blocks-4-easy-methods/](https://instawp.com/how-to-add-or-remove-blank-space-between-wordpress-blocks-4-easy-methods/)  
24. Changelog \- Novamira, [https://novamira.ai/changelog/](https://novamira.ai/changelog/)  
25. Novamira Pro 1.4.0: Beaver Builder specialization, [https://novamira.ai/novamira-pro-1-4-0-beaver-builder/](https://novamira.ai/novamira-pro-1-4-0-beaver-builder/)  
26. Memory and expertise for your AI in WordPress \- Novamira Pro, [https://novamira.ai/pro/](https://novamira.ai/pro/)  
27. How to use Novamira safely (dev and staging only), [https://novamira.ai/security/](https://novamira.ai/security/)  
28. Security & Best Practices \- Novamira, [https://novamira.ai/docs/security/](https://novamira.ai/docs/security/)  
29. Importing and Exporting \- Design Documentation \- Breakdance, [https://breakdance.com/documentation/design/global-settings/importing-exporting/](https://breakdance.com/documentation/design/global-settings/importing-exporting/)  
30. What Breakdance Pro adds to WordPress visual site building \- GPL Times, [https://www.gpltimes.com/wordpress-plugins/breakdance-pro-wordpress-visual-builder/](https://www.gpltimes.com/wordpress-plugins/breakdance-pro-wordpress-visual-builder/)  
31. WP-CLI \- Advanced Topics Documentation \- Breakdance, [https://breakdance.com/documentation/advanced/wp-cli/](https://breakdance.com/documentation/advanced/wp-cli/)  
32. Novamira Pro 1.2.0 adds nine new specializations, [https://novamira.ai/novamira-pro-1-2-0-adds-nine-new-specializations/](https://novamira.ai/novamira-pro-1-2-0-adds-nine-new-specializations/)  
33. Migrating To Breakdance \- Other Documentation, [https://breakdance.com/documentation/other/migration/migrating-to-breakdance/](https://breakdance.com/documentation/other/migration/migrating-to-breakdance/)  
34. Connect Claude to WordPress with MCP \- InstaWP, [https://instawp.com/connect-claude-with-wordpress/](https://instawp.com/connect-claude-with-wordpress/)  
35. CLAUDE.md \- silships/figma-cli \- GitHub, [https://github.com/silships/figma-cli/blob/main/CLAUDE.md](https://github.com/silships/figma-cli/blob/main/CLAUDE.md)  
36. Element Settings \- Developers Documentation \- Breakdance, [https://breakdance.com/documentation/developers/element-studio/element-settings/](https://breakdance.com/documentation/developers/element-studio/element-settings/)  
37. InstaWP · Build, host & ship WordPress in seconds, [https://instawp.com/](https://instawp.com/)  
38. Novamira: The WordPress AI Tool Built for Developers, Not Editors \- UnleashWP, [https://www.unleash-wp.com/blog/forget-wordpress-ai-novamira-is-built-for-actual-dev-pros/](https://www.unleash-wp.com/blog/forget-wordpress-ai-novamira-is-built-for-actual-dev-pros/)