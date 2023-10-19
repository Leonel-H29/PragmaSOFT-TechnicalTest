from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import APIException
import jwt
from datetime import datetime, timedelta
from psycopg2 import connect, OperationalError
from rest_framework.authtoken.models import Token
#Model
from user.models import Usuario

# Serializers
from user.serializers import UserLoginSerializer

class CustomLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            credentials = serializer.validated_data

            # Intentar conectar a la base de datos
            try:
                conn = connect(
                    host=credentials['host'],
                    port=credentials['port'],
                    dbname=credentials['database_name'],
                    user=credentials['user'],
                    password=credentials['password']
                )
                conn.close()

                # Generar un token (puedes usar el Token de Django Rest Framework)
                #token, created = Token.objects.get_or_create(user=None)

                #return Response({'token': token.key}, status=status.HTTP_200_OK)
                return Response({'connection': True }, status=status.HTTP_200_OK)
            except OperationalError:
                return Response({'error': 'Las credenciales son incorrectas'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Las credenciales son incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
