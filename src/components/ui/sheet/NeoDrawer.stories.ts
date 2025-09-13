import type { Meta, StoryObj } from '@storybook/vue3'
import {
  NeoDrawer,
  NeoDrawerTrigger,
  NeoDrawerContent,
  NeoDrawerTitle,
  NeoDrawerDescription,
  NeoDrawerClose,
} from '@/components/ui/sheet'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'
import { X } from 'lucide-vue-next'

const meta: Meta = {
  title: 'UI/NeoDrawer',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ({
    components: {
      NeoDrawer,
      NeoDrawerTrigger,
      NeoDrawerContent,
      NeoDrawerTitle,
      NeoDrawerDescription,
      NeoDrawerClose,
      NeoButton,
      X,
    },
    template: `
      <NeoDrawer>
        <NeoDrawerTrigger>
          <NeoButton>Open Drawer</NeoButton>
        </NeoDrawerTrigger>

        <NeoDrawerContent size="md" side="right">
          <div class="flex items-start justify-between gap-4 p-4">
            <div>
              <NeoDrawerTitle>Right Drawer</NeoDrawerTitle>
              <NeoDrawerDescription>Off-canvas content anchored to the right.</NeoDrawerDescription>
            </div>
            <NeoDrawerClose>
              <NeoButton
                :extend-on-hover="false"
                size="sm"
                z-index="-1"
              >
                <X />
              </NeoButton>
            </NeoDrawerClose>
          </div>

          <div class="px-4 pb-4 space-y-2">
            <input class="w-full rounded-xl border-4 border-black px-3 py-2 font-bold" placeholder="Focusable input" />
            <NeoButton>
              Another focusable button
            </NeoButton>
          </div>
        </NeoDrawerContent>
      </NeoDrawer>
    `,
  }),
}

export const Sides: Story = {
  render: () => ({
    components: {
      NeoDrawer,
      NeoDrawerTrigger,
      NeoDrawerContent,
      NeoDrawerTitle,
      NeoDrawerDescription,
      NeoDrawerClose,
      NeoButton,
      X,
    },
    template: `
      <div class="flex flex-wrap gap-4">
        <NeoDrawer>
          <NeoDrawerTrigger><NeoButton>Left</NeoButton></NeoDrawerTrigger>
          <NeoDrawerContent size="sm" side="left">
            <div class="p-4">
              <NeoDrawerTitle>Left</NeoDrawerTitle>
              <NeoDrawerDescription>Anchored to left.</NeoDrawerDescription>
              <div class="mt-3">
                <NeoDrawerClose>
                  <NeoButton
                    :extend-on-hover="false"
                    size="sm"
                    z-index="-1"
                  >
                    <X />
                  </NeoButton>
                </NeoDrawerClose>
              </div>
            </div>
          </NeoDrawerContent>
        </NeoDrawer>

        <NeoDrawer>
          <NeoDrawerTrigger><NeoButton>Right</NeoButton></NeoDrawerTrigger>
          <NeoDrawerContent size="sm" side="right">
            <div class="p-4">
              <NeoDrawerTitle>Right</NeoDrawerTitle>
              <NeoDrawerDescription>Anchored to right.</NeoDrawerDescription>
              <div class="mt-3">
                <NeoDrawerClose>
                  <NeoButton
                    :extend-on-hover="false"
                    size="sm"
                    z-index="-1"
                  >
                    <X />
                  </NeoButton>
                </NeoDrawerClose>
              </div>
            </div>
          </NeoDrawerContent>
        </NeoDrawer>

        <NeoDrawer>
          <NeoDrawerTrigger><NeoButton>Top</NeoButton></NeoDrawerTrigger>
          <NeoDrawerContent size="md" side="top">
            <div class="p-4">
              <NeoDrawerTitle>Top</NeoDrawerTitle>
              <NeoDrawerDescription>Anchored to top.</NeoDrawerDescription>
              <div class="mt-3">
                <NeoDrawerClose>
                  <NeoButton
                    :extend-on-hover="false"
                    size="sm"
                    z-index="-1"
                  >
                    <X />
                  </NeoButton>
                </NeoDrawerClose>
              </div>
            </div>
          </NeoDrawerContent>
        </NeoDrawer>

        <NeoDrawer>
          <NeoDrawerTrigger><NeoButton>Bottom</NeoButton></NeoDrawerTrigger>
          <NeoDrawerContent size="md" side="bottom">
            <div class="p-4">
              <NeoDrawerTitle>Bottom</NeoDrawerTitle>
              <NeoDrawerDescription>Anchored to bottom.</NeoDrawerDescription>
              <div class="mt-3">
                <NeoDrawerClose>
                  <NeoButton
                    :extend-on-hover="false"
                    size="sm"
                    z-index="-1"
                  >
                    <X />
                  </NeoButton>
                </NeoDrawerClose>
              </div>
            </div>
          </NeoDrawerContent>
        </NeoDrawer>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: {
      NeoDrawer,
      NeoDrawerTrigger,
      NeoDrawerContent,
      NeoDrawerTitle,
      NeoDrawerDescription,
      NeoDrawerClose,
      NeoButton,
      X,
    },
    template: `
      <div class="flex gap-4">
        <NeoDrawer>
          <NeoDrawerTrigger><NeoButton>Small</NeoButton></NeoDrawerTrigger>
          <NeoDrawerContent size="sm" side="right">
            <div class="p-4">
              <NeoDrawerTitle>Small drawer</NeoDrawerTitle>
              <NeoDrawerDescription>Narrow content area.</NeoDrawerDescription>
              <div class="mt-3">
                <NeoDrawerClose>
                  <NeoButton
                    :extend-on-hover="false"
                    size="sm"
                    z-index="-1"
                  >
                    <X />
                  </NeoButton>
                </NeoDrawerClose>
              </div>
            </div>
          </NeoDrawerContent>
        </NeoDrawer&gt>

        <NeoDrawer>
          <NeoDrawerTrigger><NeoButton>Medium</NeoButton></NeoDrawerTrigger>
          <NeoDrawerContent size="md" side="right">
            <div class="p-4">
              <NeoDrawerTitle>Medium drawer</NeoDrawerTitle>
              <NeoDrawerDescription>Default width.</NeoDrawerDescription>
              <div class="mt-3">
                <NeoDrawerClose>
                  <NeoButton
                    :extend-on-hover="false"
                    size="sm"
                    z-index="-1"
                  >
                    <X />
                  </NeoButton>
                </NeoDrawerClose>
              </div>
            </div>
          </NeoDrawerContent>
        </NeoDrawer>

        <NeoDrawer>
          <NeoDrawerTrigger><NeoButton>Large</NeoButton></NeoDrawerTrigger>
          <NeoDrawerContent size="lg" side="right">
            <div class="p-4">
              <NeoDrawerTitle>Large drawer</NeoDrawerTitle>
              <NeoDrawerDescription>Spacious area for dense UI.</NeoDrawerDescription>
              <div class="mt-3">
                <NeoDrawerClose>
                  <NeoButton
                    :extend-on-hover="false"
                    size="sm"
                    z-index="-1"
                  >
                    <X />
                  </NeoButton>
                </NeoDrawerClose>
              </div>
            </div>
          </NeoDrawerContent>
        </NeoDrawer>
      </div>
    `,
  }),
}
