import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import NeoToastProvider from '@/components/ui/toast/NeoToastProvider.vue'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'

const meta: Meta = {
  title: 'UI/NeoToast',
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const BasicQueue: Story = {
  render: () => ({
    components: { NeoToastProvider, NeoButton },
    setup() {
      const provider = ref<InstanceType<typeof NeoToastProvider> | null>(null)

      const notify = (variant: 'default' | 'info' | 'success' | 'warning' | 'error') => {
        provider.value?.push({
          title: variant === 'default' ? 'Notification' : variant.toUpperCase(),
          description:
            variant === 'default' ? 'This is a toast notification' : `This is a ${variant} toast`,
          variant,
          closable: true,
          actionText: 'Action',
          role: variant === 'error' ? 'alert' : 'status',
        })
      }

      const spam = () => {
        const variants: Array<'default' | 'info' | 'success' | 'warning' | 'error'> = [
          'default',
          'info',
          'success',
          'warning',
          'error',
        ]
        variants.forEach((v) => notify(v))
      }

      return { provider, notify, spam }
    },
    template: `
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <NeoButton size="sm" @click="notify('default')">Default</NeoButton>
          <NeoButton size="sm" @click="notify('info')">Info</NeoButton>
          <NeoButton size="sm" @click="notify('success')">Success</NeoButton>
          <NeoButton size="sm" @click="notify('warning')">Warning</NeoButton>
          <NeoButton size="sm" @click="notify('error')">Error</NeoButton>
          <NeoButton size="sm" @click="spam">Spam (5)</NeoButton>
        </div>

        <!-- Provider renders viewport and manages queue -->
        <NeoToastProvider ref="provider" :max="3" :duration="2500" position="top-right" />
      </div>
    `,
  }),
}

export const Positions: Story = {
  render: () => ({
    components: { NeoToastProvider, NeoButton },
    setup() {
      const topLeft = ref<InstanceType<typeof NeoToastProvider> | null>(null)
      const topCenter = ref<InstanceType<typeof NeoToastProvider> | null>(null)
      const bottomRight = ref<InstanceType<typeof NeoToastProvider> | null>(null)

      const pushAt = (refEl: InstanceType<typeof NeoToastProvider> | null, label: string) => {
        refEl?.push({
          title: label,
          description: 'Positioned provider demo',
          variant: 'default',
        })
      }

      return { topLeft, topCenter, bottomRight, pushAt }
    },
    template: `
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <NeoButton size="sm" @click="pushAt(topLeft, 'Top Left')">Top Left</NeoButton>
          <NeoButton size="sm" @click="pushAt(topCenter, 'Top Center')">Top Center</NeoButton>
          <NeoButton size="sm" @click="pushAt(bottomRight, 'Bottom Right')">Bottom Right</NeoButton>
        </div>

        <NeoToastProvider ref="topLeft" position="top-left" :duration="2000" />
        <NeoToastProvider ref="topCenter" position="top-center" :duration="2000" />
        <NeoToastProvider ref="bottomRight" position="bottom-right" :duration="2000" />
      </div>
    `,
  }),
}
