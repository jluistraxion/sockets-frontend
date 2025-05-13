<template>
  <SpinnerFullScreen v-if="isLoading" />
  <div v-else>
    <Error
      v-if="isError"
      :error="errorMsg"
    />
    <QR
      v-if="!isError"
      :config="config"
    />
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
      config.value = response.data.configuraciones[0].valores
    } else {
      isError.value = true
      errorMsg.value = response.message
    }
  } catch (error) {
    const message = 'Error al recuperar los datos, intente más tarde por favor.'
    const parseError = JSON.parse(error.message)
    isError.value = true
    errorMsg.value = parseError ? parseError.message : message
  } finally {
    isLoading.value = false
  }
}

watch(() => route.params.id, fetchData, { immediate: true })
</script>
