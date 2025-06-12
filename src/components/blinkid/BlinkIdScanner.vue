<template>
  <Container
    :isLoading="isLoading || isLoadingIndicadores"
    :errorMsg
  />
  <blinkid-in-browser
    ref="blinkid"
    :class="[isShowBrowser ? 'block' : 'hidden']"
    :translations="stringifiedTranslations"
  />
  <InactivityModal
    ref="modal"
    @cancel="cancelRedirect"
    :countdown="warningCountdown"
  />
  <CancelOperationModal
    ref="operationModal"
    @cancel="startCamera"
    @acept="cancelScan"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScriptTag } from '@vueuse/core'
import { useMutation } from '@tanstack/vue-query'
import { parseErrorMessage } from '@/utils/parseData.js'
import { parseaOcr } from '@/utils/blinkid.js'
import { useInactivityWatcher } from '@/composables/useInactivityWatcher.js'
import { useWebSockets } from '@/composables/useWebSockets'
import { useIndicadores } from '@/composables/useIndicadores'
import InactivityModal from '@/components/modals/InactivityModal.vue'
import Container from '@/components/layout/Container.vue'
import CancelOperationModal from '@/components/modals/CancelOperationModal.vue'
import api from '@/api/api'
import translations from './translations'
const stringifiedTranslations = JSON.stringify(translations)

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const router = useRouter()
const blinkid = ref(null)
const errorMsg = ref(null)
const config = ref({})
const modal = ref()
const operationModal = ref()
const isShowBrowser = ref(false)

const { showWarning, warningCountdown, cancelRedirect, setConfig } = useInactivityWatcher()
const { joinSession, sendMessage, close } = useWebSockets()
const { getIndicadores, isLoadingIndicadores } = useIndicadores({ errorMsg })

watch(showWarning, (isShowWarning) => {
  if (isShowWarning) modal.value.showModal()
})

//lazy loading script
const loadIncode = () => {
  useScriptTag('/blinkid/blinkid-in-browser.esm.js', () => {}, {
    manual: true,
    type: 'module'
  }).load()
}

loadIncode()
joinSession()

const run = () => {
  if (blinkid.value) {
    const blinkId = blinkid.value
    blinkId.licenseKey = config.value.licenseKey
    blinkId.recognizers = ['BlinkIdMultiSideRecognizer']
    blinkId.engineLocation = '/blinkid/resources'
    blinkId.workerLocation = '/blinkid/resources/BlinkIDWasmSDK.worker.min.js'

    blinkId.recognizerOptions = {
      BlinkIdMultiSideRecognizer: {
        returnFullDocumentImage: config.value.returnFullDocumentImage,
        returnFaceImage: config.value.returnFaceImage,
        signatureImage: config.value.signatureImage,
        saveCameraFrames: Boolean(config.value.saveCameraFrames) ?? false
      }
    }

    // extra configs
    blinkId.allowHelloMessage = true
    blinkId.enableDrag = true
    blinkId.hideFeedback = true
    blinkId.hideLoadingAndErrorUi = false
    blinkId.scanFromCamera = true
    blinkId.scanFromImage = false
    blinkId.iconCameraDefault = undefined
    blinkId.iconCameraActive = undefined
    blinkId.iconGalleryDefault = undefined
    blinkId.iconGalleryActive = undefined
    blinkId.iconInvalidFormat = undefined
    blinkId.iconSpinner = undefined

    blinkId.addEventListener('fatalError', (ev) => {
      console.error('fatalError', ev.detail)
      getIndicadores({
        success: false,
        message: 'Error al iniciar el SDK',
        code: '10',
        idoperacion: route.params.id
      })
    })

    blinkId.addEventListener('ready', (ev) => {
      console.log('ready', ev.detail)
      isShowBrowser.value = true
      blinkId.startCameraScan()
    })

    blinkId.addEventListener('scanError', (ev) => {
      console.error('scanError', ev.detail)
      getIndicadores({
        success: false,
        message: 'No se pudieron recuperar las imagenes del documento procesado',
        code: '6',
        idoperacion: route.params.id
      })
    })

    blinkId.addEventListener('scanAborted', (ev) => {
      operationModal.value.show()
    })

    blinkId.addEventListener('scanSuccess', (ev) => {
      if (ev.type === 'scanSuccess') {
        let objetoData = ev.detail.recognizer
        if (objetoData.classInfo.documentType === 18) {
          let data = parseaOcr(ev.detail.recognizer)
          getIndicadores({
            success: true,
            message: 'Captura completa',
            code: 'ocrComplete',
            idoperacion: route.params.id,
            data
          })
          sendMessage('capture-finished')
        } else {
          //escaneo exitoso pero no es un INE
          getIndicadores({
            success: false,
            message: 'Las imagenes capturadas no corresponde a un INE valido',
            code: '3',
            idoperacion: route.params.id
          })
        }
      } else {
        getIndicadores({
          success: false,
          message: 'No se pudieron recuperar las imagenes del documento procesado',
          code: '6',
          idoperacion: route.params.id
        })
      }
    })
  }
}

const { mutate: fetchData, isPending: isLoading } = useMutation({
  mutationFn: () => api.post(`${API_URL}/getmotorconfig`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.success) {
      config.value = response.data
      run()
      const timeout = Number(response.data.timeout) || 180
      const timedown = Number(response.data.timedown) || 10
      setConfig(timeout, timedown)
    } else {
      errorMsg.value = response.message
    }
  },
  onError: (error) => {
    errorMsg.value = parseErrorMessage(error)
  }
})

fetchData()

const startCamera = () => blinkid.value.startCameraScan()

const cancelScan = () => {
  getIndicadores({
    success: false,
    message: 'No se pudieron recuperar las imagenes del documento procesado',
    code: '6',
    idoperacion: route.params.id
  })
}
</script>
