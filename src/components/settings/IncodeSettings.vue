<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-2">
      <Input
        label="API Key"
        placeholder="a02644685ee3394d70154fcfa5b2237180e4f6aa"
        size="sm"
        name="apiKey"
      />
      <Input
        label="API Url"
        placeholder="https://demo-api.incodesmile.com/0/"
        size="sm"
        name="apiURL"
      />
    </div>
    <div class="grid grid-cols-2 gap-2">
      <Input
        label="Token Url"
        placeholder="https://demo-api.incodesmile.com/omni/start"
        size="sm"
        name="tokenURL"
      />
      <Input
        label="Configuración ID"
        placeholder="67cf42bc1c5dc4846eb8e147"
        size="sm"
        name="configurationId"
      />
    </div>
    <div class="grid grid-cols-4 gap-2">
      <Input
        label="Crypto"
        placeholder="true"
        size="sm"
        name="crypto"
      />
      <Input
        label="Reintentos"
        placeholder="3"
        size="sm"
        name="reintentos"
      />
      <Input
        label="Tiempo de espera (segundos)"
        placeholder="180"
        size="sm"
        name="timeout"
      />
      <Input
        label="Tiempo antes de redirección (segundos)"
        placeholder="10"
        size="sm"
        name="timedown"
      />
    </div>
    <Button
      color="green"
      class="w-fit"
    >
      Guardar
    </Button>
  </div>
</template>

<script setup>
import Input from '@/ui/form/Input.vue'
import Button from '@/ui/buttons/Button.vue'
</script>
