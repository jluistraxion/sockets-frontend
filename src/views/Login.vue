<template>
  <div class="bg-slate-50 h-screen flex items-center justify-center">
    <Card class="w-96 p-6">
      <Form
        @submit="prevSaveOrUpdate"
        :validation-schema="schema"
      >
        <div class="flex flex-col gap-3">
          <div class="font-bold text-2xl">¡Bienvenido!</div>
          <Alert
            v-show="hasError"
            type="warning"
            class="text-center"
          >
            <span>Verifica tu usuario y/o contraseña</span>
          </Alert>
          <Input
            label="Usuario"
            size="sm"
            icon="bi bi-person-circle"
            placeholder="Escribe tu usuario"
            name="user"
            v-model="form.user"
          />
          <Input
            label="Contraseña"
            size="sm"
            icon="bi bi bi-key"
            placeholder="Escribe tu contraseña"
            type="password"
            name="password"
            v-model="form.password"
          />
          <Button color="green"> Iniciar sesión </Button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useAuthStore } from '@/composables/useAuthStore'
import { useRouter } from 'vue-router'
import Card from '@/ui/cards/Card.vue'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
import Alert from '@/ui/alerts/Alert.vue'

const { login } = useAuthStore()
const router = useRouter()

const hasError = ref(false)
const form = ref({
  user: '',
  password: ''
})

const schema = {
  user: 'required',
  password: 'required'
}

const prevSaveOrUpdate = () => {
  const result = login(form.value)
  if (result) {
    hasError.value = false
    router.push('/admin')
  } else {
    hasError.value = true
  }
}
</script>
