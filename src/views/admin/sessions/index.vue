<template>
  <Title> Sesiones </Title>
  <FilterBar
    v-model:searchCriteria="searchCriteria"
    v-model:initDate="initDate"
    v-model:endDate="endDate"
    @filter="mutate"
  />
  <EasyDataTable
    :headers="headers"
    :items="filteredData || []"
    :loading="isPending"
    table-class-name="customize-table"
    theme-color="#17a54d"
    @click-row="showRow"
  >
    <template #item-fecharegistro="{ fecharegistro }">
      {{ formatDate(fecharegistro, 'YYYY-MM-DD', 'DD-MM-YYYY') }}
    </template>
    <template #item-estatuserror="{ estatuserror }">
      {{ estatuserror ?? 'Sin error' }}
    </template>
  </EasyDataTable>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { useRouter, useRoute } from 'vue-router'
import { currentDate, subtractDays, formatDate } from '@/utils/date'
import FilterBar from '@/components/sessions/FilterBar.vue'
import Title from '@/ui/content/Title.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter()
const route = useRoute()
const initDate = ref(subtractDays(2))
const endDate = ref(currentDate())
const searchCriteria = ref('')

const { mutate, data, isPending } = useMutation({
  mutationFn: () =>
    api.post(`${API_URL}/getoperaciones`, {
      fechainicio: `${initDate.value}T00:00:00Z`,
      fechafinal: `${endDate.value}T23:59:59Z`
    }),
  onError: (error) => {
    console.log('error')
  }
})

mutate()

const headers = [
  { text: 'Uuid', value: 'uuid', sortable: true },
  { text: 'Fecha Registro', value: 'fecharegistro', sortable: true },
  { text: 'Tipo flujo', value: 'tipoflujo', sortable: true },
  { text: 'Motor Inicial', value: 'motorutilizado', sortable: true },
  { text: 'Motor Final', value: 'motorfinalutilizado', sortable: true },
  { text: 'Descripción', value: 'descripciongeneral', sortable: true },
  { text: 'Error', value: 'estatuserror', sortable: true }
]

const showRow = (item) => {
  router.push({
    name: 'session',
    params: { id: `${item.uuid}` }
  })
}

const filteredData = computed(() => {
  const criteria = searchCriteria.value.trim().toLowerCase()
  if (!criteria) return data.value || []

  return (data.value || []).filter((item) => {
    return ['uuid', 'tipoflujo', 'descripciongeneral'].some((field) => {
      const value = item[field]
      return value != null && value.toString().toLowerCase().includes(criteria)
    })
  })
})
</script>
