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
          label="API Key"
          placeholder="a02644685ee3394d70154fcfa5b2237180e4f6aa"
          name="apiKey"
        />
        <Input
          label="API Url"
          placeholder="https://demo-api.incodesmile.com/0/"
          name="apiURL"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Input
          label="Token Url"
          placeholder="https://demo-api.incodesmile.com/omni/start"
          name="tokenURL"
        />
        <Input
          label="Configuración ID"
          placeholder="67cf42bc1c5dc4846eb8e147"
          name="configurationId"
        />
      </div>
      <div class="grid grid-cols-4 gap-2">
        <Select
          label="Crypto"
          name="crypto"
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
      </div>
      <Button
        color="green"
        class="w-fit bg-green-elektra"
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
  apiKey: 'required',
  apiURL: 'required',
  tokenURL: 'required',
  configurationId: 'required',
  crypto: 'required',
  reintentos: 'required',
  timeout: 'required',
  timedown: 'required'
}

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()
const form = ref()

const { data: settings } = useQuery({
  queryKey: ['incode-settings', route.params.id],
  queryFn: () => api.post(`${API_URL}/getconfiguraciones`, { idusuario: route.params.id }),
  enabled: computed(() => !!route.params.id),
  select: (data) => data.find((e) => e.idparametro === 3).valores
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
  const payload = { idusuario: Number(route.params.id), idparametro: 3, valores: values }
  console.log('handleSubmit', payload)
  mutate(payload)
}

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log('onInvalidSubmit', values, errors, results)
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
        crypto: settingsData.crypto === true ? '1' : '0'
      }
      form.value.resetForm({ values: cleanValues })
    }
  },
  { immediate: true, deep: true }
)
</script>
