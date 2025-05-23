<template>
  <blinkid-in-browser ref="blinkid"></blinkid-in-browser>
</template>

<script setup>
import { ref, watch } from 'vue'
import translations from '@/components/blinkid/translations.js'

const blinkid = ref(null)

const run = () => {
  if (blinkid.value) {
    const blinkId = blinkid.value
    blinkId.licenseKey =
      // 'sRwCAAlsb2NhbGhvc3QGbGV5SkRjbVZoZEdWa1QyNGlPakUzTWprNE5EUXlNelF4T0Rjc0lrTnlaV0YwWldSR2IzSWlPaUkyWVdJNU1XSmlNeTB3Wm1Ka0xUUTVZekl0T1RJME1TMWhZekF5TkRWaE9XRmxZemNpZlE9PSCHq5SbaW6kwKeSNepZI/88RycET7b6EUT0h2YdBOr1hZ3SWSV/dnTbfOUidZbqwcVT24GoO3mvCA9UjD+q78ZZdcwjSG3/dOHGStfDsn+xV4hk7TEznx+emUPcEoMwswagkb/HPCVltC31uf+z18Rqp9Q='
      // 'sRwCAC5kaXN0LWFyY2hpdmVkLXhtbC1hYnNvbHV0ZWx5LnRyeWNsb3VkZmxhcmUuY29tBmxleUpEY21WaGRHVmtUMjRpT2pFM05EYzROVFU0TnpZMU1UY3NJa055WldGMFpXUkdiM0lpT2lJMllXSTVNV0ppTXkwd1ptSmtMVFE1WXpJdE9USTBNUzFoWXpBeU5EVmhPV0ZsWXpjaWZRPT1VNzswlT3dtNdpdeCW8qGOttRd8CI6StEtHgTODh17cPKWAVWqXkeUqkk+Pptr35dHfQBJArpBXj0KSC/jfGr/O0BDefWKV+9yPRndLYDjiT31zzT9VZApeHwSrXqcamrGme3GKS8WF2wZkJYWd4olag=='
      'sRwCADRpbnRlcmZlcmVuY2UtbWFyaWp1YW5hLWVjb25vbXktYXNoLnRyeWNsb3VkZmxhcmUuY29tBmxleUpEY21WaGRHVmtUMjRpT2pFM05EYzVOREEyTURBM016SXNJa055WldGMFpXUkdiM0lpT2lJMllXSTVNV0ppTXkwd1ptSmtMVFE1WXpJdE9USTBNUzFoWXpBeU5EVmhPV0ZsWXpjaWZRPT3KKGrD6dL31MUqd7Eeu9PKxAJaSbdXoz3+YeA9sgMk3My/hZRDfQ2kXSd/PpjYnngSRuTNCvRN6HXY0qEyMaoRehschpLrEWbvBOZkFtXMRMV/+vlVv4EMXuHrgyAN/njDfNa9qSuAFdkZNCak53Bicw=='
    blinkId.recognizers = ['BlinkIdMultiSideRecognizer']
    blinkId.engineLocation = '/blinkid/resources'
    blinkId.workerLocation = '/blinkid/resources/BlinkIDWasmSDK.worker.min.js'

    blinkId.recognizerOptions = {
      BlinkIdMultiSideRecognizer: {
        returnFullDocumentImage: true,
        returnFaceImage: true,
        signatureImage: true
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
    })

    blinkId.addEventListener('feedback', (ev) => console.log('feedback', ev))
  }
}

watch(blinkid, (newContainer) => {
  if (newContainer) run(newContainer)
})
</script>
