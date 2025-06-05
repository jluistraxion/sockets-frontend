<template>
  <div class="container p-4 mx-auto flex flex-col gap-4">
    <div>Cliente WS - {{ status }}</div>
    <div class="flex gap-4">
      <Button
        color="light"
        @click="open()"
        class="w-fit"
      >
        Open
      </Button>
      <Button
        color="light"
        @click="joinSession()"
        class="w-fit"
      >
        Conectar mobile
      </Button>
      <Button
        color="light"
        @click="close()"
        class="w-fit"
      >
        Desconectar
      </Button>
    </div>
    <div class="w-1/2 flex flex-col gap-2 border border-slate-300 rounded-lg p-5">
      <div>Enviar mensaje</div>
      <fwb-input
        v-model="message"
        placeholder="escribe un mensaje"
      />
      <Button
        color="default"
        @click="sendMsg"
        class="w-fit"
        :disabled="!isOpen"
      >
        Enviar
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWebSockets } from '@/composables/useWebSockets'
import { FwbInput } from 'flowbite-vue'
import Button from '@/ui/buttons/Button.vue'

const message = ref()

const { open, status, joinSession, sendMessage, isOpen, close } = useWebSockets()

const sendMsg = () => {
  sendMessage(message.value)
  console.log('mensaje enviado:', message.value)
  message.value = null
}
</script>
