<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import katex from 'katex'

const props = defineProps<{
  formula: string
  displayMode?: boolean // false for inline ($), true for display mode ($$)
}>()

const container = ref<HTMLElement>()

const renderFormula = () => {
  if (!container.value) return
  
  try {
    katex.render(props.formula, container.value, {
      displayMode: props.displayMode || false,
      throwOnError: false, // Prevents crashes, shows error in text
      output: 'html'       // Ensures HTML output
    })
  } catch (error) {
    console.error('KaTeX rendering error:', error)
    container.value.textContent = `Error: ${props.formula}`
  }
}

// Render on mount and whenever formula changes
onMounted(renderFormula)
watch(() => props.formula, renderFormula)
</script>

<template>
  <span ref="container"></span>
</template>
