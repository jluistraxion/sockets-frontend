<template>
  <div
    ref="container"
    id="incode-container"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIncodeOnboarding } from '@/composables/useIncodeOnboarding'

const container = ref(null)
const { start } = useIncodeOnboarding()

onMounted(() => {
  start(container.value)
})
</script>
