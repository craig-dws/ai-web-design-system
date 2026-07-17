---
name: figma-section-build
description: Build individual Astro sections/components using Phase 1 locked tokens only, extracting layout structure from Figma while preventing token re-extraction and value hallucination. Enforces token-first development, validates against Figma screenshots, and maintains single source of truth for design values.
---

# Figma Section Build Workflow

## Purpose
This skill defines the Phase 2 execution workflow for building individual Astro components/sections from Figma designs. After Phase 1 tokens are locked and Phase 2 architecture planning is complete, this workflow ensures components are built systematically using ONLY locked tokens, with layout structure extracted from Figma and fidelity validated against design.

**Critical Rules:**
1. **NO token extraction during builds** - Use locked tokens from tailwind.config.cjs ONLY
2. **Layout structure from Figma** - Extract semantic HTML and spacing hierarchy
3. **Validate against screenshots** - Compare built component to Figma visually before marking complete

---

## When to Use This Skill

**Activate when:**
- Building individual component from Phase 2 architecture plan build order
- Phase 1 tokens locked in tailwind.config.cjs
- Component dependencies already built (per build order)
- Figma design finalized for target component

**DO NOT use when:**
- Tokens not yet extracted (complete Phase 1 first)
- Build order not planned (complete Phase 2 planning first)
- Dependent components not yet built (follow build order)
- Design still in flux (wait for design finalization)

---

## Core Principles

### 1. Token-First Development
**ALWAYS use locked tokens, NEVER extract new values:**

**Correct:**
```astro
<!-- Uses locked tokens from tailwind.config.cjs -->
<button class="bg-primary text-white px-element py-tight rounded-button">
  Click Me
</button>
```

**WRONG:**
```astro
<!-- Hardcoded values - FORBIDDEN -->
<button class="bg-[#3B82F6] px-6 py-2 rounded-lg">
  Click Me
</button>
```

**Why:** Prevents design drift, ensures brand consistency, maintains single source of truth.

### 2. Layout Extraction Only
**Extract from Figma:**
- ✅ Semantic HTML structure (section, article, div, header)
- ✅ Layout patterns (flex-col, grid-cols-3, justify-between)
- ✅ Content hierarchy (h1, h2, p, ul)
- ✅ Responsive breakpoint changes (flex-col md:flex-row)

**DO NOT extract from Figma during builds:**
- ❌ Color values (use locked tokens: bg-primary, text-neutral-900)
- ❌ Font sizes (use locked tokens: text-h1, text-body)
- ❌ Spacing values (use locked tokens: p-section, gap-element)
- ❌ Shadows/effects (use locked tokens: shadow-card)

**Why:** Layout structure varies per component, design token values are constant across project.

### 3. Incremental Build and Validate
**Build workflow per component:**
1. Extract layout structure from Figma
2. Scaffold Astro component with semantic HTML
3. Apply locked token classes (bg-primary, text-h1, p-section)
4. Test in browser at all breakpoints (375px/768px/1440px)
5. **Validate against Figma screenshot** (side-by-side comparison)
6. Refine until fidelity match, commit component

**Why:** Prevents big-bang builds that require extensive debugging, ensures quality at each step.

---

## Section Build Workflow (Step-by-Step)

### Step 1: Review Component Requirements

**Before starting build, verify:**

```markdown
Component Pre-Build Checklist:
- [ ] Component in current phase of build order plan
- [ ] All dependencies already built (check ARCHITECTURE_PLAN.md)
- [ ] Figma design finalized (no "WIP" or "Draft" labels)
- [ ] Tokens locked and documented in DESIGN_TOKENS.md
- [ ] Target file path known (e.g., sites/client/src/components/HeroSection.astro)
```

**Reference materials ready:**
- Figma file URL and frame/section name
- DESIGN_TOKENS.md (locked tokens reference)
- ARCHITECTURE_PLAN.md (component specification)
- Existing shared components (if dependencies exist)

---

### Step 2A: Extract Layout Structure (Figma MCP Method)

**Using Figma MCP (if available):**

```
Analyze the layout structure of this Figma section:
[Figma file URL]
Section/Frame: "[Section Name]" (e.g., "Hero Section")

Extract ONLY layout information:
1. Semantic HTML structure (section, article, div, header, etc.)
2. Layout patterns (flexbox, grid, positioning)
3. Content hierarchy (headings, paragraphs, lists, images)
4. Nesting relationships (parent-child structure)
5. Responsive behavior differences (if mobile/tablet/desktop frames exist)

DO NOT extract:
- Color values (I will use locked tokens)
- Font sizes (I will use locked tokens)
- Spacing pixel values (I will use locked tokens)
- Shadow/effect values (I will use locked tokens)

Format as annotated HTML structure with layout notes.
```

**Expected Output:**
```html
<!-- Layout Structure: Hero Section -->
<section> <!-- Full-width section -->
  <div> <!-- Container: centered, max-width constrained -->
    <div> <!-- Content wrapper: flex column (mobile), flex row (desktop) -->

      <!-- Left column: Text content -->
      <div> <!-- Flex column, text alignment -->
        <h1><!-- Heading text --></h1>
        <p><!-- Subheading text --></p>

        <!-- CTA buttons: flex row, gap between -->
        <div>
          <button><!-- Primary CTA (Button component) --></button>
          <button><!-- Secondary CTA (Button component) --></button>
        </div>
      </div>

      <!-- Right column: Hero image (desktop only, hidden mobile) -->
      <div>
        <img /><!-- Hero image, responsive sizing -->
      </div>
    </div>
  </div>
</section>

<!-- Layout Notes:
- Mobile (375px): Single column, text centered, image hidden
- Tablet (768px): Single column, text left-aligned, image visible below text
- Desktop (1440px): Two columns (flex-row), text left, image right, equal width
- Spacing: Section has vertical padding, content has internal gaps
-->
```

---

### Step 2B: Extract Layout Structure (Manual Inspection Method)

**No Figma MCP available:**

1. **Open Figma file and target section frame**
2. **Identify top-level semantic container:**
   - Is this a `<section>`, `<article>`, `<div>`, `<header>`, `<footer>`?
3. **Analyze layout pattern:**
   - Vertical stack → `flex flex-col`
   - Horizontal row → `flex flex-row`
   - Grid layout → `grid grid-cols-3`
   - Centered content → `flex items-center justify-center`
4. **Map content hierarchy:**
   - Main heading → `<h1>` or `<h2>`
   - Subheading → `<p>` with larger text class
   - Body text → `<p>`
   - Lists → `<ul>` or `<ol>`
   - Images → `<img>` or Astro `<Image>`
5. **Check responsive behavior:**
   - Compare mobile frame to desktop frame
   - Note layout changes (flex-col → flex-row, grid-cols-1 → grid-cols-3)
6. **Document structure in comments** before coding

**Time estimate:** 10-15 minutes per section for manual layout analysis.

---

### Step 3: Scaffold Astro Component

**File:** `sites/[client-name]/src/components/[ComponentName].astro`

**Component Template:**
```astro
---
/**
 * [Component Name] - [Brief description]
 *
 * Figma Reference: [Frame name and URL]
 * Dependencies: [List any imported components]
 *
 * @example
 * <ComponentName />
 */

// 1. Imports
import { Image } from 'astro:assets';
import Button from './Button.astro'; // If dependency exists

// 2. Props interface (if dynamic content needed)
interface Props {
  title?: string;
  description?: string;
  className?: string;
}

// 3. Props with defaults
const {
  title = "Default Title",
  description = "Default description",
  className = ''
} = Astro.props;

// 4. Logic (if needed)
const containerClasses = `relative ${className}`;
---

<!-- 5. Template: Semantic HTML + Locked Token Classes -->
<section class={containerClasses}>
  <!-- Container: max-width, centered, padding -->
  <div class="max-w-7xl mx-auto px-element py-section">

    <!-- Layout: flex column on mobile, row on desktop -->
    <div class="flex flex-col md:flex-row gap-element items-center">

      <!-- Text content column -->
      <div class="flex flex-col gap-tight md:w-1/2">
        <h1 class="text-h1 font-bold text-dark">{title}</h1>
        <p class="text-body text-neutral-600">{description}</p>

        <!-- CTA buttons -->
        <div class="flex flex-col sm:flex-row gap-tight mt-element">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>

      <!-- Image column (hidden on mobile, visible md+) -->
      <div class="hidden md:block md:w-1/2">
        <Image
          src="/assets/hero-image.webp"
          alt="Hero section illustration"
          width={600}
          height={400}
          class="w-full h-auto rounded-card shadow-card"
        />
      </div>
    </div>
  </div>
</section>

<!-- 6. Scoped styles: AVOID - Use Tailwind classes -->
```

**Key Points:**
- **Semantic HTML:** Use `<section>`, `<article>`, `<header>`, not generic `<div>` for major blocks
- **Locked tokens:** `bg-primary`, `text-h1`, `p-section` (NOT `bg-[#3B82F6]`, `text-5xl`, `p-20`)
- **Responsive prefixes:** `md:flex-row`, `lg:grid-cols-3` (mobile-first approach)
- **Component imports:** Import shared components (Button, Card) from same directory or packages/ui-components/

---

### Step 4: Apply Locked Token Classes

**Token Application Process:**

**Colors:**
```astro
<!-- Background colors -->
<div class="bg-primary"><!-- Uses locked 'primary' token --></div>
<div class="bg-neutral-50"><!-- Uses locked 'neutral-50' token --></div>

<!-- Text colors -->
<h1 class="text-dark"><!-- Uses locked 'dark' text token --></h1>
<p class="text-neutral-600"><!-- Uses locked neutral token --></p>
```

**Typography:**
```astro
<!-- Font sizes from locked tokens -->
<h1 class="text-h1">Page Title</h1>
<h2 class="text-h2">Section Heading</h2>
<p class="text-body">Body text</p>

<!-- Font families from locked tokens -->
<h1 class="font-heading">Heading Font</h1>
<p class="font-body">Body Font</p>
```

**Spacing:**
```astro
<!-- Padding from locked tokens -->
<section class="py-section"><!-- 80px vertical padding --></section>
<div class="p-element"><!-- 24px all-around padding --></div>
<div class="px-tight"><!-- 8px horizontal padding --></div>

<!-- Gaps from locked tokens -->
<div class="flex gap-element"><!-- 24px gap between items --></div>
<div class="grid gap-tight"><!-- 8px gap in grid --></div>
```

**Effects:**
```astro
<!-- Shadows from locked tokens -->
<div class="shadow-card">Card shadow</div>
<div class="shadow-card-hover">Hover shadow</div>

<!-- Border radius from locked tokens -->
<div class="rounded-button">Button radius</div>
<div class="rounded-card">Card radius</div>
```

**If token doesn't exist:**
1. Check DESIGN_TOKENS.md - Is this a legitimate gap?
2. Use closest existing token temporarily (e.g., p-6 instead of p-[27px])
3. Document missing token in ARCHITECTURE_PLAN.md "Known Gaps" section
4. Request designer to add to Figma design system
5. Re-extract tokens (Phase 1 update) when available
6. Update component to use new token

**DO NOT create arbitrary values** - Use locked tokens or document gap.

---

### Step 5: Implement Responsive Behavior

**Mobile-First Responsive Pattern:**

```astro
<!-- Step 1: Build mobile layout (no prefix) -->
<div class="flex flex-col gap-4 p-4">
  <h1 class="text-4xl">Mobile: Smaller text</h1>
  <div class="w-full">Mobile: Full width</div>
</div>

<!-- Step 2: Add tablet modifications (md: prefix for 768px+) -->
<div class="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-8">
  <h1 class="text-4xl md:text-5xl">Tablet: Larger text</h1>
  <div class="w-full md:w-1/2">Tablet: Half width</div>
</div>

<!-- Step 3: Add desktop modifications (lg: prefix for 1024px+) -->
<div class="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 p-4 md:p-8 lg:p-16">
  <h1 class="text-4xl md:text-5xl lg:text-6xl">Desktop: Largest text</h1>
  <div class="w-full md:w-1/2 lg:w-1/3">Desktop: Third width</div>
</div>
```

**Common Responsive Patterns (Reference ARCHITECTURE_PLAN.md):**

| Element | Mobile (Default) | Tablet (md:768px+) | Desktop (lg:1024px+) |
|---------|------------------|--------------------|-----------------------|
| **Container** | `px-element` (24px) | `md:px-element` (same) | `lg:px-section` (80px) |
| **Heading** | `text-4xl` | `md:text-5xl` | `lg:text-6xl` |
| **Grid** | `grid-cols-1` | `md:grid-cols-2` | `lg:grid-cols-3` |
| **Flex Direction** | `flex-col` | `md:flex-row` | Same as tablet |
| **Image Display** | `hidden` | `md:block` | Same as tablet |

**Test breakpoints in browser:**
```bash
# Start dev server
pnpm dev --filter=[client-name]

# Open browser DevTools → Device Toolbar
# Test at: 375px (mobile), 768px (tablet), 1440px (desktop)
```

---

### Step 6: Validate Against Figma (Fidelity Check)

**Visual Comparison Process:**

**Method A: Side-by-Side Manual Comparison**
1. Open Figma design in one monitor/window
2. Open browser with built component in another monitor/window
3. Compare visually:
   - Layout structure matches (columns, spacing, alignment)
   - Text hierarchy matches (h1 is largest, proper visual weight)
   - Color usage matches (primary CTA is primary color, etc.)
   - Spacing feels consistent (not eyeballed pixel-perfect, but visually balanced)

**Method B: Screenshot Overlay (Higher Precision)**
1. Export Figma frame as PNG (2x resolution for retina)
2. Use browser extension (e.g., Pixel Perfect) to overlay screenshot on built component
3. Toggle opacity to compare alignment
4. Adjust Tailwind classes until close match

**Method C: Figma MCP Screenshot Comparison (If Available)**
```
Compare the built component to the Figma design:

Figma: [URL and frame name]
Live Component: [Local dev URL, e.g., http://localhost:4321]

Identify discrepancies:
1. Layout structure differences
2. Spacing inconsistencies (too much/too little padding/margin)
3. Typography hierarchy mismatches
4. Color usage differences
5. Responsive behavior issues

Format as checklist of refinements needed.
```

**Fidelity Checklist:**
- [ ] Layout structure matches (flex/grid patterns correct)
- [ ] Heading hierarchy matches (h1 largest, visual weight appropriate)
- [ ] Color tokens correctly applied (primary CTA uses bg-primary)
- [ ] Spacing feels balanced (not cramped, not too loose)
- [ ] Responsive breakpoints work (mobile stacks, desktop columns)
- [ ] Images render correctly (proper aspect ratio, alignment)
- [ ] Interactive states work (hover on buttons, focus indicators)

**Acceptable deviations:**
- Minor spacing differences (±4-8px) due to Tailwind scale alignment
- Font rendering differences (browser vs Figma rendering)
- Intentional accessibility improvements (larger focus indicators)

**Document significant deviations in ARCHITECTURE_PLAN.md "Design Deviations Log".**

---

### Step 7: Commit Component

**Git workflow:**
```bash
# Test component one final time
pnpm dev --filter=[client-name]
# Visual check at 375px/768px/1440px

# Commit component
git add sites/[client-name]/src/components/[ComponentName].astro
git commit -m "feat(client-name): Build [ComponentName] from Figma

- Extract layout structure from Figma [Frame Name]
- Apply locked tokens (bg-primary, text-h1, p-section)
- Implement responsive behavior (mobile flex-col, desktop flex-row)
- Validate against Figma screenshot (fidelity ✅)

Figma Reference: [Frame URL]
Build Time: [X] minutes
Dependencies: [List components imported]"

# Push to remote
git push origin main
```

**Update ARCHITECTURE_PLAN.md:**
```markdown
### Priority 4: Homepage Sections
- [x] HeroSection.astro ✅ **COMPLETE** (120 min actual, 90 min estimated)
  - Commit: abc123f
  - Figma fidelity: ✅ Validated
  - Known issues: None
  - Next: FeaturesSection.astro
```

---

## Token Gap Handling Protocol

**When component requires value not in locked tokens:**

### Scenario 1: Minor Spacing Adjustment
**Problem:** Figma shows 28px padding, closest token is p-6 (24px) or p-8 (32px)
**Solution:** Use p-6 or p-8 (whichever looks closer), document as acceptable deviation

### Scenario 2: New Color Variant Needed
**Problem:** Figma shows success message with green background, no success color in tokens
**Solution:**
1. Check if this is one-off or reusable pattern
2. If reusable, document in DESIGN_TOKENS.md "Known Gaps"
3. Use Tailwind default temporarily: `bg-green-500`
4. Request designer to add semantic color to Figma Variables
5. Re-extract tokens (Phase 1 update)
6. Replace temporary class with locked token: `bg-success`

### Scenario 3: Complex Shadow Not in Tokens
**Problem:** Figma shows custom shadow, tokens only have card and card-hover shadows
**Solution:**
1. Try existing shadow tokens first (shadow-card, shadow-card-hover)
2. If visual mismatch significant, use Tailwind arbitrary value: `shadow-[0_10px_40px_rgba(0,0,0,0.15)]`
3. Document in component comment: `<!-- Custom shadow: not in tokens, matches Figma spec -->`
4. If pattern repeats across multiple components, escalate to Phase 1 token update

**Golden Rule:** Prefer locked tokens over arbitrary values 95% of the time. Document exceptions.

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Re-Extracting Color Values
**Wrong:**
```astro
<!-- Inspecting Figma color picker, copying hex code -->
<div class="bg-[#3B82F6]">
```
**Correct:**
```astro
<!-- Using locked token from tailwind.config.cjs -->
<div class="bg-primary">
```

**Why:** Prevents design drift, ensures brand consistency if primary color changes later.

### ❌ Mistake 2: Hardcoding Spacing
**Wrong:**
```astro
<!-- Measuring Figma spacing, hardcoding pixels -->
<div class="p-[27px]">
```
**Correct:**
```astro
<!-- Using locked token, rounded to Tailwind scale -->
<div class="p-6"><!-- 24px, closest to 27px -->
```

**Why:** Tailwind spacing scale ensures visual consistency and simplifies responsive design.

### ❌ Mistake 3: Desktop-First Responsive
**Wrong:**
```astro
<!-- Desktop layout by default, mobile override -->
<div class="flex-row md:flex-col">
```
**Correct:**
```astro
<!-- Mobile layout by default, desktop override -->
<div class="flex-col md:flex-row">
```

**Why:** Mobile-first prevents layout breaking on small screens, aligns with Tailwind philosophy.

### ❌ Mistake 4: Skipping Fidelity Validation
**Wrong:** Build component, assume it matches Figma, commit immediately
**Correct:** Build component, validate against Figma screenshot, refine, then commit

**Why:** Prevents accumulating design drift across multiple components, ensures client satisfaction.

### ❌ Mistake 5: Non-Semantic HTML
**Wrong:**
```astro
<div class="font-bold text-5xl">Page Title</div>
```
**Correct:**
```astro
<h1 class="font-bold text-h1">Page Title</h1>
```

**Why:** Semantic HTML improves SEO, accessibility, and AI crawler indexing.

---

## Integration with Other Skills

**Requires:**
- [figma-design-token-extraction](../figma-design-token-extraction/SKILL.md) - Phase 1 tokens must be locked
- [figma-component-architecture-planning](../figma-component-architecture-planning/SKILL.md) - Build order plan must exist

**Works with:**
- [figma-fidelity-validation](../figma-fidelity-validation/SKILL.md) - Validate each component after build
- [component-development](../component-development/SKILL.md) - Astro component best practices
- [responsive-testing](../responsive-testing/SKILL.md) - Test at all breakpoints

**Enables:**
- Page composition (once all sections built, assemble into index.astro)

---

## Success Criteria

**Component Build Complete When:**
1. Astro component file created with semantic HTML structure
2. ALL classes use locked tokens (no arbitrary values except documented exceptions)
3. Responsive behavior implemented (tested at 375px/768px/1440px)
4. Fidelity validated against Figma (visual comparison passed)
5. Component committed to Git with descriptive commit message
6. ARCHITECTURE_PLAN.md updated (component checked off)

**Component Build Output:**
- `sites/[client-name]/src/components/[ComponentName].astro`
- Git commit with "feat(client-name): Build [ComponentName]" message
- Updated ARCHITECTURE_PLAN.md checklist

**Repeat workflow for each component in build order plan.**

---

## Troubleshooting

### Issue: Token Class Not Working in Browser
**Symptoms:** `bg-primary` shows no background color, class seems ignored
**Solution:**
1. Verify token exists in tailwind.config.cjs theme.extend.colors
2. Check Tailwind dev server restarted after config changes
3. Inspect element in browser DevTools → Computed tab → Verify class applied
4. If class missing, check Tailwind content path includes component file

### Issue: Component Dependencies Not Found
**Symptoms:** `import Button from './Button.astro'` fails, file not found
**Solution:**
1. Verify dependent component built (check ARCHITECTURE_PLAN.md)
2. Check file path (same directory `./Button.astro` or packages `@workspace/ui-components/Button.astro`)
3. If shared component, may need to import from packages: `import Button from '@workspace/ui-components/Button.astro'`

### Issue: Responsive Breakpoints Not Triggering
**Symptoms:** `md:flex-row` doesn't activate at 768px
**Solution:**
1. Clear browser cache (Tailwind may cache old classes)
2. Restart dev server (`pnpm dev --filter=[client-name]`)
3. Verify syntax (must be `md:flex-row`, not `md-flex-row` or `md: flex-row`)
4. Check browser width exactly (DevTools → Device Toolbar → Responsive → 768px)

### Issue: Figma Layout Too Complex to Extract
**Symptoms:** Nested auto-layout frames, overlapping elements, unclear hierarchy
**Solution:**
1. Request designer to simplify Figma structure (flatten unnecessary nesting)
2. If unavailable, extract highest-level structure first, then refine iteratively
3. Use browser DevTools to experiment with flex/grid until match achieved
4. Document complexity in component comments for future maintainers

---

## Performance Considerations

**Image Optimization:**
- Use Astro `<Image>` component (auto WebP conversion, responsive sizes)
- Provide width/height attributes (prevents layout shift)
- Use `loading="lazy"` for below-fold images

**Component Reusability:**
- Extract repeated patterns to shared components (don't duplicate code)
- Use Astro slots for flexible content injection

**CSS Bundle Size:**
- Prefer existing Tailwind classes over arbitrary values (reduces CSS bundle)
- Avoid scoped `<style>` blocks unless absolutely necessary

---

## Time Estimates (Per Component)

**Simple component (Button, Icon):** 30-60 minutes
- Layout extraction: 10 min
- Component scaffolding: 10 min
- Token application: 10 min
- Responsive testing: 10 min
- Fidelity validation: 10 min

**Medium component (Card, Form Input):** 1-2 hours
- Layout extraction: 20 min
- Component scaffolding: 30 min
- Token application + variants: 30 min
- Responsive testing: 20 min
- Fidelity validation: 20 min

**Complex section (Hero, Features, Navigation):** 2-3 hours
- Layout extraction: 30 min
- Component scaffolding: 45 min
- Token application + nested components: 60 min
- Responsive testing: 30 min
- Fidelity validation: 30 min

**Adjust estimates based on:**
- Component complexity (variants, states, interactivity)
- Developer familiarity with Tailwind
- Figma design clarity and organization
- Responsive behavior complexity
