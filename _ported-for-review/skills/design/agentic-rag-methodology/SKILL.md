# Agentic RAG Methodology for Creative Design

## Overview

**Category:** design
**Type:** knowledge + methodology
**Purpose:** Teach agents the Agentic RAG workflow for creative synthesis to produce non-generic, research-grounded design concepts.

**When to Use:** All creative design concept generation tasks, research-heavy projects, and any scenario requiring synthesis of disparate data sources.

---

## Why Agentic RAG (Not Summarizer-First)

### The Problem with Traditional Approaches

**Summarizer-First Architecture** (FORBIDDEN):
- Compresses all source documents into a single summary before generation
- **Information Loss:** Granular details are algorithmically identified as "noise" and discarded
- **Generic Averaging:** The summary IS the "generic average" of source materials
- **Result:** Every output based on this average is guaranteed to be generic

**Traditional RAG** (INSUFFICIENT):
- Single-query retrieval: complex queries "averaged" into one vector
- **Retrieval Bias:** Retrieves "average" chunks, leading to generic context
- **Synthesis Failure:** Cannot retrieve disparate data points from a single complex query
- **Result:** Fails at creative synthesis tasks requiring multiple perspectives

### Why Agentic RAG Works

| Architecture | Information Loss | Generic Averaging | Viability for Creative Synthesis |
|-------------|-----------------|-------------------|----------------------------------|
| Summarizer-First | **High** (granular details discarded) | **High** (summary = average) | **Failed** (structurally incapable) |
| Traditional RAG | Low (retrievable if query precise) | **Medium** (complex queries retrieve average chunks) | **Failed** (cannot retrieve disparate data from single query) |
| **Agentic RAG** | **Low** (targeted granular retrieval) | **Low** (retrieves specific, non-averaged data) | **✅ Viable** (designed for multi-source synthesis) |

---

## The 3-Step Agentic RAG Workflow

### Step 1: Query Decomposition

**Principle:** Break complex creative requests into multiple, granular, parallel sub-queries.

**Example Transformation:**

❌ **Generic Query:** "Get persona information"
✅ **Granular Sub-Queries:**
- "Retrieve persona's primary *frustration*"
- "Retrieve persona's emotional *goal*"
- "Retrieve persona's *current behavior* patterns"

**Tool Calling Pattern:**

```markdown
Sub-Query 1: Get Persona Pain Point
- Target: personas.md
- Query: "What is [Persona A]'s most critical frustration with current solutions?"

Sub-Query 2: Get Key Differentiator
- Target: BRAND_GUIDELINES.md
- Query: "What is the single most important differentiator mentioned?"

Sub-Query 3: Get Hard Constraint
- Target: CLAUDE.md
- Query: "What are the absolute technical or brand constraints?"

Sub-Query 4: Get Core Keywords
- Target: BRAND_GUIDELINES.md, brand-values.md
- Query: "What 3-5 thematic keywords define the brand personality?"
```

### Step 2: Parallel Retrieval

**Principle:** Execute multiple retrieval tasks simultaneously to gather disparate, specific data points.

**Implementation:**

```markdown
EXECUTE PARALLEL:
- Read(personas.md) → extract frustration
- Read(BRAND_GUIDELINES.md) → extract differentiator
- Read(CLAUDE.md) → extract constraints
- Grep("emotional", BRAND_GUIDELINES.md) → extract emotional goals
- WebSearch("industry design trends 2025") → gather external inspiration
```

**Result:** Structured set of *non-averaged*, highly specific data points ready for synthesis.

### Step 3: Disparate Synthesis

**Principle:** Integrate retrieved disparate contexts into a single, coherent, non-generic output.

**Synthesis Template:**

```markdown
INTEGRATE:
- Pain Point: "[Retrieved specific frustration]"
- Differentiator: "[Retrieved unique value prop]"
- Constraint: "[Retrieved hard requirement]"
- Brand Keywords: ["[keyword1]", "[keyword2]", "[keyword3]"]
- External Inspiration: "[Retrieved industry trend]"

SYNTHESIZE:
Create creative meta-prompt that:
1. Addresses [Pain Point] with visual solution
2. Heroes [Differentiator] as core design anchor
3. Treats [Constraint] as creative puzzle (not filter)
4. Embodies [Brand Keywords] through grounded metaphor
5. Draws from [External Inspiration] for innovation
```

---

## Meta-Prompt Templates

### Query Decomposition Template

```markdown
# Agentic Query Planner

Your task: Generate creative design concept for [PROJECT]

Step 1: Decompose this request into 5-7 granular sub-queries.

For each sub-query:
- Specify target document
- Specify exact information needed (not generic summaries)
- Focus on disparate data points (not overlapping information)

Example Sub-Queries:
1. "Retrieve the SINGLE most critical user frustration from personas.md"
2. "Retrieve the TOP differentiator that competitors don't offer from BRAND_GUIDELINES.md"
3. "Retrieve the MANDATORY compliance constraint from CLAUDE.md"
4. "Retrieve 3 emotional adjectives describing ideal user experience from brand-values.md"
5. "Find 2 unconventional design examples related to [industry] via WebSearch"

Step 2: Execute parallel retrieval for each sub-query.

Step 3: Synthesize retrieved data into creative meta-prompt.
```

### Self-Critique Template (Generic Detection)

```markdown
# Self-Critique: Generic Detection

Review your generated output against these criteria:

❌ GENERIC INDICATORS:
- Uses brand buzzwords without specific application ("innovative," "cutting-edge," "user-friendly")
- Creative metaphor is cliché ("rocket ship," "Swiss Army knife," "lighthouse," "bridge")
- Design suggestions are vague ("modern layout," "clean design," "professional look")
- No specific citations to source documents
- Could apply to any company in this industry

✅ NON-GENERIC INDICATORS:
- Specific, traceable citations to source keywords
- Unique metaphor derived from brand-specific attributes
- Concrete design specifications (Tailwind classes, component names, layout structure)
- Addresses specific pain point from research
- Solves specific constraint creatively

DECISION:
If 2+ generic indicators present → REFINE QUERIES (more granular decomposition) → RE-RETRIEVE → RE-SYNTHESIZE
If 0-1 generic indicators → OUTPUT as final meta-prompt
```

### Refinement Loop Template

```markdown
# Iterative Refinement Protocol

TRIGGER: Self-critique detected generic output.

ROOT CAUSE: Query decomposition not granular enough → retrieved broad, average chunks.

REFINEMENT PROCESS:

Original Sub-Query: "Get persona information"
↓
Refined Sub-Query 1: "Get persona's primary *frustration* with current tools"
Refined Sub-Query 2: "Get persona's *emotional state* when experiencing this frustration"
Refined Sub-Query 3: "Get persona's *ideal outcome* (what success looks like)"

EXECUTE:
- Re-run retrieval with refined sub-queries
- Verify retrieved chunks are specific (not generic summaries)
- Re-synthesize with more granular data

VALIDATE:
- Run self-critique again
- Max 2 refinement loops (if still generic after 2 loops → escalate to human review)
```

---

## Diagnostic Playbook: RAG Failure Modes

| Symptom | Root Cause | Detection Method | Mitigation |
|---------|-----------|------------------|------------|
| **Prompt is generic, uses buzzwords but no specifics** | Retrieval Failure: Query plan not granular enough | Self-Critique step flags "vagueness" | **Iterative Query Refinement:** Decompose into more specific sub-queries |
| **Creative metaphor is off-brand or unverifiable** | Generation Failure: Un-grounded creativity | Grounding-Check Module fails to find source keyword | **Flag & Re-run:** Discard hallucination, select different verifiable metaphor |
| **Missing mandatory detail (e.g., third UX constraint)** | Retrieval Failure: Sub-query omitted | Mandatory Checklist Validation fails | **Meta-Prompt Refinement:** Add mandatory constraint-checking sub-query |
| **Contradictory instructions (e.g., "playful" and "formal")** | Synthesis Failure: Conflict not resolved | Conflict Analysis identifies unresolved tension | **Constraint-as-Creativity:** Reframe conflict as creative puzzle to solve |

---

## Examples

### Example 1: Financial Services SaaS Platform

**User Request:** "Generate creative concept for enterprise project management tool landing page"

**❌ Traditional RAG (Single Query):**
```markdown
Query: "What is the brand identity and target persona for this project?"
Retrieved: Generic summary chunks about "collaborative," "efficient," "professional users"
Result: Generic blue/gray corporate template with "Get Started" CTA
```

**✅ Agentic RAG (Decomposed Queries):**
```markdown
Sub-Query 1: "Retrieve persona's PRIMARY frustration" → "Scattered information across 5 tools causing daily friction"
Sub-Query 2: "Retrieve KEY differentiator" → "Single source of truth with real-time transparency"
Sub-Query 3: "Retrieve MANDATORY constraint" → "No stock photos of people"
Sub-Query 4: "Retrieve 3 emotional keywords" → ["calm," "transparent," "efficient"]

Synthesis:
- Pain Point: Information scatter
- Metaphor: "Calm River" (from keywords: calm + transparent + efficient flow)
- Creative Puzzle: "Evoke trust without showing people"
- Result: Unique design with fluid gradients, glassmorphism UI, water-flow animations
```

### Example 2: Healthcare Compliance Tool

**User Request:** "Design landing page for medical practice compliance software"

**❌ Generic Approach:**
```markdown
Query: "Summarize all brand documents"
Result: "Professional, trustworthy, compliant, modern"
Output: Generic healthcare blue (#0066CC), centered hero, stock photo of doctor
```

**✅ Agentic RAG Approach:**
```markdown
Sub-Query 1: "Retrieve CRITICAL user fear" → "Compliance violations risk (legal + reputational)"
Sub-Query 2: "Retrieve UNIQUE process" → "4-Persona Systematic Review (85+ score guarantee)"
Sub-Query 3: "Retrieve CONSTRAINT" → "No case studies available (new brand)"
Sub-Query 4: "Retrieve brand keyword" → "Systematic"

Synthesis:
- Pain Point: Compliance anxiety
- Metaphor: "Systematic Orchestra" (from "systematic" → orchestration of 4 expert personas)
- Creative Puzzle: "Build trust without client logos/case studies"
- Result: Process transparency visualization, 4-persona grid, guarantee-focused trust section
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Anti-Pattern 1: Summarize-First

```markdown
# DON'T DO THIS:
Step 1: Read all documents and create comprehensive summary
Step 2: Generate design concept from summary
Result: Generic averaging, loss of specific details
```

**Why It Fails:** Summary compression discards granular insights that create uniqueness.

### ❌ Anti-Pattern 2: Single Generic Query

```markdown
# DON'T DO THIS:
Query: "What should I know about this brand?"
Result: Broad, averaged chunks that don't provide specific creative direction
```

**Why It Fails:** Complex creative requests averaged into single vector = retrieval bias.

### ❌ Anti-Pattern 3: No Synthesis Planning

```markdown
# DON'T DO THIS:
Retrieve random chunks from documents
Combine them without intentional structure
Hope for creative output
```

**Why It Fails:** Disparate data without synthesis framework = incoherent output.

### ❌ Anti-Pattern 4: Ignoring Conflicts

```markdown
# DON'T DO THIS:
Retrieved: "Playful brand voice" + "Formal legal requirements"
Output: "Be playful. Also be formal."
```

**Why It Fails:** Unresolved conflicts create contradictory, unusable meta-prompts.

---

## Best Practices

### ✅ Best Practice 1: Front-Load Query Planning

Spend 60% of effort on query decomposition, 40% on synthesis.
- 5-7 granular sub-queries > 1 broad query
- Each sub-query targets disparate data point
- Sub-queries designed to avoid retrieval overlap

### ✅ Best Practice 2: Verify Retrieval Quality

Before synthesis, audit retrieved chunks:
- Are they specific? (Not generic summaries)
- Are they diverse? (Not all from same document section)
- Are they actionable? (Provide concrete creative direction)

### ✅ Best Practice 3: Document Traceability

Every creative claim must cite source:
```markdown
Metaphor: "Calm River"
Source Keywords: "calm" (brand-values.md, line 47), "transparent" (BRAND_GUIDELINES.md, line 23), "efficient" (personas.md, line 15)
```

### ✅ Best Practice 4: Iterate on Genericness

Use self-critique loop:
1. Generate draft output
2. Self-critique against generic indicators
3. If generic → refine queries → re-retrieve → re-synthesize
4. Max 2 iterations before human review

---

## Integration with Other Skills

**Related Skills:**
- [`grounded-metaphor-generation`](../grounded-metaphor-generation/SKILL.md) - Uses Agentic RAG to extract keywords for metaphor creation
- [`constraint-as-creativity`](../constraint-as-creativity/SKILL.md) - Uses retrieved constraints as synthesis inputs
- [`creative-meta-prompting`](../creative-meta-prompting/SKILL.md) - Synthesizes Agentic RAG outputs into final meta-prompts

**Workflow Integration:**
```
Agentic RAG (this skill) → Extract keywords →
Grounded Metaphor Generation → Generate metaphor →
Constraint-as-Creativity → Reframe constraints →
Creative Meta-Prompting → Final output
```

---

## Changelog

**v1.0 (2025-11-16):** Initial skill creation based on SOP: Agentic RAG & Creative Synthesis (DWS-SOP-GEM-002) and Iris v2.1 reference agent.

---

**Maintained By:** Design Systems Lead
**Next Review:** 2026-02-16
