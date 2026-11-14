
<div class="h-full flex flex-col items-center justify-center text-center">

<span class="rounded-full border border-blue-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-widest uppercase text-blue-700 dark:text-blue-300">Part 4 </span>

<h1 class="!text-6xl !mt-7 !mb-0 text-stone-900 dark:text-stone-100">Findings</h1>

<p class="mt-5! text-xl text-stone-950 dark:text-stone-400">What the 44 studies actually show — organized by theme, not by paper.</p>

<div class="mt-10 flex items-center gap-2">
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-blue-600"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
</div>

</div>

---

<div class="rounded-full border border-purple-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-wider uppercase text-purple-700 dark:text-purple-300 inline-block">
Finding 1 · RQ1
</div>

# Five Roles LLMs Play in KT

<div class="grid grid-cols-6 gap-4 mt-5">

<div v-click="1" class="col-span-2 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-4 flex flex-col gap-2">
<div class="flex items-center gap-3">
<div class="w-9 h-9 shrink-0 rounded-full bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 text-base font-black flex items-center justify-center">1</div>
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Semantic Extractor</div>
</div>
<div class="text-base text-stone-600 dark:text-stone-300">Encodes question text → feeds a separate KT backbone</div>
<span class="mt-auto self-start rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-0.5 text-xs font-bold text-blue-800 dark:text-blue-200">most common</span>
</div>

<div v-click="2" class="col-span-2 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-4 flex flex-col gap-2">
<div class="flex items-center gap-3">
<div class="w-9 h-9 shrink-0 rounded-full bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 text-base font-black flex items-center justify-center">2</div>
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Auxiliary Predictor</div>
</div>
<div class="text-base text-stone-600 dark:text-stone-300">Estimates difficulty / tags concepts for unseen items</div>
<span class="mt-auto self-start rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-0.5 text-xs font-bold text-blue-800 dark:text-blue-200">very common</span>
</div>

<div v-click="3" class="col-span-2 rounded-xl border border-stone-200/70 dark:border-stone-700/70 bg-white/80 dark:bg-stone-900/80 p-4 flex flex-col gap-2">
<div class="flex items-center gap-3">
<div class="w-9 h-9 shrink-0 rounded-full bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 text-base font-black flex items-center justify-center">3</div>
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Student Simulator</div>
</div>
<div class="text-base text-stone-600 dark:text-stone-300">Generates plausible wrong answers to augment data</div>
<span class="mt-auto self-start rounded-full bg-stone-200 dark:bg-stone-700 px-3 py-0.5 text-xs font-bold text-stone-700 dark:text-stone-200">rare, growing</span>
</div>

<div v-click="4" class="col-span-3 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 p-4 flex flex-col gap-2">
<div class="flex items-center gap-3">
<div class="w-9 h-9 shrink-0 rounded-full bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 text-base font-black flex items-center justify-center">4</div>
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Standalone Tracer</div>
</div>
<div class="text-base text-stone-600 dark:text-stone-300">LLM itself predicts the next response</div>
<span class="mt-auto self-start rounded-full bg-rose-100 dark:bg-rose-900/50 px-3 py-0.5 text-xs font-bold text-rose-700 dark:text-rose-200">contested ⚠</span>
</div>

<div v-click="5" class="col-span-3 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 p-4 flex flex-col gap-2">
<div class="flex items-center gap-3">
<div class="w-9 h-9 shrink-0 rounded-full bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 text-base font-black flex items-center justify-center">5</div>
<div class="font-bold text-lg text-stone-900 dark:text-stone-100">Hybrid Component</div>
</div>
<div class="text-base text-stone-600 dark:text-stone-300">LLM + sequential model, each covers the other's weakness</div>
<span class="mt-auto self-start rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-0.5 text-xs font-bold text-purple-800 dark:text-purple-200">rare, growing</span>
</div>

</div>

---

<div class="rounded-full border border-purple-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-wider uppercase text-purple-700 dark:text-purple-300 inline-block">
Finding 2 · RQ2
</div>

# Four Ways to Wire an LLM In

<div class="grid grid-cols-2 gap-5 mt-4">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 bg-white/80 dark:bg-stone-900/80">
<div class="flex items-center gap-2 px-5 py-2.5 border-b border-stone-200/70 dark:border-stone-700/70 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:chat text-xl text-stone-500 dark:text-stone-400" /> Prompting
</div>
<div class="p-5 text-base text-stone-600 dark:text-stone-300">
Serialize history → ask for a prediction.<br>
<span class="font-semibold text-rose-600 dark:text-rose-400">✗ Zero-shot alone loses to naive baselines</span>
</div>
</div>

<div v-click="2" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80">
<div class="flex items-center gap-2 px-5 py-2.5 border-b border-stone-200/70 dark:border-stone-700/70 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:settings-adjust text-xl text-blue-600 dark:text-blue-300" /> Fine-tuning
</div>
<div class="p-5 text-base text-stone-600 dark:text-stone-300">
Adapt weights (often LoRA). Selective loss masking.<br>
<span class="font-semibold text-green-700 dark:text-green-400">✓ Consistently beats prompting</span>
</div>
</div>

<div v-click="3" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80">
<div class="flex items-center gap-2 px-5 py-2.5 border-b border-stone-200/70 dark:border-stone-700/70 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:flow-connection text-xl text-purple-600 dark:text-purple-300" /> Frozen encoder + adapter
</div>
<div class="p-5 text-base text-stone-600 dark:text-stone-300">
LLM stays frozen; light adapter maps into KT backbone.<br>
<span class="font-semibold text-purple-700 dark:text-purple-300">→ LLM enriches, KT tracks time</span>
</div>
</div>

<div v-click="4" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80">
<div class="flex items-center gap-2 px-5 py-2.5 border-b border-stone-200/70 dark:border-stone-700/70 font-bold text-lg text-stone-900 dark:text-stone-100">
<div class="i-carbon:search text-xl text-green-600 dark:text-green-300" /> Retrieval-augmented (RAG)
</div>
<div class="p-5 text-base text-stone-600 dark:text-stone-300">
Pull evidence at inference: similar learners, subgraphs.<br>
<span class="font-semibold text-green-700 dark:text-green-400">✓ Widens the cold-start lead</span>
</div>
</div>

</div>

<div v-click="5" class="mt-4 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3 text-base font-semibold text-stone-800 dark:text-stone-100">
<b class="text-blue-700 dark:text-blue-300">The trend:</b> from <b>replacing</b> the KT backbone → to <b>augmenting</b> it.
</div>

---

<div class="rounded-full border border-purple-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-wider uppercase text-purple-700 dark:text-purple-300 inline-block">
Finding 4 · RQ3
</div>

# Where Does Pedagogy Actually Sit?

<div class="grid grid-cols-4 gap-4 mt-5 items-start">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-stone-400 bg-white/80 dark:bg-stone-900/80 p-4">
<div class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Level 1</div>
<div class="mt-1 font-bold text-lg text-stone-900 dark:text-stone-100">A claim</div>
<div class="mt-2 text text-stone-600 dark:text-stone-300">"mastery · scaffolding · feedback" — in motivation sections only</div>
<div class="mt-3 text-2xl font-black text-stone-500 dark:text-stone-400">most</div>
</div>

<div v-click="2" class="mt-3 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-yellow-500 bg-white/80 dark:bg-stone-900/80 p-4">
<div class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Level 2</div>
<div class="mt-1 font-bold text-lg text-stone-900 dark:text-stone-100">An input</div>
<div class="mt-2 text-stone-600 dark:text-stone-300">Difficulty calibration · concept & prerequisite structure fed to the model</div>
<div class="mt-3 text-2xl font-black text-yellow-700 dark:text-yellow-400">common</div>
</div>

<div v-click="3" class="mt-12 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 p-4">
<div class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Level 3</div>
<div class="mt-1 font-bold text-lg text-stone-900 dark:text-stone-100">A constraint</div>
<div class="mt-2 text-stone-600 dark:text-stone-300">Traced state → generated question, next concept, instructor report</div>
<div class="mt-3 text-2xl font-black text-blue-700 dark:text-blue-300">4 <span class="text-base font-bold text-stone-500">/ 44</span></div>
</div>

<div v-click="4" class="mt-18 rounded-xl border border-rose-300 dark:border-rose-800 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 p-4">
<div class="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Level 4</div>
<div class="mt-1 font-bold text-lg text-stone-900 dark:text-stone-100">An outcome</div>
<div class="mt-2  text-stone-600 dark:text-stone-300">Learning gains · retention · transfer actually measured</div>
<div class="mt-2 text-5xl leading-none font-black text-rose-600 dark:text-rose-400">0 <span class="text-base font-bold text-stone-500">/ 44</span></div>
</div>

</div>

<div v-click="5" class="mt-5 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3 text-base text-stone-800 dark:text-stone-100">
<b class="text-purple-700 dark:text-purple-300">Answer:</b> pedagogy enters as <b>vocabulary</b> and <b>features</b> — almost never as a decision rule, and never as a measured result.
</div>

<div v-click="6" class="mt-3 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 px-5 py-2.5 text-base text-stone-700 dark:text-stone-200">
<b class="text-green-700 dark:text-green-300">But it's achievable:</b> the 4 grounded studies used the <b>same public benchmarks</b> — grounding is a design choice, not a data limit.
</div>

<!--
Open by saying the staircase is the answer, then walk left to right and pause hard on the zero.

[click] Level 1: pedagogy appears as a claim — mastery, scaffolding, feedback — only in motivation sections for most studies.

[click] Level 2: pedagogy enters as an input through difficulty calibration and concept/prerequisite structure fed to the model, which is common.

[click] Level 3: pedagogy acts as a constraint in only 4 of 44 studies, where traced state drives generated question, next concept, or instructor report.

[click] Level 4: pedagogy is an outcome in 0 of 44 studies because learning gains, retention, and transfer are not actually measured — pause hard here.

[click] Answer: pedagogy enters as vocabulary and features, almost never as a decision rule and never as a measured result.

[click] But it’s achievable because the four grounded studies used the same public benchmarks, so grounding is a design choice not a data limit; Q&A ammunition: Huang 2026 is difficulty-aware IRT dialogue, Gao 2026 is question generation, Li 2024c is concept recommendation, Duan 2026 is report-generating retrieval, mastery learning is almost never invoked as a real decision rule, Meng 2026 found conventional models with the same numeric threshold produce radically different advancement decisions, scaffolding/feedback modelling exists only in the dialogue niche, and the gap comes from benchmarks lacking post-tests, venues rewarding AUC over learning effects, and pedagogy being treated as someone else’s downstream application.
-->


---

<div class="rounded-full border border-purple-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-wider uppercase text-purple-700 dark:text-purple-300 inline-block">
Finding 3 · RQ4 & RQ6
</div>

# So… Does It Actually Work in Practice?

<div class="grid grid-cols-2 gap-5 mt-4">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-green-700 dark:text-green-400 mb-3">
<div class="i-carbon:checkmark-outline text-xl" /> The Benchmark Reality
</div>
<div class="text-base text-stone-700 dark:text-stone-200 space-y-2.5">
<div v-click="2">✓ Wins on standard AUC (1–4 pt gains)</div>
<div v-click="3">✓ Dominates <b>cold-start & sparse data</b> scenarios</div>
<div v-click="4">✓ Fine-tuning & Hybrids consistently beat prompting</div>
</div>
</div>

<div v-click="5" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-rose-500 bg-white/80 dark:bg-stone-900/80 p-5">
<div class="flex items-center gap-2 font-bold text-lg text-rose-600 dark:text-rose-400 mb-3">
<div class="i-carbon:close-outline text-xl" /> The Deployment Reality
</div>
<div class="text-base text-stone-700 dark:text-stone-200 space-y-2.5">
<div v-click="6">✗ <b>Temporal incoherence:</b> mastery can drop after a correct answer</div>
<div v-click="7">✗ <b>Uncalibrated thresholds:</b> 0.85 is a score, not a mastery measurement — nothing anchors it to the student, and LLM outputs make it worse (token-generated, overconfident, opaque)</div>
<div v-click="8">✗ <b>Massive latency:</b> inference cost is orders of magnitude higher than standard KT</div>
<div v-click="9">⚠ <b>Context truncation:</b> long histories must be compressed, discarding signals</div>
</div>
</div>

</div>

<div v-click="10" class="mt-4 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-purple-500 bg-white/80 dark:bg-stone-900/80 px-5 py-3 text-base text-stone-800 dark:text-stone-100">
<b class="text-purple-700 dark:text-purple-300">Verdict:</b> LLMs win on <i>prediction benchmarks</i>, but fail on the <i>instructional metrics</i> (calibration, coherence, cost) that actually matter for teaching.
</div>
