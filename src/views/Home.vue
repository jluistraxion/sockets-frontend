<template>
  <Container
    :isLoading
    :errorMsg
  >
    <QR
      v-if="config.tipoflujo === 'escritorio'"
      :config="config?.configuraciones"
    />
  </Container>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { parseErrorMessage } from '@/utils/parseData.js'
import { useWebSockets } from '@/composables/useWebSockets'
import Container from '@/components/layout/Container.vue'
import QR from '@/components/qrs/QR.vue'
import api from '@/api/api'

let intervalId = null
const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const router = useRouter()
const errorMsg = ref(null)
const config = ref({})

const { createSession, captureFinished, close } = useWebSockets()

createSession()

watch(captureFinished, (isCaptureFinished) => {
  if (isCaptureFinished) {
    close()
    window.location.href = config.value.urlredirect + route.params.id
  }
})

const setConfig = (data) => {
  if (data.tipoflujo === 'escritorio') config.value = data
  if (data.tipoflujo === 'movil' && data.motorutilizado === '1') {
    router.push({ name: 'incode-scanner', params: { id: route.params.id } })
  }
  if (data.tipoflujo === 'movil' && data.motorutilizado === '2') {
    router.push({ name: 'microblink', params: { id: route.params.id } })
  }
}

const { mutate: fetchData, isPending: isLoading } = useMutation({
  mutationFn: () => api.post(`${API_URL}/getconfig`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.success) {
      setConfig(response.data)
      intervalId = setInterval(() => getStatus(), 2000)
    } else {
      errorMsg.value = response.message
    }
  },
  onError: (error) => {
    errorMsg.value = parseErrorMessage(error.message)
  }
})

fetchData()

const { mutate: getStatus } = useMutation({
  mutationFn: () => api.post(`${API_URL}/getstatus`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.estatusgeneral === '3') {
      window.location.href = config.value.urlredirect + route.params.id
    }
  }
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>
