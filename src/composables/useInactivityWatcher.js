import { ref, watch, computed } from 'vue'
import { useTimestamp, useInterval, useIdle } from '@vueuse/core'
import { useRouter } from 'vue-router'

export function useInactivityWatcher() {
  const { lastActive } = useIdle(5 * 60 * 1000) // 5 min
  const router = useRouter()
  const now = useTimestamp({ interval: 1000 })
  const idledFor = computed(() => Math.floor((now.value - lastActive.value) / 1000))

  const showWarning = ref(false)
  const startCountdown = ref(false)
  const countdown = ref(0)
  const countdownSeconds = ref(180) // seconds, 180 default
  const warningCountdown = ref(0)
  const warningCountdownSeconds = ref(10) // seconds, 10 default

  const { pause, resume } = useInterval(1000, {
    controls: true,
    immediate: false,
    callback: () => {
      warningCountdown.value -= 1
      if (warningCountdown.value === 0) {
        router.push('/timeout')
      }
    }
  })

  pause()

  const stop = () => {
    startCountdown.value = false
    countdown.value = 0
  }

  const cancelRedirect = () => {
    startCountdown.value = true
    countdown.value = 0
    showWarning.value = false
    warningCountdown.value = warningCountdownSeconds.value
    pause()
  }

  const setConfig = (timeout, timedown) => {
    countdownSeconds.value = timeout
    warningCountdown.value = timedown
    warningCountdownSeconds.value = timedown
    startCountdown.value = true
    console.log('setConfig', timeout, timedown)
  }

  watch([idledFor, startCountdown], ([idledForValue, startCountdownValue]) => {
    if (startCountdownValue) {
      countdown.value = idledForValue
    }
  })

  watch(countdown, (countdownValue) => {
    if (countdownValue == countdownSeconds.value) {
      console.log('inicia la cuenta regresiva')
      stop()
      showWarning.value = true
      resume()
    }
  })

  return {
    showWarning,
    countdown,
    warningCountdown,
    cancelRedirect,
    setConfig
  }
}
