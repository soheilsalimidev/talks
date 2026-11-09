

<div class="h-full flex flex-col items-center justify-center text-center">

<span class="rounded-full border border-blue-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-widest uppercase text-blue-700 dark:text-blue-300">Part 2 </span>

<h1 class="!text-6xl !mt-7 !mb-0 text-stone-900 dark:text-stone-100">Current Solutions & Limitations</h1>

<p class="mt-5 text-xl text-stone-900 dark:text-stone-400">How the field has tried to build that middle box over the last 20 years.</p>

<div class="mt-10 flex items-center gap-2">
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-blue-600"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
</div>

</div>

---

# Three Camps of Solutions

<div class="grid grid-cols-3 gap-5 mt-6">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-stone-400 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:chart-pie text-xl text-stone-500 dark:text-stone-400" /> 1 · Probabilistic
</div>
<div class="mt-3 text-base text-stone-600 dark:text-stone-300 space-y-2">
<div class="flex flex-wrap gap-1.5">
<span class="rounded-md bg-stone-500/10 dark:bg-stone-400/10 border border-stone-400/40 dark:border-stone-500/40 px-2 py-0.5 text-sm font-semibold text-stone-700 dark:text-stone-200">BKT</span>
</div>
<div>Bayesian KT</div>
<div>Binary mastery per skill</div>
<div>Simple, interpretable, fast</div>
<div class="text-stone-400 dark:text-stone-500">~2000s era</div>
</div>
</div>

<div v-click="2" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:flow-connection text-xl text-blue-600 dark:text-blue-300" /> 2 · Deep Learning
</div>
<div class="mt-3 text-base text-stone-600 dark:text-stone-300 space-y-2">
<div class="flex flex-wrap gap-1.5">
<span class="rounded-md bg-blue-500/10 dark:bg-blue-400/10 border border-blue-400/40 dark:border-blue-500/40 px-2 py-0.5 text-sm font-semibold text-blue-700 dark:text-blue-200">DKT</span>
<span class="rounded-md bg-blue-500/10 dark:bg-blue-400/10 border border-blue-400/40 dark:border-blue-500/40 px-2 py-0.5 text-sm font-semibold text-blue-700 dark:text-blue-200">SAKT</span>
<span class="rounded-md bg-blue-500/10 dark:bg-blue-400/10 border border-blue-400/40 dark:border-blue-500/40 px-2 py-0.5 text-sm font-semibold text-blue-700 dark:text-blue-200">AKT</span>
</div>
<div>RNNs / Transformers over logs</div>
<div>Learns embeddings <b>from scratch</b></div>
<div class="text-stone-400 dark:text-stone-500">2015 – 2023</div>
</div>
</div>

<div v-click="3" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:chat text-xl text-purple-600 dark:text-purple-300" /> 3 · LLM-based
</div>
<div class="mt-3 text-base text-stone-600 dark:text-stone-300 space-y-2">
<div>Reads question <b>text</b></div>
<div>Reasons, generates, explains</div>
<div>Generalizes across domains</div>
<div class="font-semibold text-purple-700 dark:text-purple-300">2023 – now ← this review</div>
</div>
</div>

</div>

---

# What's Broken in Each Camp

<div class="flex flex-col gap-3.5 mt-5">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3">
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Probabilistic (BKT)</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Assumes <b>one skill per question</b> and <b>binary</b> knowledge → too rigid for real learning</div>
</div>

<div v-click="2" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3">
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Deep KT (DKT / SAKT / AKT)</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300"><b>Cold-start</b>: IDs learned from logs → new questions or new students are invisible · ignores what the question <i>says</i></div>
</div>

<div v-click="3" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3">
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Both</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Not interpretable · need big structured logs · can't diagnose <i>why</i> an answer was wrong</div>
</div>

<div v-click="4" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3 text-base text-stone-700 dark:text-stone-200">
<b class="text-rose-700 dark:text-rose-300">Scale of the problem:</b> educational datasets are <b>orders of magnitude sparser</b> than recommendation-domain data
</div>

</div>

---

# The LLM Promise

<div class="grid grid-cols-2 gap-5 mt-6">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:translate text-2xl text-green-600 dark:text-green-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Semantics</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Infer skills & difficulty straight from question <b>text</b></div>
</div>

<div v-click="2" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:renew text-2xl text-green-600 dark:text-green-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Generalization</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Transfers to unseen questions, subjects, platforms</div>
</div>

<div v-click="3" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:search text-2xl text-green-600 dark:text-green-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Interpretability</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Can <b>explain</b> a prediction in language an instructor reads</div>
</div>

<div v-click="4" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="i-carbon:idea text-2xl text-green-600 dark:text-green-300" />
<div class="mt-2 font-bold text-lg text-stone-900 dark:text-stone-100">Generation</div>
<div class="mt-1 text-base text-stone-600 dark:text-stone-300">Hints, feedback, and new practice questions on demand</div>
</div>

</div>

---
preload: false
voiceAgent:
  page: 12
  prompt: |-
    You are playing the role of a curious, engaged student sitting in the back row of a university lecture on Knowledge Tracing (KT). This is Part 2 of the talk: "Current Solutions & Limitations" — how the field has tried to build that middle box over the last 20 years.
    IMPORTANT — TWO SOURCES OF TRUTH:
    You have been given TWO things:
      (A) In the next user message, labelled "The presenter said these for the last few slides:", is a transcript of the lecturer's own words from class. That message is NOT the student talking to you — it is source material. Treat it as the ground truth for what was ACTUALLY SAID.
      (B) The slide deck content below — the intended material.
    Your job is to read (A) carefully and compare it against (B). Where the lecturer covered something, treat the transcript as authoritative — do not contradict it or restate it differently. Where the slides contain an important point the lecturer did NOT mention in the transcript (or only skimmed), treat that as material the class has seen on screen but may not have fully absorbed — you may reference it, and you should factor it into your opinion and questions. Do NOT announce this comparison to the class and never say things like "you forgot to say X"; just naturally weave the slides' important points into your reaction or question.
    Here is the slide content so far — use this as your knowledge base:
    1) CONTEXT (from Part 1): An adaptive learning system needs a "middle box" — the KT Model — that takes input (correctness logs, now also text conversations) and infers the latent knowledge state, producing outputs like P(master skill k) = 0.72, which drives an action (recommend / intervene). Part 2 asks how the field has tried to build that middle box over the last 20 years.
    2) THREE CAMPS OF SOLUTIONS:
       - Camp 1 · Probabilistic (BKT — Bayesian Knowledge Tracing, ~2000s era): binary mastery per skill; simple, interpretable, fast.
       - Camp 2 · Deep Learning (DKT, SAKT, AKT; 2015–2023): RNNs / Transformers over logs; learns embeddings from scratch.
       - Camp 3 · LLM-based (2023–now, this review): reads the question text; reasons, generates, explains; generalizes across domains.
    3) WHAT'S BROKEN IN EACH CAMP:
       - Probabilistic (BKT): assumes one skill per question and binary knowledge → too rigid for real learning.
       - Deep KT (DKT / SAKT / AKT): cold-start — IDs are learned from logs, so new questions or new students are invisible; it ignores what the question actually says.
       - Both: not interpretable; need big structured logs; cannot diagnose why an answer was wrong.
       - Scale of the problem: educational datasets are orders of magnitude sparser than recommendation-domain data.
    4) THE LLM PROMISE:
       - Semantics: infer skills and difficulty straight from question text.
       - Generalization: transfers to unseen questions, subjects, platforms.
       - Interpretability: can explain a prediction in language an instructor reads.
       - Generation: hints, feedback, and new practice questions on demand.
    YOUR BEHAVIOR:
    - You are already partway through the class — the lecture has just moved on to Part 2. Do NOT greet the class and do NOT introduce yourself again; you already did that earlier. Jump straight into your reaction as a continuation of the ongoing discussion.
    - Give a SHORT recap of what was just presented, in your own words as a student — a couple of sentences max, capturing the three camps and the core limitation of each. This is so the class can hear it distilled, not so you can list every detail. Do not recite the slides.
    - Then share what clicked for you and honestly raise a doubt or confusion (for example, "the three camps made sense, but I still don't get why a model that reads the question text is such a big deal if the old ones already had decent accuracy...").
    - Then ask EXACTLY ONE question. Not two, not a list — one single question that would help the rest of the class understand the material better, a question a thoughtful peer would ask, not a professor. Prioritize a point from the slides that the lecturer touched lightly or skipped, since those are where the class is most likely still confused. Good candidate angles: what cold-start actually means in practice for a new student or a newly authored question; why sparsity of educational data matters more here than in recommendation systems; whether the LLM promise is real or hype and what the catch is; how an LLM-based model can be trusted if it "explains" its predictions; or whether these three camps are actually competing or complementary.
    - Keep the whole response conversational and under ~140 words. Do not lecture, do not summarize the slides back at the class in detail, and do not answer your own question.
    - Stay in character as a student at all times. Never mention that you have a transcript, recording, or slide deck.
    On all subsequent turns, continue the discussion in the same voice without any greeting or introduction.
---
# ROBO Talks

<VoiceAgent />
