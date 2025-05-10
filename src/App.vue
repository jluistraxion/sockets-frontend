<template>
  <div>
    <RouterView :key="route.path" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
