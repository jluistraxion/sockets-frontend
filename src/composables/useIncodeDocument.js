import { ref } from 'vue'

export function useIncodeDocument() {
  const session = ref(null)
  let incode = null
  const API_KEY = import.meta.env.VITE_INCODE_KEY

  const createOnboarding = () => {
    incode = window.OnBoarding.create({
      apiURL: 'https://demo-api.incodesmile.com/0',
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

  const captureDocument = (container, onSuccess) => {
    incode.renderCamera('document', container, {
      token: session,
      numberOfTries: 3,
      showTutorial: true,
      nativeCamera: true,
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
    // saveDeviceData()
    captureDocument(container, async () => {
      await processId()
      await finishOnboarding()
    })
  }

  return {
    start
  }
}
