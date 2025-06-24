<template>
  <div ref="lineChart" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ApexCharts from 'apexcharts'

const props = defineProps({
  title: { type: String, default: '' },
  categories: { type: Array, required: true },
  series: { type: Array, required: true },
  colors: { type: Array, default: () => ['#6366F1', '#6DE1D2'] },
  height: { type: Number, default: 320 }
})

const lineChart = ref()

const getChartOptions = () => ({
  chart: {
    type: 'line',
    height: props.height,
    zoom: { enabled: false },
    toolbar: { show: false }
  },
  colors: props.colors,
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    categories: props.categories,
    labels: {
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    fontFamily: 'Inter, sans-serif'
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    theme: 'light'
  },
  series: props.series
})

onMounted(() => {
  const chart = new ApexCharts(lineChart.value, getChartOptions())
  chart.render()
})
</script>
