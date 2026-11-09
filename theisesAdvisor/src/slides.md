---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
title: Peripherals around LLM KT Models
remoteAssets: false
fonts:
  sans: Inter
  serif: Robot Slab
  mono: Fira Code
  local: [ Inter, 'Robot Slab', 'Fira Code' ]
layout: intro
---

<h1 flex="~ col">
  <div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
    <span v-click>
      Weekly Research Progress
    </span>
  </div>
  <div mt1 forward:delay-300 v-click>
    Peripherals around LLM KT Models
  </div>
</h1>

<div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-left v-click="1">
  <div text-sm opacity-75 mt--4>
    <Date /> — Soheil Salimi 
    <br/>
    Ideas & experiments explored last week around KT models
  </div>
</div>

---
src: ./pages/2-peripheral.md
---

---
src: ./../../reuse/thanks.md
---
