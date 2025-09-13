import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import {
  NeoDialog,
  NeoDialogTrigger,
  NeoDialogContent,
  NeoDialogTitle,
  NeoDialogDescription,
  NeoDialogClose,
} from './'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'
import { X } from 'lucide-vue-next'

const meta: Meta = {
  title: 'UI/NeoDialog',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: {
      NeoDialog,
      NeoDialogTrigger,
      NeoDialogContent,
      NeoDialogTitle,
      NeoDialogDescription,
      NeoDialogClose,
      NeoButton,
      X,
    },
    template: `
      <NeoDialog>
        <template #trigger>
          <NeoButton>Open Dialog</NeoButton>
        </template>

        <template #title>
          Basic Dialog
        </template>

        <template #description>
          Focus is trapped while open. Press Esc to close or click the button below.
        </template>

        <input class="w-full rounded-xl border-4 border-black px-3 py-2 font-bold" placeholder="Focusable input" />
        <NeoButton>
          Another focusable button
        </NeoButton>
      </NeoDialog>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: {
      NeoDialog,
      NeoDialogTrigger,
      NeoDialogContent,
      NeoDialogTitle,
      NeoDialogDescription,
      NeoDialogClose,
      NeoButton,
    },
    template: `
      <div class="flex gap-4">
        <NeoDialog size="sm">
          <template #trigger>
            <NeoButton size="sm">Open (sm)</NeoButton>
          </template>

          <template #title>
            Small
          </template>

          <template #description>
            Compact dialog content.
          </template>
        </NeoDialog>

        <NeoDialog size="md">
          <template #trigger>
            <NeoButton>Open (md)</NeoButton>
          </template>

          <template #title>
            Medium
          </template>

          <template #description>
            Default dialog content.
          </template>
        </NeoDialog>

        <NeoDialog size="lg">
          <template #trigger>
            <NeoButton size="lg">Open (lg)</NeoButton>
          </template>

          <template #title>
            Large
          </template>

          <template #description>
            Spacious dialog for dense content.
          </template>
        </NeoDialog>
      </div>
    `,
  }),
}

export const ControlledOpen: Story = {
  render: () => ({
    components: {
      NeoDialog,
      NeoDialogTrigger,
      NeoDialogContent,
      NeoDialogTitle,
      NeoDialogDescription,
      NeoDialogClose,
      NeoButton,
    },
    setup() {
      // reka-ui DialogRoot supports open / onOpenChange; here we rely on Trigger to toggle
      const opened = ref(false)
      return { opened }
    },
    template: `
      <NeoDialog :open="opened" @update:open="opened = $event">
        <template #trigger>
          <div class="flex items-center gap-3">
            <NeoButton @click="opened = true">Open Controlled</NeoButton>
            <span class="text-sm">State: {{ opened ? 'open' : 'closed' }}</span>
          </div>
        </template>

        <template #title>
          Controlled Dialog
        </template>

        <template #description>
          External open state can be bound.
        </template>
      </NeoDialog>
    `,
  }),
}
