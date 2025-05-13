<template>
  <div class="relative inline-block">
    <div
      ref="triggerRef"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
      class="inline-block"
      aria-describedby="neo-tooltip"
    >
      <slot></slot>
    </div>
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isVisible"
          ref="tooltipRef"
          role="tooltip"
          id="neo-tooltip"
          :class="[
            'font-primary fixed z-50 rounded-xl border-4 border-black bg-white px-3 py-1.5 text-sm text-black',
            positionClass,
          ]"
          :style="{ top: `${tooltipTop}px`, left: `${tooltipLeft}px` }"
        >
          <div class="relative z-10">{{ text }}</div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export interface NeoTooltipProps {
  text: string
  position?: TooltipPosition
  offsetDistance?: number
  showDelay?: number
}

const props = withDefaults(defineProps<NeoTooltipProps>(), {
  text: '',
  position: 'top',
  offsetDistance: 8,
  showDelay: 200,
})

const isVisible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
let showTimeout: ReturnType<typeof setTimeout> | null = null

const tooltipTop = ref(0)
const tooltipLeft = ref(0)

const positionClass = computed(() => {
  return {
    top: 'transform origin-bottom',
    right: 'transform origin-left',
    bottom: 'transform origin-top',
    left: 'transform origin-right',
  }[props.position]
})

const showTooltip = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
  }

  showTimeout = setTimeout(() => {
    isVisible.value = true
    setTimeout(updatePosition, 0)
  }, props.showDelay)
}

const hideTooltip = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  isVisible.value = false
}

const updatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value || !isVisible.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  // Window dimensions
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const gap = props.offsetDistance

  let top = 0
  let left = 0

  // Positioning based on the desired position
  switch (props.position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - gap
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.right + gap
      break
    case 'bottom':
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.left - tooltipRect.width - gap * 1.5
      break
    default: // Fallback to top if position is invalid
      top = triggerRect.top - tooltipRect.height - gap
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
  }

  // Ensure tooltip stays within viewport boundaries
  const padding = 10

  // Horizontal constraints
  if (left < padding) {
    left = padding
  } else if (left + tooltipRect.width > windowWidth - padding) {
    left = windowWidth - tooltipRect.width - padding
  }

  // Vertical constraints
  if (top < padding) {
    top = padding
  } else if (top + tooltipRect.height > windowHeight - padding) {
    top = windowHeight - tooltipRect.height - padding
  }

  // Set the positions
  tooltipTop.value = top
  tooltipLeft.value = left
}

// Event listeners for window resize
const handleResize = () => {
  if (isVisible.value) {
    updatePosition()
  }
}

const setupResizeObserver = () => {
  if (!tooltipRef.value) return

  // Use ResizeObserver to detect changes to the tooltip size
  const resizeObserver = new ResizeObserver(() => {
    if (isVisible.value) updatePosition()
  })

  resizeObserver.observe(tooltipRef.value)

  // Clean up on unmount
  onBeforeUnmount(() => {
    resizeObserver.disconnect()
  })
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleResize, true)

  // Add mutation observer to detect when content changes
  const observer = new MutationObserver(() => {
    if (isVisible.value) updatePosition()
  })

  // Start observing when tooltip becomes visible
  const stopWatcher = watch(isVisible, (newValue: boolean) => {
    if (newValue && tooltipRef.value) {
      observer.observe(tooltipRef.value, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      })
      setupResizeObserver()
      // Run position update again after a short delay to ensure all content is rendered
      setTimeout(updatePosition, 50)
    } else {
      observer.disconnect()
    }
  })

  // Clean up on unmount
  onBeforeUnmount(() => {
    observer.disconnect()
    stopWatcher()
    if (showTimeout) {
      clearTimeout(showTimeout)
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleResize, true)
})
</script>
