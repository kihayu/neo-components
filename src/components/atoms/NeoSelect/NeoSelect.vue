<template>
  <div class="relative h-fit w-fit">
    <div
      :id="id"
      class="font-primary select-reset relative z-10 appearance-none rounded-t-xl border-4 border-black bg-white px-4 py-2 pr-8 transition-all duration-200 select-none last:border-b-0 hover:cursor-pointer focus:outline-none focus-visible:outline-none active:scale-none"
      :class="{ 'rounded-b-none': selectOpen, 'rounded-b-xl': !selectOpen }"
      @click="onClick"
      role="combobox"
      aria-haspopup="listbox"
      :aria-label="label"
      :aria-expanded="selectOpen"
      :aria-controls="listId"
      tabindex="0"
      @keydown.enter="onClick"
      @keydown.space="onClick"
    >
      <slot />
    </div>
    <div class="pointer-events-none absolute top-1/2 right-2 z-20 -translate-x-1 -translate-y-1.5">
      <svg
        class="transition-transform duration-200"
        :class="{ 'rotate-180': selectOpen }"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

export interface NeoSelectProps {
  id: string
  label: string
  open?: boolean
  listId?: string
}

const props = withDefaults(defineProps<NeoSelectProps>(), {
  id: '',
  label: '',
  open: false,
})

const listId = computed(() => props.listId || `${props.id}-list`)

const selectOpen = ref(props.open)

const onClick = () => {
  selectOpen.value = !selectOpen.value
}

interface NeoSelectEmits {
  (event: 'update:selectOpen', value: boolean): void
}
const emit = defineEmits<NeoSelectEmits>()

watch(
  () => props.open,
  () => {
    selectOpen.value = props.open
  },
)

watch(selectOpen, () => {
  emit('update:selectOpen', selectOpen.value)
})
</script>
