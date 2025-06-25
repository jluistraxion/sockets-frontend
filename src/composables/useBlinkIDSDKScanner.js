import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWebSockets } from '@/composables/useWebSockets'
import { useMutation } from '@tanstack/vue-query'
import { parseErrorMessage } from '@/utils/parseData'
import * as BlinkIDSDK from '@microblink/blinkid-in-browser-sdk'
import api from '@/api/api'

export default function useBlinkIDSDKScanner({
  initialMessageEl,
  cameraFeed,
  cameraFeedback,
  scanFeedback,
  onStateChange,
  errorMsg
}) {
  let sdk = null
  let drawContext = null
  let scanFeedbackLock = false

  const API_URL = import.meta.env.VITE_API_URL
  const route = useRoute()
  const router = useRouter()
  const flipMessage = ref(false)
  const config = ref({})

  const { joinSession, sendMessage, close } = useWebSockets()

  joinSession()

  function updateScanFeedback(message, force = false) {
    if (scanFeedbackLock && !force) return
    scanFeedbackLock = true
    scanFeedback.value.innerText = message
    setTimeout(() => (scanFeedbackLock = false), 1000)
  }

  function drawQuad(quad) {
    clearDrawCanvas()
    setupColor(quad)
    setupMessage(quad)
    applyTransform(quad.transformMatrix)
    drawContext.beginPath()
    drawContext.moveTo(quad.topLeft.x, quad.topLeft.y)
    drawContext.lineTo(quad.topRight.x, quad.topRight.y)
    drawContext.lineTo(quad.bottomRight.x, quad.bottomRight.y)
    drawContext.lineTo(quad.bottomLeft.x, quad.bottomLeft.y)
    drawContext.closePath()
    drawContext.stroke()
  }

  function setupColor(quad) {
    const colors = ['#FF0000FF', '#00FF00FF', '#FFFF00FF']
    drawContext.strokeStyle = colors[quad.detectionStatus] || '#FFFF00FF'
    drawContext.fillStyle = drawContext.strokeStyle
    drawContext.lineWidth = 5
  }

  function setupMessage(quad) {
    const msg = {
      0: 'Escaneo fallido',
      1: 'Escanea el anverso del documento', // '¡Éxito!',
      2: 'Ángulo incorrecto',
      3: 'Acércalo',
      4: 'Aléjalo'
    }
    updateScanFeedback(msg[quad.detectionStatus] || 'Escaneando...')
  }

  function clearDrawCanvas() {
    const canvas = cameraFeedback.value
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    drawContext.clearRect(0, 0, canvas.width, canvas.height)
  }

  function applyTransform(matrix) {
    const canvas = cameraFeedback.value
    const video = cameraFeed.value
    const arCanvas = canvas.width / canvas.height
    const arVideo = video.videoWidth / video.videoHeight

    let xOffset = 0,
      yOffset = 0
    let w = canvas.width,
      h = canvas.height
    if (arCanvas > arVideo) {
      h = canvas.height
      w = arVideo * h
      xOffset = (canvas.width - w) / 2
    } else {
      w = canvas.width
      h = w / arVideo
      yOffset = (canvas.height - h) / 2
    }

    drawContext.translate(xOffset, yOffset)
    drawContext.scale(w / video.videoWidth, h / video.videoHeight)
    drawContext.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
  }

  async function initializeSDK() {
    if (!BlinkIDSDK.isBrowserSupported()) {
      initialMessageEl.value.innerText = '¡Tu navegador no es compatible!'
      return
    }

    const licenseKey = config.value.licenseKey
    const settings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey)
    settings.engineLocation = '/blinkidsdk'
    settings.workerLocation = '/blinkidsdk/BlinkIDWasmSDK.worker.min.js'
    // settings.loadProgressCallback = (p) => (progressEl.value.value = p)

    try {
      sdk = await BlinkIDSDK.loadWasmModule(settings)
      onStateChange('start')
      drawContext = cameraFeedback.value.getContext('2d')
    } catch (e) {
      initialMessageEl.value.innerText = 'Error cargando el SDK'
      console.error(e)
    }
  }

  const { mutate: getIndicadores } = useMutation({
    mutationFn: (payload) => {
      console.log('payload getIndicadores', payload)
      return api.post(`${API_URL}/getindicadores`, {
        success: true,
        message: 'Operacion concluida exitosamente',
        idoperacion: route.params.id,
        data: payload
      })
    },
    onSuccess: (response) => {
      sendMessage('capture-finished')
      close()
      router.push({ name: 'success' })
    },
    onError: (error) => {
      errorMsg.value = parseErrorMessage(error.message)
    }
  })

  async function startRecognition() {
    onStateChange('scanning')

    const recognizer = await BlinkIDSDK.createBlinkIdMultiSideRecognizer(sdk)
    const recognizerRunner = await BlinkIDSDK.createRecognizerRunner(sdk, [recognizer], false, {
      onQuadDetection: drawQuad,
      onDetectionFailed: () => updateScanFeedback('No se detectó el documento', true),
      // onFirstSideResult: () => alert('Da vuelta el documento')
      onFirstSideResult: () => {
        console.log('Da vuelta el documento')
        flipMessage.value = true
        setTimeout(() => (flipMessage.value = false), 4000)
      }
    })

    const videoRecognizer = await BlinkIDSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
      cameraFeed.value,
      recognizerRunner
    )

    videoRecognizer.startRecognition(async (state) => {
      videoRecognizer.pauseRecognition()

      if (state === BlinkIDSDK.RecognizerResultState.Empty) return
      const result = await recognizer.getResult()
      console.log('result', result)

      if (result.state === BlinkIDSDK.RecognizerResultState.Empty) return

      const name =
        result.fullName?.latin ||
        `${result.firstName?.latin || ''} ${result.lastName?.latin || ''}`.trim()
      const dob = result.dateOfBirth || result.mrz?.dateOfBirth || {}

      console.log(`Hola ${name}, naciste el ${dob.day}/${dob.month}/${dob.year}`)

      recognizerRunner?.delete()
      recognizer?.delete()
      videoRecognizer?.releaseVideoFeed()

      clearDrawCanvas()
      onStateChange('start')
      getIndicadores(result)
    })
  }

  const setConfig = async (data) => {
    config.value = data
    await initializeSDK()
    await startRecognition()
  }

  return {
    setConfig,
    flipMessage
  }
}
