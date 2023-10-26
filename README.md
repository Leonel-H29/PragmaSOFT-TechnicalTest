# PragmaSOFT Technical Test

![image](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/4a28413c-6545-4d3a-884e-09abc29378ef)

_Prueba técnica para la empresa PragmaSOFT_: Esta prueba consiste en crear una aplicacion web o de escritorio que le permita al usuario poder conectarse a una base de datos ingresando las credenciales de estas mismas. Es decir:

- HOST
- PORT
- DATABASE_NAME
- USER
- PASSWORD

Una vez que el usuario se logueo podra realizar diferentes operaciones (`GET`,`POST`,`PUT` y `DELETE`) sobre una base de datos que almacena datos relacionos a series.

Requisitos:

- Requerimientos funcionales del programa Administrador de Series:

  - Pantalla de conexión a la base de datos, que permita ingresar: Servidor Host, puerto, base de datos, usuario y contraseña.
  - Pantalla AdministradorSeries: ABM y consulta.

    - Botón "Nuevo": todos los campos son requeridos.

      - Lista de datos:

        - **Título (varchar).**
        - **Descripción (text).**
        - **Fecha de estreno (date).**
        - **Estrellas (entero).**
        - **Género (varchar) (lista de opciones).**
        - **Precio Alquiler (decimal).**
        - **ATP (boolean).**
        - **Estado (varchar 2).**

    - Botón "Modificar: permite la visualización y modificación de registro.
    - Anulación: validación y mensaje de confirmación,
    - Eliminación: mensaje de confirmación y eliminación del registro seleccionado.
    - Botón "Consultar": consulta en base de datos y actualiza los registros en la grilla.
    - Botón "Salir".

## Tecnologías Utilizadas

[![Python](https://img.shields.io/badge/Python-3.10.4-3776AB?style=for-the-badge&logo=Python)](https://www.python.org/)

[![Docker](https://img.shields.io/badge/Docker-24.0.2-2496ED?style=for-the-badge&logo=Docker)](https://docs.docker.com/get-started/overview/)

[![DRF](https://img.shields.io/badge/DRF-3.14.0-BA0C2F?style=for-the-badge&logo=Django)](https://www.django-rest-framework.org/)

[![Angular](https://img.shields.io/badge/Angular-16.2.10-BA0C2F?style=for-the-badge&logo=Angular)](https://angular.io/)

- **Backend**: Django Rest Framework
- **Frontend**: Angular
- **Base de datos**: Postgres

- **Herramientas adicionales**: Docker (Contenedores de Nginx, PgAdmin4 y Postgres)

## Configuración del Proyecto

## Clonación del proyecto

Clonar un repositorio es una forma común de obtener una copia local de un proyecto alojado en un sistema de control de versiones, como Git. A continuación, se explican las diferentes formas de clonar un repositorio en función de las opciones disponibles:

### 1. Clonar con HTTPS:

Puedes clonar un repositorio utilizando la URL HTTPS proporcionada por el servicio de alojamiento. Utiliza el siguiente comando de Git:

```bash
git clone https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest.git
```

### 2. Clonar con SSH:

Si has configurado una clave SSH y la has agregado a tu cuenta del servicio de alojamiento, puedes clonar utilizando la URL SSH. Utiliza el siguiente comando de Git:

```bash
git clone git@github.com:Leonel-H29/PragmaSOFT-TechnicalTest.git
```

### 3. Clonar con GitHub CLI:

Si has instalado la CLI de GitHub (GitHub CLI) en tu sistema, puedes utilizar su comando `gh repo clone` para clonar un repositorio de GitHub. Ejecuta el siguiente comando:

```bash
gh repo clone Leonel-H29/PragmaSOFT-TechnicalTest
```

### 4. Clonar desde otro servicio de alojamiento:

Si el repositorio está alojado en un servicio de alojamiento diferente a GitHub, como GitLab o Bitbucket, deberás utilizar la URL y los comandos específicos proporcionados por ese servicio.

### 5. Clonar en una ubicación específica:

Por defecto, Git clonará el repositorio en un directorio con el mismo nombre que el repositorio. Si deseas clonar en una ubicación específica, puedes agregar el nombre del directorio como último argumento en el comando. Por ejemplo:

```bash
git clone https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest.git directorio-destino
```

Estas son algunas de las formas más comunes de clonar un repositorio, dependiendo del servicio de alojamiento y las preferencias de autenticación. Elige el método que mejor se adapte a tu caso y comienza a trabajar con el repositorio en tu entorno local.

### Backend (Django REST FRAMEWOK)

1. Navega al directorio `server/`.
2. Crea un archivo `prod.env` con la configuración necesaria:

**Variables de entorno de la base de datos Postgres:**

- `DB_NAME`: Nombre de la base de datos utilizada por el proyecto.
- `DB_USER`: Nombre de usuario para acceder a la base de datos.
- `DB_PASSWORD`: Contraseña del usuario de la base de datos.
- `DB_HOST`: Dirección o nombre de host de la base de datos.
- `DB_PORT`: Puerto en el que se ejecuta la base de datos.

**Variables de entorno de la aplicación Django:**

- `SECRET_KEY`: Clave secreta utilizada por Django para la generación de tokens y la protección de datos sensibles.

**Variables de entorno de la API REST:**

- `API_HOST`: Host o dirección de la API REST.
- `API_PORT`: Puerto en el que se ejecuta la API REST.

**Variables de entorno para PgAdmin:**

- `PGADMIN_DEFAULT_EMAIL`: Correo electrónico del usuario administrador de PgAdmin.
- `PGADMIN_DEFAULT_USERNAME`: Nombre de usuario del usuario administrador de PgAdmin.
- `PGADMIN_DEFAULT_PASSWORD`: Contraseña del usuario administrador de PgAdmin.

3. Ejecuta los siguientes comandos:

```bash
docker-compose -f "docker-compose.yml" up -d --build
```

4. Comprobar que los contenedores esten corriendo con el siguiente comando

```bash
docker ps
```

_Ejemplo de resultado_

```
CONTAINER ID   IMAGE                  COMMAND                  CREATED         STATUS         PORTS                                                                      NAMES
565ca9da5f3d   nginx:1.0              "/docker-entrypoint.…"   8 seconds ago   Up 7 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   nginx
40465aac4c19   dpage/pgadmin4         "/entrypoint.sh"         8 seconds ago   Up 7 seconds   443/tcp, 0.0.0.0:5050->80/tcp, :::5050->80/tcp                             pg_admin
3f14dad1a9f9   backend:1.0            "sh ./scripts-sh/doc…"   8 seconds ago   Up 7 seconds   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp                                  backend_pragma
638138f290fe   postgres:13.3-alpine   "docker-entrypoint.s…"   8 seconds ago   Up 8 seconds   0.0.0.0:5430->5432/tcp, :::5430->5432/tcp                                  db_postgres
```

5. Si los contenedores se han levantado correctamente, puede dirigirse a

- `http://localhost/api/`: Para ingresar a la interfaz grafica de la API de Django Rest Framework

![Captura desde 2023-10-25 14-23-03](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/c6c4b340-8d45-4c83-8a07-1eb82d17f7a5)

- `http://localhost/pgadmin4/`: Para ingresar al administrador de base de datos de Postgres

![Captura desde 2023-10-25 14-25-33](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/84313a40-6914-4acf-8a40-29e19444163e)

### Endpoints de la API

| URI                    | METHOD | DESCRIPCION                      | TOKEN REQUIRED |
| :--------------------- | :----: | :------------------------------- | :------------- |
| /api/login             |  GET   | Inicio de sesion                 | NO             |
| /api/series/           |  GET   | Obtener la lista de las series   | SI             |
| /api/series/id         |  GET   | Obtener una serie por su id      | SI             |
| /api/series/<Serie>    |  POST  | Dar de alta a una nueva serie    | SI             |
| /api/series/id/<Serie> |  PUT   | Actualizar a una serie existente | SI             |
| /api/series/id         | DELETE | Eliminar una serie existente     | SI             |

#### Autenticación

- **URL**: `http://localhost:8000/api/login/`
- **Método**: `POST`
- **Ejemplo de Cuerpo de la Petición**:

```json
{
  "host": "database",
  "port": 5432,
  "database_name": "postgres",
  "user": "postgres",
  "password": "postgres"
}
```

- **Ejemplo de Cuerpo de la Respuesta**:

```json
[
  {
    "token": "iUzGcBEnovH9tMX1q4CvepIjBK07qQ9gl0KqtAR9",
    "user": "a942b37ccfaf5a813b1432caa209a43b9d144e47ad0de1549c289c253e556cd5",
    "database": "a942b37ccfaf5a813b1432caa209a43b9d144e47ad0de1549c289c253e556cd5"
  }
]
```

Con el valor del `token` el usuario podra autenticarse y realizar cualquier operacion. Hay que tener en cuenta que el valor del `token` puede modificarse por cada consulta que se le haga al servidor.

#### Series

- **URL**: `http://localhost:8000/api/series/`
- **Método**: `GET`
- **Autenticacion**: `Token <token>`
- **Ejemplo de Respuesta**:

```json
[
  {
    "id": 1,
    "titulo": "Ejemplo de Serie 1",
    "descripcion": "Descripción de la serie 1",
    "fecha_estreno": "2023-10-18",
    "estrellas": 4,
    "genero": "Accion",
    "precio_alquiler": 5.99,
    "atp": true,
    "estado": "AC"
  },
  {
    "id": 2,
    "titulo": "Ejemplo de Serie 2",
    "descripcion": "Descripción de la serie 2",
    "fecha_estreno": "2023-10-20",
    "estrellas": 5,
    "genero": "Comedia",
    "precio_alquiler": 7.99,
    "atp": false,
    "estado": "AC"
  }
]
```

#### Crear Nueva Serie

- **URL**: `http://localhost:8000/api/series/`
- **Método**: `POST`
- **Autenticacion**: `Token <token>`
- **Ejemplo de Cuerpo de la Petición**:

```json
{
  "titulo": "Nueva Serie",
  "descripcion": "Descripción de la nueva serie",
  "fecha_estreno": "2023-11-01",
  "estrellas": 4,
  "genero": "Drama",
  "precio_alquiler": 6.99,
  "atp": true,
  "estado": "AC"
}
```

#### Actualizar Serie

- **URL**: `http://localhost:8000/api/series/<ID_SERIE>`
- **Método**: `PUT`
- **Autenticacion**: `Token <token>`
- **Ejemplo de Cuerpo de la Petición**:

```json
{
  "titulo": "Serie Actualizada",
  "descripcion": "Nueva descripción de la serie",
  "fecha_estreno": "2023-11-02",
  "estrellas": 5,
  "genero": "Fantasia",
  "precio_alquiler": 8.99,
  "atp": false,
  "estado": "AN"
}
```

#### Eliminar Serie

- **URL**: `http://localhost:8000/api/series/<ID_SERIE>`
- **Método**: `DELETE`
- **Autenticacion**: `Token <token>`

### Frontend (Angular)

1. Navega al directorio `client/`
2. Ejecuta el siguiente comando para instalar las dependencias

```bash
npm install
```

3. Inicia la aplicación con:

```bash
ng serve
```

El frontend estará disponible en `http://localhost:4200/`. Luego debera dirigirse a `login/`

![Captura desde 2023-10-25 14-35-58](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/03f99196-f6fc-422e-91d0-5eb561a4e3b1)

El usuario debe ingresar los datos configurados en:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

Si los datos son correctos la aplicacion lo redirigira a `admin/` en el cual se mostrara el panel de administracion de la base de datos de series

![Captura desde 2023-10-25 14-37-41](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/3a696382-83ac-4f2d-9025-ab2d6a22da39)

Operaciones

- Dar de alta a una serie

![Captura desde 2023-10-25 14-37-54](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/030ba408-20b0-4947-8d10-48819ee52929)

- Dar de editar a una serie

![Captura desde 2023-10-25 14-38-14](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/125ffc6f-c462-4cd0-84c6-61365c9c17b4)

- Anular a una serie

Implica modificar el estado de 'AC' (Activo) a 'AN' (Inactivo)

![Captura desde 2023-10-25 14-38-25](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/4390a002-6ef8-4d2b-a231-1f41bfdc33af)

![Captura desde 2023-10-25 14-38-32](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/bbbca632-1514-4f0c-9272-571cbcd14f86)

- Eliminar a una serie

![Captura desde 2023-10-25 14-38-51](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/cb4fb34e-b2d2-4e0e-bc69-5d9551bac027)

- Busqueda de registros

Cuando el usuario hace click sobre el boton de buscar le debera aparecer un input que le permita filtrar en tiempo real al registro. Los filtros pueden realizarse por los siguientes campos:

> - Titulo
> - Descripcion
> - Genero
> - Precio de Alquiler
> - Estado

![Captura desde 2023-10-25 15-12-21](https://github.com/Leonel-H29/PragmaSOFT-TechnicalTest/assets/48606307/4623805b-4e63-4444-9062-4d04ac6c1417)

> ## _Aclaraciones_
>
> - El usuario cuando inicia sesion se almacenan los datos del token, el nombre del usuario y el nombre de la base de datos dentro del navegador lo que permitiria certificar que el usuario esta logueado. Cuando el usuario cierra la sesion esos datos son borrados.
> - Para la modificacion, anulacion y eliminacion es necesario: tener al menos un registro en la tabla y seleccionar un solo registro de la tabla.
> - Para la carga y modificacion todos los inputs son requeridos.
> - Una vez que el registro sea anulado no se puede modificar o rebocar su anulacion.
