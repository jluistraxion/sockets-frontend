import { ref } from 'vue'

export function useIncodeOnboarding() {
  const session = ref(null)
  let incode = null
  const API_KEY = import.meta.env.VITE_INCODE_KEY

  const createOnboarding = () => {
    incode = window.OnBoarding.create({
      apiURL: 'https://demo-e2ee-api.incodesmile.com/0',
      apiKey: API_KEY,
      encrypt: true
    })
  }

  const getToken = async () => {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-version': '1.0',
      'x-api-key': API_KEY
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
    session.value = data.token
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
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      onSuccess,
      onError: console.error
    })
  }

  const captureIdBack = (container, onSuccess) => {
    incode.renderCamera('back', container, {
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      onSuccess,
      onError: console.error
    })
  }

  const captureSelfie = (container, onSuccess) => {
    incode.renderCamera('selfie', container, {
      token: session,
      numberOfTries: 3,
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
    await publishKeys()
    saveDeviceData()

    captureIdFront(container, () => {
      captureIdBack(container, async () => {
        await processId()
        // captureSelfie(container, finishOnboarding) // opcional
        finishOnboarding()
      })
    })
  }

  return {
    start
  }
}
