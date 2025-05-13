import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
import NeoToggle from './NeoToggle.vue'

const meta: Meta<typeof NeoToggle> = {
  title: 'Atoms/NeoToggle',
  component: NeoToggle,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The toggled state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the toggle',
    },
  },
  args: {
    id: 'demo-toggle',
    modelValue: false,
    disabled: false,
    ariaLabel: 'Toggle switch',
  },
}

export default meta
type Story = StoryObj<typeof NeoToggle>

export const Default: Story = {
  render: (args) => ({
    components: { NeoToggle },
    setup() {
      const isToggled = ref(args.modelValue);

      watch(() => args.modelValue, (newValue) => {
        isToggled.value = newValue;
      });

      return { args, isToggled }
    },
    template: `
      <NeoToggle v-bind="args" v-model="isToggled">
        Toggle Switch
      </NeoToggle>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A toggle switch in its default state.'
      }
    }
  }
}

export const Toggled: Story = {
  render: (args) => ({
    components: { NeoToggle },
    setup() {
      return { args }
    },
    template: `
      <NeoToggle v-bind="args" v-model="args.modelValue">
        Toggled Switch
      </NeoToggle>
    `,
  }),
  args: {
    modelValue: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { NeoToggle },
    setup() {
      return { args }
    },
    template: `
      <NeoToggle v-bind="args" v-model="args.modelValue">
        Disabled Toggle
      </NeoToggle>
    `,
  }),
  args: {
    disabled: true,
  },
}

export const DisabledToggled: Story = {
  render: (args) => ({
    components: { NeoToggle },
    setup() {
      return { args }
    },
    template: `
      <NeoToggle v-bind="args" v-model="args.modelValue">
        Disabled Toggled Switch
      </NeoToggle>
    `,
  }),
  args: {
    modelValue: true,
    disabled: true,
  },
}
