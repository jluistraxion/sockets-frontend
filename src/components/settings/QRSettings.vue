<template>
  <Form
    ref="form"
    v-slot="{ meta, values }"
    @submit="handleSubmit"
    :validation-schema="schema"
    @invalid-submit="onInvalidSubmit"
  >
    <div class="grid grid-cols-3 gap-4">
      <div>
        <img
          src="@/assets/home-preview.png"
          class="w-96 h-[70vh]"
        />
        <span>*Imagen de referencia</span>
      </div>
      <div class="col-span-2 flex flex-col gap-4 overflow-auto">
        <div class="grid grid-cols-3 gap-2">
          <Input
            label="Color spinner"
            placeholder="#17a54d"
            name="spinner.color"
            type="color"
          />
          <Input
            label="Color del fondo central"
            placeholder="#FFF"
            name="fondocentral.backgroundColor"
            type="color"
          />
          <Input
            label="Color del fondo general"
            placeholder="#278252"
            name="fondogeneral.backgroundColor"
            type="color"
          />
        </div>
        <fieldset class="border border-slate-300 rounded-lg p-4">
          <legend class="px-2">Logo:</legend>
          <div class="grid grid-cols-6 gap-2">
            <div class="col-span-4">
              <Input
                label="Logo"
                placeholder="https://www.bazsolicitudunica.com.mx/assets/logos/logo.svg"
                name="logo.url"
              />
            </div>
            <Input
              label="Ancho (px)"
              placeholder="260"
              name="logo.width"
            />
            <Input
              label="Alto (px)"
              placeholder="60"
              name="logo.height"
            />
          </div>
        </fieldset>
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
import { computed, ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const form = ref()

const schema = {
  logo: { url: 'required' }
}

const { data: settings } = useQuery({
  queryKey: ['qr-settings', route.params.id],
  queryFn: () => api.post(`${API_URL}/getconfiguraciones`, { idusuario: route.params.id }),
  enabled: computed(() => !!route.params.id),
  select: (data) => data.find((e) => e.idparametro === 1).valores
})

const handleSubmit = (values) => {
  console.log('handleSubmit', values)
}

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log('onInvalidSubmit', values, errors, results)
}

watch(
  () => [form.value, settings.value],
  ([formInstance, settingsData]) => {
    if (formInstance && settingsData) {
      form.value.resetForm({ values: settingsData })
    }
  },
  { immediate: true, deep: true }
)
</script>
