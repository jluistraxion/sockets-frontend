<template>
  <div class="container p-4 mx-auto flex flex-col gap-4">
    <div>Socket conectado: {{ isConnected }}</div>
    <div class="flex gap-4">
      <Button
        color="default"
        @click="connect"
        class="w-fit"
        :disabled="isConnected"
      >
        Conectar
      </Button>
      <Button
        color="default"
        @click="disconnect"
        class="w-fit"
        :disabled="!isConnected"
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
        :disabled="!isConnected"
      >
        Enviar
      </Button>
    </div>
    <h3>Mensajes recibidos:</h3>
    <ul class="message-list">
      <li
        v-for="(msg, index) in receivedMessages"
        :key="index"
        class="message-item"
      >
        {{ msg }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FwbInput } from 'flowbite-vue'
import Button from '@/ui/buttons/Button.vue'

const WS_URL = 'ws://localhost:3000'
const message = ref()
const socket = ref(null)
const isConnected = ref(false)
const receivedMessages = ref([])

const connect = () => {
  if (socket.value) {
    disconnect()
  }

  socket.value = new WebSocket(WS_URL)

  socket.value.onopen = () => {
    isConnected.value = true
    receivedMessages.value.push('✅ Conexión establecida con el servidor')
  }

  socket.value.onmessage = (event) => {
    receivedMessages.value.push(`📩 Recibido: ${event.data}`)
  }

  socket.value.onerror = (error) => {
    console.error('WebSocket error:', error)
    receivedMessages.value.push('❌ Error en la conexión')
  }

  socket.value.onclose = () => {
    isConnected.value = false
    receivedMessages.value.push('🔌 Conexión cerrada')
  }

  console.log('conectar')
}

const sendMessage = () => {
  console.log('sendMessage')
  if (socket.value && isConnected.value && message.value.trim()) {
    socket.value.send(message.value)
    receivedMessages.value.push(`📤 Enviado: ${message.value}`)
    message.value = ''
  }
}

const disconnect = () => {
  if (socket.value) {
    socket.value.close()
    socket.value = null
  }
}
</script>
