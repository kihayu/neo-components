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
    <!-- Always keep the list in DOM for accessibility, but hide it visually when closed -->
    <ul
      ref="listRef"
      :id="listboxId"
      class="absolute max-h-52 max-w-full overflow-y-auto rounded-b-xl border-x-4 border-b-4"
      :style="{
        width: dropdownWidth + 'px',
        visibility: selectOpen ? 'visible' : 'hidden',
        opacity: selectOpen ? 1 : 0,
        transform: selectOpen ? 'translateY(0)' : 'translateY(-10px)',
        transition:
          'opacity 0.2s ease-in-out, transform 0.2s ease-in-out, visibility 0.2s ease-in-out',
      }"
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

const props = defineProps<NeoLabeledSelectProps>()

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
const listboxId = computed(() => `${props.id}-listbox`)

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
