<template>
  <Form
    ref="form"
    v-slot="{ meta, values }"
    @submit="handleSubmit"
    :validation-schema="schema"
    @invalid-submit="onInvalidSubmit"
  >
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-5 gap-2">
        <Input
          label="Usuario"
          name="usuario"
          :loading="isFetching"
        />
        <Select
          label="Estatus"
          name="estatus"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'activo' },
            { value: '2', name: 'inactivo' }
          ]"
        />
        <Select
          label="Flujo"
          name="flujo"
          :loading="isFetching"
          :options="[
            { value: '21', name: '21' },
            { value: '22', name: '22' },
            { value: '23', name: '23' },
            { value: '24', name: '24' }
          ]"
        />
        <Select
          label="Tipo de flujo"
          name="tipodeflujo"
          :loading="isFetching"
          :options="[
            { value: 'escritorio', name: 'Escritorio' },
            { value: 'movil', name: 'Móvil' },
            { value: 'automatico', name: 'Automático' }
          ]"
        />
        <Select
          label="Motor preferencia"
          name="motorpreferencia"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'Incode' },
            { value: '2', name: 'Microblink' },
            { value: '3', name: 'Híbrido' }
          ]"
        />
      </div>
      <div class="grid grid-cols-5 gap-2">
        <Select
          label="Usa motor 1"
          name="usamotor1"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'Si' },
            { value: '0', name: 'No' }
          ]"
        />
        <Select
          label="Usa motor 2"
          name="usamotor2"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'Si' },
            { value: '0', name: 'No' }
          ]"
        />
        <Select
          label="Usa motor documentos"
          name="usamotordocumentos"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'Si' },
            { value: '0', name: 'No' }
          ]"
        />
        <Select
          label="Documento"
          name="iddocumento"
          :loading="isFetching"
          :options="[{ value: '1', name: 'INE' }]"
        />
        <Select
          label="País"
          name="pais"
          :loading="isFetching"
          :options="[{ value: '1', name: 'México' }]"
        />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <Input
          label="URL redireccion"
          name="urlredireccion"
          :loading="isFetching"
        />
        <Input
          label="Responsable"
          name="responsable"
          :loading="isFetching"
        />
      </div>
      <Textarea
        label="Comentarios"
        name="comentarios"
        :loading="isFetching"
      />
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
import { useQuery, useMutation } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { Form } from 'vee-validate'
import { toast } from 'vue3-toastify'
import api from '@/api/api'
import Select from '@/ui/form/Select.vue'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
import Textarea from '@/ui/form/Textarea.vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()

const form = ref()

const schema = {
  usuario: 'required',
  tipodeflujo: 'required',
  motorpreferencia: 'required',
  estatus: 'required',
  usamotor1: 'required',
  usamotor2: 'required',
  iddocumento: 'required',
  urlredireccion: 'required',
  usamotordocumentos: 'required'
}

const { data: user, isFetching } = useQuery({
  queryKey: ['user-detail', route.params.id],
  queryFn: () => api.post(`${API_URL}/getusuarios`, { idusuario: route.params.id }),
  enabled: computed(() => !!route.params.id),
  select: (data) => data?.data[0]
})

const { mutate, isPending } = useMutation({
  mutationFn: (payload) => api.put(`${API_URL}/getusuarios`, payload),
  onSuccess: (response) => {
    console.log('success', response)
    toast.success('Actualización realizada con éxito.')
  },
  onError: (error) => {
    console.log('error', error)
  }
})

const handleSubmit = (values) => {
  const payload = { ...values, idusuario: route.params.id }
  delete payload.fechaalta
  delete payload.fechaultimaactualizacion
  mutate(payload)
}

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log('onInvalidSubmit', values, errors, results)
}

watch(
  () => [form.value, user.value],
  ([formInstance, userData]) => {
    if (formInstance && userData) {
      const cleanValues = {
        ...userData,
        iddocumento: String(userData.iddocumento ?? ''),
        pais: String(userData.pais ?? '')
      }
      formInstance.resetForm({ values: cleanValues })
    }
  },
  { immediate: true }
)
</script>
