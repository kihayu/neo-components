import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoPopover from './NeoPopover.vue'
import NeoButton from '../NeoButton/NeoButton.vue'

const meta: Meta<typeof NeoPopover> = {
  title: 'Atoms/NeoPopover',
  component: NeoPopover,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the popover relative to the trigger',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether to show a close button inside the popover',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether to close the popover when clicking outside',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the popover when pressing ESC key',
    },
    offsetDistance: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Distance in pixels between the popover and trigger',
    },
    role: {
      control: { type: 'select' },
      options: ['dialog', 'menu', 'listbox', 'tooltip'],
      description: 'ARIA role for the popover',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the popover trigger is disabled',
    },
  },
  args: {
    position: 'bottom',
    dismissible: false,
    closeOnClickOutside: true,
    closeOnEsc: true,
    offsetDistance: 8,
    role: 'dialog',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof NeoPopover>

export const Default: Story = {
  render: (args) => ({
    components: { NeoPopover, NeoButton },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div class="p-20 flex justify-center">
        <NeoPopover
          v-model="isOpen"
          v-bind="args"
        >
          <template #trigger>
            <NeoButton>Click for Popover</NeoButton>
          </template>
          <div class="p-2">
            <h3 class="text-lg font-bold mb-2">Popover Content</h3>
            <p class="mb-4">This is the content of the popover.</p>
          </div>
        </NeoPopover>
      </div>
    `,
  }),
}

export const PositionVariants: Story = {
  render: (args) => ({
    components: { NeoPopover, NeoButton },
    setup() {
      return { args }
    },
    template: `
      <div class="p-32 grid grid-cols-2 gap-20">
        <div class="flex justify-center items-center">
          <NeoPopover position="top">
            <template #trigger>
              <NeoButton>Top</NeoButton>
            </template>
            <div class="p-2 w-48">
              <p>Popover positioned at the top</p>
            </div>
          </NeoPopover>
        </div>

        <div class="flex justify-center items-center">
          <NeoPopover position="right">
            <template #trigger>
              <NeoButton>Right</NeoButton>
            </template>
            <div class="p-2 w-48">
              <p>Popover positioned at the right</p>
            </div>
          </NeoPopover>
        </div>

        <div class="flex justify-center items-center">
          <NeoPopover position="left">
            <template #trigger>
              <NeoButton>Left</NeoButton>
            </template>
            <div class="p-2 w-48">
              <p>Popover positioned at the left</p>
            </div>
          </NeoPopover>
        </div>

        <div class="flex justify-center items-center">
          <NeoPopover position="bottom">
            <template #trigger>
              <NeoButton>Bottom</NeoButton>
            </template>
            <div class="p-2 w-48">
              <p>Popover positioned at the bottom</p>
            </div>
          </NeoPopover>
        </div>
      </div>
    `,
  }),
}

export const Dismissible: Story = {
  render: (args) => ({
    components: { NeoPopover, NeoButton },
    setup() {
      return { args }
    },
    template: `
      <div class="p-20 flex justify-center">
        <NeoPopover
          dismissible
          v-bind="args"
        >
          <template #trigger>
            <NeoButton>With Close Button</NeoButton>
          </template>
          <div class="p-3 w-64">
            <h3 class="text-lg font-bold mb-2">Dismissible Popover</h3>
            <p>This popover has a close button in the corner.</p>
          </div>
        </NeoPopover>
      </div>
    `,
  }),
  args: {
    dismissible: true,
    closeOnClickOutside: false,
  },
}

export const ComplexContent: Story = {
  render: (args) => ({
    components: { NeoPopover, NeoButton },
    setup() {
      interface Item {
        id: number
        name: string
      }

      const selectedItem = ref<Item | null>(null)

      const items = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
      ]

      const selectItem = (item: Item) => {
        selectedItem.value = item
      }

      return { args, items, selectItem, selectedItem }
    },
    template: `
      <div class="p-20 flex flex-col items-center gap-4">
        <NeoPopover
          role="menu"
          position="bottom"
          v-bind="args"
        >
          <template #trigger>
            <NeoButton>Select an Option</NeoButton>
          </template>
          <div class="p-2 w-48">
            <ul role="menu" class="divide-y divide-gray-200">
              <li
                v-for="item in items"
                :key="item.id"
                class="py-2 px-1 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                @click="selectItem(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </NeoPopover>

        <div v-if="selectedItem" class="mt-4">
          Selected: {{ selectedItem.name }}
        </div>
      </div>
    `,
  }),
  args: {
    closeOnClickInSlot: true,
  },
}

export const DisabledState: Story = {
  render: (args) => ({
    components: { NeoPopover, NeoButton },
    setup() {
      return { args }
    },
    template: `
      <div class="p-20 flex justify-center">
        <NeoPopover
          disabled
          v-bind="args"
        >
          <template #trigger>
            <NeoButton disabled>Disabled Popover</NeoButton>
          </template>
          <div class="p-2">
            <p>This content won't be shown because the popover is disabled.</p>
          </div>
        </NeoPopover>
      </div>
    `,
  }),
  args: {
    disabled: true,
  },
}
