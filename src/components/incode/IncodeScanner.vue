<template>
  <SpinnerFullScreen v-if="isLoading" />
  <Error
    v-if="errorMsg"
    :error="errorMsg"
  />
  <div
    ref="container"
    id="incode-container"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { useIncode } from '@/composables/useIncode'
import { parseErrorMessage } from '@/utils/parseData.js'
import api from '@/api/api'
import SpinnerFullScreen from '@/ui/spinner/SpinnerFullScreen.vue'
import Error from '@/views/Error.vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const { setConfig } = useIncode()
const container = ref(null)
const errorMsg = ref(null)

const { mutate: fetchData, isPending: isLoading } = useMutation({
  mutationFn: () => api.post(`${API_URL}/getmotorconfig`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.success) {
      setConfig(response.data, container.value)
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
