---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
glowSeed: 2
title: Mixtral of Experts
remoteAssets: false
fonts:
  sans: Inter
  serif: Robot Slab
  mono: Fira Code
layout: intro
---

<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click> 
  NLP      </span>

</div>
<div mt1 forward:delay-300 v-click> Mixtral of Experts
</div>
</h1>

<div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-left v-click="1">
  <div text-sm opacity-75 mt--4>Jun. 9th 2026 - Soheil Salimi & Bibi Roqayya
<br/>
  Based on: Jiang et al., "Mixtral of Experts", arXiv preprint arXiv:2401.04088, 2024
</div>

</div>

---

# Visualizing the Paradigm Shift

<div grid="~ cols-2 gap-8" h-full items-center>
  <div>
    <!-- Figure Placeholder: Dense vs MoE Architecture -->
    <div w-full h-80 bg-gray-50 border="~ gray-300 dashed rounded-lg" flex items-center justify-center>
      <div text-center text-gray-500>
<img src="/swappy-20260608-202249.png"/>
      </div>
    </div>
  </div>
  
  <div flex="~ col gap-4" py6>
    <span v-click>
      <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>The Bottleneck</div> <br>
      <span text-blue2>In a standard model, scaling up knowledge means scaling up the FFN, forcing every single token to do more compute.</span>
    </span>
    <span v-click>
      <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>The MoE Solution</div> <br>
      <span text-rose2>Instead of one giant FFN, we create multiple smaller FFNs (Experts). A token only visits the ones it actually needs.</span>
    </span>
  </div>
</div>

---

# Visualizing the MoE Loop

<div grid="~ cols-2 gap-8" h-full items-center>
  <div v-click="1">
    <!-- Video Placeholder -->
    <div w-full h-80 bg-gray-50 border="~ gray-300 dashed rounded-lg" flex items-center justify-center overflow-hidden>
      <video src="/81d8f6de-d628-4d89-a150-e989fa727d06.mp4" autoplay loop muted playsinline class="w-full h-full object-cover object-contain  rounded-lg"></video>
    </div>
    <div text-center text-xs text-gray-500 mt-2>
      <b>Figure:</b> Dynamic routing of tokens through different experts in real-time.
    </div>
  </div>
  
  <div flex="~ col gap-4" py6>
    <span v-click="2">
      <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>The Router</div> <br>
      <span text-blue2>Watch how the gating network evaluates each token's hidden state to decide which path to take.</span>
    </span>
    <span v-click="3">
      <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Sparse Activation</div> <br>
      <span text-rose2>Notice that only <b>2 out of 8</b> experts "light up" for any given token, keeping computation low.</span>
    </span>
    <span v-click="4">
      <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Weighted Sum</div> <br>
      <span text-yellow2>The final output is a blend of the selected experts' contributions, weighted by their relevance scores.</span>
    </span>
  </div>
</div>

---

<script setup>
import MyKatex from './components/MyKatex.vue'  // Adjust the path to match your project structure
</script>

# Visualizing the MoE Layer

<div grid="~ cols-2 gap-8" h-full items-center>
  <div v-click="1">
    <!-- Figure Placeholder: MoE Layer Diagram -->
    <div w-full h-80 bg-gray-50 border="~ gray-300 dashed rounded-lg" flex items-center justify-center>
      <div text-center text-gray-500>
        <div font-bold>
<img src="/swappy-20260608-201749.png" />
    </div>
        <div text-xs mt2 px4>Each input vector is assigned to 2 of the 8 experts by a router. <br>The layer’s output is the weighted sum of the outputs of the two selected experts.</div>
      </div>
    </div>
  </div>
  <div v-click="2" flex="~ col" gap4>
    <div bg-blue:10 p4 rounded-lg>
      <div font-bold text-blue-600 mb2>📌 Mathematical Intuition</div>
      <ul list-disc pl4 text-sm text-gray-100 space-y-2>
        <li><b>Input:</b> Hidden state of a token 
  <MyKatex formula="x" :display-mode="false" />
.</li>
        <li><b>Gating:</b> <MyKatex formula="\text{Softmax}(\text{TopK}(x \cdot W_g))" :display-mode="false" /></li>
        <li><b>Experts (<MyKatex formula="E_i" :display-mode="false" />):</b> Standard SwiGLU FFN blocks.</li>
        <li><b>Output (<MyKatex formula="y" :display-mode="false" />):</b> <MyKatex formula="y = \sum \text{Softmax}(\text{Top2})_i \cdot \text{SwiGLU}_i(x)" :display-mode="false" /></li>
      </ul>
    </div>
  </div>
</div>

---

<script setup>
import MyKatex from './components/MyKatex.vue'
</script>

# How Does the Router Work?

<div flex flex-col gap3 h-full>
  <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded>
      <div i-solar:brain-broken text-xl invert-100 text-blue-4 />
      1. Gating Score Calculation
    </div>
    <div ml2 p2 text-gray1>
      <span v-click="2">
        For every token input <MyKatex formula="x" :display-mode="false" />, the router applies a linear layer with weight matrix <MyKatex formula="W_g" :display-mode="false" /> to produce logits for all <MyKatex formula="N=8" :display-mode="false" /> experts.
        <br>
        <div class=" px-2 py-1 rounded mt-1 block w-fit font-mono">
          <MyKatex formula="\text{logits} = x \cdot W_g" :display-mode="false" />
        </div>
      </span>
    </div>
  </div>

  <div v-click="3" bg-gray:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded>
      <div i-solar:filter-broken text-xl invert-100 text-blue-4 />
      2. Top-K Masking & Softmax
    </div>
    <div ml2 p2 text-gray1>
      <span v-click="4">
        The router keeps only the Top-K (K=2) highest logits and sets the rest to <MyKatex formula="-\infty" :display-mode="false" />. A softmax is then applied to these K values to generate normalized gating weights <MyKatex formula="G(x)_i" :display-mode="false" />.
        <br>
        <div class="px-2 py-1 rounded mt-1 block w-fit font-mono">
          <MyKatex formula="G(x) = \text{Softmax}(\text{TopK}(\text{logits}))" :display-mode="false" />
        </div>
      </span>
    </div>
  </div>

  <div v-click="5" bg-green:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-green:10 px4 py2 rounded>
      <div i-solar:calculator-broken text-xl invert-100 text-green-4 />
      3. Weighted Expert Combination
    </div>
    <div ml2 p2 text-gray1>
      <span v-click="6">
        The final output <MyKatex formula="y" :display-mode="false" /> is the weighted sum of the outputs from the two selected SwiGLU experts (<MyKatex formula="E_i" :display-mode="false" />).
        <br>
        <div class=" px-2 py-1 rounded mt-1 block w-fit font-mono">
          <MyKatex formula="y = \sum G(x)_i \cdot E_i(x)" :display-mode="false" />
        </div>
      </span>
    </div>
  </div>
</div>

---

# Why MoE? The Efficiency Secret

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Massive Total Capacity</div> <br>
    <span text-green2>Mixtral has 47B total parameters across 8 experts, giving it immense knowledge capacity.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-purple mr2 px2 rounded bg-purple:10>Low Active Computation</div> <br>
    <span text-purple2>Each token only uses 2 experts (13B active parameters), keeping inference fast and computationally cheap.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-orange mr2 px2 rounded bg-orange:10>Best of Both Worlds</div> <br>
    <span text-orange2>Outperforms dense 70B models (like Llama 2 70B) while running at the speed of a ~13B model.</span>
  </span>
</div>

---

# Benchmark Results & Efficiency

<div grid="~ cols-2 gap-8" h-full items-center>
  <div v-click="1">
    <!-- Figure 2 from the paper -->
    <img src="/swappy-20260608-211439.png" alt="Figure 2: Performance of Mixtral vs Llama models" class="w-full rounded-lg border border-gray-200 shadow-sm" />
    <div text-center text-xs text-gray-500 mt-2>
      <b>Figure 2:</b> Mixtral outperforms or matches Llama 2 70B on all benchmarks, with vast superiority in mathematics and code generation.
    </div>
  </div>
  
  <div flex="~ col gap-4" py6>
    <span v-click="2">
      <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>SOTA Performance</div> <br>
      <span text-blue2>Mixtral surpasses Llama 2 70B across most metrics, including MMLU (70.6%) and HumanEval (40.2%), while using 5x fewer active parameters.</span>
    </span>
    <span v-click="3">
      <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Efficiency Trade-off</div> <br>
      <span text-yellow2>Achieves these results with only <b>13B active parameters</b> per token, enabling faster inference speeds compared to dense 70B models.</span>
    </span>
    <span v-click="4">
      <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Long Context Mastery</div> <br>
      <span text-green2>Maintains high performance across its full 32k context window, achieving 100% accuracy in passkey retrieval tasks.</span>
    </span>
  </div>
</div>

---

# Detailed Results: Table 2 & Long Range

<div flex flex-col gap3 h-full>
  <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded>
      <div i-solar:chart-square-broken text-xl invert-100 text-blue-4 /> Performance vs. Llama 2 Family
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="2">
        <div class="overflow-x-auto">
          <table class="text-xs w-full border-collapse">
            <thead>
              <tr class="border-b border-gray-300">
                <th class="p-1 text-left">Model</th>
                <th class="p-1">MMLU</th>
                <th class="p-1">HumanE</th>
                <th class="p-1">MBPP</th>
                <th class="p-1">GSM8K</th>
               </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="p-1">Llama 2 70B</td>
                <td class="p-1">69.9%</td>
                <td class="p-1">29.3%</td>
                <td class="p-1">49.8%</td>
                <td class="p-1">69.6%</td>
               </tr>
              <tr class="bg-blue:5 font-bold">
                <td class="p-1">Mixtral 8x7B</td>
                <td class="p-1">70.6%</td>
                <td class="p-1">40.2%</td>
                <td class="p-1">60.7%</td>
                <td class="p-1">74.4%</td>
               </tr>
            </tbody>
           </table>
        </div>
        <div mt-2 text-xs italic>Mixtral achieves higher scores with 5x fewer active parameters.</div>
      </v-clicks>
    </div>
  </div>

  <div v-click="3" bg-gray:10 border="~ gray/50 rounded-lg">
    <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded>
      <div i-solar:ruler-broken text-xl invert-100 text-blue-4 /> Long Range & Multilingual
    </div>
    <div ml2 p2 text-gray1>
      <v-clicks :at="4">
        <ul list-disc pl4 text-sm>
          <li><b>Passkey Retrieval:</b> 100% accuracy across 32k context length (Figure 4).</li>
          <li><b>Multilingual:</b> Outperforms Llama 2 70B in French, German, Spanish, and Italian (Table 4).</li>
          <li><b>Bias:</b> Higher accuracy on BBQ (56.0% vs 51.5%) indicating reduced social bias.</li>
        </ul>
      </v-clicks>
    </div>
  </div>
</div>

---

# Do Experts Specialize by Domain?

<div grid="~ cols-2 gap-8" h-full items-center>
  <div v-click="1">
    <img src="/swappy-20260608-210613.png" alt="Figure 8: Token-level Expert Routing" class="w-full rounded-lg border border-gray-200 shadow-sm" />
  </div>
  
  <div flex="~ col gap-4" py6>
    <span v-click="2">
      <div flex="~ inline" text-purple mr2 px2 rounded bg-purple:10>The Surprising Finding</div> <br>
      <span text-purple2>Experts do NOT specialize by domain (Math, Biology, Philosophy). The distribution is very similar across different topics.</span>
    </span>
    <span v-click="3">
      <div flex="~ inline" text-red mr2 px2 rounded bg-red:10>Syntax over Semantics</div> <br>
      <span text-red2>Expert selection is aligned with <b>syntax and structure</b>. Words like 'self' in Python or 'Question' in English consistently route to the same expert.</span>
    </span>
    <span v-click="4">
      <div flex="~ inline" text-teal mr2 px2 rounded bg-teal:10>Structural Patterns</div> <br>
      <span text-teal2>In code, indentation tokens are always assigned to the same experts, especially at the first and last layers.</span>
    </span>
  </div>
</div>

---

# Temporal Locality in Expert Selection

<div grid="~ cols-2 gap-8" h-full items-center>
  <div v-click="1">
    <!-- Figure 8 from the paper -->
    <img src="/swappy-20260608-205256.png" alt="Figure 8: Token-level Expert Routing" class="w-full rounded-lg border border-gray-200 shadow-sm" />
    <div text-center text-xs text-gray-500 mt-2>
      <b>Figure 8:</b> Text samples colored by the first expert choice. Notice how consecutive tokens (like code indentation or words) often share the same color.
    </div>
  </div>
  
  <div flex="~ col gap-4" py6>
    <span v-click="2">
      <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>The Phenomenon</div> <br>
      <span text-blue2>Consecutive tokens are frequently assigned to the <b>same expert</b>. This is called <b>temporal locality</b>.</span>
    </span>
    <span v-click="3">
      <div flex="~ inline" text-purple mr2 px2 rounded bg-purple:10>Syntactic Alignment</div> <br>
      <span text-purple2>As seen in Figure 8, experts align with <b>syntax</b> (e.g., Python 'self' or indentation) rather than just high-level topics.</span>
    </span>
    <span v-click="4">
      <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Quantified Reality</div> <br>
      <span text-green2>In deeper layers (15 & 31), <b>60-67%</b> of consecutive tokens share an expert, far exceeding the 46% expected by random chance.</span>
    </span>
    <span v-click="5">
      <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Why It Matters</div> <br>
      <span text-rose2>This locality enables <b>caching optimizations</b> and influences how we distribute experts across GPUs to avoid bottlenecks.</span>
    </span>
  </div>
</div>

---

# The Challenges of the MoE Approach

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Memory Footprint (VRAM)</div> <br>
    <span text-blue2>The <b>total</b> parameter count (47B) must still be loaded into GPU memory, dictating hardware requirements despite only 13B parameters being active per token.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Load Balancing Bottlenecks</div> <br>
    <span text-rose2>Expert Parallelism (EP) requires distributing tokens evenly. If the router heavily favors specific experts, it overloads certain GPUs while others sit idle, creating computational bottlenecks.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Routing & Communication Overhead</div> <br>
    <span text-yellow2>The gating mechanism and the need to route tokens to specific GPUs (and return the outputs) introduce communication latency and system complexity.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Batch Size Dependency</div> <br>
    <span text-green2>MoE layers introduce overhead that makes them most efficient at <b>large batch sizes</b> (high arithmetic intensity). Low-batch inference may not see the full theoretical speedup.</span>
  </span>
</div>

---
src: ./../../reuse/thanks.md
---
