<template>
  <div
    class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col gap-4"
  >
    <div class="text-2xl font-bold">{{ title }}</div>
    <slot />
  </div>
</template>

<script setup>
defineProps(['title'])
</script>
