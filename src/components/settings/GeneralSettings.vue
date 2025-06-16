<template>
  <div class="grid grid-cols-3">
    <div>
      <img
        src="@/assets/home-preview.png"
        class="w-96"
      />
      <span>*Imagen de referencia</span>
    </div>
    <div class="col-span-2 flex flex-col gap-4">
      <div class="grid grid-cols-5 gap-2">
        <div class="col-span-3">
          <Input
            label="Logo"
            placeholder="https://www.bazsolicitudunica.com.mx/assets/logos/logo.svg"
            size="sm"
          />
        </div>
        <Input
          label="Ancho del logo (px)"
          placeholder="260"
          size="sm"
        />
        <Input
          label="Alto del logo (px)"
          placeholder="60"
          size="sm"
        />
      </div>
      <fieldset class="border border-slate-300 rounded-lg p-4">
        <legend class="px-2">Texto 1:</legend>
        <div class="grid grid-cols-4 gap-2">
          <div class="col-span-4">
            <Input
              label="Título"
              placeholder="Escanea el código QR"
              size="sm"
            />
          </div>
          <Input
            label="Tamaño letra (px)"
            placeholder="22"
            size="sm"
          />
          <Input
            label="Color letra"
            placeholder="22"
            size="sm"
          />
          <Input
            label="Tipo de letra"
            placeholder="22"
            size="sm"
          />
          <Input
            label="Letra negrita"
            placeholder="22"
            size="sm"
          />
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import Input from '@/ui/form/Input.vue'
</script>
