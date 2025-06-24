<template>
  <div class="relative">
    <fwb-select
      :label
      :placeholder
      :size
      v-model="value"
      :options
      :validation-status="errorMessage ? 'error' : ''"
      :disabled="loading"
      label-class="text-white"
    />
    <button
      v-if="value && canClear"
      type="button"
      class="absolute top-8 right-8 text-gray-500 hover:text-slate-500 cursor-pointer text-lg"
      @click="value = ''"
    >
      &times;
    </button>
  </div>
</template>

<script setup>
import { FwbSelect } from 'flowbite-vue'
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
    default: '- Selecciona una opción -'
  },
  name: {
    type: String
  },
  options: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  canClear: {
    type: Boolean,
    default: false
  }
})

// const options = [{ value: 'us', name: 'United States' }]

const model = defineModel()

const { value, errorMessage } = useField(
  props.name,
  {},
  { initialValue: model.value, syncVModel: true }
)
</script>
