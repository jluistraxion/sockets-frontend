<template>
  <SpinnerFullScreen v-if="isLoading" />
  <div v-else>
    <Error
      v-if="isError"
      :error="errorMsg"
    />
    <div v-else>
      <QR
        v-if="config.tipoflujo === 'escritorio'"
        :config="config?.configuraciones[0].valores"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SpinnerFullScreen from '@/ui/spinner/SpinnerFullScreen.vue'
import QR from './QR.vue'
import Error from './Error.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const isError = ref(false)
const errorMsg = ref(null)
const config = ref({})

const setError = (message, parseMessage = null) => {
  isError.value = true
  errorMsg.value = message
  if (parseMessage) {
    const looksLikeJson = parseMessage.startsWith('{') && parseMessage.endsWith('}')
    if (looksLikeJson) {
      const parseError = JSON.parse(parseMessage)
      errorMsg.value = parseError.message
    }
  }
}

const setConfig = (data) => {
  if (data.tipoflujo === 'escritorio') config.value = data
  if (data.tipoflujo === 'movil' && data.motorutilizado === '1') {
    router.push({ name: 'incode-scanner', params: { id: route.params.id } })
  }
  if (data.tipoflujo === 'movil' && data.motorutilizado === '2') {
    router.push({ name: 'microblink', params: { id: route.params.id } })
  }
  if (data.tipoflujo === 'movil' && data.motorutilizado === '3') {
    router.push({ name: 'incode-document', params: { id: route.params.id } })
  }
}

const fetchData = async () => {
  isLoading.value = true
  try {
    const payload = { idoperacion: route.params.id }
    const response = await api.post(`${API_URL}/getconfig`, payload)
    if (response.success) {
      setConfig(response.data)
    } else {
      setError(response.message)
    }
  } catch ({ message }) {
    setError('El recurso solicitado no está disponible en este momento.', message)
  } finally {
    isLoading.value = false
  }
}

watch(() => route.params.id, fetchData, { immediate: true })
</script>
