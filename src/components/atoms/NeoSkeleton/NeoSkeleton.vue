<template>
  <div
    v-if="shape === 'text'"
    class="flex w-full flex-col gap-2"
    :role="role"
    :aria-label="ariaLabel"
    :aria-hidden="!ariaLabel && !role ? 'true' : undefined"
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

  <div
    v-else
    class="relative overflow-hidden"
    :class="rootClasses"
    :style="rootStyle"
    :role="role"
    :aria-label="ariaLabel"
    :aria-hidden="!ariaLabel && !role ? 'true' : undefined"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties, HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

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

const {
  width = undefined,
  height = undefined,
  radius = undefined,
  shape = 'rect',
  lines = 3,
  animated = true,
  variant = 'default',
  size = 'md',
  ariaLabel = undefined,
  role = undefined,
} = defineProps<NeoSkeletonProps>()

const sizePx = computed(() => {
  const map = { sm: 12, md: 16, lg: 20 } as const
  return map[size ?? 'md']
})

function toCssSize(v?: number | string): string | undefined {
  if (v === undefined) return undefined
  return typeof v === 'number' ? `${v}px` : v
}

const linesComputed = computed(() => Math.max(1, lines ?? 3))

const variantClass = computed(() => {
  const map = {
    default: 'bg-utility-dark/20',
    muted: 'bg-utility-dark/10',
    contrast: 'bg-black/20',
  } as const
  return map[variant ?? 'default']
})

const animatedClass = computed(() => (animated ? 'neo-shimmer' : ''))

const rootClasses = computed(() =>
  cn('rounded-md border-4 border-black', variantClass.value, animatedClass.value, {
    'inline-block align-middle': shape === 'inline',
    'rounded-full': shape === 'circle',
  }),
)

const rootStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  if (shape === 'circle') {
    const d = width ?? height ?? sizePx.value * 2
    style.width = toCssSize(d)
    style.height = toCssSize(d)
    style.borderRadius = '9999px'
  } else {
    style.width = toCssSize(width) ?? (shape === 'inline' ? toCssSize(sizePx.value * 6) : '100%')
    style.height = toCssSize(height) ?? toCssSize(sizePx.value)
    if (radius !== undefined) style.borderRadius = toCssSize(radius)
  }
  return style
})

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
