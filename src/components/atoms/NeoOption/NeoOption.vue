<template>
  <li
    role="option"
    :aria-selected="selected"
    class="font-primary focus-visible:outline-primary list-none border-b-4 border-black bg-white px-4 py-2 inset-shadow-black transition-all duration-200 last:border-b-0 hover:cursor-pointer hover:inset-shadow-sm focus:inset-shadow-sm focus-visible:outline-2"
    :class="{ 'pointer-events-none': !show }"
    :tabindex="show ? 0 : -1"
    @click="emit('click')"
    @keydown.enter="emit('click')"
    @keydown.space="emit('click')"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
export interface NeoOptionProps {
  show?: boolean
  selected?: boolean
}

const { show = false, selected = false } = defineProps<NeoOptionProps>()

interface NeoOptionsEmits {
  (event: 'click'): void
}

const emit = defineEmits<NeoOptionsEmits>()
</script>
