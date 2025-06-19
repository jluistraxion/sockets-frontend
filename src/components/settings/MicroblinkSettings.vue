<template>
  <Form
    ref="form"
    v-slot="{ meta, values }"
    @submit="handleSubmit"
    :validation-schema="schema"
    @invalid-submit="onInvalidSubmit"
  >
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-2">
        <Input
          label="Dominio"
          placeholder="www.indentidad-digital-ocr-prod.com"
          name="dominio"
        />
        <Input
          label="Licencia"
          placeholder="sRwCACN3d3cuaW5kZW50aWRhZC1kaWdpdGFsLW9jci1wcm9kLmNvbQZ"
          name="licenseKey"
        />
      </div>
      <div class="grid grid-cols-4 gap-2">
        <Select
          label="Signature Image"
          name="signatureImage"
          :options="[
            { value: '1', name: 'Si' },
            { value: '0', name: 'No' }
          ]"
        />
        <Select
          label="Return Face Image"
          name="returnFaceImage"
          :options="[
            { value: '1', name: 'Si' },
            { value: '0', name: 'No' }
          ]"
        />
        <Select
          label="Save Camera Frames"
          name="saveCameraFrames"
          :options="[
            { value: '1', name: 'Si' },
            { value: '0', name: 'No' }
          ]"
        />
        <Select
          label="Full Document Image"
          name="returnFullDocumentImage"
          :options="[
            { value: '1', name: 'Si' },
            { value: '0', name: 'No' }
          ]"
        />
        <Input
          label="Reintentos"
          placeholder="3"
          name="reintentos"
        />
        <Input
          label="Tiempo de espera (segundos)"
          placeholder="180"
          name="timeout"
        />
        <Input
          label="Tiempo antes de redirección (segundos)"
          placeholder="10"
          name="timedown"
        />
        <Input
          label="Tipo"
          placeholder="dev"
          name="tipo"
        />
        <Input
          label="Solución"
          placeholder="inbrowser"
          name="solucion"
        />
      </div>
      <Button
        color="green"
        class="w-fit bg-green-elektra"
        :disabled="isPending"
        :loading="isPending"
      >
        Guardar
      </Button>
    </div>
  </Form>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Form } from 'vee-validate'
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
import Select from '@/ui/form/Select.vue'
import api from '@/api/api'

const schema = {
  dominio: 'required',
  licenseKey: 'required',
  signatureImage: 'required',
  returnFaceImage: 'required',
  returnFullDocumentImage: 'required',
  reintentos: 'required',
  timeout: 'required',
  timedown: 'required'
}

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const form = ref()

const { data: settings } = useQuery({
  queryKey: ['microblink-settings', route.params.id],
  queryFn: () => api.post(`${API_URL}/getconfiguraciones`, { idusuario: route.params.id }),
  enabled: computed(() => !!route.params.id),
  select: (data) => data.find((e) => e.idparametro === 4).valores
})

const { mutate, isPending } = useMutation({
  mutationFn: (payload) => api.put(`${API_URL}/getconfiguraciones`, payload),
  onSuccess: (response) => {
    toast.success('Actualización realizada con éxito.')
  },
  onError: (error) => {
    toast.success('Ocurrió un error al actualizar.')
  }
})

const handleSubmit = (values) => {
  const valores = {
    ...values,
    signatureImage: values.signatureImage === '1' ? true : false,
    returnFaceImage: values.returnFaceImage === '1' ? true : false,
    saveCameraFrames: values.saveCameraFrames === '1' ? true : false,
    returnFullDocumentImage: values.returnFullDocumentImage === '1' ? true : false
  }
  const payload = { idusuario: Number(route.params.id), idparametro: 4, valores }
  mutate(payload)
}

const onInvalidSubmit = ({ values, errors, results }) => {
  console.warn('onInvalidSubmit', values, errors, results)
}

watch(
  () => [form.value, settings.value],
  ([formInstance, settingsData]) => {
    if (formInstance && settingsData) {
      const cleanValues = {
        ...settingsData,
        timeout: String(settingsData.timeout ?? ''),
        reintentos: String(settingsData.reintentos ?? ''),
        timedown: String(settingsData.timedown ?? ''),
        signatureImage: settingsData.signatureImage === true ? '1' : '0',
        returnFaceImage: settingsData.returnFaceImage === true ? '1' : '0',
        saveCameraFrames: settingsData.saveCameraFrames === true ? '1' : '0',
        returnFullDocumentImage: settingsData.returnFullDocumentImage === true ? '1' : '0'
      }
      form.value.resetForm({ values: cleanValues })
    }
  },
  { immediate: true, deep: true }
)
</script>
