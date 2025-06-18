import { useMutation } from '@tanstack/vue-query'
import { parseErrorMessage } from '@/utils/parseData'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/api'

export function useIndicadores({ errorMsg } = {}) {
  const API_URL = import.meta.env.VITE_API_URL
  const router = useRouter()
  const route = useRoute()

  const { mutate: getIndicadores, isPending: isLoadingIndicadores } = useMutation({
    mutationFn: (payload) => {
      return api.post(`${API_URL}/getindicadores`, payload)
    },
    onSuccess: (response) => {
      if (response.redirecciona) {
        window.location.href = response.redirect
      } else {
        router.push({ name: 'success' })
      }
    },
    onError: (error) => {
      if (errorMsg?.value !== undefined) {
        errorMsg.value = parseErrorMessage(error.message)
      }
    }
  })

  return { getIndicadores, isLoadingIndicadores }
}
