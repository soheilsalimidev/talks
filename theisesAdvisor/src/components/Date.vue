<script setup>
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
</script>

<template>
  {{ formatDate(new Date()) }}</template>
