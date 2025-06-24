<template>
  <div ref="donutChart" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import ApexCharts from 'apexcharts'

const props = defineProps({
  series: { type: Array, required: true },
  labels: { type: Array, required: true },
  colors: { type: Array, default: ['#4F46E5', '#10B981', '#F59E0B', '#A855F7'] },
  height: { type: Number, default: 320 }
})

const donutChart = ref()
const chart = ref(null)

const getChartOptions = () => {
  return {
    series: props.series,
    labels: props.labels,
    colors: props.colors,
    chart: {
      height: props.height,
      width: '100%',
      type: 'donut'
    },
    stroke: {
      colors: ['transparent'],
      lineCap: ''
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: 20
            },
            total: {
              showAlways: true,
              show: true,
              label: 'Total',
              fontFamily: 'Inter, sans-serif',
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
                return sum
              }
            },
            value: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: -20,
              formatter: function (value) {
                return value
              }
            }
          },
          size: '80%'
        }
      }
    },
    grid: {
      padding: {
        top: -2
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif'
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value
        }
      }
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    }
  }
}

onMounted(() => {
  const el = donutChart.value
  if (!el) return
  chart.value = new ApexCharts(el, getChartOptions())
  chart.value.render()
})

watch(
  () => props.series,
  (newSeries) => {
    if (chart.value) {
      // chart.value.updateSeries(newSeries)
      chart.value.destroy()
      chart.value = new ApexCharts(donutChart.value, getChartOptions())
      chart.value.render()
    }
  },
  { deep: true }
)
</script>
