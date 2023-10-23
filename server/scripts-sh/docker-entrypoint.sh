#!/bin/sh

#String de las apps
apps="user series"
#String para el comando para hacer las migraciones
command="manage.py makemigrations $apps"
#Configuracion para el entorno de produccion
config="--settings=backend.settings.production"



#Elimino los directorios de migrations en las apps
if [ -f "scripts-sh/del_migrate.sh" ]; then
    echo "Eliminando migraciones anteriores ..."
    . scripts-sh/del_migrate.sh
    #. del_migrate.sh
    sleep 2
fi


#Almaceno los archivos estaticos
echo "Creando los archivos estaticos ..."
python manage.py collectstatic --no-input $config
sleep 2

#Creo las migraciones para crear la base de datos
echo "Realizo makemigrations ..."
python $command $config
sleep 2

#Espero a que la base de datos este lista
python manage.py wait_db $config
sleep 2

#Creamos las tablas
echo "Realizo migrate ..."
python manage.py migrate $config
sleep 2


#Inicio el servidor
echo "Inicio el servidor ..."
#python manage.py runserver 0.0.0.0:8000 $config
config="DJANGO_SETTINGS_MODULE=backend.settings.production backend.wsgi:application "
gunicorn --env $config --bind 0.0.0.0:8000
#gunicorn --env $config --bind 0.0.0.0:$PORT
echo "El backend esta listo"

exec "$@"
