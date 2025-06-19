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
          label="URL Motor 1"
          placeholder="/path-example"
          name="urlmotor1"
        />
        <Input
          label="URL Motor 2"
          placeholder="/path-example"
          name="urlmotor2"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Input
          label="Frontend URL"
          placeholder="/path-example"
          name="frontendurl"
        />
        <Input
          label="URL Motor Documentos"
          placeholder="/path-example"
          name="urlmotordocumentos"
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
  urlmotor1: 'required',
  urlmotor2: 'required',
  frontendurl: 'required',
  urlmotordocumentos: 'required'
}

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const form = ref()

const { data: settings } = useQuery({
  queryKey: ['path-settings', route.params.id],
  queryFn: () => api.post(`${API_URL}/getconfiguraciones`, { idusuario: route.params.id }),
  enabled: computed(() => !!route.params.id),
  select: (data) => data.find((e) => e.idparametro === 2).valores
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
  const payload = { idusuario: Number(route.params.id), idparametro: 2, valores: values }
  mutate(payload)
}

const onInvalidSubmit = ({ values, errors, results }) => {
  console.warn('onInvalidSubmit', values, errors, results)
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
