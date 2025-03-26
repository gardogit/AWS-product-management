# Product Management App

Esta aplicación permite gestionar productos mediante una API RESTful. Ofrece funcionalidades como crear, obtener, actualizar, eliminar y buscar productos por nombre y categoría. La aplicación está diseñada siguiendo los principios de **Clean Architecture** y utiliza **Serverless Framework** con AWS Lambda.

## Características
- Crear un nuevo producto.
- Obtener todos los productos.
- Obtener un producto por ID.
- Actualizar un producto existente.
- Eliminar un producto existente.
- Buscar productos por nombre y categoría.

## Tecnologías utilizadas
- **Serverless Framework**: Para la implementación de funciones serverless.
- **AWS Lambda**: Para la lógica de negocio.
- **API Gateway**: Para exponer la API REST.
- **MongoDB**: Para el almacenamiento de datos.
- **TypeScript**: Para un código tipado y robusto.
- **Jest**: Para pruebas unitarias.

## Requisitos previos
- Node.js (versión 22.xx.x).
- MongoDB (puedes usar una instancia local o en la nube).
- Serverless Framework instalado globalmente:
  ```bash
  npm install -g serverless
  ```

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/gardogit/AWS-product-management.git
   cd AWS-product-management

   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno en el archivo `.env`:
   ```yaml
     MONGO_URI=<TU_URI_DE_MONGODB>
   ```

4. Configuración de MongoDB
Para ejecutar esta aplicación, necesitas configurar la conexión a una base de datos MongoDB. Esto se hace definiendo la variable de entorno `MONGO_URI` en el archivo `.env` en el directorio raíz. Ejemplo:

```plaintext
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombre_base_datos>?retryWrites=true&w=majority
```

## Ejecución local
Para ejecutar la aplicación localmente, utiliza el plugin `serverless-offline`:
```bash
serverless offline
```
La API estará disponible en `http://localhost:3000`.

## Despliegue en AWS
Para desplegar la aplicación en AWS, ejecuta:
```bash
serverless deploy
```
Esto desplegará las funciones Lambda y configurará el API Gateway.

## Endpoints disponibles
- **POST /products**: Crear un nuevo producto.
- **GET /products**: Obtener todos los productos.
- **GET /products/{id}**: Obtener un producto por ID.
- **PUT /products/{id}**: Actualizar un producto existente.
- **DELETE /products/{id}**: Eliminar un producto existente.
- **GET /products/search?keyword={keyword}**: Buscar productos por nombre o categoría.

## Pruebas
Para ejecutar las pruebas unitarias, utiliza:
```bash
npm test
```

Esto ejecutará todas las pruebas implementadas con Jest.

## Estructura del proyecto
```
├── src
│   ├── application       # Lógica de negocio
│   ├── domain            # Modelos y reglas de negocio
│   ├── handlers          # Funciones Lambda (capa de presentación)
│   ├── infrastructure    # Interacción con MongoDB
│   └── tests             # Pruebas unitarias
├── serverless.yml        # Configuración de Serverless Framework
├── package.json          # Dependencias y scripts
└── README.md             # Documentación
```

## Decisiones de diseño
- **Clean Architecture**: Se implementaron capas separadas para garantizar la mantenibilidad y escalabilidad.
- **MongoDB**: Elegido por su flexibilidad y capacidad para manejar datos no estructurados.
- **Serverless Framework**: Ideal para implementar una arquitectura basada en AWS Lambda.

## Autores
- Edgardo Ruiz - Desarrollador Full Stack

## Notas adicionales
- Asegúrate de que la URI de MongoDB esté correctamente configurada en las variables de entorno.
- Si tienes problemas al ejecutar la aplicación, verifica los logs de las funciones Lambda con:
  ```bash
  serverless logs -f <nombre-de-la-función>
  ```