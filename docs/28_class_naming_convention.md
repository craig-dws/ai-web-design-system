# 28. Class naming convention

Status: **adopted, September 2026.** Applies to every client site from now on, on both build
targets. Supersedes the client-initial prefix used on earlier builds.

The implementation lives in the starter kit at `.claude/reference/class-naming.md`, which is
what a client project actually reads. This document is the reasoning and the decision record.

## The rule

**The prefix states the blast radius.**

A developer looking at `sw-section` knows, before touching it, that changing it changes every
page. A developer looking at `sc-quotes` knows it changes one section. Nobody has to go and
find out, and nobody finds out afterwards.

| Prefix | Scope | Change it and | Example |
|---|---|---|---|
| `sw-` | Sitewide | every page changes | `sw-section`, `sw-container`, `sw-btn` |
| `gb-` | Global block | every page carrying that block changes | `gb-cta-band`, `gb-enquiry` |
| `wg-` | Widget | every instance of that component changes | `wg-quote-card` |
| `pg-` | Page only | one page changes | `pg-home__hero` |
| `sc-` | Section only | one section changes | `sc-quotes` |

Hyphens between words. BEM `__` for a child element, `--` for a variant:
`sc-quote-name__title--lg`. Lower case throughout. State classes are `is-` or `has-`, and are
never styled unqualified.

`gb-` was chosen over `gl-` because it matches Breakdance's own term, Global Block, and the
register the decision comes from.

## Why this rather than tidiness

The problem it solves is not inconsistent naming. It is that **a developer cannot see the reach
of a class from the class**, so they change something believing it is local and it is not. On a
site with hundreds of product pages inheriting a template, that is expensive to discover.

Two consequences follow, and both are load-bearing:

1. **Widening a class's reach is a rename**, applied everywhere it is used. Not a quiet
   promotion. A prefix that lies is worse than no prefix, because it is trusted.
2. **The prefix is not chosen per page.** It comes from `build-log/GLOBAL-BLOCKS.md`, written by
   the `global-blocks-audit` skill before the first page is built. The audit decides whether a
   repeating section is a template part, a global block, a pattern, or inline; that decision
   *is* the prefix. They are one call written twice, and the register carries both columns.

Without the second, naming drifts per page and the prefixes stop meaning anything by page ten.

## Why the client prefix was dropped

Earlier builds used a client initial, for example `ees-hero__copy` on Eastwood. On a
single-client site every class is that client's, so the prefix carried no information and
occupied the slot that now carries scope, which does.

Collision risk with the stack is low because the vendors prefix their own: Breakdance `bde-`
and `breakdance-`, WooCommerce `woocommerce-` and `wc-`, Astra `ast-`, Elementor `elementor-`.
**Checked once per site on the first build and recorded**, not assumed and not re-checked per
page.

## Both targets

The convention is target-neutral. Only what a prefix maps onto differs.

| Prefix | Target A, WordPress plus Breakdance | Target B, Astro plus Payload |
|---|---|---|
| `sw-` | a Breakdance global class in the design system layer | a global stylesheet or Tailwind layer |
| `gb-` | a Breakdance Global Block | a shared component placed on many routes |
| `wg-` | a Breakdance global class on a reusable element | a component |
| `pg-` | scoped to one page's layout | scoped styles on one route |
| `sc-` | scoped to one section | scoped styles on one section |

On Target A specifically: `insert-stylesheet` holds the design system layer and its selectors
outlive any page, so superseded selectors are removed with `delete-css-selectors` rather than
left to accumulate. And `html-to-page` silently drops any class with no CSS rule of its own, so
a class written purely as a structural hook vanishes unless it is given at least one rule.

## Relationship to tokens

Naming is not a substitute for tokens and does not soften prohibition 7. A class carries scope
and meaning; a token carries the value. `sw-btn` still references the colour, type and spacing
tokens rather than holding raw values.

## Where it is implemented

| Repo | File |
|---|---|
| Starter kit | `.claude/reference/class-naming.md`, referenced from `build-standards.md` and every prompt that builds a section |
| Client project | the same file, cloned with the kit |
| This repo | this document, plus prohibition 12 in `CLAUDE.md` |

## See also

- `docs/22_design_system_reuse_model.md`, on what maps cleanly to Breakdance and what does not
- the `global-blocks-audit` skill, which produces the register the prefixes come from
- `docs/23_best_practices.md`
