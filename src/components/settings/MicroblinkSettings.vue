<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-2">
      <Input
        label="Dominio"
        placeholder="www.indentidad-digital-ocr-prod.com"
        size="sm"
        name="dominio"
      />
      <Input
        label="Licencia"
        placeholder="sRwCACN3d3cuaW5kZW50aWRhZC1kaWdpdGFsLW9jci1wcm9kLmNvbQZ"
        size="sm"
        name="licenseKey"
      />
    </div>
    <div class="grid grid-cols-4 gap-2">
      <Input
        label="Signature Image"
        placeholder="true"
        size="sm"
        name="signatureImage"
      />
      <Input
        label="Return Face Image"
        placeholder="true"
        size="sm"
        name="returnFaceImage"
      />
      <Input
        label="Save Camera Frames"
        placeholder="true"
        size="sm"
        name="saveCameraFrames"
      />
      <Input
        label="Full Document Image"
        placeholder="true"
        size="sm"
        name="returnFullDocumentImage"
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
