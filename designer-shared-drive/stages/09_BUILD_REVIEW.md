# Stage 9: Review the Built Website

## Start when

A built page is available on the approved review website.

## Designer task

Compare the built page against approved Figma at desktop, tablet and mobile widths. The Designer reports differences but does not change the website during this review.

## Cowork prompt

```text
Help me review one built page against its approved Figma design.

Page: [PAGE NAME]
Review URL: [REVIEW URL]
Approved Figma frame: [FIGMA FRAME]

Inspect the live page and the approved Figma frame at desktop, tablet and mobile widths.
If you cannot access either source, say so before reviewing.

List each difference with:
1. Viewport
2. Figma frame and built-page location
3. Expected result
4. Observed result
5. Classification:
   - build defect
   - design change request
   - content issue
   - acceptable documented difference
6. Severity: blocking, major or minor
7. Recommended owner

Check layout, spacing, typography, colour, imagery, component states, responsive
behaviour, focus visibility, forms and motion.

Do not change Figma or the built page. Do not assume that a visual difference is a
defect if an approved exception exists. Finish with PASS or FAIL and the blocking list.
```

## Change rules

- A design change is first updated and approved in Figma.
- A build defect is returned to the Developer.
- A content issue is returned to the Project Manager and the approved content source.
- An accepted difference is recorded in the project decision log.

Rerun the review after fixes. The page passes when blocking and major differences are resolved or formally accepted.
