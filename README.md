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


### Build Image Docker y Despliegue en AWS Mac
5. Push aws

6. Recupere un token de autenticación y autentique su cliente de Docker en el registro. Use AWS CLI:
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 613850648583.dkr.ecr.us-east-1.amazonaws.com
```
7. Nota: Si recibe un error al utilizar AWS CLI, asegúrese de tener instaladas las últimas versiones de AWS CLI y Docker.
8. Cree una imagen de Docker con el siguiente comando. Para obtener información sobre cómo crear un archivo de Docker desde cero, consulte las instrucciones aquí . Puede omitir este paso si ya se creó la imagen:
```
docker build -t identidaddigital/frontend .
docker buildx build --platform linux/amd64  -t identidaddigital/frontend .
```
9. Cuando se complete la creación, etiquete la imagen para poder enviarla a este repositorio:
```
docker tag identidaddigital/frontend:latest 613850648583.dkr.ecr.us-east-1.amazonaws.com/identidaddigital/frontend:latest
```
10. Ejecute el siguiente comando para enviar esta imagen al repositorio de AWS recién creado:
```
docker push 613850648583.dkr.ecr.us-east-1.amazonaws.com/identidaddigital/frontend:latest
```
### Creación imagen docker para despliegue local Mac - Windows
11. Genera el image de docker
```
docker build -t mi-app-node .
```
12. Ejecuta la imagen de docken en el puerto 2025 escuchando el puerto 2025 del proyecto
```
docker run -d -p 443:443 --name mi-app mi-app-node
```
docker buildx build --no-cache --platform linux/amd64  -t identidaddigital/frontend .
