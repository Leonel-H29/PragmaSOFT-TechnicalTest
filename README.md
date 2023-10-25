# PragmaSOFT Technical Test

_Prueba técnica para la empresa PragmaSOFT_: Esta prueba consiste en crear una aplicacion web o de escritorio que le permita al usuario poder conectarse a una base de datos ingresando las credenciales de estas mismas. Es decir:

- HOST
- PORT
- DATABASE_NAME
- USER
- PASSWORD

Una vez que el usuario se logueo podra realizar diferentes operaciones (`GET`,`POST`,`PUT` y `DELETE`) sobre una base de datos que almacena datos relacionos a series.

## Tecnologías Utilizadas

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

### Backend (Django)

1. Navega al directorio `backend/`.
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

![Alt text](<Captura desde 2023-10-25 14-23-03.png>)

- `http://localhost/pgadmin4/`: Para ingresar al administrador de base de datos de Postgres

![Alt text](<Captura desde 2023-10-25 14-25-33.png>)

### Frontend (Angular)

1. Navega al directorio `frontend/`
2. Ejecuta el siguiente comando para instalar las dependencias

```bash
npm install
```

3. Inicia la aplicación con:

```bash
ng serve
```

El frontend estará disponible en `http://localhost:4200/`. Luego debera dirigirse a `login/`

![Alt text](<Captura desde 2023-10-25 14-35-58.png>)

El usuario debe ingresar los datos configurados en:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

Si los datos son correctos la aplicacion lo redirigira a `admin/` en el cual se mostrara el panel de administracion de la base de datos de series

![Login](<Captura desde 2023-10-25 14-37-41.png>)

Operaciones

- Dar de alta a una serie

![Alta serie](<Captura desde 2023-10-25 14-37-54.png>)

- Dar de editar a una serie

![Editar serie](<Captura desde 2023-10-25 14-38-14.png>)

- Anular a una serie

Implica modificar el estado de 'AC' (Activo) a 'AN' (Inactivo)

![Anulacion serie](<Captura desde 2023-10-25 14-38-25.png>)

![Anulacion serie](<Captura desde 2023-10-25 14-38-32.png>)

- Eliminar a una serie

![Eliminacion serie](<Captura desde 2023-10-25 14-38-51.png>)

- Busqueda de registros

Cuando el usuario hace click sobre el boton de buscar le debera aparecer un input que le permita filtrar en tiempo real al registro. Los filtros pueden realizarse por los siguientes campos:

- Titulo
- Descripcion
- Genero
- Precio de Alquiler
- Estado

![Busquedas de series](<Captura desde 2023-10-25 15-12-21.png>)

> ## _Aclaraciones_
>
> - Para la modificacion, anulacion y eliminacion es necesario: tener al menos un registro en la tabla y seleccionar un solo registro de la tabla.
> - Para la carga y modificacion todos los inputs son requeridos.
> - Una vez que el registro sea anulado no se puede modificar o rebocar su anulacion.
