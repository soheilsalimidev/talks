<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slideNum: { type: Number, default: 0 },
})

const apiKey = ref('')
const question = ref('')
const loading = ref(false)
const listening = ref(false)
const error = ref('')
const successMsg = ref('')
const dialogEl = ref(null)

let recognition = null
let finalTranscript = ''
const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

onMounted(() => { apiKey.value = localStorage.getItem('oai_key') || '' })
onBeforeUnmount(() => recognition?.stop())

function openDialog() {
  recognition?.stop()
  error.value = ''
  successMsg.value = ''
  dialogEl.value?.showModal()
}

function closeDialog() {
  dialogEl.value?.close()
}

function toggleMic() {
  if (!SR) return
  if (listening.value) { recognition.stop(); return }

  finalTranscript = ''
  recognition = new SR()
  recognition.lang = 'en-US'
  recognition.continuous = true
  recognition.interimResults = true

  recognition.onresult = (e) => {
    let interim = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript
      if (e.results[i].isFinal) finalTranscript += t + ' '
      else interim += t
    }
    question.value = (finalTranscript + interim).trim()
  }

  recognition.onend = () => {
    listening.value = false
    if (question.value.trim()) ask()
  }

  recognition.onerror = (e) => {
    listening.value = false
    error.value = 'Mic error: ' + e.error
  }

  recognition.start()
  listening.value = true
  error.value = ''
  successMsg.value = ''
}

import { useNav } from '@slidev/client'
const { currentSlideNo } = useNav()

async function ask() {
  if (!question.value.trim() || loading.value) return
  recognition?.stop()
  closeDialog()

  loading.value = true
  error.value = ''
  successMsg.value = ''

  try {
    const res = await fetch('http://localhost:3111/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: question.value,
        slideNum: currentSlideNo.value,
      }),
    })
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)

    successMsg.value = `✅ Slides inserted after slide ${props.slideNum}. Slidev will auto-reload!`
    question.value = ''
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-7 text-base text-gray-900">
    <!-- Action Buttons -->
    <div class="flex gap-2 mb-4">
      <button
        class="w-7 h-7 flex items-center justify-center border rounded-full bg-blue-300/20 cursor-pointer text-lg transition-all duration-200 hover:bg-blue-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="openDialog" title="Write question">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" fill-rule="evenodd"
            d="M14.0992 2.39109C15.6207 0.869636 18.0875 0.869636 19.6089 2.39109C21.1304 3.91255 21.1304 6.37932 19.6089 7.90077L12.0149 15.4948C11.5869 15.9228 11.3255 16.1842 11.0342 16.4115C10.691 16.6792 10.3196 16.9087 9.92667 17.096C9.59315 17.2549 9.24244 17.3718 8.66818 17.5632L5.99553 18.4541L5.35386 18.668C4.77951 18.8594 4.14629 18.7099 3.7182 18.2818C3.2901 17.8537 3.14062 17.2205 3.33207 16.6462L4.43683 13.3318C4.62822 12.7576 4.7451 12.4069 4.90405 12.0734C5.09132 11.6804 5.32084 11.309 5.58856 10.9658C5.81578 10.6745 6.07719 10.4131 6.50525 9.98509L14.0992 2.39109ZM5.96092 16.8845L5.11556 16.0391L5.84398 13.8538C6.05606 13.2176 6.14366 12.9589 6.25814 12.7187C6.39854 12.4241 6.57061 12.1457 6.77132 11.8883C6.93497 11.6785 7.12718 11.4845 7.60141 11.0102L13.4924 5.11927C13.7355 5.72927 14.147 6.46549 14.8408 7.15927C15.5345 7.85306 16.2708 8.26447 16.8807 8.50764L10.9898 14.3986C10.5155 14.8728 10.3215 15.065 10.1117 15.2287C9.85436 15.4294 9.57594 15.6015 9.28134 15.7419C9.04113 15.8564 8.78244 15.944 8.14619 16.156L5.96092 16.8845ZM18.076 7.31241C17.9521 7.28522 17.7973 7.24432 17.6213 7.18325C17.1373 7.01532 16.5006 6.69778 15.9014 6.09861C15.3022 5.49944 14.9847 4.86276 14.8168 4.37873C14.7557 4.2027 14.7148 4.04787 14.6876 3.92404L15.1599 3.45175C16.0956 2.51608 17.6126 2.51608 18.5483 3.45175C19.4839 4.38742 19.4839 5.90444 18.5483 6.84011L18.076 7.31241ZM3.25002 22C3.25002 21.5858 3.58581 21.25 4.00002 21.25H20V22.75H4.00002C3.58581 22.75 3.25002 22.4142 3.25002 22Z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button v-if="SR"
        class="w-10 h-10 flex items-center justify-center border border-pink-300 rounded-lg bg-pink-100 cursor-pointer text-lg transition-all duration-200 hover:bg-pink-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="{ 'bg-red-100 border-red-600 animate-pulse': listening }" @click="toggleMic"
        :title="listening ? 'Stop listening' : 'Speak question'">
        {{ listening ? '🛑' : '🎤' }}
      </button>
    </div>

    <!-- Status Messages -->
    <p v-if="listening" class="text-sm text-gray-600 italic my-2">Listening... "{{ question }}"</p>
    <p v-if="error" class="text-red-600 text-sm bg-red-50 p-2 rounded">❌ {{ error }}</p>
    <p v-if="successMsg" class="text-green-700 text-sm bg-green-50 p-2 rounded">{{ successMsg }}</p>
    <p v-if="loading" class="text-sm text-gray-600 italic my-2">⏳ Generating and inserting slides...</p>

    <!-- Native Dialog -->
    <dialog ref="dialogEl" class="border-none rounded-xl p-6 shadow-2xl w-[90%] max-w-[500px] backdrop:bg-black/50"
      @close="question = ''">
      <h3 class="mt-0 mb-4 text-xl font-bold">Ask a Question</h3>

      <div class="mb-4">
        <label class="block text-xs font-semibold mb-1 text-gray-700">Your Question</label>
        <textarea v-model="question" placeholder="e.g., Explain what is student modeling..." rows="4"
          class="w-full p-2 border border-gray-300 rounded-md font-inherit text-base box-border focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"></textarea>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <button
          class="px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 cursor-pointer text-base font-medium transition-all duration-200 hover:bg-gray-300"
          @click="closeDialog">
          Cancel
        </button>
        <button
          class="px-4 py-2 border border-green-600 rounded-lg bg-green-500 text-white cursor-pointer text-base font-medium transition-all duration-200 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading || !question.trim()" @click="ask">
          {{ loading ? 'Generating...' : 'Generate' }}
        </button>
      </div>
    </dialog>
  </div>
</template>
