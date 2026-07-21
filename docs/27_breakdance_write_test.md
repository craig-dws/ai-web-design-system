# 27. The Breakdance Write Test (runnable procedure)

Status: v0.1 | Date: 18 July 2026 | Owner: Dev Lead | Type: the decisive Target A test

**This is the single test that decides whether Target A is a viable pipeline or an architectural hypothesis.** It is designed to be run in about 15 to 30 minutes on a disposable staging site, to produce a clear PASS or FAIL, and to leave an evidence pack behind so the decision is defensible rather than a vibe.

**Test the native Breakdance 3.0 MCP first. It is the preferred path.** Only if it fails do you test a third party (Novamira Pro, then Respira) as the fallback. See 24 and 26 for why.

## What this test answers

Breakdance 3.0's native MCP claims it can build a page from an agent and leave it natively editable in the visual builder. That claim is unverified by anyone outside Breakdance, and the conversion fidelity (HTML and CSS into Breakdance elements) is the whole ballgame. This test observes the claim on real software instead of trusting a marketing page.

**A PASS means:** the native path works, Target A is viable, and we need no third-party bridge. **A FAIL means:** we test the fallback, and if that also fails, Breakdance building stays manual and we reconsider Target A. A FAIL of the write path is not a failure of the whole system; the fallback is manual construction using the same brief, Figma, token, handoff and QA discipline.

## Do this on a disposable site, never a client site

Use a throwaway staging install (InstaWP, LocalWP, or a scratch subdomain). No client data. No production credentials in the environment. The native MCP uses Application Passwords with **admin-equivalent** access, so a snapshot before every write is mandatory: our backup is the real safety net, not any vendor rollback.

## Pre-flight

- [ ] Disposable staging over HTTPS, WordPress current, **Breakdance 3.0 (beta) installed and licensed**.
- [ ] A full snapshot taken (database and files) and **restore tested once** before any write. If you cannot restore, stop; you have no safety net.
- [ ] Claude Code installed and authenticated.
- [ ] One approved Figma frame to build from, or a simple agreed page spec (hero, a two-column feature section, a repeating card row, a header and footer). It does not need to be a client design.
- [ ] Record the versions now: WordPress, PHP, Breakdance, Claude Code. Put them in the evidence pack (below).
- [ ] Buy no third-party bridge. Novamira and Respira are only reached at Phase B.

## Phase A: the native Breakdance 3.0 MCP (test this first)

1. **Connect the native MCP.** In WordPress: Breakdance then Settings then Agents and MCP. Install the one-click Agent Connector. Generate the credential and paste the connection command into Claude Code so it registers the MCP server. Run `/mcp` and confirm it connects.
2. **Read-only first.** Ask the agent to inspect the site and describe existing pages through the MCP. Confirm it returns real data before any write. This proves the connection without risk.
3. **Snapshot.** Take the pre-write snapshot now and note its identifier.
4. **Build one non-trivial page.** Have Claude Code build a single page that exercises the real cases:
   - a multi-section layout (not one block),
   - a repeating content row (a Posts Loop or equivalent),
   - a header and a footer, or a template assignment,
   - one design-token value applied (a colour or type token), referenced by name, not hardcoded.
   Build one page only. Do not touch other pages or global settings beyond the one token.
5. **Capture.** Save the agent's transcript (credentials redacted), a front-end screenshot, and an export of the resulting element tree and settings.

### The three PASS or FAIL checks

The page **passes** only if all three are true. Record each as PASS or FAIL with a note.

1. **Renders correctly.** The page renders on the front end without fatal errors, missing structure, or obvious layout breakage, and it is a reasonable rendering of the intended design. Judge fidelity honestly: is this something you would refine, or something you would rebuild?
2. **Natively editable.** Open the page in the Breakdance visual builder. **Every element opens and is editable**, with no "unknown element" errors, no locked or opaque blocks. Then edit one element, save, reopen, and confirm the structure survives the round-trip. This is the check that a third party has historically failed.
3. **Recovers from a bad write.** Force a malformed or unreasonable instruction, or simulate a failed write. Confirm either that it is caught before damage, or that restoring the snapshot returns the site completely. Verify the restore actually worked.

### Also record (not pass or fail, but decisive for planning)

- **Fidelity, in one honest sentence.** High-fidelity, usable-with-refinement, or rebuild-it-anyway.
- **Requirements observed.** The PHP and WordPress versions it actually needed. Whether the MCP worked on free Breakdance or required Pro. These are unpublished; you are the source now.
- **Token handling.** Did the token apply by reference, or did it hardcode a value?

## Phase B: the fallback (only if Phase A fails)

Run this **only if the native MCP failed a PASS check.** Test Novamira Pro first (it makes the explicit native-editability claim and is cheaper), then Respira if needed. Buy the licence only at this point, not before. Repeat the same page build and the same three checks. Never run two write tools against the same site; use a fresh snapshot or a fresh disposable site per tool.

If both native and fallback fail: **Breakdance building stays manual.** Record the decision and move on. The rest of the system (brief, Figma, tokens, handoff, QA) is unaffected.

## The evidence pack

Save all of this into one folder in the pilot project (not this repository). It is what makes the decision defensible and repeatable.

- Test identifier and date; named tester.
- Versions: WordPress, PHP, Breakdance, Claude Code, and the tool tested (native, Novamira, or Respira).
- Disposable staging identifier (no secrets).
- Pre-write snapshot identifier, and confirmation that restore was tested.
- The page spec or Figma frame reference used.
- The agent transcript, credentials redacted.
- Before and after screenshots.
- The post-write element tree and settings export.
- The three PASS or FAIL results, each with a note.
- The fidelity sentence, the requirements observed, and the token-handling result.
- The final decision: native PASS, fallback PASS, or manual, with the named approver.

## The decision this produces

| Outcome | What it means | Next |
|---------|---------------|------|
| Native MCP PASS | Target A is viable, no third-party bridge needed | Record the observed requirements. Proceed to build the pilot's homepage on the native path. Do not buy Novamira |
| Native FAIL, fallback PASS | Viable, but via a third party | Buy that tool now. Re-apply the guardrails in CLAUDE.md and 24. Proceed |
| Both FAIL | Automated Breakdance layout writing is not adopted | Build Breakdance manually. The system's front-half still applies. Reconsider Target A at leisure |

**Do not build client pages on Target A until this test has produced a PASS.** Update 26 (the capability matrix) with what you observed, whatever the outcome, because you now hold facts the vendor has not published.
