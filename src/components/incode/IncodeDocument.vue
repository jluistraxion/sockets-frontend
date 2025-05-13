<template>
  <div
    ref="container"
    style="width: 100%; height: 400px"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIncodeDocumentFlow } from '@/composables/useIncodeDocumentFlow'

const container = ref(null)
const { start } = useIncodeDocumentFlow()

onMounted(() => {
  start(container.value)
})
</script>
