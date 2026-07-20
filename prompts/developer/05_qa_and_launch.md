# Developer 05: QA, UAT and launch

- **Who:** the developer, with QA Lead, client and PM approving.
- **Tool:** Claude Code, in the client project.
- **When:** **Gates 3a, 3b and 3c**, after all pages are built and reviewed.

```
[ROLE: Developer running the pre-launch QA pass]

OBJECTIVE: Run the full QA pass against the staging site and report findings. Fix nothing
without telling me first.

Staging URL: use the project's ${STAGING_URL} environment reference. Never production.

DIRECTIVES: run these and consolidate the findings, worst first.
1. accessibility-auditor: WCAG 2.2 AA against the rendered pages. Automated scans assist;
   they do not certify. Say plainly that a human must certify accessibility.
2. seo-optimizer: titles, metas, headings, schema, alt text, crawler readiness.
3. performance-tuner: Core Web Vitals, render-blocking, images, fonts.
4. ai-readiness-auditor: robots, sitemap, structured data, whether content is readable to
   AI crawlers. Distinguish a deliberate staging crawl guard from a real fault.
5. Target A only, security-auditor and wp-security-auditor: dangerous PHP, exposed
   secrets, Application Passwords over plain HTTP, world-writable paths.
6. Design fidelity: screenshot each page and diff it against its Figma frame at desktop,
   tablet and mobile. List discrepancies as true defects or accepted platform differences.
7. Token adherence: find any hardcoded colour, type or spacing value that should be a
   token reference. Each one is a defect.
8. persona-reviewer: read the site as the approver and as the website user, and report
   whether each would be satisfied.

Use the chrome-devtools MCP headless for anything requiring a rendered page.

Report: a consolidated list, worst first, each with the page, the issue, the risk, and a
recommended fix. Separate BLOCKING from SHOULD FIX from NICE TO HAVE. Do not fix anything
yet.

CONSTRAINTS: read-only on the site. Staging only, never production. British and
Australian English. No em dashes, no en dashes, no emojis.
```

## UAT, and where the feedback goes

The client reviews the **staging site**, not Figma. Triage every item on arrival,
because this is where a systemised build most often degrades back into a
hand-maintained page:

| Feedback type | Where it goes |
|---|---|
| **Copy or content** | Into the content source, then pulled into staging. **Not typed onto the staging site**, or the next pull silently discards the client's accepted change |
| **Design change** | Back to Figma, re-approved, re-synced. If it is late and large, it is a change request, not a fix |
| **Bug** | Fixed on site. It is a build defect, not a design or content decision |

Record the reviewed content revision at the UAT gate.

## Launch

Backed up, rollback documented, **promoted by a human**. No agent touches
production, ever. Then hand over: Client Mode training on Target A, or the Payload
admin on Target B.

**Authority transfers at launch.** Before launch the content source is canonical;
after launch the live site is. New post-launch content restarts the editorial
cycle.

Gates: **3a** QA Lead, **3b** client UAT sign-off, **3c** PM approves launch.
