import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoTag from './NeoTag.vue'
import NeoIcon from '../NeoIcon/NeoIcon.vue'
import { Check } from 'lucide-vue-next'

const meta: Meta<typeof NeoTag> = {
  title: 'Atoms/NeoTag',
  component: NeoTag,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'error', 'success', 'warning', 'info'],
      description: 'Type/color variant of the tag',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tag',
    },
    label: {
      control: 'text',
      description: 'Text content of the tag',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the tag can be dismissed',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the tag',
    },
  },
  args: {
    type: 'primary',
    size: 'md',
    label: 'Tag Label',
    dismissible: false,
    ariaLabel: 'Tag',
  },
}

export default meta
type Story = StoryObj<typeof NeoTag>

export const Default: Story = {
  render: (args) => ({
    components: { NeoTag },
    setup() {
      return { args }
    },
    template: `<NeoTag v-bind="args" />`,
  }),
}

export const WithIcon: Story = {
  render: (args) => ({
    components: { Check, NeoTag, NeoIcon },
    setup() {
      return { args }
    },
    template: `
      <NeoTag v-bind="args">
        <template #icon>
          <NeoIcon size="sm" color="inherit">
            <Check size="16" />
          </NeoIcon>
        </template>
        {{ args.label }}
      </NeoTag>
    `,
  }),
}

export const Dismissible: Story = {
  render: (args) => ({
    components: { NeoTag },
    setup() {
      const tags = ref(['Feature', 'Design', 'Development'])

      const removeTag = (index: number) => {
        tags.value.splice(index, 1)
      }

      return { args, tags, removeTag }
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <NeoTag
          v-for="(tag, index) in tags"
          :key="index"
          :type="args.type"
          :size="args.size"
          dismissible
          @dismiss="removeTag(index)"
        >
          {{ tag }}
        </NeoTag>
      </div>
      <div class="mt-4" v-if="tags.length === 0">
        All tags have been removed!
      </div>
    `,
  }),
  args: {
    dismissible: true,
  },
}

export const TypeVariants: Story = {
  render: (args) => ({
    components: { NeoTag },
    setup() {
      return { args }
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <NeoTag type="primary" :size="args.size">Primary</NeoTag>
        <NeoTag type="error" :size="args.size">Error</NeoTag>
        <NeoTag type="success" :size="args.size">Success</NeoTag>
        <NeoTag type="warning" :size="args.size">Warning</NeoTag>
        <NeoTag type="info" :size="args.size">Info</NeoTag>
      </div>
    `,
  }),
}

export const SizeVariants: Story = {
  render: (args) => ({
    components: { NeoTag },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-2">
        <NeoTag :type="args.type" size="sm">Small</NeoTag>
        <NeoTag :type="args.type" size="md">Medium</NeoTag>
        <NeoTag :type="args.type" size="lg">Large</NeoTag>
      </div>
    `,
  }),
}
