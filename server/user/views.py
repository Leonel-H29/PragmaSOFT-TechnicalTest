from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random
from psycopg2 import connect, OperationalError
import hashlib
from django.conf import settings

# Serializers
from user.serializers import UserLoginSerializer


def conect_db(host, username, passw, dbname, port):
    """
    Esta función retorna la conexion a la DB en base a los parametros enviados por el usuario


    Args:
        host (int): Direccion de Host de la base de datos.
        username (str): El nombre de usuario que desea ingresar a la base de datos.
        passw (str): La contraseña del usuario.
        dbname (str): El nombre de la base de datos a la que queremos acceder.
        port (str): El puerto donde se ejecuta la base de datos.


    Returns:
        connection: El valor me indica si se establecio o no la conexion
    """

    # Verificar si las credenciales coinciden con las configuradas en settings.py
    db_settings = settings.DATABASES.get('db_series')

    print(db_settings['HOST'], db_settings['DATABASE_PORT'],
          db_settings['NAME'], db_settings['USER'], db_settings['PASSWORD'])

    is_db = (
        host == db_settings['HOST'] and
        port == db_settings['DATABASE_PORT'] and
        dbname == db_settings['NAME'] and
        username == db_settings['USER'] and
        passw == db_settings['PASSWORD']
    )

    if is_db:
        # Realizo a la conexion a la base de datos
        connection = connect(
            host=host,
            user=username,
            password=passw,
            database=dbname,
            port=port
        )
        return connection

    return None


def encriptar(sting_to_hash):
    """
    Esta función encripta un nombre de usuario utilizando el algoritmo SHA-256.

    Args:
        nombre_usuario (str): El nombre de usuario a encriptar.

    Returns:
        str: El hash en formato hexadecimal.
    """
    # Convertir el nombre de usuario a bytes antes de aplicar el hash
    sting_to_hash_bytes = sting_to_hash.encode('utf-8')

    # Aplicar el hash SHA-256
    hash_resultado = hashlib.sha256(sting_to_hash_bytes).hexdigest()

    return hash_resultado


def generateToken():
    """
    Esta funcion genera un Token aleatorio.

    Returns:
        str: El Token generado.
    """
    return ''.join(random.choices(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=40))


class CustomLoginView(APIView):

    """
    Clase para la vista de inicio de sesion, es donde la API recibe las credenciales del la base de datos 
    por medio del cliente, realiza las evaluciones correspondiente y envia una respuesta al cliente.
    """

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            credentials = serializer.validated_data

            # Intentar conectar a la base de datos
            try:
                connection = conect_db(
                    host=credentials['host'],
                    port=credentials['port'],
                    dbname=credentials['database_name'],
                    username=credentials['user'],
                    passw=credentials['password']
                )

                if connection:
                    # Generar un token aleatorio
                    random_token = generateToken()
                    user_data = {
                        'token': random_token,
                        'user': encriptar(credentials['user']),
                        'database': encriptar(credentials['database_name']),
                    },
                    return Response(user_data, status=status.HTTP_200_OK)
                return Response({'error': 'Las credenciales son incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
            except OperationalError:
                return Response({'error': 'Error del sevidor'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Error al procesar los datos'}, status=status.HTTP_406_NOT_ACCEPTABLE)
