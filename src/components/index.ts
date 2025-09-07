// ========================================================================================
// Neo Components - Public API Exports
// - Organized by category (atoms, molecules, ui primitives)
// - Re-exports component types (props/emits/slots) and CVA variant types
// - Ensures discoverable, typed imports for consumers
// ========================================================================================

/* ---------------------------------------------
   ATOMS
---------------------------------------------- */
export { default as NeoTextarea } from './atoms/NeoTextarea/NeoTextarea.vue'
export { default as NeoSkeleton } from './atoms/NeoSkeleton/NeoSkeleton.vue'
export { default as NeoBadge } from './atoms/NeoBadge/NeoBadge.vue'
export { default as NeoFileInput } from './atoms/NeoFileInput/NeoFileInput.vue'

/* ---------------------------------------------
   MOLECULES
---------------------------------------------- */
export { default as NeoLabeledTextarea } from './molecules/NeoLabeledTextarea/NeoLabeledTextarea.vue'
export { default as NeoPagination } from './molecules/NeoPagination/NeoPagination.vue'
export { default as NeoBreadcrumbs } from './molecules/NeoBreadcrumbs/NeoBreadcrumbs.vue'
export { default as NeoStepper } from './molecules/NeoStepper/NeoStepper.vue'
export { default as NeoRating } from './molecules/NeoRating/NeoRating.vue'

/* ---------------------------------------------
   UI PRIMITIVES (groups expose sub-components and variants)
---------------------------------------------- */
export * from './ui/dialog'
export * from './ui/toast'
export * from './ui/sheet'
export * from './ui/dropdown-menu'
export * from './ui/slider'
export * from './ui/table'

// Note: Component interfaces are now colocated within their respective `.vue` files.
// For variant types derived from actual CVA implementations, continue to import
// them from each UI group's index module below.

/* ---------------------------------------------
   CVA Variant Types from UI groups (runtime-derived)
   These types map to the actual cva() implementations inside each group.
---------------------------------------------- */
export type { DialogContentVariants } from './ui/dialog'
export type { DropdownMenuContentVariants } from './ui/dropdown-menu'
export type { SliderVariants } from './ui/slider'
export type { DrawerContentVariants } from './ui/sheet'
export type { TableVariants } from './ui/table'
// Prefer the runtime-derived NeoToastVariants from the toast group
export type { NeoToastVariants } from './ui/toast'
