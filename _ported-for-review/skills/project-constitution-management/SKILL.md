---
name: project-constitution-management
description: Optimizes and maintains CLAUDE.md project constitution files. Use when updating project documentation, adding new workflows, documenting architectural decisions, or keeping constitution files concise and well-organized. Prevents bloat and ensures constitution remains under token limits.
allowed-tools: [Read, Edit, Grep, Glob, TodoWrite]
---

# Project Constitution Management

## Purpose

This skill helps maintain the CLAUDE.md project constitution file in an optimized state by:
- Keeping content concise and focused on essential instructions
- Moving detailed content to referenced documentation files
- Ensuring clear structure and navigation
- Preventing file bloat and token budget issues
- Maintaining consistency with Claude Code best practices

## When to Use This Skill

Invoke this skill when:
- Adding new workflow documentation to CLAUDE.md
- Documenting new architectural patterns or constraints
- The CLAUDE.md file is approaching 10,000+ tokens
- Content could be better organized in separate docs
- Multiple similar sections could be consolidated
- Documentation references need updating

## Core Principles

### 1. Constitution vs Documentation
**CLAUDE.md should contain:**
- Strategic vision and goals
- High-level architectural constraints
- Critical prohibitions and requirements
- Quick-reference command summaries
- Links to detailed documentation

**Detailed docs (docs/*.md) should contain:**
- Step-by-step guides and tutorials
- Comprehensive command references
- Detailed code examples
- Workflow walkthroughs
- Technical specifications

### 2. Token Efficiency
- Keep CLAUDE.md under 15,000 tokens (target: 10,000)
- Use summary + reference pattern: "Brief overview. See [docs/DETAIL.md](./docs/DETAIL.md)"
- Avoid duplicating content between CLAUDE.md and docs
- Use concise lists instead of verbose paragraphs where possible

### 3. Structure Optimization
- Maintain clear hierarchical headings (H1 → H2 → H3)
- Group related content together
- Use consistent formatting patterns
- Include comprehensive Table of Contents with deep links
- Keep FAQ sections concise with links to detailed guides

## Standard Workflow

### Adding New Content to CLAUDE.md

1. **Assess Content Type**
   - Is this a high-level constraint/principle? → Add to CLAUDE.md
   - Is this detailed how-to information? → Create/update docs file

2. **Choose Placement Strategy**

   **Option A: Add Brief Summary**
   ```markdown
   ### New Workflow Pattern
   Brief 2-3 sentence overview of the pattern.

   **Complete guide:** See [docs/NEW_WORKFLOW.md](./docs/NEW_WORKFLOW.md)
   ```

   **Option B: Add to Existing Section**
   - Find most relevant existing section
   - Add concise bullet point or paragraph
   - Link to detailed documentation

   **Option C: Create New Section**
   - Only if content represents major new category
   - Keep section concise (< 500 tokens)
   - Follow existing section structure patterns

3. **Create/Update Documentation File**
   ```markdown
   # [Topic] - Detailed Guide

   ## Overview
   Brief context and when to use this

   ## Step-by-Step Instructions
   Detailed walkthrough

   ## Examples
   Code examples and use cases

   ## Troubleshooting
   Common issues and solutions

   ## Related Documentation
   Links to other relevant docs
   ```

4. **Update Documentation Index**
   - Add entry to docs/README_DOCUMENTATION_INDEX.md
   - Categorize appropriately (Essential Guides, Workflows, etc.)
   - Add reference in CLAUDE.md if relevant

### Consolidating Existing Content

When CLAUDE.md grows too large:

1. **Identify Candidates for Extraction**
   - Sections with detailed step-by-step instructions
   - Long code examples (>20 lines)
   - Comprehensive command references
   - Verbose explanations that could be summarized

2. **Create Focused Documentation Files**
   - Extract content to appropriate docs/*.md file
   - Ensure extracted content is self-contained
   - Add clear title and navigation

3. **Replace with Summary + Link**
   ```markdown
   ### [Original Topic]
   [2-3 sentence summary of what this is and when to use it]

   **Complete reference:** See [docs/TOPIC.md](./docs/TOPIC.md) for:
   - Detailed explanations
   - Code examples
   - Troubleshooting guide
   ```

4. **Verify Links and References**
   - Test all documentation links work
   - Update any cross-references
   - Ensure no broken paths

## Common Patterns

### Pattern 1: Workflow Documentation
**CLAUDE.md entry:**
```markdown
### Auto-Routing System
**Design-to-code builds** → `@figma-build-orchestrator`
**General website builds** → `@glenn` → `@brief-creator` → `@plan-synthesizer`

**Full workflow guide:** See [docs/AUTO_ROUTING_GUIDE.md](./docs/AUTO_ROUTING_GUIDE.md)
```

**Separate docs file:** Create docs/AUTO_ROUTING_GUIDE.md with complete details

### Pattern 2: Command Reference
**CLAUDE.md entry:**
```markdown
### Key Commands
- `pnpm dev --filter=site-name` - Start dev server
- `nx build site-name` - Build specific site

**Complete reference:** See [docs/COMMANDS_REFERENCE.md](./docs/COMMANDS_REFERENCE.md)
```

### Pattern 3: Architectural Constraint
**CLAUDE.md entry:**
```markdown
### Prohibitions
1. NO WordPress/PHP or database content (Git only)
2. NO production deployment without quality gates
3. NO blocking AI crawlers without client approval

**Detailed rationales:** See [docs/STANDARDS.md](./docs/STANDARDS.md)
```

## Quality Checklist

Before completing CLAUDE.md updates:

- [ ] New content < 500 tokens OR properly extracted to docs
- [ ] All detailed examples moved to docs files
- [ ] Clear links to documentation provided
- [ ] Documentation index updated
- [ ] No duplicate content between CLAUDE.md and docs
- [ ] Headings follow consistent hierarchy
- [ ] FAQ entries include doc links where relevant
- [ ] File remains under 15,000 tokens

## Anti-Patterns to Avoid

❌ **DON'T:** Add 50+ line code examples to CLAUDE.md
✅ **DO:** Show minimal example, link to docs with full code

❌ **DON'T:** Write verbose paragraph explanations
✅ **DO:** Use concise bullet points, link to detailed guide

❌ **DON'T:** Duplicate content in multiple sections
✅ **DO:** Create single source of truth in docs, reference from CLAUDE.md

❌ **DON'T:** Create docs without updating index
✅ **DO:** Always update docs/README_DOCUMENTATION_INDEX.md

## Example: Adding Auto-Routing Documentation

**Task:** Document the new build-request-auto-route hook

**Bad approach:**
```markdown
# In CLAUDE.md - 2000+ tokens
### Auto-Routing Hook
[Paste entire PowerShell script]
[Explain every pattern in detail]
[List all test cases]
[Include troubleshooting]
```

**Good approach:**
```markdown
# In CLAUDE.md - ~200 tokens
### Auto-Routing System
Build requests automatically route to appropriate workflows:
- **Design-to-code** (Figma URLs, PDFs, images) → `@figma-build-orchestrator`
- **General websites** (greenfield projects) → `@glenn` → `@brief-creator`

**Hook location:** `C:\Users\cscot\.claude\hooks\build-request-auto-route.ps1`
**Configuration:** See [docs/AUTO_ROUTING_SETUP.md](./docs/AUTO_ROUTING_SETUP.md)

# In docs/AUTO_ROUTING_SETUP.md - Detailed guide
[Complete hook explanation]
[All patterns and test cases]
[Configuration options]
[Troubleshooting guide]
```

## Version History

- **v1.0 (2025-12):** Initial skill creation for CLAUDE.md optimization
