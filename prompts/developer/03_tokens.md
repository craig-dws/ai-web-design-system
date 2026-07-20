# Developer 03: Extract and sync the tokens

- **Who:** the developer.
- **Tool:** Claude Code, in the client project.
- **When:** **Gate 2a**, after the handoff is accepted and before any page is built.

Tokens are the contract that makes AI output checkable. Extract **once**, lock
them, and never re-extract per component. Re-extraction is where fidelity leaks
away, a component at a time.

```
[ROLE: Developer syncing the approved design tokens into the build]

OBJECTIVE: Get the approved Figma tokens into this project's token layer, by a reviewed
diff, and verify a page renders with them. Build no pages.

Build target: [A: WordPress plus Breakdance, or B: Astro plus Payload]
Figma file: [LINK]

DIRECTIVES:
1. Run the figma-token-extractor subagent. Scope reads to the collection; do not pull
   whole files. Produce the mapping table: Figma token name, resolved value, the target
   token home, and the CSS custom property name. Names must be IDENTICAL on both sides.
2. Flag every token with no clean home on this target rather than inventing a mapping.
   On Target A expect the component tier to have no clean home; that is known and fine,
   report it rather than forcing it.
3. Apply the sync for the target:
   - Target A: use the token-sync skill. Export current settings first, then a DIFFERENTIAL
     MERGE that preserves every existing key, all custom CSS, and all clamp() functions.
     Show me the diff. Do not blind-import. The import step is human-gated by permission
     policy, so prepare the merged file and hand it to me to apply.
   - Target B: use the token-to-code skill. Write the values into the Tailwind config and
     the CSS custom properties, changing values only, never renaming a token. Show me the
     diff for review before committing.
4. STOP for my approval of the diff.
5. After approval, verify: on Target A clear the builder cache and confirm status; on
   Target B run the project check. Then spot-check one rendered page and confirm it picks
   up the new token values.

CONSTRAINTS:
- Staging only. Never production.
- Snapshot before any write that can affect a database or a live file.
- Never a blind import. Never total_reset.
- Reference token names, never raw values. A hardcoded value is a defect.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## Gate 2a

The Dev Lead verifies the token sync and spot-checks a page rendered with the new
tokens. Only then do pages get built. If a token is missing, stop and get it added
in Figma rather than inventing one in the build.
