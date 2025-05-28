<template>
  <Container
    :isLoading="isLoading || isLoadingDevice || isLoadingImages"
    :errorMsg="error"
  >
    <div class="px-8 py-4 mb-10">
      <div class="text-3xl font-bold">Datos OCR</div>
      <div class="flex flex-row gap-6 my-4">
        <img
          v-if="base64Front"
          :src="`data:image/jpeg;base64,${base64Front}`"
          alt="Imagen OCR"
          class="w-96"
        />
        <img
          v-if="base64Back"
          :src="`data:image/jpeg;base64,${base64Back}`"
          alt="Imagen OCR"
          class="w-96"
        />
      </div>
      <div class="mb-2">OCR data:</div>
      <div class="border border-slate-300 rounded-lg max-h-72 overflow-y-auto p-4">
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
      </div>
      <div class="mt-6 mb-2">Device info:</div>
      <div class="border border-slate-300 rounded-lg max-h-72 overflow-y-auto p-4">
        <pre>{{ JSON.stringify(deviceInfo, null, 2) }}</pre>
      </div>
    </div>
  </Container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import Container from '@/components/layout/Container.vue'

const route = useRoute()
const base64Front = ref()
const base64Back = ref()

const { data, isLoading, error } = useQuery({
  queryKey: ['ocrData', route.params.id],
  queryFn: async () => {
    const res = await fetch('https://demo-api.incodesmile.com/omni/get/ocr-data', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-version': '1.0',
        'x-api-key': 'a02644685ee3394d70154fcfa5b2237180e4f6aa',
        'X-Incode-Hardware-Id': route.params.id
      }
    })

    if (!res.ok) throw new Error(`Error: ${res.statusText}`)
    return res.json()
  },
  enabled: computed(() => !!route.params.id)
})

const { data: deviceInfo, isLoading: isLoadingDevice } = useQuery({
  queryKey: ['deviceInfo', route.params.id],
  queryFn: async () => {
    const res = await fetch('https://demo-api.incodesmile.com/omni/get/device-info', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'api-version': '1.0',
        'x-api-key': 'a02644685ee3394d70154fcfa5b2237180e4f6aa',
        'X-Incode-Hardware-Id': route.params.id
      }
    })

    if (!res.ok) throw new Error(`Error: ${res.statusText}`)
    return res.json()
  },
  enabled: computed(() => !!route.params.id)
})

const { mutate: fetchImages, isLoading: isLoadingImages } = useMutation({
  mutationFn: async () => {
    const response = await fetch('https://demo-api.incodesmile.com/omni/get/images', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-version': '1.0',
        'content-type': 'application/json',
        'x-api-key': 'a02644685ee3394d70154fcfa5b2237180e4f6aa',
        'X-Incode-Hardware-Id': route.params.id
      },
      body: JSON.stringify({ images: ['croppedOriginalFrontID', 'croppedOriginalBackID'] })
    })

    if (!response.ok) throw new Error('Error al recuperar las imágenes')
    const resp = await response.json()
    base64Front.value = resp.croppedOriginalFrontID
    base64Back.value = resp.croppedOriginalBackID
    return resp
  }
})

fetchImages()
</script>
