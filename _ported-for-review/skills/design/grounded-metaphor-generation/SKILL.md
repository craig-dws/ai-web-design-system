# Grounded Metaphor Generation for Creative Design

## Overview

**Category:** design
**Type:** knowledge + methodology
**Purpose:** Teach the 3-step grounded metaphor process (Extract → Blend → Score) to generate creative metaphors verifiably derived from source documents, preventing "AI aesthetic" drift.

**When to Use:** Creative concept generation, brand storytelling, hero section design, any scenario requiring unique visual/tonal direction grounded in brand identity.

---

## The Problem: Ungrounded Creativity = Generic AI Defaults

### Why Metaphors Matter

**Metaphors shape design decisions:**
- Visual metaphor "Calm River" → fluid gradients, organic shapes, generous whitespace
- Visual metaphor "Systematic Orchestra" → rhythmic grids, precise spacing, data visualizations
- Visual metaphor "Fortress" → bold typography, high contrast, structural layouts

**The Generic Metaphor Trap:**

❌ **Ungrounded (AI Default) Metaphors:**
- "Rocket ship" (overused tech startup cliché)
- "Swiss Army knife" (generic multi-tool metaphor)
- "Bridge" (vague connection metaphor)
- "Lighthouse" (overused guidance metaphor)

**Result:** These produce statistically average, visually homogeneous designs because they're not anchored to specific brand attributes.

✅ **Grounded Metaphors:**
- "Calm River" - derived from brand keywords: "calm," "transparent," "efficient," "reduce friction"
- "Systematic Orchestra" - derived from: "systematic," "expert," "harmonious," "precision"
- "Organic Brutalism" - derived from: "structural," "honest," "natural," "approachable"

**Result:** Unique, brand-specific designs with 95%+ traceability to source documents.

---

## Conceptual Metaphor Theory Primer

**Foundation:** Conceptual Metaphor Theory (CMT) by Lakoff & Johnson

**Core Principle:** Abstract concepts (Target Domain) are understood through concrete physical experiences (Source Domain).

### Target Domain → Source Domain Mapping

| Abstract Concept (Target) | Physical Metaphor (Source) | Design Implications |
|---------------------------|----------------------------|---------------------|
| **Security** | Vault, Fortress, Guardian | Bold lines, strong hierarchy, protective framing |
| **Fluidity** | River, Water, Flow | Gradients, organic shapes, scroll animations |
| **Precision** | Surgical tools, Swiss watch, Orchestra conductor | Tight grids, exact spacing, clean typography |
| **Growth** | Tree, Garden, Sunrise | Vertical layouts, organic expansion, warm colors |
| **Transparency** | Glass, Clear water, X-ray | Glassmorphism, light backgrounds, open layouts |

**Key Insight:** The most powerful metaphors blend multiple source domains to match multiple brand attributes simultaneously.

---

## The 3-Step Grounded Metaphor Process

### Step 1: Thematic Extraction (Keyword Mining)

**Objective:** Scan brand documents to extract grounded list of keywords.

**Tool:** `Grep` with targeted patterns

**Example Grep Queries:**

```markdown
# Extract Brand Attributes
Grep("brand attribute:|core value:", BRAND_GUIDELINES.md)

# Extract Emotional Goals
Grep("feel|emotion|experience", brand-values.md)

# Extract Functional Goals
Grep("reduce|improve|enable|simplify", BRAND_GUIDELINES.md, CLAUDE.md)
```

**Output Format:**

```markdown
EXTRACTED KEYWORDS (with sources):
- "systematic" (BRAND_GUIDELINES.md, line 23)
- "expert" (brand-values.md, line 15)
- "precision" (CLAUDE.md, line 42)
- "harmonious" (BRAND_GUIDELINES.md, line 67)
- "calm confidence" (brand-values.md, line 8)
```

**Quality Check:**
- ✅ Minimum 5-7 keywords extracted
- ✅ Each keyword has source citation (document + line number)
- ✅ Keywords represent diverse attributes (emotional + functional + brand personality)

### Step 2: Metaphor Brainstorming (Source Domain Mapping)

**Objective:** Map extracted keywords (Target Domain) to concrete physical metaphors (Source Domain).

**Process:**

For each extracted keyword, brainstorm 2-3 possible source domains:

**Example Brainstorming Session:**

```markdown
Keyword: "systematic"
Source Domains:
  - Orchestra (systematic coordination of musicians)
  - Assembly line (systematic production process)
  - Swiss watch (systematic mechanical precision)

Keyword: "calm"
Source Domains:
  - Calm river (peaceful water flow)
  - Meditation garden (serene landscape)
  - Early morning (quiet, peaceful time)

Keyword: "expert"
Source Domains:
  - Surgeon (expert precision)
  - Master craftsman (expert skill)
  - Orchestra conductor (expert coordination)

Keyword: "harmonious"
Source Domains:
  - Orchestra (musical harmony)
  - Ecosystem (natural harmony)
  - Dance (coordinated movement)
```

**Pattern Recognition:**

Notice overlapping source domains:
- "systematic" → Orchestra
- "expert" → Orchestra conductor
- "harmonious" → Orchestra

**Candidate Metaphor Emerges:** "Systematic Orchestra" (blends all three keywords)

### Step 3: Consistency Scoring & Selection

**Objective:** Score candidate metaphors against ALL extracted brand attributes for holistic consistency.

**Scoring Matrix:**

| Candidate Metaphor | "systematic" | "expert" | "precision" | "harmonious" | "calm confidence" | **Total Score** | **Conflicts?** |
|--------------------|--------------|----------|-------------|--------------|-------------------|-----------------|----------------|
| **Systematic Orchestra** | ✅ +2 (strong fit) | ✅ +2 (conductor = expert) | ✅ +2 (musical precision) | ✅ +2 (harmony) | ✅ +1 (calm confidence in performance) | **9/10** | ❌ None |
| Assembly Line | ✅ +2 (systematic) | 0 (neutral) | ✅ +1 (mechanical precision) | ❌ -1 (lacks harmony) | ❌ -2 (stressful, not calm) | **0/10** | ⚠️ Conflicts with "calm" |
| Swiss Watch | ✅ +2 (systematic mechanism) | ✅ +1 (expert craftsmanship) | ✅ +2 (precision) | 0 (neutral) | 0 (neutral) | **5/10** | ❌ None, but weak |

**Scoring Key:**
- ✅ +2: Strong conceptual alignment
- ✅ +1: Moderate alignment
- 0: Neutral (no support, no conflict)
- ❌ -1: Moderate conflict
- ❌ -2: Strong conflict (discard immediately)

**Selection Criteria:**
1. **Highest total score** (aim for 7+/10)
2. **Zero strong conflicts** (no -2 scores)
3. **Breadth of coverage** (supports multiple attributes, not just one)

**Selected Metaphor:** "Systematic Orchestra" (9/10, no conflicts, supports 5/5 attributes)

---

## Verification: Traceability Mandate

**Requirement:** 95%+ of metaphor elements must be traceable to source document keywords.

**Verification Template:**

```markdown
METAPHOR GROUNDING REPORT: "Systematic Orchestra"

Element 1: "Systematic"
- Source Keyword: "systematic"
- Source Document: BRAND_GUIDELINES.md, line 23
- Evidence: "Our process is systematic and repeatable"
- ✅ VERIFIED

Element 2: "Orchestra" (coordination/harmony)
- Source Keyword: "harmonious"
- Source Document: BRAND_GUIDELINES.md, line 67
- Evidence: "Harmonious integration of all components"
- ✅ VERIFIED

Element 3: "Expert conductor" (implied in metaphor)
- Source Keyword: "expert"
- Source Document: brand-values.md, line 15
- Evidence: "We are experts in our field"
- ✅ VERIFIED

Element 4: "Musical precision" (implied in metaphor)
- Source Keyword: "precision"
- Source Document: CLAUDE.md, line 42
- Evidence: "Precision in technical implementation"
- ✅ VERIFIED

GROUNDING RATE: 4/4 elements verified = 100% ✅ PASS
```

**Pass Threshold:** ≥95% elements verified

---

## Design Application Examples

### Example 1: "Calm River" Metaphor

**Extracted Keywords:**
- "calm" (brand-values.md)
- "transparent" (BRAND_GUIDELINES.md)
- "efficient" (personas.md: "reduce friction")
- "fluid" (BRAND_GUIDELINES.md: "fluid user experience")

**Brainstorming:**
- "calm" → calm river, morning mist, meditation
- "transparent" → clear water, glass, crystal
- "efficient" → streamlined, flow, current
- "fluid" → water, river, liquid

**Overlap:** River metaphor appears in multiple keywords

**Consistency Scoring:**

| Metaphor | calm | transparent | efficient | fluid | Score |
|----------|------|-------------|-----------|-------|-------|
| **Calm River** | ✅ +2 | ✅ +2 (clear water) | ✅ +2 (flow = efficient movement) | ✅ +2 | **8/8** ✅ |
| Ocean | ✅ +1 | 0 | ❌ -1 (unpredictable) | ✅ +1 | **1/8** ❌ |
| Glass | 0 | ✅ +2 | 0 | ❌ -1 (rigid) | **1/8** ❌ |

**Selected:** "Calm River"

**Design Implications:**
- **Color Palette:** Blue-green gradients (water-inspired), not default Tailwind blue
- **Shapes:** Organic, flowing SVG paths (not rigid grids)
- **Animations:** Scroll-triggered flow animations (content "flowing" down page like water)
- **Typography:** Generous line-height (1.6-1.8), soft weights (300-400)
- **Layouts:** Asymmetric, natural flow (not centered/balanced)
- **UI Elements:** Glassmorphism effect (transparent layers = clear water metaphor)

### Example 2: "Organic Brutalism" Metaphor

**Extracted Keywords:**
- "structural honesty" (BRAND_GUIDELINES.md)
- "approachable" (brand-values.md)
- "natural" (BRAND_GUIDELINES.md: "natural flow")
- "bold" (BRAND_GUIDELINES.md: "bold personality")

**Brainstorming:**
- "structural" → architecture, brutalism, concrete
- "honest" → raw materials, unfinished, exposed structure
- "approachable" → soft, warm, natural
- "natural" → organic, earth tones, asymmetry

**Blended Metaphor:** "Organic Brutalism" (combines raw structural honesty with soft natural approachability)

**Consistency Scoring:**

| Metaphor | structural | honest | approachable | natural | bold | Score |
|----------|-----------|--------|--------------|---------|------|-------|
| **Organic Brutalism** | ✅ +2 (brutalism = structure) | ✅ +2 (raw materials) | ✅ +2 (organic softens brutalism) | ✅ +2 (organic forms) | ✅ +2 (brutalism = bold) | **10/10** ✅ |
| Pure Brutalism | ✅ +2 | ✅ +2 | ❌ -2 (harsh, uninviting) | ❌ -2 (concrete ≠ natural) | ✅ +2 | **2/10** ❌ |
| Pure Organic | ❌ -1 (lacks structure) | 0 | ✅ +2 | ✅ +2 | ❌ -1 (too soft) | **2/10** ❌ |

**Selected:** "Organic Brutalism"

**Design Implications:**
- **Color Palette:** Near-black (#1a1a1a) + warm beige (#e8d5b7) - brutalism + organic earth tones
- **Typography:** Large, confident headings (48-64px, brutalist) with generous line-height (organic)
- **Layouts:** Asymmetric grids (organic) with bold structural elements (brutalist)
- **Shapes:** Raw geometric forms (brutalism) with soft, irregular edges (organic)
- **Spacing:** Intentional whitespace asymmetry (organic rhythm, not uniform padding)

---

## Anti-Patterns (What NOT to Do)

### ❌ Anti-Pattern 1: Generic Tech Metaphors

```markdown
# DON'T USE THESE (OVERUSED):
- "Rocket ship" (every startup uses this)
- "Cloud" (generic SaaS metaphor)
- "Highway/Roadmap" (generic journey metaphor)
- "Bridge" (vague connection metaphor)
- "Lighthouse" (overused guidance metaphor)
- "Swiss Army knife" (generic versatility metaphor)
```

**Why They Fail:** These metaphors are statistically averaged from thousands of AI-generated outputs. They produce homogeneous designs indistinguishable from competitors.

### ❌ Anti-Pattern 2: Ungrounded Creative "Hallucinations"

```markdown
# DON'T DO THIS:
Metaphor: "Cosmic Symphony" 🚫
Keywords: "systematic," "expert," "calm"

PROBLEM: "Cosmic" and "Symphony" are not traceable to brand documents.
This is pure LLM generation (hallucination), not grounded synthesis.
```

**Grounding Check Failure:** Grep("cosmic", BRAND_GUIDELINES.md) → No results ❌

### ❌ Anti-Pattern 3: Conflicting Metaphor Elements

```markdown
# DON'T DO THIS:
Metaphor: "Fast Fortress" 🚫
Keywords: "fast," "secure"

PROBLEM:
- "Fortress" implies slow, heavy, defensive (conflicts with "fast")
- Consistency Score: "fast" ❌ -2 (strong conflict)
```

**Why It Fails:** Conflicting metaphor elements create confused design direction (fast animations but heavy visuals?).

### ❌ Anti-Pattern 4: Single-Attribute Metaphors

```markdown
# DON'T DO THIS:
Metaphor: "Vault" 🚫
Keywords: "secure," "fast," "approachable"

Consistency Scoring:
- "secure" ✅ +2 (vault = secure)
- "fast" ❌ -2 (vault = slow, heavy)
- "approachable" ❌ -2 (vault = intimidating)
Score: -2/6 FAIL

PROBLEM: Metaphor only supports ONE attribute, conflicts with others.
```

**Best Practice:** Metaphors should support 3+ brand attributes with minimal conflicts.

---

## Metaphor Library (Reusable Examples)

### Approved Grounded Metaphors

**Financial Services:**
- "Calm River" - transparency + efficiency + reduce friction
- "Clear Pathways" - guidance + simplicity + transparency
- "Structural Flow" - security + efficiency + modern

**Healthcare:**
- "Systematic Orchestra" - expert coordination + precision + harmonious
- "Gentle Precision" - care + accuracy + approachable
- "Clear Healing Stream" - transparent + natural + continuous

**Technology/SaaS:**
- "Organic Architecture" - structured + natural growth + flexible
- "Fluid Systems" - efficient + integrated + adaptive
- "Crystalline Logic" - transparent + precise + elegant

**Professional Services:**
- "Expert Cartography" - guidance + precision + exploration
- "Masterful Synthesis" - expert + integration + quality
- "Strategic Tapestry" - interconnected + strategic + crafted

**Note:** These are inspiration examples, NOT templates. Always derive metaphors from project-specific brand documents.

---

## Integration with Other Skills

**Prerequisites:**
- [`agentic-rag-methodology`](../agentic-rag-methodology/SKILL.md) - Use to extract keywords via query decomposition

**Workflow:**
```
Agentic RAG → Extract keywords →
Grounded Metaphor Generation (this skill) → Generate metaphor →
Constraint-as-Creativity → Reframe constraints →
Creative Meta-Prompting → Final output
```

**Verification:**
- Used by `metaphor-grounding-verifier` agent to validate 95%+ traceability

---

## Best Practices

### ✅ Best Practice 1: Extract 5-7 Keywords Minimum

More keywords = richer brainstorming = stronger metaphor.

```markdown
Minimum Viable Keywords: 5
Recommended Keywords: 7-10
Maximum Useful Keywords: 15 (beyond this, signal-to-noise decreases)
```

### ✅ Best Practice 2: Cite Every Keyword Source

```markdown
# GOOD CITATION:
"calm confidence" (brand-values.md, line 8: "We want users to feel calm confidence in their decisions")

# BAD CITATION:
"calm" (somewhere in brand docs)
```

Granular citations enable verification and traceability.

### ✅ Best Practice 3: Score Against ALL Keywords

```markdown
# DON'T:
Score metaphor against 2 keywords only

# DO:
Score metaphor against ALL extracted keywords (5-7+)
Identify conflicts early
Select metaphor with highest total score AND fewest conflicts
```

### ✅ Best Practice 4: Document Rejection Reasoning

```markdown
Candidate Metaphor: "Vault" REJECTED
Reason: Conflicts with "fast" (-2) and "approachable" (-2)
Alternative Selected: "Clear Pathways" (8/10 score, no conflicts)
```

Documenting rejected metaphors prevents revisiting failed ideas.

---

## Changelog

**v1.0 (2025-11-16):** Initial skill creation based on SOP: Agentic RAG & Creative Synthesis (DWS-SOP-GEM-002), Iris v2.1 reference, and "Systematic Orchestra" example output.

---

**Maintained By:** Design Systems Lead
**Next Review:** 2026-02-16
