from django.db import models

class Usuario(models.Model):
    """
    Clase para crear la tabla en la base de datos correspondiente a 'Usuario'
    """
    host = models.CharField(max_length=255, help_text='La direccion o host donde esta alojada la base de datos')
    port = models.IntegerField(help_text='El puerto donde la base de datos se ejecuta y recibe peticiones')
    database_name = models.CharField(max_length=255, help_text='Nombre de la base de datos')
    user = models.CharField(max_length=255, help_text='Usuario que posee acceso a la base de datos')
    password = models.CharField(max_length=255, help_text='Contraseña del usuario')
