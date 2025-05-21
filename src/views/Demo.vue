<template>
  <div class="contanier mx-auto p-4 flex flex-col items-center gap-4">
    <img
      src="https://www.bazsolicitudunica.com.mx/assets/logos/logo.svg"
      class="w-60 mb-4"
    />
    <Card title="Incode">
      <div class="flex gap-4">
        <Button color="green"> Iniciar flujo escritorio </Button>
        <Button color="green"> Iniciar flujo Móvil </Button>
      </div>
    </Card>
    <Card title="Microblink">
      <div class="flex gap-4">
        <Button color="green"> Iniciar flujo escritorio </Button>
        <Button color="green"> Iniciar flujo Móvil </Button>
      </div>
    </Card>
    <div class="flex gap-4 mt-4">
      <Button
        color="default"
        @click="$router.push('/qr/1')"
      >
        Mostar QR
      </Button>
      <Button
        color="default"
        @click="$router.push('/microblink')"
      >
        Microblink Scanner
      </Button>
      <Button
        color="default"
        @click="$router.push('/incode-scanner')"
      >
        Incode Scanner
      </Button>
      <Button
        color="default"
        @click="$router.push('/incode-document')"
      >
        Incode Document
      </Button>
    </div>
    <div>Demo inactividad: {{ countdown }}</div>
    <InactivityModal
      ref="modal"
      @cancel="cancelRedirect"
      :countdown="warningCountdown"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Card from '@/ui/cards/Card.vue'
import Button from '@/ui/buttons/Button.vue'
import InactivityModal from '@/ui/modals/InactivityModal.vue'
import { useInactivityWatcher } from '@/composables/useInactivityWatcher.js'

const modal = ref()
const { showWarning, countdown, warningCountdown, cancelRedirect } = useInactivityWatcher()

watch(showWarning, (isShowWarning) => {
  if (isShowWarning) modal.value.showModal()
})
</script>
