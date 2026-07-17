# QA and Accessibility Checklist

AI Web Design System v0.1 (Pilot). Pre-launch quality assurance. Complete every section before go-live. One per project.

Project: [Codename]  |  Tester: [Name]  |  Date: [YYYY-MM-DD]  |  Environment: [staging URL]

## Visual Match to Figma

- [ ] Desktop matches Figma
- [ ] Tablet matches Figma
- [ ] Mobile matches Figma
- [ ] Spacing, type, and colour match the tokens
- [ ] Components render as designed (states included)

## Responsive Behaviour

- [ ] Layout holds at all defined breakpoints
- [ ] No horizontal scroll or overflow
- [ ] Images and media scale correctly
- [ ] Long and short content both handled gracefully

## Cross-Browser

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] Mobile Safari and Chrome on device

## Forms and Integrations

- [ ] Every form submits successfully
- [ ] Validation and error states work
- [ ] Confirmation or thank-you state shows
- [ ] Data reaches the destination (CRM, email, spreadsheet)
- [ ] Third-party integrations tested end to end

## Performance

- [ ] Lighthouse run recorded (mobile and desktop)
- [ ] Core Web Vitals within target (LCP, INP, CLS)
- [ ] Images optimised and correctly sized
- [ ] No render-blocking or oversized assets flagged

## SEO Basics

- [ ] Unique page titles and meta descriptions
- [ ] One H1 per page, logical heading order
- [ ] Canonical tags correct
- [ ] robots and sitemap correct for launch
- [ ] Open Graph and social preview set

## Accessibility (WCAG 2.2 AA)

- [ ] Colour contrast meets AA for text and UI
- [ ] Focus is visible on all interactive elements
- [ ] Full keyboard navigation works, logical order
- [ ] Alt text on meaningful images, empty alt on decorative
- [ ] Form fields have associated labels
- [ ] Heading order is correct and not skipped
- [ ] Reduced motion respected (prefers-reduced-motion)
- [ ] Link text is descriptive, not "click here"

## Result

- **QA passed**: [ ] Yes  [ ] No
- **Issues raised in 09_issue_and_exception_log.md**: [IDs]
- **Tester**: [Name], [YYYY-MM-DD]
