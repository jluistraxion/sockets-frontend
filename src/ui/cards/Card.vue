<template>
  <fwb-card href="#">
    <div class="p-5">
      <h5
        v-if="title"
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ title }}
      </h5>
      <template v-if="slots.header">
        <slot name="header" />
      </template>
      <slot />
    </div>
  </fwb-card>
</template>

<script setup>
import { useSlots } from 'vue'
import { FwbCard } from 'flowbite-vue'

defineProps(['title'])

const slots = useSlots()
</script>
