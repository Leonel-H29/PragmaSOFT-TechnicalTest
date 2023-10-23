from rest_framework.permissions import BasePermission
from django.conf import settings
from backend.settings import ALLOWED_HOSTS


class CustomAuthentication(BasePermission):

    """
    Defino una clase personalizada para los permisos en mi API, en caso de el
    usuario envie un `token` en la cabecera y este sea valido le permitira al usuario
    estar autenticado y poder realizar las diferentes operaciones
    """

    def has_permission(self, request, view):
        # Obtener el token de la cabecera de la petición
        token = request.META.get('HTTP_AUTHORIZATION')

        # Obtener la dirección IP del cliente
        client_ip = request.META.get('REMOTE_ADDR')

        if token and client_ip in ALLOWED_HOSTS:
            return True

        return False
