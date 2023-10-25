# PragmaSOFT Technical Test

_Prueba técnica para la empresa PragmaSOFT_: Esta prueba consiste en crear una aplicacion web o de escritorio que le permita al usuario poder conectarse a una base de datos ingresando las credenciales de estas mismas. Es decir:

- HOST 
- PORT
- DATABASE_NAME
- USER
- PASSWORD

## Tecnologías Utilizadas

- **Backend**: Django Rest Framework
- **Frontend**: Angular
- **Base de datos**: Postgres

- **Herramientas adicionales**: Docker

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

4. Comprobar que los contenedores esten corriendo

```
```

5. Si los contenedores se han levantado correctamente, puede dirigirse a
- `http://localhost/api/`: Para ingresar a la interfaz grafica de la API de Django Rest Framework
- `http://localhost/pgadmin4/`: Para ingresar al administrador de base de datos de Postgres
