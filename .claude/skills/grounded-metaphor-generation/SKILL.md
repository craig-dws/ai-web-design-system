---
name: grounded-metaphor-generation
description: Generate creative design metaphors that are verifiably derived from a brand's own source documents, using a three-step process of extract, blend and score. Use for creative concept generation, brand storytelling, hero direction, or any scenario needing a unique visual and tonal direction grounded in brand identity rather than AI defaults. Target neutral, so the metaphor drives token choices for any build target.
---

# Grounded Metaphor Generation for Creative Design

## Overview

**Purpose:** Teach the three-step grounded metaphor process, extract then blend then score, to generate creative metaphors that are verifiably derived from source documents, which prevents drift toward a generic AI aesthetic.

**When to use:** Creative concept generation, brand storytelling, hero section direction, any scenario requiring a unique visual or tonal direction grounded in brand identity.

**Target neutral.** A metaphor shapes token choices, colour, type, spacing, shape and motion. Those tokens are the contract, and they apply regardless of whether the site is later built on WordPress plus Breakdance or Astro plus Payload. Nothing here assumes a stack.

---

## The problem: ungrounded creativity equals generic defaults

### Why metaphors matter

A visual metaphor drives design decisions:
- Calm River leads to fluid gradients, organic shapes and generous whitespace
- Systematic Orchestra leads to rhythmic grids, precise spacing and elegant data visualisation
- Fortress leads to bold type, high contrast and structural layouts

**The generic metaphor trap.** Ungrounded, overused metaphors such as rocket ship, Swiss Army knife, bridge or lighthouse produce statistically average, homogeneous designs because they are not anchored to specific brand attributes.

**Grounded metaphors** are derived from the brand's own keywords, for example:
- Calm River from calm, transparent, efficient, reduce friction
- Systematic Orchestra from systematic, expert, harmonious, precision
- Organic Brutalism from structural, honest, natural, approachable

The result is a unique, brand-specific direction with high traceability to source documents.

---

## Conceptual metaphor theory primer

**Foundation:** Conceptual Metaphor Theory by Lakoff and Johnson.

**Core principle:** abstract concepts, the target domain, are understood through concrete physical experiences, the source domain.

| Abstract concept (target) | Physical metaphor (source) | Design implications |
|---------------------------|----------------------------|---------------------|
| Security | Vault, fortress, guardian | Bold lines, strong hierarchy, protective framing |
| Fluidity | River, water, flow | Gradients, organic shapes, scroll motion |
| Precision | Surgical tools, fine watch, conductor | Tight grids, exact spacing, clean type |
| Growth | Tree, garden, sunrise | Vertical layouts, organic expansion, warm colour |
| Transparency | Glass, clear water | Light backgrounds, open layouts, layered translucency |

**Key insight:** the most powerful metaphors blend multiple source domains to match multiple brand attributes at once.

---

## The three-step grounded metaphor process

### Step 1: thematic extraction (keyword mining)

**Objective:** scan brand documents to extract a grounded list of keywords.

Use targeted retrieval over the brand documents, for example the brand guidelines, a brand values document, the persona research and the project constitution. Search for brand attributes and core values, for emotional goals such as how the user should feel, and for functional goals such as what the product reduces, improves or enables.

**Output format:**

```markdown
Extracted keywords (with sources):
- "systematic" (brand guidelines, line 23)
- "expert" (brand values, line 15)
- "precision" (project constitution, line 42)
- "harmonious" (brand guidelines, line 67)
- "calm confidence" (brand values, line 8)
```

**Quality check:**
- Minimum five to seven keywords extracted
- Each keyword has a source citation, document and line
- Keywords represent diverse attributes, emotional and functional and brand personality

### Step 2: metaphor brainstorming (source domain mapping)

**Objective:** map each extracted keyword, a target domain, to two or three concrete physical metaphors, the source domains.

Example: systematic maps to orchestra, assembly line or fine watch. Calm maps to calm river, meditation garden or early morning. Expert maps to surgeon, master craftsperson or conductor. Harmonious maps to orchestra, ecosystem or dance.

**Pattern recognition.** Notice overlapping source domains. If systematic, expert and harmonious all point at an orchestra, a candidate metaphor emerges: Systematic Orchestra, which blends all three keywords.

### Step 3: consistency scoring and selection

**Objective:** score each candidate metaphor against all extracted attributes for holistic consistency.

| Candidate | systematic | expert | precision | harmonious | calm confidence | Total | Conflicts |
|-----------|-----------|--------|-----------|------------|-----------------|-------|-----------|
| Systematic Orchestra | +2 | +2 | +2 | +2 | +1 | 9/10 | None |
| Assembly Line | +2 | 0 | +1 | -1 | -2 | 0/10 | Conflicts with calm |
| Fine Watch | +2 | +1 | +2 | 0 | 0 | 5/10 | None, but weak |

**Scoring key:** +2 strong alignment, +1 moderate alignment, 0 neutral, -1 moderate conflict, -2 strong conflict (discard immediately).

**Selection criteria:**
1. Highest total score, aim for seven or more out of ten
2. Zero strong conflicts, no -2 scores
3. Breadth of coverage, supports multiple attributes not just one

**Selected metaphor:** Systematic Orchestra, nine out of ten, no conflicts, supports all five attributes.

---

## Verification: traceability mandate

**Requirement:** the great majority of metaphor elements, at least ninety five per cent, must be traceable to source document keywords.

**Verification template:**

```markdown
Metaphor grounding report: "Systematic Orchestra"

Element 1: "Systematic"
- Source keyword: "systematic"
- Source document: brand guidelines, line 23
- Evidence: "Our process is systematic and repeatable"
- Verified

Element 2: "Orchestra" (coordination and harmony)
- Source keyword: "harmonious"
- Source document: brand guidelines, line 67
- Evidence: "Harmonious integration of all components"
- Verified

Grounding rate: elements verified over elements total. Pass at ninety five per cent or above.
```

---

## Design application examples

### Example 1: "Calm River"

**Extracted keywords:** calm, transparent, efficient (reduce friction), fluid.

**Consistency scoring:**

| Metaphor | calm | transparent | efficient | fluid | Score |
|----------|------|-------------|-----------|-------|-------|
| Calm River | +2 | +2 | +2 | +2 | 8/8 |
| Ocean | +1 | 0 | -1 | +1 | 1/8 |
| Glass | 0 | +2 | 0 | -1 | 1/8 |

**Selected:** Calm River.

**Design implications expressed as tokens:**
- Colour tokens: blue-green gradient values, water inspired, defined as named brand colours rather than a stock default
- Shape tokens: organic, flowing forms rather than rigid rectangles
- Motion tokens: gentle scroll-triggered flow, content settling like water
- Type tokens: generous line height, softer weights
- Layout: asymmetric, natural flow rather than centred and balanced

### Example 2: "Organic Brutalism"

**Extracted keywords:** structural honesty, approachable, natural, bold.

**Consistency scoring:**

| Metaphor | structural | honest | approachable | natural | bold | Score |
|----------|-----------|--------|--------------|---------|------|-------|
| Organic Brutalism | +2 | +2 | +2 | +2 | +2 | 10/10 |
| Pure Brutalism | +2 | +2 | -2 | -2 | +2 | 2/10 |
| Pure Organic | -1 | 0 | +2 | +2 | -1 | 2/10 |

**Selected:** Organic Brutalism.

**Design implications expressed as tokens:**
- Colour tokens: a near-black and a warm earth tone, brutalist plus organic, both named brand colours
- Type tokens: large confident heading sizes with generous line height
- Layout: asymmetric grids with bold structural elements
- Shape tokens: raw geometric forms with softened edges
- Spacing tokens: deliberate asymmetric rhythm rather than uniform padding

---

## Anti-patterns

### Generic tech metaphors

Avoid overused metaphors such as rocket ship, cloud, highway or roadmap, bridge, lighthouse or Swiss Army knife. They are statistically averaged across thousands of AI outputs and produce homogeneous designs indistinguishable from competitors.

### Ungrounded creative hallucination

Do not invent elements that are not traceable to the brand. If a proposed metaphor such as Cosmic Symphony uses words that never appear in the brand documents, the grounding check fails. Retrieval over the brand documents returns no support, so the metaphor is pure generation, not grounded synthesis. Discard it.

### Conflicting metaphor elements

Do not combine elements that fight each other. A Fast Fortress conflicts on speed, because a fortress implies slow, heavy and defensive. The consistency score flags fast at -2. Confused metaphors produce confused design direction.

### Single-attribute metaphors

Do not select a metaphor that supports only one attribute and conflicts with the rest. A Vault scores well on secure but conflicts with fast and approachable. Aim for metaphors that support three or more attributes with minimal conflicts.

---

## Metaphor library (reusable inspiration)

These are inspiration examples, not templates. Always derive the metaphor from the project's own brand documents.

- Calm River: transparency, efficiency, reduce friction
- Clear Pathways: guidance, simplicity, transparency
- Systematic Orchestra: expert coordination, precision, harmonious
- Gentle Precision: care, accuracy, approachable
- Organic Architecture: structured, natural growth, flexible
- Crystalline Logic: transparent, precise, elegant
- Expert Cartography: guidance, precision, exploration
- Strategic Tapestry: interconnected, strategic, crafted

---

## Integration with other skills

**Prerequisites:**
- `agentic-rag-methodology`: use targeted retrieval and query decomposition to extract keywords

**Used by:**
- `anti-ai-design-checklist`: the metaphor must exist before the five constraints can be applied
- `creative-meta-prompting`: consumes the metaphor and its cited keywords

**Workflow:**
```
Agentic RAG -> extract keywords ->
Grounded metaphor generation (this skill) -> generate metaphor ->
Anti-AI design checklist -> reframe constraints ->
Creative meta-prompting -> final brief
```

---

## Best practices

- Extract five to seven keywords minimum. More keywords mean richer brainstorming and a stronger metaphor.
- Cite every keyword source granularly, document and line and quote, so it can be verified.
- Score every candidate against all extracted keywords, not a convenient subset, to surface conflicts early.
- Document rejection reasoning so a failed idea is not revisited.
