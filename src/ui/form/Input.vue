<template>
  <fwb-input
    :label
    placeholder="enter your name"
    :size
    v-model="model"
  />
</template>

<script setup>
import { FwbInput } from 'flowbite-vue'

defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md'
  }
})

const model = defineModel()
</script>
