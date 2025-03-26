# Diseño de la Aplicación: Product Management App

Este documento describe la arquitectura de la aplicación, las decisiones de diseño tomadas y las justificaciones para cada decisión. La aplicación está diseñada siguiendo los principios de **Clean Architecture** y utilizando el **Serverless Framework** con AWS.

## 1. Arquitectura de la Aplicación

La arquitectura de la aplicación está basada en **Clean Architecture**, separando responsabilidades en diferentes capas para garantizar mantenibilidad, escalabilidad y facilidad de pruebas. Los principales componentes de la arquitectura son:

### **1.1 Diagrama de Arquitectura**
```
Usuario -> API Gateway -> AWS Lambda -> MongoDB
```

### **1.2 Componentes Principales**
- **API Gateway (Capa de Presentación):**
  - Exposición de la API RESTful.
  - Manejo de rutas para las diferentes operaciones (crear, obtener, actualizar, eliminar y buscar productos).

- **AWS Lambda (Capa de Aplicación):**
  - Implementa la lógica de negocio de la aplicación.
  - Procesa las solicitudes entrantes, interactúa con la base de datos y retorna las respuestas al cliente.

- **MongoDB (Capa de Infraestructura):**
  - Almacenamiento de datos de los productos.
  - Base de datos NoSQL para flexibilidad y escalabilidad.

- **Capas del Proyecto:**
  - **Capa de Presentación:** Maneja la interacción con el usuario a través de la API Gateway.
  - **Capa de Aplicación:** Contiene la lógica de negocio, implementada en funciones Lambda.
  - **Capa de Dominio:** Define los conceptos clave del negocio, como "Producto" y "Categoría".
  - **Capa de Infraestructura:** Interactúa con MongoDB para realizar operaciones CRUD.

## 2. Decisiones de Diseño

### **2.1 Uso de Serverless Framework**
- **Decisión:** Utilizar Serverless Framework para desplegar la aplicación en AWS.
- **Justificación:**
  - Simplifica la gestión de funciones Lambda y otros recursos de AWS.
  - Permite un desarrollo rápido y eficiente con soporte para pruebas locales mediante el plugin `serverless-offline`.
  - Escalabilidad automática gracias a la infraestructura serverless.

### **2.2 Uso de Clean Architecture**
- **Decisión:** Diseñar la aplicación siguiendo los principios de Clean Architecture.
- **Justificación:**
  - Facilita la separación de responsabilidades en capas, mejorando la mantenibilidad y escalabilidad.
  - Permite realizar pruebas unitarias más fácilmente, ya que las dependencias están desacopladas.
  - Mejora la claridad del código al organizarlo en capas bien definidas.

### **2.3 Uso de MongoDB**
- **Decisión:** Utilizar MongoDB como base de datos.
- **Justificación:**
  - Flexibilidad para almacenar datos no estructurados, como productos con diferentes atributos.
  - Escalabilidad horizontal para manejar grandes volúmenes de datos.
  - Integración sencilla con Node.js a través de Mongoose.

### **2.4 Uso de TypeScript**
- **Decisión:** Escribir la aplicación en TypeScript.
- **Justificación:**
  - Mejora la calidad del código mediante tipos estáticos, reduciendo errores comunes.
  - Facilita el mantenimiento y la documentación del código.
  - Compatible con Node.js y Serverless Framework.

### **2.5 Uso de Jest para Pruebas Unitarias**
- **Decisión:** Utilizar Jest para escribir y ejecutar pruebas unitarias.
- **Justificación:**
  - Herramienta ampliamente utilizada en la comunidad de JavaScript/TypeScript.
  - Facilidad para configurar y ejecutar pruebas.
  - Soporte para mocks y pruebas asíncronas, esenciales para probar funciones Lambda y operaciones con MongoDB.

## 3. Detalles Técnicos

### **3.1 Configuración de Variables de Entorno**
- **Decisión:** Utilizar variables de entorno para almacenar la URI de MongoDB.
- **Justificación:**
  - Mejora la seguridad al evitar incluir credenciales sensibles en el código fuente.
  - Facilita la configuración del entorno en diferentes entornos (local, producción, etc.).

### **3.2 Manejo de Errores**
- **Decisión:** Implementar un manejo centralizado de errores en las funciones Lambda.
- **Justificación:**
  - Mejora la experiencia del usuario al proporcionar mensajes de error claros.
  - Evita que errores no controlados detengan la ejecución de las funciones.

### **3.3 Diseño de Endpoints**
- **Decisión:** Diseñar una API RESTful con endpoints bien definidos.
- **Justificación:**
  - Facilita la interacción con la aplicación desde cualquier cliente HTTP.
  - Sigue estándares ampliamente aceptados para el diseño de APIs.

### **3.4 Organización del Código**
- **Decisión:** Organizar el código en carpetas según las capas de Clean Architecture.
- **Justificación:**
  - Mejora la claridad y la organización del proyecto.
  - Facilita la navegación y el mantenimiento del código.

## 4. Pruebas Unitarias

Se implementaron pruebas unitarias para garantizar la calidad del código. Las principales áreas cubiertas son:
- Validación de datos entrantes (por ejemplo, formato del ID o campos requeridos).
- Manejo de errores (por ejemplo, producto no encontrado, conexión fallida a MongoDB).
- Funcionalidades principales (crear, obtener, actualizar, eliminar, buscar productos).

## 5. Escalabilidad

La aplicación está diseñada para ser escalable gracias a:
- **Serverless Framework:** Escalabilidad automática de funciones Lambda según la demanda.
- **MongoDB:** Escalabilidad horizontal para manejar grandes volúmenes de datos.
- **Clean Architecture:** Facilita la adición de nuevas funcionalidades sin afectar las existentes.

## 6. Conclusión

La arquitectura y las decisiones de diseño de esta aplicación están orientadas a garantizar:
- **Mantenibilidad:** Separación de responsabilidades y uso de TypeScript.
- **Escalabilidad:** Uso de Serverless Framework y MongoDB.
- **Calidad:** Uso de pruebas unitarias y principios de Clean Architecture.

Este diseño asegura que la aplicación sea robusta, fácil de mantener y preparada para manejar futuros requerimientos.