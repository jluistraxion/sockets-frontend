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
import { useRoute } from 'vue-router'
import SpinnerFullScreen from '@/ui/spinner/SpinnerFullScreen.vue'
import QR from './QR.vue'
import Error from './Error.vue'

import api from '@/api/api'

const route = useRoute()
const isLoading = ref(true)
const isError = ref(false)
const errorMsg = ref(null)
const config = ref({})

const fetchData = async () => {
  isLoading.value = true
  try {
    const payload = { idoperacion: route.params.id }
    const response = await api.post(
      'https://920d-208-127-233-141.ngrok-free.app/api/getconfig',
      payload
    )
    console.log('response', response)
    if (response.success) {
      config.value = response.data
    } else {
      isError.value = true
      errorMsg.value = response.message
    }
  } catch (error) {
    errorMsg.value = 'El recurso solicitado no está disponible en este momento.'
    const looksLikeJson =
      error.message.startsWith('{') && error.message.endsWith('}')
    if (looksLikeJson) {
      const parseError = JSON.parse(error.message)
      errorMsg.value = parseError.message
    }
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

watch(() => route.params.id, fetchData, { immediate: true })
</script>
