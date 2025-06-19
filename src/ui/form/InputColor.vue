<template>
  <fwb-input
    :label
    :size
    v-model="value"
    type="color"
    :validation-status="errorMessage ? 'error' : ''"
    :disabled="loading"
    input-class="p-0.5"
    class="p-[3px]"
  />
</template>

<script setup>
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
  name: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const model = defineModel()

const { value, errorMessage } = useField(
  props.name,
  {},
  { initialValue: model.value, syncVModel: true }
)
</script>
