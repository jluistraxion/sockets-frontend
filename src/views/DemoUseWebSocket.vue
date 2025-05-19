<template>
  <div class="container p-4 mx-auto flex flex-col gap-4">
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
    <div class="w-1/3 flex flex-col gap-2 border border-slate-300 rounded-lg p-5">
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

const WS_URL = 'ws://7682-201-175-225-140.ngrok-free.app'

const message = ref('')
const messages = ref([])

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
    send(message.value)
    addMessage(`📤 Enviado: ${message.value}`, 'sent')
    message.value = ''
  }
}
</script>
