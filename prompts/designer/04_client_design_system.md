# Designer 04: The client's design system

- **Who:** the designer, with the Design Lead approving.
- **Tool:** Claude Cowork with the Figma plugin.
- **How often:** once per client, after the agency base kit exists.

The agency base kit is built **once, ever** (`03_build_agency_base_kit.md`). Every
client after that gets an **Extended Collection** that inherits the base and
overrides only what makes this brand different. **Do not fork the base.** That is
the whole point of the model: fix the base once and every client inherits the fix.

The design system is identical regardless of whether the site is built in
WordPress plus Breakdance or Astro plus Payload. Never design differently for a
build target.

```
I am setting up the design system for a new client on our agency base kit. I have given
you our documents folder.

Read first and follow exactly:
- 03_design_system_reuse_model.md
- 04_figma_naming_standard.md

The approved visual direction for this client is: [PASTE THE THESIS AND SIGNATURE ELEMENT
FROM THE APPROVED CONCEPT DIRECTION]

Help me, stopping after each step so I can review:

1. Create an EXTENDED COLLECTION from our base kit for this client. It inherits the base
   and overrides ONLY colour, typography family, and radius. Do not fork the base and do
   not rename any token.

2. Set the client's SEMANTIC values to express the approved direction. Semantic is the
   brand knob. Component tokens keep aliasing semantic, so component structure never
   changes when the brand does.

3. Check every override against the direction's thesis. If a value does not serve the
   thesis, say so and propose the one that does.

4. AUDIT with /design-system across the file. Report every hardcoded hex, every off-scale
   spacing value, and every naming inconsistency. A single one is a defect, not a detail.

5. Confirm against 05_design_system_checklist.md and tell me honestly what still fails.

Rules:
- Token names are an API. Once a name ships, changing it breaks every client. Never
  rename, only re-point values.
- Never a raw value above tier 1. Semantic aliases primitive, component aliases semantic.
- Do not invent names. Use our standard. Ask me before adding a token that is not in it.
- Keep all three tiers even if a build target cannot consume one of them. That is the
  developer's mapping problem, not a reason to drop a tier.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## Before you call it done

Run `05_design_system_checklist.md` in full and hand it to the **Design Lead for
Gate 1b**. This is the most consequential approval in the system: everything
downstream inherits it, and if the tokens are wrong or unnamed here the AI will
emit wrong values on every page and no amount of later review fixes it
economically. Do not start the homepage until that approval is recorded.
