# Permissions Matrix

AI Web Design System v0.1 (Pilot). Who can do what across the systems in the pilot. Access levels: Edit, Review, None. Approve indicates who may sign off changes in that system.

## Figma

| Role | Access | Approve |
|------|--------|---------|
| Designer | Edit | Yes (design) |
| Developer | Review | No |
| Dev Lead | Review | Yes (dev-ready) |
| PM | Review | No |
| Client | Review | Yes (design sign-off) |

## Claude Code

| Role | Access | Approve |
|------|--------|---------|
| Designer | None | No |
| Developer | Edit (run approved prompts) | No |
| Dev Lead | Edit | Yes (new prompts) |
| PM | Review | No |
| Client | None | No |

## Novamira and WordPress Staging

| Role | Access | Approve |
|------|--------|---------|
| Designer | None | No |
| Developer | Edit (staging) | No |
| Dev Lead | Edit (staging) | Yes (AI Abilities) |
| PM | Review | No |
| Client | Review | No |

## Production

| Role | Access | Approve |
|------|--------|---------|
| Designer | None | No |
| Developer | None | No |
| Dev Lead | Edit (release) | Yes |
| PM | Review | Yes (go-live) |
| Client | Review | Yes (go-live) |

## Git

| Role | Access | Approve |
|------|--------|---------|
| Designer | None | No |
| Developer | Edit (branch, PR) | No |
| Dev Lead | Edit | Yes (merge) |
| PM | Review | No |
| Client | None | No |

## Standing Rules

- Only the Dev Lead may enable Novamira AI Abilities.
- **Novamira is staging only**. It is never enabled or run against production.
- Production changes require Dev Lead release plus PM and Client go-live approval.
- **Access above is the default**. Any exception is logged in 09_issue_and_exception_log.md with Dev Lead approval.

## Sign-off

- **Matrix confirmed by**: [Name], [YYYY-MM-DD]
