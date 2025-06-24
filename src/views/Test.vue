<template>
  <div
    ref="container"
    id="incode-container"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScriptTag } from '@vueuse/core'
import { useIndicadores } from '@/composables/useIndicadores'
import { useRoute, useRouter } from 'vue-router'

let incode = null
const route = useRoute()
const router = useRouter()
const session = ref(null)
const container = ref()
const { getIndicadores } = useIndicadores()

const loadIncodeScript = () => {
  return new Promise((resolve, reject) => {
    useScriptTag(
      '/incode/onBoarding-1.80.0.js',
      () => {
        if (window.OnBoarding && window.OnBoarding.create) {
          resolve(window.OnBoarding)
        } else {
          reject(new Error('Incode SDK cargado, pero window.OnBoarding no está disponible.'))
        }
      },
      { async: true, defer: true, manual: true }
    ).load()
  })
}

const createOnboarding = () => {
  incode = window.OnBoarding.create({
    // apiURL: 'https://demo-api.incodesmile.com/0',
    apiURL: ' https://demo-e2ee-api.incodesmile.com/0', // crypto
    apiKey: 'a02644685ee3394d70154fcfa5b2237180e4f6aa',
    encrypt: true,
    lang: 'es'
  })
}

const getToken = async () => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'api-version': '1.0',
    'x-api-key': 'a02644685ee3394d70154fcfa5b2237180e4f6aa'
  })

  const res = await fetch('https://demo-api.incodesmile.com/omni/start', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      countryCode: 'ALL',
      configurationId: '67cf42bc1c5dc4846eb8e147'
    })
  })

  const data = await res.json()
  session.value = data
}

const captureIdFront = (container, onSuccess) => {
  incode.renderCamera('front', container, {
    token: session.value,
    numberOfTries: 3,
    showTutorial: true,
    onSuccess,
    onError: console.error
  })
}

const captureIdBack = (container, onSuccess) => {
  incode.renderCamera('back', container, {
    token: session.value,
    numberOfTries: 3,
    showTutorial: true,
    onSuccess,
    onError: console.error
  })
}

const captureId = (container) => {
  incode.renderCaptureId(container, {
    session: session.value,
    forceIdV2: true,
    onSuccess: async () => {
      await processId()
      finishOnboarding()
    },
    onError: () => {
      console.warn('Las imagenes capturadas no corresponde a un INE valido')
    }
  })
}

const processId = async () => {
  try {
    await incode.processId({ token: session.value.token })
  } catch (error) {
    console.error(error)
  }
}

const finishOnboarding = async () => {
  try {
    const result = await incode.getFinishStatus(null, { token: session.value.token })
    console.log('Finish status:', result)
    getIndicadores({
      success: true,
      message: 'Captura completa',
      code: 'ocrComplete',
      idoperacion: route.params.id
    })
  } catch (error) {
    console.error(error)
  }
}

const saveDeviceData = () => {
  incode.sendGeolocation({ token: session.value.token }).catch(console.error)
  incode.sendFingerprint({ token: session.value.token }).catch(console.error)
}

const start = async (container) => {
  await loadIncodeScript()
  createOnboarding()
  await getToken()
  await incode.publishKeys(session.value.token) // encrypt
  saveDeviceData()
  captureId(container)
  /*
  captureIdFront(container, () => {
    captureIdBack(container, async () => {
      await processId()
      // captureSelfie(container, finishOnboarding) // opcional
      finishOnboarding()
    })
  })
    */
}

watch(container, (newContainer) => {
  if (newContainer) start(newContainer)
})
</script>
