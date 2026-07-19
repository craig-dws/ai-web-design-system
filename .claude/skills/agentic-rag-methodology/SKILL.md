---
name: agentic-rag-methodology
description: Apply the agentic retrieval workflow, decompose then retrieve in parallel then synthesize, to produce non-generic, research-grounded design concepts from a brand's own source documents. Use for all creative design concept generation, research-heavy projects, and any scenario requiring synthesis of disparate data sources. Target neutral, so it feeds the shared creative front-half regardless of build target.
---

# Agentic Retrieval Methodology for Creative Design

## Overview

**Purpose:** Teach the agentic retrieval workflow for creative synthesis, so concepts are non-generic and grounded in the brand's own source documents.

**When to use:** All creative design concept generation, research-heavy projects, and any scenario requiring synthesis of disparate data sources.

**Target neutral.** This is a research and synthesis method. Its output feeds the shared creative front-half, brief, research, creative direction, metaphor and tokens, which is identical regardless of whether the build target is WordPress plus Breakdance or Astro plus Payload.

---

## Why agentic retrieval, not summarise-first

**Summarise-first, avoid.** Compressing all source documents into a single summary before generation discards granular detail as noise, and the summary is itself the generic average of the sources. Every output built on that average is guaranteed to be generic.

**Single-query retrieval, insufficient.** Averaging a complex request into one query retrieves average chunks and cannot pull disparate data points from a single query, so it fails at creative synthesis.

**Agentic retrieval, viable.** Targeted, granular retrieval keeps information loss low and avoids generic averaging, because it retrieves specific, non-averaged data. It is designed for multi-source synthesis.

| Approach | Information loss | Generic averaging | Viable for synthesis |
|----------|-----------------|-------------------|----------------------|
| Summarise-first | High | High | No |
| Single-query retrieval | Low if precise | Medium | No |
| Agentic retrieval | Low | Low | Yes |

---

## The three-step workflow

### Step 1: query decomposition

**Principle:** break a complex creative request into multiple granular, parallel sub-queries.

Instead of get persona information, ask for the persona's primary frustration, the persona's emotional goal, and the persona's current behaviour patterns, as separate targeted queries.

```markdown
Sub-query 1: get the persona pain point
- Target: persona research
- Query: what is the persona's most critical frustration with current solutions?

Sub-query 2: get the key differentiator
- Target: brand guidelines
- Query: what is the single most important differentiator mentioned?

Sub-query 3: get the hard constraint
- Target: project constitution
- Query: what are the absolute technical or brand constraints?

Sub-query 4: get the core keywords
- Target: brand guidelines, brand values
- Query: what three to five thematic keywords define the brand personality?
```

### Step 2: parallel retrieval

**Principle:** execute the retrieval tasks together to gather disparate, specific data points.

Read the persona research for the frustration, read the brand guidelines for the differentiator, read the project constitution for the constraints, search the brand documents for emotional goals, and use web search for relevant external inspiration. The result is a structured set of non-averaged, highly specific data points ready for synthesis.

### Step 3: disparate synthesis

**Principle:** integrate the retrieved contexts into a single coherent, non-generic output.

```markdown
Integrate:
- Pain point: "[retrieved specific frustration]"
- Differentiator: "[retrieved unique value proposition]"
- Constraint: "[retrieved hard requirement]"
- Brand keywords: ["...", "...", "..."]
- External inspiration: "[retrieved trend]"

Synthesise a creative brief that:
1. Addresses the pain point with a visual solution
2. Heroes the differentiator as the core design anchor
3. Treats the constraint as a creative puzzle, not a filter
4. Embodies the brand keywords through a grounded metaphor
5. Draws on the external inspiration for innovation
```

---

## Templates

### Query decomposition template

```markdown
# Query planner

Task: generate a creative design concept for [project].

Step 1: decompose the request into five to seven granular sub-queries.
For each sub-query, specify the target document and the exact information
needed, focused on disparate data points that do not overlap.

Example sub-queries:
1. Retrieve the single most critical user frustration from the persona research.
2. Retrieve the top differentiator competitors do not offer from the brand
   guidelines.
3. Retrieve the mandatory constraint from the project constitution.
4. Retrieve three emotional adjectives describing the ideal experience from
   the brand values.
5. Find two unconventional design examples for the sector via web search.

Step 2: execute parallel retrieval for each sub-query.
Step 3: synthesise the retrieved data into a creative brief.
```

### Self-critique template (generic detection)

```markdown
# Self-critique: generic detection

Generic indicators:
- Buzzwords without specific application, such as innovative or user-friendly
- A cliche metaphor, such as rocket ship or lighthouse
- Vague design suggestions, such as modern layout or clean design
- No citations to source documents
- Could apply to any company in the sector

Non-generic indicators:
- Specific, traceable citations to source keywords
- A unique metaphor derived from brand-specific attributes
- Concrete direction expressed as token intentions and section structure
- Addresses a specific cited pain point
- Solves a specific constraint creatively

Decision:
If two or more generic indicators are present, refine the queries into more
granular sub-queries, re-retrieve and re-synthesise.
If zero or one, proceed.
```

### Refinement loop template

```markdown
# Iterative refinement

Trigger: self-critique detected generic output.
Root cause: query decomposition was not granular enough, so retrieval returned
broad, average chunks.

Refine:
"Get persona information"
->
"Get the persona's primary frustration with current tools"
"Get the persona's emotional state during that frustration"
"Get the persona's ideal outcome"

Execute: re-run retrieval with the refined sub-queries, verify the chunks are
specific, re-synthesise.
Validate: run self-critique again. Maximum two refinement loops, then escalate
to human review.
```

---

## Diagnostic playbook: retrieval failure modes

| Symptom | Root cause | Detection | Mitigation |
|---------|-----------|-----------|------------|
| Generic prompt, buzzwords but no specifics | Query plan not granular enough | Self-critique flags vagueness | Decompose into more specific sub-queries |
| Metaphor is off-brand or unverifiable | Ungrounded generation | Grounding check finds no source keyword | Discard and select a verifiable metaphor |
| Missing a mandatory detail | A sub-query was omitted | Checklist validation fails | Add a constraint-checking sub-query |
| Contradictory instructions | Conflict not resolved in synthesis | Conflict analysis finds unresolved tension | Reframe the conflict as a creative puzzle |

---

## Worked examples

### Example 1: enterprise project management tool

Single-query retrieval asks what is the brand identity and persona, retrieves generic collaborative and professional chunks, and produces a generic corporate template.

Agentic retrieval decomposes: primary frustration is scattered information across many tools causing daily friction. Key differentiator is a single source of truth with real-time transparency. Mandatory constraint is no stock photos of people. Three emotional keywords are calm, transparent and efficient. Synthesis yields a Calm River metaphor, a creative puzzle of evoking trust without people, and a distinctive fluid, layered, water-motion direction expressed as tokens.

### Example 2: regulated services compliance tool

Summarise-first yields professional, trustworthy, compliant, modern, and a generic default-blue centred hero with a stock photo. Agentic retrieval instead surfaces a critical user fear of compliance violations, a unique multi-expert review process, a constraint of no case studies for a new brand, and the keyword systematic. Synthesis yields a Systematic Orchestra metaphor, a creative puzzle of building trust without client logos, and a process-transparency direction that makes the method itself the proof.

---

## Anti-patterns

### Summarise-first

Reading everything into one comprehensive summary then generating from the summary discards the granular insight that creates uniqueness.

### Single generic query

Asking what should I know about this brand returns broad, averaged chunks that give no specific direction.

### No synthesis planning

Retrieving random chunks and combining them without an intentional structure yields incoherent output.

### Ignoring conflicts

Retrieving a playful voice and a formal legal requirement, then instructing be playful and also be formal, produces contradictory, unusable direction. Resolve the tension as a creative puzzle instead.

---

## Best practices

- Front-load query planning. Spend most of the effort on decomposition. Five to seven granular sub-queries beat one broad query, and design each to avoid overlap.
- Verify retrieval quality before synthesis. Are the chunks specific, diverse and actionable?
- Document traceability. Every creative claim cites its source, document and line.
- Iterate on genericness. Draft, self-critique, and if generic, refine, re-retrieve and re-synthesise, with a maximum of two loops before human review.

---

## Integration with other skills

**Related skills:**
- `grounded-metaphor-generation`: uses agentic retrieval to extract keywords for the metaphor
- `anti-ai-design-checklist`: uses retrieved constraints as synthesis inputs and the creative-quality bar
- `creative-meta-prompting`: synthesises the retrieval outputs into the final brief

**Workflow:**
```
Agentic retrieval (this skill) -> extract keywords ->
Grounded metaphor generation -> generate metaphor ->
Anti-AI design checklist -> reframe constraints ->
Creative meta-prompting -> final brief
```
