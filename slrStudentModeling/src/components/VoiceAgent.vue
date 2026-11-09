<template>
  <div class="flex flex-col items-center gap-4 font-sans p-4">
    <div ref="reference" class="w-[200px] h-[200px]" />

    <div class="h-6 w-full max-w-[300px] flex items-center justify-center">
      <p class="text-sm text-center text-gray-800 truncate">
        {{ displayText }}
      </p>
    </div>

    <!-- Click = play the prefetched audio (does NOT trigger a fetch). -->
    <div v-click />

    <p v-if="error && !loading" class="text-xs text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { ActorRig, CHARACTERS } from 'pixel-wizards-charachters'
import { useNav } from '@slidev/client'

interface Props {
  endpoint?: string
  prompt?: string
}

const props = withDefaults(defineProps<Props>(), {
  endpoint: 'http://localhost:3111/api/voice',
  prompt: 'Respond naturally to what the user just said.',
})

const { clicks, currentFrontmatter, currentPage } = useNav()

const el = useTemplateRef('reference')
const dialogue = ref('')
const userText = ref('')
const loading = ref(false)
const error = ref('')

const displayText = computed(() => {
  if (loading.value) return 'Thinking…'
  if (error.value) return error.value
  return dialogue.value
})

let rig: ActorRig | null = null
let runId = 0
let isMounted = false
let currentAudio: HTMLAudioElement | null = null

// Prefetched audio, held in memory until the user clicks.
let prefetchedBlobUrl: string | null = null
let prefetchedReply = ''
let prefetchedHeard = ''
let prefetchPromise: Promise<boolean> | null = null

const VALID_EMOTIONS = [
  'neutral', 'happy', 'excited', 'thinking', 'encouraging', 'sad',
  'surprised', 'sleepy', 'love', 'confused', 'proud', 'shy',
] as const

const VALID_GESTURES = [
  'wave', 'jump', 'spin', 'nod', 'shake', 'shrug', 'point', 'clap', 'bounce', 'nuzzle',
] as const

const VALID_LOCOMOTIONS = ['idle', 'walk', 'fly', 'roll'] as const
const VALID_VISEMES = ['rest', 'aa', 'mbp', 'u', 'l'] as const

type VisemeName = (typeof VALID_VISEMES)[number]

interface VisemeFrame {
  time: number
  viseme: VisemeName
  mouthOpen: number
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
  a: 'aa', e: 'aa', i: 'aa', o: 'aa', y: 'aa',
  u: 'u', w: 'u',
  m: 'mbp', b: 'mbp', p: 'mbp',
  l: 'l', t: 'l', d: 'l', n: 'l', s: 'l', z: 'l', r: 'l', c: 'l',
  g: 'l', h: 'l', k: 'l', v: 'l', f: 'l', j: 'l', q: 'l', x: 'l',
}

// ============================================================
// Lifecycle
// ============================================================

onMounted(() => {
  if (!el.value) return
  isMounted = true

  rig = new ActorRig(CHARACTERS.robo, {
    size: 200,
    micro: { amount: 0.5, saccade: 0.5 },
  }).mount(el.value)

  // Start in "thinking" while we fetch the audio.
  rig.apply({
    emotion: 'thinking',
    locomotion: 'idle',
    speed: 1,
    gesture: null,
    viseme: 'rest',
    mouthOpen: 0,
  })

  // Kick off the fetch immediately — do NOT play.
  prefetchPromise = prefetch()
})

onUnmounted(() => {
  isMounted = false
  runId++
  stopCurrentAudio()

  if (prefetchedBlobUrl) {
    URL.revokeObjectURL(prefetchedBlobUrl)
    prefetchedBlobUrl = null
  }

  rig?.destroy()
  rig = null

  // Fire-and-forget reset so the next slide starts with a clean buffer.
  fetch(`${props.endpoint}/reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ keepRecording: true }),
    keepalive: true,
  }).catch(() => {
    /* ignored — page is going away */
  })
})

// ============================================================
// Click trigger: PLAY only (fetch already happened)
// ============================================================

watch(clicks, async (newVal, oldVal) => {
  if (oldVal !== undefined && newVal > oldVal) {
    await playOnClick()
  }
})

// ============================================================
// Prefetch: fetch audio in background, do NOT play
// ============================================================

async function prefetch(): Promise<boolean> {
  if (currentPage.value !== currentFrontmatter.value.voiceAgent?.page) {
    console.log(currentFrontmatter.value.voiceAgent?.page)
    return
  }
  try {

    const res = await fetch(props.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: currentFrontmatter.value.voiceAgent?.prompt ?? '' }),
    })

    if (!isMounted) return false
    if (res.status === 409) return false // no buffered transcript yet
    if (!res.ok) return false

    const blob = await res.blob()
    if (!isMounted) return false
    if (!blob.size) return false

    if (prefetchedBlobUrl) URL.revokeObjectURL(prefetchedBlobUrl)
    prefetchedBlobUrl = URL.createObjectURL(blob)
    prefetchedHeard = decodeURIComponent(res.headers.get('X-User-Transcript') ?? '')
    prefetchedReply = decodeURIComponent(res.headers.get('X-Assistant-Reply') ?? '')

    // Character is ready to speak on click.
    rig?.apply({
      emotion: 'happy',
      locomotion: 'idle',
      speed: 1,
      gesture: null,
      viseme: 'rest',
      mouthOpen: 0,
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

// ============================================================
// Play: use prefetched audio, or wait / retry if not ready
// ============================================================

async function playOnClick(): Promise<void> {
  if (!rig || !isMounted || loading.value) return

  error.value = ''

  // If nothing prefetched yet, wait for the in-flight fetch (or retry).
  if (!prefetchedBlobUrl) {
    loading.value = true
    rig.apply({ emotion: 'thinking', locomotion: 'idle', speed: 1, gesture: null })

    if (prefetchPromise) await prefetchPromise
    if (!prefetchedBlobUrl && isMounted) await prefetch()

    loading.value = false
    if (!isMounted) return
  }

  if (!prefetchedBlobUrl) {
    error.value = 'No audio available'
    rig.apply({ emotion: 'sad', locomotion: 'idle', speed: 1, viseme: 'rest', mouthOpen: 0 })
    return
  }

  // Consume the prefetched audio.
  const url = prefetchedBlobUrl
  const reply = prefetchedReply
  const heard = prefetchedHeard
  prefetchedBlobUrl = null
  prefetchedReply = ''
  prefetchedHeard = ''
  prefetchPromise = null

  userText.value = heard
  dialogue.value = ''

  const id = ++runId
  const duration = estimateDurationFromText(reply)

  try {
    await playPart(
      {
        text: reply,
        audio: url,
        emotion: 'neutral',
        gesture: null,
        locomotion: 'idle',
        speed: 1,
        duration,
        providedVisemeTrack: [],
      },
      id
    )
  } finally {
    // The blob URL is no longer needed once playback ends.
    URL.revokeObjectURL(url)
  }
}

// ============================================================
// Character animation helpers (unchanged)
// ============================================================

function estimateDurationFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1200, 650 + words * 380)
}

function pickRandomViseme(): VisemeName {
  const r = Math.random()
  if (r < 0.10) return 'rest'   // brief closure — looks like a natural pause
  if (r < 0.45) return 'aa'     // most common vowel
  if (r < 0.65) return 'u'
  if (r < 0.85) return 'mbp'
  return 'l'
}

function mouthOpenForViseme(viseme: VisemeName): number {
  if (viseme === 'aa') return 0.85
  if (viseme === 'u') return 0.6
  if (viseme === 'mbp') return 0.25
  if (viseme === 'l') return 0.5
  return 0
}



function playPart(part: VoicePart, id: number): Promise<void> {
  return new Promise(resolve => {
    if (!rig) return resolve()

    const activeRig = rig
    dialogue.value = part.text

    activeRig.apply({
      emotion: part.emotion as any,
      locomotion: part.locomotion as any,
      speed: part.speed,
      gesture: null,
    })

    if (part.gesture) activeRig.playGesture(part.gesture as any)

    let audio: HTMLAudioElement | null = null
    let finished = false
    let raf = 0
    let fallbackTimer: number | undefined
    let fallbackStart = performance.now()
    let usingAudio = false
    let lastVisemeChange = 0

    function cleanup() {
      cancelAnimationFrame(raf)
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer)
      if (audio) {
        audio.removeEventListener('ended', onEnded)
        audio.removeEventListener('error', onError)
        audio.pause()
        audio.src = ''
        if (currentAudio === audio) currentAudio = null
      }
    }

    function finish() {
      if (finished) return
      finished = true
      cleanup()
      activeRig.apply({ viseme: 'rest', mouthOpen: 0 })
      resolve()
    }

    function onEnded() { finish() }
    function onError() { startFallback() }

    function startFallback() {
      if (finished || fallbackTimer !== undefined) return
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
      if (finished || id !== runId) return finish()

      const elapsed =
        usingAudio && audio && Number.isFinite(audio.currentTime)
          ? audio.currentTime * 1000
          : performance.now() - fallbackStart

      // Switch visemes every 80–140 ms so the mouth keeps moving
      // for the entire duration of the audio clip.
      if (elapsed - lastVisemeChange >= 80 + Math.random() * 60) {
        lastVisemeChange = elapsed
        const viseme = pickRandomViseme()
        activeRig.apply({
          viseme: viseme as any,
          mouthOpen: mouthOpenForViseme(viseme),
        })
      }

      raf = requestAnimationFrame(tick)
    }

    if (!part.audio) return startFallback()

    audio = new Audio(part.audio)
    currentAudio = audio
    audio.preload = 'auto'
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    audio.play()
      .then(() => {
        if (finished || !audio) return
        usingAudio = true
        fallbackStart = performance.now()
        startLoop()
      })
      .catch(() => startFallback())
  })
}

function stopCurrentAudio() {
  if (!currentAudio) return
  currentAudio.pause()
  currentAudio.src = ''
  currentAudio = null
}
</script>
