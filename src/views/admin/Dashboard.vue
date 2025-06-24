<template>
  <div class="flex items-start justify-between">
    <Title>Dashboard</Title>
    <div class="flex items-end gap-2">
      <Input
        label="Fecha inicio:"
        size="sm"
        type="date"
        v-model="initDate"
        name="initDate"
      />
      <Input
        label="Fecha fin:"
        size="sm"
        type="date"
        v-model="endDate"
        name="endDate"
      />
      <Button
        size="xs"
        class="bg-green-600 hover:bg-green-700 focus:ring-green-300"
        @click="filter"
      >
        <div class="flex flex-row items-center gap-1">
          <i class="bi bi-filter text-xl" /> Filtrar
        </div>
      </Button>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-4 mt-5">
    <TwCard title="Número de operaciones">
      <DonutChart
        :series="getSeries('totalOperaciones')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
      />
    </TwCard>
    <TwCard title="Operaciones Incode">
      <DonutChart
        :series="getSeries('totalOperacionesIncode')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#A855F7', '#F59E0B']"
      />
    </TwCard>
    <TwCard title="Operaciones Microblink">
      <DonutChart
        :series="getSeries('totalOperacionesMicroblink')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#FF6363', '#67AE6E']"
      />
    </TwCard>
  </div>
  <div class="grid grid-cols-3 gap-4 mt-5">
    <TwCard title="Operaciones Duales">
      <DonutChart
        :series="getSeries('totalOperacionesDuales')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#fc6cb6', '#5e32b5']"
      />
    </TwCard>
    <TwCard title="Operaciones Independientes">
      <DonutChart
        :series="getSeries('totalOperacionesIndependientes')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#1bc484', '#47d5c7']"
      />
    </TwCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { currentDate, subtractDays, formatDate } from '@/utils/date'
import { useMutation } from '@tanstack/vue-query'
import Title from '@/ui/content/Title.vue'
import DonutChart from '@/ui/charts/DonutChart.vue'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
import TwCard from '@/ui/cards/TwCard.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL

const initDate = ref(subtractDays(2))
const endDate = ref(currentDate())

const { mutate, data, isPending } = useMutation({
  mutationFn: () =>
    api.post(`${API_URL}/obtieneestadisticas`, {
      // fechainicio: `${initDate.value}T00:00:00Z`,
      // fechafinal: `${endDate.value}T23:59:59Z`
      fechainicio: '062025',
      fechafinal: '062025'
    }),
  onError: (error) => {
    console.log('error')
  }
})

mutate()

const getSeries = (value) => {
  if (!data.value) return []
  return [data.value[value].operacionesConcluidas, data.value[value].operacionesInconclusas]
}

const filter = () => {
  initDate.value = formatDate(initDate.value, 'YYYY-MM-DD', 'MMYYYY')
  endDate.value = formatDate(endDate.value, 'YYYY-MM-DD', 'MMYYYY')
  mutate()
}
</script>
