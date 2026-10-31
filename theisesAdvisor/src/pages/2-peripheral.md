# Seven Papers · Three Ways to Wrap an LLM

<div grid="~ cols-3 gap-3" mt6 text-sm>

<div v-click="1" bg-blue:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded font-semibold text-blue-6>
<div i-carbon:connect text-xl /> LLM ⟷ traditional KT
</div>
<div ml2 p2  flex="~ col gap-1">
<div><b>DDKT</b> — LLM judges difficulty → gated KT model</div>
<div><b>LLM-KT</b> — text & KT encoders plug into the LLM</div>
<div><b>MOSAIC</b> — frozen LLM embeds context → KT backbone</div>
</div>
</div>

<div v-click="2" bg-green:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:chat-operational text-xl /> LLM as the tracer
</div>
<div ml2 p2  flex="~ col gap-1">
<div><b>CLST</b> — KT written in natural language, LoRA-tuned</div>
<div><b>EFKT</b> — few-shot cognitive diagnosis, frozen</div>
<div><b>LOKT</b> — option-weight compressed prompts, frozen</div>
</div>
</div>

<div v-click="3" bg-purple:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-purple:10 px4 py2 rounded font-semibold text-purple-6>
<div i-carbon:flow text-xl /> RAG + structured tracing
</div>
<div ml2 p2  flex="~ col gap-1">
<div><b>KnowTrace</b> — KG-guided iterative RAG for multi-hop QA</div>
</div>
</div>

</div>

<div v-click="4" mt-6 rounded-r-lg border-l-4 border-blue-400:60 bg-blue:10 px4 py2 text-sm text-gray-700>
<b class="text-blue-600">Common thread:</b> the LLM itself stays frozen (or LoRA-only) — every gain is engineered in the peripherals around it.
</div>

---

# Frozen LLM → Trained KT Backbone

<div flex="~ items-center gap-2" mt-1 mb-2 text-xs>
<span rounded-full border="~ blue/30" bg-blue:10 px2 py0.5 font-semibold text-blue-6>DDKT + MOSAIC</span>
<span op60>LLM never predicts — it only extracts signal for a classic-style KT module</span>
</div>

<div grid="~ cols-2 gap-3" text-sm>

<div v-click="1" bg-blue:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded font-semibold text-blue-6>
<div i-carbon:chat text-xl /> DDKT — LLM as difficulty judge
</div>
<div ml2 p2 >
<v-clicks :at="2">
<div><b>d<sub>llm</sub></b>: GLM-4 grades difficulty via 2-phase CoT; fused with statistical rate by multi-head attention → calibrated <b>d<sub>cal</sub></b></div>
<div><b>DPBS</b> (d<sub>cal</sub> − knowledge state) + <b>DMR</b> (mastery per difficulty band) → TransformerEncoder → adaptability index</div>
<div>Gated SKG / KPT update → knowledge state; LLM stays frozen, works on brand-new questions</div>
</v-clicks>
</div>
</div>

<div v-click="4" bg-blue:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded font-semibold text-blue-6>
<div i-carbon:magic-wand text-xl /> MOSAIC — LLM as semantic aligner
</div>
<div ml2 p2 >
<v-clicks :at="5">
<div>Frozen Qwen2.5-7B encodes question + behaviors + peer/instructor text → e<sub>t</sub>; builds hierarchical prompts → z<sub>t</sub>; cached offline, no gradient through the LLM</div>
<div>Sequential transformer backbone tracks the latent knowledge state s<sub>t</sub></div>
<div>Concept / topic-cluster / global heads + cross-granularity consistency loss</div>
</v-clicks>
</div>
</div>

</div>

<div v-click="7" mt-4 rounded-r-lg border-l-4 border-blue-400:60 bg-blue:10 px4 py2 text-sm text-gray-700>
<b class="text-blue-600">Same recipe, different peripheral:</b> difficulty signal (DDKT) vs semantic embedding (MOSAIC) — both beat baselines most where data is sparse or sequences long (DDKT AUC +2–8% · MOSAIC +3.4% AUC).
</div>

---

# Reframing KT as a Natural-Language Task

<div flex="~ items-center gap-2" mt-1 mb-2 text-xs>
<span rounded-full border="~ green/30" bg-green:10 px2 py0.5 font-semibold text-green-6>CLST + EFKT</span>
<span op60>The LLM itself traces — via fine-tuning or via few-shot scaffolding</span>
</div>

<div grid="~ cols-2 gap-3" text-sm>

<div v-click="1" bg-green:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:language text-xl /> CLST — KTLP formatting + LoRA
</div>
<div ml2 p2 >
<v-clicks :at="2">
<div>History written in NL: "exercise description → correct/incorrect"; exercises named by KC, not ID; label becomes yes/no</div>
<div>Mistral-7B-Instruct backbone frozen; only low-rank matrices trained; prediction = softmax over yes/no logits</div>
<div>Cold-start protocol: train on just 8–64 students</div>
</v-clicks>
</div>
</div>

<div v-click="4" bg-green:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:education text-xl /> EFKT — few-shot, zero training
</div>
<div ml2 p2 >
<v-clicks :at="5">
<div>New task: a few records in → prediction <b>plus natural-language explanation</b> out</div>
<div>Cognition-guided loop from assessment theory: <b>observe</b> (select records) → <b>cognize</b> (good/fair/fail per concept) → <b>interpret</b> (why the student missed it)</div>
<div>Frozen GLM4 / GPT-4; side info as IDs → concepts → exercise text</div>
</v-clicks>
</div>
</div>

</div>

<div v-click="7" mt-4 rounded-r-lg border-l-4 border-green-400:60 bg-green:10 px4 py2 text-sm text-gray-700>
<b class="text-green-600">Shared insight:</b> description-based exercises beat IDs — the LLM's world knowledge links related KCs. CLST up to +24.5% with 8 students · EFKT's 4–16 shots match full-data DKT/AKT/SAINT.
</div>

---

# LOKT — Compress History into Four Semantic Words

<div flex="~ items-center gap-2" mt-1 mb-2 text-xs>
<span rounded-full border="~ green/30" bg-green:10 px2 py0.5 font-semibold text-green-6>LLM as the tracer · frozen GPT-4o</span>
<span op60>Kim et al. 2025 · inference only</span>
</div>

<div flex="~ col gap-3" text-sm>
<div v-click="1" bg-green:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:calculation text-xl /> Option weights from peer learners
</div>
<div ml2 p2 >
Difficulty-adjusted proficiency + correlation between option choice and proficiency → continuous weight per option (−1 … +1)
</div>
</div>
<div v-click="2" bg-green:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:text-annotation-toggle text-xl /> TCOW — weights become words
</div>
<div ml2 p2 >
Ranks mapped to <b>Proficient / Partial / Limited / Inadequate</b> — semantic labels an LLM can actually reason with
</div>
</div>
<div v-click="3" bg-green:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:compress text-xl /> Compressed prompt
</div>
<div ml2 p2 >
Selected option + TCOW label replaces full interaction histories → constant token cost, frozen GPT-4o, no fine-tuning
</div>
</div>
</div>

<div v-click="4" mt-4 rounded-r-lg border-l-4 border-green-400:60 bg-green:10 px4 py2 text-sm text-gray-700>
<b class="text-green-600">Key finding:</b> semantic structure beats raw compression — TCOW ≻ ordinal ≻ continuous; best cold-start ACC while ICL costs grow until they hit GPT-4o's token limit.
</div>

---

# KnowTrace — Structured Knowledge Tracing for RAG

<div flex="~ items-center gap-2" mt-1 mb-2 text-xs>
<span rounded-full border="~ purple/30" bg-purple:10 px2 py0.5 font-semibold text-purple-6>RAG cluster · multi-hop QA</span>
<span op60>Li et al. 2025 · frozen LLM at inference</span>
</div>

<div flex="~ col gap-3" text-sm>
<div v-click="1" bg-purple:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-purple:10 px4 py2 rounded font-semibold text-purple-6>
<div i-carbon:flow text-xl /> Iterative RAG as KG expansion
</div>
<div ml2 p2 >
<b>Exploration</b>: LLM decides — answer now or emit (entity, relation) pairs → retrieve → <b>completion</b>: extract triplets → expand the KG; repeat until sufficient
</div>
</div>
<div v-click="2" bg-purple:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-purple:10 px4 py2 rounded font-semibold text-purple-6>
<div i-carbon:tree-view text-xl /> KG context instead of piled-up text
</div>
<div ml2 p2 >
KG-to-Triplets prompting keeps the context intelligible — kills the context overload of plain iterative RAG
</div>
</div>
<div v-click="3" bg-purple:10 border="~ gray:50 rounded-lg">
<div flex="~ items-center gap-2" bg-purple:10 px4 py2 rounded font-semibold text-purple-6>
<div i-carbon:reset text-xl /> Backtracing → self-bootstrapping
</div>
<div ml2 p2 >
Trace back from the answer through the KG → keep only contributive generations → clean process-supervision data for self-taught LoRA finetuning
</div>
</div>
</div>

<div v-click="4" mt-4 rounded-r-lg border-l-4 border-purple-400:60 bg-purple:10 px4 py2 text-sm text-gray-700>
<b class="text-purple-600">Takeaway:</b> giving the LLM a structured, self-built context beats accumulating retrieved text — avg EM +5.3% over IRCoT at comparable cost. Note: this one is MHQA, but the same "structured tracing as a peripheral" idea transfers to KT.
</div>

---

# Conclusion: The "Peripherals" Paradigm in KT

<div flex="~ col gap-4" py4>
  <div v-click="1" rounded-r-lg border-l-4 border-blue-500:60 bg-blue-500:5 px-4 py-3 text-sm text-gray-600 dark:text-gray-200>
    <b class="text-blue-500 dark:text-blue-300">Core Thesis:</b> We do not need to retrain or heavily fine-tune the main LLM to achieve SOTA Knowledge Tracing. The performance gains come entirely from engineering the <b>peripherals</b>—the structure, compression, and modality bridging around the frozen model.
  </div>

  <div grid="~ cols-3 gap-3" mt-2>
    <div v-click="2" class="rounded-lg border border-gray-200 dark:border-gray-700 bg-purple-500:10">
      <div class="flex items-center gap-2 px-4 py-2 rounded bg-purple-500:10 text-purple-500 dark:text-purple-300 font-semibold">
        <div i-carbon:flow text-xl /> Structural Compression
      </div>
      <div class="p-3 text-gray-600 dark:text-gray-200 text-sm">
        Instead of piling raw text, compress histories into intelligible structures. 
        <br/><br/>
        <span class="font-mono text-xs bg-purple-500/20 px-1.5 py-0.5 rounded">LOKT</span> uses semantic option weights. 
        <span class="font-mono text-xs bg-purple-500/20 px-1.5 py-0.5 rounded">KnowTrace</span> builds iterative KG triplets.
      </div>
    </div>
    <div v-click="3" class="rounded-lg border border-gray-200 dark:border-gray-700 bg-blue-500:10">
      <div class="flex items-center gap-2 px-4 py-2 rounded bg-blue-500:10 text-blue-500 dark:text-blue-300 font-semibold">
        <div i-carbon:plug text-xl /> Modality Bridging
      </div>
      <div class="p-3 text-gray-600 dark:text-gray-200 text-sm">
        Let traditional models do what they do best: handle ID sequences and long-term dependencies.
        <br/><br/>
        <span class="font-mono text-xs bg-blue-500/20 px-1.5 py-0.5 rounded">LLM-KT</span> & <span class="font-mono text-xs bg-blue-500/20 px-1.5 py-0.5 rounded">MOSAIC</span> feed sequence/KG embeddings directly into the LLM's hidden layers via adapters.
      </div>
    </div>
    <div v-click="4" class="rounded-lg border border-gray-200 dark:border-gray-700 bg-green-500:10">
      <div class="flex items-center gap-2 px-4 py-2 rounded bg-green-500:10 text-green-500 dark:text-green-300 font-semibold">
        <div i-carbon:chat-operational text-xl /> Cognitive Scaffolding
      </div>
      <div class="p-3 text-gray-600 dark:text-gray-200 text-sm">
        Use the LLM as a specialized judge or few-shot reasoner, not a raw sequence predictor.
        <br/><br/>
        <span class="font-mono text-xs bg-green-500/20 px-1.5 py-0.5 rounded">DDKT</span> uses LLM for difficulty assessment. <span class="font-mono text-xs bg-green-500/20 px-1.5 py-0.5 rounded">EFKT</span> uses curated cognitive diagnosis prompts.
      </div>
    </div>
  </div>
</div>

---

# Next Step — Context-Aware Extraction Pipeline

<div class="abs inset-0 flex items-center justify-center scale-90 origin-center">
<svg viewBox="0 0 1280 720" class="w-full h-full" font-family="sans-serif">
  <defs>
    <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0L10,5L0,10z" fill="#55606c"/>
    </marker>
  </defs>

  <!-- 1: input + extractor -->
  <g v-click="1">
    <text x="90" y="330" text-anchor="middle" font-size="5">raw</text>
    <text x="90" y="344" text-anchor="middle" font-size="5">dialogue</text>
    <line x1="40" y1="350" x2="152" y2="350" stroke="#55606c" marker-end="url(#ar)"/>
    <rect x="161" y="295" width="161" height="111" fill="#dbe7f6" stroke="#7a9cc6"/>
    <text x="241" y="340" text-anchor="middle" font-size="5" font-weight="600">System-1</text>
    <text x="241" y="358" text-anchor="middle" font-size="5" font-weight="600">Extractor</text>
    <text x="241" y="376" text-anchor="middle" font-size="5">(500M)</text>
  </g>

  <!-- 2: KC graph embeddings -> extractor -->
  <g v-click="2">
    <text x="217" y="58" text-anchor="middle" font-size="5" font-weight="600">KC graph</text>
    <text x="217" y="74" text-anchor="middle" font-size="5" font-weight="600">embeddings</text>
    <g stroke="#5b8ac9" fill="none">
      <line x1="213" y1="165" x2="169" y2="193"/><line x1="213" y1="165" x2="257" y2="191"/>
      <line x1="169" y1="193" x2="201" y2="221"/><line x1="257" y1="191" x2="235" y2="226"/>
      <line x1="201" y1="221" x2="235" y2="226"/>
    </g>
    <g fill="#a8c8ee" stroke="#5b8ac9">
      <circle cx="213" cy="165" r="8"/><circle cx="169" cy="193" r="8"/><circle cx="257" cy="191" r="8"/>
      <circle cx="201" cy="221" r="8"/><circle cx="235" cy="226" r="8"/>
    </g>
    <line x1="217" y1="241" x2="217" y2="288" stroke="#55606c" marker-end="url(#ar)"/>
  </g>

  <!-- 3: memory bank -->
  <g v-click="3">
    <path d="M178,520 v40 a33,10 0 0 0 66,0 v-40" fill="#eef1f5" stroke="#9aa5b1"/>
    <ellipse cx="211" cy="520" rx="33" ry="10" fill="#eef1f5" stroke="#9aa5b1"/>
    <path d="M178,533 a33,10 0 0 0 66,0 M178,546 a33,10 0 0 0 66,0" fill="none" stroke="#9aa5b1"/>
    <text x="211" y="596" text-anchor="middle" font-size="5">cross-dataset</text>
    <text x="211" y="612" text-anchor="middle" font-size="5">memory bank</text>
  </g>

  <!-- 4: memory -> extractor (similar cognitive states) -->
  <g v-click="4">
    <line x1="211" y1="510" x2="211" y2="412" stroke="#55606c" marker-end="url(#ar)"/>
    <text x="219" y="452" text-anchor="start" font-size="4">similar</text>
    <text x="219" y="464" text-anchor="start" font-size="4">cognitive</text>
    <text x="219" y="476" text-anchor="start" font-size="4">states</text>
  </g>

  <!-- 5: extracted JSON -->
  <g v-click="5">
    <line x1="331" y1="345" x2="828" y2="345" stroke="#55606c" marker-end="url(#ar)"/>
    <text x="580" y="312" text-anchor="middle" font-size="5">extracted</text>
    <text x="580" y="335" text-anchor="middle" font-size="5">JSON</text>
    <text x="580" y="364" text-anchor="middle" font-size="4">emotion,</text>
    <text x="580" y="378" text-anchor="middle" font-size="4">knowledge</text>
    <text x="580" y="392" text-anchor="middle" font-size="4">components,</text>
    <text x="580" y="406" text-anchor="middle" font-size="4">error types</text>
  </g>

  <!-- 6: LLM container -->
  <g v-click="6">
    <rect x="836" y="246" width="269" height="237" fill="#f2f4f7" stroke="#c9d2dc"/>
    <rect x="848" y="278" width="55" height="188" fill="#f8f0e8" stroke="#e0c9a8"/>
    <rect x="853" y="320" width="50" height="44" fill="#f6e3cd" stroke="#d98f4a"/>
    <text x="878" y="346" text-anchor="middle" font-size="4">LoRA</text>
    <rect x="853" y="404" width="50" height="44" fill="#f6e3cd" stroke="#d98f4a"/>
    <text x="878" y="430" text-anchor="middle" font-size="3">projector</text>
    <path d="M903,342 H910 V426 H903" fill="none" stroke="#d98f4a"/>
    <rect x="923" y="278" width="160" height="188" fill="#eef1f5" stroke="#b8c2cc"/>
    <text x="1003" y="368" text-anchor="middle" font-size="7" font-weight="600">Main LLM</text>
    <text x="1003" y="388" text-anchor="middle" font-size="4">(frozen)</text>
  </g>

  <!-- 7: memory -> persona.txt (student learning persona) -->
  <g v-click="7">
    <line x1="244" y1="530" x2="482" y2="520" stroke="#55606c" marker-end="url(#ar)"/>
    <text x="363" y="508" text-anchor="middle" font-size="4">retrieved persona</text>

    <rect x="490" y="468" width="190" height="112" fill="#eef7ee" stroke="#7aa67a"/>
    <text x="585" y="487" text-anchor="middle" font-size="5.5" font-weight="600">persona.txt</text>
    <text x="585" y="500" text-anchor="middle" font-size="3.5">student learning persona</text>
    <text x="500" y="516" font-size="4">• cognitive_level</text>
    <text x="500" y="530" font-size="4">• metacognition</text>
    <text x="500" y="544" font-size="4">• cognitive_flexibility</text>
    <text x="500" y="558" font-size="4">• persistence</text>
    <text x="500" y="572" font-size="4">• working_memory</text>
  </g>

  <!-- 8: memory -> question-KC relation graph -->
  <g v-click="8">
    <polyline points="244,552 268,552 268,632 482,632" fill="none" stroke="#55606c" marker-end="url(#ar)"/>
    <text x="375" y="622" text-anchor="middle" font-size="4">retrieved Q–KC relations</text>

    <rect x="490" y="600" width="190" height="64" fill="#eef7ee" stroke="#7aa67a"/>
    <text x="585" y="622" text-anchor="middle" font-size="5" font-weight="600">question–KC</text>
    <text x="585" y="638" text-anchor="middle" font-size="5" font-weight="600">relation graph</text>
    <text x="585" y="654" text-anchor="middle" font-size="3.5">(questions + KC edges)</text>
  </g>

  <!-- 9: persona + Q-KC graph merged into LLM -->
  <g v-click="9">
    <polyline points="680,632 706,632 706,520" fill="none" stroke="#55606c"/>
    <polyline points="680,520 706,520 706,420 828,420" fill="none" stroke="#55606c" marker-end="url(#ar)"/>
    <text x="766" y="410" text-anchor="middle" font-size="4">persona + Q–KC graph</text>
  </g>

  <!-- 10: output -->
  <g v-click="10">
    <line x1="1109" y1="356" x2="1233" y2="356" stroke="#55606c" marker-end="url(#ar)"/>
    <text x="1173" y="332" text-anchor="middle" font-size="6">tutoring</text>
    <text x="1173" y="348" text-anchor="middle" font-size="6">response</text>
  </g>
</svg>
</div>

---

# Frist Trial — 500M Extractor

<div flex="~ items-center gap-2" mt-1 mb-3 text-xs>
<span rounded-full border="~ orange/30" bg-orange:10 px2 py0.5 font-semibold text-orange-6>own idea · raw output</span>
<span op60>frozen ~500M model, prompt-only · 92ms latency · 1357 input / 75 state tokens</span>
</div>

<div grid="~ cols-2 gap-4" text-sm>

<!-- Left: The Dialogue -->
<div v-click="1" bg-gray:5 border="~ gray/20 rounded-lg" overflow-hidden>
<div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded font-semibold text-gray-7>
<div i-carbon:chat text-base /> The Transcript (2 Turns)
</div>
<div p3 flex="~ col gap-2" text-xs font-mono leading-relaxed>
<div><span text-blue-6 font-bold>T9 Teacher:</span> <span op60>(focusing)</span> hello. we know there were 6 people there. how many plates did each person use?</div>
<div><span text-green-6 font-bold>T10 Student:</span> Each person used 2 plates per meal, so 6 people would use 6 x 2 = 12 plates per day. Therefore, 12 x 4 = 48 plates were used in 4 days.</div>
</div>
</div>

<!-- Right: The JSON Output -->
<div v-click="2" bg-gray:5 border="~ gray/20 rounded-lg" overflow-hidden>
<div flex="~ items-center gap-2" bg-orange:10 px4 py2 rounded font-semibold text-orange-6>
<div i-carbon:code text-base /> Raw JSON Output (`kev-latest`)
</div>
<div p3 flex="~ col gap-1" text-xs font-mono>

<!-- ZPD, Status, Impasse highlighted at top -->
<div border="~ purple/40" rounded p2 mb2 bg-purple:5>
<div font-sans font-bold text-purple-6 mb1.5>Core Diagnostic Fields:</div>
<div flex="~ justify-between items-center" mb1>
<span >last_zpd_state:</span> 
<span text-purple-6 font-bold>unknown (47%)</span>
</div>
<div text-xs op70 ml1 mb1>needs_more_than_depth_4 (29%) · success_at_depth_4 (23%)</div>
<div flex="~ justify-between items-center" mb1>
<span >status:</span> 
<span text-yellow-6 font-bold>needs_more_support (25%)</span>
</div>
<div text-xs op70 ml1 mb1>in_progress (23%) · error_involved (9%)</div>
<div flex="~ justify-between items-center">
<span >impasse_type:</span> 
<span text-rose-6 font-bold>rejection (27%)</span>
</div>
<div text-xs op70 ml1>conflict (24%) · none (24%) · tie (15%)</div>
</div>

<!-- Other fields -->
<div flex="~ justify-between"><span >teacher_move:</span> <span text-green-6>focusing (0.44)</span></div>
<div flex="~ justify-between"><span >error_type_ongoing:</span> <span text-yellow-6>careless (0.31)</span></div>
<div flex="~ justify-between"><span >final_answer_correct:</span> <span text-rose-6>False (0.40)</span></div>
<div flex="~ justify-between"><span >cognitive_level:</span> <span>Remembering (0.44)</span></div>
<div flex="~ justify-between"><span >emotion:</span> <span>confused (0.53)</span></div>
</div>
</div>

</div>

<div v-click="3" mt-4 rounded-r-lg border-l-4 border-purple-400:60 bg-purple:10 px4 py2 text-sm text-gray-700>
<b class="text-purple-600">Key Observation:</b> The model cannot determine ZPD state (unknown 47%) despite the teacher's focusing move at depth 4. It detects an impasse ("rejection" 27%) but misclassifies the status as "needs_more_support" rather than "error_involved" — suggesting the 500M model needs graph-embedded retrieval to anchor these pedagogical states.
</div>

<!--
- **error_type_ongoing** — Shows what kind of error the student is making, or N/A if correctness = 1.
- **impasse_type** — Shows what cognitive impasse, if any, appears in the last turn (T10).
- **correctness** — Shows whether the student’s final answer in T10 is correct.
- **is_error** — Shows whether T10 contains an error.
- **teacher_move** — Shows what teacher move in T9 prompted the student’s T10 response.
- **student_response_to_correction** — Shows how the student responds in T10 to the teacher’s correction in T9.
- **emotion** — Shows the emotion the student expresses in T10.
- **frustration** — Shows how frustrated the student is in T10.
- **cognitive_level** — Shows the cognitive level inferable from the student’s math work in T10.
- **metacognition** — Shows how well the student monitors and adjusts their own reasoning in T10.
- **cognitive_flexibility** — Shows how flexibly the student adapts when the teacher prompts a different approach in T10.
- **persistence** — Shows how persistently the student continues working through corrections in T10.
- **working_memory** — Shows how well the student holds and manipulates problem constraints in T10.
- **confidence** — Shows confidence in the diagnostic tag assigned to T10.
- **status** — Shows the current status of the Knowledge Component after T10.
- **last_zpd_state** — Shows the student’s ZPD state after T10 relative to the T9 scaffold depth.
- **final_answer_correct** — Shows whether the final answer in T10 is correct.
- **item_difficulty** — Shows how difficult the item being solved in T10 is.
- **escalate** — Shows whether T10 requires urgent human attention.
-->

---

# Audit — Pedagogical & Error Tracking

<div flex="~ items-center gap-2" mt-1 mb-3 text-xs>
<span rounded-full border="~ orange/30" bg-orange:10 px2 py0.5 font-semibold text-orange-6>own idea · analysis</span>
<span op60>evaluating the model's grasp of dialogue mechanics and error diagnosis</span>
</div>

<div grid="~ cols-2 gap-3" text-sm>

<div v-click="1" bg-green:10 border="~ green/30 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:checkmark-filled text-base /> Teacher Move & Response: <b class="ml-1">Hit</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>focusing</code> (44%) & <code>no_correction_in_step</code> (48%)</div>
<div><b>Truth:</b> <i>Exactly this.</i> T9 was a focusing question, not a correction. The model correctly identified the structural flow of the dialogue.</div>
</div>
</div>

<div v-click="2" bg-green:10 border="~ green/30 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:checkmark-filled text-base /> Final Answer Correct: <b class="ml-1">Hit</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>False</code> (0.40 noul)</div>
<div><b>Truth:</b> <i>False.</i> 12 plates/meal ≠ 12 plates/day. The model correctly flags the final answer as incorrect, despite low confidence.</div>
</div>
</div>

<div v-click="3" bg-yellow:10 border="~ yellow/30 rounded-lg">
<div flex="~ items-center gap-2" bg-yellow:10 px4 py2 rounded font-semibold text-yellow-6>
<div i-carbon:warning text-base /> Error Type: <b class="ml-1">Nuanced Miss</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>careless</code> (31%) vs <code>misinterpret</code> (21%)</div>
<div><b>Truth:</b> <i>Misinterpret.</i> The student conflated "per meal" with "per day". "Careless" implies a slip in a correct procedure; here, the procedure itself was built on a misread unit.</div>
</div>
</div>

<div v-click="4" bg-rose:10 border="~ rose/30 rounded-lg">
<div flex="~ items-center gap-2" bg-rose:10 px4 py2 rounded font-semibold text-rose-6>
<div i-carbon:close-filled text-base /> Status: <b class="ml-1">Miss</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>needs_more_support</code> (25%)</div>
<div><b>Truth:</b> <i>error_involved.</i> The turn actively contains an error tied to the Knowledge Component. "Needs more support" implies the error was resolved but scaffolding is still needed.</div>
</div>
</div>

</div>

<div v-click="5" mt-3 rounded-r-lg border-l-4 border-orange-400:60 bg-orange:10 px4 py2 text-sm text-gray-700>
<b class="text-orange-600">Takeaway:</b> The 500M model is highly reliable for <b>dialogue structure</b> (moves, corrections, binary correctness) but struggles to differentiate <b>subtle error taxonomies</b> (careless vs. misinterpret) without graph-embedded grounding.
</div>

---

# Audit — Cognitive & Affective State

<div flex="~ items-center gap-2" mt-1 mb-3 text-xs>
<span rounded-full border="~ orange/30" bg-orange:10 px2 py0.5 font-semibold text-orange-6>own idea · analysis</span>
<span op60>evaluating the model's psychological and cognitive inferences</span>
</div>

<div grid="~ cols-2 gap-3" text-sm>

<div v-click="1" bg-rose:10 border="~ rose/30 rounded-lg">
<div flex="~ items-center gap-2" bg-rose:10 px4 py2 rounded font-semibold text-rose-6>
<div i-carbon:close-filled text-base /> Cognitive Level: <b class="ml-1">Miss</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>Remembering</code> (44%)</div>
<div><b>Truth:</b> <i>Applying.</i> The student is executing multi-step multiplication to solve a word problem. The model defaults to the lowest Bloom's level when uncertain.</div>
</div>
</div>

<div v-click="2" bg-rose:10 border="~ rose/30 rounded-lg">
<div flex="~ items-center gap-2" bg-rose:10 px4 py2 rounded font-semibold text-rose-6>
<div i-carbon:close-filled text-base /> Emotion & Frustration: <b class="ml-1">Miss</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>confused</code> (53%) & <code>frustration: 0.65</code> (leaning frustrated)</div>
<div><b>Truth:</b> <i>Confident & Calm.</i> The student states their answer definitively ("Therefore, 12 x 4 = 48..."). The model hallucinates negative affect from the presence of an error.</div>
</div>
</div>

<div v-click="3" bg-green:10 border="~ green/30 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:checkmark-filled text-base /> Metacognition: <b class="ml-1">Hit</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>Low</code> (47%)</div>
<div><b>Truth:</b> <i>Low.</i> The student fails to self-monitor the unit mismatch (meal vs. day). The model correctly identifies the lack of self-correction.</div>
</div>
</div>

<div v-click="4" bg-green:10 border="~ green/30 rounded-lg">
<div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded font-semibold text-green-6>
<div i-carbon:checkmark-filled text-base /> Working Memory: <b class="ml-1">Nuanced Hit</b>
</div>
<div p3 flex="~ col gap-1" >
<div><b>Model:</b> <code>0.78</code> (Medium, 48%)</div>
<div><b>Truth:</b> <i>Medium.</i> The student holds the 6 people and 2 plates, but drops the meal/day constraint. The model accurately captures this partial cognitive load failure.</div>
</div>
</div>

</div>

<div v-click="5" mt-3 rounded-r-lg border-l-4 border-orange-400:60 bg-orange:10 px4 py2 text-sm text-gray-700>
<b class="text-orange-600">Takeaway:</b> The model exhibits <b>affective bias</b> — it assumes errors imply confusion/frustration. It also underestimates cognitive depth. This confirms that <b>Phase 2 (Classical KT)</b> must handle the cognitive state, while <b>Phase 1</b> should rely on graph embeddings to ground the error types.
</div>

---
<div flex="~ col gap-3" py2>

  <div flex="~ items-center gap-3" bg-rose:10 border="~ rose/30 rounded-lg" px4 py2.5>
    <div class="i-carbon:close-filled text-3xl text-rose-6"></div>
    <div>
      <div text-lg font-bold text-rose-6>No — 500M is a <i>small</i> LLM by 2025 standards.</div>
      <div text-xs op70>It lives in the edge / deployment tier — two to three orders of magnitude below frontier models.</div>
    </div>
  </div>

  <div v-click="1" bg-gray:10 border="~ gray/30 rounded-lg" px4 py3>
    <div flex="~ items-center justify-between" mb2>
      <div text-sm font-semibold op80>Where 500M sits</div>
      <div text-xs op50>approximate log scale · parameters</div>
    </div>
    <div flex="~" h-9 rounded-lg overflow-hidden border="~ gray/25" text-[10px] font-mono font-bold>
      <div flex="~ items-center justify-center bg-rose:35 text-rose-9" style="width:9%">0.5B</div>
      <div flex="~ items-center justify-center bg-amber:25 text-amber-9" style="width:13%">1.3B</div>
      <div flex="~ items-center justify-center bg-teal:25 text-teal-9" style="width:22%">7B</div>
      <div flex="~ items-center justify-center bg-sky:25 text-sky-9" style="width:24%">70B</div>
      <div flex="~ items-center justify-center bg-indigo:30 text-indigo-9" style="width:32%">400B+</div>
    </div>
    <div flex="~ justify-between" mt1.5 text-xs op50>
      <span>Qwen2.5-0.5B</span>
      <span>Phi-1.5 / Gemma-2</span>
      <span>Llama-3-8B</span>
      <span>Llama-3-70B</span>
      <span>GPT-4o / Llama-405B</span>
    </div>
  </div>

  <div v-click="2" bg-amber:10 border="~ amber/30 rounded-lg" px4 py3>
    <div flex="~ items-center gap-2" mb1.5>
      <div class="i-solar:info-circle-broken text-lg text-amber-6"></div>
      <span font-semibold text-amber-7 text-sm>What a 500M model actually is</span>
    </div>
    <div flex="~ gap-2 text-xs flex-wrap">
      <span bg-white:60 rounded px2 py1>Runs on a phone / CPU</span>
      <span bg-white:60 rounded px2 py1>Fine-tunes on a single GPU</span>
      <span bg-white:60 rounded px2 py1>Coherent short-form text</span>
      <span bg-white:60 rounded px2 py1>Weak multi-step reasoning</span>
    </div>
  </div>

</div>

<!--
Presenter Notes:
- Opening: State the verdict flatly — 500M is NOT a big LLM in 2025. It's the small tier.
- Click 1: Walk the log-scale bar. Point out that 500M is at the far left; the "big" label only starts around 70B and above. Name a few concrete 0.5B-class models (Qwen2.5-0.5B, SmolLM) so the audience can anchor.
- Click 2: Reframe what 500M can actually do — it's deployable, cheap, coherent, but weak at multi-step reasoning. This sets up the "so is it too small for our task?" tension that the next slide resolves.
-->

---

<div flex="~ col gap-3" py2>

  <div text-sm font-semibold op70 flex="~ items-center gap-2">
    <div class="i-solar:scale-broken text-base text-sky-6"></div>
    But "big" is relative — the answer flips with the frame
  </div>

  <div grid="~ cols-3 gap-3">
    <div v-click="1" bg-rose:10 border="~ rose/30 rounded-lg" p3 flex="~ col gap-1">
      <div flex="~ items-center gap-1.5" text-rose-6 font-semibold text-xs><div i-carbon:close-filled /> Frontier framing</div>
      <div text-2xl font-bold>Small</div>
      <div text-xs op70>500M vs 70–400B+ — a negligible capability ceiling.</div>
    </div>
    <div v-click="2" bg-teal:10 border="~ teal/30 rounded-lg" p3 flex="~ col gap-1">
      <div flex="~ items-center gap-1.5" text-teal-6 font-semibold text-xs><div i-carbon:checkmark-filled /> Edge framing</div>
      <div text-2xl font-bold>Mid</div>
      <div text-xs op70>Largest class that still ships on-device — "big for a phone."</div>
    </div>
    <div v-click="3" bg-indigo:10 border="~ indigo/30 rounded-lg" p3 flex="~ col gap-1">
      <div flex="~ items-center gap-1.5" text-indigo-6 font-semibold text-xs><div i-carbon:checkmark-filled /> KT-research framing</div>
      <div text-2xl font-bold>Huge</div>
      <div text-xs op70>Classic KT models (DKT, AKT) are ~1–10M — 500M is 50–500×.</div>
    </div>
  </div>

  <div v-click="4" bg-gray:10 border="~ gray/30 rounded-lg" px4 py3>
    <div flex="~ items-center gap-2" mb1.5>
      <div class="i-solar:widget-5-broken text-lg text-gray-5"></div>
      <span font-semibold text-sm>So for <i>our</i> stack</span>
    </div>
    <div grid="~ cols-2 gap-3 text-xs">
      <div flex="~ items-start gap-1.5">
        <div i-carbon:arrow-up-right text-emerald-6 mt0.5 />
        <span><b>Upside:</b> 500M buys reasoning + synthesis a 10M KT head cannot — the audit's affective bias could be fixed in-model.</span>
      </div>
      <div flex="~ items-start gap-1.5">
        <div i-carbon:arrow-down-right text-amber-6 mt0.5 />
        <span><b>Cost:</b> 50–500× the params. If Phase 1 graph + Phase 2 KT already carry the state, 500M may be <i>oversized</i>.</span>
      </div>
    </div>
  </div>

</div>

<!--
Presenter Notes:
- Opening: Same question, different answer — remind the room that "big" is a frame, not a fact.
- Click 1: Frontier framing — here 500M is plainly small.
- Click 2: Edge/deployment framing — the largest class that still runs on-device, so "big for a phone."
- Click 3: Now the frame that matters for THIS project: KT research. Classic DKT/AKT models are 1–10M params; 500M is 50–500× larger than the KT tradition. This is where 500M genuinely looks "big."
- Click 4: Land the takeaway — 500M is a reasonable ceiling if we want the reasoning power to fix things like affective bias, but it's oversized if Phase 1 graph embeddings and Phase 2 classical KT already do the heavy lifiting. The decision is a compute-vs-capability trade, not a "big/small" label.
-->
---

# Summary — What the 500M Model Can & Cannot Do

<div grid="~ cols-2 gap-4" mt-4 text-sm>

<div v-click="1" bg-green:5 border="~ green/30 rounded-lg" p4>
<div flex="~ items-center gap-2" mb2 text-green-6 font-bold>
<div i-carbon:checkmark-filled text-xl /> What it does well (Zero-shot)
</div>
<ul flex="~ col gap-2" text-gray-700>
<li>· <b>Dialogue Mechanics:</b> Perfectly identifies teacher moves (focusing/probing) and correction responses.</li>
<li>· <b>Binary Correctness:</b> Reliably flags whether the final answer is right or wrong.</li>
<li>· <b>Metacognition & Persistence:</b> Accurately gauges self-monitoring and sustained effort.</li>
<li>· <b>Speed:</b> 92ms latency with minimal state-token overhead (75 tokens).</li>
</ul>
</div>

<div v-click="2" bg-rose:5 border="~ rose/30 rounded-lg" p4>
<div flex="~ items-center gap-2" mb2 text-rose-6 font-bold>
<div i-carbon:close-filled text-xl /> Where it fails (Needs Peripherals)
</div>
<ul flex="~ col gap-2" text-gray-700>
<li>· <b>Affective Bias:</b> Hallucinates confusion/frustration when an error is present.</li>
<li>· <b>Cognitive Depth:</b> Defaults to "Remembering" instead of "Applying/Analyzing".</li>
<li>· <b>Granular Error Taxonomy:</b> Confuses "careless slips" with "conceptual misinterpretations".</li>
<li>· <b>KC Status:</b> Struggles to distinguish "error_involved" from "needs_more_support".</li>
</ul>
</div>

</div>

<div v-click="3" mt-4 rounded-r-lg border-l-4 border-orange-400:60 bg-orange:10 px4 py3 text-sm text-gray-700>
<b class="text-orange-600">Architectural Implication:</b> We should not ask the 500M model to infer deep cognitive states or emotions in isolation. Instead, we feed its <b>structural outputs</b> (moves, binary correctness) into the <b>Classical KT Model (Phase 2)</b>, and use <b>Graph Embeddings</b> to ground its error classification. The 500M model is the fast System-1 parser, not the final diagnostician.
</div>


---

# What's Next: Validating the Asymmetric Pipeline

<div flex="~ items-center gap-2" mt-1 mb-3 text-xs>
  <span rounded-full border="~ orange/30" bg-orange-500:10 px-3 py-1 text-xs font-semibold text-orange-500 dark:text-orange-300>Phase 1 Focus</span>
  <span op-60>Starting with small-model fine-tuning to build a robust System-1 foundation</span>
</div>

<div flex="~ col gap-3" text-sm>
  <div v-click="1" class="rounded-lg border border-gray-200 dark:border-gray-700 bg-orange-500:10">
    <div class="flex items-center gap-2 px-4 py-2 rounded bg-orange-500:10 text-orange-500 dark:text-orange-300 font-semibold">
      <div i-carbon:settings text-xl /> Step 1: Small Model Fine-Tuning (The Foundation)
    </div>
    <div class="p-3 text-gray-600 dark:text-gray-200 flex=~ col gap-1.5">
      <div>• <b>Target:</b> Fine-tune a ~500M model (e.g., Qwen2.5-0.5B) using LoRA on the expanded diagnostic schema.</div>
      <div>• <b>Goal:</b> Achieve high schema validity and strict evidence gating (zero hallucination on error types, ZPD, and impasse).</div>
      <div>• <b>Metric:</b> Measure extraction precision, abstention calibration, and latency (<100ms).</div>
    </div>
    <div class="px-3 pb-3">
      <span v-click="2" class="inline-block px-2 py-0.5 rounded bg-green-500:10 text-green-600 dark:text-green-300 font-medium text-xs">✓ Hypothesis: A small, schema-constrained model outperforms prompt-only 7B+ models on structured extraction.</span>
   .
    </div>
  </div>

  <div v-click="3" class="rounded-lg border border-gray-200 dark:border-gray-700 bg-purple-500:10">
    <div class="flex items-center gap-2 px-4 py-2 rounded bg-purple-500:10 text-purple-500 dark:text-purple-300 font-semibold">
      <div i-carbon:flow text-xl /> Step 2: Graph-Embedded Retrieval
    </div>
    <div class="p-3 text-gray-600 dark:text-gray-200">
      Inject KC prerequisite graph embeddings into the 500M model's retrieval query. <b>Ablation:</b> Prove that graph-conditioned retrieval yields more pedagogically relevant descriptors than text-only semantic retrieval.
    </div>
  </div>

  <div v-click="4" class="rounded-lg border border-gray-200 dark:border-gray-700 bg-blue-500:10">
    <div class="flex items-center gap-2 px-4 py-2 rounded bg-blue-500:10 text-blue-500 dark:text-blue-300 font-semibold">
      <div i-carbon:time text-xl /> Step 3: Temporal Few-Shot & Soft Prompting
    </div>
    <div class="p-3 text-gray-600 dark:text-gray-200">
      Train a lightweight classical KT sequence model to format historical states into few-shot trajectories. Train a projector to map the dense belief state ($s_t$) into the Main LLM's soft prompt space.
    </div>
  </div>
</div>

<div v-click="5" mt-4 rounded-r-lg border-l-4 border-orange-500:60 bg-orange-500:5 px-4 py-3 text-sm text-gray-600 dark:text-gray-200>
  <b class="text-orange-500 dark:text-orange-300">Immediate Next Action:</b> Run the 500M model fine-tuning on the expanded schema dataset. Evaluate if it can reliably distinguish "careless" vs "misinterpret" errors and correctly flag ZPD states without hallucinating affective states.
</div>

