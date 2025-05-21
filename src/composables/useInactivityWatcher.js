import { ref, watch, computed } from 'vue'
import { useIdle, useTimestamp, useInterval } from '@vueuse/core'
import { useRouter } from 'vue-router'

export function useInactivityWatcher() {
  const idleTime = 5 * 1000
  const { idle, lastActive, reset } = useIdle(idleTime)
  const now = useTimestamp({ interval: 1000 })
  const router = useRouter()
  const showWarning = ref(false)
  const warningCountdown = ref(5)

  const countdown = computed(() => Math.floor((now.value - lastActive.value) / 1000))

  const { pause, resume } = useInterval(1000, {
    controls: true,
    immediate: false,
    callback: () => {
      warningCountdown.value -= 1
      if (warningCountdown.value === 0) router.push('/timeout')
    }
  })

  pause()

  const cancelRedirect = () => {
    reset()
    pause()
    warningCountdown.value = 5
  }

  watch(idle, (isIdle) => {
    if (isIdle) {
      showWarning.value = true
      resume()
      reset()
    } else {
      showWarning.value = false
      warningCountdown.value = 5
    }
  })

  return {
    showWarning,
    countdown,
    warningCountdown,
    cancelRedirect
  }
}
