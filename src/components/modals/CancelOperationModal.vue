<template>
  <SimpleModal
    ref="modal"
    size="lg"
  >
    <div>
      <div class="flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="65"
          height="65"
          fill="currentColor"
          class="bi bi-exclamation-triangle-fill text-red-600"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
          />
        </svg>
        <div class="text-base mt-2">¿Deseas cancelar esta operación?</div>
        <div class="text-sm text-slate-600 mt-2">Se perderá el progreso actual.</div>
      </div>
      <div class="mt-6 flex gap-2 justify-center">
        <Button
          color="light"
          @click="$emit('cancel')"
        >
          No, quiero continuar
        </Button>
        <Button
          color="red"
          @click="onAcept"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Si, estoy seguro
        </Button>
      </div>
    </div>
  </SimpleModal>
</template>

<script setup>
import { ref } from 'vue'
import SimpleModal from '@/ui/modals/SimpleModal.vue'
import Button from '@/ui/buttons/Button.vue'

const modal = ref()
const isLoading = ref(false)

const emit = defineEmits(['cancel', 'acept'])

const onAcept = () => {
  isLoading.value = true
  setTimeout(() => (isLoading.value = false), 5000)
  emit('acept')
}

const show = () => modal.value.show()
const hide = () => modal.value.hide()

defineExpose({ show, hide })
</script>
