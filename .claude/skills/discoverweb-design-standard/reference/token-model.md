# Token model and base-kit rules

The model that makes one agency kit serve many clients. Source: the agency Design-System Reuse Model (docs 22).

## The decision

Maintain one shared agency base kit and layer a per-client brand theme on top of it. Do not build a bespoke design system per client. "Custom" client sites come from swapping the brand token layer (colour, typography families, radius, and a small set of brand-specific components) on an unchanging shared foundation (spacing scale, type ramp, component structure, naming). Reserve a fully bespoke system only for a flagship build where the layout paradigm itself is the deliverable.

## The three-tier token model

```
Tier 1  PRIMITIVE   raw values, no meaning        blue-500, space-4, radius-lg
   |  (aliased by)
   v
Tier 2  SEMANTIC    intent, the brand knob         color.action.primary, surface.bg
   |  (aliased by)
   v
Tier 3  COMPONENT   where it is used               button.bg.default, card.border
```

- Primitive is what a value is. Shared across all clients. Rarely changes.
- Semantic is what a value means. This is the per-client brand knob. Retheme a client by changing semantic (and where needed primitive) values only.
- Component is where a value is used. Aliases the semantic layer. Structure stays identical across clients, so a component never changes when the brand does.

Never a raw value above tier 1. Semantic aliases primitive, component aliases semantic.

## How it maps in Figma

- Model each tier as a Figma Variable Collection, using aliasing so the semantic layer references primitives by name and the component layer references semantics by name.
- Use Extended Collections as the mechanism for "one agency kit, swap per client". Publish the base kit as a collection. Each client is an Extended Collection that inherits the base and overrides only the values that differ (colour, typography family, radius). The client collection stays tied to the parent, so improvements to the base propagate.
- Use modes within a collection for axes inside a single brand (light and dark, breakpoints), not as the primary brand switch.

## The base-kit adherence checks (v2)

Switch these on once the agency base kit is built. Paste the base kit's semantic token names below, then the audit can verify a client file against them.

- The client file is an Extended Collection that inherits the base kit and overrides only colour, typography family, and radius.
- The base is not forked, and no token is renamed. Token names are an API; once a name ships, changing it breaks every client.
- The three-tier aliasing is intact, and no raw value sits above the primitive tier.
- Semantic is the only per-client brand knob; component structure does not change when the brand does.

### Base kit token list (paste here when the base kit exists)

Not yet supplied. Until this list is filled in, run v1 checks only and state that base-kit adherence was not checked.
