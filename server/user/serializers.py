# Django
from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator, FileExtensionValidator

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator


from user.models import Usuario 


class UserLoginSerializer(serializers.ModelSerializer):
     class Meta:
        model = Usuario
        fields = "__all__"
    



    