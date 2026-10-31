---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
title: Learning Theories as Model Priors
remoteAssets: false
fonts:
  sans: Inter
  serif: Robot Slab
  mono: Fira Code
  local: [Inter, 'Robot Slab', 'Fira Code']
layout: center
---


<div class="max-w-4xl">
  <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
    Theory-Aware Predictive Modeling
  </div>

  <h1 class="text-5xl font-bold leading-tight">
    Bridging <span class="text-blue-300">Learning Theory</span> and <span class="text-emerald-300">Student Modeling</span>
  </h1>

  <p class="mt-6 text-lg text-gray-300">
    Predictive tutoring models often see only text. Learning theories provide the missing latent structure: behavior strength, impasses, disequilibrium, self-regulation, and scaffolding.
  </p>

  <div class="mt-8 flex flex-wrap gap-3 text-sm">
    <span class="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-200">Behaviorism</span>
    <span class="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-purple-200">Cognitivism & Soar</span>
    <span class="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-yellow-200">Disequilibrium</span>
    <span class="rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-teal-200">Self-Regulated Learning</span>
    <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-orange-200">Sociocultural / ZPD</span>
  </div>

  <div class="mt-10 text-sm text-gray-500">
    Goal: move from “correct / incorrect” toward a model of <b>how the student is learning</b>.
  </div>
</div>

<!--
Welcome everyone. This presentation is about a key gap in predictive tutoring systems: many models see only surface-level text.

A model can predict the next token or classify an answer as correct or incorrect, but that does not necessarily tell us whether the student is developing a robust skill, stuck in a misconception, guessing, or only succeeding because of heavy teacher support.

Learning theories help here. They provide structured latent concepts that can be translated into model features: behavior strength, cognitive impasses, schema change, self-regulation, and scaffolding.

In the following slides, we will go through five theories. For each one, we will first explain the theory, then identify the modeling gap it addresses, and finally explain how it can improve a predictive model of tutoring.
-->

---

# Behaviorism — Theory

<div class="max-w-5xl text-left">
  <p class="text-lg text-gray-300">
    Behaviorism explains learning as a change in observable behavior produced by a <b>reinforcement loop</b>.
  </p>

  <div class="mt-8 flex items-stretch justify-center gap-3 text-center">
    <div class="w-40 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-4">
      <div class="text-2xl">⚡</div>
      <div class="mt-2 font-bold text-blue-200">Stimulus</div>
      <div class="mt-1 text-xs text-gray-400">task, prompt, or cue</div>
    </div>
    <div class="flex items-center text-2xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-4">
      <div class="text-2xl">💬</div>
      <div class="mt-2 font-bold text-blue-200">Response</div>
      <div class="mt-1 text-xs text-gray-400">student answer or action</div>
    </div>
    <div class="flex items-center text-2xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-4">
      <div class="text-2xl">✅</div>
      <div class="mt-2 font-bold text-blue-200">Reinforcement</div>
      <div class="mt-1 text-xs text-gray-400">feedback, correction, reward</div>
    </div>
    <div class="flex items-center text-2xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-4">
      <div class="text-2xl">📈</div>
      <div class="mt-2 font-bold text-green-200">Habit Strength</div>
      <div class="mt-1 text-xs text-gray-400">faster, more stable behavior</div>
    </div>
  </div>

  <div class="mt-8 rounded-r-lg border-l-4 border-blue-500/60 bg-blue-500/5 px-4 py-3 text-sm text-gray-300">
    <b class="text-blue-300">Model relevance:</b> learning becomes measurable through repetition, response speed, and whether feedback changes future behavior.
  </div>
</div>

<!--
Behaviorism is a useful starting point because it focuses on observable behavior rather than trying to directly infer hidden mental states.

In a tutoring setting, we can think of the learning loop as stimulus, response, and reinforcement. The stimulus is the problem or prompt. The response is the student’s answer or action. Reinforcement is the feedback that follows, such as confirmation, correction, or a hint.

If a response is repeatedly reinforced, it becomes stronger and more automatic. If it is not reinforced, it may weaken over time. However, in real tutoring data, incorrect behaviors can persist if they have been practiced repeatedly.

The key modeling implication is that learning is visible in patterns over time: response speed, repetition, and whether feedback actually changes the next response.
-->

---
layout: two-cols
---

# Behaviorism — Modeling Gap

<div class="pr-4">
  <div class="text-sm font-semibold text-rose-300 mb-3">What raw text misses</div>

  <div class="flex flex-col gap-3 text-sm text-gray-300">
    <div class="flex gap-2">
      <span>⏱</span>
      <span><b>Latency</b> — fast fluency versus slow hesitation.</span>
    </div>
    <div class="flex gap-2">
      <span>🔁</span>
      <span><b>Repetition</b> — reinforced patterns versus looping errors.</span>
    </div>
    <div class="flex gap-2">
      <span>📉</span>
      <span><b>Extinction</b> — whether feedback actually changes the next response.</span>
    </div>
  </div>

  <div class="mt-5 rounded-lg border border-gray-500/30 bg-gray-500/5 p-3 text-xs text-gray-400">
    A transcript can show that an answer is wrong, but not whether the wrong behavior is weakening or becoming entrenched.
  </div>
</div>

::right::

<div>
  <div class="text-sm font-semibold text-green-300 mb-3">How this helps the model</div>

  <ul class="text-sm text-gray-300">
    <li>Converts behavior into <b>time-series features</b> the model can condition on.</li>
    <li>Separates <b>lack of knowledge</b> from a <b>strong but incorrect habit</b>.</li>
    <li>Helps decide whether to repeat, correct, or interrupt the current behavior loop.</li>
  </ul>

  <div class="mt-5 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-sm text-gray-300">
    <b class="text-blue-300">Model benefit:</b> if a student keeps producing <code>104</code> after feedback, the model predicts stagnation and increases scaffold strength instead of treating it as a fresh mistake.
  </div>
</div>

<!--
The modeling gap is that raw text often reduces all of this rich behavior to a single label: correct or incorrect.

But two students can both give a wrong answer for very different reasons. One may be hesitating because the association is weak. Another may be rapidly repeating a well-practiced but incorrect habit.

Behaviorism gives the model time-series features. Response latency can indicate fluency or uncertainty. Repetition can indicate habit strength. Change after feedback can show whether reinforcement is working.

For example, if a student keeps producing 104 despite repeated correction, the model should not treat every 104 as a fresh independent mistake. It should detect stagnation and recognize that stronger intervention may be needed to break the loop.
-->


---
layout: two-cols
---

# Cognitivism & Cognitive Load — Theory

<div class="pr-4">
  <p class="text-sm text-gray-300">
    Cognitive Load Theory focuses on the limits of working memory. A learner may have the relevant knowledge, but still fail if the mental demand exceeds available capacity.
  </p>

  <div class="mt-6 flex flex-col gap-3 text-sm">
    <div class="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
      <b class="text-rose-200">Intrinsic Load</b>
      <div class="mt-1 text-xs text-gray-400">
        complexity that belongs to the skill or task itself, such as multi-step reasoning
      </div>
    </div>
    <div class="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
      <b class="text-rose-200">Extraneous Load</b>
      <div class="mt-1 text-xs text-gray-400">
        unnecessary effort caused by unclear instruction, poor presentation, or confusing support
      </div>
    </div>
    <div class="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
      <b class="text-rose-200">Germane Load</b>
      <div class="mt-1 text-xs text-gray-400">
        productive effort spent building schemas and integrating new knowledge
      </div>
    </div>
  </div>
</div>

::right::

<div>
  <div class="text-sm font-semibold text-rose-300 mb-3">When capacity is exceeded</div>

  <div class="flex flex-col gap-2 text-sm text-gray-300">
    <div class="flex items-center gap-2">
      <span>🧠</span>
      <span>Working memory cannot hold all relevant rules and constraints.</span>
    </div>
    <div class="pl-7 text-gray-500">↓</div>
    <div class="flex items-center gap-2">
      <span>🧩</span>
      <span>Rule selection becomes unstable, incomplete, or dropped.</span>
    </div>
    <div class="pl-7 text-gray-500">↓</div>
    <div class="flex items-center gap-2">
      <span>⚠️</span>
      <span>Errors may look like carelessness, guessing, or missing knowledge.</span>
    </div>
  </div>

  <div class="mt-8 rounded-r-lg border-l-4 border-rose-500/60 bg-rose-500/5 px-4 py-3 text-sm text-gray-300">
    <b class="text-rose-300">Key idea:</b> some failures are not caused by missing knowledge, but by overloaded working memory. The model should distinguish <i>resource exhaustion</i> from <i>lack of skill</i>.
  </div>

  <div class="mt-4 text-xs text-gray-500">
    Modeling implication: reduce extraneous load, manage intrinsic load, and preserve capacity for germane learning.
  </div>
</div>

<!--
Cognitive Load Theory adds a resource-based explanation to cognitivism. Even when a student has the correct rule available, working memory limits can prevent them from maintaining, coordinating, or applying it successfully.

Intrinsic load comes from the complexity of the task itself. Extraneous load comes from poor instruction, unclear hints, confusing interface design, or unnecessary complexity. Germane load is the useful cognitive effort spent building schemas and deeper understanding.

For modeling, this is important because not every error means the skill is missing. A student may know the rule but still fail because the task overloaded their working memory. This helps the model distinguish between lack of knowledge and temporary cognitive overload.

In practice, this suggests different interventions. If the issue is missing knowledge, the system may need to teach or repair a rule. If the issue is overload, the system may need to simplify the task, break it into steps, reduce distractions, or provide temporary scaffolding.
-->

---
layout: center
---

# Cognitivism & Soar — Theory

<div class="max-w-5xl text-left mx-auto">
  <p class="text-lg text-gray-300">
    Cognitivism treats learning as internal problem solving. In Soar, behavior emerges from a decision cycle that selects and applies rules until an <b>impasse</b> forces repair.
  </p>

  <div class="mt-8 flex items-stretch justify-center gap-2 text-center text-sm">
    <div class="w-40 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-4">
      <div class="text-xl">🎯</div>
      <div class="mt-2 font-bold text-purple-200">Goal</div>
      <div class="mt-1 text-xs text-gray-400">what the learner is trying to achieve</div>
    </div>
    <div class="flex items-center text-xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-4">
      <div class="text-xl">🧩</div>
      <div class="mt-2 font-bold text-purple-200">Rule Selection</div>
      <div class="mt-1 text-xs text-gray-400">choosing a procedure or knowledge component</div>
    </div>
    <div class="flex items-center text-xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-4">
      <div class="text-xl">⚠️</div>
      <div class="mt-2 font-bold text-purple-200">Impasse</div>
      <div class="mt-1 text-xs text-gray-400">knowledge is insufficient, conflicting, or unavailable</div>
    </div>
    <div class="flex items-center text-xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-4">
      <div class="text-xl">🛠</div>
      <div class="mt-2 font-bold text-purple-200">Repair</div>
      <div class="mt-1 text-xs text-gray-400">search, correction, or new learning</div>
    </div>
  </div>

  <div class="mt-8">
    <div class="text-sm font-semibold text-purple-300 mb-3">Types of impasse</div>
    <div class="grid grid-cols-3 gap-3 text-center text-xs">
      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 px-3 py-3">
        <b class="text-purple-200">Tie</b><br />
        multiple candidate rules compete
      </div>
      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 px-3 py-3">
        <b class="text-purple-200">Conflict</b><br />
        selected rules contradict each other
      </div>
      <div class="rounded-lg border border-purple-500/20 bg-purple-500/5 px-3 py-3">
        <b class="text-purple-200">No-Change</b><br />
        no available rule makes progress
      </div>
    </div>
  </div>

  <div class="mt-8 rounded-r-lg border-l-4 border-purple-500/60 bg-purple-500/5 px-4 py-3 text-sm text-gray-300">
    <b class="text-purple-300">Key idea:</b> an error is not just an output; it is evidence about where the learner's decision architecture broke down.
  </div>
</div>

<!--
Cognitivism shifts attention from external behavior to internal processing. Instead of only asking what the student did, it asks how the student processed the problem.

Soar models problem solving as a cycle. The learner has a goal, selects a rule or operator, applies it, and either makes progress or reaches an impasse.

An impasse is especially useful for modeling because it tells us where knowledge failed. A tie impasse means multiple options are available but none is clearly preferred. A conflict impasse means the available rules contradict each other. A no-change impasse means no available rule can move the problem forward.

For predictive modeling, this reframes errors. A wrong answer is not just a failure; it is diagnostic evidence about the learner’s decision process.
-->


---
layout: two-cols
---

# Cognitivism & Soar — Modeling Gap

<div class="pr-4">
  <div class="text-sm font-semibold text-rose-300 mb-3">What raw text misses</div>

  <div class="flex flex-col gap-3 text-sm text-gray-300">
    <div class="flex gap-2">
      <span>🎯</span>
      <span><b>Failure type</b> — ambiguity, contradiction, or missing rule.</span>
    </div>
    <div class="flex gap-2">
      <span>🧠</span>
      <span><b>Decision context</b> — why the learner selected a wrong procedure.</span>
    </div>
    <div class="flex gap-2">
      <span>🛠</span>
      <span><b>Repair need</b> — whether hinting is enough or direct correction is required.</span>
    </div>
  </div>

  <div class="mt-5 rounded-lg border border-gray-500/30 bg-gray-500/5 p-3 text-xs text-gray-400">
    A wrong answer such as <code>104</code> may come from several different cognitive bottlenecks.
  </div>
</div>

::right::

<div>
  <div class="text-sm font-semibold text-green-300 mb-3">How this helps the model</div>

  <ul class="text-sm text-gray-300">
    <li>Adds an <b>impasse state representation</b> alongside the text.</li>
    <li>Helps the model distinguish <b>hint-worthy confusion</b> from <b>rule conflict</b>.</li>
    <li>Improves prediction of the next useful tutoring move.</li>
  </ul>

  <div class="mt-5 rounded-lg border border-purple-500/30 bg-purple-500/5 p-3 text-sm text-gray-300">
    <b class="text-purple-300">Model benefit:</b> if a student says <code>8 × 13 = 104</code>, the model can infer a likely <code>Conflict Impasse</code> and prefer direct rule correction over a weak hint.
  </div>
</div>

<!--
The gap is that text-only models often treat all wrong answers as the same type of error. But the appropriate instructional response depends on why the answer is wrong.

If the student is uncertain between two valid-looking procedures, a hint may help. If two rules conflict, the student may need explicit rule correction. If no rule applies, the model may need to provide a worked step or reduce the problem.

Soar gives the model a vocabulary for these states. By representing an impasse type as a latent feature, the model can better predict which scaffold will be effective.

For example, if a student says 8 times 13 equals 104, this may indicate a conflict between partial procedures. In that case, a weak hint may be ineffective, and the model should predict that direct rule correction is more useful.
-->

---
layout: center
---

# Cognitive Disequilibrium — Theory

<div class="max-w-5xl text-left">
  <p class="text-lg text-gray-300">
    Disequilibrium describes the destabilizing moment when a learner's current schema cannot explain new evidence. Learning requires restoring balance through <b>accommodation</b>.
  </p>

  <div class="mt-8 flex items-stretch justify-center gap-3 text-center text-sm">
    <div class="w-40 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-4">
      <div class="text-2xl">🧱</div>
      <div class="mt-2 font-bold text-yellow-200">Prior Schema</div>
      <div class="mt-1 text-xs text-gray-400">existing understanding</div>
    </div>
    <div class="flex items-center text-2xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-4">
      <div class="text-2xl">⚡</div>
      <div class="mt-2 font-bold text-yellow-200">Contradiction</div>
      <div class="mt-1 text-xs text-gray-400">new evidence does not fit</div>
    </div>
    <div class="flex items-center text-2xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-4">
      <div class="text-2xl">🌀</div>
      <div class="mt-2 font-bold text-yellow-200">Disequilibrium</div>
      <div class="mt-1 text-xs text-gray-400">cognitive instability</div>
    </div>
    <div class="flex items-center text-2xl text-gray-500">→</div>
    <div class="w-40 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-4">
      <div class="text-2xl">🔧</div>
      <div class="mt-2 font-bold text-green-200">Accommodation</div>
      <div class="mt-1 text-xs text-gray-400">schema is revised</div>
    </div>
  </div>

  <div class="mt-8 grid grid-cols-2 gap-4 text-sm">
    <div class="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
      <div class="font-bold text-green-300">Self-Resolved</div>
      <div class="mt-1 text-gray-300">The learner rebuilds understanding independently, producing a stronger learning signal.</div>
    </div>
    <div class="rounded-xl border border-gray-500/30 bg-gray-500/5 p-4">
      <div class="font-bold text-gray-200">Teacher-Revealed</div>
      <div class="mt-1 text-gray-300">The answer is supplied externally, producing a weaker signal of true understanding.</div>
    </div>
  </div>

  <div class="mt-8 rounded-r-lg border-l-4 border-yellow-500/60 bg-yellow-500/5 px-4 py-3 text-sm text-gray-300">
    <b class="text-yellow-300">Key idea:</b> learning depends on whether the learner actually rebuilds understanding, not merely reaches the right answer.
  </div>
</div>

<!--
Cognitive disequilibrium comes from Piagetian ideas about schemas. A schema is a mental structure for interpreting the world.

When new evidence does not fit the learner’s current schema, the learner experiences disequilibrium. This state can be uncomfortable, but it can also be productive. If the learner successfully revises the schema, we call this accommodation.

The important distinction is how resolution happens. If the learner resolves the contradiction independently, that is strong evidence of conceptual change. But if the teacher simply reveals the answer and the learner repeats it, the final answer may be correct while the underlying schema remains unchanged.

So the theory tells us that correctness alone is not enough. We need to know whether the learner actually reconstructed understanding.
-->

---
layout: default
---

# Cognitive Disequilibrium — Modeling Gap

<div class="max-w-5xl">
  <p class="text-sm text-gray-300 mb-4">
    The modeling issue is not whether the answer is correct, but whether correctness reflects <b>accommodation</b>.
  </p>

  <div class="overflow-hidden rounded-xl border border-gray-500/30">
    <table class="w-full text-sm">
      <thead>
        <tr class="bg-gray-500/10 text-left">
          <th class="px-4 py-3">Observable pattern</th>
          <th class="px-4 py-3">Text-only inference</th>
          <th class="px-4 py-3">Theory-informed inference</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-gray-500/20">
          <td class="px-4 py-3">Student repeats a teacher-revealed answer</td>
          <td class="px-4 py-3">Correct</td>
          <td class="px-4 py-3">Weak evidence of learning</td>
        </tr>
        <tr class="border-t border-gray-500/20">
          <td class="px-4 py-3">Student pauses, revises, and explains</td>
          <td class="px-4 py-3">Possibly correct</td>
          <td class="px-4 py-3">Stronger evidence of schema repair</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mt-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-sm text-gray-300">
    <b class="text-yellow-300">How this helps the model:</b> it can gate mastery credit. Self-resolved disequilibrium increases predicted mastery, while teacher-revealed resolution suppresses mastery even when the final answer is correct.
  </div>
</div>

<!--
This creates a modeling problem: a model that only sees the final answer can overestimate mastery.

For example, if a teacher says the answer is 52 and the student replies, “Ah, I see, 52,” the transcript shows a correct answer. But that does not necessarily mean the student has truly understood or accommodated the schema.

A theory-aware model can use what we might call a resolution gate. If the learner self-resolves the disequilibrium, the model increases the mastery estimate. If the answer is teacher-revealed and merely repeated, the model suppresses mastery credit.

This helps avoid false mastery and improves prediction of future transfer. In other words, disequilibrium theory helps the model distinguish between surface correctness and real conceptual change.
-->

---
layout: center
---

# Self-Regulated Learning — Theory

<div class="max-w-5xl text-left">
  <p class="text-lg text-gray-300">
    Self-Regulated Learning describes how learners <b>plan</b>, <b>act</b>, and <b>monitor</b> their own understanding. It adds metacognition to raw performance.
  </p>

  <div class="mt-10 flex items-center justify-center gap-4 text-center">
    <div class="w-44 rounded-2xl border border-teal-500/30 bg-teal-500/10 px-4 py-5">
      <div class="text-2xl">🧭</div>
      <div class="mt-2 font-bold text-teal-200">Planning</div>
      <div class="mt-1 text-xs text-gray-400">goal setting and strategy selection</div>
    </div>
    <div class="text-2xl text-gray-500">→</div>
    <div class="w-44 rounded-2xl border border-teal-500/30 bg-teal-500/10 px-4 py-5">
      <div class="text-2xl">🛠</div>
      <div class="mt-2 font-bold text-teal-200">Enacting</div>
      <div class="mt-1 text-xs text-gray-400">executing the task</div>
    </div>
    <div class="text-2xl text-gray-500">→</div>
    <div class="w-44 rounded-2xl border border-teal-500/30 bg-teal-500/10 px-4 py-5">
      <div class="text-2xl">🔍</div>
      <div class="mt-2 font-bold text-teal-200">Monitoring</div>
      <div class="mt-1 text-xs text-gray-400">noticing errors and adjusting</div>
    </div>
    <div class="text-2xl text-gray-500">↺</div>
  </div>

  <div class="mt-10 rounded-r-lg border-l-4 border-teal-500/60 bg-teal-500/5 px-4 py-3 text-sm text-gray-300">
    <b class="text-teal-300">Key idea:</b> a correct answer produced through planning and self-monitoring is fundamentally different from a correct guess.
  </div>
</div>

<!--
Self-Regulated Learning adds a metacognitive layer to the model. It asks not only whether the student acted, but whether the student planned, monitored, and adjusted their own thinking.

A typical SRL cycle includes planning a strategy, enacting the task, and then monitoring or reflecting on performance. The learner may notice an error, adjust the strategy, and try again.

Two students can reach the same answer through very different processes. One may plan, check intermediate results, and notice errors. Another may guess, copy, or blindly try numbers until something works.

For predictive modeling, SRL theory says we need to estimate the learner’s regulatory state. We need to know not just what the student answered, but whether the student was actively monitoring their own learning.
-->

---
layout: two-cols
---

# Self-Regulated Learning — Modeling Gap

<div class="pr-4">
  <div class="text-sm font-semibold text-rose-300 mb-3">What raw text misses</div>

  <div class="flex flex-col gap-3 text-sm text-gray-300">
    <div class="flex gap-2">
      <span>🧭</span>
      <span><b>Planning signal</b> — did the student prepare a strategy?</span>
    </div>
    <div class="flex gap-2">
      <span>🔍</span>
      <span><b>Error awareness</b> — did the student notice their own mistake?</span>
    </div>
    <div class="flex gap-2">
      <span>🔁</span>
      <span><b>Regulation loop</b> — did monitoring lead to revision?</span>
    </div>
  </div>

  <div class="mt-5 rounded-lg border border-gray-500/30 bg-gray-500/5 p-3 text-xs text-gray-400">
    A sequence like <code>130 → 78 → 104</code> may look like trial-and-error, but it can also reveal absence of self-monitoring.
  </div>
</div>

::right::

<div>
  <div class="text-sm font-semibold text-green-300 mb-3">How this helps the model</div>

  <ul class="text-sm text-gray-300">
    <li>Gives the model a <b>metacognitive state estimate</b>.</li>
    <li>Helps detect guessing, parroting, or blind trial-and-error.</li>
    <li>Suggests when to prompt planning or reflection instead of giving the answer.</li>
  </ul>

  <div class="mt-5 rounded-lg border border-teal-500/30 bg-teal-500/5 p-3 text-sm text-gray-300">
    <b class="text-teal-300">Model benefit:</b> if a student changes answers without self-explanation, the model lowers confidence in mastery and may ask for reasoning or a plan.
  </div>
</div>

<!--
The gap is that transcripts often do not explicitly encode self-regulation. A sequence of answers may show trial and error, but it may not show whether the student realized an error or had a plan.

SRL features help the model infer this. We can estimate the proportion of turns spent planning, the probability of moving from enacting to realizing errors, and whether revisions are accompanied by explanation.

For example, if a student moves from 130 to 78 to 104 without self-correction or reasoning, the model should be cautious. This may indicate guessing or parroting rather than regulated problem solving.

The model can then lower confidence in mastery and prompt the student to explain, plan, or check their work, instead of assuming learning occurred just because an answer was eventually produced.
-->

---
layout: default
---

# Sociocultural / ZPD — Theory

<div class="max-w-5xl">
  <p class="text-lg text-gray-300">
    Vygotsky's Zone of Proximal Development describes the distance between what a learner can do alone and what they can achieve with guidance. Scaffolding is the temporary support that bridges this gap.
  </p>

  <div class="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
    <div class="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-5">
      <div class="text-2xl">🧍</div>
      <div class="mt-2 font-bold text-green-200">Independent</div>
      <div class="mt-1 text-xs text-gray-400">learner can succeed alone</div>
    </div>
    <div class="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-5">
      <div class="text-2xl">🤝</div>
      <div class="mt-2 font-bold text-orange-200">ZPD</div>
      <div class="mt-1 text-xs text-gray-400">learner can succeed with support</div>
    </div>
    <div class="rounded-xl border border-gray-500/30 bg-gray-500/10 px-4 py-5">
      <div class="text-2xl">🚧</div>
      <div class="mt-2 font-bold text-gray-200">Beyond Reach</div>
      <div class="mt-1 text-xs text-gray-400">task is currently too difficult</div>
    </div>
  </div>

  <div class="mt-8 flex flex-wrap justify-center gap-3 text-xs">
    <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-200">Depth 0: no support</span>
    <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-200">Depth 1: hint</span>
    <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-200">Depth 2: prompt</span>
    <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-200">Depth 3: guided step</span>
    <span class="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-200">Depth 4: full reveal</span>
  </div>

  <div class="mt-8 rounded-r-lg border-l-4 border-orange-500/60 bg-orange-500/5 px-4 py-3 text-sm text-gray-300">
    <b class="text-orange-300">Key idea:</b> the same correct answer carries different meaning depending on how much support was needed.
  </div>
</div>

<!--
Vygotsky’s Zone of Proximal Development emphasizes that learning is often social and supported. A learner may not be able to solve a problem independently, but may succeed with guidance from a teacher, peer, or system.

The ZPD is the space between what the learner can do alone and what they can achieve with support. Scaffolding is the temporary support that makes this possible.

Scaffolding can range from a small hint to a prompt, a guided step, or a full worked solution. The important point is that the same correct answer can mean different things depending on how much support was needed.

For modeling, this means success cannot be treated as a single binary event. We need to know the context of support in which that success occurred.
-->
---
layout: default
---

# Synthesis: Bridging Theory and Predictive Modeling
<div class="text-sm text-gray-400 -mt-2 mb-4">From Raw Dialogue to a Theory-Augmented Learner State</div>

<!-- Top: Problem vs Solution -->
<div class="grid grid-cols-2 gap-6 mb-6">
  <div class="relative p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20">
    <div class="absolute -top-3 left-4 bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-500/30">
      The Problem: Problem-Solver Bias
    </div>
    <p class="text-gray-300 text-sm mt-2">
      LLMs optimize for the <b>math answer</b>, ignoring the <b>cognitive state</b>. A simple "Correct" label cannot distinguish true mastery from blind parroting or guessing.
    </p>
  </div>

  <div class="relative p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
    <div class="absolute -top-3 left-4 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
      The Solution: Theory-Augmented State
    </div>
    <p class="text-gray-300 text-sm mt-2">
      Inject discrete, theory-driven features into the latent space. Constrain the model to track <i>how</i> the student learns, not just <i>what</i> they output.
    </p>
  </div>
</div>

<!-- Middle: The 4 Lenses -->
<div class="grid grid-cols-4 gap-3 text-center text-xs mb-6">
  <div class="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
    <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
      <div i-carbon-brain text-xl />
    </div>
    <b class="text-blue-200">Cognitivism</b>
    <span class="text-gray-400">Soar Impasses<br/>(Tie, Conflict)</span>
  </div>
  
  <div class="flex flex-col items-center gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
    <div class="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-300">
      <div i-carbon-warning-alt text-xl />
    </div>
    <b class="text-yellow-200">Disequilibrium</b>
    <span class="text-gray-400">Schema Break<br/>(Self vs Teacher)</span>
  </div>

  <div class="flex flex-col items-center gap-2 p-3 rounded-xl bg-purple-500/5 border border-purple-500/20">
    <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
      <div i-carbon-user-activity text-xl />
    </div>
    <b class="text-purple-200">Metacognition</b>
    <span class="text-gray-400">SRL States<br/>(Plan, Enact, Monitor)</span>
  </div>

  <div class="flex flex-col items-center gap-2 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
    <div class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
      <div i-carbon-group text-xl />
    </div>
    <b class="text-orange-200">Sociocultural</b>
    <span class="text-gray-400">ZPD Scaffold<br/>(Depth 0 to 4)</span>
  </div>
</div>

---

<div class="grid grid-cols-2 gap-4">
  
  <!-- Ex 1: Parroting -->
  <div class="rounded-2xl bg-cyan-500/5 border border-cyan-500/20 p-4 flex flex-col">
    <div class="flex items-center gap-2 mb-3">
      <div i-carbon-lightbulb text-cyan-400 text-lg />
      <b class="text-cyan-200 text-sm">Ex 1: Detecting "Parroting"</b>
    </div>
    <div class="flex-1 bg-slate-800/50 rounded-lg p-3 border border-slate-700 mb-3">
      <div class="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">Observable Signals</div>
      <div class="flex flex-wrap gap-1.5">
        <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px]">Impasse: Conflict</span>
        <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">SRL: 0% Realizing</span>
        <span class="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px]">Scaffold: Depth 4</span>
        <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[10px]">Diseq: Teacher-Resolved</span>
      </div>
      <div class="mt-2 text-[11px] text-gray-400">Teacher reveals "4x13=52". Student repeats it.</div>
    </div>
    <div class="bg-slate-800/50 rounded-lg p-3 border border-slate-700 text-center">
      <div class="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Model Inference</div>
      <div class="text-lg font-bold text-rose-400 mb-1">Zero Mastery</div>
      <div class="text-[11px] text-gray-400">Overrides "Correct" label. Predicts failure on next attempt.</div>
    </div>
  </div>

  <!-- Ex 2: False Positive -->
  <div class="rounded-2xl bg-orange-500/5 border border-orange-500/20 p-4 flex flex-col">
    <div class="flex items-center gap-2 mb-3">
      <div i-carbon-warning-alt text-orange-400 text-lg />
      <b class="text-orange-200 text-sm">Ex 2: The "False Positive" (5,000,390)</b>
    </div>
    <div class="flex-1 bg-slate-800/50 rounded-lg p-3 border border-slate-700 mb-3">
      <div class="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">Observable Signals</div>
      <div class="flex flex-wrap gap-1.5">
        <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">Soar: Tie → No-Change</span>
        <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">SRL: Realizes, Fails Plan</span>
        <span class="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px]">Scaffold: Depth 2</span>
        <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[10px]">Diseq: Self-Resolved (Wrong)</span>
      </div>
      <div class="mt-2 text-[11px] text-gray-400">Student says 22 yolks. Corrects to "5 double + 7 single = 22". Teacher says "Well done" (Math is wrong!).</div>
    </div>
    <div class="bg-slate-800/50 rounded-lg p-3 border border-slate-700 text-center">
      <div class="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Model Inference</div>
      <div class="text-lg font-bold text-emerald-400 mb-1">Low Mastery</div>
      <div class="text-[11px] text-gray-400">Detects contradiction (5×2+7=17). Overrides teacher's "Well done" label.</div>
    </div>
  </div>
</div>
---
layout: center
---

# A Theory-Grounded, Skill-Addressed Memory

<div class="max-w-3xl text-center">
  <p class="text-lg text-gray-300">
    Dialogue-based knowledge tracing needs more than a language-model context: it needs a persistent record of <b>what each skill has experienced</b>.
  </p>

  <div class="mt-8 flex flex-wrap justify-center gap-3 text-sm">
    <span class="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-200">Persistent memory</span>
    <span class="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-purple-200">Skill-addressed writes</span>
    <span class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-200">Theory-grounded annotations</span>
  </div>

  <div class="mt-10 text-sm text-gray-500">
    Core claim: the memory should store the <b>causal structure of learning</b>, not only correct/incorrect labels.
  </div>
</div>


---
layout: default
---

# Method: From Dialogue Turn to Skill Memory

<div class="max-w-6xl">
  <div class="grid grid-cols-5 gap-3 text-center text-sm">
    <div class="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-4">
      <div class="text-xl">💬</div>
      <div class="mt-2 font-bold text-blue-200">Dialogue Turn</div>
      <div class="mt-1 text-xs text-gray-400">teacher/student text + target KC</div>
    </div>
    <div class="rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-4">
      <div class="text-xl">🏷</div>
      <div class="mt-2 font-bold text-purple-200">Annotation</div>
      <div class="mt-1 text-xs text-gray-400">impasse, affect, difficulty, scaffold, error</div>
    </div>
    <div class="rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-4">
      <div class="text-xl">🧬</div>
      <div class="mt-2 font-bold text-yellow-200">Value Vector</div>
      <div class="mt-1 text-xs text-gray-400">LLM evidence + theory-grounded features</div>
    </div>
    <div class="rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-4">
      <div class="text-xl">📍</div>
      <div class="mt-2 font-bold text-teal-200">Skill Address</div>
      <div class="mt-1 text-xs text-gray-400">unique key for each knowledge component</div>
    </div>
    <div class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-4">
      <div class="text-xl">🧠</div>
      <div class="mt-2 font-bold text-emerald-200">Memory Update</div>
      <div class="mt-1 text-xs text-gray-400">delta write to the responsible skill</div>
    </div>
  </div>

  <div class="mt-8 grid grid-cols-2 gap-4 text-sm">
    <div class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <div class="font-bold text-blue-300">Read</div>
      <div class="mt-1 text-gray-300">
        For each target KC, query the memory with its skill address to obtain a mastery trace and an impasse/profile trace.
      </div>
    </div>
    <div class="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
      <div class="font-bold text-emerald-300">Write</div>
      <div class="mt-1 text-gray-300">
        Write the skill-specific evidence vector to that KC’s address instead of broadcasting the feedback across all skills.
      </div>
    </div>
  </div>

  <div class="mt-6 rounded-lg border border-gray-500/30 bg-gray-500/5 px-4 py-3 font-mono text-xs text-gray-300">
    Intuition: read(skill) = memory trace for that skill · write(skill, evidence) = replace old evidence with new evidence
  </div>
</div>

---
layout: center
---

# What the Memory Actually Stores

<div class="max-w-5xl text-left">
  <p class="text-lg text-gray-300">
    Each update encodes the <b>learning episode</b>, not just the final correctness label.
  </p>

  <div class="mt-8 flex flex-wrap items-stretch justify-center gap-3 text-center text-sm">
    <div class="w-40 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-4">
      <div class="text-xl">🤝</div>
      <div class="mt-2 font-bold text-blue-200">Support</div>
      <div class="mt-1 text-xs text-gray-400">scaffold depth</div>
    </div>
    <div class="w-40 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-4">
      <div class="text-xl">⚠️</div>
      <div class="mt-2 font-bold text-purple-200">Impasse</div>
      <div class="mt-1 text-xs text-gray-400">why the student is stuck</div>
    </div>
    <div class="w-40 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-4">
      <div class="text-xl">😟</div>
      <div class="mt-2 font-bold text-yellow-200">Affect</div>
      <div class="mt-1 text-xs text-gray-400">confusion, frustration, engagement</div>
    </div>
    <div class="w-40 rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-4">
      <div class="text-xl">🎚</div>
      <div class="mt-2 font-bold text-teal-200">Difficulty</div>
      <div class="mt-1 text-xs text-gray-400">item demand before support</div>
    </div>
    <div class="w-40 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-4">
      <div class="text-xl">✅</div>
      <div class="mt-2 font-bold text-emerald-200">Outcome</div>
      <div class="mt-1 text-xs text-gray-400">correctness + error type</div>
    </div>
  </div>

  <div class="mt-8 grid grid-cols-3 gap-4 text-sm">
    <div class="rounded-lg border border-gray-500/30 bg-gray-500/5 p-4">
      <b class="text-gray-200">From outcome to cause</b>
      <div class="mt-1 text-gray-400">The memory records why a failure happened, not only that it happened.</div>
    </div>
    <div class="rounded-lg border border-gray-500/30 bg-gray-500/5 p-4">
      <b class="text-gray-200">From blurred to routed</b>
      <div class="mt-1 text-gray-400">Evidence is attached to the responsible KC instead of being averaged over all skills.</div>
    </div>
    <div class="rounded-lg border border-gray-500/30 bg-gray-500/5 p-4">
      <b class="text-gray-200">From raw to meaningful</b>
      <div class="mt-1 text-gray-400">Theory-specified fields make the memory interpretable and pedagogically useful.</div>
    </div>
  </div>
</div>

---
layout: default
---

# Why This Works

<div class="max-w-4xl">
  <div class="flex flex-col gap-6">
    <div class="flex gap-4">
      <div class="h-9 w-9 shrink-0 rounded-full border border-blue-500/40 bg-blue-500/10 flex items-center justify-center font-bold text-blue-300">1</div>
      <div>
        <div class="font-semibold text-blue-200">Skill-specific credit assignment</div>
        <div class="text-sm text-gray-300">
          Multi-KC failures are not averaged across all skills. The write is routed to the implicated KC, so each skill keeps its own evidence trail.
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="h-9 w-9 shrink-0 rounded-full border border-purple-500/40 bg-purple-500/10 flex items-center justify-center font-bold text-purple-300">2</div>
      <div>
        <div class="font-semibold text-purple-200">Theory-grounded semantics</div>
        <div class="text-sm text-gray-300">
          Impasse, affect, scaffold depth, and difficulty tell the model whether a failure reflects a guess, misconception, missing prerequisite, or excessive support.
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="h-9 w-9 shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-300">3</div>
      <div>
        <div class="font-semibold text-emerald-200">Persistent student state</div>
        <div class="text-sm text-gray-300">
          The memory is not hidden inside one forward pass. It provides a readable, reusable record of student knowledge across turns and sessions.
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="h-9 w-9 shrink-0 rounded-full border border-yellow-500/40 bg-yellow-500/10 flex items-center justify-center font-bold text-yellow-300">4</div>
      <div>
        <div class="font-semibold text-yellow-200">Selective strengthening and weakening</div>
        <div class="text-sm text-gray-300">
          Practiced skills are refreshed, while unused traces weaken. This reduces overconfidence in skills that have not been recently demonstrated.
        </div>
      </div>
    </div>
  </div>
</div>

---
layout: two-cols
---

# What the Method Buys Us

<div class="pr-4">
  <div class="text-sm font-semibold text-blue-300 mb-3">Better student modeling</div>

  <ul class="text-sm text-gray-300 flex flex-col gap-3">
    <li>Persistent, per-skill mastery traces.</li>
    <li>Credit assigned to the responsible knowledge component.</li>
    <li>Scaffold- and difficulty-aware interpretation of success.</li>
    <li>Impasse dynamics retained, not collapsed into a single error label.</li>
  </ul>

  <div class="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-sm text-gray-300">
    The model does not only ask: <i>Was the answer correct?</i><br />
    It asks: <b>Which skill was involved, why did the student struggle, and what support changed the outcome?</b>
  </div>
</div>

::right::

<div>
  <div class="text-sm font-semibold text-emerald-300 mb-3">Why it is not just feature engineering</div>

  <ul class="text-sm text-gray-300 flex flex-col gap-3">
    <li>The memory has theory-specified content, not arbitrary added features.</li>
    <li>An impasse-prediction head can test whether the memory captures why students get stuck.</li>
    <li>Mastery traces can be inspected per skill for interpretability.</li>
    <li>Shuffled-label controls can separate temporal signal from extra capacity.</li>
  </ul>

  <div class="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-gray-300">
    The contribution is representational: the memory stores the <b>causal chain of learning</b>, not just a sequence of outcomes.
  </div>
</div>


---
layout: center
---

# Theoretical Grounding of the Memory

<div class="max-w-3xl text-center">
  <p class="text-lg text-gray-300">
    The persistent memory is not an arbitrary feature store. It is a <b>computational model of learning</b> derived directly from four established theories in the learning sciences.
  </p>
  
  <div class="mt-8 flex flex-wrap justify-center gap-3 text-sm">
    <span class="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-200">Cognitive Disequilibrium</span>
    <span class="rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-rose-200">Productive Failure</span>
    <span class="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-yellow-200">Desirable Difficulties</span>
    <span class="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-green-200">Assistance Dilemma</span>
  </div>
</div>
---

<img src="/1792884323.png"/>

