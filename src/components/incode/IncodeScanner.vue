<template>
  <Container
    :isLoading
    :errorMsg
  />
  <div
    ref="container"
    id="incode-container"
  />
  <InactivityModal
    ref="modal"
    @cancel="cancelRedirect"
    :countdown="warningCountdown"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { useIncode } from '@/composables/useIncode'
import { parseErrorMessage } from '@/utils/parseData.js'
import { useInactivityWatcher } from '@/composables/useInactivityWatcher.js'
import InactivityModal from '@/ui/modals/InactivityModal.vue'
import Container from '@/components/layout/Container.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const { setConfig } = useIncode()
const container = ref(null)
const errorMsg = ref(null)
const modal = ref()

const {
  showWarning,
  warningCountdown,
  cancelRedirect,
  setConfig: setConfigInactivity
} = useInactivityWatcher()

watch(showWarning, (isShowWarning) => {
  if (isShowWarning) modal.value.showModal()
})

const { mutate: fetchData, isPending: isLoading } = useMutation({
  mutationFn: () => api.post(`${API_URL}/getmotorconfig`, { idoperacion: route.params.id }),
  onSuccess: (response) => {
    if (response.success) {
      setConfig(response.data, container.value)
      let timeout = response.data.timeout ? Number(response.data.timeout) : 180
      let timedown = response.data.timedown ? Number(response.data.timedown) : 10
      setConfigInactivity(timeout, timedown)
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
