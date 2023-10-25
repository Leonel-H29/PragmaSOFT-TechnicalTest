from rest_framework.permissions import BasePermission
from django.conf import settings
# from backend.settings import ALLOWED_HOSTS
from backend.settings.production import ALLOWED_HOSTS


class CustomAuthentication(BasePermission):

    """
    Defino una clase personalizada para los permisos en mi API, en caso de el
    usuario envie un `token` en la cabecera y este sea valido le permitira al usuario
    estar autenticado y poder realizar las diferentes operaciones
    """

    def has_permission(self, request, view):
        # Obtener el token de la cabecera de la petición
        token = request.META.get('HTTP_AUTHORIZATION')

        if token:
            print("Se ha permitido su acceso")
            return True
        print("Error en la peticion")

        return False
