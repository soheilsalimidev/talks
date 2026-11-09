<template>
  <div class="flex flex-col items-center gap-4 font-sans p-4">
    <div ref="reference" class="w-[200px] h-[200px]" />

    <div class="h-6 w-full max-w-[300px] flex items-center justify-center">
      <p class="text-sm text-center text-gray-800 truncate">
        {{ dialogue }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { ActorRig, CHARACTERS } from 'pixel-wizards-charachters'
import { useNav } from '@slidev/client'

const { currentFrontmatter } = useNav()
const el = useTemplateRef('reference')
const dialogue = ref('')

let rig: ActorRig | null = null
let runId = 0
let currentAudio: HTMLAudioElement | null = null
let lastGestureTime = 0

const VALID_EMOTIONS = [
  'neutral',
  'happy',
  'excited',
  'thinking',
  'encouraging',
  'sad',
  'surprised',
  'sleepy',
  'love',
  'confused',
  'proud',
  'shy'
] as const

const VALID_GESTURES = [
  'wave',
  'jump',
  'spin',
  'nod',
  'shake',
  'shrug',
  'point',
  'clap',
  'bounce',
  'nuzzle'
] as const

const VALID_LOCOMOTIONS = ['idle', 'walk', 'fly', 'roll'] as const
const VALID_VISEMES = ['rest', 'aa', 'mbp', 'u', 'l'] as const

type VisemeName = (typeof VALID_VISEMES)[number]

interface VisemeFrame {
  time: number
  viseme: VisemeName
  mouthOpen: number
}

interface RawVoicePart {
  text?: unknown
  audio?: unknown
  emotion?: unknown
  gesture?: unknown
  locomotion?: unknown
  speed?: unknown
  duration?: unknown
  visemeTrack?: unknown
}

interface VoicePart {
  text: string
  audio?: string
  emotion: string
  gesture: string | null
  locomotion: string
  speed: number
  duration: number
  providedVisemeTrack: VisemeFrame[]
}

const ENGLISH_VISEME_MAP: Record<string, VisemeName> = {
  a: 'aa',
  e: 'aa',
  i: 'aa',
  o: 'aa',
  y: 'aa',

  u: 'u',
  w: 'u',

  m: 'mbp',
  b: 'mbp',
  p: 'mbp',

  l: 'l',
  t: 'l',
  d: 'l',
  n: 'l',
  s: 'l',
  z: 'l',
  r: 'l',
  c: 'l',
  g: 'l',
  h: 'l',
  k: 'l',
  v: 'l',
  f: 'l',
  j: 'l',
  q: 'l',
  x: 'l'
}

onMounted(() => {
  if (!el.value) return

  if ((currentFrontmatter.value as { payload?: unknown } | undefined)?.payload) {
    rig = new ActorRig(CHARACTERS.robo, {
      size: 200,
      micro: { amount: 0.5, saccade: 0.5 }
    }).mount(el.value)

    rig.apply({
      emotion: 'neutral',
      locomotion: 'idle',
      speed: 1,
      viseme: 'rest',
      mouthOpen: 0
    })

    watch(
      () => (currentFrontmatter.value as { payload?: unknown } | undefined)?.payload,
      value => {
        void startSequence(value)
      },
      {
        deep: true,
        immediate: true
      }
    )
  }
})

onUnmounted(() => {
  runId++
  stopCurrentAudio()
  rig?.destroy()
})

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function normalizeParts(input: unknown): RawVoicePart[] {
  if (!input) return []

  if (Array.isArray(input)) {
    return input as RawVoicePart[]
  }

  if (typeof input !== 'object') return []

  const record = input as Record<string, unknown>

  if (Array.isArray(record.parts)) {
    return record.parts as RawVoicePart[]
  }

  if ('text' in record || 'audio' in record) {
    return [record as RawVoicePart]
  }

  return []
}

function constrainParts(rawParts: RawVoicePart[]): VoicePart[] {
  return rawParts.map(constrainPart)
}

function constrainPart(raw: RawVoicePart): VoicePart {
  const text = typeof raw.text === 'string' ? raw.text : ''
  const audio = typeof raw.audio === 'string' ? raw.audio : undefined

  const emotion = (VALID_EMOTIONS as readonly string[]).includes(raw.emotion as string)
    ? String(raw.emotion)
    : 'neutral'

  const locomotion = (VALID_LOCOMOTIONS as readonly string[]).includes(raw.locomotion as string)
    ? String(raw.locomotion)
    : 'idle'

  let gesture: string | null = null

  if (
    typeof raw.gesture === 'string' &&
    (VALID_GESTURES as readonly string[]).includes(raw.gesture)
  ) {
    const now = Date.now()

    if (now - lastGestureTime > 3000) {
      gesture = raw.gesture
      lastGestureTime = now
    }
  }

  const speedInput = Number(raw.speed)
  const speed = Number.isFinite(speedInput)
    ? Math.min(1.2, Math.max(0.6, speedInput))
    : 1

  const durationInput = Number(raw.duration)
  const duration =
    Number.isFinite(durationInput) && durationInput > 0
      ? durationInput
      : estimateDurationFromText(text)

  const providedVisemeTrack = normalizeProvidedVisemeTrack(raw.visemeTrack)

  return {
    text,
    audio,
    emotion,
    gesture,
    locomotion,
    speed,
    duration,
    providedVisemeTrack
  }
}

function normalizeProvidedVisemeTrack(rawTrack: unknown): VisemeFrame[] {
  if (!Array.isArray(rawTrack)) return []

  const valid = rawTrack.filter((frame): frame is VisemeFrame => {
    if (!isRecord(frame)) return false

    return (
      typeof frame.time === 'number' &&
      typeof frame.mouthOpen === 'number' &&
      (VALID_VISEMES as readonly string[]).includes(frame.viseme as string)
    )
  })

  return valid.sort((a, b) => a.time - b.time)
}

function estimateDurationFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1200, 650 + words * 380)
}

function englishTextToVisemeTrack(text: string, duration: number): VisemeFrame[] {
  const chars = text
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')

  if (!chars.length) {
    return [
      { time: 0, viseme: 'rest', mouthOpen: 0 },
      { time: duration, viseme: 'rest', mouthOpen: 0 }
    ]
  }

  const step = duration / chars.length

  const frames: VisemeFrame[] = chars.map((char, index) => {
    const viseme = ENGLISH_VISEME_MAP[char] ?? 'l'

    return {
      time: index * step,
      viseme,
      mouthOpen: mouthOpenForViseme(viseme)
    }
  })

  frames.push({
    time: duration,
    viseme: 'rest',
    mouthOpen: 0
  })

  return frames
}

function mouthOpenForViseme(viseme: VisemeName): number {
  if (viseme === 'aa') return 0.85
  if (viseme === 'u') return 0.6
  if (viseme === 'mbp') return 0.25
  if (viseme === 'l') return 0.5
  return 0
}

function getFakeFrame(text: string, elapsed: number): {
  viseme: VisemeName
  mouthOpen: number
} {
  const chars = text
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')

  if (!chars.length) {
    const open = Math.sin(elapsed / 120) > 0
    return {
      viseme: 'aa',
      mouthOpen: open ? 0.55 : 0.1
    }
  }

  const bucket = Math.floor(elapsed / 90)
  const char = chars[bucket % chars.length]
  const viseme = ENGLISH_VISEME_MAP[char] ?? 'aa'

  return {
    viseme,
    mouthOpen: mouthOpenForViseme(viseme)
  }
}

async function startSequence(input: unknown) {
  const id = ++runId

  stopCurrentAudio()
  dialogue.value = ''

  if (!rig) return

  const parts = constrainParts(normalizeParts(input))
  if (!parts.length) return

  for (const part of parts) {
    if (id !== runId || !rig) return

    await playPart(part, id)

    if (id !== runId) return

    await sleep(220, id)
  }
}

function playPart(part: VoicePart, id: number): Promise<void> {
  return new Promise(resolve => {
    if (!rig) {
      resolve()
      return
    }

    const activeRig = rig

    dialogue.value = part.text

    activeRig.apply({
      emotion: part.emotion as any,
      locomotion: part.locomotion as any,
      speed: part.speed,
      gesture: null
    })

    if (part.gesture) {
      activeRig.playGesture(part.gesture as any)
    }

    let audio: HTMLAudioElement | null = null
    let finished = false
    fallbackStarted = false
    usingAudio = false
    frameIndex = 0
    lastFakeBucket = -1

    let raf = 0
    let fallbackTimer: number | undefined
    let fallbackStarted = false
    let usingAudio = false
    let fallbackStart = performance.now()
    let frameIndex = 0
    let lastFakeBucket = -1

    const hasProvidedTrack = part.providedVisemeTrack.length > 0

    let track: VisemeFrame[] = hasProvidedTrack
      ? [...part.providedVisemeTrack]
      : englishTextToVisemeTrack(part.text, part.duration)

    function onEnded() {
      finish()
    }

    function onError() {
      startFallback()
    }

    function cleanup() {
      cancelAnimationFrame(raf)

      if (fallbackTimer !== undefined) {
        window.clearTimeout(fallbackTimer)
      }

      if (audio) {
        audio.removeEventListener('ended', onEnded)
        audio.removeEventListener('error', onError)
        audio.pause()
        audio.src = ''

        if (currentAudio === audio) {
          currentAudio = null
        }
      }
    }

    function finish() {
      if (finished) return

      finished = true
      cleanup()

      activeRig.apply({
        viseme: 'rest',
        mouthOpen: 0
      })

      resolve()
    }

    function startFallback() {
      if (finished || fallbackStarted) return

      fallbackStarted = true
      usingAudio = false
      fallbackStart = performance.now()

      fallbackTimer = window.setTimeout(finish, part.duration)

      startLoop()
    }

    function startLoop() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    function tick() {
      if (finished || id !== runId) {
        finish()
        return
      }

      const elapsed =
        usingAudio && audio && Number.isFinite(audio.currentTime)
          ? audio.currentTime * 1000
          : performance.now() - fallbackStart

      while (frameIndex < track.length && track[frameIndex].time <= elapsed) {
        const frame = track[frameIndex]

        activeRig.apply({
          viseme: frame.viseme as any,
          mouthOpen: frame.mouthOpen
        })

        frameIndex++
      }

      if (frameIndex >= track.length) {
        const bucket = Math.floor(elapsed / 90)

        if (bucket !== lastFakeBucket) {
          const fake = getFakeFrame(part.text, elapsed)

          activeRig.apply({
            viseme: fake.viseme as any,
            mouthOpen: fake.mouthOpen
          })

          lastFakeBucket = bucket
        }
      }

      raf = requestAnimationFrame(tick)
    }

    if (!part.audio) {
      startFallback()
      return
    }

    audio = new Audio(part.audio)
    currentAudio = audio
    audio.preload = 'auto'

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    audio
      .play()
      .then(() => {
        if (finished || !audio) return

        usingAudio = true
        fallbackStart = performance.now()

        if (!hasProvidedTrack && Number.isFinite(audio.duration) && audio.duration > 0) {
          track = englishTextToVisemeTrack(part.text, audio.duration * 1000)
          frameIndex = 0
          lastFakeBucket = -1
        }

        if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
          startFallback()
          return
        }

        startLoop()
      })
      .catch(() => {
        startFallback()
      })
  })
}

function stopCurrentAudio() {
  if (!currentAudio) return

  currentAudio.pause()
  currentAudio.src = ''
  currentAudio = null
}

function sleep(ms: number, id: number): Promise<void> {
  return new Promise(resolve => {
    const start = Date.now()

    const timer = window.setInterval(() => {
      if (id !== runId || Date.now() - start >= ms) {
        clearInterval(timer)
        resolve()
      }
    }, 50)
  })
}
</script>
