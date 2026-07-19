---
name: creative-meta-prompting
description: Synthesize research, a grounded metaphor and hard constraints into a structured creative meta-prompt that guides downstream design and build while preserving human creative agency. Use as the final step of the creative workflow, after metaphor generation and constraint analysis, to produce a design-ready brief for implementation agents or human designers. Target neutral, so the brief drives token choices for any build target rather than a specific stack.
---

# Creative Meta-Prompting for Design Direction

## Overview

**Purpose:** Teach how to synthesise research outputs, grounded metaphors and constraints into structured creative meta-prompts that guide downstream design and implementation while preserving designer agency.

**When to use:** The final step of the creative workflow, after metaphor generation and constraint analysis, creating a design-ready brief for implementation agents or human designers.

**Target neutral.** A meta-prompt sets creative direction and names the tokens that direction implies. It never assumes a build stack. The same brief can drive a WordPress plus Breakdance build or an Astro plus Payload build, because both consume the same tokens.

---

## The problem: direct generation versus meta-prompt guidance

**Direct generation, avoid.** A blank prompt such as generate a homepage for this company yields a generic template with default colours, a centred layout and stock imagery, because the model defaults to statistical averages.

**Meta-prompt guidance, use.** A meta-prompt gives specific creative direction: embody this grounded metaphor, solve this creative puzzle, hero this differentiator. Downstream design then works from a considered brief rather than a blank slate.

**Key difference:** meta-prompts are creative direction, not finished designs. They preserve human creative agency while accelerating the research and synthesis phases. No AI output is approved by AI, so the meta-prompt feeds a human-owned design decision, never an automatic ship.

---

## Meta-prompt structure and format

### The six-section template

All meta-prompts include six sections.

#### 1. Core creative metaphor

**Purpose:** anchor every design decision in a grounded visual and tonal framework.

**Required elements:**
- Metaphor name, a clear memorable phrase
- Source keywords, three to five brand keywords with citations
- Visual implications, described as token intentions (colour, shape, spacing, motion), not as stack-specific classes
- Tonal implications, the emotional quality of the design

**Example:**

```markdown
## 1. Core creative metaphor

Your design must embody the grounded metaphor of "The Systematic Orchestra".

Derived from the research keyword "systematic". It presents the platform as a
conductor coordinating many specialists to perform a complex score with
precision and harmony.

Visuals (as token intentions):
- Clean, rhythmic, grid-based layouts, using the graded spacing tokens
- Whitespace as the pause between notes, controlled pacing via spacing tokens
- Elegant data visualisation, using named brand colour tokens, not stock defaults

Tone:
Confident, precise, expert, harmonious. Every element feels intentional.
```

#### 2. Core user problem to solve

**Purpose:** ground the design in a specific pain point from research, not a generic challenge.

**Required elements:** the specific cited pain point, brief emotional context, and the mandate that the design must visually address it.

```markdown
## 2. Core user problem to solve

This design must solve this specific pain point from the research:
"[cited pain point from the persona research]".
[One line on emotional or business impact.]
```

#### 3. Core value proposition to showcase

**Purpose:** ensure the design heroes the key differentiator, not a generic feature list.

```markdown
## 3. Core value proposition to showcase

Every design choice must hero this differentiator:
"[key differentiator, cited from the brand guidelines]".
[One line on why this is the proof, not just a feature.]
```

#### 4. The creative puzzle (constraint as creativity)

**Purpose:** reframe a hard constraint as a generative challenge rather than a restrictive filter.

```markdown
## 4. The creative puzzle (constraint as creativity)

You face a creative puzzle based on this constraint:
"[state the constraint, cited from its source]".

Your challenge: [reframe as a generative question that forces lateral thinking].
[Optional: suggest two or three techniques to explore, without mandating a solution.]
```

**Constraint as creativity matrix:**

| Constraint type | Restrictive filter prompt (avoid) | Creative puzzle prompt (use) |
|-----------------|-----------------------------------|------------------------------|
| Negative (no people) | Do not use images of people. | How can you evoke human trust and fluidity without photographs of people? Explore abstract shapes, light, motion, type. |
| Positive (legal text) | Include a three-paragraph legal disclosure. | How can you integrate dense legal text without disrupting the primary flow? Invent novel structure such as progressive disclosure and hierarchy. |
| Technical (no video) | Do not use auto-playing video. | How can you create a dynamic experience without video? Explore scroll motion, micro-interactions, generative art. |

#### 5. Mood board (from research)

**Purpose:** provide concrete visual references to guide style, not abstract descriptions.

**Required elements:** three to five links to visual inspiration, a brief note on what to draw from each, and a clear statement that these are inspiration, not templates to copy.

```markdown
## 5. Mood board

Use these references as visual inspiration:
- [reference 1]: [what to draw from it, for example a gradient technique]
- [reference 2]: [what to draw from it, for example an asymmetric grid]
- [reference 3]: [what to draw from it, for example a data visualisation style]

These are creative anchors, not templates to replicate.
```

Curate references through research and web search. Keep them related to the grounded metaphor keywords.

#### 6. Required section ideas

**Purpose:** structure the work with section by section creative direction.

**Required elements:** five to seven key sections, each showing how it embodies the metaphor, how it solves the creative puzzle, and specific direction rather than a generic instruction.

```markdown
## 6. Required section ideas

1. Hero section: [specific direction tied to the metaphor]
2. Problem section: [how to visually represent the pain point]
3. Solution section: [how to showcase the differentiator]
4. Trust or proof section: [how to solve the creative puzzle]
5. Call to action section: [single clear action, tone aligned]
```

---

## Synthesis process: from research to meta-prompt

**Prerequisites:** completed research, grounded metaphor generation, constraint analysis.

### Step 1: gather synthesis inputs

```markdown
Inputs checklist:
- Selected pain point (from research)
- Selected differentiator (from research)
- Selected constraint (from research)
- Grounded metaphor (name, cited keywords, consistency score of seven or more)
- Visual references (three to five, with context)
```

If any input is missing, stop and return to the previous phase.

### Step 2: write section 1 (core creative metaphor)

State the metaphor name, cite the source keywords, then translate the metaphor into specific token intentions:
- Colour: name the intended brand colour tokens and their character, for example a blue-green gradient rather than a stock default
- Shape: describe the intended forms, organic or structural
- Spacing: describe the intended rhythm through the graded spacing tokens
- Motion: name the intended motion character
- Components: describe the intended treatment, for example layered translucent surfaces

Avoid vague descriptions such as modern or clean. Prefer specific direction such as rhythmic grid pacing using the graded spacing tokens to create a musical feel.

### Step 3: write sections 2 and 3 (problem and value)

Copy the exact pain point and the exact differentiator from research, each with a citation. Add at most one line of context. Downstream work needs the raw research, not your paraphrase.

### Step 4: write section 4 (creative puzzle)

State the constraint exactly as written in its source. Reframe it as a generative question, for example how can you achieve the goal without the forbidden element. Optionally suggest two or three techniques to explore without mandating a solution.

### Step 5: write section 5 (mood board)

List three to five references, note the specific aspect to draw from each, and add the disclaimer that these are anchors, not templates. References must relate to the metaphor keywords.

### Step 6: write section 6 (required sections)

List five to seven standard sections. For each, connect it to the metaphor, connect it to the constraint, and give specific direction rather than a generic instruction.

### Step 7: self-critique and refinement

```markdown
Meta-prompt quality checklist:
- [ ] Metaphor traceable to three or more cited brand keywords
- [ ] Visual implications expressed as specific token intentions
- [ ] Pain point cited with a document reference
- [ ] Differentiator cited with a document reference
- [ ] Constraint reframed as a generative puzzle, not a filter
- [ ] Three to five mood board references with context
- [ ] Each required section has specific creative direction
- [ ] No generic descriptions such as modern, clean or professional
- [ ] No finished design output, guidance only
```

Pass threshold: at least seven of the nine checks. If fewer, refine and re-check.

---

## Worked example: "The Calm River"

**Context:** a project management tool for enterprise teams.

**Inputs:** pain point, scattered information across many tools causing daily friction. Differentiator, a single source of truth with real-time transparency. Constraint, no stock photos of people. Metaphor, Calm River, from calm, transparent, efficient and fluid.

```markdown
# Creative meta-prompt: The Calm River

## 1. Core creative metaphor
Embody "The Calm River", derived from "calm", "transparent", "efficient" and
"reduce chaos". The platform is a river that carries scattered information
smoothly and transparently to its destination, turning chaos into calm control.

Visuals (as token intentions):
- Fluid, organic shapes rather than rigid rectangles
- A water-inspired blue-green palette, defined as named brand colour tokens
- Gentle scroll motion, content settling like water, via the motion tokens
- Layered translucent surfaces to suggest clear water

Tone: serene, confident, effortless.

## 2. Core user problem to solve
"Scattered information across many tools causing daily friction."
(persona research, primary persona). The flow must show consolidation to
clarity to control.

## 3. Core value proposition to showcase
Hero "a single source of truth with real-time transparency."
(brand guidelines). It is the proof of calm, not just a feature.

## 4. The creative puzzle (constraint as creativity)
Constraint: "evoke trust and collaboration without photographs of people."
(project constitution). Also integrate a dense legal disclosure without
breaking the calm flow.
Challenge: use abstract water visuals, gentle motion and elegant type to build
human trust without humans, and make the legal text feel like a natural part of
the river rather than a dam blocking it. Explore flow visualisations,
connected-node collaboration motifs and progressive disclosure.

## 5. Mood board
- [reference]: gradient technique for organic backgrounds
- [reference]: data flow as a metaphor for information movement
- [reference]: colour palette reference in the blue-green range
These are creative anchors, not templates to replicate.

## 6. Required section ideas
1. Hero: flowing gradient background, headline that settles on scroll.
2. Problem: scattered tool icons consolidating into a single flow on scroll.
3. Solution: layered translucent surfaces revealing features, each flowing into
   the next.
4. Trust: instead of client logos, a transparency indicator showing real-time
   reliability, reinforcing the calm river metaphor.
5. Compliance: legal text in an elegant progressive-disclosure pattern with a
   river-flavoured heading, expanding smoothly.
```

---

## Anti-patterns

### Generic design instructions

Do not write your design should be modern, clean and professional, use blue and clean layouts. Zero specificity, no grounded metaphor, and a default palette produce a template.

### Missing research traceability

Do not write users are frustrated with current solutions. A vague problem yields a vague solution. Cite the exact research artefact.

### Constraint as filter, not puzzle

Do not write do not use stock photos of people. That is a restrictive filter and yields subtractive design. Instead write how can you evoke human trust without photographs of people, exploring connected-node motifs and abstract human forms.

### Direct design output, not a meta-prompt

Do not hand down a finished specification with exact type sizes, exact colours and exact button copy. That removes all agency from the downstream designer. Guide the creativity, do not prescribe the pixels. For example, the hero must visualise the Calm River metaphor through a flowing gradient, with the call to action placed asymmetrically to break static symmetry.

---

## Integration with other skills

**Prerequisites:**
- `agentic-rag-methodology`: provides the research inputs
- `grounded-metaphor-generation`: provides the metaphor and cited keywords
- `anti-ai-design-checklist`: provides the constraint reframing framework and the creative-quality bar

**Workflow:**
```
Agentic RAG -> extract inputs ->
Grounded metaphor -> generate metaphor ->
Anti-AI design checklist -> reframe constraints ->
Creative meta-prompting (this skill) -> structured brief ->
Human-owned design decision -> build against tokens
```

---

## Best practices

- Specific over generic. Prefer asymmetric layouts with intentional spacing rhythm over use modern design principles.
- Cite all research sources with document and reference.
- Preserve designer agency. Guide with metaphor and intent rather than prescribing exact measurements.
- Integrate the metaphor throughout, so every section references the core concept.
