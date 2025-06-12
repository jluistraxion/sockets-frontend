<template>
  <Container
    :isLoading
    :errorMsg
  >
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <!-- Pantalla inicial -->
      <div
        v-show="screenState === 'initial'"
        class="text-center space-y-4"
      >
        <p
          class="text-lg text-gray-700"
          ref="initialMessageEl"
        >
          Cargando...
        </p>
      </div>

      <div
        v-show="flipMessage"
        class="w-1/3 text-3xl font-bold mb-5 text-center"
      >
        ¡Gira al reverso!
      </div>
      <!-- Pantalla de escaneo -->
      <div
        v-show="screenState === 'scanning'"
        class="relative w-[100vh] aspect-video"
      >
        <video
          ref="cameraFeed"
          class="absolute inset-0 w-full h-full object-cover"
          autoplay
          muted
        />
        <canvas
          ref="cameraFeedback"
          class="absolute inset-0 w-full h-full pointer-events-none"
        />
        <div
          ref="scanFeedback"
          class="absolute bottom-2 left-0 right-0 text-center text-white text-lg font-semibold drop-shadow"
        >
          ...
        </div>
      </div>
    </div>
    <InactivityModal
      ref="modal"
      @cancel="cancelRedirect"
      :countdown="warningCountdown"
    />
  </Container>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { useInactivityWatcher } from '@/composables/useInactivityWatcher'
import { parseErrorMessage } from '@/utils/parseData'
import useBlinkIdScanner from '@/composables/useBlinkIdScanner'
import InactivityModal from '@/components/modals/InactivityModal.vue'
import Container from '@/components/layout/Container.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const router = useRouter()

const initialMessageEl = ref(null)
const cameraFeed = ref(null)
const cameraFeedback = ref(null)
const scanFeedback = ref(null)
const screenState = ref('initial') // 'initial', 'start', 'scanning'
const errorMsg = ref(null)
const modal = ref()

const {
  showWarning,
  warningCountdown,
  cancelRedirect,
  setConfig: setConfigInactivity
} = useInactivityWatcher()
const { setConfig, flipMessage } = useBlinkIdScanner({
  initialMessageEl,
  cameraFeed,
  cameraFeedback,
  scanFeedback,
  onStateChange: (newState) => (screenState.value = newState),
  errorMsg
})

watch(showWarning, (isShowWarning) => {
  if (isShowWarning) modal.value.showModal()
})

const { mutate: fetchData, isPending: isLoading } = useMutation({
  mutationFn: () => api.post(`${API_URL}/getmotorconfig`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.success) {
      setConfig(response.data)
      const timeout = Number(response.data.timeout) || 180
      const timedown = Number(response.data.timedown) || 10
      setConfigInactivity(timeout, timedown)
    } else {
      errorMsg.value = response.message
    }
  },
  onError: (error) => {
    errorMsg.value = parseErrorMessage(error.message)
  }
})

fetchData()
</script>
