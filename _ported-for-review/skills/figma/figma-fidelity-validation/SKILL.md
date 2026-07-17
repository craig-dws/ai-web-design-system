---
name: figma-fidelity-validation
description: Compare built Astro components against Figma source designs to identify visual discrepancies, measure accuracy, and flag hallucinations or design drift. Enforces quality gates before component completion, ensures client satisfaction, and maintains design-to-code integrity throughout build process.
---

# Figma Fidelity Validation

## Purpose
This skill defines the validation workflow for comparing built components against Figma source designs. After building each section/component, this systematic validation process ensures visual fidelity, catches hallucinations (incorrect token usage, layout errors), and prevents design drift accumulation.

**Critical Rule:** NO component is marked complete until fidelity validation passes. This quality gate prevents compounding errors across multiple components.

---

## When to Use This Skill

**Activate when:**
- Component build appears complete (Step 6 of figma-section-build workflow)
- Before committing component to Git
- Client requests design review before deployment
- Refactoring existing component to match updated Figma design

**DO NOT use when:**
- Component still in active development (incomplete markup)
- Design is work-in-progress (Figma labeled "Draft" or "WIP")
- Tokens not yet locked (complete Phase 1 first)
- Intentional design deviations approved by designer (document in ARCHITECTURE_PLAN.md instead)

---

## Core Principles

### 1. Multi-Level Validation
Validate at three levels of precision:
- **Level 1: Structural Validation** (Does layout match? Columns, spacing, hierarchy)
- **Level 2: Visual Validation** (Do colors, typography, effects match?)
- **Level 3: Responsive Validation** (Does mobile/tablet/desktop match across breakpoints?)

**Why:** Catches different types of errors - structural mistakes early, visual polish issues mid-way, responsive bugs at end.

### 2. Acceptable Deviation Threshold
Not all differences are errors:
- **Critical deviations:** Wrong color (bg-secondary instead of bg-primary), missing section, wrong heading hierarchy
- **Acceptable deviations:** ±4-8px spacing due to Tailwind scale, font rendering differences, accessibility improvements

**Define thresholds before validation to prevent endless refinement loops.**

### 3. Document Don't Silently Fix
When deviations found:
1. **Screenshot discrepancy** for designer review
2. **Document in validation report** (what differs, why)
3. **Decide:** Fix to match Figma OR approve deviation as intentional improvement
4. **Update ARCHITECTURE_PLAN.md** "Design Deviations Log" if deviation approved

**Why:** Creates audit trail, prevents future confusion, enables informed client discussions.

---

## Validation Workflow (Step-by-Step)

### Step 1: Prepare Validation Environment

**Setup checklist:**
```markdown
Validation Pre-Flight:
- [ ] Figma file open with target frame/section visible
- [ ] Browser with built component running (dev server: pnpm dev --filter=[client-name])
- [ ] Browser DevTools → Device Toolbar enabled
- [ ] Screenshot tool ready (Figma export or browser screenshot)
- [ ] Validation checklist template ready (see Step 3)
```

**Screen arrangement:**
- **Dual monitors:** Figma on left, browser on right (side-by-side comparison)
- **Single monitor:** Split screen 50/50, or toggle between Figma and browser

**Browser setup:**
```bash
# Start dev server
pnpm dev --filter=[client-name]

# Open in browser
http://localhost:4321

# Enable DevTools
# - Windows/Linux: F12 or Ctrl+Shift+I
# - Mac: Cmd+Option+I

# Enable Device Toolbar
# - Windows/Linux: Ctrl+Shift+M
# - Mac: Cmd+Shift+M
```

---

### Step 2: Level 1 Validation - Structural Fidelity

**Structural validation checklist:**

#### Layout Structure Match
- [ ] **Semantic HTML correct:** `<section>` for sections, `<article>` for articles, `<header>` for headers (not generic `<div>`)
- [ ] **Column count matches:** Figma shows 3 columns → built component has `grid-cols-3`
- [ ] **Flex direction matches:** Figma shows horizontal row → built component has `flex-row` (not `flex-col`)
- [ ] **Nesting hierarchy matches:** Parent-child relationships preserved (e.g., cards inside grid container)

**Validation method:**
1. **Visual scan:** Does overall structure look similar? (Columns in right places, text in right sections)
2. **Inspect HTML:** Browser DevTools → Elements tab → Verify semantic elements used
3. **Compare to Figma layers:** Figma Layers panel → match nesting to HTML structure

**Common structural errors:**
- ❌ Wrong semantic element (div instead of section)
- ❌ Incorrect flex direction (column instead of row)
- ❌ Missing container (content not constrained to max-width)
- ❌ Wrong grid columns (2 columns instead of 3)

**If structural error found:**
1. Mark component as FAILED validation
2. Document error: "Section 2: Features uses flex-col instead of flex-row, should be horizontal on desktop"
3. Return to Step 3 of figma-section-build (apply correct layout classes)
4. Re-validate after fix

---

#### Content Hierarchy Match
- [ ] **Heading levels correct:** Figma main heading → `<h1>`, section headings → `<h2>`, subsections → `<h3>`
- [ ] **Content order matches:** Elements appear in same top-to-bottom order as Figma
- [ ] **List semantics correct:** Bulleted lists → `<ul>`, numbered lists → `<ol>`
- [ ] **Image placement matches:** Images in correct positions relative to text

**Validation method:**
1. **Read top-to-bottom:** Follow Figma design order, verify built component has same sequence
2. **Check heading hierarchy:** Inspect HTML → Verify only one `<h1>` per page, proper nesting (h2 after h1, h3 after h2)
3. **Verify list markup:** Figma bullet points → HTML `<ul><li>` elements

**Common hierarchy errors:**
- ❌ Multiple `<h1>` elements (should be one per page)
- ❌ Skipped heading levels (h1 → h3, skipping h2)
- ❌ Lists rendered as `<div>` instead of `<ul>`
- ❌ Content order shuffled (image before text when Figma shows text first)

**Structural validation pass criteria:**
- ✅ Semantic HTML structure matches Figma layer hierarchy
- ✅ Layout pattern matches (flex/grid configuration correct)
- ✅ Content order matches top-to-bottom
- ✅ Heading hierarchy proper (h1 → h2 → h3, no skips)

---

### Step 3: Level 2 Validation - Visual Fidelity

**Visual validation checklist:**

#### Color Accuracy
- [ ] **Background colors match:** Primary sections use correct bg-* token
- [ ] **Text colors match:** Headings, body text, links use correct text-* tokens
- [ ] **Button colors match:** Primary CTAs use bg-primary, secondary use bg-secondary
- [ ] **Border/accent colors match:** Decorative elements use correct color tokens

**Validation method:**
1. **Side-by-side color comparison:**
   - Select element in Figma → Note fill color
   - Inspect element in browser → DevTools → Computed tab → Background-color
   - Verify hex codes match (or match locked token value)

2. **Token verification:**
   - Built component uses `bg-primary` class
   - Open tailwind.config.cjs → Verify `primary: '#3B82F6'`
   - Figma shows `#3B82F6` for primary buttons
   - ✅ Match confirmed

**Common color errors:**
- ❌ Hardcoded color instead of token (`bg-[#3B82F6]` instead of `bg-primary`)
- ❌ Wrong token used (`bg-secondary` instead of `bg-primary`)
- ❌ Missing color (transparent instead of colored background)
- ❌ Color hallucination (invented color not in Figma or tokens)

**If color error found:**
1. Document: "Hero section background uses bg-secondary, should be bg-primary per Figma"
2. Update component: Change `bg-secondary` → `bg-primary`
3. Re-validate color accuracy

---

#### Typography Accuracy
- [ ] **Font sizes match:** H1 uses text-h1 token, body uses text-body token
- [ ] **Font weights match:** Headings bold (font-bold), body regular (font-normal)
- [ ] **Line heights comfortable:** Text readable, not cramped or too loose
- [ ] **Font families match:** Headings use font-heading, body uses font-body

**Validation method:**
1. **Text style comparison:**
   - Select text in Figma → Properties panel → Font size, weight, line height
   - Inspect text in browser → DevTools → Computed tab → Font-size, font-weight, line-height
   - Verify values match (or match locked token values)

2. **Visual readability check:**
   - Does text look similar to Figma? (Size, weight, spacing)
   - Is text readable? (Not too small, not too large)

**Common typography errors:**
- ❌ Wrong font size token (`text-2xl` instead of `text-h1`)
- ❌ Missing font weight (`font-normal` instead of `font-bold`)
- ❌ Wrong font family (`font-body` on headings instead of `font-heading`)
- ❌ Line height too tight (`leading-tight` when should be `leading-normal`)

**Font rendering caveat:** Browsers render fonts differently than Figma. Slight differences (1-2px) acceptable if font token correct.

---

#### Spacing Accuracy
- [ ] **Section padding matches:** Vertical spacing between sections uses py-section or equivalent
- [ ] **Component padding matches:** Internal component spacing uses p-element or equivalent
- [ ] **Gap spacing matches:** Flexbox/grid gaps use gap-tight, gap-element, or gap-section
- [ ] **Margins appropriate:** No excessive whitespace or cramped layouts

**Validation method:**
1. **Visual spacing assessment:**
   - Does spacing feel similar to Figma? (Not cramped, not too loose)
   - Are sections clearly separated?

2. **Precise measurement (if needed):**
   - Figma: Select two elements → Hold Alt/Option → Measure spacing
   - Browser: DevTools → Select element → Inspect margin/padding in Box Model view
   - Compare: Figma shows 24px → Browser shows 24px (via p-6 token) → ✅ Match

**Common spacing errors:**
- ❌ Hardcoded spacing (`p-[27px]` instead of `p-6`)
- ❌ Wrong spacing token (`p-tight` instead of `p-element`)
- ❌ Missing spacing (elements touching when should have gap)
- ❌ Excessive spacing (huge whitespace not in Figma)

**Spacing tolerance:** ±4-8px acceptable if using Tailwind tokens (rounding from Figma's arbitrary values).

---

#### Effects Accuracy (Shadows, Borders, Radius)
- [ ] **Shadows match:** Cards use shadow-card, hover states use shadow-card-hover
- [ ] **Border radius matches:** Buttons use rounded-button, cards use rounded-card
- [ ] **Borders present:** If Figma shows borders, built component has border classes
- [ ] **Visual effects appropriate:** No missing shadows, no incorrect blur/spread

**Validation method:**
1. **Shadow comparison:**
   - Figma: Select element with shadow → Effects panel → Note shadow parameters
   - Browser: Inspect element → Computed tab → Box-shadow value
   - Compare: Similar depth and spread? ✅ Close enough (exact pixel match not required)

2. **Border radius check:**
   - Visual inspection: Are corners rounded to similar degree?
   - If critical, measure: Figma shows 8px radius → Component uses rounded-button (which is 8px) → ✅ Match

**Common effects errors:**
- ❌ Missing shadow (component flat when Figma shows shadow)
- ❌ Wrong shadow intensity (shadow-lg instead of shadow-md)
- ❌ Wrong border radius (rounded-full instead of rounded-button)
- ❌ Effects hallucination (added shadow not in Figma)

**Visual fidelity pass criteria:**
- ✅ Colors match locked tokens and Figma design
- ✅ Typography matches (size, weight, family from tokens)
- ✅ Spacing feels balanced (±8px tolerance acceptable)
- ✅ Effects present (shadows, borders, radius match)

---

### Step 4: Level 3 Validation - Responsive Fidelity

**Test at three breakpoints:**

#### Mobile Validation (375px)
**Browser setup:**
```
DevTools → Device Toolbar → Responsive
Set width: 375px (iPhone SE standard)
Set height: 667px (or scroll to view full component)
```

**Mobile checklist:**
- [ ] **Layout stacks vertically:** Multi-column desktop layouts become single column
- [ ] **Text readable:** Font sizes appropriate (not too small)
- [ ] **Buttons touchable:** CTAs at least 44x44px (iOS/Android minimum touch target)
- [ ] **Images resize:** Images scale down, maintain aspect ratio
- [ ] **No horizontal scroll:** All content fits within 375px width

**Common mobile errors:**
- ❌ Desktop layout on mobile (3 columns instead of 1)
- ❌ Text too small (text-xs on mobile when should be text-base)
- ❌ Buttons too small (px-2 py-1 instead of px-4 py-3)
- ❌ Images overflow (fixed width exceeds 375px)
- ❌ Horizontal scroll required (container wider than viewport)

**Figma mobile frame comparison (if available):**
- Open Figma → "Mobile Designs" page → Compare to browser at 375px
- Verify layout matches Figma mobile frame

---

#### Tablet Validation (768px)
**Browser setup:**
```
DevTools → Device Toolbar → Responsive
Set width: 768px (iPad standard)
Set height: 1024px
```

**Tablet checklist:**
- [ ] **Layout adapts:** 1 column (mobile) → 2 columns (tablet), or stays 1 column if design shows
- [ ] **Text size increases:** Uses md: prefixed classes (text-4xl → md:text-5xl)
- [ ] **Spacing increases:** More padding/margin than mobile (p-4 → md:p-8)
- [ ] **Images visible:** Elements hidden on mobile may show at tablet (hidden → md:block)

**Common tablet errors:**
- ❌ No responsive change (same as mobile, should adapt)
- ❌ Jumps to desktop layout (should be intermediate step)
- ❌ Text too large (desktop size at tablet width)
- ❌ Layout breaks (elements overlap or misalign)

---

#### Desktop Validation (1440px)
**Browser setup:**
```
DevTools → Device Toolbar → Responsive
Set width: 1440px (Standard desktop)
Set height: 900px
```

**Desktop checklist:**
- [ ] **Full layout visible:** 3 columns (if Figma shows 3), horizontal navigation, etc.
- [ ] **Max-width constraint:** Content doesn't stretch beyond max-w-7xl (or configured max)
- [ ] **Largest text sizes:** Uses lg: prefixed classes (text-5xl → lg:text-6xl)
- [ ] **Desktop-specific elements:** Features hidden on mobile/tablet may show (hidden md:hidden lg:block)
- [ ] **Matches Figma desktop frame:** Layout matches Figma "Desktop Designs" page

**Common desktop errors:**
- ❌ Content too narrow (stuck at mobile/tablet width)
- ❌ Content too wide (no max-width constraint, stretches to 1440px+)
- ❌ Missing columns (still showing 2 columns instead of 3)
- ❌ Text sizes don't increase (stuck at mobile sizes)

**Responsive validation pass criteria:**
- ✅ Mobile (375px): Layout stacks, text readable, no horizontal scroll
- ✅ Tablet (768px): Layout adapts (intermediate state), spacing increases
- ✅ Desktop (1440px): Full layout visible, max-width constrained, matches Figma desktop frame

---

### Step 5: Screenshot Overlay Validation (Optional - High Precision)

**For pixel-perfect accuracy requirements:**

**Method A: Figma Export Overlay**
1. **Export Figma frame:**
   - Select target frame in Figma
   - Right-click → Export → PNG (2x resolution)
   - Save as `hero-section-figma.png`

2. **Install browser extension:**
   - Chrome: "Pixel Perfect" extension (free)
   - Firefox: "Perfect Pixel" add-on (free)

3. **Overlay screenshot:**
   - Open browser with built component
   - Activate Pixel Perfect extension
   - Upload `hero-section-figma.png`
   - Adjust position, toggle opacity (50%)
   - Compare: Built component should align with overlay

4. **Identify misalignments:**
   - Heading too far left/right → Adjust text-left/text-center
   - Section too short/tall → Adjust py-section value
   - Buttons misplaced → Adjust gap or margin classes

**Method B: Figma MCP Screenshot Comparison (If Available)**
```
Compare the built component against Figma using screenshot overlay analysis:

Figma Frame: [URL] → "[Frame Name]"
Built Component: http://localhost:4321 (section: [ComponentName])

Generate side-by-side screenshots:
1. Export Figma frame at 1440px width
2. Screenshot built component at 1440px width
3. Overlay screenshots with 50% opacity
4. Identify pixel-level discrepancies:
   - Heading alignment (left, center, right)
   - Spacing differences (padding, margins, gaps)
   - Element sizing (width, height variations)

Format as annotated comparison with refinement recommendations.
```

**When to use overlay validation:**
- Client requires pixel-perfect accuracy
- High-profile homepage hero sections
- Brand-critical components (landing pages, product showcases)
- Final QA before production deployment

**When to skip overlay validation:**
- Internal tools or low-visibility pages
- Rapid prototyping phase
- Acceptable deviation threshold already met via visual comparison

---

### Step 6: Document Validation Results

**Create validation report:**

**File:** `sites/[client-name]/validation-reports/[ComponentName]-validation.md`

```markdown
# [ComponentName] Fidelity Validation Report

**Date:** [YYYY-MM-DD]
**Figma Reference:** [Frame URL]
**Component File:** sites/[client-name]/src/components/[ComponentName].astro
**Validator:** [Your Name]

---

## Validation Summary

**Overall Status:** ✅ PASSED | ⚠️ PASSED WITH DEVIATIONS | ❌ FAILED

**Completion Percentage:** 95% fidelity match

---

## Level 1: Structural Validation

- [x] ✅ Layout structure matches (flex-row desktop, flex-col mobile)
- [x] ✅ Semantic HTML correct (section → div → h1/p structure)
- [x] ✅ Content hierarchy matches (h1 → h2 → p order preserved)
- [x] ✅ Heading levels proper (single h1, h2 for sections)

**Structural Issues:** None

---

## Level 2: Visual Validation

- [x] ✅ Colors match (bg-primary, text-dark tokens used correctly)
- [x] ✅ Typography matches (text-h1, font-bold, font-heading applied)
- [x] ⚠️ Spacing close match (py-section used, Figma shows 82px, token is 80px - acceptable)
- [x] ✅ Effects match (shadow-card applied, border-radius correct)

**Visual Issues:**
- ⚠️ **Minor:** Section padding 80px (py-section token) vs Figma 82px → Acceptable deviation (within Tailwind scale)

---

## Level 3: Responsive Validation

### Mobile (375px)
- [x] ✅ Layout stacks vertically (flex-col)
- [x] ✅ Text readable (text-4xl on mobile)
- [x] ✅ Buttons touchable (px-6 py-3, exceeds 44px minimum)
- [x] ✅ No horizontal scroll

### Tablet (768px)
- [x] ✅ Layout adapts (text-5xl at md breakpoint)
- [x] ✅ Spacing increases (md:py-section applied)

### Desktop (1440px)
- [x] ✅ Full layout visible (flex-row, 2-column layout)
- [x] ✅ Max-width constraint (max-w-7xl applied)
- [x] ✅ Matches Figma desktop frame

**Responsive Issues:** None

---

## Approved Deviations

1. **Spacing adjustment:** Section padding 80px instead of Figma's 82px
   - **Reason:** Aligns with Tailwind spacing scale (py-section token = 80px)
   - **Approved by:** Designer (verbal confirmation)
   - **Impact:** Negligible visual difference

---

## Action Items

- [ ] **None** - Component approved for commit

---

## Validation Screenshots

[Attach screenshots: Figma side-by-side with built component at 375px/768px/1440px]

---

## Sign-Off

**Validator:** [Your Name] - [Date]
**Designer Review:** [Pending] | [Approved] | [Changes Requested]
**Client Review:** [Pending] | [Approved] | [Changes Requested]
```

**Commit validation report:**
```bash
git add sites/[client-name]/validation-reports/[ComponentName]-validation.md
git commit -m "docs(client-name): Validation report for [ComponentName] - 95% fidelity ✅"
```

---

### Step 7: Decide on Deviations

**Deviation decision tree:**

```
Deviation identified
    ↓
Is it critical? (Wrong color, missing section, broken layout)
    ↓ YES → FAIL validation → Return to figma-section-build Step 3
    ↓ NO
    ↓
Is it acceptable? (±8px spacing, font rendering, accessibility improvement)
    ↓ YES → Document deviation → Approve component
    ↓ NO
    ↓
Can it be fixed easily? (<30 min adjustment)
    ↓ YES → Fix → Re-validate
    ↓ NO → Escalate to designer for approval
```

**Deviation categories:**

**CRITICAL (Must fix):**
- Wrong color (bg-secondary instead of bg-primary)
- Missing section or element
- Broken responsive layout (mobile shows desktop layout)
- Wrong heading hierarchy (multiple h1 elements)
- Non-semantic HTML (div instead of section/article)

**ACCEPTABLE (Document and approve):**
- ±4-8px spacing (Tailwind scale rounding)
- Font rendering differences (browser vs Figma)
- Accessibility improvements (larger focus indicators, color contrast fixes)
- Performance optimizations (lazy loading images, code splitting)

**MINOR (Fix if time permits):**
- ±2-4px alignment tweaks
- Subtle shadow/effect differences
- Border radius slight variations (8px vs 9px)

**ESCALATE TO DESIGNER:**
- Structural changes improving UX (reordering elements for better flow)
- Color contrast fixes for accessibility (changing color to meet WCAG AA)
- Responsive behavior not specified in Figma (mobile nav pattern choice)

---

## Common Validation Patterns

### Pattern 1: Color Token Hallucination
**Symptom:** Component uses `bg-accent` but Figma shows primary color
**Detection:** Visual comparison → Background color looks wrong
**Fix:** Change `bg-accent` → `bg-primary`, verify in DESIGN_TOKENS.md

### Pattern 2: Responsive Breakpoint Miss
**Symptom:** Desktop layout appears at tablet width (768px)
**Detection:** Responsive validation → Tablet should be 2 columns, showing 3
**Fix:** Change `grid-cols-3` → `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Pattern 3: Spacing Accumulation Error
**Symptom:** Section feels more cramped than Figma
**Detection:** Visual spacing assessment → Padding looks insufficient
**Fix:** Increase padding token: `py-element` → `py-section`, re-validate

### Pattern 4: Semantic HTML Mistake
**Symptom:** SEO audit flags missing h1 or improper heading hierarchy
**Detection:** DevTools → Elements tab → No h1 found, or h3 before h2
**Fix:** Change `<div class="text-5xl">` → `<h1 class="text-h1">`, re-validate

### Pattern 5: Image Aspect Ratio Distortion
**Symptom:** Images look stretched or squashed
**Detection:** Visual comparison → Image proportions differ from Figma
**Fix:** Add `width` and `height` attributes to `<Image>` component, use `object-fit` classes

---

## Integration with Other Skills

**Requires:**
- [figma-section-build](../figma-section-build/SKILL.md) - Component must be built before validation

**Works with:**
- [responsive-testing](../responsive-testing/SKILL.md) - Test components at all breakpoints
- [accessibility-validation](../accessibility-validation/SKILL.md) - Validate WCAG compliance
- [quality-gate-validation](../quality-gate-validation/SKILL.md) - Pre-deployment quality gates

**Enables:**
- Component approval and Git commit
- Page composition (once all sections validated)

---

## Success Criteria

**Validation Complete When:**
1. Level 1 structural validation passed (layout, hierarchy, semantics)
2. Level 2 visual validation passed (colors, typography, spacing, effects within tolerance)
3. Level 3 responsive validation passed (mobile/tablet/desktop tested)
4. Deviations documented and approved
5. Validation report created and committed
6. Component marked complete in ARCHITECTURE_PLAN.md

**Validation Output:**
- Validation report: `sites/[client-name]/validation-reports/[ComponentName]-validation.md`
- Updated ARCHITECTURE_PLAN.md with ✅ status
- Component approved for Git commit

**Proceed to:** Commit component (figma-section-build Step 7) or next component in build order

---

## Troubleshooting

### Issue: Too Many Minor Deviations to Track
**Symptoms:** 20+ small spacing/alignment issues, overwhelming to document
**Solution:**
1. Prioritize critical issues (colors, structure, responsive) - fix those first
2. Group minor issues by category (all spacing, all alignment)
3. Set deviation threshold: "Accept all deviations <4px"
4. Document grouped deviations: "Minor spacing variations throughout, all within ±4px tolerance"

### Issue: Designer Disagrees with Deviation
**Symptoms:** Validator approves spacing deviation, designer requests exact match
**Solution:**
1. Explain Tailwind spacing scale constraint (24px token vs 27px Figma)
2. Offer alternatives: Use arbitrary value `p-[27px]` OR adjust Figma to 24px
3. Document decision in validation report
4. If designer insists on 27px, use arbitrary value, note as exception

### Issue: Can't Visually Assess Fidelity
**Symptoms:** Components look "close enough" but uncertain if acceptable
**Solution:**
1. Use screenshot overlay method (Step 5) for objective comparison
2. Measure specific elements: DevTools → Box Model → Compare to Figma measurements
3. Request designer review: Send side-by-side screenshots for approval
4. Establish deviation threshold with designer upfront (±5%? ±10px?)

### Issue: Responsive Behavior Not in Figma
**Symptoms:** Figma only has desktop frame, no mobile/tablet designs
**Solution:**
1. Apply standard responsive patterns (see figma-component-architecture-planning)
2. Document responsive decisions in validation report
3. Request designer approval of responsive behavior
4. If rejected, request designer to provide mobile/tablet frames

---

## Metrics to Track

**Per-component metrics:**
- Validation pass/fail rate
- Number of deviations (critical vs acceptable)
- Time to validate (target: <30 min per component)
- Fidelity percentage (90%+, 95%+, 99%+)

**Project-wide metrics:**
- Average fidelity across all components
- Most common deviation types (spacing? colors? responsive?)
- Validation cycle time (build → validate → fix → re-validate)

**Use metrics to:**
- Identify systemic issues (if 80% of components have spacing issues, revisit token extraction)
- Improve build process (if validation takes >45 min/component, streamline checklist)
- Report quality to client (95% average fidelity across 20 components)

---

## Advanced Techniques

### Automated Screenshot Comparison (Future)
**Concept:** Use visual regression testing tools (Percy, Chromatic) to automate screenshot comparison
**Benefits:** Faster validation, objective fidelity scoring, regression detection
**Implementation:** Requires CI/CD pipeline integration, Figma API access for reference screenshots

### AI-Assisted Validation (Experimental)
**Concept:** Use Figma MCP + Claude Code to generate validation reports automatically
**Prompt example:**
```
Compare this built component against Figma:
Built: http://localhost:4321 (HeroSection)
Figma: [URL] → "Hero Section" frame

Generate validation report:
1. Structural fidelity (layout, hierarchy)
2. Visual fidelity (colors, typography, spacing)
3. Responsive fidelity (if mobile/tablet frames exist)
4. List deviations with severity (critical/acceptable/minor)
5. Provide fix recommendations for critical deviations
```

**Benefits:** Faster validation, consistent standards, reduces manual checking
**Limitations:** Requires Figma MCP setup, AI may miss subtle visual issues, human review still needed

---

## Time Estimates

**Per-component validation:**
- **Simple component (Button, Icon):** 10-15 minutes
- **Medium component (Card, Section):** 20-30 minutes
- **Complex component (Hero, Navigation):** 30-45 minutes

**With screenshot overlay (add +50%):**
- Simple: 15-20 minutes
- Medium: 30-45 minutes
- Complex: 45-60 minutes

**Efficiency tips:**
- Batch validate related components (all cards together)
- Create validation checklist template (reuse for each component)
- Use dual monitors (Figma left, browser right - saves window switching)
- Document common deviation patterns (copy/paste into reports)
