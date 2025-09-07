<template>
  <DropdownMenuRoot :open="openState" :modal="props.modal" @update:open="onOpenChange">
    <!-- Trigger -->
    <DropdownMenuTrigger as-child>
      <slot name="trigger">
        <NeoButton>
          Menu
          <ChevronDown class="size-4" />
        </NeoButton>
      </slot>
    </DropdownMenuTrigger>

    <!-- Content -->
    <DropdownMenuContent
      :class="contentClass"
      :align="props.align"
      :side="props.side"
      :side-offset="props.sideOffset"
      :aria-label="props.ariaLabel"
      role="menu"
    >
      <slot name="content" />

      <!-- Render from items prop when provided -->
      <template v-if="props.items?.length">
        <template v-for="(it, idx) in props.items" :key="idx">
          <!-- Label -->
          <DropdownMenuLabel v-if="it.type === 'label'">
            <slot name="label" :text="it.label">{{ it.label }}</slot>
          </DropdownMenuLabel>

          <!-- Separator -->
          <DropdownMenuSeparator v-else-if="it.type === 'separator'" />

          <!-- Group (semantic only for now) -->
          <DropdownMenuGroup v-else-if="it.type === 'group'">
            <slot name="group" :id="it.group">
              <span class="px-2 py-1.5 text-xs font-bold tracking-wide text-black/60 uppercase">
                {{ it.group || it.label }}
              </span>
            </slot>
          </DropdownMenuGroup>

          <!-- Checkbox item -->
          <DropdownMenuCheckboxItem
            v-else-if="it.type === 'checkbox'"
            :disabled="!!it.disabled"
            :checked="isCheckboxChecked(it)"
            class="data-[state=checked]:bg-primary focus-visible:outline-primary cursor-pointer rounded-lg border-4 border-transparent px-2 py-1.5 font-bold focus-visible:outline-2 data-[state=checked]:text-black"
            @update:checked="onCheckboxToggle(it)"
            @select.prevent
          >
            <div class="flex items-center gap-2">
              <component v-if="it.icon" :is="it.icon" class="size-4" />
              <slot name="item" :item="it" :selected="isCheckboxChecked(it)">
                <span>{{ it.label }}</span>
              </slot>
            </div>
          </DropdownMenuCheckboxItem>

          <!-- Radio item -->
          <DropdownMenuRadioGroup
            v-else-if="it.type === 'radio'"
            :value="radioGroupValue()"
            @update:value="onRadioChange"
          >
            <DropdownMenuRadioItem
              :value="String(it.value ?? it.label)"
              :disabled="!!it.disabled"
              class="data-[state=checked]:bg-primary focus-visible:outline-primary cursor-pointer rounded-lg border-4 border-transparent px-2 py-1.5 font-bold focus-visible:outline-2 data-[state=checked]:text-black"
            >
              <div class="flex items-center gap-2">
                <component v-if="it.icon" :is="it.icon" class="size-4" />
                <slot
                  name="item"
                  :item="it"
                  :selected="radioGroupValue() === String(it.value ?? it.label)"
                >
                  <span>{{ it.label }}</span>
                </slot>
              </div>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <!-- Regular item -->
          <DropdownMenuItem
            v-else
            :disabled="!!it.disabled"
            class="data-[state=checked]:bg-primary focus-visible:outline-primary cursor-pointer rounded-lg border-4 border-transparent px-2 py-1.5 font-bold focus-visible:outline-2 data-[state=checked]:text-black"
            @select="onSelect(it)"
          >
            <div class="flex items-center gap-2">
              <component v-if="it.icon" :is="it.icon" class="size-4" />
              <slot name="item" :item="it">
                <span>{{ it.label }}</span>
              </slot>
            </div>
          </DropdownMenuItem>
        </template>
      </template>

      <!-- Default slot for advanced composition (including nested submenus) -->
      <slot />
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { dropdownMenuContentVariants, type DropdownMenuContentVariants } from '.'
import type { HTMLAttributes, Component } from 'vue'
import NeoButton from '@/components/atoms/NeoButton/NeoButton.vue'

// Local types
export type NeoAlign = 'start' | 'center' | 'end'
export type NeoSide = 'top' | 'right' | 'bottom' | 'left'

export interface NeoDropdownMenuItem<T = string> {
  key?: string | number
  label: string
  value?: T
  disabled?: boolean
  /** Checkable or radio modes */
  type?: 'item' | 'checkbox' | 'radio' | 'separator' | 'label' | 'group'
  checked?: boolean
  icon?: Component
  /** Grouping id for radio items */
  group?: string
}

export interface NeoDropdownMenuProps<T = string> {
  open?: boolean
  modal?: boolean
  items?: NeoDropdownMenuItem<T>[]
  /** Align and side preferences */
  align?: NeoAlign
  side?: NeoSide
  sideOffset?: number
  /** Selection model for radio/checkbox items */
  radioValue?: string | null
  checkboxValues?: Record<string, boolean>
  /** ARIA/class */
  ariaLabel?: string
  role?: 'menu'
  class?: HTMLAttributes['class']
  size?: DropdownMenuContentVariants['size']
}

export interface NeoDropdownMenuEmits<T = string> {
  (e: 'update:open', open: boolean): void
  (e: 'select', payload: { item: NeoDropdownMenuItem<T> }): void
  (e: 'openChange', open: boolean): void
}

export type { NeoDropdownMenuItem as Item }

export type NeoDropdownMenuPropsContract = NeoDropdownMenuProps
export type NeoDropdownMenuEmitsContract = NeoDropdownMenuEmits

const props = withDefaults(defineProps<NeoDropdownMenuProps>(), {
  open: undefined,
  modal: true,
  items: () => [],
  align: 'start',
  side: 'bottom',
  sideOffset: 8,
  radioValue: null,
  checkboxValues: () => ({}) as Record<string, boolean>,
  ariaLabel: undefined,
  role: 'menu',
  class: undefined,
  size: 'md',
})

const emit = defineEmits<NeoDropdownMenuEmits>()

/**
 * Controlled/uncontrolled open state
 */
const openState = ref(!!props.open)
watch(
  () => props.open,
  (v) => {
    if (typeof v === 'boolean') openState.value = v
  },
  { immediate: true },
)
function onOpenChange(v: boolean) {
  openState.value = v
  emit('update:open', v)
  emit('openChange', v)
}

/**
 * Sizing via CVA
 */
const contentClass = computed(() =>
  dropdownMenuContentVariants({
    size: (props.size as NonNullable<DropdownMenuContentVariants['size']>) ?? 'md',
  }),
)

/**
 * Checkbox helpers
 */
function keyOf(item: NeoDropdownMenuItem) {
  return String(item.value ?? item.label)
}
function isCheckboxChecked(item: NeoDropdownMenuItem) {
  const key = keyOf(item)
  return !!props.checkboxValues?.[key]
}
function onCheckboxToggle(item: NeoDropdownMenuItem) {
  const key = keyOf(item)
  const next = { ...(props.checkboxValues ?? {}) }
  next[key] = !next[key]
  emit('select', { item })
  // Consumers manage checkboxValues as controlled state; we do not mutate props.
}

/**
 * Radio helpers
 */
function radioGroupValue() {
  return props.radioValue
}
function onRadioChange(val: string) {
  emit('select', { item: { label: val, value: val, type: 'radio' } })
}

/**
 * Regular item selection
 */
function onSelect(item: NeoDropdownMenuItem) {
  emit('select', { item })
  // Close on selection for standard items
  onOpenChange(false)
}
</script>
