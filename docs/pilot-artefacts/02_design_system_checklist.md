# Design System Foundation Checklist

AI Web Design System v0.1 (Pilot). Confirm a project's design-system foundation is ready before design production begins. One per project.

Project: [Codename]  |  Reviewer: [Name]  |  Date: [YYYY-MM-DD]

## Variables and Tokens

- [ ] Local Variables collection exists in the Figma file
- [ ] Colour tokens defined with semantic names (not raw colour names)
- [ ] Type scale defined in rem, based on a 16px root
- [ ] Spacing scale defined on a 4pt or 8pt grid
- [ ] Breakpoint values recorded as variables or documented

## Components

- [ ] Master components exist for shared elements
- [ ] Master components use Auto Layout
- [ ] Component variants defined where states differ (hover, active, disabled)
- [ ] No detached instances in the working file

## Standards Compliance

- [ ] No hardcoded hex values in styles or fills (tokens only)
- [ ] No absolute pixel spacing (spacing scale only)
- [ ] Naming conventions followed (see 03_figma_component_and_naming_standard.md)
- [ ] Page and frame naming follows the standard

## Accessibility

- [ ] Colour contrast checked for text and interactive elements (WCAG 2.2 AA)
- [ ] Focus and interactive states defined in the design

## Handover Rules File

- [ ] DESIGN.md rules file generated for this project
- [ ] DESIGN.md references the token source of truth
- [ ] DESIGN.md location recorded: [path]

## Sign-off

- **Foundation confirmed ready**: [ ] Yes  [ ] No
- **Reviewer**: [Name], [YYYY-MM-DD]
- **Notes or gaps**: [List any items to resolve before production]
