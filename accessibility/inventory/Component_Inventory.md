# Component Inventory

This document provides a comprehensive inventory of all components in the Neo Components Vue 3 library.

## Atoms

### NeoAccordion

- **Description**: A vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.
- **Props**:
  - `title`: `string` - The title of the accordion.
  - `modelValue`: `boolean` - Controls the open/closed state.
  - `id`: `string` - Unique identifier.
  - `disabled`: `boolean` - Disables the accordion.
  - `allowToggle`: `boolean` - Allows toggling the accordion.
- **Events**:
  - `update:modelValue`: `(value: boolean) => void` - Emitted when the accordion is toggled.
- **Functionality**: Interactive, shows and hides content.

### NeoAlert

- **Description**: A component that provides contextual feedback messages for typical user actions.
- **Props**:
  - `show`: `boolean` - Toggles the visibility of the alert.
  - `type`: `'info' | 'success' | 'warning' | 'error'` - The type of alert.
  - `title`: `string` - The title of the alert.
  - `message`: `string` - The message content of the alert.
  - `dismissible`: `boolean` - Whether the alert can be dismissed.
  - `showIcon`: `boolean` - Whether to show an icon.
  - `autoClose`: `boolean` - Whether the alert should close automatically.
  - `autoCloseDelay`: `number` - The delay before auto-closing.
- **Events**:
  - `dismiss`: `() => void` - Emitted when the alert is dismissed.
  - `close`: `() => void` - Emitted when the alert is closed.
- **Functionality**: Data presentation, user feedback.

### NeoAvatar

- **Description**: An image element with a fallback for representing a user.
- **Props**:
  - `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` - The size of the avatar.
  - `shape`: `'circle' | 'square' | 'rounded'` - The shape of the avatar.
  - `color`: `'primary' | 'error' | 'success' | 'warning' | 'info' | 'gray'` - The background color.
  - `src`: `string` - The image source.
  - `alt`: `string` - The alt text for the image.
  - `initials`: `string` - Initials to display as a fallback.
  - `interactive`: `boolean` - Whether the avatar is clickable.
  - `ariaLabel`: `string` - The ARIA label for the avatar.
- **Events**:
  - `click`: `() => void` - Emitted when the avatar is clicked.
- **Functionality**: Data presentation, can be interactive.

### NeoButton

- **Description**: A simple button component.
- **Props**:
  - `size`: `'medium' | 'large'` - The size of the button.
  - `type`: `'primary' | 'error' | 'success' | 'warning'` - The type of button.
  - `disabled`: `boolean` - Disables the button.
  - `extendedShadow`: `boolean` - Toggles a larger shadow.
  - `extendOnHover`: `boolean` - Toggles shadow extension on hover.
- **Events**:
  - `click`: `(value: unknown) => void` - Emitted when the button is clicked.
- **Functionality**: Interactive, user input.

### NeoCard

- **Description**: A flexible and extensible content container.
- **Props**:
  - `shadow`: `boolean` - Toggles a shadow effect.
  - `dismissible`: `boolean` - Whether the card can be dismissed.
- **Events**:
  - `close`: `() => void` - Emitted when the card is closed.
- **Functionality**: Data presentation, container.

### NeoCheckbox

- **Description**: A checkbox component that allows users to select one or more options from a set.
- **Props**:
  - `id`: `string` - The ID of the checkbox.
  - `modelValue`: `boolean` - The value of the checkbox.
  - `disabled`: `boolean` - Disables the checkbox.
- **Events**:
  - `update:modelValue`: `(value: boolean) => void` - Emitted when the checkbox value changes.
- **Functionality**: Form control, user input.

### NeoDivider

- **Description**: A component to visually separate content.
- **Props**:
  - `orientation`: `'horizontal' | 'vertical'` - The orientation of the divider.
  - `label`: `string` - A label to display in the middle of the divider.
  - `tight`: `boolean` - Reduces the margin around the divider.
- **Events**: None
- **Functionality**: Visual separator.

### NeoIcon

- **Description**: A component to render icons.
- **Props**:
  - `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` - The size of the icon.
  - `color`: `'primary' | 'error' | 'success' | 'warning' | 'black' | 'white' | 'inherit'` - The color of the icon.
  - `rotate`: `number` - The rotation of the icon in degrees.
  - `strokeWidth`: `number` - The stroke width of the icon.
  - `ariaHidden`: `boolean` - Whether the icon is hidden from screen readers.
  - `ariaLabel`: `string` - The ARIA label for the icon.
- **Events**: None
- **Functionality**: Visual element.

### NeoInput

- **Description**: A foundational component for form inputs.
- **Props**:
  - `id`: `string` - The ID of the input.
  - `placeholder`: `string` - The placeholder text.
  - `disabled`: `boolean` - Disables the input.
  - `scaleOnFocus`: `boolean` - Whether to scale the input on focus.
  - `type`: `HTMLInputType` - The type of the input.
  - `modelValue`: `string` (via `defineModel`)
- **Events**:
  - `focus`: `() => void` - Emitted on focus.
  - `blur`: `() => void` - Emitted on blur.
- **Functionality**: Form control, user input.

### NeoLabel

- **Description**: A component for labeling form elements.
- **Props**:
  - `forId`: `string` - The ID of the element the label is for.
- **Events**: None
- **Functionality**: Form accessibility, label.

### NeoLegend

- **Description**: A legend for a fieldset.
- **Props**: None
- **Events**: None
- **Functionality**: Form accessibility, label.

### NeoOption

- **Description**: An option in a select list.
- **Props**:
  - `show`: `boolean` - Whether the option is shown.
  - `selected`: `boolean` - Whether the option is selected.
- **Events**:
  - `click`: `() => void` - Emitted when the option is clicked.
- **Functionality**: Form control, user input.

### NeoPopover

- **Description**: A popover component that can be used to display additional content.
- **Props**:
  - `modelValue`: `boolean` - Controls the open/closed state.
  - `position`: `'top' | 'right' | 'bottom' | 'left'` - The position of the popover.
  - `dismissible`: `boolean` - Whether the popover can be dismissed.
  - `closeOnClickOutside`: `boolean` - Whether to close the popover when clicking outside.
  - `closeOnEsc`: `boolean` - Whether to close the popover when pressing the Esc key.
  - `closeOnClickInSlot`: `boolean` - Whether to close the popover when clicking inside the slot.
  - `offsetDistance`: `number` - The distance between the trigger and the popover.
  - `role`: `'dialog' | 'menu' | 'listbox' | 'tooltip'` - The ARIA role of the popover.
  - `id`: `string` - Unique identifier.
  - `disabled`: `boolean` - Disables the popover.
- **Events**:
  - `update:modelValue`: `(value: boolean) => void` - Emitted when the popover is toggled.
- **Functionality**: Interactive, shows and hides content.

### NeoProgressBar

- **Description**: A component to display progress.
- **Props**:
  - `id`: `string` - The ID of the progress bar.
  - `value`: `number` - The current value of the progress bar.
  - `label`: `string` - The label for the progress bar.
  - `color`: `'primary' | 'error' | 'success' | 'warning' | 'info'` - The color of the progress bar.
  - `showLabels`: `boolean` - Whether to show the labels.
  - `showValue`: `boolean` - Whether to show the value.
  - `ariaLabel`: `string` - The ARIA label for the progress bar.
- **Events**: None
- **Functionality**: Data presentation.

### NeoRadio

- **Description**: A radio button component.
- **Props**:
  - `id`: `string` - The ID of the radio button.
  - `modelValue`: `T` - The value of the radio button.
  - `value`: `T` - The value of the radio button.
  - `name`: `string` - The name of the radio button group.
  - `disabled`: `boolean` - Disables the radio button.
- **Events**:
  - `update:modelValue`: `(value: T) => void` - Emitted when the radio button value changes.
- **Functionality**: Form control, user input.

### NeoSelect

- **Description**: A select component that allows users to select an option from a dropdown list.
- **Props**:
  - `id`: `string` - The ID of the select component.
  - `label`: `string` - The label for the select component.
  - `open`: `boolean` - Controls the open/closed state of the dropdown.
  - `listId`: `string` - The ID of the listbox element.
- **Events**:
  - `update:selectOpen`: `(value: boolean) => void` - Emitted when the select dropdown is opened or closed.
- **Functionality**: Form control, user input.

### NeoSpinner

- **Description**: A spinner component to indicate a loading state.
- **Props**:
  - `size`: `'sm' | 'md' | 'lg'` - The size of the spinner.
  - `label`: `string` - A label to display next to the spinner.
  - `ariaLabel`: `string` - The ARIA label for the spinner.
- **Events**: None
- **Functionality**: Visual indicator, loading state.

### NeoTab

- **Description**: A tab component for navigating between different sections of content.
- **Props**:
  - `id`: `string` - The ID of the tab.
  - `contentId`: `string` - The ID of the content panel associated with the tab.
  - `selected`: `boolean` - Whether the tab is currently selected.
  - `disabled`: `boolean` - Disables the tab.
- **Events**:
  - `select`: `() => void` - Emitted when the tab is selected.
- **Functionality**: Navigation, interactive.

### NeoTag

- **Description**: A tag component for displaying keywords or labels.
- **Props**:
  - `type`: `'primary' | 'error' | 'success' | 'warning' | 'info'` - The type of tag.
  - `size`: `'sm' | 'md' | 'lg'` - The size of the tag.
  - `label`: `string` - The text content of the tag.
  - `dismissible`: `boolean` - Whether the tag can be dismissed.
  - `ariaLabel`: `string` - The ARIA label for the tag.
- **Events**:
  - `dismiss`: `() => void` - Emitted when the tag is dismissed.
- **Functionality**: Data presentation, can be interactive.

### NeoToggle

- **Description**: A toggle switch component.
- **Props**:
  - `id`: `string` - The ID of the toggle switch.
  - `modelValue`: `boolean` - The value of the toggle switch.
  - `disabled`: `boolean` - Disables the toggle switch.
  - `ariaLabel`: `string` - The ARIA label for the toggle switch.
- **Events**:
  - `update:modelValue`: `(value: boolean) => void` - Emitted when the toggle switch value changes.
- **Functionality**: Form control, user input.

### NeoTooltip

- **Description**: A tooltip component that displays information on hover.
- **Props**:
  - `text`: `string` - The text to display in the tooltip.
  - `position`: `'top' | 'right' | 'bottom' | 'left'` - The position of the tooltip.
  - `offsetDistance`: `number` - The distance between the trigger and the tooltip.
  - `showDelay`: `number` - The delay before showing the tooltip.
- **Events**: None
- **Functionality**: Data presentation, interactive.

## Molecules

### NeoCheckboxGroup

- **Description**: A group of checkboxes.
- **Props**:
  - `modelValue`: `T[]` - The selected values.
  - `options`: `CheckboxOption<T>[]` - The options for the checkboxes.
  - `name`: `string` - The name of the checkbox group.
  - `legend`: `string` - The legend for the checkbox group.
  - `helperText`: `string` - Helper text to display below the group.
  - `disabled`: `boolean` - Disables the entire group.
  - `required`: `boolean` - Marks the group as required.
  - `orientation`: `'horizontal' | 'vertical'` - The orientation of the checkboxes.
- **Events**:
  - `update:modelValue`: `(value: T[]) => void` - Emitted when the selection changes.
- **Functionality**: Form control, user input.

### NeoLabeledInput

- **Description**: An input with a label.
- **Props**:
  - `id`: `string` - The ID of the input.
  - `placeholder`: `string` - The placeholder for the input.
  - `disabled`: `boolean` - Disables the input.
  - `layout`: `'vertical' | 'horizontal'` - The layout of the label and input.
- **Events**: None
- **Functionality**: Form control, user input.

### NeoLabeledSelect

- **Description**: A select with a label.
- **Props**:
  - `id`: `string` - The ID of the select.
  - `options`: `Array<string>` - The options for the select.
- **Events**: None
- **Functionality**: Form control, user input.

### NeoRadioGroup

- **Description**: A group of radio buttons.
- **Props**:
  - `modelValue`: `T` - The selected value.
  - `options`: `RadioOption<T>[]` - The options for the radio buttons.
  - `name`: `string` - The name of the radio group.
  - `legend`: `string` - The legend for the radio group.
  - `helperText`: `string` - Helper text to display below the group.
  - `disabled`: `boolean` - Disables the entire group.
  - `required`: `boolean` - Marks the group as required.
  - `orientation`: `'horizontal' | 'vertical'` - The orientation of the radio buttons.
- **Events**:
  - `update:modelValue`: `(value: T) => void` - Emitted when the selection changes.
- **Functionality**: Form control, user input.

### NeoTabGroup

- **Description**: A group of tabs.
- **Props**:
  - `selectedTabIndex`: `number` - The index of the selected tab.
- **Events**:
  - `update:selectedTabIndex`: `(value: number) => void` - Emitted when the selected tab changes.
- **Functionality**: Navigation, interactive.

## UI

### Accordion

- **Description**: A vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. This is a composite component built from smaller parts.
- **Components**:
  - `NeoAccordion`: The root container for the accordion. Based on `reka-ui`'s `AccordionRoot`.
  - `NeoAccordionItem`: A single item within the accordion. Based on `reka-ui`'s `AccordionItem`.
  - `NeoAccordionTrigger`: The button that toggles the accordion item. Based on `reka-ui`'s `AccordionTrigger`.
  - `NeoAccordionContent`: The content that is revealed when the accordion item is opened. Based on `reka-ui`'s `AccordionContent`.
- **Props**: Inherits props from `reka-ui`'s `AccordionRoot`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent` components. Key props include `type` ('single' or 'multiple'), `collapsible`, `disabled`, `value`.
- **Events**: Inherits events from `reka-ui`. Key event is `update:modelValue`.
- **Functionality**: Interactive, navigation, shows and hides content.

### Alert

- **Description**: A component that provides contextual feedback messages for typical user actions.
- **Components**:
- **Components**:
  - `NeoAlert`: The main alert container.
  - `NeoAlertTitle`: The title of the alert.
  - `NeoAlertDescription`: The description of the alert.
  - `NeoAlert`: The main alert container.
- **Props**:
  - `variant`: `'info' | 'success' | 'warning' | 'error'` - The style of the alert.
- **Events**: None directly on the wrapper, but can contain interactive elements.
- **Functionality**: Data presentation, user feedback.

### Avatar

- **Description**: An image element with a fallback for representing a user.
- **Components**:
  - `NeoAvatar`: The root container for the avatar. Based on `reka-ui`'s `AvatarRoot`.
  - `NeoAvatarImage`: The image to be displayed. Based on `reka-ui`'s `AvatarImage`.
  - `NeoAvatarFallback`: The fallback content to be displayed if the image fails to load. Based on `reka-ui`'s `AvatarFallback`.
- **Props**: Inherits props from `reka-ui`'s `AvatarRoot`, `AvatarImage`, and `AvatarFallback` components.
- **Events**: None.
- **Functionality**: Data presentation.

### Button

- **Description**: A button component.
- **Components**:
  - `NeoButton`: The button itself.
- **Props**:
  - `variant`: `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'` - The style of the button.
  - `size`: `'default' | 'sm' | 'lg' | 'icon'` - The size of the button.
  - `disabled`: `boolean` - Disables the button.
  - `extendedShadow`: `boolean` - Toggles a larger shadow.
  - `extendOnHover`: `boolean` - Toggles shadow extension on hover.
- **Events**:
  - `click`: `(value: unknown) => void` - Emitted when the button is clicked.
- **Functionality**: Interactive, user input.
