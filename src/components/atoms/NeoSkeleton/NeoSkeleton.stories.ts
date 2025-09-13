import type { Meta, StoryObj } from '@storybook/vue3'
import NeoSkeleton, { type NeoSkeletonProps } from './NeoSkeleton.vue'

const meta = {
  title: 'Atoms/NeoSkeleton',
  component: NeoSkeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'contrast'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: { type: 'select' },
      options: ['rect', 'text', 'circle', 'inline'],
    },
  },
} satisfies Meta<typeof NeoSkeleton>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  width: '100%',
  height: undefined,
  radius: undefined,
  shape: 'rect',
  lines: 3,
  animated: true,
  variant: 'default',
  size: 'md',
  ariaLabel: undefined,
  role: undefined,
  class: undefined,
} as Partial<NeoSkeletonProps>

const renderBlock = (args: Partial<NeoSkeletonProps>) => ({
  components: { NeoSkeleton },
  setup() {
    return { args }
  },
  template: `
    <div class="max-w-xl space-y-4">
      <NeoSkeleton v-bind="args" />
    </div>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
    width: '100%',
    height: 20,
  },
  render: (args) => renderBlock(args),
}

export const TextLines: Story = {
  args: {
    ...defaultArgs,
    shape: 'text',
    lines: 4,
  },
  render: (args) => renderBlock(args),
}

export const Circle: Story = {
  args: {
    ...defaultArgs,
    shape: 'circle',
    width: 64,
    height: 64,
  },
  render: (args) => renderBlock(args),
}

export const Inline: Story = {
  args: {
    ...defaultArgs,
    shape: 'inline',
    width: 160,
    height: 18,
  },
  render: (args) => renderBlock(args),
}

export const VariantsAndSizes: Story = {
  args: {
    ...defaultArgs,
  },
  render: () => ({
    components: { NeoSkeleton },
    template: `
      <div class="grid gap-6">
        <div class="space-y-2">
          <div class="font-bold text-sm">Variants</div>
          <div class="flex flex-col gap-3">
            <NeoSkeleton variant="default" :height="16" />
            <NeoSkeleton variant="muted" :height="16" />
            <NeoSkeleton variant="contrast" :height="16" />
          </div>
        </div>

        <div class="space-y-2">
          <div class="font-bold text-sm">Sizes</div>
          <div class="flex flex-col gap-3">
            <NeoSkeleton size="sm" :height="12" />
            <NeoSkeleton size="md" :height="16" />
            <NeoSkeleton size="lg" :height="20" />
          </div>
        </div>

        <div class="space-y-2">
          <div class="font-bold text-sm">Text Shape</div>
          <NeoSkeleton shape="text" :lines="3" />
        </div>
      </div>
    `,
  }),
}
