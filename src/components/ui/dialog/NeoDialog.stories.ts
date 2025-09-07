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
        <NeoDialogTrigger>
          <NeoButton>Open Dialog</NeoButton>
        </NeoDialogTrigger>

        <NeoDialogContent size="md" class="w-[28rem]">
          <div class="flex items-start justify-between gap-4">
            <div>
              <NeoDialogTitle>Basic Dialog</NeoDialogTitle>
              <NeoDialogDescription>
                Focus is trapped while open. Press Esc to close or click the button below.
              </NeoDialogDescription>
            </div>
            <NeoDialogClose>
              <NeoButton
                :extend-on-hover="false"
                size="sm"
                z-index="-1"
              >
                <X />
              </NeoButton>
            </NeoDialogClose>
          </div>

          <div class="mt-4 space-y-2">
            <input class="w-full rounded-xl border-4 border-black px-3 py-2 font-bold" placeholder="Focusable input" />
            <NeoButton>
              Another focusable button
            </NeoButton>
          </div>
        </NeoDialogContent>
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
        <NeoDialog>
          <NeoDialogTrigger>
            <NeoButton size="sm">Open (sm)</NeoButton>
          </NeoDialogTrigger>
          <NeoDialogContent size="sm" class="w-[20rem]">
            <NeoDialogTitle>Small</NeoDialogTitle>
            <NeoDialogDescription>Compact dialog content.</NeoDialogDescription>
            <div class="mt-4">
              <NeoDialogClose>
                <NeoButton size="sm">Close</NeoButton>
              </NeoDialogClose>
            </div>
          </NeoDialogContent>
        </NeoDialog>

        <NeoDialog>
          <NeoDialogTrigger>
            <NeoButton>Open (md)</NeoButton>
          </NeoDialogTrigger>
          <NeoDialogContent size="md" class="w-[28rem]">
            <NeoDialogTitle>Medium</NeoDialogTitle>
            <NeoDialogDescription>Default dialog content.</NeoDialogDescription>
            <div class="mt-4">
              <NeoDialogClose>
                <NeoButton size="sm">Close</NeoButton>
              </NeoDialogClose>
            </div>
          </NeoDialogContent>
        </NeoDialog>

        <NeoDialog>
          <NeoDialogTrigger>
            <NeoButton size="lg">Open (lg)</NeoButton>
          </NeoDialogTrigger>
          <NeoDialogContent size="lg" class="w-[36rem]">
            <NeoDialogTitle>Large</NeoDialogTitle>
            <NeoDialogDescription>Spacious dialog for dense content.</NeoDialogDescription>
            <div class="mt-4">
              <NeoDialogClose>
                <NeoButton size="sm">Close</NeoButton>
              </NeoDialogClose>
            </div>
          </NeoDialogContent>
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
        <div class="flex items-center gap-3">
          <NeoDialogTrigger>
            <NeoButton @click="opened = true">Open Controlled</NeoButton>
          </NeoDialogTrigger>
          <span class="text-sm">State: {{ opened ? 'open' : 'closed' }}</span>
        </div>

        <NeoDialogContent size="md" class="w-[28rem]">
          <NeoDialogTitle>Controlled Dialog</NeoDialogTitle>
          <NeoDialogDescription>External open state can be bound.</NeoDialogDescription>
          <div class="mt-4 flex gap-2">
            <NeoDialogClose>
              <NeoButton size="sm" @click="opened = false">Close</NeoButton>
            </NeoDialogClose>
            <NeoButton size="sm" @click="opened = false" class="bg-white text-black">Dismiss</NeoButton>
          </div>
        </NeoDialogContent>
      </NeoDialog>
    `,
  }),
}
