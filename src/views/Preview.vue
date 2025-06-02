<template>
  <Container
    :isLoading="isLoading"
    :errorMsg="errorMsg"
  >
    <div class="text-center px-4 py-6">
      <div class="text-2xl mb-4">Página externa para visualizar el OCR</div>
      <h2 class="text-xl font-semibold mb-2">Resultado del OCR:</h2>
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
        <img
          v-if="base64Photo"
          :src="`data:image/jpeg;base64,${base64Photo}`"
          alt="Imagen OCR"
          class="w-40 h-40"
        />
      </div>
      <div>
        <div class="mb-2">OCR data:</div>
        <div class="border border-slate-300 rounded-lg max-h-72 overflow-y-auto p-4">
          <pre>{{ JSON.stringify(data, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </Container>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { parseErrorMessage } from '@/utils/parseData.js'
import { jwtDecode } from 'jwt-decode'
import Container from '@/components/layout/Container.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const errorMsg = ref(null)
const base64Front = ref(null)
const base64Back = ref(null)
const base64Photo = ref(null)

const {
  mutate: fetchData,
  isPending: isLoading,
  data
} = useMutation({
  mutationFn: () => api.post(`${API_URL}/getdata`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.success) {
      const decoded = jwtDecode(response.data.jwt)
      base64Front.value = decoded.key.ImagenAnverso
      base64Back.value = decoded.key.ImagenReverso
      base64Photo.value = decoded.key.ImagenFotoId
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
