import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useCustomIdle() {
  const idleTimeSeconds = ref(10)
  const isIdle = ref(false)
  const lastActive = ref(Date.now())
  let timer = null

  const events = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'scroll', 'wheel']

  const startTimer = () => {
    stopTimer()
    timer = setTimeout(() => {
      isIdle.value = true
    }, idleTimeSeconds.value * 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const resetTimer = () => {
    lastActive.value = Date.now()
    isIdle.value = false
    startTimer()
  }

  const setIdleTime = (seconds) => {
    idleTimeSeconds.value = seconds
    resetTimer()
  }

  const handleActivity = () => {
    resetTimer()
  }

  const start = () => {
    events.forEach((e) => window.addEventListener(e, handleActivity))
    resetTimer()
  }

  const stop = () => {
    stopTimer()
    events.forEach((e) => window.removeEventListener(e, handleActivity))
  }

  onMounted(start)
  onBeforeUnmount(stop)

  return {
    idle: isIdle,
    idleTimeSeconds,
    lastActive,
    setIdleTime,
    start,
    stop,
    reset: resetTimer
  }
}
