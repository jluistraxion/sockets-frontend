<template>
  <fwb-alert :type>
    <slot />
  </fwb-alert>
</template>

<script setup>
import { FwbAlert } from 'flowbite-vue'

defineProps({
  type: {
    type: String,
    default: 'info'
  }
})
</script>
