# Design to Development Handover Contract

AI Web Design System v0.1 (Pilot). This is the formal contract between designer and developer. The designer signs to confirm the file is dev-ready. The developer signs to accept it. No build starts until both signatures are in place.

Project: [Codename]  |  Figma file: [link]  |  Date raised: [YYYY-MM-DD]

## Part A. Dev-Ready File Contents (designer confirms)

The developer-ready Figma file must contain all of the following.

- [ ] Frames for desktop, tablet, and mobile
- [ ] Status labels applied to every screen (Dev Ready)
- [ ] Components and variants used throughout (no loose one-off elements)
- [ ] Variables and tokens applied (no hardcoded hex, no manual spacing)
- [ ] Spacing scale and breakpoint values documented
- [ ] Responsive behaviour notes for each key section
- [ ] Interaction states defined (hover, active, focus, disabled)
- [ ] Form states defined (empty, filled, error, success, disabled)
- [ ] Content-length assumptions stated (short and long variants where relevant)
- [ ] Image behaviour defined (crop, fit, aspect ratio, placeholder)
- [ ] Accessibility notes (contrast, focus order, alt text intent, labels)
- [ ] Reusable vs page-specific elements identified
- [ ] Animation and motion notes (what moves, trigger, duration intent)
- [ ] Exported assets provided (icons, images, logos, formats)
- [ ] Open questions listed (see Part D)
- [ ] Client approval status recorded (see Part D)

## Part B. Designer Sign-off

I confirm the Figma file meets every item in Part A and is ready for development.

- **Designer**: [Name]
- **Signature or initials**: [ ]
- **Date**: [YYYY-MM-DD]

## Part C. Developer Acceptance

The developer reviews Part A before accepting. Acceptance criteria:

- [ ] All Part A items present and verified
- [ ] Tokens and components resolve correctly in the file
- [ ] No blocking gaps or ambiguities remain
- [ ] Open questions in Part D are answered or scheduled

I accept this handover and will build to the file as delivered.

- **Developer**: [Name]
- **Signature or initials**: [ ]
- **Date**: [YYYY-MM-DD]

If the developer cannot accept, record the reason and return to the designer:

- **Reason for rejection**: [Detail]
- **Returned on**: [YYYY-MM-DD]

## Part D. Open Questions and Approval Status

| Item | Detail | Status | Owner |
|------|--------|--------|-------|
| [Question 1] | [Detail] | [Open / answered] | [Name] |
| Client approval | [Which screens approved] | [Approved / pending] | [Name] |

## Part E. Change Management Clause

Once both signatures are in place, the file is locked for this iteration. Any change requested after handover (client, designer, or developer) is a new iteration. It must be documented, re-signed by the designer, and re-accepted by the developer before it is built. Post-handover changes are never made informally.

- **Iteration number**: [1]
