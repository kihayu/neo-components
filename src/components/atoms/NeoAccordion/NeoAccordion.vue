<template>
  <div class="w-full">
    <motion.div class="relative">
      <motion.button
        class="font-primary disabled:border-utility group relative z-10 flex w-full cursor-pointer items-center justify-between rounded-t-xl border-4 border-black bg-white px-4 py-3 transition-all duration-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:hover:bg-white"
        :class="{ 'rounded-b-xl': !isOpen }"
        :aria-expanded="isOpen"
        :aria-controls="contentId"
        :id="headerId"
        :disabled="disabled"
        :aria-disabled="disabled"
        @click="toggleAccordion"
        type="button"
      >
        <span class="group-disabled:text-utility font-semibold">
          <slot name="header">{{ title }}</slot>
        </span>
        <ChevronDown
          :size="24"
          class="group-disabled:text-utility transform transition-transform duration-300"
          :class="{ 'rotate-180': isOpen }"
          aria-hidden="true"
        />
      </motion.button>
    </motion.div>

    <AnimatePresence>
      <motion.div
        v-show="isOpen"
        :key="`accordion-${contentId}`"
        :animate="{
          y: isOpen ? 0 : -10,
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : '0px',
        }"
        :initial="false"
        :transition="{ duration: 0.3 }"
        class="overflow-hidden"
        :id="contentId"
        :aria-labelledby="headerId"
        role="region"
      >
        <div class="rounded-b-xl border-4 border-t-0 border-black px-4 py-3">
          <slot></slot>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'
import { ref, computed, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export interface NeoAccordionProps {
  title?: string
  modelValue?: boolean
  id?: string
  disabled?: boolean
  allowToggle?: boolean
}

const {
  title = 'Accordion Title',
  modelValue = false,
  id = '',
  disabled = false,
  allowToggle = true,
} = defineProps<NeoAccordionProps>()
interface NeoAccordionEmits {
  (e: 'update:modelValue', value: boolean): void
}

const emit = defineEmits<NeoAccordionEmits>()

const isOpen = ref(modelValue)
const baseId = computed(() => id || `accordion-${Math.random().toString(36).slice(2, 11)}`)
const headerId = computed(() => `${baseId.value}-header`)
const contentId = computed(() => `${baseId.value}-content`)

const toggleAccordion = () => {
  if (disabled) return
  if (!allowToggle && isOpen.value) return

  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
}

watch(
  () => modelValue,
  (newValue) => {
    isOpen.value = newValue
  },
)
</script>
