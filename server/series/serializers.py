# Django REST Framework
from rest_framework import serializers

from .models import Serie

class SeriesSerializer(serializers.ModelSerializer):
     """
     Esta clase me permite convertir los objetos del modelo de 'Serie'
     a JSON y viceversa. El uso de serializers es fundamental cuando se trabaja con APIs en Django, 
     ya que facilita la comunicación entre la base de datos y el 
     intercambio de datos con aplicaciones front-end u otros servicios.
     """
     class Meta:
        """
        Determino con que modelo voy a trabajar y con que campos de ese modelo
        """
        model = Serie
        fields = "__all__"
    



    