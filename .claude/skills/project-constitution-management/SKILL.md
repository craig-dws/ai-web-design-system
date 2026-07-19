---
name: project-constitution-management
description: Optimises and maintains the CLAUDE.md project constitution. Use when updating project documentation, adding new workflows, documenting architectural decisions, or keeping the constitution concise and well organised. Prevents bloat and keeps the constitution within its token budget by moving detail into referenced docs.
---

# Project Constitution Management

## Purpose

This skill helps maintain the CLAUDE.md project constitution in an optimised state by:
- Keeping content concise and focused on essential constraints and instructions
- Moving detailed content into referenced documentation files
- Ensuring clear structure and navigation
- Preventing file bloat and token budget issues
- Maintaining consistency with Claude Code best practices

The constitution holds constraints. The detail lives in docs. If the constitution and docs disagree, raise it rather than guessing.

## When to use this skill

Invoke this skill when:
- Adding a new workflow to CLAUDE.md
- Documenting a new architectural pattern or constraint
- The CLAUDE.md file is approaching its token budget
- Content could be better organised in separate docs
- Multiple similar sections could be consolidated
- Documentation references need updating

## Core principles

### 1. Constitution versus documentation

**CLAUDE.md should contain:**
- Strategic vision and goals
- High-level architectural constraints
- Critical prohibitions and requirements
- Quick-reference summaries
- Links to detailed documentation

**Detailed docs should contain:**
- Step-by-step guides and runbooks
- Comprehensive references
- Detailed examples
- Workflow walkthroughs
- Technical specifications

### 2. Token efficiency

- Keep CLAUDE.md within its stated budget. The current constitution targets roughly 10,000 tokens. Anything longer belongs in docs with a link from the constitution.
- Use the summary plus reference pattern: a brief overview, then a link to the detailed doc.
- Avoid duplicating content between CLAUDE.md and docs.
- Prefer concise lists over verbose paragraphs.

### 3. Structure optimisation

- Maintain a clear heading hierarchy
- Group related content together
- Use consistent formatting
- Provide a clear index and links
- Keep any reference sections concise, with links to detailed guides

## Standard workflow

### Adding new content to CLAUDE.md

1. **Assess the content type.** A high-level constraint or principle belongs in CLAUDE.md. Detailed how-to information belongs in a docs file.

2. **Choose a placement strategy.**

   Option A, add a brief summary:
   ```markdown
   ### New workflow pattern
   Brief two or three sentence overview.

   Complete guide: see docs/<topic>.md
   ```

   Option B, add to an existing section: find the most relevant section, add a concise bullet or line, link to the detailed doc.

   Option C, create a new section: only if the content is a major new category. Keep it concise and follow the existing section patterns.

3. **Create or update the documentation file** with an overview, step-by-step instructions, examples, troubleshooting and related links.

4. **Update the documentation index.** Add an entry to the docs index, categorise it appropriately, and add a reference in CLAUDE.md if relevant.

### Consolidating existing content

When CLAUDE.md grows too large:

1. **Identify extraction candidates:** sections with detailed steps, long examples, comprehensive references, or verbose explanations that could be summarised.

2. **Create focused documentation files.** Extract the content, make it self-contained, and give it a clear title and navigation.

3. **Replace with a summary plus link:**
   ```markdown
   ### [Original topic]
   Two or three sentence summary of what this is and when to use it.

   Complete reference: see docs/<topic>.md for detailed explanations,
   examples and troubleshooting.
   ```

4. **Verify links and cross-references.** Confirm all links resolve and no paths are broken.

## Common patterns

### Pattern 1: workflow documentation

CLAUDE.md entry:
```markdown
### Handoff between design and build
Brief summary of how authority transfers at the gate.

Full workflow guide: see docs/<lifecycle>.md
```

Then create the detailed docs file with the complete workflow.

### Pattern 2: command or runbook reference

CLAUDE.md entry:
```markdown
### Build runbooks
Each build target has its own runbook. Summarise the shared front-half
here and link out.

Complete reference: see docs/<target-runbook>.md
```

### Pattern 3: architectural constraint

CLAUDE.md entry:
```markdown
### Prohibitions
1. No AI output ships unreviewed.
2. No secrets in committed files.
3. No hardcoded values where a token exists.

Detailed rationale: see docs/<standards>.md
```

## Quality checklist

Before completing a CLAUDE.md update:

- [ ] New content is concise, or properly extracted to docs
- [ ] Detailed examples moved to docs files
- [ ] Clear links to documentation provided
- [ ] Documentation index updated
- [ ] No duplicate content between CLAUDE.md and docs
- [ ] Headings follow a consistent hierarchy
- [ ] Reference entries include doc links where relevant
- [ ] File remains within its token budget

## Anti-patterns to avoid

Do not add long code or script examples to CLAUDE.md. Instead show a minimal example and link to the doc with the full version.

Do not write verbose paragraph explanations. Use concise bullet points and link to the detailed guide.

Do not duplicate content across multiple sections. Create a single source of truth in docs and reference it from CLAUDE.md.

Do not create a doc without updating the index. Always update the documentation index.

## Example: adding a new workflow to the constitution

**Task:** document a newly agreed workflow step.

**Weak approach:** paste the entire procedure, every rule and every edge case, into CLAUDE.md, adding a large block of tokens.

**Strong approach:** add a short summary to CLAUDE.md and move the detail to a doc.

```markdown
# In CLAUDE.md, a short entry
### New workflow step
One or two lines describing what the step is and when it applies.

Configuration and full procedure: see docs/<workflow>.md

# In docs/<workflow>.md, the detailed guide
Complete explanation, all cases and options, and troubleshooting.
```

Keep machine-specific paths, secrets and environment details out of the constitution entirely. Reference environment variables and relative doc paths rather than absolute machine paths.

## Version history

- v1.1: Retargeted to a target-neutral web design system. Frontmatter reduced to name and description. Stale worked examples replaced with neutral ones. Token budget aligned to the project constitution.
- v1.0: Initial skill creation for CLAUDE.md optimisation.
