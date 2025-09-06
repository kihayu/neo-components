# Components to WCAG 2.1 AA Mapping

This living document maps common components in this repository to relevant WCAG 2.1 AA Success Criteria (SC). Use it
to triage issues, guide reviews, and prioritize remediation.

Legend:

- SC: WCAG Success Criterion ID
- Area: Perceivable / Operable / Understandable / Robust
- Notes: What to verify and common pitfalls

Related:

- Framework overview: [WCAG_Assessment_Framework.md](../WCAG_Assessment_Framework.md)
- Inventory: [Component_Inventory.md](../inventory/Component_Inventory.md), [Component_Categories.csv](../inventory/Component_Categories.csv)

---

| Component            | Key SC                             | Area                                | Notes                                                                                                                                       |
| -------------------- | ---------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| NeoButton            | 2.1.1, 2.4.7, 1.4.3, 1.4.11, 4.1.2 | Operable, Perceivable, Robust       | Keyboard operable; visible focus ring; contrast; name/role/state; avoid div button anti-pattern                                             |
| NeoInput             | 1.3.1, 3.3.1, 3.3.2, 3.3.3, 4.1.2  | Perceivable, Understandable, Robust | Programmatic label via [NeoLabel](../../src/components/atoms/NeoLabel/NeoLabel.vue), error identification/suggestions, describedby for help |
| NeoCheckbox          | 1.3.1, 2.1.1, 4.1.2                | Perceivable, Operable, Robust       | Native input preferred; label association; indeterminate state announced                                                                    |
| NeoRadio             | 1.3.1, 2.1.1, 4.1.2                | Perceivable, Operable, Robust       | Grouping via [NeoRadioGroup](../../src/components/molecules/NeoRadioGroup/NeoRadioGroup.vue); single tab stop with roving focus if custom   |
| NeoSelect            | 1.3.1, 2.1.1, 4.1.2                | Perceivable, Operable, Robust       | Use native select when possible; custom listbox must follow ARIA patterns                                                                   |
| NeoToggle (Switch)   | 2.1.1, 4.1.2, 2.5.3                | Operable, Robust                    | Space/Enter toggles; role="switch" with aria-checked; label in name matches visible label                                                   |
| NeoAccordion         | 1.3.1, 2.4.3, 4.1.2                | Perceivable, Operable, Robust       | Button with aria-expanded and aria-controls; focus order; heading relationships                                                             |
| NeoTab / NeoTabGroup | 1.3.1, 2.4.3, 4.1.2                | Perceivable, Operable, Robust       | Tabs implement roving tabindex; arrow keys; aria-selected; association via aria-controls                                                    |
| NeoAlert             | 4.1.3                              | Robust                              | role="status" or alert semantics; ensure polite/atomic updates                                                                              |
| NeoTooltip           | 1.4.13, 2.1.1, 2.4.3               | Perceivable, Operable               | Dismissible; hover/focus triggered content; ESC to dismiss; not used for essential info                                                     |
| NeoPopover           | 1.4.13, 2.1.1, 2.4.3, 4.1.2        | Perceivable, Operable, Robust       | Focus management; trap and return; aria-modal when applicable                                                                               |
| NeoProgressBar       | 1.1.1, 4.1.2                       | Perceivable, Robust                 | Provide accessible name; role="progressbar" with aria-valuenow/min/max; avoid only color                                                    |
| NeoAvatar            | 1.1.1, 1.4.11                      | Perceivable                         | Decorative alt="" if purely decorative; provide text fallback                                                                               |
| NeoCard              | 1.3.1, 2.4.6                       | Perceivable, Understandable         | Use headings and landmarks; maintain info relationships                                                                                     |
| NeoTag               | 1.3.1, 4.1.2                       | Perceivable, Robust                 | If interactive, use button/link semantics and focus                                                                                         |
| NeoTooltip           | 1.4.13                             | Perceivable                         | See notes above; avoid hover-only on touch devices                                                                                          |

## Verification checklist by area

Perceivable:

- Text/Non-text contrast meets or exceeds 4.5:1 (1.4.3) and non-text contrast (1.4.11)
- Info and relationships conveyed programmatically (1.3.1)
- Reflow works at 320 CSS px width without loss of content/functionality (1.4.10)
- Content appearing on hover/focus is dismissible, hoverable, persistent (1.4.13)

Operable:

- Keyboard support for all functions, no traps (2.1.1, 2.1.2)
- Predictable focus order; visible focus indicator (2.4.3, 2.4.7)
- Gestures and pointer targets respect best practices (2.5.x as applicable)

Understandable:

- Clear labels/instructions; errors identified and suggestions provided (3.3.x)
- Consistent navigation and identification of components (3.2.3, 3.2.4)

Robust:

- Accessible name, role, value reflected to AT (4.1.2)
- Status messages announced without focus change (4.1.3)

## How to use this mapping

- During triage, link each issue to the relevant SC(s) from this table.
- In PRs, cite the SC(s) addressed and update this mapping when new components or patterns are added.
- Keep examples and pitfalls concise; link to authoritative references in [references](../references/).

## References

- WCAG 2.1 Quick Reference — https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1
- ARIA Authoring Practices — https://www.w3.org/WAI/ARIA/apg/
