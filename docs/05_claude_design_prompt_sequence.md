# 05. Claude Design Prompt Sequence

**AI Web Design System v0.1** | Internal developer and PM reference

This document describes the end-to-end prompt sequence for a design-to-WordPress build: the order in which prompts are issued across a project, the tools each stage invokes, and why the sequence runs the way it does. It is the narrative and the prompting principles. The actual copy-pasteable prompt text lives in [14_prompt_library.md](14_prompt_library.md).

## Why sequence matters

Each stage produces an artefact that the next stage depends on. Running stages out of order (for example, translating a page to Breakdance before tokens are extracted) forces the model to invent values it should be reading from an authoritative source. The sequence exists so that every downstream prompt references a single source of truth rather than guessing.

The build moves through six stages: creative research, design-system scaffolding, homepage concept, token extraction, build translation, and per-subpage generation. A human review gate sits between every stage. Stages 1 to 4 are build-target-neutral: they are identical whether the site is built in Breakdance or in Astro plus Payload. Only stages 5 and 6 differ by target. This document shows the Breakdance path; for the Astro plus Payload path, stages 5 and 6 map to component and content-model work described in 08b_astro_payload_build_target.md.

## Which Claude surface does each stage use

"Claude Design" now means three different things (see 01, A.12 and B), so each stage must name the surface it uses.

- The **Claude Design product** (Anthropic Labs canvas) is an option for stages 1 to 3, the generative creative work, and can hand a design bundle to Claude Code afterwards.
- **Claude Code plus the Figma MCP** is the surface for stages 4 to 6, the token extraction and the build. This is where the read tools (`get_variable_defs`, `get_design_context`, `get_screenshot`, `get_code_connect_map`) do the reliable work.
- Do not lean the creative front-half on the Figma MCP write tool. `use_figma` is beta quality with a 20kB per-call cap and no image support. If the design system and homepage are authored into Figma, prefer the Claude Design product or a designer working in Figma with AI assistance over driving `use_figma` to build the design for you. Reserve `use_figma` for small, duplicate-file experiments, as 02 requires.

## Prompting principles

These principles apply to every prompt in the sequence. They are the difference between a repeatable build and a slot machine.

1. **Be explicit.** State the role, the objective, and the directives. Never assume the model will infer a constraint you did not write down.
2. **Scope to frames.** `get_design_context` can exceed token limits on a large Figma page. Always select specific frames before calling it. Never point a tool at an entire file and hope.
3. **Reference tokens, not hex.** Once the design system exists, prompts must instruct the model to use semantic token names (for example `color/brand/primary`) and Breakdance global variables. Hardcoded hex values in generated output are a defect.
4. **Human review gate between prompts.** No stage auto-chains into the next. A developer or PM reviews the artefact, then issues the next prompt. This is a hard rule for v0.1.
5. **One page at a time.** Subpage generation is committed to a single page per prompt. Batching pages multiplies the blast radius of any error and makes review meaningless.
6. **Verify with `get_screenshot`.** Visual output is checked against the Figma source with a screenshot diff before a page is considered done. Do not rely on the model's own report that the build matches.
7. **Code Connect is the biggest accuracy lever.** Where components are mapped through `get_code_connect_map`, the model produces markedly more faithful output. Invest in Code Connect mappings early.

## Stage-by-stage map

| Stage | Prompt (see 14_prompt_library.md) | Tools invoked | Human gate | Artefact produced |
|-------|-----------------------------------|---------------|------------|-------------------|
| 1. Creative research | Creative brief and research prompt | WebSearch, WebFetch | PM signs off on the brief and moodboard direction | Creative brief, references, art direction notes |
| 2. Design-system scaffolding | (a) System-scaffolding prompt | `use_figma`, `get_variable_defs`, plus the `figma-create-design-system-rules` Agent Skill | Designer reviews token names, type scale, spacing scale, master components | Figma Local Variables collection, master components, `DESIGN.md` |
| 3. Homepage concept | (b) Initial website-design prompt | `use_figma`, `get_variable_defs`, `get_screenshot` | Designer and client review the homepage concept | Homepage design frame in Figma |
| 4. Token extraction | (part of c and d) `get_variable_defs` extraction | `get_variable_defs`, `get_design_context` | Developer confirms tokens map cleanly to Breakdance global variables | Token export (JSON), Breakdance global variable mapping |
| 5. Breakdance translation | (c) Figma-to-Breakdance translation prompt | `get_variable_defs`, `wp breakdance export_settings`, `wp breakdance import_settings`, `wp breakdance clear_cache`, `wp breakdance status` | Developer reviews the differential merge before import | Merged Breakdance settings JSON, applied global variables on staging |
| 6. Per-subpage generation | (d) Subpage-generation prompt, then (e) visual-QA/diff prompt | `get_design_context`, `get_screenshot`, Breakdance builder, `wp breakdance clear_cache` | Developer reviews each staging preview URL against Figma | One built subpage per prompt, staging preview URL |

## Stage detail

### Stage 1. Creative research

Establish the creative direction before any design system exists. The output is a written brief the whole team agrees on. Nothing is built here. The gate is a PM sign-off so that later stages are not scaffolded on an unagreed direction.

### Stage 2. Design-system scaffolding

Use prompt (a). The model acts as an Elite Design Systems Architect and creates a Figma design system: a Local Variables collection with semantic token names, a type scale in rem at base 16px, a 4pt and 8pt spacing scale, and master components built with Auto Layout. No hardcoded hex. It then runs the bundled `create_design_system_rules` skill to output a `DESIGN.md` that captures the rules in text. The designer reviews token naming and the component set before anything is designed on top of it. Get this stage right and every later stage inherits its discipline.

### Stage 3. Homepage concept

Use prompt (b). With the system in place, the model produces a first full homepage concept in Figma, composed from the master components and tokens created in Stage 2. Scope work to the homepage frame. This is the concept the client reacts to, so the gate here is a design and client review, not just an internal check.

### Stage 4. Token extraction

Use `get_variable_defs` (embedded in prompts c and d) to pull the resolved token values out of Figma and map them to Breakdance global variables. The developer confirms the mapping is clean: every semantic token should correspond to a Breakdance global variable, so that translated pages reference variables rather than literals. This mapping is the contract between design and build.

### Stage 5. Breakdance translation

Use prompt (c). The model acts as a Senior DevOps Engineer. It reads variable definitions with `get_variable_defs`, exports the current Breakdance settings with `wp breakdance export_settings`, then performs a **differential merge**: it preserves existing keys, custom CSS, and `clamp()` functions, and adds or updates only what the new tokens require. It writes the merged JSON, imports it with `wp breakdance import_settings`, clears cache with `wp breakdance clear_cache`, and verifies with `wp breakdance status`. Never blind-overwrite Breakdance settings. The developer reviews the merge diff before the import runs. Back up the relevant postmeta first.

### Stage 6. Per-subpage generation

Use prompt (d), one page at a time. The model acts as a Senior Frontend Developer. It calls `get_design_context` and `get_screenshot` on the single target frame, references established Breakdance global variables rather than hardcoded values, maps Auto Layout to Section, Div, and Columns, and uses the Post Loop Builder for repeating content. It never writes raw PHP layout files. It commits to one page and returns a staging preview URL.

Then run prompt (e), the visual-QA and diff prompt: feed a fresh `get_screenshot` of the built page, compare it to the Figma frame, patch layout discrepancies, and clear cache. Repeat per page. The build is only done for a page once its screenshot diff is clean and a developer has reviewed the staging URL.

## Related documents

- [06_claude_code_project_structure.md](06_claude_code_project_structure.md) - per-project Claude Code layout
- [09_skills_agents_commands_hooks.md](09_skills_agents_commands_hooks.md) - the automations that support this sequence
- [14_prompt_library.md](14_prompt_library.md) - the actual prompt text
- [15_claude_code_setup_and_mcp_config.md](15_claude_code_setup_and_mcp_config.md) - environment and MCP setup
