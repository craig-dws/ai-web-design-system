---
name: figma-design-token-extraction
description: Extract all design tokens from Figma (colors, typography, spacing, effects) in a single comprehensive pass and lock them into tailwind.config.cjs before any component work begins. Prevents re-extraction, ensures completeness, and establishes single source of truth for Phase 1 of Figma build workflows.
---

# Figma Design Token Extraction

## Purpose
This skill defines the Phase 1 workflow for extracting ALL design tokens from Figma in a single comprehensive pass and locking them into the Tailwind configuration. This one-time extraction prevents costly re-work, hallucinated values, and inconsistent token usage during component builds.

**Critical Rule:** Design token extraction happens ONCE at project start. After Phase 1 completion, tokens are LOCKED and component builds must use existing tokens only.

---

## When to Use This Skill

**Activate when:**
- Starting a new Figma-to-code project
- Client provides Figma file with design system
- Before building any components or sections
- Converting existing manual builds to token-based workflow

**DO NOT use when:**
- Tokens already extracted and locked in tailwind.config.cjs
- Building individual components (use locked tokens instead)
- Making minor design tweaks (update tokens, don't re-extract)
- Design is incomplete or in flux (wait for design finalization)

---

## Core Principles

### 1. Single-Pass Extraction
Extract ALL token categories in one comprehensive session:
- Colors (primary, secondary, accent, neutrals, semantic)
- Typography (families, sizes, weights, line heights, letter spacing)
- Spacing (padding, margins, gaps - align to Tailwind 4px scale)
- Effects (shadows, blurs)
- Sizing (border radius, widths, heights)

**Why:** Prevents multiple context switches between Figma and code, ensures no tokens are missed, establishes complete design system foundation.

### 2. Lock and Reference
Once tokens are committed to tailwind.config.cjs:
- NO hardcoded values in components
- NO "one-off" custom colors or spacing
- ALL components reference tokens via Tailwind classes
- Token updates go through design review process

**Why:** Prevents design drift, ensures brand consistency, makes design updates atomic.

### 3. Figma MCP vs Manual Extraction
Choose extraction method based on setup:
- **Figma MCP (Remote/Local):** Direct API access, always up-to-date, requires token setup
- **Figma Tokens Studio Plugin:** Git-synced tokens, free tier available, requires Style Dictionary
- **Manual Inspection:** Alt/Option key measurements, copy from Figma properties panel, no dependencies

**This skill supports all methods** - choose based on project constraints.

---

## Phase 1 Workflow: Complete Token Extraction

### Step 1: Audit Figma Design System Structure

**Before extracting, verify completeness:**

```markdown
Design System Audit Checklist:
- [ ] Color Variables defined (or Color Styles if free plan)
- [ ] Typography Styles applied to all text layers
- [ ] Spacing follows consistent scale (4px increments recommended)
- [ ] Shadow/Effect Styles created for shadows
- [ ] Border radius values documented
- [ ] Component variants use Variables (not hardcoded values)
```

**If audit fails:** Request designer to organize Figma file with proper Variables/Styles before extraction.

---

### Step 2A: Extract Tokens via Figma MCP (Preferred if Available)

**Requirements:**
- Figma MCP server configured (see docs/FIGMA_MCP_SETUP.md)
- Figma personal access token
- File URL and optional node IDs

**Extraction Prompt:**
```
Extract the complete design system tokens from this Figma file:
[Figma file URL]

Extract ALL of the following token categories:

1. Colors:
   - Primary brand colors (with variants if multi-tone)
   - Secondary/accent colors
   - Neutral palette (50-900 scale if available)
   - Semantic colors (success, error, warning, info)

2. Typography:
   - Font families (headings, body, mono/code)
   - Font sizes (with line heights and letter spacing)
   - Font weights (all used weights per family)

3. Spacing:
   - Padding values (align to Tailwind 4px scale: 4, 8, 12, 16, 24, 32, 48, 64px)
   - Margin values
   - Gap values (flexbox/grid spacing)

4. Effects:
   - Box shadows (all defined shadow styles)
   - Text shadows (if used)

5. Sizing:
   - Border radius values
   - Max-width values for containers
   - Commonly used widths/heights

Format output as JavaScript object compatible with tailwind.config.cjs theme.extend structure.
Flag any missing categories or incomplete scales.
```

**Expected Output Format:**
```javascript
// Design Tokens Extracted from Figma
module.exports = {
  colors: {
    primary: {
      DEFAULT: '#3B82F6',
      dark: '#2563EB',
      light: '#60A5FA',
    },
    secondary: '#8B5CF6',
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      900: '#111827',
    },
    success: '#10B981',
    error: '#EF4444',
  },
  fontFamily: {
    heading: ['Inter', 'sans-serif'],
    body: ['Open Sans', 'sans-serif'],
  },
  fontSize: {
    'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
    'h2': ['36px', { lineHeight: '1.3' }],
    'body': ['16px', { lineHeight: '1.6' }],
  },
  spacing: {
    'section': '80px',
    'element': '24px',
    'tight': '8px',
  },
  boxShadow: {
    'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
    'card-hover': '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
  borderRadius: {
    'button': '8px',
    'card': '12px',
  },
};
```

---

### Step 2B: Extract Tokens via Tokens Studio Plugin (Free Plan Alternative)

**Requirements:**
- Tokens Studio for Figma plugin installed
- Designer has created token collections in Figma
- Optional: GitHub sync configured

**Designer Workflow:**
1. Install "Tokens Studio for Figma" plugin
2. Create token collections: colors, spacing, typography, shadows
3. Export tokens as JSON (Settings → Export to JSON)
4. Send `design-tokens.json` to developer

**Developer Workflow:**
```bash
# Install transformation tools
pnpm add -D style-dictionary @tokens-studio/sd-transforms token-transformer

# Create style-dictionary.config.js
cat > packages/design-tokens/style-dictionary.config.js << 'EOF'
const StyleDictionary = require('style-dictionary');
const { registerTransforms } = require('@tokens-studio/sd-transforms');

registerTransforms(StyleDictionary);

module.exports = {
  source: ['tokens/design-tokens.json'],
  platforms: {
    tailwind: {
      transformGroup: 'tokens-studio',
      buildPath: 'output/',
      files: [{
        destination: 'tailwind-tokens.js',
        format: 'javascript/module',
      }],
    },
  },
};
EOF

# Transform tokens
npx token-transformer tokens/design-tokens.json tokens/transformed.json
npx style-dictionary build

# Output: packages/design-tokens/output/tailwind-tokens.js
```

**See docs/FIGMA_FREE_WORKFLOW.md for complete setup details.**

---

### Step 2C: Extract Tokens via Manual Inspection (No Dependencies)

**When to use:** No MCP access, designer hasn't set up Tokens Studio, quick prototyping.

**Manual Extraction Process:**

**Colors:**
1. Select element with each unique color in Figma
2. Right sidebar → Design tab → Fill section → Copy hex code
3. Document in structured format:

```javascript
colors: {
  // Primary CTA button fill: #3B82F6
  primary: '#3B82F6',
  // Heading text color: #111827
  'text-dark': '#111827',
}
```

**Typography:**
1. Select each text style variant (H1, H2, body, etc.)
2. Right sidebar → Text section → Note:
   - Font family
   - Font size
   - Font weight
   - Line height
   - Letter spacing
3. Convert to Tailwind fontSize format:

```javascript
fontSize: {
  'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
}
```

**Spacing:**
1. Select two elements → Hold Alt/Option → Measure pixel distance
2. Document common spacing values
3. **CRITICAL:** Align to Tailwind scale (4, 8, 12, 16, 24, 32, 48, 64px)
   - If Figma shows 27px, round to 24px or 32px
   - Consult with designer on rounding decisions

**Shadows:**
1. Select element with shadow → Right sidebar → Effects
2. Copy shadow parameters (x, y, blur, spread, color, opacity)
3. Translate to CSS box-shadow format:

```javascript
boxShadow: {
  'card': '0 4px 6px rgba(0, 0, 0, 0.1)', // x:0, y:4, blur:6
}
```

**Time estimate:** 45-90 minutes for complete manual extraction.

---

### Step 3: Integrate Tokens into Tailwind Config

**File:** `sites/[client-name]/tailwind.config.cjs`

**Integration Pattern:**
```javascript
// Option A: Inline tokens (simple projects)
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        // ... all color tokens
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        // ... all font families
      },
      // ... all other tokens
    },
  },
  plugins: [],
};
```

**Option B: Import from shared package (monorepo recommended):**
```javascript
const tokens = require('../../packages/design-tokens/output/tailwind-tokens.js');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: tokens,
  },
  plugins: [],
};
```

**Verify tokens loaded:**
```bash
# Start dev server
pnpm dev --filter=[client-name]

# In browser DevTools, check if custom classes work:
# <div class="bg-primary">Test</div> should show correct color
```

---

### Step 4: Lock Tokens and Document

**Create token documentation:**

**File:** `sites/[client-name]/DESIGN_TOKENS.md`

```markdown
# Design Tokens Reference

**Status:** LOCKED (Phase 1 Complete)
**Last Updated:** [Date]
**Source:** [Figma file URL]

## Usage Rules
- ALL components MUST use these tokens via Tailwind classes
- NO hardcoded colors, spacing, or typography values
- Token updates require design review approval
- Use `bg-primary`, `text-h1`, `p-section` classes (not arbitrary values)

## Color Palette
- Primary: `bg-primary` (#3B82F6) - Main CTA buttons, links
- Secondary: `bg-secondary` (#8B5CF6) - Secondary actions
- Text Dark: `text-dark` (#111827) - Headings, body text

## Typography Scale
- H1: `text-h1` (48px, line-height 1.2) - Page titles only
- H2: `text-h2` (36px, line-height 1.3) - Section headings
- Body: `text-body` (16px, line-height 1.6) - Paragraph text

## Spacing System
- Section: `p-section` (80px) - Vertical section padding
- Element: `p-element` (24px) - Component internal spacing
- Tight: `p-tight` (8px) - Compact spacing

## Component Examples
\`\`\`astro
<!-- Correct: Uses tokens -->
<button class="bg-primary text-white px-element py-tight rounded-button">
  Click Me
</button>

<!-- WRONG: Hardcoded values -->
<button class="bg-[#3B82F6] px-6 py-2 rounded-lg">
  Click Me
</button>
\`\`\`

## Known Gaps
- [List any missing tokens discovered during component builds]
- [Process: Request designer to add to Figma, re-extract, update config]
```

**Commit tokens:**
```bash
git add sites/[client-name]/tailwind.config.cjs
git add sites/[client-name]/DESIGN_TOKENS.md
git commit -m "feat(client-name): Lock design tokens from Figma (Phase 1)"
```

---

## Validation Checklist

Before marking Phase 1 complete, verify:

- [ ] **Completeness:** All token categories extracted (colors, typography, spacing, effects, sizing)
- [ ] **Integration:** Tokens loaded in tailwind.config.cjs and test classes work in browser
- [ ] **Documentation:** DESIGN_TOKENS.md created with usage rules and examples
- [ ] **Alignment:** Spacing values align with Tailwind scale (4px increments)
- [ ] **Semantic Naming:** Token names are descriptive (bg-primary vs bg-blue-500)
- [ ] **Git Committed:** Tokens locked in version control
- [ ] **Team Communication:** Designer and developers aware tokens are locked

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Partial Extraction
**Wrong:** Extract colors now, typography later, spacing as-needed
**Correct:** Extract ALL tokens in single comprehensive session

**Why:** Prevents context switching, ensures complete design system foundation.

### ❌ Mistake 2: Arbitrary Spacing Values
**Wrong:** spacing: { 'custom': '27px' }
**Correct:** spacing: { 'custom': '24px' } // Aligned to Tailwind scale

**Why:** Tailwind's 4px scale ensures visual consistency and simplifies responsive design.

### ❌ Mistake 3: Generic Token Names
**Wrong:** colors: { blue: '#3B82F6' }
**Correct:** colors: { primary: '#3B82F6' }

**Why:** Semantic names survive brand color changes (blue → green still uses "primary" class).

### ❌ Mistake 4: Unlocked Tokens
**Wrong:** Add tokens to config, start building, keep editing tokens during component work
**Correct:** Lock tokens after Phase 1, document update process, enforce via code review

**Why:** Prevents design drift and inconsistent component implementations.

---

## Integration with Other Skills

**Works with:**
- [figma-component-architecture-planning](../figma-component-architecture-planning/SKILL.md) - Uses locked tokens for Phase 2 planning
- [figma-section-build](../figma-section-build/SKILL.md) - Consumes locked tokens during component builds
- [tailwind-translation](../tailwind-translation/SKILL.md) - Maps Figma values to Tailwind classes

**Superseded by:**
- Once tokens locked, use [figma-section-build](../figma-section-build/SKILL.md) for individual components

---

## Troubleshooting

### Issue: Figma MCP Not Available
**Symptoms:** No Figma MCP server configured, free plan limitations
**Solution:** Use Step 2B (Tokens Studio) or Step 2C (Manual Inspection) workflows

### Issue: Designer Hasn't Organized Tokens
**Symptoms:** No Variables/Styles in Figma, hardcoded values everywhere
**Solution:**
1. Request designer to create Color Styles and Text Styles
2. If unavailable, use Manual Inspection (Step 2C) and document as "extracted values pending design system formalization"

### Issue: Spacing Values Don't Align to Tailwind Scale
**Symptoms:** Figma shows 27px, 33px, other non-standard values
**Solution:**
1. Round to nearest Tailwind value (27px → 24px or 32px)
2. Document rounding decisions in DESIGN_TOKENS.md
3. If critical, request designer to align Figma to 4px scale

### Issue: Missing Token Categories
**Symptoms:** No shadows defined, border radius inconsistent
**Solution:**
1. Document gaps in DESIGN_TOKENS.md
2. Use Tailwind defaults (shadow-md, rounded-lg) temporarily
3. Request designer to formalize missing categories
4. Re-extract and update config when available

---

## Success Criteria

**Phase 1 Complete When:**
1. All token categories extracted and documented
2. tailwind.config.cjs contains complete theme.extend configuration
3. Test component renders using token-based classes
4. DESIGN_TOKENS.md created and committed
5. Team briefed on token lock policy

**Phase 1 Output:**
- `sites/[client-name]/tailwind.config.cjs` (or `packages/design-tokens/output/`)
- `sites/[client-name]/DESIGN_TOKENS.md`
- Git commit: "feat(client-name): Lock design tokens from Figma (Phase 1)"

**Proceed to:** Phase 2 - [figma-component-architecture-planning](../figma-component-architecture-planning/SKILL.md)
