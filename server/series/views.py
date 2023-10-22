# Django REST Framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from backend.authorizathion import CustomAuthentication


from .models import Serie
from .serializers import SeriesSerializer


class SeriesViewSet(viewsets.ModelViewSet):
    """
    Clase para la vista del las series
    """
    queryset = Serie.objects.all()
    serializer_class = SeriesSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [CustomAuthentication]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
