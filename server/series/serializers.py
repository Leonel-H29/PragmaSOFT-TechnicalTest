# Django
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator, FileExtensionValidator

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator


from .models import Serie


class SeriesSerializer(serializers.ModelSerializer):
     class Meta:
        model = Serie
        fields = "__all__"
    



    