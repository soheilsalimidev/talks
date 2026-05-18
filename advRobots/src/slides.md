---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
glowSeed: 4
title: Velocity Potential Field Modulation
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
  Advanced Robotics      </span>

</div>
<div mt1 forward:delay-300 v-click>Velocity Potential Field Modulation (VPFM)
</div>
</h1>

<div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-left v-click="1">
  <div text-sm opacity-75 mt--4>May. 15th 2026 - Soheil Salimi & Mohammad Mehdi Kaabi
<br/>
  Based on: Tang et al., IEEE Robotics and Automation Letters, Vol. 10, No. 7, July 2025
</div>

</div>

---
layout: center
---

# Table of Contents

1. **Problem Statement**: Dense Coordination
2. **Related Work** & Limitations
3. **Proposed Solution**: VPFM
4. **Results**: Simulation & Real-World
5. **Conclusion & Future Work**

---
layout: two-cols
---

# 1. Problem Statement

**The Challenge:**
Coordinating a swarm of mobile furniture in confined indoor spaces (e.g., apartments).

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-purple mr2 px2 rounded bg-purple:10>Dense Target Poses</div> <br>
    <span text-purple2>High density <ltex formula="\rho = \frac{\sum S_i}{S_{tot}}" />. Robots are close to each other and their targets.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-orange mr2 px2 rounded bg-orange:10>Polytopic Shapes</div> <br>
    <span text-orange2>Robots are not circles. They are convex or non-convex polygons (chairs, tables).</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-red mr2 px2 rounded bg-red:10>Risks</div> <br>
    <span text-red2>Collisions, Oscillations, and Deadlocks due to shape interference and lack of reactivity.</span>
  </span>

</div>

::right::
<div v-click="4" bg-gray:10 border="~ gray/50 rounded-lg" h-full flex flex-col justify-center>
   <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded>
     <div i-solar:robot-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold">Assistive Use Cases</span>
   </div>
   <div ml2 p2 text-gray1>
     <v-clicks :at="5">
       <ul>
         <li><strong>Room Reconfiguration:</strong> Autonomous rearrangement for meetings, meals, or cleaning.</li>
         <li><strong>Clearing the Way:</strong> Furniture moves aside dynamically for wheelchair users.</li>
       </ul>
     </v-clicks>
   </div>
     <v-clicks :at="3"  >
       <img h-50 w-full object-contain src="/swappy-20260515-014648.png" alt="Mobile furniture swarm demonstrating dense coordination challenges" />
       <p class="text-xs text-gray-500 mt-2 italic">
         Fig. 1: Mobile assistive furniture swarm demonstrating dense target pose configuration and polytopic shape interference. 
         Source: Tang et al., IEEE Robotics and Automation Letters, Vol. 10, No. 7, July 2025.
       </p>
     </v-clicks>
</div>

---
---
# 2. Related Work & Limitations

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Sampling-Based (PRM/RRT)</div> <br>
    <span text-blue2>Computationally expensive; often simplify robots to points/circles, ignoring specific shapes.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Velocity Obstacle (VO/Polytopic-VO)</div> <br>
    <span text-rose2>Effective for convex shapes but struggles with dense configurations and non-convex polytopes.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Potential Fields (APF/HPF)</div> <br>
    <span text-yellow2>Suffer from local minima (deadlocks). Harmonic functions limit feasible robot motions.</span>
  </span>
</div>


---
layout: default
---

# 3. Proposed Solution: VPFM

**Velocity Potential Field Modulation**

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Control Points on Boundary</div> <br>
    <span text-blue2>Unlike previous works, control points are placed on vertices/edges of the polytope, not just the center.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Attractive Velocity Modulation</div> <br>
    <span text-rose2>Flows around obstacles using tangent components (inspired by fluid dynamics) to avoid local minima.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Repulsive Velocity & Reactivity</div> <br>
    <span text-yellow2>New regulation mechanism: Repulsion strength/range decreases as robot nears target, keeping it reactive to neighbors.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Rigid Body Constraint</div> <br>
    <span text-green2>Weighted Least Squares ensures calculated velocities respect rigid body kinematics (no deformation).</span>
  </span>
</div>
---
layout: center
---

<div flex="~ items-center gap-2 col" mb2>
  <img src="/swappy-20260515-021722.png" alt="vpfm diagram" class="h-auto w-auto object-contain" />
  <span class="text-xs text-gray-500">velocity flow modulation around polytopic obstacles</span>
</div>

---
layout: center
---

# VPFM: Core Intuition — Attraction & Modulation
<div flex="~ items-center gap-2" mb2>
  <img src="/swappy-20260515-021722.png" alt="vpfm diagram" class="h-30 w-auto object-contain" />
  <span class="text-xs text-gray-500">velocity flow modulation around polytopic obstacles</span>
</div>
<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:rocket-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">1. Basic Attraction</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="\dot{x} = f(x), \quad f(x) = -(x - \hat{x})" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Intuition:</span>
       Simple linear pull toward the target <ltex formula="\hat{x}"/>. Acts like a spring: the farther the robot is from the goal, the stronger the attractive velocity.
     </div>
   </div>
 </div>

 <div v-click="3" bg-rose:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:water-drop-broken text-xl invert-100 text-rose-4 />
     <span class="font-bold text-lg">2. Flow Modulation</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="v_{k,att}(x) = M_k(x)\big(f(x) - \tilde{\dot{x}}_k\big) + \tilde{\dot{x}}_k" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-rose block mb1">Intuition:</span>
       Instead of crashing into obstacle <ltex formula="R_k"/>, the velocity is "bent" to flow around it. Like water parting around a rock, preventing local minima and deadlocks.
     </div>
   </div>
 </div>

</div>

---
layout: center
---

# VPFM: Core Intuition — Modulation Matrix & Distance

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:chart-line-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">3. Basis & Eigenvalue Scaling</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="\begin{aligned} M_k(x) &= E_k(x) \, D_k(x) \, E_k(x)^{-1} \\ D_k(x) &= \text{diag}\!\left(1 - \frac{c_n}{\Gamma_k}, \; 1 + \frac{c_e}{\Gamma_k}\right) \end{aligned}" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Intuition:</span>
       Aligns velocity into obstacle coordinates (<ltex formula="n_k"/>: normal, <ltex formula="e_k"/>: tangent). Shrinks motion toward the obstacle (<ltex formula="\lambda_n < 1"/>) and stretches motion along the surface (<ltex formula="\lambda_e > 1"/>).
     </div>
   </div>
 </div>

 <div v-click="3" bg-rose:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:shield-warning-broken text-xl invert-100 text-rose-4 />
     <span class="font-bold text-lg">4. Distance Function with Buffer</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="\Gamma_k(d_k) = \begin{cases} \beta d_k + 1, & 0 \leq d_k < b_k \\ d_k + (\beta - 1)b_k + 1, & d_k \geq b_k \end{cases}" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-rose block mb1">Intuition:</span>
       Creates a "buffer zone" (<ltex formula="b_k"/>) near the surface. Inside, <ltex formula="\Gamma_k \approx 1"/> signals high collision risk, forcing strong modulation. Outside, it scales linearly with distance.
     </div>
   </div>
 </div>

</div>

---
layout: center
---

# VPFM: Core Intuition — Repulsion & Reactivity

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:shield-check-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">5. Normal-Direction Repulsion</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="v_{k,rep}(x) = \frac{\delta_k}{r_{k,sen}(\Gamma_k - 1)} \, n_k(x)" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Intuition:</span>
       Pushes robots apart along the surface normal <ltex formula="n_k"/> when proximity thresholds are crossed. Repulsion strength grows rapidly as <ltex formula="\Gamma_k \to 1"/> (collision boundary).
     </div>
   </div>
 </div>

 <div v-click="3" bg-rose:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:target-broken text-xl invert-100 text-rose-4 />
     <span class="font-bold text-lg">6. Adaptive Repulsion Range</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="\gamma_k(\hat{d}_{k,ref}) = \begin{cases} r_{k,sen} + 1, & \hat{d}_{k,ref} > b_k \\ \beta b_k + 1, & 0 \leq \hat{d}_{k,ref} \leq b_k \end{cases}" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-rose block mb1">Intuition:</span>
       As robot <ltex formula="R_k"/> nears its target, its "repulsion bubble" shrinks to the buffer zone only. Prevents converged robots from blocking others, eliminating deadlocks.
     </div>
   </div>
 </div>

</div>

---
layout: center
---

# VPFM: Core Intuition — Strength Regulation & Rigid Body

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:slider-vertical-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">7. Adaptive Repulsion Strength</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="\delta_k(\hat{d}_{k,ref}) = \begin{cases} 1, & \hat{d}_{k,ref} > r_{k,sen} \\ \frac{\hat{d}_{k,ref}}{r_{k,sen}}, & b_k \leq \hat{d}_{k,ref} \leq r_{k,sen} \\ \frac{b_k}{r_{k,sen}}, & \hat{d}_{k,ref} < b_k \end{cases}" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Intuition:</span>
       Linearly weakens repulsion as the robot approaches its target. Far away: strong push. Near target: gentle nudge. Smooth decay prevents velocity jittering.
     </div>
   </div>
 </div>

 <div v-click="3" bg-rose:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:cube-broken text-xl invert-100 text-rose-4 />
     <span class="font-bold text-lg">8. Rigid Body Constraint (WLS)</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30">
       <ltex formula="(W_i A_i) \, \xi_i = W_i b_i, \quad \xi_i = [\dot{x}_{i,ref}, \dot{y}_{i,ref}, \dot{\phi}_i]^\top" displayMode />
     </div>
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-rose block mb1">Intuition:</span>
       Each control point suggests a different velocity. Weighted Least Squares solves for a single rigid motion (translation + rotation) that best satisfies all points, ensuring zero deformation.
     </div>
   </div>
 </div>

</div>

---
layout: center
---

# 4. Results: Simulation Experiments — Setup & Metrics

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:chart-square-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">Evaluation Metrics</span>
   </div>
   <div flex="~ gap-4 items-start">
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Key Metrics Reported:</span>
       <ul class="list-disc ml4 space-y-1">
         <li><strong>Collision Rate:</strong> % of runs with any collision</li>
         <li><strong>Deadlock Rate:</strong> % of runs where robots fail to converge within <ltex formula="T_{\max}" /></li>
         <li><strong>Scenario Convergence:</strong> % of runs where <em>all</em> robots reach targets</li>
         <li><strong>Robot Convergence:</strong> Average % of converged robots per run</li>
         <li><strong>Time/Distance Efficiency:</strong> Avg. convergence time & path optimality</li>
         <li><strong>Time/Iteration:</strong> Computational cost per control step</li>
       </ul>
     </div>
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30" text-xs>
       <span class="font-semibold block mb1">Simulation Settings:</span>
       <ul class="list-disc ml4 space-y-1">
         <li>Platform: Python 3.8, Intel i7-13700</li>
         <li>Timestep: <ltex formula="\Delta t = 0.05\text{–}0.1\,\text{s}" /></li>
         <li>Max time: <ltex formula="T_{\max} = 80\text{–}120\,\text{s}" /></li>
         <li>Sensing radius: <ltex formula="r_{sen} = 2\,\text{m}" /></li>
         <li>Modulation: <ltex formula="c_n = c_e = 1" /></li>
         <li>100 randomized runs per setup</li>
       </ul>
     </div>
   </div>
 </div>

</div>

---
layout: center
---

# 4. Results: Antipodal Position Switching

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:arrows-repeat-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">Setup & Qualitative Result</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Scenario:</span>
       <ul class="list-disc ml4 space-y-1">
         <li>10 regular polygons (3–7 vertices) on a 4m-radius circle</li>
         <li>Targets on opposite side → robots cross at center</li>
         <li>Polygon radius: 0.1m → 0.9m (density: 0.22% → 17.83%)</li>
         <li>Buffer: <ltex formula="b = 0.3\,\text{m}" />, max velocity: 0.5–1.0 m/s</li>
       </ul>
       <span class="font-semibold text-blue block mt2 mb1">Key Finding:</span>
       <p>At high density (17.83%), only <strong>VPF</strong> and <strong>VPFM</strong> maintain ~100% scenario convergence. Others suffer collisions (Polytopic-VO, DSM) or deadlocks (CBF-MPC, Safe-HDSM).</p>
     </div>
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30" flex items-center justify-center>
       <img src="/swappy-20260515-132016.png" class="h-40 w-auto object-contain" alt="Antipodal switching visualization" />
     </div>
   </div>
 </div>
 </div>

---
---
# 4. Results: Antipodal Position Switching

 <div v-click="1" bg-rose:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:table-broken text-xl invert-100 text-rose-4 />
     <span class="font-bold text-lg">Quantitative Results (Density = 17.83%)</span>
   </div>
   <div class="text-xs overflow-x-auto">
     <table class="w-full border-collapse">
       <thead class="bg-gray:20">
         <tr>
           <th class="p2 border border-gray/30">Method</th>
           <th class="p2 border border-gray/30">Collision %</th>
           <th class="p2 border border-gray/30">Deadlock %</th>
           <th class="p2 border border-gray/30">Scenario Conv. %</th>
           <th class="p2 border border-gray/30">Time/Iter (ms)</th>
         </tr>
       </thead>
       <tbody>
         <tr><td class="p2 border border-gray/30">Polytopic-VO</td><td class="p2 border border-gray/30 text-rose">12</td><td class="p2 border border-gray/30">8</td><td class="p2 border border-gray/30 text-rose">80</td><td class="p2 border border-gray/30">1.2</td></tr>
         <tr><td class="p2 border border-gray/30">CBF-MPC</td><td class="p2 border border-gray/30">0</td><td class="p2 border border-gray/30 text-rose">24</td><td class="p2 border border-gray/30 text-rose">76</td><td class="p2 border border-gray/30 text-rose">45.8</td></tr>
         <tr><td class="p2 border border-gray/30">DSM</td><td class="p2 border border-gray/30 text-rose">18</td><td class="p2 border border-gray/30">6</td><td class="p2 border border-gray/30 text-rose">76</td><td class="p2 border border-gray/30">2.1</td></tr>
         <tr><td class="p2 border border-gray/30">Safe-HDSM</td><td class="p2 border border-gray/30">2</td><td class="p2 border border-gray/30 text-rose">22</td><td class="p2 border border-gray/30 text-rose">78</td><td class="p2 border border-gray/30">2.8</td></tr>
         <tr><td class="p2 border border-gray/30">VPF</td><td class="p2 border border-gray/30">0</td><td class="p2 border border-gray/30">0</td><td class="p2 border border-gray/30 text-green">98</td><td class="p2 border border-gray/30">2.5</td></tr>
         <tr class="bg-blue:10"><td class="p2 border border-gray/30 font-bold">VPFM</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">100</td><td class="p2 border border-gray/30">3.1</td></tr>
       </tbody>
     </table>
     <p class="text-xs text-gray-500 mt1">Best values per column highlighted. VPFM achieves perfect convergence with minimal computational overhead.</p>
   </div>
 </div>


---
layout: center
---

# 4. Results: Dense Reconfiguration of Hexagons

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:grid-dots-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">Setup & Qualitative Result</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Scenario:</span>
       <ul class="list-disc ml4 space-y-1">
         <li>19 regular hexagons in a 6m×6m area</li>
         <li>Hexagon radius: 0.1m → 0.4m (density: 1.37% → 21.94%)</li>
         <li>Buffer: <ltex formula="b = 0.15\,\text{m}" />, max velocity: 0.6 m/s</li>
         <li>Random initialization via 5×5 grid placement</li>
       </ul>
       <span class="font-semibold text-blue block mt2 mb1">Key Finding:</span>
       <p>At high density, <strong>VPFM</strong> resolves deadlocks via tangent flow modulation, while Safe-HDSM fails due to non-reactive converged robots. CBF-MPC is too slow for real-time use.</p>
     </div>
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30" flex items-center justify-center>
       <img src="/swappy-20260515-132429.png" class="h-40 w-auto object-contain" alt="Dense reconfiguration visualization" />
     </div>
   </div>
 </div>

</div>

---
---

# 4. Results: Dense Reconfiguration of Hexagons
 <div v-click="1" bg-rose:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:table-broken text-xl invert-100 text-rose-4 />
     <span class="font-bold text-lg">Quantitative Results (Density = 21.94%)</span>
   </div>
   <div class="text-xs overflow-x-auto">
     <table class="w-full border-collapse">
       <thead class="bg-gray:20">
         <tr>
           <th class="p2 border border-gray/30">Method</th>
           <th class="p2 border border-gray/30">Collision %</th>
           <th class="p2 border border-gray/30">Deadlock %</th>
           <th class="p2 border border-gray/30">Robot Conv. %</th>
           <th class="p2 border border-gray/30">Time/Iter (ms)</th>
         </tr>
       </thead>
       <tbody>
         <tr><td class="p2 border border-gray/30">Polytopic-VO</td><td class="p2 border border-gray/30">4</td><td class="p2 border border-gray/30 text-rose">38</td><td class="p2 border border-gray/30 text-rose">62</td><td class="p2 border border-gray/30">0.9</td></tr>
         <tr><td class="p2 border border-gray/30">CBF-MPC</td><td class="p2 border border-gray/30 text-rose">22</td><td class="p2 border border-gray/30">14</td><td class="p2 border border-gray/30 text-rose">64</td><td class="p2 border border-gray/30 text-rose">52.3</td></tr>
         <tr><td class="p2 border border-gray/30">DSM</td><td class="p2 border border-gray/30 text-rose">28</td><td class="p2 border border-gray/30">8</td><td class="p2 border border-gray/30 text-rose">64</td><td class="p2 border border-gray/30">2.4</td></tr>
         <tr><td class="p2 border border-gray/30">Safe-HDSM</td><td class="p2 border border-gray/30">3</td><td class="p2 border border-gray/30 text-rose">34</td><td class="p2 border border-gray/30 text-rose">66</td><td class="p2 border border-gray/30">3.2</td></tr>
         <tr><td class="p2 border border-gray/30">VPF</td><td class="p2 border border-gray/30">1</td><td class="p2 border border-gray/30">2</td><td class="p2 border border-gray/30 text-green">97</td><td class="p2 border border-gray/30">2.9</td></tr>
         <tr class="bg-blue:10"><td class="p2 border border-gray/30 font-bold">VPFM</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">100</td><td class="p2 border border-gray/30">3.5</td></tr>
       </tbody>
     </table>
     <p class="text-xs text-gray-500 mt1">VPFM's tangent flow modulation prevents oscillations and deadlocks that plague VO-based and static-repulsion methods.</p>
   </div>
 </div>


---
layout: center
---

# 4. Results: Auto-Assembly & Dynamic Attractors

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:puzzle-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">Auto-Assembly of Irregular Polytopes</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Setup:</span>
       <ul class="list-disc ml4 space-y-1">
         <li>15 irregular polytopic parts (convex + non-convex)</li>
         <li>Target: compact square-like assembly</li>
         <li>Buffer: <ltex formula="b = 0.18\,\text{m}" /></li>
       </ul>
       <span class="font-semibold text-blue block mt2 mb1">Key Result:</span>
       <p>DSM: 96% collision rate. VPF/Safe-HDSM: deadlocks. <strong>VPFM</strong> achieves 100% scenario convergence by combining tangent flow + adaptive repulsion.</p>
     </div>
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30" text-xs>
       <table class="w-full border-collapse">
         <thead class="bg-gray:20"><tr><th class="p2 border">Method</th><th class="p2 border">Collision %</th><th class="p2 border">Scenario Conv. %</th></tr></thead>
         <tbody>
           <tr><td class="p2 border">DSM</td><td class="p2 border text-rose">96</td><td class="p2 border text-rose">4</td></tr>
           <tr><td class="p2 border">VPF</td><td class="p2 border">0</td><td class="p2 border text-rose">72</td></tr>
           <tr><td class="p2 border">Safe-HDSM</td><td class="p2 border">1</td><td class="p2 border text-rose">68</td></tr>
           <tr class="bg-blue:10"><td class="p2 border font-bold">VPFM</td><td class="p2 border text-green">0</td><td class="p2 border text-green">100</td></tr>
         </tbody>
       </table>
     </div>
   </div>
 </div>
 </div>

---
---
# 4. Results: Auto-Assembly & Dynamic Attractors

 <div v-click="1" bg-rose:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:wheelchair-broken text-xl invert-100 text-rose-4 />
     <span class="font-bold text-lg">Clearing the Way (Dynamic Attractors)</span>
   </div>
   <div flex="~ gap-4 items-center">
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-rose block mb1">Setup:</span>
       <ul class="list-disc ml4 space-y-1">
         <li>6 tables + 12 chairs in 9.5m×4m workspace</li>
         <li>User: circle obstacle, 0.5 m/s, random path</li>
         <li>Attractors move perpendicular to user velocity</li>
       </ul>
       <span class="font-semibold text-rose block mt2 mb1">Key Result:</span>
       <p>Dynamic attractors reduce collision rate from 28% → 9%. VPFM adapts smoothly to moving targets while maintaining formation integrity.</p>
     </div>
     <div flex-1 bg-white:5 p3 rounded border="~ gray/30" text-xs>
       <table class="w-full border-collapse">
         <thead class="bg-gray:20"><tr><th class="p2 border">Attractor Type</th><th class="p2 border">Collision %</th><th class="p2 border">Scenario Conv. %</th></tr></thead>
         <tbody>
           <tr><td class="p2 border">Static</td><td class="p2 border text-rose">28</td><td class="p2 border">72</td></tr>
           <tr class="bg-blue:10"><td class="p2 border font-bold">Dynamic</td><td class="p2 border text-green">9</td><td class="p2 border text-green">91</td></tr>
         </tbody>
       </table>
     </div>
   </div>
 </div>


---
layout: center
---

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:robot-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">Hardware & Experimental Setup</span>
   </div>
   <div flex="~ gap-4 items-start">
     <div flex-1 text-sm text-gray1>
       <span class="font-semibold text-blue block mb1">Platform:</span>
       <ul class="list-disc ml4 space-y-1">
         <li><strong>Robots:</strong> "Omnibots" (mobile furniture) [26]</li>
         <li><strong>Localization:</strong> Vicon motion capture system (centralized)</li>
         <li><strong>Control:</strong> VPFM executed on central PC, commands sent via ROS/Bluetooth</li>
         <li><strong>Max velocity:</strong> 0.3 m/s (hardware-limited)</li>
         <li><strong>Workspace:</strong> 4m×3m with virtual walls</li>
       </ul>
     </div>
     <div flex-1 bg-white:5 p3 pb0 rounded border="~ gray/30" text-sm>
       <span class="font-semibold block mb1">Tested Use Cases:</span>
       <ul class="list-disc ml4 space-y-1">
         <li><strong>Room Reconfiguration:</strong> Structured → user-defined formation</li>
         <li><strong>+ Disturbance:</strong> Manual pushing/pulling during rearrangement</li>
         <li><strong>Clearing the Way:</strong> Furniture moves aside for wheelchair user</li>
       </ul>
       <p class="mt2 text-xs text-gray-500">Each setup repeated 10×. Same metrics as simulations.</p>
     </div>
   </div>
 </div>

 <div v-click="3" bg-gray:10 border="~ gray/50 rounded-lg" p3 flex items-center justify-center>
   <img src="/swappy-20260515-132647.png" class="h-48 w-auto object-contain" alt="Real-world experimental setup" />
   <p class="text-xs text-center mt2 text-gray-500">Fig: Real-world mobile furniture swarm performing room reconfiguration. Target poses highlighted with colored labels.</p>
 </div>

</div>

---
layout: center
---

# 5. Results: Real-World Experiments — Quantitative Results

<div flex flex-col gap-4 h-full py2>

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:table-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">Quantitative Results (10 Runs Each)</span>
   </div>
   <div class="text-xs overflow-x-auto">
     <table class="w-full border-collapse">
       <thead class="bg-gray:20">
         <tr>
           <th class="p2 border border-gray/30">Use Case</th>
           <th class="p2 border border-gray/30">Collision %</th>
           <th class="p2 border border-gray/30">Deadlock %</th>
           <th class="p2 border border-gray/30">Scenario Conv. %</th>
           <th class="p2 border border-gray/30">Avg. Convergence Time (s)</th>
         </tr>
       </thead>
       <tbody>
         <tr><td class="p2 border border-gray/30">Room Reconfiguration</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">100</td><td class="p2 border border-gray/30">42.3 ± 5.1</td></tr>
         <tr><td class="p2 border border-gray/30">+ External Disturbance</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">100</td><td class="p2 border border-gray/30">48.7 ± 8.3</td></tr>
         <tr><td class="p2 border border-gray/30">Clearing the Way</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">0</td><td class="p2 border border-gray/30 text-green">100</td><td class="p2 border border-gray/30">38.9 ± 4.2</td></tr>
       </tbody>
     </table>
     <p class="text-xs text-gray-500 mt1">All use cases achieved 100% scenario convergence with zero collisions/deadlocks, demonstrating real-time effectiveness and robustness to disturbances.</p>
   </div>
 </div>

</div>

---
layout: center
---

# 4. Results Summary & Key Takeaways

 <div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg" p3>
   <div flex="~ items-center gap-2" mb2>
     <div i-solar:lightbulb-broken text-xl invert-100 text-blue-4 />
     <span class="font-bold text-lg">Why VPFM Works: Core Innovations</span>
   </div>
   <div class="text-sm text-gray1 grid grid-cols-2 gap-3">
     <div bg-white:5 p2 rounded border="~ gray/30">
       <span class="font-semibold text-blue block">Tangent Flow Modulation</span>
       <p class="text-xs mt1">Compresses normal velocity, stretches tangent velocity → robots "slide" around obstacles instead of stopping.</p>
     </div>
     <div bg-white:5 p2 rounded border="~ gray/30">
       <span class="font-semibold text-rose block">Adaptive Repulsion</span>
       <p class="text-xs mt1">Repulsion strength/range shrink as robot nears target → prevents converged robots from blocking others.</p>
     </div>
     <div bg-white:5 p2 rounded border="~ gray/30">
       <span class="font-semibold text-yellow block">Buffer Region Distance</span>
       <p class="text-xs mt1"><ltex formula="\Gamma_k(d_k)" /> with buffer <ltex formula="b_k" /> ensures strong modulation only when truly needed.</p>
     </div>
     <div bg-white:5 p2 rounded border="~ gray/30">
       <span class="font-semibold text-green block">Rigid-Body WLS</span>
       <p class="text-xs mt1">Weighted Least Squares enforces rigid motion → no deformation, even with many control points.</p>
     </div>
   </div>
 </div>

---
layout: default
---

# 5. Conclusion & Future Work

<div flex="~ col gap-4" py6>
  <span v-click>
    <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Conclusion</div> <br>
    <span text-blue2>VPFM effectively solves dense coordination for polytopic swarms. It reduces collisions, oscillations, and deadlocks by combining tangent flow modulation with adaptive repulsion.</span>
  </span>
  <span v-click>
    <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Future Work</div> <br>
    <span text-rose2>
      <ul>
        <li><strong>Theoretical Bounds:</strong> Prove convergence guarantees (currently empirical).</li>
        <li><strong>Decentralization:</strong> Integrate onboard sensing to remove reliance on centralized Vicon system.</li>
        <li><strong>3D Extension:</strong> Extend workspace from 2D to 3D environments.</li>
        <li><strong>Markerless Localization:</strong> Replace Vicon markers with vision-based solutions.</li>
      </ul>
    </span>
  </span>
</div>

---
layout: center
class: text-center
---

# Thank You!

**Questions?**

Source code: [github.com/Mikasatlx/VPFM-BioRob-EPFL](https://github.com/Mikasatlx/VPFM-BioRob-EPFL)
