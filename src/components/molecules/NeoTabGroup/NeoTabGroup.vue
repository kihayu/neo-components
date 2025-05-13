<template>
  <!-- Tab list container -->
  <div ref="tablistRef" role="tablist" class="relative flex w-fit border-b-4 border-black">
    <!-- Animated selection indicator -->
    <AnimatePresence>
      <motion.div
        v-if="indicatorVisible"
        class="bg-primary absolute bottom-0 z-20 h-full"
        :class="{
          'rounded-tl-xl': indicatorAtStart,
          'rounded-tr-xl': indicatorAtEnd,
        }"
        :animate="{
          width: `${indicatorWidth}px`,
          x: indicatorLeft,
        }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }"
      ></motion.div>
    </AnimatePresence>
    <div class="z-30 flex">
      <slot></slot>
    </div>
  </div>

  <div class="border-4 border-t-0 border-black p-4" :style="{ width: `${tablistWidth}px` }">
    <slot name="panels"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, watch } from 'vue'
import { AnimatePresence, motion } from 'motion-v'

export interface NeoTabGroupProps {
  selectedTabIndex: number
}

const props = withDefaults(defineProps<NeoTabGroupProps>(), {
  selectedTabIndex: 0,
})

defineEmits<{
  (e: 'update:selectedTabIndex', value: number): void
}>()

const tablistRef = ref<HTMLElement | null>(null)
const tablistWidth = ref(0)

const indicatorLeft = ref(0)
const indicatorWidth = ref(0)
const indicatorVisible = ref(false)
const indicatorAtStart = ref(false)
const indicatorAtEnd = ref(false)

/**
 * Update the position and dimensions of the selection indicator
 * based on the currently selected tab
 */
const updateIndicator = () => {
  if (!tablistRef.value) return

  tablistWidth.value = tablistRef.value.offsetWidth

  const tabs = Array.from(tablistRef.value.querySelectorAll('[role="tab"]'))
  if (tabs.length === 0 || props.selectedTabIndex >= tabs.length) {
    indicatorVisible.value = false
    return
  }

  const selectedTab = tabs[props.selectedTabIndex] as HTMLElement
  if (!selectedTab) {
    indicatorVisible.value = false
    return
  }

  const tabRect = selectedTab.getBoundingClientRect()

  indicatorLeft.value = selectedTab.offsetLeft
  indicatorWidth.value = tabRect.width
  indicatorVisible.value = true

  indicatorAtStart.value = props.selectedTabIndex === 0
  indicatorAtEnd.value = props.selectedTabIndex === tabs.length - 1
}

watch(
  () => props.selectedTabIndex,
  () => {
    updateIndicator()
  },
  { immediate: true },
)

onMounted(() => {
  updateIndicator()
})

onUpdated(() => {
  updateIndicator()
})
</script>
