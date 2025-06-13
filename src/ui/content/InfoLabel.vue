<template>
  <div class="text-sm">
    <span class="">{{ label }}</span>
    <div
      v-if="loading"
      class="animate-pulse h-2.5 w-48 bg-gray-200 rounded-full mt-1"
    />
    <div
      v-else
      class="text-slate-500"
    >
      {{ value ?? '--' }}
    </div>
  </div>
</template>

<script setup>
defineProps(['label', 'value', 'loading'])
</script>
