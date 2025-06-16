<template>
  <Title>
    <div class="flex gap-2 items-center">
      <div v-show="isAdminSessions">Sesiones</div>
      <div v-show="!isAdminSessions">Información de la sesión</div>
    </div>
  </Title>
  <router-view />
  <FilterBar
    v-show="isAdminSessions"
    v-model:searchCriteria="searchCriteria"
    v-model:initDate="initDate"
    v-model:endDate="endDate"
    @filter="mutate"
  />
  <EasyDataTable
    v-show="isAdminSessions"
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

const isAdminSessions = computed(() => route.name === 'admin.sessions')

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
    name: 'admin.session',
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

<style lang="css">
.customize-table {
  border-radius: 0.5rem;
  overflow: hidden;

  --easy-table-header-font-size: 13px;
  --easy-table-header-background-color: #f9fafb;
  --easy-table-header-item-padding: 12px 10px;
  --easy-table-body-item-padding: 12px 15px;
}

.customize-table tbody tr {
  cursor: pointer;
}
</style>
