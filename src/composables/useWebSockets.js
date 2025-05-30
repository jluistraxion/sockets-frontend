import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWebSocket } from '@vueuse/core'

export function useWebSockets() {
  const WS_URL = import.meta.env.VITE_WS_URL
  const route = useRoute()
  const router = useRouter()

  const captureFinished = ref(false)

  const { status, data, send, open, close, ws } = useWebSocket(WS_URL, {
    // immediate: false,
    autoReconnect: {
      retries: 3,
      delay: 100000,
      onFailed() {
        console.log('⚠️ Error: No se pudo reconectar al servidor', 'error')
      }
    },
    onConnected() {
      console.log('✅ Conexión establecida con el servidor', 'system')
    },
    onDisconnected() {
      console.log('🔌 Conexión cerrada', 'system')
    },
    onError(ws, event) {
      console.log(`❌ Error: ${event.message}`, 'error')
    },
    onMessage(ws, event) {
      let parsed = JSON.parse(event.data)
      let isErrorSession = ['session-does-not-exist', 'session-not-found'].includes(parsed.type)
      if (isErrorSession) router.push('/session-not-found')
      if (parsed.type === 'session-already-exists') router.push('/session-already-exists')
      if (parsed.type === 'message' && parsed.message === 'capture-finished') {
        captureFinished.value = true
      }
      console.log(`📩 Recibido: ${event.data}`, parsed, 'received')
    }
  })

  const isOpen = computed(() => status.value === 'OPEN')

  const sendMessage = (txt) => {
    let payload = JSON.stringify({
      type: 'message',
      message: txt ? txt : 'mensaje',
      sessionId: route.params.id
    })
    send(payload)
  }

  const createSession = () => {
    let payload = JSON.stringify({
      type: 'create-session',
      token: route.params.id
    })
    send(payload)
  }

  const joinSession = () => {
    let payload = JSON.stringify({
      type: 'join-session',
      sessionId: route.params.id
    })
    send(payload)
  }

  const mobileConnected = () => {
    let payload = JSON.stringify({
      type: 'mobile-connected',
      sessionId: route.params.id
    })
    send(payload)
  }

  return {
    open,
    close,
    sendMessage,
    isOpen,
    status,
    createSession,
    joinSession,
    mobileConnected,
    captureFinished
  }
}
