<template>
  <div class="grid grid-cols-3">
    <div>
      <img
        src="@/assets/home-preview.png"
        class="w-96"
      />
      <span>*Imagen de referencia</span>
    </div>
    <div class="col-span-2">
      <Input
        label="Logo"
        placeholder="https://www.bazsolicitudunica.com.mx/assets/logos/logo.svg"
      />
    </div>
  </div>
</template>

<script setup>
import Input from '@/ui/form/Input.vue'
</script>
