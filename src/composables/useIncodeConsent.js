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
        '/incode/onBoarding-1.81.0.js',
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

  const checkMandatoryConsent = (incodeContainer) => {
    incode.sendFingerprint({ token: session.value.token }).then((response) => {
      if (response?.showMandatoryConsent) {
        incode.renderBiometricConsent(incodeContainer, {
          token: session.value,
          onSuccess: () => captureCombinedConsent(incodeContainer),
          onCancel: () => console.error('Mandatory consent was denied'),
          regulationType: response.regulationType
        })
      } else {
        captureCombinedConsent(incodeContainer)
      }
    })
  }

  const captureCombinedConsent = (incodeContainer) => {
    incode.renderCombinedConsent(incodeContainer, {
      token: session.value,
      onSuccess: () => sendGeolocation(incodeContainer),
      consentId: config.value?.consentId
    })
  }

  const sendGeolocation = (incodeContainer) => {
    incode.sendGeolocation({ token: session.value.token })
    captureId(incodeContainer)
  }

  const start = async (container) => {
    await loadIncodeScript()
    createOnboarding()
    await getToken()
    checkMandatoryConsent(container)
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
