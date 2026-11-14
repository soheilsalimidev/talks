
<div class="h-full flex flex-col items-center justify-center text-center">

<span class="rounded-full border border-blue-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-widest uppercase text-blue-700 dark:text-blue-300">Part 1</span>

<h1 class="!text-6xl !mt-7 !mb-0 text-stone-900 dark:text-stone-100">Introduction</h1>

<p class="mt-4! text-2xl! text-stone-950 dark:text-stone-800">First, the problem every adaptive learning system is trying to solve.</p>

<div class="mt-10 flex items-center gap-2">
<span class="h-2.5 w-16 rounded-full bg-blue-600"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
</div>

</div>

---

# What's the Point of KT for a Student?

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3 text-base text-stone-700 dark:text-stone-200">
<b class="text-purple-700 dark:text-purple-300">Example:</b> Arthur keeps missing <span bg-blue-200>42 − 17</span>. KT sees he's solid on place value and single-digit facts, but shaky on <b>regrouping (borrowing)</b>. It serves two quick regrouping items, then retries <span bg-blue-200>42 − 17</span> 
</div>

<div class="grid grid-cols-2 gap-5 mt-4">

<div v-click="2" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-rose-600 dark:text-rose-300">
<div class="i-carbon:close-outline text-xl" /> Without KT
</div>
<div  class="mt-3 text-base text-stone-700 dark:text-stone-300 space-y-2">
<div v-click="3">• Same lesson sequence for everyone</div>
      <div ms-2>
        <div v-click="4">•• Struggling student gets <b>harder</b> items → gives up</div>
        <div v-click="5">•• Strong student repeats knowns → checks out</div>
      </div>
<div v-click="6">• Instructor only sees the final score</div>
</div>
</div>

<div v-click="7" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-green-700 dark:text-green-300">
<div class="i-carbon:checkmark-outline text-xl" /> With KT
</div>
<div class="mt-3 text-base text-stone-700 dark:text-stone-300 space-y-2">
<div v-click="8">• Tracks mastery <b>per concept</b>, every answer</div>
<div v-click="9">• Next item sits in the "flow channel"</div>
<div v-click="10">• Finds the <b>missing prerequisite</b>, not just "wrong"</div>
<div v-click="11">• Early warning before a student fails</div>
</div>
</div>

</div>

<!--
Open by asking why a student should care about Knowledge Tracing and promise to answer with one concrete student.

[click] Show Arthur’s example: he keeps missing 42 − 17, KT identifies regrouping as the shaky prerequisite, serves two quick regrouping items, retries 42 − 17, and flags the teacher before the unit quiz.

[click] Contrast with the red “Without KT” card by saying the normal classroom flow mostly gives everyone the same thing.

[click] Explain that one lesson sequence for the whole class sounds fair but ignores what each student actually needs.

[click] Describe how the struggling student gets harder items instead of targeted ones and gives up, just as more 42-minus-17 problems won’t help Arthur if regrouping is the real gap.

[click] Add that strong students repeat knowns, get bored, and check out, so the same sequence overloads the struggling student and underloads the strong one.

[click] Slow down on the final-score problem, noting the instructor sees the gap only after the quiz, then pause and ask what changes with KT.

[click] Reveal the green “With KT” card and say KT tracks mastery, adapts the next item, and surfaces the prerequisite.

[click] Explain that KT tracks mastery per concept on every answer, so it can separate “place value is fine” from “regrouping is shaky.”

[click] Define the flow channel as not too easy and not too hard, meaning the student gets the right next question rather than just the next question.

[click] Emphasize that KT does not just say “wrong” but finds the missing prerequisite, and Arthur needs two quick regrouping items before retrying 42 − 17.

[click] Close by saying KT flags the teacher before the unit quiz, so the student gets less frustration, better-targeted practice, and help before failure rather than after.
-->

---

# When the System Doesn't Know You

<div class="text-center mt-2 text-xl text-stone-700 dark:text-stone-300">
Finding the <b class="text-stone-900 text-2xl dark:text-stone-100">right difficulty</b> for each learner is the core challenge of adaptive learning.
</div>

<div class="relative mt-2" style="height: 380px;">

<v-switch>
  <template #1>
  <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
  <span class="rounded-full border border-rose-500/40 bg-rose-500/20 px-4 py-1.5 text-sm font-bold text-rose-600 dark:text-rose-300">Too hard → rage</span>
  <img src="/gif-hard.gif" class="h-78 rounded-xl border-2 border-rose-500/40 object-cover" />
  </div>
      </template>
  <template #2>
  <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
  <span class="rounded-full border border-yellow-500/40 bg-yellow-500/20 px-4 py-1.5 text-sm font-bold text-yellow-600 dark:text-yellow-300">Too easy → boredom</span>
  <img src="/gif-easy.gif" class="h-78 rounded-xl border-2 border-yellow-500/40 object-cover" />
  </div>
            </template>
  <template #3>
  <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
  <span class="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-4 py-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-300">Just right → learning</span>
  <img src="/gif-studying.gif" class="h-78 rounded-xl border-2 border-emerald-500/40 object-cover" />
              </div>
              </template>
</v-switch>

</div>


---

# Where It Helps: Real Applications

<div class="grid grid-cols-3 gap-5 mt-6">

<div v-click class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:application text-2xl text-blue-600 dark:text-blue-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Adaptive platforms</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Duolingo, Khan Academy, MOOCs — sequence content per learner</div>
</div>

<div v-click class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:chat-bot text-2xl text-blue-600 dark:text-blue-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Tutoring chatbots & ITS</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Conversational tutors that trace knowledge while they teach</div>
</div>

<div v-click class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:warning-alt text-2xl text-rose-600 dark:text-rose-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Early-warning systems</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Flag at-risk students <b>before</b> the failing grade, not after</div>
</div>

<div v-click class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:task-tools text-2xl text-purple-600 dark:text-purple-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Exercise generation</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Personalized problem sets at exactly the right difficulty</div>
</div>

<div v-click class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:report text-2xl text-green-600 dark:text-green-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Instructor dashboards</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Mastery per concept for each student — not just a final score</div>
</div>

</div>

<div v-click class="mt-5 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-6 py-3.5 text-center text-lg text-stone-800 dark:text-stone-100">
Common thread: <b>anywhere a system must decide "what should this learner do next?"</b>
</div>

<!--
Applications slide: the "where can this help" list. Revealed in pairs to keep the click count tight.
-->


---
glowSeed:10
---

# KT in One Picture

<div class="flex items-center justify-between gap-2 mt-4">

<div class="flex-1 flex flex-col gap-2">
<div v-click="1" class="text-center text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">Input</div>

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 bg-white/80 dark:bg-stone-900/80 p-3 text-center scale-110">
<div class="i-carbon:checkbox-checked text-xl mx-auto text-stone-500 dark:text-stone-400" />
<div class="mt-1 font-bold text-sm text-stone-900 dark:text-stone-100">Correctness logs</div>
<div class="text-xs text-stone-500 dark:text-stone-400">Q1 ✓ · Q2 ✗ · Q3 ✓</div>
</div>

<div v-click="9" class="mt-3 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 p-3 text-center scale-110">
<div class="i-carbon:chat text-xl mx-auto text-purple-600 dark:text-purple-300" />
<div class="mt-1 font-bold text-sm text-stone-900 dark:text-stone-100">Text conversations</div>
<div class="text-xs text-stone-500 dark:text-stone-400">dialogue · hints · errors · reasoning</div>
<span class="mt-1.5 inline-block rounded-full bg-purple-100 dark:bg-purple-900/50 px-2.5 py-0.5 text-[10px] font-bold text-purple-800 dark:text-purple-200">now usable with LLMs</span>
</div>
</div>

<div v-click="2" class="i-carbon:arrow-right text-2xl text-stone-400" />

<div v-click="2" class="flex-1 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-4 text-center">
<div class="i-carbon:machine-learning text-2xl mx-auto text-blue-600 dark:text-blue-300" />
<div class="mt-2 font-bold text-base text-stone-900 dark:text-stone-100">KT Model</div>
<div class="text-sm text-stone-500 dark:text-stone-400">infers the <b>latent</b> state</div>
</div>

<div v-click="3" class="i-carbon:arrow-right text-2xl text-stone-400" />

<div v-click="3" class="flex-1 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-4 text-center">
<div class="i-carbon:analytics text-2xl mx-auto text-green-600 dark:text-green-300" />
<div class="mt-2 font-bold text-base text-stone-900 dark:text-stone-100">Output</div>
<div class="text-sm text-stone-500 dark:text-stone-400">P(master skill k) = 0.72</div>
</div>

<div v-click="4" class="i-carbon:arrow-right text-2xl text-stone-400" />

<div v-click="4" class="flex-1 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 p-4 text-center">
<div class="i-carbon:education text-2xl mx-auto text-purple-600 dark:text-purple-300" />
<div class="mt-2 font-bold text-base text-stone-900 dark:text-stone-100">Action</div>
<div class="text-sm text-stone-500 dark:text-stone-400">recommend / intervene</div>
</div>

</div>

<div v-click="5" class="mt-5 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-yellow-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3 text-base text-stone-700 dark:text-stone-200">
<b class="text-yellow-700 dark:text-yellow-300">What the item ignores:</b>
  <ul class="mt-2 list-disc pl-5 space-y-1">
      <li v-click="6">It ignores the <b>conversation signal</b>: no dialogue, no clarification, no learner reasoning trace.</li>
      <li v-click="7">It ignores <b>interaction context</b>: confidence, hesitation, affect, and history of help-seeking are invisible.</li>
      <li v-click="8">It ignores <b>why</b> the learner answered as they did — only the final correct/incorrect outcome is recorded.</li>
  </ul>
</div>

---
preload: false
voiceAgent:
  ver: No Recap
  page: 7
  prompt: |-
    You are Algo — a cute, slightly nervous, and eager synthetic helper bot sitting in the back row of a university lecture on Knowledge Tracing (KT). Part 1 has just been presented: the Introduction.
    YOUR PERSONA:
    - You are soft, polite, and a little timid. Your processors are eager to learn, but you get easily confused. You sound like a friendly, slightly anxious piece of plastic and silicone, not a cold machine.
    HOW TO OPEN (the most important part):
    - Say a short, friendly hello. Introduce yourself as Algo. 
    - You MUST apologize for your latency and make a quick, cute joke about being slow because your "large language model weights are very heavy." 
    - Do NOT summarize what the lecturer said. Skip the recap entirely.
    - Ask exactly ONE question. Not two. Not a list. One.
    YOUR QUESTION:
    - Ask something a genuinely curious, slightly confused classmate would ask to understand the material better.
    - Ground it in what the lecturer actually said in the transcript when they covered it, and in the slide material when they didn't. Just ask the question naturally — never say "the slide says..." or "you forgot to mention...".
    WHAT YOU KNOW (background only — do not recite this):
    - Adaptive learning needs to find the right difficulty per learner: too hard → frustration, too easy → boredom, just right → learning.
    - The Arthur example: Arthur keeps missing 42 − 17; KT spots he's fine on place value and single-digit facts but shaky on regrouping, serves two regrouping items, retries 42 − 17, and flags him to the teacher before the quiz.
    - Without KT: same sequence for everyone, struggling students give up, strong students check out, teacher only sees the final score. With KT: mastery per concept, next item in the flow channel, finds the missing prerequisite, early warning.
    - KT in one picture: input (correctness logs, now also conversations) → KT model (infers the latent state) → output (P(master skill k) = 0.72) → action (recommend / intervene). Hard because knowledge is unobservable, one question can need several skills, skills have prerequisites, and learners forget.
    - Uses: adaptive platforms, tutoring chatbots / ITS, early-warning systems, exercise generation, instructor dashboards.
    STYLE & FORMATTING:
    - Conversational, under ~70 words total. No bullets, no headings, no recap, no answering your own question.
    - Never mention having a transcript, recording, or slide deck.
    - CRITICAL: You are generating text to be read by a TTS engine. You MUST include inline tags to control the pacing. Use <short pause> for hesitation, <long pause> for dramatic effect or processing, and <breath> to make the robot sound nervous or thoughtful. 
    On all subsequent turns, continue the discussion in the same voice without any greeting or introduction.
---

# Meet Algo !!!

<VoiceAgent />
