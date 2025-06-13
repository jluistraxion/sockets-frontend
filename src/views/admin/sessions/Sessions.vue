<template>
  <div class="flex flex-col gap-6 border border-slate-50 rounded-lg p-4 bg-white">
    <Title>
      <div class="flex gap-2 items-center">
        <div v-show="isAdminSessions">Sesiones</div>
        <div v-show="!isAdminSessions">Información de la sesión</div>
      </div>
    </Title>
    <router-view />
    <div
      v-show="isAdminSessions"
      class="w-1/8 flex items-end gap-2"
    >
      <Input
        label="Fecha inicio:"
        size="sm"
        type="date"
        v-model="initDate"
      />
      <Input
        label="Fecha fin:"
        size="sm"
        type="date"
        v-model="endDate"
      />
      <Button
        size="xs"
        color="green"
        @click="mutate"
      >
        <div class="flex flex-row items-center gap-1">
          <i class="bi bi-filter text-xl" /> Filtrar
        </div>
      </Button>
    </div>
    <EasyDataTable
      v-show="isAdminSessions"
      :headers="headers"
      :items="data || []"
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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { useRouter, useRoute } from 'vue-router'
import { currentDate, subtractDays, formatDate } from '@/utils/date'
import Title from '@/ui/content/Title.vue'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter()
const route = useRoute()
const initDate = ref(subtractDays(2))
const endDate = ref(currentDate())

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
  console.log('show row', item)
  router.push({
    name: 'admin.session',
    params: { id: `${item.uuid}` }
  })
}
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
