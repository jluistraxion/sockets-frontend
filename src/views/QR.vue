<template>
  <div
    class="h-screen flex justify-center"
    :style="{
      backgroundColor: config?.fondogeneral.backgroundColor || '#21232de6'
    }"
  >
    <div
      class="w-96 rounded-lg flex flex-col gap-4 items-center py-2"
      :style="{
        backgroundColor: config?.fondocentral.backgroundColor || '#FFF'
      }"
    >
      <div
        v-show="isLoading"
        class="animate-pulse h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-48"
      />
      <img
        v-show="!isLoading"
        :src="config?.logo.url"
        :style="{
          maxWidth: config?.logo.width || '24px',
          maxHeight: config?.logo.height || '24px'
        }"
      />
      <div
        :style="{
          fontSize: config?.texto1.fontSize || '24px',
          textColor: config?.texto1.textColor || '#000',
          fontFamily: config?.texto1.fontFamily || 'arial',
          fontWeight: config?.texto1.fontWeight || 'normal'
        }"
      >
        {{ config?.texto1.text }}
      </div>
      <div
        :style="{
          fontSize: config?.texto2.fontSize || '24px',
          textColor: config?.texto2.textColor || '#000',
          fontFamily: config?.texto2.fontFamily || 'arial',
          fontWeight: config?.texto2.fontWeight || 'normal'
        }"
      >
        {{ config?.texto2.text }}
      </div>
      <div>
        <qrcode-vue
          :value="config?.qr.url"
          :size="200"
          level="H"
          render-as="svg"
        />
      </div>
      <div
        class="flex flex-col gap-2 items-center justify-center absolute bottom-0 mb-6"
      >
        <Spinner :color="config?.spinner.color" />
        <div
          :style="{
            fontSize: config?.texto3.fontSize || '24px',
            textColor: config?.texto3.textColor || '#000',
            fontFamily: config?.texto3.fontFamily || 'arial',
            fontWeight: config?.texto3.fontWeight || 'normal'
          }"
        >
          {{ config?.texto3.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Spinner from '@/ui/spinner/Spinner.vue'

const route = useRoute()
const config = ref(null)
const isLoading = ref(false)

const fetchData = async (id) => {
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:3002/configuracion')
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json()
    console.log('response', json)
    config.value = json.data[0].estilos
  } catch (error) {
    console.log('error', error)
  } finally {
    isLoading.value = false
  }
}

watch(() => route.params.id, fetchData, { immediate: true })
</script>
