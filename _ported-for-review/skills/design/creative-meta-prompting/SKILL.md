# Creative Meta-Prompting for Design Direction

## Overview

**Category:** design
**Type:** knowledge + framework
**Purpose:** Teach how to synthesize Agentic RAG outputs, grounded metaphors, and constraints into structured creative meta-prompts that guide downstream AI implementation while preserving designer agency.

**When to Use:** Final step of creative workflow after metaphor generation and constraint analysis, creating design-ready briefs for implementation agents or human designers.

---

## The Problem: Direct AI Generation vs. Meta-Prompt Guidance

### Why Meta-Prompts Matter

**Direct AI Generation (FORBIDDEN):**
```markdown
Prompt: "Generate a homepage design for this financial services company"
Result: Generic template with default colors, centered layout, stock imagery
Problem: AI defaults to statistical averages = homogeneous output
```

**Meta-Prompt Guidance (REQUIRED):**
```markdown
Meta-Prompt: "Your design must embody 'Calm River' metaphor (fluid gradients, organic asymmetry).
Solve this puzzle: Evoke trust without showing people. Hero this differentiator: Real-time transparency."

Result: Downstream AI receives SPECIFIC creative direction, not blank slate
Problem Solved: Constraints + metaphor + puzzle = unique, intentional design
```

**Key Difference:** Meta-prompts are creative direction for implementation, NOT final designs. They preserve human creative agency while accelerating research/synthesis phases.

---

## Meta-Prompt Structure & Format

### The 6-Section Template

Based on "The Systematic Orchestra" example (design-idea.md), all meta-prompts must include:

#### 1. Core Creative Metaphor

**Purpose:** Anchor all design decisions in grounded visual/tonal framework.

**Required Elements:**
- **Metaphor Name:** Clear, memorable phrase (e.g., "The Calm River," "Systematic Orchestra")
- **Source Keywords:** 3-5 brand keywords that generated metaphor (with citations)
- **Visual Implications:** Specific design treatments (colors, shapes, animations)
- **Tonal Implications:** Emotional quality of design (serene, confident, dynamic)

**Template:**

```markdown
## 1. Core Creative Metaphor

Your design must embody the grounded metaphor of **"[Metaphor Name]"**.

This concept is derived from the research keywords: "[keyword1]", "[keyword2]", "[keyword3]".

It visualizes [what metaphor represents in context of product/brand].

**Visuals:**
- [Specific color palette guidance: e.g., "Blue-green gradients (water-inspired), not default Tailwind blue"]
- [Specific shape/layout guidance: e.g., "Organic, flowing SVG paths (not rigid grids)"]
- [Specific animation guidance: e.g., "Scroll-triggered flow animations"]
- [Specific UI element guidance: e.g., "Glassmorphism effect (transparent layers)"]

**Tone:**
[1-2 sentence emotional quality: e.g., "Serene, confident, effortless. Every element feels smooth and intentional."]
```

**Example (from "Systematic Orchestra"):**

```markdown
## 1. Core Creative Metaphor

Your design must embody the grounded metaphor of **"The Systematic Orchestra"**.

This concept is derived from the research keyword **"Systematic"**. It visualizes the Bigger Boss platform as a master conductor, flawlessly orchestrating 97 specialist "agents" (the musicians) to perform a complex strategic "score" with precision, speed, and harmony.

**Visuals:**
- Use clean, rhythmic, grid-based layouts
- White space is the "pause" between notes, creating controlled, sophisticated pacing
- Data visualizations should be elegant, like light trails from a conductor's baton, not sterile bar charts

**Tone:**
Confident, precise, expert, and harmonious. Every element feels intentional, part of a larger, high-quality composition.
```

#### 2. Core User Problem to Solve

**Purpose:** Ground design in specific pain point from research, not generic challenges.

**Required Elements:**
- **Specific Pain Point:** Exact frustration from persona research (cited)
- **Emotional Context:** How user feels about this problem (anxiety, frustration, overwhelm)
- **Design Mandate:** Design must visually address this problem

**Template:**

```markdown
## 2. Core User Problem to Solve

This design must solve this specific pain point from the research: **"[Retrieved specific pain point from personas.md]"**

[Optional: Brief context about emotional impact or business consequences]
```

**Example:**

```markdown
## 2. Core User Problem to Solve

This design must solve this specific pain point from the research: **"Compliance Violations Risk (CRITICAL)"**. The user (Professional Paul persona) is anxious about legal review bottlenecks and the reputational/financial risk of non-compliant claims.
```

#### 3. Core Value Prop to Showcase

**Purpose:** Ensure design heroes the key differentiator, not generic features.

**Required Elements:**
- **Key Differentiator:** Single most important value proposition (from BRAND_GUIDELINES.md)
- **Not-Just-Feature Framing:** Explain WHY this matters (proof, evidence, transformation)
- **Design Mandate:** Every design choice must support this differentiator

**Template:**

```markdown
## 3. Core Value Prop to Showcase

Every design choice must hero this differentiator: **"[Key differentiator from research]"**

[1 sentence explaining why this is the proof/evidence that solves the problem, not just a feature]
```

**Example:**

```markdown
## 3. Core Value Prop to Showcase

Every design choice must hero this differentiator: **"The 4-Persona Systematic Review (85+ Score Guarantee)"**. This is not just a feature; it is the *proof* of quality. It must be visualized and explained with absolute clarity.
```

#### 4. The Creative Puzzle (Constraint-as-Creativity)

**Purpose:** Reframe constraint as generative challenge, not restrictive filter.

**Required Elements:**
- **Constraint Identified:** State the hard constraint (from CLAUDE.md, BRAND_GUIDELINES.md, compliance docs)
- **Reframed as Puzzle:** Turn "Don't use X" into "How can you achieve Y without X?"
- **Lateral Thinking Prompt:** Force downstream AI/designer to invent novel solution

**Template:**

```markdown
## 4. The Creative Puzzle (Constraint-as-Creativity)

You face a specific creative puzzle based on this constraint: **"[State constraint]"**

**Your challenge:** [Reframe as generative question forcing lateral thinking]

[Optional: Suggest 2-3 potential creative techniques to explore, but don't mandate solution]
```

**Example:**

```markdown
## 4. The Creative Puzzle (Constraint-as-Creativity)

You face a specific creative puzzle based on this constraint: **"The brand is new and has 'no case studies yet'"**.

**Your challenge:** How do you build 100% unshakeable trust *without* using any client logos or past-performance case studies? Your design must make the **process** (the 4-persona review) and the **guarantee** (the 85+ score) so transparent and robust that the methodology itself becomes the social proof.
```

**Constraint-as-Creativity Prompting Matrix:**

| Constraint Type | Restrictive "Filter" Prompt (AVOID) | Creative "Puzzle" Prompt (USE) |
|-----------------|-------------------------------------|--------------------------------|
| **Negative (No People)** | "Design a page. Do not use images of people." | "How can you evoke human trust and fluidity **without** using photographs of people? Explore abstract shapes, light, motion, typography." |
| **Positive (Legal Text)** | "Design a page. Include 3-paragraph legal disclosure." | "How can you integrate dense legal text without **disrupting** the primary user flow? Invent novel UI (toggles, expansion, hierarchy)." |
| **Technical (No Video)** | "Design a page. Do not use auto-playing video." | "How can you create highly engaging, dynamic experience **without** video? Explore scroll animations, micro-interactions, generative art." |

#### 5. Mood Board (from Research/Asset Finder)

**Purpose:** Provide concrete visual references to guide style, not abstract descriptions.

**Required Elements:**
- **URLs:** 3-5 links to visual inspiration (Behance, Dribbble, Unsplash)
- **Context:** Brief note on what aspect to draw from each reference
- **NOT templates:** Emphasize these are inspiration, not designs to copy

**Template:**

```markdown
## 5. Mood Board

Use these URLs as visual inspiration:
- [URL 1]: [What to draw from this - e.g., "Color gradient technique"]
- [URL 2]: [What to draw from this - e.g., "Asymmetric grid layout"]
- [URL 3]: [What to draw from this - e.g., "Data visualization style"]

These are creative anchors, not templates to replicate.
```

**Example:**

```markdown
## 5. Mood Board (from Asset Finder)

Use this URL as inspiration for visualizing "Systematic Orchestration":
- https://www.behance.net/gallery/183290143/Orchestral-Conducting-Data-Visualization
```

**Note:** If `visual-asset-finder` agent unavailable, conduct manual WebSearch and curate 3-5 examples.

#### 6. Required Section Ideas

**Purpose:** Structure implementation workflow with section-by-section creative direction.

**Required Elements:**
- **5-7 Key Sections:** Standard website sections (Hero, Problem, Solution, Trust, CTA, etc.)
- **Metaphor Integration:** Each section shows how to embody core metaphor
- **Constraint Integration:** Sections show how to solve creative puzzle
- **Specific Guidance:** NOT "create hero section" but "create hero that visualizes metaphor like [example]"

**Template:**

```markdown
## 6. Required Section Ideas

Based on this, generate a unique layout for the following sections:

1. **Hero Section:** [Specific creative direction tied to metaphor]
   - [What visual element must be present]
   - [How it embodies metaphor]

2. **Problem Section:** [How to visually represent the pain point]
   - [Specific technique or visualization]
   - [Connection to research]

3. **Solution (Features) Section:** [How to showcase differentiator]
   - [Visual treatment that proves value]
   - [Metaphor integration]

4. **Trust/Proof Section:** [How to solve the creative puzzle]
   - [Novel approach that addresses constraint]
   - [Why this builds trust]

5. **CTA Section:** [Single, clear action tied to journey]
   - [Tone alignment]
   - [Design treatment]
```

**Example:**

```markdown
## 6. Required Section Ideas

Based on this, generate a unique layout for the following sections:

1. **Hero Section:** Must visualize "The Systematic Orchestra" metaphor. Show a sense of controlled, complex orchestration delivering immediate clarity and confidence.

2. **Problem Section:** Must directly address the "Compliance Violations Risk." Use visuals that evoke anxiety (like redacted text, warning symbols) and contrast them with the solution.

3. **Solution (Features) Section:** Must showcase the "4-Persona Systematic Review." Use a 4-part visual layout to introduce each "expert" persona (SEO, UX, Conversion, Quality) and their role in the "orchestra."

4. **Trust/Proof Section:** Must solve the "Creative Puzzle." Instead of a "client logo" grid, create a "Process Transparency" grid. Visually break down the 85+ score guarantee and the AHPRA/ASIC compliance checks. Make the *system* the hero.

5. **CTA Section:** Must be a clear, single action that reinforces confidence, e.g., "Book Your Compliance & Quality Audit."
```

---

## Synthesis Process: From Research to Meta-Prompt

### Step-by-Step Workflow

**Prerequisites:** Completed Agentic RAG research, grounded metaphor generation, constraint analysis.

#### Step 1: Gather Synthesis Inputs

**Collect from previous phases:**

```markdown
INPUTS CHECKLIST:
✅ Selected Pain Point (from Agentic RAG Step 2)
✅ Selected Differentiator (from Agentic RAG Step 2)
✅ Selected Constraint (from Agentic RAG Step 2)
✅ Grounded Metaphor (from Metaphor Generation Step 3)
   - Metaphor name
   - Source keywords (with citations)
   - Consistency score (≥7/10)
✅ Visual References (from Asset Finder or manual WebSearch)
   - 3-5 URLs with context
```

**Validation:** If ANY input missing → STOP. Return to previous phase to complete extraction.

#### Step 2: Write Section 1 (Core Creative Metaphor)

**Process:**

1. State metaphor name (from Grounded Metaphor Generation)
2. Cite source keywords (copy from metaphor-framework.yml)
3. Translate metaphor into **specific visual implications**:
   - Colors: Reference Tailwind classes or hex codes (e.g., "Blue-green gradients `from-teal-400 to-cyan-300`")
   - Shapes: Describe geometric/organic forms (e.g., "Irregular grid with `col-span` variations")
   - Animations: Name animation types (e.g., "Scroll-triggered `fade-in-up` transitions")
   - UI Elements: Specify components (e.g., "Glassmorphism cards with `backdrop-blur-md`")
4. Define **tonal implications**: 1-2 sentence emotional quality

**Anti-Pattern:** Vague descriptions like "modern, clean design" ❌

**Best Practice:** Specific implementation guidance like "Rhythmic grid-based layouts with `gap-8 md:gap-16` creating musical pacing" ✅

#### Step 3: Write Sections 2-3 (Problem & Value Prop)

**Process:**

1. Copy-paste exact pain point from research (cite personas.md line number)
2. Copy-paste exact differentiator from research (cite BRAND_GUIDELINES.md)
3. NO additional text beyond brief context (1 sentence max)

**Why:** Downstream AI/designer needs raw research data, not your interpretation.

#### Step 4: Write Section 4 (Creative Puzzle)

**Process:**

1. State constraint exactly as written in source document
2. Reframe using Constraint-as-Creativity template:
   - "How can you [achieve goal] without [constraint]?"
   - "How can you [primary requirement] while [conflicting requirement]?"
3. Optional: Suggest 2-3 creative techniques to explore (but don't mandate solution)

**Example Reframing:**

```markdown
Constraint: "No stock photos of people"
↓
Puzzle: "How can you evoke trust and collaboration *without* using photographs of people?
Explore: abstract network visualizations, data-driven metaphors, generative art elements."
```

#### Step 5: Write Section 5 (Mood Board)

**Process:**

1. List 3-5 URLs from Asset Finder output or manual research
2. For each URL, note specific aspect to draw from (color technique, layout structure, animation style)
3. Add disclaimer: "These are creative anchors, not templates to replicate"

**Quality Check:** URLs must relate to grounded metaphor keywords (not random inspiration).

#### Step 6: Write Section 6 (Required Sections)

**Process:**

1. List 5-7 standard website sections (Hero, Problem, Solution, Trust, CTA minimum)
2. For each section:
   - Connect to metaphor (how does this section embody core concept?)
   - Connect to constraint (how does this section solve creative puzzle?)
   - Provide specific creative direction (NOT "create X" but "create X that visualizes Y like Z")

**Anti-Pattern:** Generic instructions like "Create engaging hero section" ❌

**Best Practice:** Specific direction like "Hero must visualize 'Systematic Orchestra' through animated data network showing 97 agents coordinating in real-time" ✅

#### Step 7: Self-Critique & Refinement

**Run meta-prompt through this checklist:**

```markdown
META-PROMPT QUALITY CHECKLIST:
- [ ] Metaphor traceable to 3+ brand keywords (cited)
- [ ] Visual implications include specific Tailwind classes or design techniques
- [ ] Pain point cited with persona/document reference
- [ ] Differentiator cited with document reference
- [ ] Constraint reframed as generative puzzle (not restrictive filter)
- [ ] 3-5 mood board URLs provided with context
- [ ] Required sections (5+) each have specific creative direction
- [ ] No generic descriptions ("modern," "clean," "professional")
- [ ] No templates or direct design outputs (guidance only)
```

**Pass Threshold:** 7/9 checks must pass. If <7 → Refine and re-check.

---

## Examples

### Example 1: "The Calm River" Meta-Prompt

**Context:** SaaS project management tool for enterprise teams

**Inputs:**
- Pain Point: "Scattered information across 5 tools causing daily friction"
- Differentiator: "Single source of truth with real-time transparency"
- Constraint: "No stock photos of people"
- Metaphor: "Calm River" (calm + transparent + efficient + fluid)

**Generated Meta-Prompt:**

```markdown
# Creative Meta-Prompt: The Calm River

## 1. Core Creative Metaphor

Your design must embody the grounded metaphor of **"The Calm River"**.

This concept is derived from the research keywords: "calm," "transparent," "efficient," and "reduce chaos." It visualizes the SaaS platform as a flowing river that carries scattered information smoothly and transparently to its destination, transforming chaos into serene control.

**Visuals:**
- Use fluid, organic shapes (not rigid grids): SVG paths with `fill-none stroke-teal-400`
- Gradient blues and greens (water-inspired): `bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50`
- Subtle scroll-triggered animations: Content flows down like water with `animate-fade-in-up`
- Translucent layers: Glassmorphism effect with `backdrop-blur-md bg-white/80`

**Tone:**
Serene, confident, effortless. Every element feels smooth and intentional.

## 2. Core User Problem to Solve

This design must solve: **"Scattered information across 5 tools causing daily friction."** (personas.md, Professional Paul, line 23)

The visual flow must demonstrate consolidation → clarity → control.

## 3. Core Value Prop to Showcase

Hero this differentiator: **"Single source of truth with real-time transparency."** (BRAND_GUIDELINES.md, line 45)

Not just a feature—it's the proof of calm.

## 4. The Creative Puzzle (Constraint-as-Creativity)

You face a specific creative puzzle: **"Evoke trust and collaboration *without* using photographs of people."** (CLAUDE.md, Section 13, Prohibition #6)

Your design must also integrate a **3-paragraph legal compliance disclosure** without disrupting the calm flow.

**Your challenge:** How can you use abstract water visuals, gentle motion, and elegant typography to create human trust without showing humans? How can you make dense legal text feel like a natural part of the river's flow (not a dam blocking it)?

Explore: Data flow visualizations, network diagrams representing collaboration, scroll-triggered reveal for legal text.

## 5. Mood Board

Use these URLs as visual inspiration:
- https://dribbble.com/shots/water-gradient-ui - Gradient technique for organic backgrounds
- https://www.behance.net/gallery/flow-visualization - Data flow as metaphor for information movement
- https://unsplash.com/photos/calm-river-aerial - Color palette reference (teal-cyan spectrum)

These are creative anchors, not templates to replicate.

## 6. Required Section Ideas

1. **Hero Section:** Animated gradient background (flowing blues/greens), headline with water-flow animation on scroll (`animate-flow-text`). Visual: Subtle SVG wave pattern overlaid.

2. **Problem Section:** Chaotic scattered icons (5 tools) that smoothly consolidate into single flow diagram via scroll animation. Show transformation from chaos → flow.

3. **Solution Section:** Transparent card layers (glassmorphism `backdrop-blur-md`) revealing different platform features. Each card flows into next like connected stream.

4. **Trust Section:** Instead of client logos, use creative "transparency meter" showing real-time data sync (visual metaphor for "calm river" reliability).

5. **Compliance Section:** Legal text in elegant accordion with "Dive deeper into our security commitment" header (river metaphor). Expand/collapse with smooth animation.
```

### Example 2: "Organic Brutalism" Meta-Prompt

**Context:** Financial services landing page

**Inputs:**
- Pain Point: "Complex regulatory compliance creating constant anxiety"
- Differentiator: "Structural honesty with approachable guidance"
- Constraint: "Must include dense legal disclosures (3 paragraphs)"
- Metaphor: "Organic Brutalism" (structural + honest + approachable + natural)

**Generated Meta-Prompt:**

```markdown
# Creative Meta-Prompt: Organic Brutalism

## 1. Core Creative Metaphor

Your design must embody the grounded metaphor of **"Organic Brutalism"**.

This concept is derived from the research keywords: "structural honesty," "approachable," "natural," and "bold." It combines raw, structural clarity (brutalism) with soft, natural asymmetry (organic forms), creating trust through transparency while remaining inviting.

**Visuals:**
- Near-black (#1a1a1a) + warm beige (#e8d5b7) color palette (brutalism + earth tones)
- Large, confident headings (48-64px, font-bold) with generous line-height (leading-relaxed)
- Asymmetric grids: `grid-cols-12` with intentional `col-span` variations (organic rhythm)
- Raw geometric forms with soft edges: `rounded-sm` (subtle, not `rounded-xl`)

**Tone:**
Bold yet approachable. Structural clarity meets natural warmth.

## 2. Core User Problem to Solve

This design must solve: **"Complex regulatory compliance creating constant anxiety."** (personas.md, Compliance Manager Clara, line 34)

## 3. Core Value Prop to Showcase

Hero this differentiator: **"Structural honesty with approachable guidance."** (BRAND_GUIDELINES.md, line 52)

The brutalist clarity proves we're transparent; the organic warmth proves we're human.

## 4. The Creative Puzzle (Constraint-as-Creativity)

You face a specific creative puzzle: **"Must include dense legal disclosures (3 paragraphs) without overwhelming users."** (compliance.pdf, Section 2)

**Your challenge:** How can you integrate dense regulatory text in a way that REINFORCES the "structural honesty" metaphor (not hides it)? Can the legal disclosure become a strength, not a weakness?

Explore: Elegant expandable sections, typographic hierarchy that makes legal text scannable, visual anchors (icons/numbers) for each paragraph.

## 5. Mood Board

Use these URLs as visual inspiration:
- https://www.behance.net/gallery/brutalist-web-design - Typography and grid structure
- https://dribbble.com/shots/organic-shapes-ui - Asymmetric layout with natural flow
- https://unsplash.com/photos/earth-tones-palette - Color inspiration (beige + near-black)

## 6. Required Section Ideas

1. **Hero Section:** Bold, asymmetric layout (60/40 split). Left: Large heading (text-6xl font-bold). Right: Organic shape SVG overlay. Near-black background with warm beige accents.

2. **Problem Section:** Structured list of compliance challenges (brutalist clarity) with soft, organic icons (approachability).

3. **Solution Section:** 4-column grid (lg:grid-cols-4) with intentional gap variation (gap-8 lg:gap-16). Each column = brutalist card (bg-neutral-900) with warm accent border (border-l-4 border-amber-600).

4. **Legal Disclosure Section:** Instead of hiding in footer, make it HERO section ("Structural Honesty" metaphor). Use elegant accordion with brutalist typography (font-mono text-sm) and organic expand/collapse animation.

5. **CTA Section:** Bold, left-aligned CTA (not centered) with near-black button (bg-neutral-900 text-amber-100) and generous padding (px-8 py-4).
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Anti-Pattern 1: Generic Design Instructions

```markdown
# DON'T WRITE THIS:
## 1. Core Creative Metaphor
Your design should be modern, clean, and professional.

**Visuals:** Use blue colors and clean layouts.
**Tone:** Professional and trustworthy.

PROBLEM: Zero specificity, no grounded metaphor, generic AI defaults.
```

**Why It Fails:** "Modern" and "clean" are meaningless without context. Blue = default AI color. This produces template-like output.

### ❌ Anti-Pattern 2: Missing Research Traceability

```markdown
# DON'T WRITE THIS:
## 2. Core User Problem to Solve
Users are frustrated with current solutions.

PROBLEM: No specific pain point, no citation, no research grounding.
```

**Why It Fails:** Vague problem = vague solution. Must cite exact research artifact.

### ❌ Anti-Pattern 3: Constraint as Filter (Not Puzzle)

```markdown
# DON'T WRITE THIS:
## 4. The Creative Puzzle
Don't use stock photos of people.

PROBLEM: This is a restrictive filter, not a generative puzzle.
```

**Why It Fails:** "Don't use X" creates subtractive design (template minus forbidden element), not creative innovation.

**✅ CORRECT VERSION:**
```markdown
## 4. The Creative Puzzle
How can you evoke human trust *without* photographs of people?
Explore: Network visualizations, data-driven collaboration metaphors, abstract human forms.
```

### ❌ Anti-Pattern 4: Direct Design Output (Not Meta-Prompt)

```markdown
# DON'T WRITE THIS:
## 6. Required Section Ideas
Hero Section:
- H1: "Transform Your Workflow" (text-5xl font-bold text-blue-600)
- Subheading: "The modern solution for teams" (text-xl text-gray-600)
- CTA: Blue button "Get Started" (bg-blue-500 text-white px-6 py-3 rounded-lg)

PROBLEM: This is a direct design specification, not creative direction.
```

**Why It Fails:** Removes all creative agency from downstream designer/AI. Meta-prompts guide creativity, not prescribe exact output.

**✅ CORRECT VERSION:**
```markdown
## 6. Required Section Ideas
Hero Section: Must visualize "Calm River" metaphor through animated gradient background flowing from top to bottom. Headline should feel like it's floating on water (light animation). CTA positioned asymmetrically (left-aligned, not centered) to break static symmetry.
```

---

## Integration with Other Skills

**Prerequisites:**
- [`agentic-rag-methodology`](../agentic-rag-methodology/SKILL.md) - Provides research inputs
- [`grounded-metaphor-generation`](../grounded-metaphor-generation/SKILL.md) - Provides metaphor + keywords
- [`constraint-as-creativity`](../anti-ai-design-checklist/SKILL.md) - Provides constraint reframing framework

**Used By:**
- `creative-brief-synthesizer` agent (generates meta-prompts)
- `creative-director-orchestrator` agent (coordinates workflow)
- `design-implementation-specialist` agent (consumes meta-prompts for implementation)

**Workflow:**
```
Agentic RAG → Extract inputs →
Grounded Metaphor → Generate metaphor →
Constraint Analysis → Reframe constraints →
Creative Meta-Prompting (this skill) → Output structured brief →
Implementation Specialist → Generate components
```

---

## Best Practices

### ✅ Best Practice 1: Specific Over Generic

```markdown
# GENERIC (BAD):
"Use modern design principles"

# SPECIFIC (GOOD):
"Use asymmetric grid layouts (60/40 split) with intentional whitespace rhythm (gap-8 md:gap-16)"
```

### ✅ Best Practice 2: Cite All Research Sources

```markdown
# UNCITED (BAD):
Pain Point: "Users are frustrated"

# CITED (GOOD):
Pain Point: "Scattered information across 5 tools" (personas.md, Professional Paul, line 23)
```

### ✅ Best Practice 3: Preserve Designer Agency

```markdown
# PRESCRIPTIVE (BAD):
"Hero section MUST be exactly 800px tall with H1 at 64px"

# GUIDING (GOOD):
"Hero section should embody 'Systematic Orchestra' through rhythmic grid and precise spacing. Consider conductor's baton metaphor for visual hierarchy."
```

### ✅ Best Practice 4: Integrate Metaphor Throughout

```markdown
Every section (1-6) should reference core metaphor:
- Hero: "Visualize Calm River flow"
- Problem: "Show chaos before river smooths it"
- Solution: "Demonstrate transparent water clarity"
- Trust: "Flow continues unbroken (reliability)"
- CTA: "Natural next step in river journey"
```

---

## Changelog

**v1.0 (2025-11-16):** Initial skill creation based on Iris v2.1 reference agent, "Systematic Orchestra" example output, and CREATIVE_DESIGN_SYSTEM.md meta-prompt framework.

---

**Maintained By:** Design Systems Lead
**Next Review:** 2026-02-16
