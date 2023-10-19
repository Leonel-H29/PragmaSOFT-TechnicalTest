from django.db import models

class Usuario(models.Model):
    host = models.CharField(max_length=255)
    port = models.IntegerField()
    database_name = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
