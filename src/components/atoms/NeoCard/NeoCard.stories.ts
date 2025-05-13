import type { Meta, StoryObj } from '@storybook/vue3'

import NeoCard, { type NeoCardProps } from './NeoCard.vue'
import { expect, within } from '@storybook/test'

const meta = {
  title: 'Atoms/NeoCard',
  component: NeoCard,
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    footer: { control: 'text' },
  },
} satisfies Meta<typeof NeoCard>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  shadow: false,
  dismissible: false,
  header: 'Header Content',
  footer: 'Footer Content',
} as NeoCardProps

const renderFunction = (args: NeoCardProps) => ({
  components: { NeoCard },
  setup() {
    return { args }
  },
  template: `
    <NeoCard class="w-60 h-72" v-bind="args" />
  `,
})

const renderWithHeaderFunction = (args: NeoCardProps) => ({
  components: { NeoCard },
  setup() {
    return { args }
  },
  template: `
    <NeoCard class="w-60 h-72" v-bind="args">
      <template #header>
        {{ args.header }}
      </template>
    </NeoCard>
  `,
})

const renderWithFooterFunction = (args: NeoCardProps) => ({
  components: { NeoCard },
  setup() {
    return { args }
  },
  template: `
    <NeoCard class="w-60 h-72" v-bind="args">
      <template #footer>
        {{ args.footer }}
      </template>
    </NeoCard>
  `,
})

const renderWithHeaderAndFooterFunction = (args: NeoCardProps) => ({
  components: { NeoCard },
  setup() {
    return { args }
  },
  template: `
    <NeoCard class="w-60 h-72" v-bind="args">
      <template #header>
        {{ args.header }}
      </template>
      <template #footer>
        {{ args.footer }}
      </template>
    </NeoCard>
  `,
})

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderFunction(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole('region')
    await expect(card).toBeInTheDocument()
    const shadowContainer = canvas.getByTestId('card-shadow')
    await expect(shadowContainer).toBeInTheDocument()
  },
}

export const WithDismissible: Story = {
  args: {
    ...defaultArgs,
    dismissible: true,
  },
  render: (args) => renderFunction(args),
}

export const WithHeader: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderWithHeaderFunction(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole('region')
    await expect(card).toBeInTheDocument()
    await expect(canvas.getByText('Header Content')).toBeInTheDocument()
  },
}

export const WithFooter: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderWithFooterFunction(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole('region')
    await expect(card).toBeInTheDocument()
    const footerContent = canvas.getByText('Footer Content')
    await expect(footerContent).toBeInTheDocument()
  },
}

export const WithHeaderAndFooter: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => renderWithHeaderAndFooterFunction(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole('region')
    await expect(card).toBeInTheDocument()
    const headerContent = canvas.getByText('Header Content')
    await expect(headerContent).toBeInTheDocument()
    const footerContent = canvas.getByText('Footer Content')
    await expect(footerContent).toBeInTheDocument()
  },
}
