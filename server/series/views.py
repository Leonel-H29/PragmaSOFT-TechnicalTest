from rest_framework import viewsets
from .models import Serie
from .serializers import SeriesSerializer


class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Serie.objects.all()
    serializer_class = SeriesSerializer

