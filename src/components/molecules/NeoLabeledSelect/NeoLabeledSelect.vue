<template>
  <NeoLabel :forId="id">
    <slot name="label">Custom Select</slot>
  </NeoLabel>
  <div class="relative">
    <NeoSelect
      v-model="model"
      ref="selectRef"
      :id="id"
      :open="selectOpen"
      :label="labelText"
      :listId="listboxId"
      @update:select-open="selectOpen = $event"
    >
      {{ slotText }}
    </NeoSelect>

    <ul
      ref="listRef"
      :id="listboxId"
      class="neo-select-list absolute max-h-52 max-w-full overflow-y-auto rounded-b-xl border-x-4 border-b-4 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-in-out"
      :style="{
        width: dropdownWidth + 'px',
        transform: selectOpen ? 'translateY(0)' : 'translateY(-10px)',
      }"
      :class="{ 'opacity-100': selectOpen }"
      :aria-expanded="selectOpen"
      role="listbox"
      :aria-hidden="!selectOpen"
    >
      <NeoOption
        v-for="option in options"
        :key="option"
        :show="selectOpen"
        @click="selectOption(option)"
      >
        {{ option }}
      </NeoOption>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NeoLabel from '@/components/atoms/NeoLabel/NeoLabel.vue'
import NeoOption from '@/components/atoms/NeoOption/NeoOption.vue'
import NeoSelect from '@/components/atoms/NeoSelect/NeoSelect.vue'
import { ref, onMounted, onUpdated, watch, onUnmounted, useSlots, computed } from 'vue'

export interface NeoLabeledSelectProps {
  id: string
  options: Array<string>
}

const { id } = defineProps<NeoLabeledSelectProps>()
const selectRef = ref<InstanceType<typeof NeoSelect> | null>(null)
const dropdownWidth = ref(0)

const updateDropdownWidth = () => {
  if (!selectRef.value?.$el) {
    return
  }

  const selectElement = selectRef.value.$el as HTMLSelectElement
  dropdownWidth.value = selectElement.offsetWidth
}

const model = defineModel<string>()
const selectOpen = ref(false)
const slots = useSlots()
const labelText = ref('')
const slotText = ref('')
const originText = ref('')
const listboxId = computed(() => `${id}-listbox`)

const selectOption = (option: string) => {
  model.value = option
  selectOpen.value = false
  slotText.value = option
}

onMounted(() => {
  updateDropdownWidth()
  const defaultSlot = slots.default?.()
  const text = defaultSlot?.[0].children?.toString().trim() || 'Select an option'
  slotText.value = text
  originText.value = text
  labelText.value = slots.label?.()[0].children?.toString().trim() || 'Select'

  window.addEventListener('resize', updateDropdownWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownWidth)
})

onUpdated(() => {
  updateDropdownWidth()
})

watch(selectOpen, () => {
  if (selectOpen.value) {
    updateDropdownWidth()
  }
})
</script>

<style>
.neo-select-list {
  scrollbar-width: none;
}
</style>
