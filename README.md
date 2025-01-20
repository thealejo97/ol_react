Este proyecto es una prueba técnica desarrollada en React para gestionar formularios de comerciantes. Incluye funcionalidades como creación, listado y actualización de datos, conectándose a un backend desarrollado con Spring Boot.
# Imagenes

Se añadieron imagenes del funcionamiento del sitio en la ubicacion /example_images

# Requisitos
Para aprovechar todas las funcionalidades de la aplicación, asegúrate de tener ejecutados simultáneamente los siguientes proyectos:

Frontend: Este proyecto en React.
Backend: Proyecto en Spring Boot disponible en http://localhost:8080/api/.
# Ejecución del Proyecto
Backend
Asegúrate de que el backend está configurado correctamente y ejecutándose en el puerto 8080. Este proporciona las API necesarias para la interacción con la aplicación frontend.

# Frontend
Para iniciar el proyecto React:

1. Instala las dependencias:

- npm install
1. Ejecuta la aplicación:

- npm start

La aplicación estará disponible en http://localhost:3000.

# Funcionalidades Principales
Creación de comerciantes: Permite agregar comerciantes con información detallada, como nombre, departamento, ciudad, teléfono y establecimientos asociados.
Listado de comerciantes: Muestra una tabla interactiva con los datos de los comerciantes registrados.
Actualización de comerciantes: Permite modificar la información de comerciantes existentes.
Exportación de datos: Genera y descarga un archivo CSV con información relevante.

# Notas Importantes

Es recomendado ejecutar el backend y frontend de forma simultánea para garantizar el correcto funcionamiento de todas las funcionalidades.
Las APIs del backend están diseñadas para ejecutarse en http://localhost:8080/api/. Si se cambia la configuración del backend, asegúrate de actualizar las URLs correspondientes en el archivo conf de configuración del frontend.

# Tecnologías Utilizadas
* Frontend
React: Biblioteca principal para el desarrollo de la interfaz.
CSS: Para el diseño y estilos del proyecto.
Fetch API: Para el manejo de solicitudes HTTP.
* Backend
Spring Boot: Framework utilizado para construir las APIs RESTful.
Base de datos: Configuración del backend para gestionar datos persistentes.