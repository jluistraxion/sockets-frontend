<template>
  <fwb-input
    :label
    :placeholder
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
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const model = defineModel()
</script>
