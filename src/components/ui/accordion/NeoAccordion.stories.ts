import type { Meta, StoryObj } from '@storybook/vue3'
import NeoAccordion from './NeoAccordion.vue'
import NeoAccordionItem from './NeoAccordionItem.vue'
import NeoAccordionTrigger from './NeoAccordionTrigger.vue'
import NeoAccordionContent from './NeoAccordionContent.vue'
import { type AccordionTriggerProps } from 'reka-ui'

const meta: Meta<typeof NeoAccordion> = {
  title: 'UI/NeoAccordion',
  component: NeoAccordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NeoAccordion>

const defaultArgs = {
  type: 'single',
  collapsible: true,
} as AccordionTriggerProps

const accordionItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
]

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => ({
    components: { NeoAccordion, NeoAccordionItem, NeoAccordionTrigger, NeoAccordionContent },
    setup() {
      return { args }
    },
    template: `
      <NeoAccordion v-bind="args" class="w-full">
        <NeoAccordionItem value="${accordionItems[0].value}">
          <NeoAccordionTrigger>${accordionItems[0].title}</NeoAccordionTrigger>
          <NeoAccordionContent>
            ${accordionItems[0].content}
          </NeoAccordionContent>
        </NeoAccordionItem>
      </NeoAccordion>
    `,
  }),
}

export const Multiple: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => ({
    components: { NeoAccordion, NeoAccordionItem, NeoAccordionTrigger, NeoAccordionContent },
    setup() {
      return { args }
    },
    template: `
      <NeoAccordion v-bind="args" class="w-full">
        ${accordionItems
          .map(
            (item) => `
          <NeoAccordionItem class="mt-4 first:mt-0" value="${item.value}">
            <NeoAccordionTrigger>${item.title}</NeoAccordionTrigger>
            <NeoAccordionContent>
              ${item.content}
            </NeoAccordionContent>
          </NeoAccordionItem>
        `,
          )
          .join('')}
      </NeoAccordion>
    `,
  }),
}
