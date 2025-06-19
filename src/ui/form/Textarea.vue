<template>
  <fwb-textarea
    v-model="value"
    :rows
    :label
    :placeholder
    :disabled="loading"
  />
</template>

<script setup>
import { FwbTextarea } from 'flowbite-vue'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  rows: {
    type: String,
    default: '2'
  },
  placeholder: {
    type: String,
    default: ''
  },
  name: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const model = defineModel()

const { value } = useField(props.name, {}, { initialValue: model.value, syncVModel: true })
</script>
