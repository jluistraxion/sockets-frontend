<template>
  <fwb-modal
    v-if="isShowModal"
    @close="close"
    :size="size"
    persistent
  >
    <template #body>
      <div class="-mb-3">
        <slot />
      </div>
    </template>
  </fwb-modal>
</template>

<script setup>
import { ref } from 'vue'
import { FwbModal } from 'flowbite-vue'

const isShowModal = ref(false)

const close = () => (isShowModal.value = false)
const show = () => (isShowModal.value = true)

defineExpose({ show, close })

defineProps({
  size: {
    type: String,
    default: '2xl'
  }
})
</script>
