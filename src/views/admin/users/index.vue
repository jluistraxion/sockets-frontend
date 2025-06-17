<template>
  <Title>Usuarios</Title>
  <div>
    <Input
      class="w-96"
      label="Buscar"
      size="sm"
      placeholder="Escribe algo para buscar..."
      v-model="searchCriteria"
      name="searchCriteria"
      icon="bi bi-search text-sm"
    />
  </div>
  <EasyDataTable
    :headers="headers"
    :items="filteredData || []"
    :loading="isFetching"
    table-class-name="customize-table"
    theme-color="#17a54d"
    @click-row="(item) => $router.push({ name: 'user', params: { id: `${item.id}` } })"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import Input from '@/ui/form/Input.vue'
import Title from '@/ui/content/Title.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const searchCriteria = ref('')

const headers = [
  { text: 'Id', value: 'id', sortable: true },
  { text: 'Usuario', value: 'usuario', sortable: true },
  { text: 'Negocio', value: 'negocio', sortable: true },
  { text: 'Tipo de Flujo', value: 'tipodeflujo', sortable: true },
  { text: 'Motor de Preferencia', value: 'motorpreferencia', sortable: true }
]

const { data, isFetching } = useQuery({
  queryKey: ['users'],
  queryFn: () => api.post(`${API_URL}/getusuarios`),
  select: (data) => data?.data
})

const filteredData = computed(() => {
  const criteria = searchCriteria.value.trim().toLowerCase()
  if (!criteria) return data.value || []

  return (data.value || []).filter((item) => {
    return ['usuario', 'negocio', 'tipodeflujo'].some((field) => {
      const value = item[field]
      return value != null && value.toString().toLowerCase().includes(criteria)
    })
  })
})
</script>
