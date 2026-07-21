# Prompt 3a: Build the agency base kit (designer)

- **Who:** the Designer, with the Dev Lead checking technical extractability and the PM recording the evidence.
- **Tool:** Claude Cowork, with the Figma plugin installed.
- **How often:** once, to build the shared base kit. Do it on a duplicate file
  first; `use_figma` is beta.

This is the one thing the setup prompt cannot do for you. A design system is a
set of decisions about a brand, made in Figma, not a scaffolding task. Without
the base kit there are no token names, and without token names the token sync has
nothing to map and the AI has no contract to check its output against. Everything
downstream inherits this.

**Give her the files first.** She has no repository, so run
`bash designer-pack/assemble.sh` and share `designer-pack/documents/` with her
(Drive, or a folder on her machine). Then point Cowork at that folder. The three
she needs here are `03_design_system_reuse_model.md` (the model),
`04_figma_naming_standard.md` (the naming standard), and
`05_design_system_checklist.md` (the exit gate).

```
I am building our agency's shared design system base kit in Figma. It will be reused
across every client site, with only a brand theme swapped per client, so the naming is
more important than the styling.

Read our standard first, from the designer pack folder I have given you, and follow it
exactly:
- 03_design_system_reuse_model.md
- 04_figma_naming_standard.md

Help me build, in this order, and stop after each step so I can review:

1. THREE VARIABLE COLLECTIONS, in this tier order:
   - Primitive  (raw values, no meaning: blue-500, space-4, radius-lg)
   - Semantic   (intent, and the per-client brand knob: color.action.primary, surface.bg)
   - Component  (usage: button.bg.default, card.border)
   Semantic aliases Primitive. Component aliases Semantic. Never a raw value above tier 1.

2. THE SCALES:
   - Type scale in rem at a 16px base, roles for display, body and utility
   - Spacing scale on a strict 4pt or 8pt grid
   - Radius and elevation scales

3. THE CORE COMPONENTS, one at a time, every property bound to a token:
   Button (all states), Input, Card, Section, Container, Nav, Footer.
   Every component uses Auto Layout. Absolute positioning only for deliberate
   z-index overlaps.

4. AUDIT: run /design-system over the file and fix everything it flags. A single
   hardcoded hex or off-scale spacing value is a defect, not a detail.

Rules:
- Semantic token names are an API. Once a name ships, changing it breaks every client.
- Do not invent names. Use our standard.
- Ask me before adding a token that is not in the standard.
- British and Australian English.
```

**Then, per client:** create an **Extended Collection** that inherits the base
and overrides only colour, typography family and radius. Do not fork the base.
That is the whole point of the model.

**Gate:** the Designer self-certifies the base kit before any client build uses
it. The Dev Lead confirms that the naming and token structure can be extracted
and mapped, and the PM records the evidence. This is the most consequential
foundation check in the system.
