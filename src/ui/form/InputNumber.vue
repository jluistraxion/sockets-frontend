<template>
  <fwb-input
    :label
    :placeholder
    :size
    v-model="localValue"
    type="number"
    :validation-status="errorMessage ? 'error' : ''"
    :disabled="loading"
    label-class="dark:text-white"
    :min="min"
    :max="max"
    :step="step"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import { FwbInput } from 'flowbite-vue'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'sm'
  },
  placeholder: {
    type: String,
    default: ''
  },
  icon: {
    type: String
  },
  name: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  },
  min: Number,
  max: Number,
  step: Number
})

const { value, errorMessage } = useField(props.name, {}, { initialValue: null, syncVModel: true })

const localValue = computed({
  get: () => {
    return value.value !== null && value.value !== undefined ? String(value.value) : ''
  },
  set: (val) => {
    value.value = Number(val)
  }
})
</script>
