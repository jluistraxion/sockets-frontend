<template>
  <div class="bg-slate-50 h-screen flex items-center justify-center">
    <Card class="w-96 p-4">
      <div class="flex flex-col gap-3">
        <div class="font-bold text-2xl">¡Bienvenido!</div>
        <Input
          label="Usuario"
          size="sm"
          icon="bi bi-person-circle"
          placeholder="Escribe tu usuario"
        />
        <Input
          label="Contraseña"
          size="sm"
          icon="bi bi bi-key"
          placeholder="Escribe tu contraseña"
          type="password"
        />

        <Button color="green"> Iniciar sesión </Button>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/ui/cards/Card.vue'
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
</script>
