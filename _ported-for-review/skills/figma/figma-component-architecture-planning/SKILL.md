---
name: figma-component-architecture-planning
description: Analyze Figma design file structure to create top-to-bottom section hierarchy build order plan with dependency mapping. Ensures systematic component construction after token extraction, prevents build order conflicts, and establishes clear task breakdown for Phase 2 Figma-to-code workflow.
---

# Figma Component Architecture Planning

## Purpose
This skill defines the Phase 2 workflow for analyzing Figma design structure and creating a systematic build order plan. After Phase 1 token extraction is complete, this planning phase ensures components are built in correct dependency order (shared components → sections → pages) to prevent rework and build conflicts.

**Critical Rule:** Complete this planning phase BEFORE building any sections. The build order plan becomes the execution checklist for Phase 2.

---

## When to Use This Skill

**Activate when:**
- Phase 1 (design token extraction) is complete and tokens are locked
- Starting component/section builds from Figma design
- Converting multi-page Figma designs to Astro sites
- Onboarding new developer to existing Figma build project

**DO NOT use when:**
- Tokens not yet extracted (complete Phase 1 first)
- Single-component builds (e.g., updating existing Button component)
- Design is incomplete or in active iteration
- Building from wireframes without finalized design

---

## Core Principles

### 1. Dependency-First Build Order
Build components in dependency hierarchy order:
1. **Shared Components** (Button, Card, Icon) - used everywhere
2. **Layout Components** (Header, Footer, Navigation) - page structure
3. **Section Components** (Hero, Features, Testimonials) - page content blocks
4. **Page Compositions** (Homepage, About, Services) - assemble sections

**Why:** Prevents building sections that reference non-existent shared components, reduces rework when shared components evolve.

### 2. Top-to-Bottom Section Analysis
Analyze Figma pages from top to bottom:
- Identify visual sections (Hero, Features, CTA, Footer)
- Map to semantic HTML elements (header, main, section, footer)
- Document spacing between sections
- Note responsive behavior differences (mobile vs desktop)

**Why:** Matches user reading flow, reveals natural component boundaries, simplifies responsive implementation.

### 3. Reusability Detection
Flag duplicate or similar components:
- Same button styles across multiple sections → shared Button component
- Repeated card layouts → shared Card component
- Consistent navigation across pages → shared Header component

**Why:** Prevents duplicate code, ensures brand consistency, simplifies maintenance.

---

## Phase 2 Workflow: Architecture Planning

### Step 1: Inventory Figma File Structure

**Using Figma MCP (if available):**
```
List the complete file structure for this Figma design:
[Figma file URL]

Show:
1. All pages in the file
2. All top-level frames (artboards) per page
3. Frame dimensions and naming conventions
4. Nested frame hierarchy for complex layouts

Format as hierarchical tree structure.
```

**Expected Output:**
```
Figma File Structure:
├── Page: "Desktop Designs"
│   ├── Frame: "01 - Homepage" (1440x5000)
│   │   ├── Section: Hero (1440x800)
│   │   ├── Section: Features (1440x600)
│   │   ├── Section: Testimonials (1440x500)
│   │   └── Section: CTA (1440x400)
│   ├── Frame: "02 - About Page" (1440x3500)
│   └── Frame: "03 - Services Page" (1440x4200)
├── Page: "Mobile Designs"
│   ├── Frame: "Homepage Mobile" (375x3200)
│   └── Frame: "About Mobile" (375x2800)
└── Page: "Components"
    ├── Component: "Button Variants"
    ├── Component: "Card Styles"
    └── Component: "Form Elements"
```

**Manual Inventory (no MCP):**
1. Open Figma file
2. Click Layers panel (left sidebar)
3. Expand each page
4. Document frame names, sizes, and nesting
5. Screenshot hierarchy for reference

---

### Step 2: Identify Shared Components

**Questions to Answer:**

**What components appear across multiple pages/sections?**
- Buttons (primary, secondary, ghost variants)
- Cards (service cards, testimonial cards, blog cards)
- Icons (social icons, feature icons)
- Form elements (inputs, selects, checkboxes)
- Navigation (header, footer, mobile menu)

**What variations exist for each shared component?**
- Button: primary/secondary/ghost styles, small/medium/large sizes
- Card: with/without image, horizontal/vertical layout
- Navigation: desktop horizontal menu, mobile hamburger menu

**Shared Component Inventory Template:**

```markdown
## Shared Component Inventory

### Button
- **Variants:** Primary, Secondary, Ghost
- **Sizes:** Small (px-4 py-2), Medium (px-6 py-3), Large (px-8 py-4)
- **States:** Default, Hover, Focus, Active, Disabled
- **Usage:** CTAs in Hero, Features, Footer; Form submissions
- **File Location:** packages/ui-components/src/components/Button.astro

### Card
- **Variants:** Service Card (icon + title + description), Testimonial Card (quote + author + image)
- **Layout:** Vertical stack (mobile), Optional horizontal (desktop)
- **Usage:** Features section (3-col grid), Testimonials section (carousel)
- **File Location:** packages/ui-components/src/components/Card.astro

### Icon
- **Variants:** Social icons (24x24), Feature icons (48x48)
- **Format:** SVG
- **Usage:** Footer social links, Features section icons
- **File Location:** packages/ui-components/src/components/Icon.astro
```

---

### Step 3: Map Section Hierarchy (Top-to-Bottom)

**For each page frame, identify sections:**

**Section Analysis Template:**
```markdown
## Homepage Section Breakdown

### Section 1: Hero
- **Semantic HTML:** <section> (first section of <main>)
- **Visual Bounds:** Top of page to ~800px height
- **Content Elements:**
  - H1 heading (text-h1 from tokens)
  - Subheading paragraph (text-body from tokens)
  - 2x CTA buttons (primary + secondary Button components)
  - Background image or gradient
- **Layout:** Centered content, flex column (mobile), max-w-7xl container
- **Responsive:** Text size adjusts (text-4xl md:text-5xl lg:text-6xl)
- **Dependencies:** Button component
- **Spacing:** pb-section (80px) bottom padding
- **File:** sites/[client-name]/src/components/HeroSection.astro

### Section 2: Features
- **Semantic HTML:** <section>
- **Visual Bounds:** Below Hero to ~1400px
- **Content Elements:**
  - H2 section heading
  - Grid of 3 feature cards (Card component with icon variant)
  - Each card: Icon + H3 title + paragraph description
- **Layout:** Grid 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
- **Responsive:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Dependencies:** Card component, Icon component
- **Spacing:** py-section (80px top/bottom)
- **File:** sites/[client-name]/src/components/FeaturesSection.astro

### Section 3: Testimonials
- **Semantic HTML:** <section>
- **Visual Bounds:** Below Features to ~1900px
- **Content Elements:**
  - H2 section heading
  - 3 testimonial cards (Card component, testimonial variant)
  - Each card: Quote text + Author name + Author image
- **Layout:** Grid 1 col (mobile), 3 cols (desktop)
- **Responsive:** grid-cols-1 lg:grid-cols-3
- **Dependencies:** Card component
- **Spacing:** py-section (80px top/bottom)
- **File:** sites/[client-name]/src/components/TestimonialsSection.astro
```

**Repeat for all sections across all pages.**

---

### Step 4: Determine Build Order (Dependency Graph)

**Build Order Rules:**
1. Shared components with ZERO dependencies → Build FIRST
2. Shared components that depend on other shared components → Build SECOND
3. Section components → Build THIRD
4. Page compositions → Build LAST

**Example Build Order Plan:**

```markdown
## Build Order Plan (Phase 2 Execution)

### Priority 1: Zero-Dependency Shared Components (Week 1, Days 1-2)
- [ ] Icon.astro (SVG wrapper, no dependencies)
- [ ] Button.astro (uses tokens only, no component dependencies)

### Priority 2: Dependent Shared Components (Week 1, Days 3-4)
- [ ] Card.astro (may use Icon component for decorative icons)
- [ ] FormInput.astro (basic text input, no dependencies)
- [ ] FormSelect.astro (dropdown, no dependencies)

### Priority 3: Layout Components (Week 1, Day 5)
- [ ] Header.astro (uses Button for CTAs, Icon for logo/menu)
- [ ] Footer.astro (uses Button for newsletter CTA, Icon for social links)
- [ ] Navigation.astro (uses Button for mobile menu toggle)

### Priority 4: Homepage Sections (Week 2, Days 1-3)
- [ ] HeroSection.astro (uses Button component)
- [ ] FeaturesSection.astro (uses Card, Icon components)
- [ ] TestimonialsSection.astro (uses Card component)
- [ ] CTASection.astro (uses Button component)

### Priority 5: About Page Sections (Week 2, Days 4-5)
- [ ] TeamSection.astro (uses Card component for team member cards)
- [ ] MissionSection.astro (text-heavy, minimal component dependencies)

### Priority 6: Services Page Sections (Week 3, Days 1-2)
- [ ] ServicesOverviewSection.astro (uses Card for service items)
- [ ] PricingSection.astro (custom pricing table, uses Button for CTAs)

### Priority 7: Page Compositions (Week 3, Days 3-5)
- [ ] index.astro (Homepage: assemble Header + Hero + Features + Testimonials + CTA + Footer)
- [ ] about.astro (About: assemble Header + Team + Mission + Footer)
- [ ] services.astro (Services: assemble Header + Overview + Pricing + Footer)
```

**Time Estimates:**
- Simple shared component (Icon, Button): 30-60 minutes
- Complex shared component (Card with variants): 1-2 hours
- Layout component (Header, Footer): 1-2 hours
- Section component: 1-3 hours depending on complexity
- Page composition: 30-60 minutes (assembling existing sections)

---

### Step 5: Document Responsive Breakpoints

**Analyze responsive behavior differences:**

**Responsive Behavior Matrix:**

| Section | Mobile (375px) | Tablet (768px) | Desktop (1440px) |
|---------|----------------|----------------|------------------|
| **Hero** | Text centered, stacked buttons (flex-col), full-width bg | Larger text (text-5xl), buttons side-by-side (flex-row) | Largest text (text-6xl), max-w-7xl container |
| **Features** | 1 column grid, cards stacked | 2 column grid (grid-cols-2) | 3 column grid (grid-cols-3) |
| **Testimonials** | 1 column, vertical scroll | 2 columns (grid-cols-2) | 3 columns (grid-cols-3) |
| **Header** | Hamburger menu icon, stacked logo/nav | Hamburger menu (if nav items >5) | Horizontal nav, inline logo + menu |
| **Footer** | Stacked sections (flex-col) | 2-column layout for links | 4-column layout, horizontal social icons |

**Document breakpoint decisions in ARCHITECTURE_PLAN.md.**

---

### Step 6: Create Execution Checklist

**File:** `sites/[client-name]/ARCHITECTURE_PLAN.md`

```markdown
# Figma-to-Code Architecture Plan

**Project:** [Client Name] Website
**Design Source:** [Figma file URL]
**Phase 1 Status:** ✅ Complete (tokens locked in tailwind.config.cjs)
**Phase 2 Status:** 🚧 In Progress

---

## Build Order Checklist

### Priority 1: Shared Components (Zero Dependencies)
- [ ] `Icon.astro` - SVG wrapper component
  - **Time:** 30 min
  - **Dependencies:** None
  - **Figma Reference:** Components page → Icons frame
  - **Validation:** Renders social icons, feature icons correctly

- [ ] `Button.astro` - Primary/Secondary/Ghost variants
  - **Time:** 60 min
  - **Dependencies:** None (tokens only)
  - **Figma Reference:** Components page → Button Variants frame
  - **Validation:** All 3 variants render, hover/focus states work

### Priority 2: Shared Components (With Dependencies)
- [ ] `Card.astro` - Service card & Testimonial card variants
  - **Time:** 90 min
  - **Dependencies:** Icon.astro
  - **Figma Reference:** Components page → Card Styles frame
  - **Validation:** Both variants render, responsive grid layout works

[... continue for all components/sections ...]

---

## Section-to-Component Mapping

| Page | Section | Component File | Dependencies | Status |
|------|---------|---------------|--------------|--------|
| Homepage | Hero | HeroSection.astro | Button | ⬜ Not Started |
| Homepage | Features | FeaturesSection.astro | Card, Icon | ⬜ Not Started |
| Homepage | Testimonials | TestimonialsSection.astro | Card | ⬜ Not Started |
| About | Team | TeamSection.astro | Card | ⬜ Not Started |

---

## Responsive Breakpoints

See Section 5 Responsive Behavior Matrix above.

---

## Known Challenges
- [ ] Mobile navigation: Figma shows slide-out drawer, requires JavaScript
- [ ] Testimonials carousel: Figma shows interactive carousel, may use DaisyUI Carousel component
- [ ] Form validation: Figma shows error states, requires client-side validation logic

---

## Design Deviations Log
[Document any intentional deviations from Figma during build]
- Example: "Figma shows 72px heading, reduced to 60px for web readability per designer approval"
```

**Commit plan:**
```bash
git add sites/[client-name]/ARCHITECTURE_PLAN.md
git commit -m "feat(client-name): Create component build order plan (Phase 2 planning)"
```

---

## Validation Checklist

Before proceeding to component builds, verify:

- [ ] **Shared Components Identified:** All reusable components documented with variants
- [ ] **Section Hierarchy Mapped:** Top-to-bottom section breakdown for each page
- [ ] **Build Order Established:** Dependency graph created, zero-dependency components first
- [ ] **Responsive Breakpoints Documented:** Behavior differences at 375px/768px/1440px noted
- [ ] **Execution Checklist Created:** ARCHITECTURE_PLAN.md committed to repository
- [ ] **Time Estimates Realistic:** Total estimated time aligns with project timeline
- [ ] **Team Alignment:** Developers briefed on build order and can execute plan independently

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Building Sections Before Shared Components
**Wrong:** Start with Hero section, realize Button component needed, pause to build Button, return to Hero
**Correct:** Build Button first (Priority 1), then Hero section (Priority 4) references existing Button

**Why:** Prevents context switching and ensures shared components are battle-tested before section use.

### ❌ Mistake 2: Skipping Responsive Analysis
**Wrong:** Build desktop version only, add mobile responsiveness later as afterthought
**Correct:** Document mobile/tablet/desktop behavior BEFORE building, implement mobile-first during build

**Why:** Mobile-first approach prevents desktop-centric assumptions and reduces responsive debugging.

### ❌ Mistake 3: Vague Component Naming
**Wrong:** Section1.astro, Section2.astro, CardThing.astro
**Correct:** HeroSection.astro, FeaturesSection.astro, TestimonialCard.astro

**Why:** Self-documenting names improve maintainability and onboarding.

### ❌ Mistake 4: No Dependency Documentation
**Wrong:** List all components in random order, start building, hit dependency conflicts
**Correct:** Create dependency graph (zero-dependency → dependent → sections → pages), build in order

**Why:** Prevents rework when components reference non-existent dependencies.

---

## Integration with Other Skills

**Requires:**
- [figma-design-token-extraction](../figma-design-token-extraction/SKILL.md) - Phase 1 must be complete and tokens locked

**Enables:**
- [figma-section-build](../figma-section-build/SKILL.md) - Execute build plan, one component at a time
- [figma-fidelity-validation](../figma-fidelity-validation/SKILL.md) - Validate each built component against Figma

**Works with:**
- [component-architecture](../component-architecture/SKILL.md) - Astro component structure best practices
- [astro-component-structure](../astro-component-structure/SKILL.md) - Component file organization

---

## Troubleshooting

### Issue: Figma File Disorganized (No Clear Sections)
**Symptoms:** Frames named "Frame 123", nested layers unclear, no component library
**Solution:**
1. Request designer to organize Figma file with semantic frame names
2. If unavailable, manually analyze visual sections and create logical boundaries
3. Document assumptions in ARCHITECTURE_PLAN.md for designer review

### Issue: Circular Dependencies Detected
**Symptoms:** Component A needs Component B, Component B needs Component A
**Solution:**
1. Refactor to extract shared logic into Component C
2. Example: Button and Card both need Icon → Build Icon first, Button and Card both depend on Icon (no circular dependency)

### Issue: Too Many Components to Build
**Symptoms:** 50+ components identified, overwhelming build plan
**Solution:**
1. Identify MVP components (homepage only, core user flow)
2. Build MVP first (Phase 2A), defer secondary pages (Phase 2B)
3. Update ARCHITECTURE_PLAN.md with phased rollout

### Issue: No Responsive Designs in Figma
**Symptoms:** Only desktop (1440px) frames provided, no mobile/tablet
**Solution:**
1. Request mobile/tablet designs from designer
2. If unavailable, apply standard responsive patterns:
   - Stack columns vertically on mobile
   - Reduce text sizes (text-4xl → text-3xl on mobile)
   - Full-width buttons on mobile
3. Document responsive decisions for designer approval

---

## Success Criteria

**Phase 2 Planning Complete When:**
1. All shared components identified with variants documented
2. All page sections mapped with top-to-bottom hierarchy
3. Build order plan created with dependency graph
4. Responsive breakpoints documented for each section
5. ARCHITECTURE_PLAN.md committed to repository
6. Team briefed and ready to execute build plan

**Phase 2 Planning Output:**
- `sites/[client-name]/ARCHITECTURE_PLAN.md`
- Component inventory (shared components list)
- Section breakdown (per-page section hierarchy)
- Build order checklist (Priority 1 → 7)
- Responsive behavior matrix

**Proceed to:** Phase 2 Execution - [figma-section-build](../figma-section-build/SKILL.md)

---

## Reference: Example Full Build Plan

**Project:** Acme Corp Website
**Figma:** https://figma.com/design/ABC123/acme-corp-website

### Shared Components (6 components, ~6 hours)
1. Icon.astro (30 min) - Zero dependencies
2. Button.astro (60 min) - Zero dependencies
3. Card.astro (90 min) - Depends on Icon
4. FormInput.astro (45 min) - Zero dependencies
5. Header.astro (120 min) - Depends on Button, Icon
6. Footer.astro (90 min) - Depends on Button, Icon

### Homepage Sections (4 sections, ~8 hours)
7. HeroSection.astro (120 min) - Depends on Button
8. FeaturesSection.astro (150 min) - Depends on Card, Icon
9. TestimonialsSection.astro (120 min) - Depends on Card
10. CTASection.astro (90 min) - Depends on Button

### About Page Sections (2 sections, ~4 hours)
11. TeamSection.astro (120 min) - Depends on Card
12. MissionSection.astro (120 min) - Minimal dependencies

### Page Compositions (3 pages, ~3 hours)
13. index.astro (60 min) - Assemble Homepage sections
14. about.astro (60 min) - Assemble About sections
15. contact.astro (60 min) - Assemble Contact form + sections

**Total Estimated Time:** ~21 hours across 15 components
**Timeline:** 3 weeks (7 hours/week, accounting for review cycles)
