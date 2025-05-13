<template>
  <div class="text-3xl my-4">Blinkid in browser</div>
  <blinkid-in-browser ref="blinkid"></blinkid-in-browser>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const LICENSE = import.meta.env.VITE_BLINKID_LICENSE
const blinkid = ref(null)

const run = () => {
  if (blinkid.value) {
    const blinkId = blinkid.value
    blinkId.licenseKey = LICENSE
    blinkId.recognizers = ['BlinkIdMultiSideRecognizer']
    blinkId.engineLocation = '/blinkid/resources'
    blinkId.workerLocation = '/blinkid/resources/BlinkIDWasmSDK.worker.min.js'

    blinkId.addEventListener('fatalError', (ev) =>
      console.log('fatalError', ev.detail)
    )

    blinkId.addEventListener('ready', (ev) => {
      console.log('ready', ev.detail)
      // blinkId.startCameraScan()
    })

    blinkId.addEventListener('scanError', (ev) =>
      console.log('scanError', ev.detail)
    )

    blinkId.addEventListener('scanSuccess', (ev) =>
      console.log('scanSuccess', ev.detail)
    )

    blinkId.addEventListener('feedback', (ev) => console.log('feedback', ev))
  }
}

onMounted(() => run())
</script>
