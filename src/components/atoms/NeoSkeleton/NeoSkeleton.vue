<template>
  <!-- Text shape: render multiple lines -->
  <div
    v-if="shape === 'text'"
    class="flex w-full flex-col gap-2"
    :class="props.class"
    :role="props.role"
    :aria-label="props.ariaLabel"
    :aria-hidden="!props.ariaLabel && !props.role ? 'true' : undefined"
  >
    <div
      v-for="n in linesComputed"
      :key="n"
      class="relative overflow-hidden rounded-md border-4 border-black"
      :class="[variantClass, animatedClass]"
      :style="lineStyle(n)"
      aria-hidden="true"
    />
  </div>

  <!-- Rect/Circle/Inline -->
  <div
    v-else
    class="relative overflow-hidden"
    :class="[rootClasses, props.class]"
    :style="rootStyle"
    :role="props.role"
    :aria-label="props.ariaLabel"
    :aria-hidden="!props.ariaLabel && !props.role ? 'true' : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// Local props interface
export type NeoSize = 'sm' | 'md' | 'lg'
export interface NeoSkeletonProps {
  width?: number | string
  height?: number | string
  radius?: number | string
  shape?: 'rect' | 'text' | 'circle' | 'inline'
  lines?: number
  animated?: boolean
  variant?: 'default' | 'muted' | 'contrast'
  size?: NeoSize
  ariaLabel?: string
  role?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<NeoSkeletonProps>(), {
  width: undefined,
  height: undefined,
  radius: undefined,
  shape: 'rect',
  lines: 3,
  animated: true,
  variant: 'default',
  size: 'md',
  ariaLabel: undefined,
  role: undefined,
  class: undefined,
})

/** Helpers */
const shape = computed(() => props.shape)
const sizePx = computed(() => {
  const map = { sm: 12, md: 16, lg: 20 } as const
  return map[props.size ?? 'md']
})

function toCssSize(v?: number | string): string | undefined {
  if (v === undefined) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const linesComputed = computed(() => Math.max(1, props.lines ?? 3))

/** Variants */
const variantClass = computed(() => {
  const map = {
    default: 'bg-utility-dark/20',
    muted: 'bg-utility-dark/10',
    contrast: 'bg-black/20',
  } as const
  return map[props.variant ?? 'default']
})

/** Animation */
const animatedClass = computed(() => (props.animated ? 'neo-shimmer' : ''))

/** Root classes for non-text shapes */
const rootClasses = computed(() =>
  cn('rounded-md border-4 border-black', variantClass.value, animatedClass.value, {
    'inline-block align-middle': props.shape === 'inline',
    'rounded-full': props.shape === 'circle',
  }),
)

/** Root inline style */
const rootStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  // Defaults per shape if not provided
  if (shape.value === 'circle') {
    const d = props.width ?? props.height ?? sizePx.value * 2
    style.width = toCssSize(d)
    style.height = toCssSize(d)
    style.borderRadius = '9999px'
  } else {
    // rect / inline
    style.width =
      toCssSize(props.width) ?? (shape.value === 'inline' ? toCssSize(sizePx.value * 6) : '100%')
    style.height = toCssSize(props.height) ?? toCssSize(sizePx.value)
    if (props.radius !== undefined) style.borderRadius = toCssSize(props.radius)
  }
  return style
})

/** Line style for text shape */
const lineStyle = (n: number): CSSProperties => {
  const isLast = n === linesComputed.value
  const width = isLast ? '60%' : '100%'
  return {
    width,
    height: toCssSize(sizePx.value * 0.9),
  }
}
</script>

<style scoped>
/* Shimmer overlay */
.neo-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: neo-skeleton-shimmer 1.25s linear infinite;
}

@keyframes neo-skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .neo-shimmer::after {
    animation: none !important;
  }
}
</style>
