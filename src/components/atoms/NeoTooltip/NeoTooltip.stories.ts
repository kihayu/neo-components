import type { Meta, StoryObj } from '@storybook/vue3'
import NeoTooltip from './NeoTooltip.vue'
import NeoButton from '../NeoButton/NeoButton.vue'
import NeoIcon from '../NeoIcon/NeoIcon.vue'

import { Info, HelpCircle } from 'lucide-vue-next'

const meta: Meta<typeof NeoTooltip> = {
  title: 'Atoms/NeoTooltip',
  component: NeoTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the tooltip',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The position of the tooltip relative to the trigger element',
    },
    offsetDistance: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Distance in pixels between the tooltip and the trigger element',
    },
    showDelay: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Delay in milliseconds before showing the tooltip',
    },
  },
  args: {
    text: 'This is a tooltip',
    position: 'top',
    offsetDistance: 8,
    showDelay: 200,
  },
}

export default meta
type Story = StoryObj<typeof NeoTooltip>

export const Default: Story = {
  render: (args) => ({
    components: { NeoTooltip, NeoButton },
    setup() {
      return { args }
    },
    template: `
      <div class="p-20 flex justify-center">
        <NeoTooltip v-bind="args">
          <NeoButton :extend-on-hover="false">Hover Me</NeoButton>
        </NeoTooltip>
      </div>
    `,
  }),
}

export const PositionVariants: Story = {
  render: (args) => ({
    components: { NeoTooltip, NeoButton },
    setup() {
      return { args }
    },
    template: `
      <div class="p-20 flex flex-col items-center gap-8">
        <div class="flex justify-center">
          <NeoTooltip text="Top Tooltip" position="top">
            <NeoButton :extend-on-hover="false">Top</NeoButton>
          </NeoTooltip>
        </div>
        <div class="flex justify-between w-72">
          <NeoTooltip text="Left Tooltip" position="left">
            <NeoButton :extend-on-hover="false">Left</NeoButton>
          </NeoTooltip>
          <NeoTooltip text="Right Tooltip" position="right">
            <NeoButton :extend-on-hover="false">Right</NeoButton>
          </NeoTooltip>
        </div>
        <div class="flex justify-center">
          <NeoTooltip text="Bottom Tooltip" position="bottom">
            <NeoButton :extend-on-hover="false">Bottom</NeoButton>
          </NeoTooltip>
        </div>
      </div>
    `,
  }),
}

export const TextVariants: Story = {
  render: (args) => ({
    components: { NeoTooltip, NeoButton },
    setup() {
      return { args }
    },
    template: `
      <div class="p-20 flex justify-center gap-4">
        <NeoTooltip text="Short tip">
          <NeoButton :extend-on-hover="false">Short</NeoButton>
        </NeoTooltip>
        <NeoTooltip text="This is a longer tooltip with more information">
          <NeoButton :extend-on-hover="false">Longer</NeoButton>
        </NeoTooltip>
      </div>
    `,
  }),
}

export const DifferentTriggers: Story = {
  render: (args) => ({
    components: { NeoTooltip, NeoButton, NeoIcon, Info, HelpCircle },
    setup() {
      return { args }
    },
    template: `
      <div class="p-20 flex flex-col items-center gap-4">
        <NeoTooltip text="Button tooltip">
          <NeoButton :extend-on-hover="false">Button with tooltip</NeoButton>
        </NeoTooltip>

        <NeoTooltip text="Text can have tooltips too">
          <span class="underline cursor-help">Hover over this text</span>
        </NeoTooltip>

        <NeoTooltip text="Icon tooltip">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white cursor-help">
            <NeoIcon size="sm" color="white">
              <HelpCircle />
            </NeoIcon>
          </span>
        </NeoTooltip>

        <NeoTooltip text="Info icon tooltip">
          <NeoIcon size="md" color="primary">
            <Info />
          </NeoIcon>
        </NeoTooltip>
      </div>
    `,
  }),
}
