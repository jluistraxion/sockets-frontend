import { ref } from 'vue'

export function useIncodeOnboarding() {
  const session = ref(null)
  const incodeSession = ref({})
  const config = ref({})
  let incode = null

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
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-version': '1.0',
      'x-api-key': config.value?.apiKey
    })

    const res = await fetch(config.value?.tokenURL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        countryCode: 'ALL',
        configurationId: config.value?.configurationId
      })
    })

    const data = await res.json()
    session.value = data.token
    incodeSession.value = data
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
    setTimeout(() => {
      console.log('timeout para desconectar al usuario')
    }, data.timeout * 1000) // timeout definido en segundos
  }

  return {
    setConfig
  }
}
