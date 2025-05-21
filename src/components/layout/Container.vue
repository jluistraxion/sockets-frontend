<template>
  <SpinnerFullScreen v-if="isLoading" />
  <Error
    v-if="errorMsg"
    :error="errorMsg"
  />
  <slot v-if="!isLoading && !errorMsg" />
</template>

<script setup>
import SpinnerFullScreen from '@/ui/spinner/SpinnerFullScreen.vue'
import Error from '@/views/Error.vue'

defineProps(['isLoading', 'errorMsg'])
</script>
