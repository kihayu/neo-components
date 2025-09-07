import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { NeoDropdownMenu } from '.'
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from 'reka-ui'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'
import type { Component } from 'vue'

interface Item {
  key?: string | number
  label: string
  value?: string
  disabled?: boolean
  type?: 'item' | 'checkbox' | 'radio' | 'separator' | 'label' | 'group'
  checked?: boolean
  icon?: Component
  group?: string
}

const meta: Meta = {
  title: 'UI/NeoDropdownMenu',
  component: NeoDropdownMenu,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const FromItemsProp: Story = {
  render: () => ({
    components: { NeoDropdownMenu, NeoButton },
    setup() {
      const open = ref(false)
      const checkboxValues = ref<Record<string, boolean>>({ bold: true })
      const radioValue = ref<string | null>('md')

      const items: Item[] = [
        { type: 'label', label: 'Formatting' },
        { type: 'checkbox', label: 'Bold', value: 'bold', checked: true },
        { type: 'checkbox', label: 'Italic', value: 'italic' },
        { type: 'separator', label: '' },
        { type: 'label', label: 'Size' },
        { type: 'radio', label: 'Small', value: 'sm', group: 'size' },
        { type: 'radio', label: 'Medium', value: 'md', group: 'size' },
        { type: 'radio', label: 'Large', value: 'lg', group: 'size' },
        { type: 'separator', label: '' },
        { type: 'item', label: 'Reset' },
      ]

      function onSelect(payload: { item: Item }) {
        const key = String(payload.item.value ?? payload.item.label)
        if (payload.item.type === 'checkbox') {
          checkboxValues.value = { ...checkboxValues.value, [key]: !checkboxValues.value[key] }
        } else if (payload.item.type === 'radio') {
          radioValue.value = key
        }
      }

      return { open, items, checkboxValues, radioValue, onSelect }
    },
    template: `
      <NeoDropdownMenu
        :open="open"
        :items="items"
        :checkbox-values="checkboxValues"
        :radio-value="radioValue"
        @select="onSelect"
        @update:open="open = $event"
      >
        <template #trigger>
          <NeoButton type="primary">Open Menu</NeoButton>
        </template>
      </NeoDropdownMenu>
    `,
  }),
}

export const WithNestedSubmenus: Story = {
  render: () => ({
    components: {
      NeoDropdownMenu,
      NeoButton,
      DropdownMenuSub,
      DropdownMenuSubTrigger,
      DropdownMenuSubContent,
      DropdownMenuItem,
      DropdownMenuSeparator,
      DropdownMenuLabel,
    },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <NeoDropdownMenu :open="open" @update:open="open = $event">
        <template #trigger>
          <NeoButton type="primary">Open Nested</NeoButton>
        </template>

        <DropdownMenuLabel>File</DropdownMenuLabel>
        <DropdownMenuItem @select.prevent>New File</DropdownMenuItem>
        <DropdownMenuItem @select.prevent>Open…</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem @select.prevent>PDF</DropdownMenuItem>
            <DropdownMenuItem @select.prevent>HTML</DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Images</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem @select.prevent>PNG</DropdownMenuItem>
                <DropdownMenuItem @select.prevent>JPEG</DropdownMenuItem>
                <DropdownMenuItem @select.prevent>SVG</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem @select.prevent>Quit</DropdownMenuItem>
      </NeoDropdownMenu>
    `,
  }),
}

export const TypeaheadAndKeyboardNav: Story = {
  render: () => ({
    components: {
      NeoDropdownMenu,
      NeoButton,
      DropdownMenuItem,
      DropdownMenuSeparator,
      DropdownMenuLabel,
    },
    setup() {
      const open = ref(false)
      const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      return { open, alpha }
    },
    template: `
      <NeoDropdownMenu :open="open" @update:open="open = $event">
        <template #trigger>
          <NeoButton type="primary">Typeahead Demo</NeoButton>
        </template>

        <DropdownMenuLabel>Letters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          v-for="ch in alpha"
          :key="ch"
          @select.prevent
        >
          {{ ch }}
        </DropdownMenuItem>
      </NeoDropdownMenu>
    `,
  }),
}
