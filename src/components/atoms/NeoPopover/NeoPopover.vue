<template>
  <div class="relative inline-block">
    <!-- Trigger element -->
    <div
      ref="triggerRef"
      @click="togglePopover"
      @keydown.enter="togglePopover"
      @keydown.space="togglePopover"
      class="inline-block"
      :tabindex="disabled ? undefined : 0"
      role="button"
      :aria-expanded="open"
      :aria-controls="popoverId"
      :aria-disabled="disabled ? 'true' : undefined"
    >
      <slot name="trigger"></slot>
    </div>

    <!-- Popover content -->
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
          v-if="open"
          ref="popoverRef"
          :id="popoverId"
          class="font-primary fixed z-50 min-w-[200px] rounded-xl border-4 border-black bg-white p-3 text-black"
          :class="positionClass"
          :style="{ top: `${popoverTop}px`, left: `${popoverLeft}px` }"
          :role="role"
          aria-modal="true"
          :aria-labelledby="`${popoverId}-title`"
          :aria-describedby="`${popoverId}-desc`"
        >
          <div class="relative z-10" :id="`${popoverId}-desc`">
            <slot></slot>
          </div>

          <!-- Close button (if dismissible) -->
          <button
            v-if="dismissible"
            class="absolute top-2 right-2 z-20 rounded-full p-1 hover:bg-black/10 focus:outline-none focus-visible:ring-2"
            @click="closePopover"
            aria-label="Close popover"
          >
            <X :size="16" aria-hidden="true" />
          </button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { X } from 'lucide-vue-next'

type PopoverPosition = 'top' | 'right' | 'bottom' | 'left'
type PopoverRole = 'dialog' | 'menu' | 'listbox' | 'tooltip'

export interface NeoPopoverProps {
  modelValue?: boolean
  position?: PopoverPosition
  dismissible?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  offsetDistance?: number
  role?: PopoverRole
  id?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<NeoPopoverProps>(), {
  modelValue: false,
  position: 'bottom',
  dismissible: false,
  closeOnClickOutside: true,
  closeOnEsc: true,
  offsetDistance: 8,
  role: 'dialog',
  id: '',
  disabled: false,
})

interface NeoPopoverEmits {
  (e: 'update:modelValue', value: boolean): void
}

const emit = defineEmits<NeoPopoverEmits>()

const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const open = ref(props.modelValue)
const popoverTop = ref(0)
const popoverLeft = ref(0)
const popoverId = computed(() => props.id || `popover-${Math.random().toString(36).slice(2, 11)}`)

// Position classes and offset calculations
const positionClass = computed(() => {
  const baseClass = {
    top: 'origin-bottom',
    right: 'origin-left',
    bottom: 'origin-top',
    left: 'origin-right',
  }[props.position]
  return baseClass
})

// Toggle popover visibility
const togglePopover = () => {
  if (props.disabled) return
  open.value = !open.value
}

// Close popover
const closePopover = () => {
  open.value = false
}

// Update position when popover opens
const updatePosition = async () => {
  await nextTick()

  if (!triggerRef.value || !popoverRef.value || !open.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()

  // Window dimensions
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const gap = props.offsetDistance

  // Default positioning (for bottom)
  let top = 0
  let left = 0

  // Positioning based on specified direction
  switch (props.position) {
    case 'top':
      top = triggerRect.top - popoverRect.height - gap * 1.5
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
      left = triggerRect.right + gap
      break
    case 'bottom':
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2
      left = triggerRect.left - popoverRect.width - gap * 2.35
      break
    default: // Fallback to bottom if position is invalid
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2
      break
  }

  // Ensure popover stays within viewport boundaries
  const padding = 10

  // Horizontal constraints
  if (left < padding) {
    left = padding
  } else if (left + popoverRect.width > windowWidth - padding) {
    left = windowWidth - popoverRect.width - padding
  }

  // Vertical constraints
  if (top < padding) {
    top = padding
  } else if (top + popoverRect.height > windowHeight - padding) {
    top = windowHeight - popoverRect.height - padding
  }

  // Set the positions
  popoverTop.value = top
  popoverLeft.value = left
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (!open.value || !props.closeOnClickOutside) return

  const target = event.target as HTMLElement
  if (
    popoverRef.value &&
    !popoverRef.value.contains(target) &&
    triggerRef.value &&
    !triggerRef.value.contains(target)
  ) {
    closePopover()
  }
}

// Handle ESC key
const handleEscKey = (event: KeyboardEvent) => {
  if (open.value && props.closeOnEsc && event.key === 'Escape') {
    closePopover()
  }
}

// Watch for model changes
watch(
  () => props.modelValue,
  (newValue) => {
    open.value = newValue
    if (newValue) {
      nextTick(() => {
        updatePosition()
      })
    }
  },
)

// Emit changes to parent
watch(open, (newValue) => {
  emit('update:modelValue', newValue)
  if (newValue) {
    nextTick(() => {
      updatePosition()
    })
  }
})

// Set up resize observer to handle size changes
const setupResizeObserver = () => {
  if (!popoverRef.value) return
  
  // Use ResizeObserver to detect changes to the popover size
  const resizeObserver = new ResizeObserver(() => {
    if (open.value) updatePosition()
  })
  
  resizeObserver.observe(popoverRef.value)
  
  // Clean up on unmount
  onUnmounted(() => {
    resizeObserver.disconnect()
  })
}

// Set up and clean up event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscKey)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)
  
  // Add mutation observer to detect when content changes
  const observer = new MutationObserver(() => {
    if (open.value) updatePosition()
  })
  
  // Start observing when popover becomes visible
  watch(open, (newValue) => {
    if (newValue && popoverRef.value) {
      observer.observe(popoverRef.value, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      })
      setupResizeObserver()
    } else {
      observer.disconnect()
    }
  })
  
  // Clean up on unmount
  onUnmounted(() => {
    observer.disconnect()
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscKey)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})
</script>
