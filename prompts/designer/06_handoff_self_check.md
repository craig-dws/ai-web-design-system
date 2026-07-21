# Designer 06: Pre-handoff self-check

- **Who:** the designer.
- **Tool:** Claude Cowork with the Figma plugin.
- **How often:** before every handoff to the developer, at **Gate 1d**.

An incomplete handoff is rejected, not patched informally. Run this before you
mark anything Ready for Dev, so the rejection does not happen.

```
I am about to hand a Figma file to our developer. Before I do, audit it against our
handoff contract and tell me honestly what fails. Do not be reassuring; a miss here costs
the developer a day.

I have given you our documents folder. Use:
- 06_handover_contract.md (the contract the file must satisfy)
- 01_designer_workflow.md (the handoff checklist at the end)
- 04_figma_naming_standard.md (naming)

Check the file and report, item by item, PASS or FAIL with the specific frame or layer:

1. TOKENS. Any hardcoded hex, any off-scale spacing, any typography not bound to a
   variable. List every instance with its location. This is the most common failure.
2. NAMING. Any token, component, or variant that breaks our standard.
3. COMPONENTS. Loose one-off elements that should be components. Components missing
   variants or states.
4. STATES. Every interactive element with default, hover, focus, active and disabled.
   Focus states are mandatory and must be visible. Form states: empty, filled, focused,
   error, success.
5. RESPONSIVE. Desktop, tablet and mobile present for key templates. Exact breakpoint
   values recorded. Per-section notes on what changes: columns, order, scale, hidden
   elements.
6. ACCESSIBILITY. Contrast recorded for every text-on-background pair against WCAG 2.2 AA.
   Accessible names for icons, buttons and fields. Reduced-motion behaviour noted.
7. STRUCTURE. Any layout that cannot be expressed as flex or grid. Flag it; it will not
   build cleanly on either target.
8. LABELS. Every frame carries a status label, and Ready for Dev only where it passes.
9. CONTENT ASSUMPTIONS. Any layout that breaks when text length changes, and whether the
   content-length assumption is stated.

Finish with:
- A blunt list of what I must fix before handoff.
- What is acceptable to hand over with a note.
- Whether, in your view, this file would be accepted or rejected.

Rules: our standard wins over your general knowledge. British and Australian English. No
em dashes, no en dashes, no emojis.
```

## After it passes

1. Fix everything on the must-fix list. Re-run the check.
2. Mark passing frames **Ready for Dev**.
3. Sign the handover contract and pass it to the Dev Lead, who accepts or rejects
   it. That is **Gate 1d**.
4. During the build, answer developer questions promptly. **Every design change
   goes back into Figma**, never only onto the built site, or the design and the
   build drift apart.
