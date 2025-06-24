import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScriptTag } from '@vueuse/core'
import { useWebSockets } from '@/composables/useWebSockets'
import { useIndicadores } from '@/composables/useIndicadores'

export function useIncodeScanner({ errorMsg }) {
  const API_URL = import.meta.env.VITE_API_URL
  const session = ref(null)
  const config = ref({})
  let incode = null
  const route = useRoute()
  const router = useRouter()
  const { joinSession, sendMessage } = useWebSockets()
  const { getIndicadores, isLoadingIndicadores } = useIndicadores({ errorMsg })

  joinSession()

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
    try {
      incode = window.OnBoarding.create({
        apiURL: config.value?.apiURL,
        apiKey: config.value?.apiKey,
        encrypt: config.value?.crypto,
        lang: 'es'
      })
    } catch (error) {
      getIndicadores({
        success: false,
        message: 'Error al iniciar el SDK',
        code: '10',
        idoperacion: route.params.id
      })
    }
  }

  const getToken = async () => {
    try {
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
        session.value = data.data
      } else {
        router.push({ name: data.data.redirect, params: { id: route.params.id } })
      }
    } catch (error) {
      getIndicadores({
        success: false,
        message: 'Verifica los datos url, key, id del flujo de operacion',
        code: '7',
        idoperacion: route.params.id
      })
    }
  }

  const saveDeviceData = () => {
    incode.sendGeolocation({ token: session.value.token }).catch(console.error)
    incode.sendFingerprint({ token: session.value.token }).catch(console.error)
  }

  const captureIdFront = (container, onSuccess) => {
    incode.renderCamera('front', container, {
      token: session.value,
      numberOfTries: config.value?.reintentos,
      showTutorial: true,
      onSuccess,
      onError: (error) => {
        let message = 'Se presenta un problema al capturar el frente del documento'
        let code = '9'
        if (error.failReason === 'ID_TYPE_UNACCEPTABLE') {
          message = 'La imagen del frontal no corresponde a un INE valido'
          code = '4'
        }
        getIndicadores({
          success: false,
          message,
          code,
          idoperacion: route.params.id
        })
      }
    })
  }

  const captureIdBack = (container, onSuccess) => {
    incode.renderCamera('back', container, {
      token: session.value,
      numberOfTries: config.value?.reintentos,
      showTutorial: true,
      onSuccess,
      onError: (error) => {
        let message = 'Se presenta un problema al capturar el reverso del documento'
        let code = '9'
        if (error.failReason === 'ID_TYPE_UNACCEPTABLE') {
          message = 'La imagen del reverso no corresponde a un INE valido'
          code = '5'
        }
        getIndicadores({
          success: false,
          message,
          code,
          idoperacion: route.params.id
        })
      }
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
      await incode.processId({ token: session.value.token })
    } catch (error) {
      getIndicadores({
        success: false,
        message: 'No se pudieron recuperar las imagenes del documento procesado',
        code: '6',
        idoperacion: route.params.id
      })
    }
  }

  const finishOnboarding = async () => {
    try {
      await incode.getFinishStatus(null, { token: session.value.token })
      getIndicadores({
        success: true,
        message: 'Captura completa',
        code: 'ocrComplete',
        idoperacion: route.params.id
      })
      sendMessage('capture-finished')
    } catch (error) {
      getIndicadores({
        success: false,
        message: 'No se pudieron recuperar las imagenes del documento procesado',
        code: '6',
        idoperacion: route.params.id
      })
    }
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
        getIndicadores({
          success: false,
          message: 'Las imagenes capturadas no corresponde a un INE valido',
          code: '3',
          idoperacion: route.params.id
        })
      }
    })
  }

  const start = async (container) => {
    await loadIncodeScript()
    createOnboarding()
    await getToken()
    /*if (config.value?.crypto) {
      await incode.publishKeys(session.value.token)
    }*/
    saveDeviceData()
    captureId(container)
  }

  const setConfig = (data, container) => {
    config.value = data
    if (!data.apiURL && !data.apiKey) {
      console.error('configuracion incorrecta')
      router.push({ name: 'error' })
    }
    start(container)
  }

  return {
    setConfig,
    isLoadingIndicadores
  }
}
