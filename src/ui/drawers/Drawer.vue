<template>
  <div
    id="drawer-js-example"
    class="fixed z-40 h-screen w-80 overflow-y-auto bg-white p-4 dark:bg-gray-800"
    tabindex="-1"
    aria-labelledby="drawer-js-label"
    ref="drawer"
  >
    <h5
      id="drawer-js-label"
      class="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Info
    </h5>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Drawer } from 'flowbite'

const drawer = ref()

new Drawer(drawer.value)
</script>
