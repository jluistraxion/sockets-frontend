<template>
  <SpinnerFullScreen v-if="isLoading" />
  <Error
    v-if="isError"
    :error="errorMsg"
  />
  <blinkid-in-browser ref="blinkid"></blinkid-in-browser>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/api'
import SpinnerFullScreen from '@/ui/spinner/SpinnerFullScreen.vue'
import Error from '@/views/Error.vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const blinkid = ref(null)
const isLoading = ref(true)
const isError = ref(false)
const errorMsg = ref(null)
const config = ref({})

const run = () => {
  if (blinkid.value) {
    const blinkId = blinkid.value
    blinkId.licenseKey = config.value.licenseKey
    blinkId.recognizers = ['BlinkIdMultiSideRecognizer']
    blinkId.engineLocation = '/blinkid/resources'
    blinkId.workerLocation = '/blinkid/resources/BlinkIDWasmSDK.worker.min.js'

    blinkId.recognizerOptions = {
      BlinkIdMultiSideRecognizer: {
        returnFullDocumentImage: config.value.returnFullDocumentImage,
        returnFaceImage: config.value.returnFaceImage,
        signatureImage: config.value.signatureImage
      }
    }

    blinkId.addEventListener('fatalError', (ev) => console.log('fatalError', ev.detail))

    blinkId.addEventListener('ready', (ev) => {
      console.log('ready', ev.detail)
      blinkId.startCameraScan()
    })

    blinkId.addEventListener('scanError', (ev) => console.log('scanError', ev.detail))

    blinkId.addEventListener('scanSuccess', (ev) => console.log('scanSuccess', ev.detail))

    blinkId.addEventListener('feedback', (ev) => console.log('feedback', ev))
  }
}

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
      config.value = response.data
      run()
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
