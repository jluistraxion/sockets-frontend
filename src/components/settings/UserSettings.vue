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
            { value: '1', name: 'Móvil' },
            { value: '2', name: 'Escritorio' },
            { value: '3', name: 'Automático' }
          ]"
        />
        <Input
          label="Negocio"
          name="negocio"
          :loading="isFetching"
        />
        <Input
          label="Flujo"
          name="flujo"
          :loading="isFetching"
        />
      </div>
      <div class="grid grid-cols-5 gap-2">
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
          label="Usa motor 1"
          name="usamotor1"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'Si' },
            { value: '2', name: 'No' }
          ]"
        />
        <Select
          label="Usa motor 2"
          name="usamotor2"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'Si' },
            { value: '2', name: 'No' }
          ]"
        />
        <Select
          label="Usa motor documentos"
          name="usamotordocumentos"
          :loading="isFetching"
          :options="[
            { value: '1', name: 'Si' },
            { value: '2', name: 'No' }
          ]"
        />
        <Input
          label="Responsable"
          name="responsable"
          :loading="isFetching"
        />
      </div>
      <div class="grid grid-cols-5 gap-2">
        <Input
          label="ID documento"
          name="iddocumento"
          :loading="isFetching"
        />
        <div class="col-span-2">
          <Input
            label="URL redireccion"
            name="urlredireccion"
            :loading="isFetching"
          />
        </div>
        <Input
          label="Comentarios"
          name="comentarios"
          :loading="isFetching"
        />
        <Input
          label="País"
          name="pais"
          :loading="isFetching"
        />
      </div>
      <Button
        color="green"
        class="w-fit"
      >
        Guardar
      </Button>
    </div>
  </Form>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { Form } from 'vee-validate'
import api from '@/api/api'
import Select from '@/ui/form/Select.vue'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'

const API_URL = import.meta.env.VITE_API_URL
const route = useRoute()

const form = ref()

const schema = {
  usuario: 'required',
  tipodeflujo: 'required'
}

const { data: user, isFetching } = useQuery({
  queryKey: ['user-detail', route.params.id],
  queryFn: () => api.post(`${API_URL}/getusuarios`, { idusuario: route.params.id }),
  enabled: computed(() => !!route.params.id),
  select: (data) => {
    form.value.resetForm({ values: data?.data[0] })
    return data?.data
  }
})

const handleSubmit = (values) => {
  console.log('handleSubmit', values)
}

const onInvalidSubmit = ({ values, errors, results }) => {
  console.log('onInvalidSubmit', values, errors, results)
}
</script>
