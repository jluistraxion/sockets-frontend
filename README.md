# Sockets Frontend

1. Clonar el repositorio
2. Instalar dependencias

```
npm install
```

3. Levantar el servidor de desarrollo

```
npm run dev
```

4. Ver el resultado en el navegador

```
http://localhost:2026/
```

## Rutas disponibles

Esta aplicación web utiliza rutas legibles para permitir la navegación directa a diferentes etapas del proceso. A continuación se describen las rutas disponibles y su propósito:

`/healt`

Ruta técnica usada para verificar que el sistema está funcionando correctamente. Puede ser utilizada por servicios externos para monitoreo.

`/home/[ID_OPERACION]`

Página principal del proceso de validación o escaneo asociado al ID de operación proporcionado. Se utiliza para iniciar o continuar una operación específica.

`/incode-scanner/[ID_OPERACION]`

Escáner de documentos que utiliza el sistema Incode. Requiere un ID de operación válido. Esta vista permite al usuario capturar imágenes o documentos.

`/microblink/[ID_OPERACION]`

Escáner de documentos que utiliza tecnología de Microblink. Similar a la ruta anterior, permite capturar documentos usando esta alternativa de proveedor.

`/error`

Muestra un mensaje cuando ocurre un error durante el proceso. Puede deberse a un problema técnico o a un fallo en la operación.

`/success`

Página de confirmación que se muestra cuando el proceso se ha completado exitosamente.

`/timeout`

Ruta que informa al usuario que el tiempo para completar el proceso ha expirado.

> ⚠️ **Nota:** Algunas rutas requieren que el usuario llegue con un `ID_OPERACION` válido generado previamente. Estas rutas no son accesibles directamente sin ese identificador.
