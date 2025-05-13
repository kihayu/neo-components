<template>
  <div
    class="inline-flex items-center justify-center"
    :class="[colorClass]"
    :style="{ transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined }"
    :aria-hidden="ariaHidden"
    :role="ariaHidden ? undefined : 'img'"
    :aria-label="ariaHidden ? undefined : ariaLabel"
  >
    <!-- Clone and modify the icon if using Lucide -->
    <slot v-if="!$slots.default || !isLucideIcon" />
    <component v-else :is="iconComponent" :size="pixelSize" :stroke-width="strokeWidth" />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type IconColor = 'primary' | 'error' | 'success' | 'warning' | 'black' | 'white' | 'inherit'

export interface NeoIconProps {
  size?: IconSize
  color?: IconColor
  rotate?: number
  strokeWidth?: number
  ariaHidden?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<NeoIconProps>(), {
  size: 'md',
  color: 'black',
  rotate: 0,
  strokeWidth: 2,
  ariaHidden: true,
  ariaLabel: 'Icon',
})

const slots = useSlots()

const isLucideIcon = computed(() => {
  if (!slots.default) return false

  const slotContent = slots.default()
  if (slotContent.length !== 1) return false

  const component = slotContent[0]
  return (
    !!component.type &&
    typeof component.type === 'object' &&
    'render' in component.type &&
    'props' in component.type &&
    'size' in component.type.props &&
    'strokeWidth' in component.type.props
  )
})

const iconComponent = computed(() => {
  if (!slots.default || !isLucideIcon.value) return null

  const slotContent = slots.default()
  if (slotContent.length !== 1) return null

  return slotContent[0].type
})

const pixelSize = computed(() => {
  const sizes = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  }
  return sizes[props.size]
})

const colorClass = computed(() => {
  const colors = {
    primary: 'text-primary-500',
    error: 'text-red-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    black: 'text-black',
    white: 'text-white',
    inherit: 'text-inherit',
  }
  return colors[props.color]
})
</script>
