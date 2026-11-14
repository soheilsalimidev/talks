
<div class="h-full flex flex-col items-center justify-center text-center">

<span class="rounded-full border border-blue-500/50 bg-white/80 dark:bg-stone-900/80 px-4 py-1.5 text-sm font-semibold tracking-widest uppercase text-blue-700 dark:text-blue-300">Part 3</span>

<h1 class="!text-6xl !mt-7 !mb-0 text-stone-900 dark:text-stone-100">The Method</h1>

<p class="mt-5 text-xl text-stone-900 dark:text-stone-400">What's missing from the literature — and exactly how we searched for it.</p>

<div class="mt-10 flex items-center gap-2">
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-blue-600"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
<span class="h-2.5 w-16 rounded-full bg-stone-300 dark:bg-stone-700"></span>
</div>

</div>

---

# Five Research Questions

<div class="flex flex-col gap-3 mt-5">

<div v-click="1" class="flex items-center gap-4 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-5 py-2.5">
<span class="shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-0.5 text-sm font-black text-blue-800 dark:text-blue-200">RQ1</span>
<span class="text-base text-stone-700 dark:text-stone-200">Which KT limitations motivate LLMs — and what <b>roles</b> do LLMs play?</span>
</div>

<div v-click="2" class="flex items-center gap-4 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-5 py-2.5">
<span class="shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-0.5 text-sm font-black text-blue-800 dark:text-blue-200">RQ2</span>
<span class="text-base text-stone-700 dark:text-stone-200">How are LLMs <b>technically integrated</b> into KT architectures?</span>
</div>

<div v-click="3" class="flex items-center gap-4 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-5 py-2.5">
<span class="shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-0.5 text-sm font-black text-blue-800 dark:text-blue-200">RQ3</span>
<span class="text-base text-stone-800 dark:text-stone-100">Where does <b>pedagogical grounding</b> actually sit in these systems — an input, a constraint, or just a claim?</span>
</div>

<div v-click="4" class="flex items-center gap-4 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-5 py-2.5">
<span class="shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-0.5 text-sm font-black text-blue-800 dark:text-blue-200">RQ4</span>
<span class="text-base text-stone-700 dark:text-stone-200">What datasets & metrics are used — and can we <b>trust</b> the evidence?</span>
</div>

<div v-click="5" class="flex items-center gap-4 rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-blue-500 bg-white/80 dark:bg-stone-900/80 px-5 py-2.5">
<span class="shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-0.5 text-sm font-black text-blue-800 dark:text-blue-200">RQ5</span>
<span class="text-base text-stone-700 dark:text-stone-200">What gaps and future directions remain?</span>
</div>

</div>

---

# How I Searched

<div class="flex items-center justify-center gap-4 mt-8">

<div v-click="1" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 bg-white/80 dark:bg-stone-900/80 px-8 py-5 text-center">
<div class="text-5xl font-black text-stone-900 dark:text-stone-100">62</div>
<div class="mt-1 text-sm text-stone-500 dark:text-stone-400">records retrieved</div>
</div>

<div v-click="2" class="i-carbon:arrow-right text-2xl text-stone-400" />

<div v-click="2" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 bg-white/80 dark:bg-stone-900/80 px-8 py-5 text-center">
<div class="text-5xl font-black text-stone-500 dark:text-stone-400">18</div>
<div class="mt-1 text-sm text-stone-500 dark:text-stone-400">excluded after screening</div>
</div>

<div v-click="3" class="i-carbon:arrow-right text-2xl text-stone-400" />

<div v-click="3" class="rounded-xl border border-stone-200/70 dark:border-stone-700/70 border-l-4 border-l-green-500 bg-white/80 dark:bg-stone-900/80 px-8 py-5 text-center">
<div class="text-5xl font-black text-green-700 dark:text-green-300">44</div>
<div class="mt-1 text-sm text-green-700 dark:text-green-300">included in synthesis</div>
</div>

</div>

<div class="flex flex-col gap-2.5 mt-8 text-base text-stone-700 dark:text-stone-200">
<div v-click="4">• <b>Guideline:</b> PRISMA 2020 · <b>Span:</b> 2020–2026</div>
<div v-click="4">• <b>Sources:</b> Google Scholar + arXiv, assisted by Scholar Labs & alphaXiv</div>
<div v-click="5">• <b>Inclusion:</b> addresses KT <b>and</b> uses an LLM component <b>and</b> reports an empirical result</div>
</div>

