from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
import jwt
import random
from datetime import datetime, timedelta
from psycopg2 import connect, OperationalError
from rest_framework.authtoken.models import Token
import hashlib
# Model
from user.models import Usuario

# Serializers
from user.serializers import UserLoginSerializer


def conect_db(host, username, passw, dbname, port):
    """Retorna la conexion a la DB."""
    return (
        connect(
            host=host,
            user=username,
            password=passw,
            database=dbname,
            port=port
        )
    )


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
    """Genera un Token aleatorio."""
    return ''.join(random.choices(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=40))


class CustomLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            credentials = serializer.validated_data

            # Intentar conectar a la base de datos
            try:
                if conect_db(host=credentials['host'],
                             port=credentials['port'],
                             dbname=credentials['database_name'],
                             username=credentials['user'],
                             passw=credentials['password']):

                    # Generar un token aleatorio
                    random_token = generateToken()
                    user_data = {
                        'token': random_token,
                        'user': encriptar(credentials['user']),
                        'database': encriptar(credentials['database_name']),
                    },
                    return Response(user_data, status=status.HTTP_200_OK)

                # Generar un token (puedes usar el Token de Django Rest Framework)
                # token, created = Token.objects.get_or_create(user=None)

                # return Response({'token': token.key}, status=status.HTTP_200_OK)
                return Response({'error': 'Las credenciales son incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
            except OperationalError:
                return Response({'error': 'Error del sevidor'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Error al procesar los datos'}, status=status.HTTP_406_NOT_ACCEPTABLE)
