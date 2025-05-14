<template>
  <div
    class="h-screen flex justify-center"
    :style="{
      backgroundColor: config?.fondogeneral.backgroundColor || '#21232de6'
    }"
  >
    <div
      class="min-w-96 rounded-lg flex flex-col gap-4 items-center py-2 px-6"
      :style="{
        backgroundColor: config?.fondocentral.backgroundColor || '#FFF'
      }"
    >
      <img
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
      <div class="flex flex-col gap-2 items-center justify-center absolute bottom-0 mb-6">
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
import QrcodeVue from 'qrcode.vue'
import Spinner from '@/ui/spinner/Spinner.vue'

defineProps(['config'])
</script>
