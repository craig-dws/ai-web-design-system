# Developer 05: Sync the token contract into the build

- **Who:** the developer.
- **Tool:** Claude Code, in the client project, with the build target connected.
- **When:** **Gate 2a**, after the handoff is accepted and before any page is built.
- **Needs:** the staging site or the repository. **Does not need Figma**, and does
  not need a Figma seat.

Tokens are the contract that makes AI output checkable. They were extracted
**once** at handoff (`04_accept_handoff.md`) and written to the canonical token
contract in this project. **This step does not re-extract.** Re-extraction is
where fidelity leaks away, a component at a time, and a second extraction can
silently disagree with the first.

```
[ROLE: Developer syncing the approved token contract into the build]

OBJECTIVE: Get the tokens from the project's canonical token contract into this
project's token layer, by a reviewed diff, and verify a page renders with them.
Build no pages.

Build target: [A: WordPress plus Breakdance, or B: Astro plus Payload]
Token contract: [PATH TO THE COMMITTED CONTRACT FILE]

DIRECTIVES:
1. Read the canonical token contract from the project. Do NOT open Figma and do NOT
   re-extract. If the contract is missing, STOP and tell me: the handoff step
   (04_accept_handoff.md) has not been completed, and that is where it comes from.
2. Confirm the contract is usable: names present on both sides, no token left with an
   unresolved value. Report anything flagged there as having no clean home on this
   target rather than inventing a mapping for it.
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
- Do not re-extract from Figma. The contract is the source for this step.
- British and Australian English. No em dashes, no en dashes, no emojis.
```

## Gate 2a

The Dev Lead verifies the token sync and spot-checks a page rendered with the new
tokens. Only then do pages get built.

**If a token is genuinely missing**, do not invent one in the build. It goes back
to the designer in Figma, and whoever holds the Figma seat re-runs the extraction
in `04_accept_handoff.md` to reissue the contract. That keeps a single extraction
as the only source, rather than growing a second one here.
