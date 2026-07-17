# Anti-AI Design Checklist

## Overview

**Category:** design
**Type:** knowledge + quality checklist
**Purpose:** Define 5 constraints that prevent "generic AI look" in website designs through intentional deviation from AI statistical defaults.

**When to Use:** Design quality reviews, Gate 7 (Creative Quality) validation, client feedback sessions, design system audits, pre-production design approval.

---

## The Problem: AI Aesthetic Homogenization

### Why AI Designs Look Generic

**Research Findings (November 2025):**

**Visual Red Flags:**
- Default color schemes: Blue primary (#0066CC), gray secondary (#6B7280)
- Generic typography: Default Inter, Helvetica, Arial fonts with standard weights (400, 600)
- Uniform spacing: Identical padding (p-4, p-6) with no rhythm variation
- Centered layouts: Hero sections always centered, symmetric column grids
- Rounded corners everywhere: 0.5rem border-radius as default
- Stock imagery: Smiling diverse teams, generic office spaces, abstract geometric backgrounds

**Process Red Flags:**
- Skipping design concept phase (brief → code directly)
- Single-pass design (no iteration/refinement)
- No creative metaphor or visual anchor
- Treating constraints as filters ("don't use X") instead of creative catalysts

**Root Cause:** AI models optimize for "most likely" visual patterns based on training data = statistical averages = generic, homogeneous outputs.

---

## The Solution: Constraint-as-Creativity Framework

**Core Principle:** Non-generic design emerges from intentional constraints that counteract AI statistical defaults.

**The 5 Constraints:**

Each constraint forces creative problem-solving that prevents mode collapse (convergence to generic patterns) by explicitly constraining against common AI defaults.

---

## Constraint 1: Spatial Rhythm (Not Uniform Padding)

### The AI Default Trap

**Statistical Pattern:**
- `p-4` (1rem padding) everywhere
- Uniform grid gaps: `gap-4` consistently
- Even spacing between all elements
- Predictable rhythm = boring visual flow

**Example AI Default Code:**

```astro
<section class="p-4 md:p-6">
  <div class="grid grid-cols-3 gap-4">
    <div class="p-4">...</div>
    <div class="p-4">...</div>
    <div class="p-4">...</div>
  </div>
</section>
```

### The Anti-AI Constraint

**Requirement:** Vary spacing intentionally to create visual rhythm and guide eye flow.

**Design Principle:** Rhythm creates interest, emphasis, and hierarchy through spacing contrast.

**Example Non-Generic Implementation:**

```astro
<section class="pt-12 pb-20 px-6 md:pt-24 md:pb-32 md:px-8">
  <div class="grid grid-cols-12 gap-4 md:gap-12 lg:gap-20">
    <div class="col-span-12 md:col-span-8 pr-0 md:pr-16">...</div>
    <div class="col-span-12 md:col-span-4 pl-0 md:pl-8">...</div>
  </div>

  <!-- Intentional rhythm: tight spacing (8px) → medium (48px) → wide (80px) -->
  <div class="mt-8 md:mt-12 lg:mt-20">...</div>
</section>
```

**Key Techniques:**
- Vary padding by section importance: Hero (pt-24), Features (pt-16), Footer (pt-12)
- Progressive grid gaps: `gap-4 md:gap-12 lg:gap-20` (not uniform)
- Asymmetric spacing: `pr-16` on one column, `pl-8` on adjacent (creates tension)
- Intentional whitespace clustering: Group tight spacing (related content), then large gap (section break)

**Pass Criteria:**
- ✅ At least 3 different spacing values used within single section
- ✅ Spacing progression follows intentional rhythm (not random)
- ✅ Asymmetric padding applied to create visual interest

**Automated Check:**

```typescript
// Scan Tailwind classes for spacing diversity
const spacingClasses = extractClasses(component, /p-|m-|gap-/);
const uniqueSpacingValues = new Set(spacingClasses);

if (uniqueSpacingValues.size >= 3) {
  return { passed: true, evidence: `${uniqueSpacingValues.size} spacing values used` };
} else {
  return { passed: false, evidence: `Only ${uniqueSpacingValues.size} spacing values - add rhythm variation` };
}
```

---

## Constraint 2: Intentional Asymmetry (Not Centered Symmetry)

### The AI Default Trap

**Statistical Pattern:**
- Hero sections: Always centered text + centered CTA
- Two-column layouts: Always 50/50 split
- Element alignment: Everything justified center
- Perfect left-right symmetry

**Example AI Default Code:**

```astro
<section class="flex items-center justify-center text-center">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-5xl text-center">...</h1>
    <p class="text-center">...</p>
    <button class="mx-auto">...</button>
  </div>
</section>
```

### The Anti-AI Constraint

**Requirement:** Place key elements off-center or use unbalanced layouts to create dynamism.

**Design Principle:** Asymmetry = visual energy, modernity, and intentionality. Perfect symmetry feels static and predictable.

**Example Non-Generic Implementation:**

```astro
<!-- 60/40 Split Hero (not 50/50) -->
<section class="grid grid-cols-12">
  <div class="col-span-12 md:col-span-7 text-left pl-8 md:pl-16">
    <h1 class="text-5xl md:text-7xl">...</h1>
    <p class="max-w-lg">...</p> <!-- Constrained width on left, not centered -->
    <button class="mt-8">...</button> <!-- Left-aligned CTA -->
  </div>
  <div class="col-span-12 md:col-span-5">
    <!-- Asymmetric visual element -->
  </div>
</section>

<!-- Offset Grid (not centered) -->
<section class="grid grid-cols-12 gap-8">
  <div class="col-span-12 md:col-start-2 md:col-span-10">
    <!-- Content starts at column 2 (offset), not column 1 -->
  </div>
</section>
```

**Key Techniques:**
- 60/40 or 70/30 splits (not 50/50)
- Offset grids: `col-start-2` (start at column 2, not 1)
- Left-aligned CTAs (not centered)
- Staggered vertical alignment: Alternate content/image sides per section
- Z-index layering: Overlap elements to break rigid grid

**Pass Criteria:**
- ✅ Hero section NOT centered (left-aligned or offset layout)
- ✅ At least one 60/40 or 70/30 split (not 50/50)
- ✅ Key CTA positioned intentionally off-center

**Manual Review Required:** Human judgment needed to evaluate "intentional" vs. "accidental" asymmetry.

---

## Constraint 3: Unexpected Hierarchy (Not Conventional Order)

### The AI Default Trap

**Statistical Pattern:**
- H1 > H2 > H3 font sizes (always descending)
- Primary content above secondary (always)
- CTA buttons always largest/boldest element
- Conventional information hierarchy: Logo → Nav → Hero → Features → CTA → Footer

**Example AI Default Code:**

```astro
<h1 class="text-5xl font-bold">Main Heading</h1>
<h2 class="text-3xl font-semibold">Subheading</h2>
<p class="text-base">Body text</p>
<button class="text-lg font-bold">CTA</button>
```

### The Anti-AI Constraint

**Requirement:** Subvert at least one conventional hierarchy expectation to challenge viewer assumptions.

**Design Principle:** Unexpected hierarchy creates memorable moments and guides attention in non-linear ways.

**Example Non-Generic Implementation:**

```astro
<!-- Inverted Hierarchy: Subheading larger than heading -->
<div class="space-y-2">
  <h1 class="text-sm uppercase tracking-wide text-gray-500">The Problem</h1>
  <p class="text-4xl md:text-6xl font-bold leading-tight">
    <!-- This "body text" is actually the visual anchor -->
    Scattered information across 5 tools causing daily friction
  </p>
</div>

<!-- De-emphasized Heading, Emphasized Body -->
<h2 class="text-base font-normal text-gray-600 mb-4">Our Approach</h2>
<p class="text-3xl font-semibold text-gray-900">
  <!-- Body text is the hero element -->
  Single source of truth with real-time transparency
</p>

<!-- Micro CTA (not bold/large) -->
<button class="text-sm underline hover:no-underline">
  Request Demo →
</button>
<!-- Visual hierarchy through position and color, not size -->
```

**Key Techniques:**
- Inverted sizes: Subheading (4xl) > Heading (sm)
- De-emphasized CTAs: Small, understated buttons instead of bold
- Body text as hero: Large paragraph text (3xl-4xl) with small heading above
- Footer-first: Critical info in footer (not hidden), filler in hero
- Layered hierarchy: Visual prominence through color/position, not font size

**Pass Criteria:**
- ✅ At least one instance of unexpected hierarchy inversion
- ✅ Hierarchy serves intentional creative concept (not random)
- ✅ Still maintains accessibility (proper semantic HTML even if visual order differs)

**Manual Review Required:** Requires design judgment to evaluate intentionality and brand alignment.

---

## Constraint 4: Color Nuance (Not Primary/Secondary Defaults)

### The AI Default Trap

**Statistical Pattern:**
- Tailwind default palette: `bg-blue-500`, `text-gray-900`, `border-gray-200`
- Primary blue (#3B82F6), secondary gray (#6B7280)
- High saturation colors (500-600 scale)
- Predictable color pairings: Blue + white, blue + gray

**Example AI Default Code:**

```astro
<section class="bg-blue-500 text-white">
  <button class="bg-white text-blue-500 hover:bg-gray-100">...</button>
</section>
```

### The Anti-AI Constraint

**Requirement:** Use non-default color values and unique brand-specific palettes.

**Design Principle:** Color distinctiveness = brand recognition. Default palettes = invisible branding.

**Example Non-Generic Implementation:**

```astro
<!-- Custom Brand Colors (defined in tailwind.config.cjs) -->
<section class="bg-amber-50 text-neutral-900">
  <div class="border-l-4 border-amber-600">...</div>
  <button class="bg-neutral-800 text-amber-100 hover:bg-neutral-900">...</button>
</section>

<!-- Nuanced Neutral Palette (not gray-500/gray-900) -->
<section class="bg-stone-100 text-slate-800">
  <p class="text-slate-600">...</p>
  <a class="text-slate-900 underline decoration-amber-600">...</a>
</section>

<!-- Custom Color Definition -->
<!-- tailwind.config.cjs -->
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1a202c',    // Near-black (not default blue)
        accent: '#e8d5b7',     // Warm beige (not gray)
        'river-blue': '#4a90a4',  // Custom brand color
      },
    },
  },
};
```

**Key Techniques:**
- Custom color names: `primary`, `accent`, `river-blue` (not `blue-500`)
- Nuanced neutrals: `stone-100`, `slate-800`, `neutral-900` (not generic `gray`)
- Low saturation: 100-200 scale for backgrounds, 600-800 for accents (avoid high-saturation 500)
- Unexpected pairings: Amber + neutral, sage green + warm gray (not blue + gray)
- Gradient complexity: Multi-stop gradients (`from-amber-50 via-rose-50 to-stone-100`)

**Pass Criteria:**
- ✅ ZERO use of default blue (#3B82F6) or generic gray (#6B7280)
- ✅ At least 2 custom color definitions in `tailwind.config.cjs`
- ✅ Color palette traceable to brand guidelines or grounded metaphor

**Automated Check:**

```typescript
// Scan tailwind.config.cjs for custom color definitions
const customColors = extractCustomColors(tailwindConfig);

if (customColors.length >= 2) {
  return { passed: true, evidence: `${customColors.length} custom colors defined` };
} else {
  return { passed: false, evidence: `Only ${customColors.length} custom colors - add brand-specific palette` };
}

// Check for forbidden defaults
const forbiddenClasses = ['bg-blue-500', 'text-blue-500', 'border-blue-500'];
const usedForbidden = scanForClasses(component, forbiddenClasses);

if (usedForbidden.length > 0) {
  return { passed: false, evidence: `Found forbidden default colors: ${usedForbidden.join(', ')}` };
}
```

---

## Constraint 5: Constraint-Driven Creativity (Evidence of Creative Puzzle Solving)

### The AI Default Trap

**Statistical Pattern:**
- Constraints treated as filters: "Don't use people images" → Use abstract shapes (default fallback)
- No evidence of creative problem-solving
- Constraints not integrated into design concept
- Design feels like "template minus constraint" (subtractive, not generative)

**Example AI Default Approach:**

```markdown
Constraint: "No stock photos of people"
AI Default Response: Use generic abstract geometric shapes instead
Result: Forgettable, template-like design
```

### The Anti-AI Constraint

**Requirement:** Show evidence of working within intentional constraints to solve creative challenge.

**Design Principle:** Constraints = catalysts for innovation. Best designs turn limitations into strengths.

**Example Non-Generic Implementation:**

**Constraint:** "Evoke trust and collaboration without using photographs of people"

**Creative Puzzle Solution:**

```astro
<!-- Instead of: Generic abstract shapes -->
<!-- Creative Solution: Data visualization as human metaphor -->

<section class="relative overflow-hidden">
  <!-- Animated network graph representing human collaboration -->
  <svg class="absolute inset-0 w-full h-full opacity-10">
    <!-- Nodes = team members (abstract circles) -->
    <circle cx="30%" cy="40%" r="4" class="fill-primary animate-pulse" />
    <circle cx="60%" cy="30%" r="6" class="fill-primary animate-pulse" style="animation-delay: 0.3s" />
    <circle cx="50%" cy="70%" r="5" class="fill-primary animate-pulse" style="animation-delay: 0.6s" />

    <!-- Connecting lines = collaboration (animated paths) -->
    <line x1="30%" y1="40%" x2="60%" y2="30%" class="stroke-primary stroke-1 animate-draw" />
    <line x1="60%" y1="30%" x2="50%" y2="70%" class="stroke-primary stroke-1 animate-draw" style="animation-delay: 0.3s" />
  </svg>

  <div class="relative z-10">
    <h2>Built by a team, for your team</h2>
    <p>Every node in this system represents an expert working in harmony</p>
  </div>
</section>

<!-- Constraint integrated into metaphor: "Systematic Orchestra" visualized through data, not people -->
```

**Key Techniques:**
- Constraint reframed as metaphor foundation: "No people" → "Show collaboration through abstract network visualization"
- Generative solution: Adds conceptual depth (network = collaboration metaphor)
- Integrated into design system: Animation reinforces "systematic coordination" theme
- Documented creative reasoning: Metaphor-framework.yml shows how constraint shaped design

**Pass Criteria:**
- ✅ At least one major constraint identified and documented
- ✅ Creative solution ADDS conceptual value (not just removes forbidden element)
- ✅ Constraint solution integrated into grounded metaphor
- ✅ Design documentation shows intentional constraint-driven reasoning

**Manual Review Required:** Requires human judgment to evaluate whether constraint was truly catalyst for creativity.

**Evidence Checklist:**

```markdown
Constraint Identified: [State the constraint]
- Source: [CLAUDE.md Section 12, BRAND_GUIDELINES.md, etc.]

Creative Puzzle Defined: [Reframe constraint as challenge]
- Example: "How to evoke trust without showing people?"

Creative Solution Implemented: [Describe novel approach]
- Example: "Network graph visualization with animated collaboration nodes"

Integration with Metaphor: [Show connection to grounded metaphor]
- Example: "Systematic Orchestra → network nodes = musicians, connections = harmony"

Result: [Impact on design uniqueness]
- Example: "Design feels intentional, not template-derived"
```

---

## Complete Quality Checklist

**Use this checklist for Gate 7 (Creative Quality) validation:**

### Pre-Flight Checks (Before Implementation)

- [ ] **Grounded Metaphor Exists:** Design has clear creative metaphor traceable to brand documents
- [ ] **Keywords Cited:** Metaphor derived from 5-7 source keywords with citations
- [ ] **Metaphor Grounding ≥95%:** Verified via `metaphor-grounding-verifier` agent

### The 5 Anti-AI Constraints

- [ ] **Constraint 1: Spatial Rhythm**
  - [ ] At least 3 different spacing values in single section
  - [ ] Spacing follows intentional rhythm (not uniform)
  - [ ] Asymmetric padding applied

- [ ] **Constraint 2: Intentional Asymmetry**
  - [ ] Hero section NOT centered
  - [ ] At least one 60/40 or 70/30 split
  - [ ] Key CTA positioned off-center

- [ ] **Constraint 3: Unexpected Hierarchy**
  - [ ] At least one hierarchy inversion
  - [ ] Serves intentional creative concept
  - [ ] Maintains semantic HTML accessibility

- [ ] **Constraint 4: Color Nuance**
  - [ ] ZERO use of default blue (#3B82F6) or gray (#6B7280)
  - [ ] At least 2 custom colors in tailwind.config.cjs
  - [ ] Colors traceable to brand/metaphor

- [ ] **Constraint 5: Constraint-Driven Creativity**
  - [ ] Major constraint identified and documented
  - [ ] Creative solution adds conceptual value
  - [ ] Integrated into grounded metaphor
  - [ ] Reasoning documented in design artifacts

### Post-Implementation Checks

- [ ] **Mood Board Integration:** Visual references from research incorporated
- [ ] **Archetype Consistency:** All components use correct archetype variant
- [ ] **Semantic HTML:** Proper heading hierarchy, ARIA attributes
- [ ] **Accessibility:** WCAG 2.1 AA contrast ratios verified
- [ ] **No Generic Stock:** No generic stock photos (smiling teams, abstract backgrounds)

### Pass Threshold

**Gate 7 Pass Requirements:**
- All 5 Anti-AI Constraints: **5/5 must pass**
- Pre-Flight Checks: **3/3 must pass**
- Post-Implementation: **4/5 must pass** (minimum)

**If <12/13 total checks pass:** Return to design refinement phase.

---

## Integration with Other Skills

**Used By:**
- `metaphor-grounding-verifier` agent (Gate 7 execution)
- `creative-director-orchestrator` agent (quality enforcement)
- `design-implementation-specialist` agent (implementation guidance)

**Prerequisites:**
- [`grounded-metaphor-generation`](../grounded-metaphor-generation/SKILL.md) - Metaphor must exist before applying constraints
- [`agentic-rag-methodology`](../agentic-rag-methodology/SKILL.md) - Constraints extracted via RAG

**Workflow:**
```
Grounded Metaphor Generated →
Anti-AI Design Checklist Applied (this skill) →
Implementation Validated via Gate 7
```

---

## Changelog

**v1.0 (2025-11-16):** Initial skill creation based on CREATIVE_DESIGN_SYSTEM.md Section 12 (Anti-AI Design Principles), implementation plan, and quality standards.

---

**Maintained By:** Design Systems Lead
**Next Review:** 2026-02-16
