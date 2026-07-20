# Developer 02: Accept or reject the handoff

- **Who:** the Dev Lead.
- **Tool:** Claude Code, in the client project.
- **When:** **Gate 1d**, before any build work starts.

An incomplete handoff is **rejected, not patched informally**. Patching it
yourself hides the gap and guarantees the design and the build drift apart.

```
[ROLE: Dev Lead accepting a design handoff]

OBJECTIVE: Decide whether this Figma file is genuinely dev-ready. Do not start building.
Do not fix gaps yourself.

READ FIRST: docs/pilot-artefacts/04_design_to_development_handover_contract.md, and
docs/22_design_system_reuse_model.md for the token model.

Figma file: [LINK]. Build target: [A or B].

DIRECTIVES:
1. Read the file's structure with the Figma read tools. Scope every get_design_context
   call to a single frame; it can exceed token limits on a whole page.
2. Check the handover contract item by item and report PASS or FAIL with the specific
   frame for each failure:
   - Frames for desktop, tablet and mobile
   - Status labels applied, Ready for Dev only where earned
   - Components and variants used, no loose one-off elements
   - Variables and tokens applied, NO hardcoded hex, no manual spacing
   - Spacing scale and breakpoint values documented
   - Responsive behaviour notes per key section
   - Interaction states: hover, active, focus, disabled
   - Form states: empty, filled, error, success, disabled
3. Run the figma-token-extractor subagent to produce the token export and mapping. Report
   any token that resolves to a hardcoded value with no semantic home, and any token with
   no clean home on this build target. Do NOT invent a mapping.
4. Flag any layout that cannot be expressed as flex or grid. It will not build cleanly.
5. Give me a clear verdict: ACCEPT, or REJECT with the specific list the designer must fix.
   If it is borderline, say so and name the risk rather than waving it through.

CONSTRAINTS:
- Read-only on Figma. Change nothing, build nothing.
- Do not fix design gaps yourself; they go back to the designer in Figma.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## After acceptance

Record the acceptance, then move to tokens (`03_tokens.md`). Nothing is built
before the token layer is in place and verified, because tokens are the contract
that makes the build checkable.
