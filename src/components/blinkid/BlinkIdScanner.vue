<template>
  <Container
    :isLoading="isLoading || isLoadingIndicadores"
    :errorMsg
  />
  <blinkid-in-browser ref="blinkid"></blinkid-in-browser>
  <InactivityModal
    ref="modal"
    @cancel="cancelRedirect"
    :countdown="warningCountdown"
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
import InactivityModal from '@/ui/modals/InactivityModal.vue'
import Container from '@/components/layout/Container.vue'
import api from '@/api/api'
import translations from './translations'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const router = useRouter()
const blinkid = ref(null)
const errorMsg = ref(null)
const config = ref({})
const modal = ref()

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
        signatureImage: config.value.signatureImage
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

    blinkId.addEventListener('fatalError', (ev) => {
      console.error('fatalError', ev.detail)
      getIndicadores({
        success: false,
        message: 'fatalError Microblink scanner',
        idoperacion: route.params.id
      })
    })

    blinkId.addEventListener('ready', (ev) => {
      console.log('ready', ev.detail)
      blinkId.startCameraScan()
    })

    blinkId.addEventListener('scanError', (ev) => {
      console.error('scanError', ev.detail)
      getIndicadores({
        success: false,
        message: 'scanError Microblink scanner',
        idoperacion: route.params.id
      })
    })

    blinkId.addEventListener('scanSuccess', (ev) => {
      const ano = new Date().getFullYear()
      if (ev.type === 'scanSuccess') {
        let objetoData = ev.detail.recognizer
        if (objetoData.classInfo.documentType === 18) {
          //escaneo exitoso y es INE
          if (objetoData.frontViz.dateOfExpiry.year >= ano) {
            //escaneo exitoso , es INE y es vigente
            let parseData = parseaOcr(ev.detail.recognizer)
            getIndicadores({
              success: true,
              message: 'Captura completa Microblink scanner',
              idoperacion: route.params.id,
              data: parseData
            })
            sendMessage('capture-finished')
          } else {
            //escaneo exitoso , es INE pero no es vigente
            getIndicadores({
              success: false,
              message: 'El documento no es vigente, Microblink scanner',
              idoperacion: route.params.id
            })
          }
        } else {
          //escaneo exitoso pero no es un INE
          getIndicadores({
            success: false,
            message: 'El documento no es INE, Microblink scanner',
            idoperacion: route.params.id
          })
        }
      } else {
        getIndicadores({
          success: false,
          message: 'El escaneo del documento no es valido Microblink scanner',
          idoperacion: route.params.id
        })
      }
    })

    blinkId.addEventListener('feedback', (ev) => console.log('feedback', ev))
  }
}

const { mutate: fetchData, isPending: isLoading } = useMutation({
  mutationFn: () => api.post(`${API_URL}/getmotorconfig`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.success) {
      config.value = response.data
      run()
      let timeout = response.data.timeout ? Number(response.data.timeout) : 180
      let timedown = response.data.timedown ? Number(response.data.timedown) : 10
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
</script>
