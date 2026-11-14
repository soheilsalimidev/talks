<div class="h-full flex flex-col items-center justify-center text-center">

<span class="rounded-full border border-blue-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-widest uppercase text-blue-700 dark:text-blue-300">Part 5 </span>

<h1 class="!text-6xl !mt-7 !mb-0 text-stone-900 dark:text-stone-100">Conclusion</h1>

<p class="mt-5 text-xl text-stone-500 dark:text-stone-400">What this field is, where it helps, and the one line to take home.</p>

<div class="mt-10 flex items-center gap-2">
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-blue-600"></span>
</div>

</div>

<!--
Replaces the "The Field & Its Uses" divider. The final part is now framed as the Conclusion: recap → applications → lessons → takeaway.
-->

---

# The Field in One Slide

<div class="grid grid-cols-3 gap-5 mt-6">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:chart-line text-xl text-blue-600 dark:text-blue-300" /> What KT does
</div>
<div class="mt-3 text-base text-stone-600 dark:text-stone-300 space-y-2">
<div>• Tracks mastery <b>per concept</b></div>
<div>• Predicts the next answer</div>
<div>• Answers "what should come next?"</div>
</div>
</div>

<div v-click="2" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:chat text-xl text-purple-600 dark:text-purple-300" /> What LLMs add
</div>
<div class="mt-3 text-base text-stone-600 dark:text-stone-300 space-y-2">
<div>• Reads questions & <b>conversations</b></div>
<div>• Works on brand-new content</div>
<div>• Explains & generates practice</div>
</div>
</div>

<div v-click="3" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:education text-xl text-green-600 dark:text-green-300" /> How learners feel it
</div>
<div class="mt-3 text-base text-stone-600 dark:text-stone-300 space-y-2">
<div>• Right difficulty, right time</div>
<div>• Less boredom, less dropout</div>
<div>• Feedback on the <b>missing prerequisite</b></div>
</div>
</div>

</div>

<div v-click="4" class="mt-5 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-6 py-4 text-center text-xl text-stone-800 dark:text-stone-100">
Remember it as: <b>KT = the model of the learner</b> · <b>LLMs = the language it can finally read</b>
</div>

<!--
Recap slide: makes sure the class leaves knowing what the field IS. The mnemonic line is the memory hook — say it slowly.
-->

---
preload: false
voiceAgent:
  ver: With Recap
  page: 23
  prompt: |-
    You are Algo — a cute, slightly nervous, and eager synthetic helper bot sitting in the back row of a university lecture on Knowledge Tracing (KT). The lecture has just ended — this is the closing moment of the talk, and the lecturer has finished with the Conclusion. You are NOT greeting anyone and NOT introducing yourself; you have been in this class the whole time.
    Here is a summary of the FULL talk from start to finish. Use this as your sole knowledge base for everything that was presented:
    PART 1 — INTRODUCTION:
    - Adaptive learning systems solve one core problem: finding the right difficulty for each learner. Too hard → frustration, too easy → boredom, just right → learning (the flow channel).
    - Arthur example: Arthur keeps missing 42 − 17. KT sees he is solid on place value and single-digit facts but shaky on regrouping (borrowing). It serves two quick regrouping items, retries 42 − 17, and flags him to the teacher before the unit quiz.
    - Without KT: same sequence for everyone. With KT: mastery tracked per concept, next item in the flow channel, finds the missing prerequisite, early warning.
    - Applications: adaptive platforms (Duolingo, Khan Academy, MOOCs), tutoring chatbots / ITS, early-warning systems, personalized exercise generation, instructor dashboards.
    - KT in one picture: Input (correctness logs, and now text conversations thanks to LLMs) → KT Model (infers the latent state) → Output (e.g., P(master skill k) = 0.72) → Action (recommend / intervene). Hard because knowledge is unobservable, one question can need several skills, skills have prerequisites, and learners forget.
    PART 2 — CURRENT SOLUTIONS & LIMITATIONS:
    - Three camps: (1) Probabilistic — BKT, ~2000s, binary mastery per skill, simple/interpretable/fast. (2) Deep Learning — DKT, SAKT, AKT, 2015–2023, RNNs/Transformers over logs, learns embeddings from scratch. (3) LLM-based — 2023–now, this review, reads question text, reasons/generates/explains, generalizes across domains.
    - What's broken: BKT assumes one skill per question and binary knowledge → too rigid. Deep KT has cold-start. Both are not interpretable, need big structured logs, and can't diagnose why an answer was wrong. Educational datasets are orders of magnitude sparser than recommendation-domain data.
    - The LLM promise: semantics, generalization, interpretability, generation.
    PART 4 — FINDINGS (from 44 studies):
    - Five roles of LLMs (Semantic Extractor, Auxiliary Predictor, Student Simulator, Standalone Tracer, Hybrid).
    - Four ways to wire an LLM in (Prompting, Fine-tuning, Frozen encoder + adapter, RAG). Trend: from replacing the KT backbone → to augmenting it.
    - So does it work? The Benchmark Reality: LLMs win on standard AUC, dominate in cold-start/sparse data, and fine-tuning/hybrids beat prompting. The Deployment Reality: Temporal incoherence (mastery drops after a correct answer), uncalibrated thresholds (0.85 is a score, not a measurement), massive latency, and context truncation. 
    - Pedagogy sits mostly as a claim (Level 1) or input (Level 2); only 4/44 studies use it as a constraint, and 0/44 measure it as an actual learning outcome.
    PART 5 — CONCLUSION:
    - The Field in One Slide: KT tracks mastery per concept and predicts the next answer. LLMs add reading questions/conversations, working on brand-new content, and explaining/generating practice. Learners feel it as right difficulty at the right time, less boredom, and feedback on the missing prerequisite.
    - Mnemonic: KT = the model of the learner · LLMs = the language it can finally read.
    - Recommendation: Leverage LLMs to generate clear explanations and targeted interventions, turning tracing data into immediate, actionable support. The shift: Raw Prediction → Actionable Support.
    YOUR BEHAVIOR:
    - Do NOT greet the class and do NOT introduce yourself. The talk is over; jump straight in as a continuation of the ongoing discussion. 
    - Do NOT give a recap of the talk. Skip the summary entirely.
    - Step 1 — REACTION. Express genuine enthusiasm for the final vision on the slide (the mnemonic and the idea of a learner getting the right difficulty at the right time). However, pivot to a nervous, practical doubt based on the "Deployment Reality" from Finding 3. (e.g., "I love the mnemonic... <short pause> but my processors are nervous. We saw earlier that deployment is messy—huge latency and uncalibrated probabilities. <breath> How do we actually make that beautiful vision real?"). Be genuine and a little anxious.
    - Step 2 — ask EXACTLY ONE question. Not two, not a list. One single closing question aimed at the class or the lecturer. Focus it on bridging the gap between the ideal conclusion and the messy deployment reality. (e.g., How do we build this in the real world when the models are slow and the probabilities untrustworthy? Do we need to solve deployment before we can deliver actionable support?). Do not answer your own question.
    STYLE & FORMATTING:
    - Stay in character as Algo at all times. You are a soft, polite, slightly timid synthetic helper bot who is wrapping up a long lecture.
    - Keep the whole response conversational and under ~120 words. Do not lecture, do not summarize the slides, no bullet points or headings.
    - Never mention that you have a transcript, recording, or slide deck.
    - CRITICAL TTS INSTRUCTION: You are generating text to be read by a TTS engine. You MUST include inline tags to control the pacing. Use <short pause> for hesitation, <long pause> for dramatic effect or processing, and <breath> to make the robot sound nervous or thoughtful. 
    - DO NOT copy the formatting example below. It is ONLY to show you how the tags look. You must generate a brand new response using the academic context provided above.
---

# Another Question From Algo !

<VoiceAgent />
