<template>
  <div class="flex flex-col items-center gap-4 font-sans p-4">
    <div ref="reference" class="w-[250px] h-[250px]" />

    <!-- Subtitle: bigger, animated card -->
    <div class="min-h-[96px] w-full max-w-[640px] flex items-center justify-center">
      <Transition name="subtitle" mode="out-in">
        <p :key="subtitleKey" class="text-xl  font-extrabold text-center text-gray-900
                 leading-snug tracking-tight
                 px-5 py-3 rounded-2xl
                 bg-white/80 backdrop-blur-sm ring-1 ring-black/10
                 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.35)]
                 subtitle-text" :class="{ 'subtitle-thinking': loading }">
          {{ displayText }}
        </p>
      </Transition>
    </div>

    <div v-click />

    <p v-if="error && !loading" class="text-sm text-red-600">{{ error }}</p>
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

// Key drives the subtitle pop-in animation. Changes whenever the
// displayed text changes (new chunk, "Thinking…", error → cleared, …).
const subtitleKey = computed(() =>
  `${loading.value ? 'L' : '-'}|${error.value}|${dialogue.value}`
)

const displayText = computed(() => {
  if (loading.value) return 'Thinking…'
  if (error.value) return error.value
  return dialogue.value
})

let rig: ActorRig | null = null
let runId = 0
let isMounted = false
let currentAudio: HTMLAudioElement | null = null

// ---------- prefetch state ----------
let prefetchedBlobUrl: string | null = null
let prefetchedReply = ''
let prefetchedHeard = ''
let prefetchedWords: WordTimestamp[] = []
let prefetchPromise: Promise<boolean> | null = null

// ---------- subtitle tuning ----------
const SUBTITLE_CHUNK = 5 // words shown per chunk

// ---------- pre-play "gathering thoughts" beat ----------
// Even when audio is already prefetched (i.e. would otherwise start
// instantly), sit on the thinking pose for a random beat so the robot
// never snaps straight from idle into speech.
const START_THINK_MIN_MS = 350
const START_THINK_MAX_MS = 1200

function randomStartDelay(): number {
  return START_THINK_MIN_MS + Math.random() * (START_THINK_MAX_MS - START_THINK_MIN_MS)
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

interface WordTimestamp {
  word: string
  start: number // seconds
  end: number   // seconds
}

// ---------- emotion types & rotation ----------
type EmotionName =
  | 'neutral' | 'happy' | 'excited' | 'thinking'
  | 'encouraging' | 'sad' | 'surprised' | 'sleepy' | 'love'
  | 'confused' | 'proud' | 'shy'

// Ordered so speech-appropriate faces dominate, but every valid
// emotion still gets a chance to appear. Swap entries around if you
// want a different vibe.
const SPEAKING_EMOTIONS: EmotionName[] = [
  'happy', 'excited', 'proud', 'encouraging', 'love',
  'surprised', 'thinking', 'confused', 'shy', 'neutral',
  'sleepy', 'sad',
]

function pickEmotion(exclude?: EmotionName): EmotionName {
  const pool = exclude
    ? SPEAKING_EMOTIONS.filter((e) => e !== exclude)
    : SPEAKING_EMOTIONS
  return pool[Math.floor(Math.random() * pool.length)]
}

// ---------- other enums ----------
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
  emotion: EmotionName
  gesture: string | null
  locomotion: string
  speed: number
  duration: number
  providedVisemeTrack: VisemeFrame[]
  words: WordTimestamp[]
}

// ============================================================
// Lifecycle
// ============================================================

onMounted(() => {
  if (!el.value) return
  isMounted = true

  rig = new ActorRig(CHARACTERS.robo, {
    size: 250,
    micro: { amount: 0.5, saccade: 0.5 },
  }).mount(el.value)

  rig.apply({
    emotion: 'thinking',
    locomotion: 'idle',
    speed: 1,
    gesture: null,
    viseme: 'rest',
    mouthOpen: 0,
  })

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
  prefetchedWords = []

  rig?.destroy()
  rig = null

  fetch(`${props.endpoint}/reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ keepRecording: true }),
    keepalive: true,
  }).catch(() => { /* page is going away */ })
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
// Prefetch
// ============================================================

async function prefetch(): Promise<boolean> {
  if (currentPage.value !== currentFrontmatter.value.voiceAgent?.page) {
    console.log(currentFrontmatter.value.voiceAgent?.page)
    return false
  }
  try {
    const res = await fetch(props.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        prompt: currentFrontmatter.value.voiceAgent?.prompt ?? '',
      }),
    })

    if (!isMounted) return false
    if (!res.ok) return false

    const data: any = await res.json()
    if (!isMounted) return false
    if (!data || typeof data.audio !== 'string' || !data.audio) return false

    const blob = base64ToBlob(data.audio, data.mime ?? 'audio/wav')
    if (!blob.size) return false

    if (prefetchedBlobUrl) URL.revokeObjectURL(prefetchedBlobUrl)
    prefetchedBlobUrl = URL.createObjectURL(blob)
    prefetchedHeard = data.heard ?? ''
    prefetchedWords = Array.isArray(data.words) ? data.words : []
    prefetchedReply =
      (data.reply && String(data.reply)) ||
      prefetchedWords.map((w) => w.word).join(' ')

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
// Play
// ============================================================

async function playOnClick(): Promise<void> {
  if (!rig || !isMounted || loading.value) return

  error.value = ''

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

  const url = prefetchedBlobUrl
  const reply = prefetchedReply
  const heard = prefetchedHeard
  const words = prefetchedWords

  prefetchedBlobUrl = null
  prefetchedReply = ''
  prefetchedHeard = ''
  prefetchedWords = []
  prefetchPromise = null

  userText.value = heard
  dialogue.value = ''

  const id = ++runId

  // --- Random "gathering thoughts" beat before we start speaking ---
  // Always runs, even when the audio was prefetched, so the robot
  // visibly thinks for a moment instead of instantly talking.
  loading.value = true
  rig.apply({
    emotion: 'thinking',
    locomotion: 'idle',
    speed: 1,
    gesture: null,
    viseme: 'rest',
    mouthOpen: 0,
  })
  await sleep(randomStartDelay())
  if (!isMounted || id !== runId) return

  // Pre-populate the first subtitle *before* flipping `loading` off,
  // so there's no blank flash between "Thinking…" and the first chunk.
  // Both writes happen in the same tick → single <Transition>.
  if (words.length > 0) {
    dialogue.value = getChunkText(words, 0, SUBTITLE_CHUNK)
  } else if (reply) {
    dialogue.value = reply
  }
  loading.value = false

  const duration =
    words.length > 0
      ? Math.max(1200, words[words.length - 1].end * 1000 + 300)
      : estimateDurationFromText(reply)

  try {
    await playPart(
      {
        text: reply,
        audio: url,
        emotion: pickEmotion(),
        gesture: null,
        locomotion: 'idle',
        speed: 1,
        duration,
        providedVisemeTrack: [],
        words,
      },
      id
    )
  } finally {
    URL.revokeObjectURL(url)
  }
}

// ============================================================
// Subtitle helpers
// ============================================================

function findWordIndex(words: WordTimestamp[], timeSec: number): number {
  let lo = 0
  let hi = words.length - 1
  let ans = 0
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (words[mid].start <= timeSec) {
      ans = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return ans
}

function getChunkText(
  words: WordTimestamp[],
  chunkIdx: number,
  chunkSize: number
): string {
  const start = chunkIdx * chunkSize
  const end = Math.min(words.length, start + chunkSize)
  return words.slice(start, end).map((w) => w.word).join(' ')
}

function base64ToBlob(b64: string, mime: string): Blob {
  const bin = atob(b64)
  const len = bin.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i)
  return new Blob([bytes], { type: mime })
}

// ============================================================
// Character animation helpers
// ============================================================

function estimateDurationFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1200, 650 + words * 380)
}

function pickRandomViseme(): VisemeName {
  const r = Math.random()
  if (r < 0.1) return 'rest'
  if (r < 0.45) return 'aa'
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
  return new Promise((resolve) => {
    if (!rig) return resolve()

    const activeRig = rig

    if (part.words.length > 0) {
      dialogue.value = getChunkText(part.words, 0, SUBTITLE_CHUNK)
    } else {
      dialogue.value = part.text
    }

    // Start on the emotion picked by the caller; switch per chunk.
    let currentEmotion: EmotionName = part.emotion
    activeRig.apply({
      emotion: currentEmotion as any,
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
    let currentChunk = -1

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
      if (part.text) dialogue.value = part.text
      else if (part.words.length) dialogue.value = part.words.map((w) => w.word).join(' ')
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

      const elapsedMs =
        usingAudio && audio && Number.isFinite(audio.currentTime)
          ? audio.currentTime * 1000
          : performance.now() - fallbackStart

      // --- Subtitle + emotion switch per chunk ---
      if (part.words.length > 0) {
        const tSec = elapsedMs / 1000
        const idx = findWordIndex(part.words, tSec)
        const chunk = Math.floor(idx / SUBTITLE_CHUNK)
        if (chunk !== currentChunk) {
          currentChunk = chunk
          dialogue.value = getChunkText(part.words, chunk, SUBTITLE_CHUNK)

          // Fresh face for each chunk — never the same one twice in a row.
          currentEmotion = pickEmotion(currentEmotion)
          activeRig.apply({ emotion: currentEmotion as any })
        }
      }

      // --- Viseme update ---
      if (elapsedMs - lastVisemeChange >= 80 + Math.random() * 60) {
        lastVisemeChange = elapsedMs
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

    audio
      .play()
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

<style scoped>
/* ---------- Subtitle look & feel ---------- */
.subtitle-text {
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
  will-change: transform, opacity;
}

/* Gentle pulse while we're still fetching audio. */
.subtitle-thinking {
  animation: subtitle-pulse 1.2s ease-in-out infinite;
}

@keyframes subtitle-pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.72;
    transform: scale(0.98);
  }
}

/* Chunk change transition: spring-pop in, quick fade out.
   mode="out-in" on the <Transition> means these never overlap,
   so the layout stays put and the new chunk gets the spotlight. */
.subtitle-enter-active {
  transition: opacity 180ms ease-out, transform 260ms cubic-bezier(.2, 1.6, .4, 1);
}

.subtitle-leave-active {
  transition: opacity 100ms ease-in, transform 100ms ease-in;
}

.subtitle-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

.subtitle-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}
</style>
