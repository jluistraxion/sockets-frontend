<template>
  <fwb-modal
    v-if="isShowModal"
    @close="closeModal"
    size="xs"
    persistent
  >
    <template #body>
      <div class="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          fill="currentColor"
          class="bi bi-stopwatch fill-slate-600/50"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
          <path
            d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"
          />
        </svg>
        <div class="text-lg my-4">¿Todavía estás ahí?</div>
        <div class="text-sm text-gray-600 text-center px-4 md:px-2">
          Por seguridad, serás redirigido en {{ countdown }} segundos si no respondes.
        </div>
        <Button
          color="green"
          class="mt-4"
          @click="onCancel"
        >
          Si, aqui estoy
        </Button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup>
import { ref } from 'vue'
import { FwbModal } from 'flowbite-vue'
import Button from '@/ui/buttons/Button.vue'

defineProps(['countdown'])
const emit = defineEmits(['cancel'])

const isShowModal = ref(false)

function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}

defineExpose({ closeModal, showModal })

const onCancel = () => {
  emit('cancel')
  closeModal()
}
</script>
