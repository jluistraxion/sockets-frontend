<template>
  <div class="flex items-center gap-1.5">
    <span class="text-slate-500 text-sm">{{ label }}</span>
    <div class="text-sm">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps(['label', 'value'])
</script>
