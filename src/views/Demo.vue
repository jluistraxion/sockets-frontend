<template>
  <div class="contanier mx-auto p-4 flex flex-col items-center gap-4">
    <img
      src="https://www.bazsolicitudunica.com.mx/assets/logos/logo.svg"
      class="w-60 mb-4"
    />
    <Card title="Incode">
      <div class="flex gap-4">
        <Button
          color="green"
          @click="example"
        >
          Iniciar flujo escritorio
        </Button>
        <Button color="green"> Iniciar flujo Móvil </Button>
      </div>
    </Card>
    <Card title="Microblink">
      <div class="flex gap-4">
        <Button
          color="green"
          @click="example"
        >
          Iniciar flujo escritorio
        </Button>
        <Button color="green"> Iniciar flujo Móvil </Button>
      </div>
    </Card>
    <div class="flex gap-4 mt-4">
      <Button
        color="default"
        @click="$router.push('/qr/1')"
      >
        Mostar QR
      </Button>
      <Button
        color="default"
        @click="$router.push('/microblink')"
      >
        Microblink Scanner
      </Button>
      <Button
        color="default"
        @click="$router.push('/incode-scanner')"
      >
        Incode Scanner
      </Button>
      <Button
        color="default"
        @click="$router.push('/incode-document')"
      >
        Incode Document
      </Button>
    </div>
  </div>
</template>

<script setup>
import Card from '@/ui/cards/Card.vue'
import Button from '@/ui/buttons/Button.vue'
import api from '@/api/api'

const example = async () => {
  try {
    const responseKey = await api.post('getkey', {
      key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmxSZWRpcmVjdCI6ImJyYzlDTjdCM0FmRDJqZW5GVl81VVVMa2NqTTJ1aU9hWUJNcWNBWU9lcWczejdRdFlhaVpyNjRhTXpxeGVOaFAtX29GNkVYdjVrYUVyRTVkUFlDYkN3IiwidXNlciI6Ino3UjVSdUhfeXJBS3VlRFRnLXFUcXciLCJwYXNzIjoic0dPSnQzQktYbTJhQlRfVzlZWFhZdyIsInRpcG9GbHVqbyI6Im5GdXBITFdjRjd6eERxa0o2MEhTaHciLCJtb3RvciI6IjYxSE5pVVdFakZYU2l2b3l0bVNLV1EiLCJpZERvY3VtZW50byI6IjYxSE5pVVdFakZYU2l2b3l0bVNLV1EiLCJpYXQiOjE3NDQ1MzUzNDksImV4cCI6MjEwNDUzNTM0OX0.hqpWp-uBKkmCw_49s-_0DJ4C6-D3191GGZFCpxBTCZc'
    })
    console.log('Respuesta de getkey:', responseKey)

    const responseStatus = await api.post('getstatus', {
      key: responseKey.token
    })
    console.log('Respuesta de getstatus:', responseStatus)
    window.location.href = responseStatus.token
  } catch (error) {
    console.error('Error en la solicitud:', error.message)
  }
}
</script>
