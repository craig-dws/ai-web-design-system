# Prompt 3b: Mirror the base kit into the build target (Dev Lead)

- **Who:** the Dev Lead.
- **Tool:** Claude Code.
- **How often:** once per build target, after the Designer has self-certified the base kit and the PM has recorded the Gate 1b evidence.

The naming bridge is the whole game: the same token names must exist in Figma and
in the build target, so the agent emits a token reference instead of a literal.
Use the version below for the target you are building.

## Target A: WordPress plus Breakdance

```
[ROLE: Design systems engineer]

OBJECTIVE: Mirror our approved Figma base kit into the Target A build layer, and record
the token contract, so the same names exist on both sides.

READ: docs/22_design_system_reuse_model.md, docs/08_breakdance_and_wordpress_plugin_stack.md,
docs/pilot-artefacts/03_figma_component_and_naming_standard.md

DIRECTIVES:
1. Extract the resolved SEMANTIC tokens from the approved Figma base kit with
   get_variable_defs. Scope calls to the collection; do not pull whole files.
2. Produce a mapping table: Figma semantic token name, resolved value, the Breakdance
   Global Settings target (Global Colours, Typography Presets), and the CSS custom
   property name. Names must be IDENTICAL on both sides. The naming bridge is the whole
   game: it is what lets the agent emit a token reference instead of a literal.
3. Flag any token with no clean Breakdance home. Do not invent a mapping. Report it.
4. Write the contract to docs/ as the canonical token reference, and generate the
   design-system rules file so every future session inherits it.
5. STOP. Show me the mapping for approval before touching any Breakdance settings.
6. On approval, apply it as a reviewed DIFFERENTIAL MERGE (never a blind
   import_settings), then clear cache and verify a page renders with the new tokens.

CONSTRAINTS: staging only; snapshot first; tokens not hex; never total_reset.
```

Use the token-sync skill and the figma-token-extractor subagent for this.

## Target B: Astro plus Payload

```
[ROLE: Design systems engineer]

OBJECTIVE: Mirror our approved Figma base kit into the Target B code token layer, and record
the token contract, so the same names exist in Figma and in code.

READ: docs/22_design_system_reuse_model.md, docs/08b_astro_payload_build_target.md,
docs/pilot-artefacts/03_figma_component_and_naming_standard.md

DIRECTIVES:
1. Extract the resolved tokens from the approved Figma base kit with get_variable_defs,
   across all three tiers (primitive, semantic, component). Scope calls to the collection.
2. Produce a mapping table: Figma token name, resolved value, the Tailwind config target,
   and the CSS custom property name. Names must be IDENTICAL across Figma, the Tailwind or
   CSS token layer, and any Payload block field name.
3. Flag any token with no clean home. Do not invent a mapping. Report it.
4. Write the contract to docs/ as the canonical token reference.
5. STOP. Show me the mapping for approval before writing any token files.
6. On approval, use the token-to-code skill to write the values into the Tailwind config and
   CSS custom properties, then show the diff for review. Tokens live in code, never in Payload.

CONSTRAINTS: never hardcode a value where a token exists; do not rename tokens; keep the
naming bridge exact; nothing touches production.
```

Use the token-to-code skill and the figma-token-extractor subagent for this.
