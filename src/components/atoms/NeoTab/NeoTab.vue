<template>
  <button
    :class="[
      'font-primary relative z-20 flex items-center border-t-4 border-r-4 border-b-0 border-black px-4 py-2 whitespace-nowrap transition-colors duration-100 first:rounded-tl-xl first:border-l-4 last:rounded-tr-xl',
      {
        'text-white': isSelected,
        'bg-white text-black hover:bg-gray-50': !isSelected && !disabled,
        'text-utility-light border-utility-light cursor-not-allowed': disabled,
        'cursor-pointer': !disabled,
      },
    ]"
    role="tab"
    :aria-selected="isSelected"
    :aria-controls="contentId"
    :id="id"
    :tabindex="isSelected ? 0 : -1"
    :disabled="disabled"
    @click="!disabled && onClick()"
    @keydown.enter="!disabled && onClick()"
    @keydown.space="!disabled && onClick()"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface NeoTabProps {
  id: string
  contentId: string
  selected?: boolean
  disabled?: boolean
}

const { id = '', contentId = '', selected = false, disabled = false } = defineProps<NeoTabProps>()

const isSelected = computed(() => selected)

interface NeoTabEmits {
  (e: 'select'): void
}

const emit = defineEmits<NeoTabEmits>()

const onClick = () => {
  emit('select')
}
</script>
