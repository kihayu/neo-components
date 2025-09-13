// ========================================================================================
// Neo Components - Public API Exports
// - Organized by category (atoms, molecules, ui primitives)
// - Re-exports component types (props/emits/slots) and CVA variant types
// - Ensures discoverable, typed imports for consumers
// ========================================================================================

/* ---------------------------------------------
   ATOMS
---------------------------------------------- */
export { default as NeoAccordion } from './atoms/NeoAccordion/NeoAccordion.vue'
export { default as NeoAlert } from './atoms/NeoAlert/NeoAlert.vue'
export { default as NeoAvatar } from './atoms/NeoAvatar/NeoAvatar.vue'
export { default as NeoBadge } from './atoms/NeoBadge/NeoBadge.vue'
export { default as NeoButton } from './atoms/NeoButton/NeoButton.vue'
export { default as NeoCard } from './atoms/NeoCard/NeoCard.vue'
export { default as NeoCheckbox } from './atoms/NeoCheckbox/NeoCheckbox.vue'
export { default as NeoDivider } from './atoms/NeoDivider/NeoDivider.vue'
export { default as NeoFileInput } from './atoms/NeoFileInput/NeoFileInput.vue'
export { default as NeoIcon } from './atoms/NeoIcon/NeoIcon.vue'
export { default as NeoInput } from './atoms/NeoInput/NeoInput.vue'
export { default as NeoLabel } from './atoms/NeoLabel/NeoLabel.vue'
export { default as NeoLegend } from './atoms/NeoLegend/NeoLegend.vue'
export { default as NeoOption } from './atoms/NeoOption/NeoOption.vue'
export { default as NeoPopover } from './atoms/NeoPopover/NeoPopover.vue'
export { default as NeoProgressBar } from './atoms/NeoProgressBar/NeoProgressBar.vue'
export { default as NeoRadio } from './atoms/NeoRadio/NeoRadio.vue'
export { default as NeoSelect } from './atoms/NeoSelect/NeoSelect.vue'
export { default as NeoSkeleton } from './atoms/NeoSkeleton/NeoSkeleton.vue'
export { default as NeoSpinner } from './atoms/NeoSpinner/NeoSpinner.vue'
export { default as NeoTab } from './atoms/NeoTab/NeoTab.vue'
export { default as NeoTag } from './atoms/NeoTag/NeoTag.vue'
export { default as NeoTextarea } from './atoms/NeoTextarea/NeoTextarea.vue'
export { default as NeoToggle } from './atoms/NeoToggle/NeoToggle.vue'
export { default as NeoTooltip } from './atoms/NeoTooltip/NeoTooltip.vue'

/* ---------------------------------------------
   MOLECULES
---------------------------------------------- */
export { default as NeoBreadcrumbs } from './molecules/NeoBreadcrumbs/NeoBreadcrumbs.vue'
export { default as NeoCheckboxGroup } from './molecules/NeoCheckboxGroup/NeoCheckboxGroup.vue'
export { default as NeoLabeledInput } from './molecules/NeoLabeledInput/NeoLabeledInput.vue'
export { default as NeoLabeledSelect } from './molecules/NeoLabeledSelect/NeoLabeledSelect.vue'
export { default as NeoLabeledTextarea } from './molecules/NeoLabeledTextarea/NeoLabeledTextarea.vue'
export { default as NeoPagination } from './molecules/NeoPagination/NeoPagination.vue'
export { default as NeoRadioGroup } from './molecules/NeoRadioGroup/NeoRadioGroup.vue'
export { default as NeoRating } from './molecules/NeoRating/NeoRating.vue'
export { default as NeoStepper } from './molecules/NeoStepper/NeoStepper.vue'
export { default as NeoTabGroup } from './molecules/NeoTabGroup/NeoTabGroup.vue'

/* ---------------------------------------------
   UI PRIMITIVES (groups expose sub-components and variants)
---------------------------------------------- */
export * from './ui/dialog'
export * from './ui/toast'
export * from './ui/sheet'
export * from './ui/dropdown-menu'
export * from './ui/slider'
export * from './ui/table'

/* ---------------------------------------------
   Props and Emits type re-exports for direct consumption
   (Avoid wildcard type exports to prevent name collisions like NeoSize.)
---------------------------------------------- */
// Atoms
export type { NeoAccordionProps } from './atoms/NeoAccordion/NeoAccordion.vue'
export type { NeoAlertProps } from './atoms/NeoAlert/NeoAlert.vue'
export type { NeoAvatarProps } from './atoms/NeoAvatar/NeoAvatar.vue'
export type { NeoBadgeProps, NeoBadgeEmits } from './atoms/NeoBadge/NeoBadge.vue'
export type { NeoButtonProps } from './atoms/NeoButton/NeoButton.vue'
export type { NeoCardProps } from './atoms/NeoCard/NeoCard.vue'
export type { NeoCheckboxProps } from './atoms/NeoCheckbox/NeoCheckbox.vue'
export type { NeoDividerProps } from './atoms/NeoDivider/NeoDivider.vue'
export type { NeoFileInputProps, NeoFileInputEmits, NeoFileInputError, NeoFileInputErrorCode } from './atoms/NeoFileInput/NeoFileInput.vue'
export type { NeoIconProps } from './atoms/NeoIcon/NeoIcon.vue'
export type { NeoInputProps } from './atoms/NeoInput/NeoInput.vue'
export type { NeoLabelProps } from './atoms/NeoLabel/NeoLabel.vue'
export type { NeoOptionProps } from './atoms/NeoOption/NeoOption.vue'
export type { NeoPopoverProps } from './atoms/NeoPopover/NeoPopover.vue'
export type { NeoProgressBarProps } from './atoms/NeoProgressBar/NeoProgressBar.vue'
export type { NeoRadioProps } from './atoms/NeoRadio/NeoRadio.vue'
export type { NeoSelectProps } from './atoms/NeoSelect/NeoSelect.vue'
export type { NeoSkeletonProps } from './atoms/NeoSkeleton/NeoSkeleton.vue'
export type { NeoSpinnerProps } from './atoms/NeoSpinner/NeoSpinner.vue'
export type { NeoTabProps } from './atoms/NeoTab/NeoTab.vue'
export type { NeoTagProps } from './atoms/NeoTag/NeoTag.vue'
export type { NeoTextareaProps, NeoTextareaEmits } from './atoms/NeoTextarea/NeoTextarea.vue'
export type { NeoToggleProps } from './atoms/NeoToggle/NeoToggle.vue'
export type { NeoTooltipProps } from './atoms/NeoTooltip/NeoTooltip.vue'

// Molecules
export type { NeoBreadcrumbsProps, NeoBreadcrumbsEmits } from './molecules/NeoBreadcrumbs/NeoBreadcrumbs.vue'
export type { NeoCheckboxGroupProps } from './molecules/NeoCheckboxGroup/NeoCheckboxGroup.vue'
export type { NeoLabeledInputProps } from './molecules/NeoLabeledInput/NeoLabeledInput.vue'
export type { NeoLabeledSelectProps } from './molecules/NeoLabeledSelect/NeoLabeledSelect.vue'
export type { NeoLabeledTextareaProps, NeoLabeledTextareaEmits } from './molecules/NeoLabeledTextarea/NeoLabeledTextarea.vue'
export type { NeoPaginationProps, NeoPaginationEmits } from './molecules/NeoPagination/NeoPagination.vue'
export type { NeoRadioGroupProps } from './molecules/NeoRadioGroup/NeoRadioGroup.vue'
export type { NeoRatingProps, NeoRatingEmits } from './molecules/NeoRating/NeoRating.vue'
export type { NeoStepperProps, NeoStepperEmits } from './molecules/NeoStepper/NeoStepper.vue'
export type { NeoTabGroupProps } from './molecules/NeoTabGroup/NeoTabGroup.vue'
// Note: Component interfaces are now colocated within their respective `.vue` files.
// For variant types derived from actual CVA implementations, continue to import
// them from each UI group's index module below.

/* --------------------------------------------- */
