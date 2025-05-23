import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useIncode() {
  const API_URL = import.meta.env.VITE_API_URL
  const session = ref(null)
  const incodeSession = ref({})
  const config = ref({})
  let incode = null
  const route = useRoute()
  const router = useRouter()

  const createOnboarding = () => {
    incode = window.OnBoarding.create({
      apiURL: config.value?.apiURL,
      apiKey: config.value?.apiKey,
      encrypt: config.value?.crypto,
      lang: 'es'
    })
  }

  const getToken = async () => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    const body = JSON.stringify({
      idoperacion: route.params.id,
      error: false
    })

    const res = await fetch(`${API_URL}/getmotorselect`, {
      method: 'POST',
      headers,
      body
    })

    const data = await res.json()
    if (data.success) {
      session.value = data.token
      incodeSession.value = data
    } else {
      router.push({ name: data.data.redirect, params: { id: route.params.id } })
    }
  }

  const publishKeys = async () => {
    await incode.publishKeys(session.value)
  }

  const saveDeviceData = () => {
    incode.sendGeolocation({ token: session.value }).catch(console.error)
    incode.sendFingerprint({ token: session.value }).catch(console.error)
  }

  const captureIdFront = (container, onSuccess) => {
    incode.renderCamera('front', container, {
      token: incodeSession.value,
      numberOfTries: config.value?.reintentos,
      showTutorial: true,
      onSuccess,
      onError: console.error
    })
  }

  const captureIdBack = (container, onSuccess) => {
    incode.renderCamera('back', container, {
      token: incodeSession.value,
      numberOfTries: config.value?.reintentos,
      showTutorial: true,
      onSuccess,
      onError: console.error
    })
  }

  const captureSelfie = (container, onSuccess) => {
    incode.renderCamera('selfie', container, {
      token: session.value,
      numberOfTries: config.value?.reintentos,
      onSuccess,
      onError: console.error
    })
  }

  const processId = async () => {
    try {
      await incode.processId({ token: session.value })
    } catch (error) {
      console.error(error)
    }
  }

  const finishOnboarding = async () => {
    try {
      const result = await incode.getFinishStatus(null, {
        token: session.value
      })
      console.log('Finish status:', result)
    } catch (error) {
      console.error(error)
    }
  }

  const start = async (container) => {
    createOnboarding()
    await getToken()
    // await publishKeys()
    saveDeviceData()

    captureIdFront(container, () => {
      captureIdBack(container, async () => {
        await processId()
        // captureSelfie(container, finishOnboarding) // opcional
        finishOnboarding()
      })
    })
  }

  const setConfig = (data, container) => {
    config.value = data
    start(container)
    /* PENDIENTE MEJORAR
    setTimeout(() => {
      console.log('timeout para desconectar al usuario')
    }, data.timeout * 1000) // timeout definido en segundos
    */
  }

  return {
    setConfig
  }
}
