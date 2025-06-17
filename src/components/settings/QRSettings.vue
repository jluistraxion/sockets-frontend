<template>
  <Form
    ref="form"
    v-slot="{ meta, values }"
    @submit="handleSubmit"
    :validation-schema="schema"
    @invalid-submit="onInvalidSubmit"
  >
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
              name="logo.url"
            />
          </div>
          <Input
            label="Ancho del logo (px)"
            placeholder="260"
            name="logo.width"
          />
          <Input
            label="Alto del logo (px)"
            placeholder="60"
            name="logo.height"
          />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <Input
            label="Color spinner"
            placeholder="#17a54d"
            name="spinner.color"
          />
          <Input
            label="Color del fondo central"
            placeholder="#FFF"
            name="fondocentral.backgroundColor"
          />
          <Input
            label="Color del fondo general"
            placeholder="#278252"
            name="fondogeneral.backgroundColor"
          />
        </div>
        <fieldset class="border border-slate-300 rounded-lg p-4">
          <legend class="px-2">Texto 1:</legend>
          <div class="grid grid-cols-4 gap-2">
            <div class="col-span-4">
              <Input
                label="Título"
                placeholder="Escanea el código QR"
                name="texto1.text"
              />
            </div>
            <Input
              label="Tamaño letra (px)"
              placeholder="22"
              name="texto1.fontSize"
            />
            <Input
              label="Color letra"
              placeholder="#FFF"
              name="texto1.textColor"
            />
            <Input
              label="Tipo de letra"
              placeholder="Arial"
              name="texto1.fontFamily"
            />
            <Input
              label="Letra negrita"
              placeholder="22"
              name="texto1.fontWeight"
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
                name="texto2.text"
              />
            </div>
            <Input
              label="Tamaño letra (px)"
              placeholder="14"
              name="texto2.fontSize"
            />
            <Input
              label="Color letra"
              placeholder="#FFF"
              name="texto2.textColor"
            />
            <Input
              label="Tipo de letra"
              placeholder="Arial"
              name="texto2.fontFamily"
            />
            <Input
              label="Letra negrita"
              placeholder="22"
              name="texto2.fontWeight"
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
                name="texto3.text"
              />
            </div>
            <Input
              label="Tamaño letra (px)"
              placeholder="14"
              name="texto3.fontSize"
            />
            <Input
              label="Color letra"
              placeholder="#FFF"
              name="texto3.textColor"
            />
            <Input
              label="Tipo de letra"
              placeholder="Arial"
              name="texto3.fontFamily"
            />
            <Input
              label="Letra negrita"
              placeholder="22"
              name="texto3.fontWeight"
            />
          </div>
        </fieldset>
        <Button
          color="green"
          class="w-fit bg-green-elektra"
        >
          Guardar
        </Button>
      </div>
    </div>
  </Form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Form } from 'vee-validate'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'

const props = defineProps(['settings'])

const form = ref()

const schema = {
  logo: { url: 'required' }
}

const handleSubmit = (values) => {
  console.log('handleSubmit', values)
}

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log('onInvalidSubmit', values, errors, results)
}

watch(
  () => props.settings,
  (newVal) => {
    if (newVal && form.value) {
      form.value.resetForm({ values: newVal })
    }
  },
  { immediate: true, deep: true }
)
</script>
