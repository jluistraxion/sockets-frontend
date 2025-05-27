<template>
  <div class="container p-4 mx-auto flex flex-col gap-4">
    <div class="w-1/2 flex flex-col gap-2 border border-slate-300 rounded-lg p-5">
      <div>Socket conectado: {{ isOpen }} - {{ status }}</div>
      <div class="flex gap-4">
        <Button
          color="default"
          @click="open()"
          class="w-fit"
          :disabled="isOpen"
        >
          Conectar
        </Button>
        <Button
          color="default"
          @click="close()"
          class="w-fit"
          :disabled="!isOpen"
        >
          Desconectar
        </Button>
      </div>
    </div>

    <div class="w-1/2 flex flex-col gap-2 border border-slate-300 rounded-lg p-5">
      <div class="text-sm font-bold">Escribe el sessionId:</div>
      <fwb-input
        v-model="sessionId"
        placeholder="sessionId"
      />
      <div class="flex gap-4">
        <Button
          color="light"
          @click="createSession()"
          class="w-fit"
          :disabled="!isOpen"
        >
          Crear sesion
        </Button>
        <Button
          color="light"
          @click="joinSession()"
          class="w-fit"
          :disabled="!isOpen"
        >
          Iniciar sesion
        </Button>
        <Button
          color="light"
          @click="mobileConnected()"
          class="w-fit"
          :disabled="!isOpen"
        >
          Conectar mobile
        </Button>
      </div>
    </div>
    <div class="w-1/2 flex flex-col gap-2 border border-slate-300 rounded-lg p-5">
      <div>Enviar mensaje</div>
      <fwb-input
        v-model="message"
        placeholder="escribe un mensaje"
      />
      <Button
        color="default"
        @click="sendMessage"
        class="w-fit"
        :disabled="!isOpen"
      >
        Enviar
      </Button>
    </div>
    <h3>Mensajes recibidos:</h3>
    <Button
      color="light"
      class="w-fit"
      size="xs"
      @click="() => (messages = [])"
    >
      Borrar
    </Button>
    <ul class="message-list">
      <li
        v-for="(msg, index) in messages"
        :key="index"
        class="message-item"
      >
        {{ msg }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWebSocket } from '@vueuse/core'
import { FwbInput } from 'flowbite-vue'
import Button from '@/ui/buttons/Button.vue'

// const WS_URL = 'ws://localhost:3000'
const WS_URL = 'wss://66fc-130-41-95-116.ngrok-free.app/'
// const WS_URL = import.meta.env.VITE_WS_URL

const message = ref('')
const messages = ref([])
const sessionId = ref('c4f51e47-1a0f-4301-b662-cca23ab60a20')

const { status, data, send, open, close, ws } = useWebSocket(WS_URL, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      addMessage('⚠️ Error: No se pudo reconectar al servidor', 'error')
    }
  },
  onConnected() {
    addMessage('✅ Conexión establecida con el servidor', 'system')
  },
  onDisconnected() {
    addMessage('🔌 Conexión cerrada', 'system')
  },
  onError(ws, event) {
    addMessage(`❌ Error: ${event.message}`, 'error')
  },
  onMessage(ws, event) {
    addMessage(`📩 Recibido: ${event.data}`, 'received')
  }
})

const isOpen = computed(() => status.value === 'OPEN')

const addMessage = (content, type) => {
  messages.value.push({
    content,
    type,
    timestamp: new Date().toLocaleTimeString()
  })
}

const sendMessage = () => {
  if (message.value.trim() && isOpen.value) {
    let payload = JSON.stringify({
      type: 'message',
      message: message.value,
      sessionId: sessionId.value
    })
    console.log('send message: ', payload)

    send(payload)
    addMessage(`📤 Enviado: ${message.value}`, 'sent')
    message.value = ''
  }
}

const createSession = () => {
  let payload = JSON.stringify({
    type: 'create-session',
    token: sessionId.value
  })
  send(payload)
  addMessage('Crear session', 'sent')
  message.value = ''
}

const joinSession = () => {
  let payload = JSON.stringify({
    type: 'join-session',
    sessionId: sessionId.value
  })
  send(payload)
  addMessage('Iniciar session', 'sent')
  message.value = ''
}

const mobileConnected = () => {
  let payload = JSON.stringify({
    type: 'mobile-connected',
    sessionId: sessionId.value
  })
  send(payload)
  console.log('mobileConnected', payload)
}
</script>
