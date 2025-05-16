<template>
  <SpinnerFullScreen v-if="isLoading" />
  <Error
    v-if="isError"
    :error="errorMsg"
  />
  <div
    ref="container"
    id="incode-container"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIncodeOnboarding } from '@/composables/useIncodeOnboarding'
import api from '@/api/api'
import SpinnerFullScreen from '@/ui/spinner/SpinnerFullScreen.vue'
import Error from '@/views/Error.vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const { setConfig, start } = useIncodeOnboarding()
const container = ref(null)
const isLoading = ref(true)
const isError = ref(false)
const errorMsg = ref(null)

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

const fetchData = async () => {
  isLoading.value = true
  try {
    const payload = { idoperacion: route.params.id }
    const response = await api.post(`${API_URL}/getmotorconfig`, payload)
    if (response.success) {
      setConfig(response.data, container.value)
    } else {
      setError(response.message)
    }
  } catch ({ message }) {
    setError('El recurso solicitado no está disponible en este momento.', message)
  } finally {
    isLoading.value = false
  }
}

fetchData()
</script>
