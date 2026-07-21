# House style

Source: CLAUDE.md, the project constitution.

## Language and typography in copy

- British and Australian English.
- No em dashes, no en dashes, no double hyphens in prose.
- No emojis, unless the brand explicitly calls for them.
- This applies to the design's own copy and to the audit output you produce.

## Copy is design material

Write real words, not lorem ipsum, where content exists. Design against realistic content lengths, and note the content-length assumption so the build does not break with a long heading.

## Token-first, non-negotiable

- Every colour, type, and spacing decision references a token name, so a reviewer and an agent can check it. Without a token name there is no definition of "right".
- No hardcoded colour, type, or spacing value where a token exists. A hardcoded value is a defect.

## Quality floor

- Responsive at the project's defined breakpoints.
- Visible keyboard focus on every interactive element.
- Reduced-motion respected. Ambient animation reads as AI-generated.
- WCAG 2.2 AA. Automated scans assist; a human certifies accessibility.
