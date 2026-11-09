<template>
  <h1 flex="~ col">
    <div text-2xl origin-top-left transition duration-500 :class="clicks <= 1 ? 'scale-150' : 'op50'">
      <span v-click>
        From Limitations to Solutions</span>
    </div>
    <div mt1 forward:delay-300 v-click text-5xl>
      A Systematic Review of
      Large Language Models in Knowledge Tracing
    </div>
  </h1>

  <div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-left v-click="1">
    <div text-sm opacity-75 mt--4>
      <Date /> — Soheil Salimi
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNav } from '@slidev/client';


const { clicks } = useNav()
</script>
