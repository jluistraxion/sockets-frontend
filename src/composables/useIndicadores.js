import { useMutation } from '@tanstack/vue-query'
import { parseErrorMessage } from '@/utils/parseData'
import { useRouter } from 'vue-router'
import api from '@/api/api'

export function useIndicadores({ errorMsg } = {}) {
  const API_URL = import.meta.env.VITE_API_URL
  const router = useRouter()

  const { mutate: getIndicadores } = useMutation({
    mutationFn: (payload) => {
      console.log('payload getIndicadores', payload)
      return api.post(`${API_URL}/getindicadores`, payload)
    },
    onSuccess: (response) => {
      console.warn('response getIndicadores', response)
      router.push('/preview')
    },
    onError: (error) => {
      if (errorMsg?.value !== undefined) {
        errorMsg.value = parseErrorMessage(error.message)
      }
    }
  })

  return { getIndicadores }
}
