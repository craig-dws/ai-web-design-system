# Naming standard and banned practices

The conventions every project must follow. This keeps Figma files machine-readable for the AI workflow and consistent across designers and clients. Source: the agency Figma Component and Naming Standard.

## Variable naming

Forward-slash grouping and semantic names. Lower case, hyphen for multi-word.

| Group | Example names |
|-------|---------------|
| Colour, brand | color/brand/primary, color/brand/secondary, color/brand/accent |
| Colour, surface | color/surface/background, color/surface/card, color/surface/muted |
| Colour, text | color/text/heading, color/text/body, color/text/muted, color/text/inverse |
| Colour, state | color/state/success, color/state/warning, color/state/error |
| Spacing | spacing/xs, spacing/sm, spacing/md, spacing/lg, spacing/xl, spacing/xxl |
| Radius | radius/sm, radius/md, radius/lg, radius/full |

Spacing scale sits on a 4pt or 8pt grid. Record the base value in the Variables collection.

## Text style names

| Style | Use |
|-------|-----|
| H1 to H6 | Heading levels, one H1 per page |
| Body Large | Intro or lead paragraphs |
| Body Medium | Default body text |
| Body Small | Captions, helper text, fine print |

Type sizes are set in rem, based on a 16px root.

## Component naming

- Pattern: Category/Component/Variant, for example Button/Primary, Button/Secondary, Card/Feature, Nav/Header.
- Use variants for states (Default, Hover, Active, Disabled) rather than duplicate components.
- Name variant properties clearly (State, Size, Type).

## Auto Layout

- All master components use Auto Layout.
- Use spacing tokens for gaps and padding, never manual pixel values.
- Set resizing behaviour (hug, fill, fixed) intentionally on each frame.

## Page and frame naming

- Figma pages: Cover, Design System, Components, Desktop, Tablet, Mobile, Archive.
- Frames named after the page or section, for example Home, About, Services, Contact.
- Breakpoint suffix where relevant, for example Home / Desktop, Home / Mobile.

## Status labels

Apply a status label to each screen frame.

| Label | Meaning |
|-------|---------|
| WIP | Work in progress, not ready for review |
| For Review | Ready for internal or client review |
| Approved | Signed off, ready for handover |
| Dev Ready | Handover contract complete, ready to build |

## Banned practices

- Hardcoded hex values in fills or styles. Use colour tokens.
- Absolute positioning, except a deliberate z-index overlap that is documented.
- Manual pixel spacing outside the spacing scale.
- Detached component instances.
- Unnamed layers, frames, or components. No default "Frame 123" names.
