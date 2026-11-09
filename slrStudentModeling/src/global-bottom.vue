<script setup lang="ts">
import { useNav } from '@slidev/client'
import seedrandom from 'seedrandom'
/**
 * A new glow effect system powered by blured polygons
 *
 * Credits to @pi0 @Atinux
 *
 * Properties:
 * - glow: 'left' | 'right' | 'top' | 'bottom' | 'full' -  Distribution of the polygons points
 * - glowOpacity: number - Opacity of the polygons (4)
 * - glowHue: number - Hue shift for the polygons (default: 0)
 * - glowSeed: string | false - Seed for the stable random distribution (default: 'default')
 * - glowColor: string | string[] - Named color, or list of named colors, for the polygons
 * - glowColors: string | string[] - Alias of glowColor
 */
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import AskSlides from './components/AskSlides.vue'

const { currentSlideRoute, currentFrontmatter } = useNav()

export type Range = [number, number]

export type Distribution =
  | 'full'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'topmost'

/**
 * Palette of colors that can be referenced by name from slide frontmatter.
 *
 * Usage in a slide:
 *   ---
 *   glowColor: emerald
 *   # or, to control each polygon layer individually:
 *   glowColors: [emerald, sky, lime]
 *   ---
 */
const GLOW_COLORS = {
  green: '#00DC82',
  emerald: '#10b981',
  teal: '#14b8a6',
  cyan: '#06b6d4',
  sky: '#0ea5e9',
  blue: '#2f96ad',
  indigo: '#6366f1',
  violet: '#6d28d9',
  purple: '#7e22ce',
  pink: '#ec4899',
  rose: '#f43f5e',
  red: '#ef4444',
  orange: '#f97316',
  amber: '#f59e0b',
  yellow: '#eab308',
  lime: '#a3e635',
} as const

export type GlowColorName = keyof typeof GLOW_COLORS

const DEFAULT_GLOW_COLORS: GlowColorName[] = ['green', 'blue', 'lime']
const COLOR_ANIM_DURATION = 2500

const formatter = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const distribution = computed(() => (formatter.value.glow || 'full') as Distribution)
const opacity = computed<number>(() => +(formatter.value.glowOpacity ?? 0.4))
const hue = computed<number>(() => +(formatter.value.glowHue || 40))
const seed = computed<string>(() => (formatter.value.glowSeed === 'false' || formatter.value.glowSeed === false)
  ? Date.now().toString()
  : formatter.value.glowSeed || 'default',
)
const overflow = 0.3
const disturb = 0.3
const disturbChance = 0.3

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

function normalizeColorName(value: unknown): GlowColorName | null {
  if (typeof value !== 'string') return null
  const name = value.trim().toLowerCase()
  return (name in GLOW_COLORS) ? (name as GlowColorName) : null
}

/** Color names picked from the current slide frontmatter. */
const colorList = computed<GlowColorName[]>(() => {
  const raw = formatter.value.glowColors ?? formatter.value.glowColor ?? formatter.value.color
  if (raw == null) return DEFAULT_GLOW_COLORS
  const arr = Array.isArray(raw) ? raw : String(raw).split(/[,\s]+/)
  const names = arr.map(normalizeColorName).filter((n): n is GlowColorName => !!n)
  return names.length ? names : DEFAULT_GLOW_COLORS
})

/** Always resolve to exactly 3 hex colors — one per polygon layer. */
const resolvedColors = computed<string[]>(() => {
  const list = colorList.value
  return [0, 1, 2].map(i => GLOW_COLORS[list[i % list.length]])
})

function parseColor(color: string): { r: number; g: number; b: number } {
  if (color.startsWith('rgb')) {
    const m = color.match(/rgba?\(([^)]+)\)/)
    if (m) {
      const [r, g, b] = m[1].split(',').map(s => parseFloat(s.trim()))
      return { r, g, b }
    }
  }
  let hex = color.replace('#', '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const n = parseInt(hex, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/** Linearly blend two CSS colors by t (0 = a, 1 = b). */
function mixColor(a: string, b: string, t: number): string {
  const ca = parseColor(a)
  const cb = parseColor(b)
  const r = Math.round(ca.r + (cb.r - ca.r) * t)
  const g = Math.round(ca.g + (cb.g - ca.g) * t)
  const bl = Math.round(ca.b + (cb.b - ca.b) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

// Previous palette, current palette, and interpolation progress (0 → 1).
const prevColors = ref<string[]>([])
const currentColors = ref<string[]>([])
const mixProgress = ref(1)
let rafId: number | null = null

function currentVisualColors(): string[] {
  if (currentColors.value.length === 0) return resolvedColors.value
  return currentColors.value.map((c, i) =>
    mixColor(prevColors.value[i] ?? c, c, mixProgress.value),
  )
}

function animateMix() {
  if (rafId) cancelAnimationFrame(rafId)
  const start = performance.now()
  function step(now: number) {
    const t = Math.min(1, (now - start) / COLOR_ANIM_DURATION)
    mixProgress.value = 1 - Math.pow(1 - t, 3) // easeOutCubic
    rafId = t < 1 ? requestAnimationFrame(step) : null
  }
  rafId = requestAnimationFrame(step)
}

// Whenever the slide palette changes, blend from the currently visible state
// into the new palette — i.e. the two colors are mixed during the transition.
watch(resolvedColors, (newColors) => {
  if (currentColors.value.length === 0) {
    // First render — snap directly to the configured palette.
    prevColors.value = [...newColors]
    currentColors.value = [...newColors]
    mixProgress.value = 1
    return
  }
  if (arraysEqual(newColors, currentColors.value)) {
    // Same palette (e.g. navigating between slides that share colors) — no-op.
    return
  }
  // Freeze the currently visible color so we transition from it, rather than
  // from the previous target.
  prevColors.value = currentVisualColors()
  currentColors.value = [...newColors]
  mixProgress.value = 0
  animateMix()
}, { immediate: true })

/** Colors actually rendered on each polygon layer, blended by `mixProgress`. */
const layerColors = computed<string[]>(() => {
  if (currentColors.value.length === 0) return resolvedColors.value
  return currentColors.value.map((c, i) =>
    mixColor(prevColors.value[i] ?? c, c, mixProgress.value),
  )
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})

// ---------------------------------------------------------------------------
// Polygon distribution
// ---------------------------------------------------------------------------

function distributionToLimits(distribution: Distribution) {
  const min = -0.2
  const max = 1.2
  let x: Range = [min, max]
  let y: Range = [min, max]

  function intersection(a: Range, b: Range): Range {
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
  }

  const limits = distribution.split('-')

  for (const limit of limits) {
    switch (limit) {
      case 'topmost':
        y = intersection(y, [-0.5, 0])
        break
      case 'top':
        y = intersection(y, [min, 0.6])
        break
      case 'bottom':
        y = intersection(y, [0.4, max])
        break
      case 'left':
        x = intersection(x, [min, 0.6])
        break
      case 'right':
        x = intersection(x, [0.4, max])
        break
      case 'xcenter':
        x = intersection(x, [0.25, 0.75])
        break
      case 'ycenter':
        y = intersection(y, [0.25, 0.75])
        break
      case 'center':
        x = intersection(x, [0.25, 0.75])
        y = intersection(y, [0.25, 0.75])
        break
      case 'full':
        x = intersection(x, [0, 1])
        y = intersection(y, [0, 1])
        break
      default:
        break
    }
  }

  return { x, y }
}

function distance2([x1, y1]: Range, [x2, y2]: Range) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2
}

function usePloy(number = 16) {
  function getPoints(): Range[] {
    const limits = distributionToLimits(distribution.value)
    const rng = seedrandom(`${seed.value}-${currentSlideRoute.value.no}`)
    function randomBetween([a, b]: Range) {
      return rng() * (b - a) + a
    }
    function applyOverflow(random: number, overflow: number) {
      random = random * (1 + overflow * 2) - overflow
      return rng() < disturbChance ? random + (rng() - 0.5) * disturb : random
    }
    return Array.from({ length: number })
      .fill(0)
      .map(() => [
        applyOverflow(randomBetween(limits.x), overflow),
        applyOverflow(randomBetween(limits.y), overflow),
      ])
  }

  const points = ref(getPoints())
  const poly = computed(() => points.value.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', '))

  function jumpPoints() {
    const newPoints = new Set(getPoints())
    points.value = points.value.map((o) => {
      let minDistance = Number.POSITIVE_INFINITY
      let closest: Range | undefined
      for (const n of newPoints) {
        const d = distance2(o, n)
        if (d < minDistance) {
          minDistance = d
          closest = n
        }
      }
      newPoints.delete(closest)
      return closest
    })
  }

  watch(currentSlideRoute, () => {
    jumpPoints()
  })

  return poly
}

const poly1 = usePloy(10)
const poly2 = usePloy(6)
const poly3 = usePloy(3)
</script>

<template>
  <div class="bg transform-gpu overflow-hidden pointer-events-none"
    :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }" aria-hidden="true">
    <div class="clip" :style="{
      background: `linear-gradient(to right, ${layerColors[0]}, rgba(255,255,255,0.1))`,
      clipPath: `polygon(${poly1})`,
      opacity: opacity,
    }" />
    <div class="clip" :style="{
      background: `linear-gradient(to left, ${layerColors[1]}, rgba(255,255,255,0.1))`,
      clipPath: `polygon(${poly2})`,
      opacity: opacity,
    }" />
    <div class="clip" :style="{
      background: `linear-gradient(to top, ${layerColors[2]}, rgba(255,255,255,0.1))`,
      clipPath: `polygon(${poly3})`,
      opacity: 0.2,
    }" />
  </div>
  <div class="slidev-layout relative z-10">
    <slot />
    <div class="page-number w-full flex items-center justfiy-center absolute bottom-4 left-4 text-sm opacity-50">
      <SlideCurrentNo /> /
      <SlidesTotal />
      <!-- <AskSlides class="ms-4" /> -->
      <div v-if="currentFrontmatter.part" class="ms-auto me-10">Section: {{ currentFrontmatter.part }}</div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  transition: filter 2.5s ease;
  position: absolute;
  inset: 0;
  z-index: -10;
}

/* Background is driven per-frame by the color mixer, so it must NOT be
   transitioned — otherwise the browser would fight the rAF animation. */
.clip {
  transition: clip-path 2.5s ease, opacity 2.5s ease;
  clip-path: circle(75%);
  aspect-ratio: 16 / 9;
  position: absolute;
  inset: 0;
}

.light .clip {
  opacity: 1 !important;
}
</style>
