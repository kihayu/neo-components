# WCAG 2.1 AA Assessment Framework

This repository integrates a practical, actionable framework to plan, execute, and govern an accessibility assessment targeting WCAG 2.1 Level AA conformance.

## Scope and conformance target

- Standard: WCAG 2.1
- Conformance level: Level AA (includes all Level A criteria)
- In-scope artifacts: UI components, pages, patterns, documentation, and interactive behaviors
- Out-of-scope (initially): Non-product marketing assets; adjust as needed

## Roles and responsibilities

- Accessibility Lead: Owns approach, signs off on methodology and sampling
- Engineering: Implements fixes, adds tests, maintains semantics and ARIA
- Design/UX: Ensures perceivable, operable patterns and visual contrast
- QA: Executes checklists and assistive tech verification
- PM: Prioritizes issues and remediation milestones

## Workflow overview

1. Discovery and inventory
   - Catalog UI components and variants
   - Identify page templates and flows
2. Baseline checks (A and AA)
   - Automated linting and static checks
   - Manual keyboard navigation, focus, semantics
3. Assistive technology verification
   - Screen reader smoke tests (NVDA/JAWS/VoiceOver)
   - Zoom/Reflow, high contrast, reduced motion
4. Defect triage and tracking
   - Map to WCAG SC, severity, and component/page
   - Create tickets with repro, expected behavior, code owner
5. Remediation
   - Fixes, PR templates, design updates, test coverage
6. Regression and governance
   - CI checks, visual and a11y regression, change management

## Artifacts and directories

- Central framework: accessibility/WCAG_Assessment_Framework.md
- Checklists: accessibility/checklists/
- Audit templates: accessibility/audit-templates/
- Component mapping: accessibility/mappings/Components_to_WCAG.md
- References: accessibility/references/
- Inventory: accessibility/inventory/

See also: accessibility/inventory/Component_Inventory.md and Component_Categories.csv if present.

## Checklists (what to verify)

For each component or page, verify at minimum:

- Keyboard operability (2.1.1), no keyboard trap (2.1.2)
- Focus visibility and order (2.4.3, 2.4.7)
- Semantics and Name/Role/Value (1.3.1, 4.1.2)
- Color contrast and non-text contrast (1.4.3, 1.4.11)
- Reflow and text spacing (1.4.10, 1.4.12)
- Content on hover or focus (1.4.13)
- Forms: labels, errors, help, suggestions (3.3.1–3.3.3)
- Status messages (4.1.3)

You can store reusable CSV/MD checklists in accessibility/checklists/.

## Component-to-WCAG mapping

Maintain a living mapping of components to relevant success criteria in accessibility/mappings/Components_to_WCAG.md. This helps triage and assign ownership.

## Templates

Use accessibility/audit-templates/ to keep:

- Issue template: WCAG reference, repro steps, expected vs actual, screenshots/code
- Report template: Executive summary, findings by SC, remediation plan, risk
- Assistive technology test scripts: VoiceOver, NVDA, JAWS, TalkBack

## References (authoritative)

- WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1
- Understanding WCAG 2.1: https://www.w3.org/WAI/WCAG21/Understanding/
- ARIA Authoring Practices: https://www.w3.org/WAI/ARIA/apg/
- WAI Tutorials: https://www.w3.org/WAI/tutorials/

## Governance and versioning

- This framework targets WCAG 2.1 AA. Track upcoming WCAG 2.2/2.3 changes in accessibility/references/.
- Version this file when process changes. Link change logs from PRs.
- Add CI jobs for linting and basic a11y checks as they are introduced.

## Repository integration

- Inventory files are stored in accessibility/inventory/.
- Link to this framework from README.md.
- Encourage component owners to add a11y notes in component docs and stories.

## Appendix: WCAG 2.1 AA highlights (non-exhaustive)

Perceivable:

- 1.1.1 Non-text Content (A)
- 1.2.x Time-based Media (A/AA; 1.2.4, 1.2.5 are AA)
- 1.3.1 Info and Relationships (A)
- 1.3.4 Orientation (AA)
- 1.3.5 Identify Input Purpose (AA)
- 1.4.3 Contrast (Minimum) (AA)
- 1.4.4 Resize Text (AA)
- 1.4.5 Images of Text (AA)
- 1.4.10 Reflow (AA)
- 1.4.11 Non-text Contrast (AA)
- 1.4.12 Text Spacing (AA)
- 1.4.13 Content on Hover or Focus (AA)

Operable:

- 2.1.1 Keyboard (A), 2.1.2 No Keyboard Trap (A)
- 2.4.3 Focus Order (A), 2.4.5 Multiple Ways (AA)
- 2.4.6 Headings and Labels (AA)
- 2.4.7 Focus Visible (AA)
- 2.5.3 Label in Name (AA)

Understandable:

- 3.1.2 Language of Parts (AA)
- 3.2.3 Consistent Navigation (AA)
- 3.2.4 Consistent Identification (AA)
- 3.3.1 Error Identification (A), 3.3.2 Labels or Instructions (A)
- 3.3.3 Error Suggestion (AA)
- 3.3.4 Error Prevention (Legal, Financial, Data) (AA)

Robust:

- 4.1.2 Name, Role, Value (A)
- 4.1.3 Status Messages (AA)

Refer to the Quick Reference for the full, authoritative list and techniques.
