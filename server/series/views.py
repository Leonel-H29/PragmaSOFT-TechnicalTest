# Django REST Framework
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Serie
from .serializers import SeriesSerializer


class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Serie.objects.all()
    serializer_class = SeriesSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

