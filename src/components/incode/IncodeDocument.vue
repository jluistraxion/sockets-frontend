<template>
  <div
    ref="container"
    style="width: 100%; height: 400px"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIncodeDocument } from '@/composables/useIncodeDocument'

const container = ref(null)
const { start } = useIncodeDocument()

onMounted(() => {
  start(container.value)
})
</script>
