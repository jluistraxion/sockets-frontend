<template>
  <div class="flex items-end gap-2">
    <Select
      label="Usuario"
      :options="users || []"
      name="idusuario"
      v-model="idusuario"
      :clearable="true"
      class="w-52"
      :canClear="true"
    />
    <Input
      label="Fecha inicio:"
      size="sm"
      type="date"
      v-model="initDate"
      name="fechainicio"
    />
    <Input
      label="Fecha fin:"
      size="sm"
      type="date"
      v-model="endDate"
      name="fechafinal"
    />
    <Button
      size="xs"
      class="bg-green-600 hover:bg-green-700 focus:ring-green-300"
      @click="$emit('filter')"
    >
      <div class="flex flex-row items-center gap-1"><i class="bi bi-filter text-xl" /> Filtrar</div>
    </Button>
  </div>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
import Select from '@/ui/form/Select.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const idusuario = defineModel('idusuario')
const initDate = defineModel('initDate')
const endDate = defineModel('endDate')

defineEmits(['filter'])

const { data: users, isFetching } = useQuery({
  queryKey: ['users'],
  queryFn: () => api.post(`${API_URL}/getusuarios`),
  select: (data) => {
    return data.data.map((e) => ({ value: e.id, name: e.usuario }))
  }
})
</script>
