<template>
  <div class="grid grid-cols-3">
    <div>
      <img
        src="@/assets/home-preview.png"
        class="w-96 h-[70vh]"
      />
      <span>*Imagen de referencia</span>
    </div>
    <div class="col-span-2 flex flex-col gap-4 h-[70vh] overflow-auto px-4">
      <div class="grid grid-cols-5 gap-2">
        <div class="col-span-3">
          <Input
            label="Logo"
            placeholder="https://www.bazsolicitudunica.com.mx/assets/logos/logo.svg"
            size="sm"
            name="logo"
          />
        </div>
        <Input
          label="Ancho del logo (px)"
          placeholder="260"
          size="sm"
          name="logo_width"
        />
        <Input
          label="Alto del logo (px)"
          placeholder="60"
          size="sm"
          name="logo_height"
        />
      </div>
      <div class="grid grid-cols-3 gap-2">
        <Input
          label="Color spinner"
          placeholder="#17a54d"
          size="sm"
          name="spinner_color"
        />
        <Input
          label="Color del fondo central"
          placeholder="#FFF"
          size="sm"
          name="bgCentral"
        />
        <Input
          label="Color del fondo general"
          placeholder="#278252"
          size="sm"
          name="bgGeneral"
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
              name="texto1"
            />
          </div>
          <Input
            label="Tamaño letra (px)"
            placeholder="22"
            size="sm"
            name="texto1_fontSize"
          />
          <Input
            label="Color letra"
            placeholder="#FFF"
            size="sm"
            name="texto1_textColor"
          />
          <Input
            label="Tipo de letra"
            placeholder="Arial"
            size="sm"
            name="texto1_fontFamily"
          />
          <Input
            label="Letra negrita"
            placeholder="22"
            size="sm"
            name="texto1_fontWeight"
          />
        </div>
      </fieldset>
      <fieldset class="border border-slate-300 rounded-lg p-4">
        <legend class="px-2">Texto 2:</legend>
        <div class="grid grid-cols-4 gap-2">
          <div class="col-span-4">
            <Input
              label="Título"
              placeholder="Usa la cámara de tu celular"
              size="sm"
              name="texto2"
            />
          </div>
          <Input
            label="Tamaño letra (px)"
            placeholder="14"
            size="sm"
            name="texto2_fontSize"
          />
          <Input
            label="Color letra"
            placeholder="#FFF"
            size="sm"
            name="texto2_textColor"
          />
          <Input
            label="Tipo de letra"
            placeholder="Arial"
            size="sm"
            name="texto2_fontFamily"
          />
          <Input
            label="Letra negrita"
            placeholder="22"
            size="sm"
            name="texto2_fontWeight"
          />
        </div>
      </fieldset>
      <fieldset class="border border-slate-300 rounded-lg p-4">
        <legend class="px-2">Texto 3:</legend>
        <div class="grid grid-cols-4 gap-2">
          <div class="col-span-4">
            <Input
              label="Título"
              placeholder="Continua la verificación en el celular"
              size="sm"
              name="texto3"
            />
          </div>
          <Input
            label="Tamaño letra (px)"
            placeholder="14"
            size="sm"
            name="texto3_fontSize"
          />
          <Input
            label="Color letra"
            placeholder="#FFF"
            size="sm"
            name="texto3_textColor"
          />
          <Input
            label="Tipo de letra"
            placeholder="Arial"
            size="sm"
            name="texto3_fontFamily"
          />
          <Input
            label="Letra negrita"
            placeholder="22"
            size="sm"
            name="texto3_fontWeight"
          />
        </div>
      </fieldset>
      <Button
        color="green"
        class="w-fit"
      >
        Guardar
      </Button>
    </div>
  </div>
</template>

<script setup>
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
</script>
