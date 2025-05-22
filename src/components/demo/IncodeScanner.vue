<template>
  <div
    ref="container"
    id="incode-container"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const session = ref(null)
const incodeSession = ref({})
const config = ref({})
let incode = null
const container = ref()

const createOnboarding = () => {
  incode = window.OnBoarding.create({
    apiURL: 'https://demo-api.incodesmile.com/0',
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
  session.value = data.token
  incodeSession.value = data
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

const processId = async () => {
  try {
    await incode.processId({ token: session.value })
  } catch (error) {
    console.error(error)
  }
}

const getOcrData = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'api-version': '1.0',
      'x-api-key': 'a02644685ee3394d70154fcfa5b2237180e4f6aa',
      'X-Incode-Hardware-Id':
        'eyJhbGciOiJIUzI1NiJ9.eyJleHRlcm5hbFVzZXJJZCI6IjY4MmU1MTc577ZDQ0YzFiMDczYzAzZWYxYSIsInJvbGUiOiJBQ0NFU1MiLCJUIjoiSSIsImtleVJlZiI6IjYxNGQyYTk2YmEzNWY4MDAxMzhhNzFhYSIsImV4cCI6MTc1NTgxNDc3NywiaWF0IjoxNzQ3ODY1OTc3fQ.4oKqsjqwTJq_rR3VJzIn_CbnhTJrrCzTSx2I0exZFRk57'
    }
  }
  // documentation: https://developer.incode.com/reference/getocrdata
  fetch('https://demo-api.incodesmile.com/omni/get/ocr-data', options)
    .then((res) => res.json())
    .then((res) => console.log('ocr data', res))
    .catch((err) => console.error(err))
}

const finishOnboarding = async () => {
  try {
    const result = await incode.getFinishStatus(null, {
      token: session.value
    })
    console.log('Finish status:', result)
    getOcrData()
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

watch(container, (newContainer) => {
  if (newContainer) start(newContainer)
})
</script>
