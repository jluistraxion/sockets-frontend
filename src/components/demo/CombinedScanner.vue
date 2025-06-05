<template>
  <div
    ref="container"
    id="incode-container"
  />
  <blinkid-in-browser ref="blinkid"></blinkid-in-browser>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useScriptTag } from '@vueuse/core'
import { parseaOcr } from '@/utils/blinkid.js'
import translations from '@/components/blinkid/translations.js'

const session = ref(null)
const incodeSession = ref({})
let incode = null
const container = ref()
const blinkid = ref(null)

const loadIncodeScript = () => {
  return new Promise((resolve, reject) => {
    useScriptTag(
      '/incode/onBoarding-1.76.0.js',
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

const loadMicroblink = () => {
  useScriptTag('/blinkid/blinkid-in-browser.esm.js', () => {}, {
    manual: true,
    type: 'module'
  }).load()
}

const createOnboarding = () => {
  incode = window.OnBoarding.create({
    apiURL: 'https://demo-api.incodesmile.com/0',
    apiKey: 'a02644685ee3394d70154fcfa5b2237180e4f6aa',
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
  incode.sendGeolocation({ token: incodeSession.value.token }).catch(console.error)
  // incode.sendFingerprint({ token: incodeSession.value.token }).catch(console.error)
}

const captureIdFront = (container, onSuccess) => {
  incode.renderCamera('front', container, {
    token: incodeSession.value,
    numberOfTries: 3,
    showTutorial: true,
    onSuccess,
    onError: console.error
  })
}

const captureIdBack = (container, onSuccess) => {
  incode.renderCamera('back', container, {
    token: incodeSession.value,
    numberOfTries: 3,
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
    // getOcrData()
  } catch (error) {
    console.error(error)
  }
}

//***********************************************  BlinkIf functions  ***********************************************

const addfront = (imagenb64, imagenb642) => {
  const requestHeaders = new Headers()
  requestHeaders.append('Accept', 'application/json')
  requestHeaders.append('Content-Type', 'application/json')
  requestHeaders.append('api-version', '1.0')
  requestHeaders.append('x-api-key', 'a02644685ee3394d70154fcfa5b2237180e4f6aa')
  requestHeaders.append('X-Incode-Hardware-Id', incodeSession.value.token)

  return fetch('https://demo-api.incodesmile.com/omni/add/front-id/v2', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({ base64Image: imagenb64 }),
    redirect: 'follow'
  })
    .then((response) => response.json())
    .then((sessionObject) => {
      return { token: sessionObject.token }
    })
    .catch((error) => console.error(error))
    .finally(async () => {
      await addback(imagenb642)
      // Aquí puedes agregar lógica adicional, como ocultar un loader o limpiar estados.
    })
}

const addback = (imagenb64) => {
  const requestHeaders = new Headers()
  requestHeaders.append('Accept', 'application/json')
  requestHeaders.append('Content-Type', 'application/json')
  requestHeaders.append('api-version', '1.0')
  requestHeaders.append('x-api-key', 'a02644685ee3394d70154fcfa5b2237180e4f6aa')
  requestHeaders.append('X-Incode-Hardware-Id', incodeSession.value.token)

  return fetch('https://demo-api.incodesmile.com/omni/add/back-id/v2', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({ base64Image: imagenb64 }),
    redirect: 'follow'
  })
    .then((response) => response.json())
    .then((sessionObject) => {
      return { token: sessionObject.token }
    })
    .catch((error) => console.error(error))
    .finally(async () => {
      await processId()
      finishOnboarding()
      // Aquí puedes agregar lógica adicional, como ocultar un loader o limpiar estados.
    })
}

const runBlinkId = () => {
  if (blinkid.value) {
    const blinkId = blinkid.value
    blinkId.licenseKey =
      'sRwCAAlsb2NhbGhvc3QGbGV5SkRjbVZoZEdWa1QyNGlPakUzTWprNE5EUXlNelF4T0Rjc0lrTnlaV0YwWldSR2IzSWlPaUkyWVdJNU1XSmlNeTB3Wm1Ka0xUUTVZekl0T1RJME1TMWhZekF5TkRWaE9XRmxZemNpZlE9PSCHq5SbaW6kwKeSNepZI/88RycET7b6EUT0h2YdBOr1hZ3SWSV/dnTbfOUidZbqwcVT24GoO3mvCA9UjD+q78ZZdcwjSG3/dOHGStfDsn+xV4hk7TEznx+emUPcEoMwswagkb/HPCVltC31uf+z18Rqp9Q='
    // 'sRwCAC5kaXN0LWFyY2hpdmVkLXhtbC1hYnNvbHV0ZWx5LnRyeWNsb3VkZmxhcmUuY29tBmxleUpEY21WaGRHVmtUMjRpT2pFM05EYzROVFU0TnpZMU1UY3NJa055WldGMFpXUkdiM0lpT2lJMllXSTVNV0ppTXkwd1ptSmtMVFE1WXpJdE9USTBNUzFoWXpBeU5EVmhPV0ZsWXpjaWZRPT1VNzswlT3dtNdpdeCW8qGOttRd8CI6StEtHgTODh17cPKWAVWqXkeUqkk+Pptr35dHfQBJArpBXj0KSC/jfGr/O0BDefWKV+9yPRndLYDjiT31zzT9VZApeHwSrXqcamrGme3GKS8WF2wZkJYWd4olag=='
    // 'sRwCADRpbnRlcmZlcmVuY2UtbWFyaWp1YW5hLWVjb25vbXktYXNoLnRyeWNsb3VkZmxhcmUuY29tBmxleUpEY21WaGRHVmtUMjRpT2pFM05EYzVOREEyTURBM016SXNJa055WldGMFpXUkdiM0lpT2lJMllXSTVNV0ppTXkwd1ptSmtMVFE1WXpJdE9USTBNUzFoWXpBeU5EVmhPV0ZsWXpjaWZRPT3KKGrD6dL31MUqd7Eeu9PKxAJaSbdXoz3+YeA9sgMk3My/hZRDfQ2kXSd/PpjYnngSRuTNCvRN6HXY0qEyMaoRehschpLrEWbvBOZkFtXMRMV/+vlVv4EMXuHrgyAN/njDfNa9qSuAFdkZNCak53Bicw=='
    blinkId.recognizers = ['BlinkIdMultiSideRecognizer']
    blinkId.engineLocation = '/blinkid/resources'
    blinkId.workerLocation = '/blinkid/resources/BlinkIDWasmSDK.worker.min.js'

    blinkId.recognizerOptions = {
      BlinkIdMultiSideRecognizer: {
        returnFullDocumentImage: true,
        returnFaceImage: true,
        signatureImage: true,
        saveCameraFrames: true
      }
    }

    // extra configs
    blinkId.allowHelloMessage = true
    blinkId.enableDrag = true
    blinkId.hideFeedback = true
    blinkId.hideLoadingAndErrorUi = false
    blinkId.scanFromCamera = true
    blinkId.scanFromImage = false
    blinkId.translations = translations
    blinkId.iconCameraDefault = undefined
    blinkId.iconCameraActive = undefined
    blinkId.iconGalleryDefault = undefined
    blinkId.iconGalleryActive = undefined
    blinkId.iconInvalidFormat = undefined
    blinkId.iconSpinner = undefined

    blinkId.addEventListener('fatalError', (ev) => console.log('fatalError', ev.detail))

    blinkId.addEventListener('ready', (ev) => {
      console.log('ready', ev.detail)
      blinkId.startCameraScan()
    })

    blinkId.addEventListener('scanError', (ev) => console.log('scanError', ev.detail))

    blinkId.addEventListener('scanSuccess', (ev) => {
      console.log('scanSuccess', ev.detail, ev)

      if (ev.type === 'scanSuccess') {
        let objetoData = ev.detail.recognizer
        console.log('resultado motor microblink', ev.detail.recognizer)
        if (objetoData.classInfo.documentType === 18) {
          let parseData = parseaOcr(ev.detail.recognizer)
          addfront(parseData.ImagenesBase64.FrenteDoc, parseData.ImagenesBase64.ReversoDoc)
        }
      }
    })

    blinkId.addEventListener('feedback', (ev) => console.log('feedback', ev))
  }
}

const start = async (container) => {
  await loadIncodeScript()
  loadMicroblink()
  createOnboarding()
  await getToken()
  saveDeviceData()
  runBlinkId()

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
