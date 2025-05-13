import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoAccordion from './NeoAccordion.vue'
import NeoIcon from '../NeoIcon/NeoIcon.vue'

import { FileText } from 'lucide-vue-next'

const meta: Meta<typeof NeoAccordion> = {
  title: 'Atoms/NeoAccordion',
  component: NeoAccordion,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the accordion',
    },
    modelValue: {
      control: 'boolean',
      description: 'Whether the accordion is expanded',
    },
    id: {
      control: 'text',
      description: 'ID for the accordion element',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    allowToggle: {
      control: 'boolean',
      description: 'Whether the accordion can be closed after opening',
    },
  },
  args: {
    title: 'Accordion Title',
    modelValue: false,
    id: '',
    disabled: false,
    allowToggle: true,
  },
}

export default meta
type Story = StoryObj<typeof NeoAccordion>

export const Default: Story = {
  render: (args) => ({
    components: { NeoAccordion },
    setup() {
      return { args }
    },
    template: `
      <NeoAccordion v-bind="args">
        <p>This is the content of the accordion. It can contain any HTML elements.</p>
        <p class="mt-2">Multiple paragraphs, lists, images, or other components can be placed here.</p>
      </NeoAccordion>
    `,
  }),
}

export const Open: Story = {
  render: (args) => ({
    components: { NeoAccordion },
    setup() {
      return { args }
    },
    template: `
      <NeoAccordion v-bind="args">
        <p>This accordion is open by default.</p>
      </NeoAccordion>
    `,
  }),
  args: {
    modelValue: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { NeoAccordion },
    setup() {
      return { args }
    },
    template: `
      <NeoAccordion v-bind="args">
        <p>This accordion is disabled and cannot be toggled.</p>
      </NeoAccordion>
    `,
  }),
  args: {
    disabled: true,
  },
}

export const CustomHeader: Story = {
  render: (args) => ({
    components: { NeoAccordion, NeoIcon, FileText },
    setup() {
      return { args }
    },
    template: `
      <NeoAccordion v-bind="args">
        <template #header>
          <div class="flex items-center gap-2">
            <NeoIcon size="sm">
              <FileText />
            </NeoIcon>
            Custom Header with Icon
          </div>
        </template>
        <p>This accordion has a custom header with an icon.</p>
      </NeoAccordion>
    `,
  }),
}

export const AccordionGroup: Story = {
  render: (args) => ({
    components: { NeoAccordion },
    setup() {
      const openAccordion = ref(0)

      const toggle = (index: number) => {
        openAccordion.value = openAccordion.value === index ? -1 : index
      }

      return { args, openAccordion, toggle }
    },
    template: `
      <div class="space-y-4">
        <NeoAccordion
          title="First Accordion"
          :model-value="openAccordion === 0"
          @update:model-value="toggle(0)"
        >
          <p>Content of the first accordion.</p>
        </NeoAccordion>

        <NeoAccordion
          title="Second Accordion"
          :model-value="openAccordion === 1"
          @update:model-value="toggle(1)"
        >
          <p>Content of the second accordion.</p>
        </NeoAccordion>

        <NeoAccordion
          title="Third Accordion"
          :model-value="openAccordion === 2"
          @update:model-value="toggle(2)"
        >
          <p>Content of the third accordion.</p>
        </NeoAccordion>
      </div>
    `,
  }),
}
