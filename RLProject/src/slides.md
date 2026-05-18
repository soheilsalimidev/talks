---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
glowSeed: 4
title: RL Fianl Project
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
      IL Final Project </span>
</div>
<div mt1 forward:delay-300 v-click>Heterogeneous MARL for
Traffic Signal Control</div>
</h1>

<div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-left v-click="1">
  <div text-sm opacity-75 mt--4>Feb. 21th 2026 - Soheil Salimi</div>
</div>


---
layout: two-cols
---

# Problem Statement

Urban traffic signal control is a **decentralized decision-making problem** under partial observability.


- 🚦 Intersections differ in geometry, sensors, and priorities
- 🔄 Traffic dynamics are **non-stationary** across time
- 🎯 Different hours require distinct policies
- 🤝 Multi-agent coordination is essential


::right::

# Primary Objective

<div flex flex-col gap-3>

<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p3>
<div flex="~ items-center gap-2" bg-blue:10 px3 py1 rounded>
<div i-solar:route-square-broken text-xl text-blue-4 /> Decentralized MARL Framework
</div>
<div ml2 mt2 text-sm>
Model agent heterogeneity + partial observability + time-dependent strategies
</div>
</div>

<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p3>
<div flex="~ items-center gap-2" bg-gray:10 px3 py1 rounded>
<div i-solar:layers-minimalistic-broken text-xl text-gray-4 /> MoE + PPO Architecture
</div>
<div ml2 mt2 text-sm>
Mixture-of-Experts for traffic regime specialization with Proximal Policy Optimization
</div>
</div>

</div>

---

# Dec-POMDP Formulation

<div flex="~ col gap-4" py4>

<span v-click>
<div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Agents 𝓘</div>
<span text-blue2> Heterogeneous intersections with varying phase configurations</span>
</span>

<span v-click>
<div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>State 𝓢</div>
<span text-rose2> Global traffic: phase times, queue lengths, waiting time, network pressure</span>
</span>

<span v-click>
<div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Observation 𝓞ᵢ</div>
<span text-yellow2> Structured dict: phase_one_hot, phase_timer, lane_features[L×7], lane_mask, pressure</span>
</span>

<span v-click>
<div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Reward Rᵢ</div>
</span>
</div>


$$r_i(k) = -0.75 \cdot \frac{Q_i(k)}{L_i} - 0.25 \cdot \frac{W_i(k)}{L_i}$$

---

<div grid="~ cols-2 gap-4" py4>
<!-- Actor Network -->
<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-blue:10>
    <div i-solar:cpu-broken text-xl text-blue-4 /> Actor Network
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/ActorEncoder.png" class="rounded shadow" alt="Actor Architecture">
  </div>
  <div text-sm text-gray mt2>
    Phase encoder + LaneEncoder → MoE → Action logits
  </div>
</div>

<!-- Shared Critic -->
<div v-click bg-yellow:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-yellow:10>
    <div i-solar:chart-broken text-xl text-yellow-4 /> Shared Critic
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/shiredCritic.png" class="rounded shadow" alt="Critic Architecture">
  </div>
  <div text-sm text-gray mt2>
    Centralized value estimation with pressure + phase timer inputs
  </div>
</div>


</div>
---
---

<div grid="~ cols-2 gap-4" py4>

<!-- MoE Module -->
<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-gray:10>
    <div i-solar:layers-minimalistic-broken text-xl text-gray-4 /> MoE Module
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/MoeArch.png" class="rounded shadow" alt="MoE Architecture">
  </div>
  <div text-sm text-gray mt2>
    Gating network selects/combines expert outputs dynamically
  </div>
</div>

<!-- Lane Encoder -->
<div v-click bg-green:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-green:10>
    <div i-solar:server-broken text-xl text-green-4 /> Lane Encoder
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/LaneEncoderArch.png" class="rounded shadow" alt="Lane Encoder">
  </div>
  <div text-sm text-gray mt2>
  </div>
</div>

</div>

---

<div grid="~ cols-2 gap-4">

<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p3>
<div px3 py1 rounded bg-blue:10 font-bold text-blue>Phase 1: Expert-First</div>
<div mt2 text-sm>
<strong>Goal:</strong> Stationarization via regime isolation<br><br>
• Train K experts <strong>sequentially</strong> on fixed σ<br>
• Gating networks <strong>frozen</strong>, deterministic selection<br>
• 100 episodes per expert<br>
• Each expert converges on quasi-stationary distribution
</div>
</div>

<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p3>
<div px3 py1 rounded bg-gray:10 font-bold text-gray>Phase 2: Joint Training</div>
<div mt2 text-sm>
<strong>Goal:</strong> Generalization via dynamic blending<br><br>
• <strong>Unfreeze</strong> gating networks in actor & critic<br>
• Gating: Gumbel-Softmax (τ>0.15) → Softmax (τ≤0.15)<br>
• 300 episodes joint training<br>
• Learn $\pi_i = \sum_k g_k(o_i) \cdot \pi_i^{(k)}$ for unseen conditions
</div>
</div>

</div>

---

# Experimental Setup: Ingolstadt7

<div flex="~ col gap-3" py4>

<span v-click>
<div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Network</div>
<span text-blue2> Real-world corridor: 7 heterogeneous intersections (T-junctions, roundabouts)</span>
</span>

<span v-click>
<div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Agents</div>
<span text-rose2> 1× 2-phase (257K params) + 6× 3-phase (289K params each) with MoE(3 experts)</span>
</span>

<span v-click>
<div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Simulation</div>
<span text-yellow2> SUMO-RL • Peak hour [57600, 61200]s • σ ∈ {0.8, 1.0, 1.2} for curriculum</span>
</span>

<span v-click>
<div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Baselines</div>
<span text-green2> IDQN • IPPO • MPLight • FMA2C (from RESCO benchmark)</span>
</span>

</div>

---

# Evaluation Metrics

<div grid="~ cols-2 gap-3">

<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p3>
<div font-bold text-blue>⏱️ Average Delay (s)</div>
<div text-sm mt1>
$$\frac{1}{N}\sum_v (t_{\text{actual}}^v - t_{\text{free}}^v)$$
Additional time due to congestion
</div>
</div>

<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p3>
<div font-bold text-gray>🚗 Average Trip Time (s)</div>
<div text-sm mt1>
$$\frac{1}{N}\sum_v t_{\text{actual}}^v$$
Total origin-to-destination travel time
</div>
</div>

<div v-click bg-yellow:10 border="~ gray/50 rounded-lg" p3>
<div font-bold text-yellow>🛑 Average Wait (s)</div>
<div text-sm mt1>
$$\frac{1}{N}\sum_v \sum_t \mathbb{I}[v_t < 0.1] \cdot \Delta t$$
Accumulated stopped time (speed < 0.1 m/s)
</div>
</div>

<div v-click bg-green:10 border="~ gray/50 rounded-lg" p3>
<div font-bold text-green>📊 Average Queue</div>
<div text-sm mt1>
$$\frac{1}{T \cdot L}\sum_{t,\ell} q_{\ell,t}$$
Mean queued vehicles per lane per timestep
</div>
</div>

</div>


---

# Training Dynamics: Phase 1 Loss Analysis

<div grid="~ cols-3 gap-2">

<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p2>
<div text-center font-bold text-blue>σ = 0.8 (Under-saturated)</div>
<div text-xs mt1>
• Rapid policy convergence (<10 eps)<br>
• Value loss stabilizes @ eps 20<br>
• 92% waiting time reduction
</div>
</div>

<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p2>
<div text-center font-bold text-gray>σ = 1.0 (Balanced)</div>
<div text-xs mt1>
• Higher initial variance<br>
• Value loss converges @ eps 120<br>
• Reflects moderate congestion complexity
</div>
</div>

<div v-click bg-yellow:10 border="~ gray/50 rounded-lg" p2>
<div text-center font-bold text-yellow>σ = 1.2 (Over-saturated)</div>
<div text-xs mt1>
• Persistent oscillations (eps 200-300)<br>
• Severe non-stationarity<br>
• Stable queues @ 45-50 vehicles
</div>
</div>

</div>

<div v-click mt3 p2 bg-green:10 rounded border="~ gray/50">
<strong>Insight:</strong> Isolating traffic regimes enables expert convergence despite environmental non-stationarity
</div>


---
layout: full
---

<div grid="~ cols-3 gap-3" py4>

<!-- σ = 0.8 -->
<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p2>
  <div text-center font-bold text-blue mb2>σ = 0.8 (Under-saturated)</div>
  <img src="/total_loss_scale_0_8.png" class="rounded w-full" alt="Total Loss 0.8">
  <img src="/policy_loss_scale_0_8.png" class="rounded w-full mt1" alt="Policy Loss 0.8">
  <img src="/value_loss_scale_0_8.png" class="rounded w-full mt1" alt="Value Loss 0.8">
</div>

<!-- σ = 1.0 -->
<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p2>
  <div text-center font-bold text-gray mb2>σ = 1.0 (Balanced)</div>
  <img src="/total_loss_scale_1.png" class="rounded w-full" alt="Total Loss 1.0">
  <img src="/policy_loss_scale_1.png" class="rounded w-full mt1" alt="Policy Loss 1.0">
  <img src="/value_loss_scale_1.png" class="rounded w-full mt1" alt="Value Loss 1.0">
</div>

<!-- σ = 1.2 -->
<div v-click bg-yellow:10 border="~ gray/50 rounded-lg" p2>
  <div text-center font-bold text-yellow mb2>σ = 1.2 (Over-saturated)</div>
  <img src="/total_loss_scale_1_2.png" class="rounded w-full" alt="Total Loss 1.2">
  <img src="/policy_loss_scale_1_2.png" class="rounded w-full mt1" alt="Policy Loss 1.2">
  <img src="/value_loss_scale_1_2.png" class="rounded w-full mt1" alt="Value Loss 1.2">
</div>

</div>

<div v-click mt3 p3 bg-green:10 border="~ gray/50 rounded-lg">
<strong>Key Observation:</strong> Loss convergence speed correlates with traffic complexity — under-saturated regimes stabilize fastest, while over-saturated conditions require more training episodes due to severe non-stationarity.
</div>


---
layout: full
---

<div grid="~ cols-2 gap-4" py4>

<!-- Waiting Time -->
<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-blue:10>
    <div i-solar:clock-broken text-xl text-blue-4 /> Average Waiting Time
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/Avg_Waiting_Time_Sec_all_scales.png" class="rounded w-full" alt="Waiting Time">
  </div>
  <div text-sm text-gray mt2>
    σ=0.8: 150s → 12s (92% ↓) • σ=1.2: stable @ ~10s
  </div>
</div>

<!-- Average Speed -->
<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-gray:10>
    <div i-solar:car-broken text-xl text-gray-4 /> Average Speed (km/h)
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/Avg_Speed_KMH_all_scales.png" class="rounded w-full" alt="Average Speed">
  </div>
  <div text-sm text-gray mt2>
    σ=0.8: 7 → 20 km/h • σ=1.0: recovers to 18.5 km/h
  </div>
</div>
</div>

---
layout: full
---

<div grid="~ cols-2 gap-4" py4>


<!-- Travel Time -->
<div v-click bg-yellow:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-yellow:10>
    <div i-solar:route-broken text-xl text-yellow-4 /> Average Travel Time
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/Average_Travel_Time_Sec_all_scales.png" class="rounded w-full" alt="Travel Time">
  </div>
  <div text-sm text-gray mt2>
    σ=0.8: 275s → 115s (58% ↓) • σ=1.2: constrained @ 115-120s
  </div>
</div>

<!-- Queue Length -->
<div v-click bg-green:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-green:10>
    <div i-solar:queue-broken text-xl text-green-4 /> Average Queue Length
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/Avg_Queue_Length_all_scales.png" class="rounded w-full" alt="Queue Length">
  </div>
  <div text-sm text-gray mt2>
    σ=0.8: 200 → 32 vehicles (84% ↓) • σ=1.2: stable @ 45-50
  </div>
</div>

</div>


---

# Phase 2: Joint Training Insights

<div flex="~ col gap-3">

<div v-click flex="~ gap-3">
<div bg-blue:10 p2 rounded min-w-32>
<div text-blue font-bold>Policy Loss</div>
</div>
<div text-sm>
Both agents converge to ~-10⁻³ after step 340<br>
Agent 2 (3-phase) shows transient spike @ step 440 during gating exploration
</div>
</div>

<div v-click flex="~ gap-3">
<div bg-rose:10 p2 rounded min-w-32>
<div text-rose font-bold>Value Loss</div>
</div>
<div text-sm>
Agent 1 (2-phase): steady decline 2.5→1.5<br>
Agent 2 (3-phase): divergence 0.8→2.8 due to increased value function complexity under mixed regimes
</div>
</div>

<div v-click flex="~ gap-3">
<div bg-green:10 p2 rounded min-w-32>
<div text-green font-bold>Expert Utilization</div>
</div>
<div text-sm>
Mean utilization ≈ 0.333 (uniform across 3 experts)<br>
<strong>No expert collapse</strong> → balanced specialization maintained
</div>
</div>

</div>



---
# Final Results: Phase 2 Joint Training

layout: full
---

<div flex="~ col gap-4" py4>

<!-- Loss Trajectories -->
<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-blue:10>
    <div i-solar:chart-2-broken text-xl text-blue-4 /> Phase 2 Loss Convergence
  </div>
  <div grid="~ cols-2 gap-4" mt3>
    <div>
      <img src="/policy_loss_all_scales.png" class="rounded w-full" alt="Policy Loss">
      <div text-xs text-center text-gray mt1>Policy Loss (symlog)</div>
    </div>
    <div>
      <img src="/value_loss_all_scales.png" class="rounded w-full" alt="Value Loss">
      <div text-xs text-center text-gray mt1>Value Loss (log scale)</div>
    </div>
  </div>
  <div text-sm text-gray mt2>
    • Agent 1 (2-phase): stable policy loss ~-10⁻³ • Agent 2 (3-phase): value loss divergence due to regime mixing complexity
  </div>
</div>
</div>
---
# Final Results: Phase 2 Joint Training

layout: full
---

<div flex="~ col gap-4" py4>

<!-- Performance Metrics -->
<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-gray:10>
    <div i-solar:trending-up-broken text-xl text-gray-4 /> Phase 2 Performance Metrics
  </div>
  <div grid="~ cols-2 gap-4" mt3>
    <div>
      <img src="/Avg_Queue_Length_all_scales.png" class="rounded w-full" alt="Queue Length Phase2">
      <div text-xs text-center text-gray mt1>Avg. Queue Length</div>
    </div>
    <div>
      <img src="/Avg_Waiting_Time_Sec_all_scales.png" class="rounded w-full" alt="Waiting Time Phase2">
      <div text-xs text-center text-gray mt1>Avg. Waiting Time</div>
    </div>
  </div>
  <div text-sm text-gray mt2>
    • Queue: stable 25-28 vehicles • Waiting: 5s → 8s (exploration during gating training)
  </div>
</div>
</div>
---
# Final Results: Phase 2 Joint Training

layout: full
---

<div flex="~ col gap-4" py4>

<!-- Expert Utilization -->
<div v-click bg-green:10 border="~ gray/50 rounded-lg" p3>
  <div flex="~ items-center gap-2" px3 py2 rounded bg-green:10>
    <div i-solar:pie-chart-broken text-xl text-green-4 /> MoE Expert Utilization
  </div>
  <div mt3 flex="~ justify-center">
    <img src="/moe_actor_expert_utilization_mean_moe_precision.png" class="rounded max-w-2xl" alt="Expert Utilization">
  </div>
  <div text-sm text-gray mt2 text-center>
    Mean utilization ≈ 0.333 across 3 experts → <strong>no expert collapse</strong>, balanced specialization maintained
  </div>
</div>

</div>



---

# Results: Ingolstadt Corridor

<table class="w-full text-sm">
<thead>
<tr class="border-b">
<th class="text-left py2">Method</th>
<th class="text-right">Delay (s)</th>
<th class="text-right">Trip Time (s)</th>
<th class="text-right">Wait (s)</th>
<th class="text-right">Queue</th>
</tr>
</thead>
<tbody>
<tr v-click class="border-b">
<td>IDQN</td>
<td class="text-right">31.19</td>
<td class="text-right">68.69</td>
<td class="text-right">8.71</td>
<td class="text-right font-bold">0.67†</td>
</tr>
<tr v-click class="border-b">
<td>IPPO</td>
<td class="text-right text-blue">30.7</td>
<td class="text-right text-blue">68.34</td>
<td class="text-right text-blue">8.2</td>
<td class="text-right">0.71†</td>
</tr>
<tr v-click class="border-b">
<td>MPLight</td>
<td class="text-right">48.21</td>
<td class="text-right">76.58</td>
<td class="text-right">15.05</td>
<td class="text-right">1.34†</td>
</tr>
<tr v-click class="border-b">
<td>FMA2C</td>
<td class="text-right">48.99</td>
<td class="text-right">85.03</td>
<td class="text-right">21.9</td>
<td class="text-right">1.79†</td>
</tr>
<tr v-click bg-green:10 class="font-bold">
<td>Ours (MoE-CTDE)</td>
<td class="text-right">94‡</td>
<td class="text-right">—</td>
<td class="text-right text-green font-bold">7.4</td>
<td class="text-right text-green font-bold">25‡</td>
</tr>
</tbody>
</table>

<div text-xs text-gray mt2>
† Per-lane average (baselines) • ‡ Total network queue (ours: 25 ≈ 0.9/lane)<br>
<strong>Key:</strong> Lowest waiting time (7.4s): +9.8% vs IPPO, +15% vs IDQN
</div>

---

# Future Work & Conclusion

<div flex="~ col gap-4" py4>

<div v-click bg-blue:10 border="~ gray/50 rounded-lg" p3>
<div font-bold text-blue>🔧 Stability Improvements</div>
<div text-sm mt1>
• Systematic hyperparameter optimization for gating temperature<br>
• Adaptive learning rates per expert based on regime complexity<br>
• Regularization to mitigate value loss divergence in complex agents
</div>
</div>

<div v-click bg-gray:10 border="~ gray/50 rounded-lg" p3>
<div font-bold text-gray>🧠 Architectural Enhancements</div>
<div text-sm mt1>
• Attention mechanisms in LaneEncoder for relevant lane focus<br>
• Graph-based message passing for explicit intersection coordination<br>
• Hierarchical MoE: experts for temporal patterns + spatial regimes
</div>
</div>

</div>

<div v-click mt4 p3 bg-blue:50 border="~ blue/50 rounded-lg" text-center>
<strong>Conclusion:</strong> MoE-CTDE effectively addresses non-stationarity in multi-agent traffic control through regime-specialized experts and dynamic policy blending, achieving state-of-the-art waiting time reduction on real-world urban networks.
</div>

---

# Thank You

<div flex="~ col items-center gap-4" py8>

<div text-2xl font-bold>Questions?</div>

<div flex="~ gap-3">
<span class="px-3 py-1 bg-blue:10 text-blue rounded">Ingolstadt7</span>
<span class="px-3 py-1 bg-gray:10 text-gray rounded">SUMO-RL</span>
<span class="px-3 py-1 bg-green:10 text-green rounded">MoE-PPO</span>
<span class="px-3 py-1 bg-yellow:10 text-yellow rounded">CTDE</span>
</div>

<div text-sm text-gray mt4>
Code & reproducibility materials available upon request<br>
Email:Soheilsalimidev@gmail.com<br>
Email uni:salimi.soheil@ut.ac.ir <br>
Phone Number: 09208502440 (if possible text before calling) <br>
</div>

</div>
