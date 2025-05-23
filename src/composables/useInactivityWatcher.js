import { ref, watch, computed } from 'vue'
import { useTimestamp, useInterval } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useCustomIdle } from './useCustomIdle'

export function useInactivityWatcher() {
  const now = useTimestamp({ interval: 1000 })
  const router = useRouter()

  const showWarning = ref(false)
  const warningCountdownSeconds = ref(5)
  const warningCountdown = ref(warningCountdownSeconds.value)
  const idleTimeSeconds = ref(5)
  const idleTime = ref(idleTimeSeconds.value * 1000)

  const countdown = computed(() => Math.floor((now.value - lastActive.value) / 1000))

  const { idle, lastActive, setIdleTime, reset } = useCustomIdle(idleTime.value)

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
    warningCountdown.value = warningCountdownSeconds.value
  }

  watch(idle, (isIdle) => {
    if (isIdle) {
      showWarning.value = true
      resume()
      reset()
    } else {
      showWarning.value = false
      warningCountdown.value = warningCountdownSeconds.value
    }
  })

  const setConfig = (timeout, timedown) => {
    setIdleTime(timeout)
    warningCountdownSeconds.value = timedown
    warningCountdown.value = timedown
  }

  return {
    showWarning,
    countdown,
    warningCountdown,
    cancelRedirect,
    setConfig
  }
}
