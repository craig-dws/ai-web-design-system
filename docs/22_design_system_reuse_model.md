# 22. Design-System Reuse Model

Status: v0.1 | Date: 14 July 2026 | Owner: Design Lead and Dev Lead jointly

This document answers a question the rest of v0.1 left implicit: does the agency build a new design system for every client, or maintain one system and re-skin it per client? It sets the model both build targets (Breakdance and Astro plus Payload) inherit.

## The decision

Maintain one shared agency base kit and layer a per-client brand theme on top of it. Do not build a bespoke design system per client. This is the settled best practice in mature design-system work, and it is the only model that scales an agency without growing the team in proportion to the client list.

"Custom" client sites come from swapping the brand token layer (colour, typography families, radius, and a small set of brand-specific components) on an unchanging shared foundation (spacing scale, type ramp, component structure, naming). Reserve a fully bespoke system only for a flagship or experiential build where the layout paradigm itself is the deliverable.

## The three-tier token model

Use a three-tier token model as the spine. It maps cleanly across Figma variables, Breakdance Global Settings, and Astro code, which is exactly what lets one kit serve many clients.

```
Tier 1  PRIMITIVE   raw values, no meaning        blue-500, space-4, radius-lg
   |  (aliased by)
   v
Tier 2  SEMANTIC    intent, the brand knob         color.action.primary, surface.bg
   |  (aliased by)
   v
Tier 3  COMPONENT   where it is used               button.bg.default, card.border
```

- **Primitive** is what a value is. Shared across all clients. Rarely changes.
- **Semantic** is what a value means. This is the per-client brand knob. Retheme a client by changing semantic (and where needed primitive) values only.
- **Component** is where a value is used. Aliases the semantic layer. Structure stays identical across clients, so a component never changes when the brand does.

A single-product system can get by on two tiers (primitive plus semantic). Multi-brand work specifically needs the third component tier, so one client can retheme without touching component structure.

Why three tiers matter for an agency doing custom work: shared foundations do not reduce distinctiveness. Every client uses buttons, cards, and forms. Differentiation lives in typography, spacing choices, colour, and which components are composed, not in rebuilding primitives. Duplication is the anti-pattern, not the goal.

## How it maps to Figma

- Model each tier as a Figma Variable Collection, and use aliasing so the semantic layer references primitives by name and the component layer references semantics by name, never raw values.
- Use Figma Extended Collections (the 2025 feature) as the mechanism for "one agency kit, swap per client". Publish the base kit as a collection. Each client is an Extended Collection that inherits the base and overrides only the values that differ (colour, typography family, radius). The client collection stays tied to the parent, so improvements to the base propagate.
- Use modes within a collection for axes inside a single brand (light and dark, high-contrast, responsive breakpoints), not as the primary brand switch. Extended Collections handle the brand switch; modes handle variation within a brand.

## How it maps to the two build targets

The naming bridge is the whole game. Keep token names identical across Figma semantic variables, the build target's token layer, and any CSS custom properties. That shared vocabulary is what lets the Figma MCP and Claude Code emit the right token instead of a hardcoded value.

### Target A: Breakdance

- Breakdance Global Colors and Global Typography Presets are the Tier 2 and Tier 3 equivalents in WordPress. Define once, apply by reference, and everything using a global updates when its value changes.
- Maintain a Breakdance base kit (a template and preset set) whose global colours and typography presets are named identically to the Figma semantic tokens. Per client, re-point the values behind those named globals. The layouts, presets, and component structure carry over.
- Breakdance can export design tokens as CSS custom properties, so names can round-trip between Figma, code, and WordPress.

### Target B: Astro plus Payload

- **The token layer is code**: the Tailwind config plus CSS custom properties. There is no CMS "global settings" equivalent; tokens are version-controlled in the Astro repository.
- Maintain a shared Astro base kit (the primitive and semantic token layers, plus the component library) as a package. Per client, override the semantic and primitive values in the client's Tailwind or CSS token file, using the same semantic names. The component library and structure are inherited unchanged.
- Payload holds content and block composition only, never a design token. Brand and theme tokens never pass through Payload.

## Trade-offs, so the choice is deliberate

| | Shared base plus per-client theme (recommended default) | Fully bespoke per client |
|---|---|---|
| Speed to launch | Fast: swap the token layer, reuse structure | Slow: rebuild foundations each time |
| Maintenance | Fix once, propagates to all sites | N fixes across N sites |
| Consistency floor | High, enforced by shared primitives | Variable, per build |
| Differentiation ceiling | High for colour, type, spacing, and composition; capped only on radical layout paradigms | Unlimited |
| Best when | Marketing and content sites, a portfolio of clients, scaling without team growth | Flagship or experiential builds where the layout system itself is the product |

Rule of thumb: default to the shared base. Go bespoke only when a client's differentiation requirement is structural (a novel navigation or layout metaphor), not stylistic. Even then, keep the primitive spacing and type ramp shared.

## What this means in practice

1. **Build one agency base kit**: primitive spacing and type ramp, component anatomy, naming conventions. This is immutable Template Core in the constitution's three-tier customisation model.
2. Layer semantic and component tokens, and expose only the semantic layer as the per-client brand knob.
3. **In Figma**: a base collection plus one Extended Collection per client (inherits the base, overrides colour, type, and radius); modes for light, dark, and breakpoints within a brand.
4. **In the build target**: a base kit named identically to the Figma semantic tokens (Breakdance globals for Target A, a Tailwind or CSS token package for Target B). Per client, re-point values, not structure.
5. **In the AI workflow**: token-first Figma, then the MCP, then Claude Code emits token references, never hex. Code Connect mappings. A mandatory human review gate. WCAG 2.2 AA and Core Web Vitals as human sign-offs. Nothing AI-generated ships unreviewed.

## Related documents

- [02_recommended_minimum_architecture.md](02_recommended_minimum_architecture.md) - the two build targets
- [03_designer_workflow.md](03_designer_workflow.md) - step 2 chooses the foundation; this is that foundation
- [08_breakdance_and_wordpress_plugin_stack.md](08_breakdance_and_wordpress_plugin_stack.md) - Breakdance Global Settings
- [08b_astro_payload_build_target.md](08b_astro_payload_build_target.md) - the Astro token-in-code layer
- [13_source_of_truth_model.md](13_source_of_truth_model.md) - tokens as a source of truth
