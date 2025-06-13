<template>
  <div class="flex flex-col gap-8">
    <Title>
      <div class="flex gap-2 items-center">
        <div>Sesiones</div>
        <span
          v-show="$route.name === 'admin.session'"
          class="text-base"
        >
          >
        </span>
        <div v-show="$route.name === 'admin.session'">Información de la sesión</div>
      </div>
    </Title>
    <router-view />
    <EasyDataTable
      v-show="$route.name === 'admin.sessions'"
      :headers="headers"
      :items="data || []"
      :loading="isPending"
      table-class-name="customize-table"
      theme-color="#17a54d"
      @click-row="showRow"
    />
  </div>
</template>

<script setup>
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import Title from '@/ui/content/Title.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter()

const { mutate, data, isPending } = useMutation({
  mutationFn: () =>
    api.post(`${API_URL}/getoperaciones`, {
      fechainicio: '2025-01-01T00:00:00Z',
      fechafinal: '2025-12-31T23:59:59Z'
    }),
  onError: (error) => {
    console.log('error')
  }
})

mutate()

const headers = [
  { text: 'Uuid', value: 'uuid', sortable: true },
  { text: 'Registro', value: 'fecharegistro', sortable: true },
  { text: 'Tipo flujo', value: 'tipoflujo', sortable: true },
  { text: 'Motor', value: 'motorutilizado', sortable: true }
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
