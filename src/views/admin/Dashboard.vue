<template>
  <div class="flex items-start justify-between">
    <Title>Dashboard</Title>
    <FilterBar
      v-model:idusuario="idusuario"
      v-model:initDate="initDate"
      v-model:endDate="endDate"
      @filter="mutate"
    />
  </div>
  <div class="grid grid-cols-3 gap-4 mt-5">
    <TwCard title="Número de operaciones">
      <DonutChartSkeleton v-if="isPending" />
      <DonutChart
        v-else
        :series="getSeries('totalOperaciones')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :loading="isPending"
      />
    </TwCard>
    <TwCard title="Operaciones Incode">
      <DonutChartSkeleton v-if="isPending" />
      <DonutChart
        v-else
        :series="getSeries('totalOperacionesIncode')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#A855F7', '#F59E0B']"
        :loading="isPending"
      />
    </TwCard>
    <TwCard title="Operaciones Microblink">
      <DonutChartSkeleton v-if="isPending" />
      <DonutChart
        v-else
        :series="getSeries('totalOperacionesMicroblink')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#FF6363', '#67AE6E']"
        :loading="isPending"
      />
    </TwCard>
  </div>
  <div class="grid grid-cols-3 gap-4 mt-5">
    <TwCard title="Operaciones Duales">
      <DonutChartSkeleton v-if="isPending" />
      <DonutChart
        v-else
        :series="getSeries('totalOperacionesDuales')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#fc6cb6', '#5e32b5']"
        :loading="isPending"
      />
    </TwCard>
    <TwCard title="Operaciones Independientes">
      <DonutChartSkeleton v-if="isPending" />
      <DonutChart
        v-else
        :series="getSeries('totalOperacionesIndependientes')"
        :labels="['Concluidas', 'Inconclusas']"
        :height="270"
        :colors="['#1bc484', '#47d5c7']"
        :loading="isPending"
      />
    </TwCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { currentDate, subtractDays, formatDate } from '@/utils/date'
import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify'
import Title from '@/ui/content/Title.vue'
import DonutChart from '@/ui/charts/DonutChart.vue'
import TwCard from '@/ui/cards/TwCard.vue'
import DonutChartSkeleton from '@/ui/skeletons/DonutChartSkeleton.vue'
import FilterBar from '@/components/dashboard/FilterBar.vue'
import api from '@/api/api'

const API_URL = import.meta.env.VITE_API_URL

const initDate = ref(subtractDays(2))
const endDate = ref(currentDate())
const idusuario = ref()

const { mutate, data, isPending } = useMutation({
  mutationFn: () =>
    api.post(`${API_URL}/obtieneestadisticas`, {
      fechainicio: formatDate(initDate.value, 'YYYY-MM-DD', 'MMYYYY'),
      fechafinal: formatDate(endDate.value, 'YYYY-MM-DD', 'MMYYYY'),
      idusuario: idusuario.value
    }),
  onError: () => toast.error('Ocurrió un error.')
})

mutate()

const getSeries = (value) => {
  if (!data.value) return []
  return [data.value[value].operacionesConcluidas, data.value[value].operacionesInconclusas]
}
</script>
