from django.db import models

class Serie(models.Model):
    OPCIONES_GENERO = [
        ('Accion', 'Acción'),
        ('Comedia', 'Comedia'),
        ('Drama', 'Drama'),
        ('Fantasia', 'Fantasía'),
        ('Ciencia Ficcion', 'Ciencia Ficción'),
        ('Otro', 'Otro'),
    ]

    OPCIONES_ESTADO = [
        ('Activa', 'Activa'),
        ('Inactiva', 'Inactiva'),
    ]

    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha_estreno = models.DateField()
    estrellas = models.IntegerField()
    genero = models.CharField(max_length=20, choices=OPCIONES_GENERO)
    precio_alquiler = models.DecimalField(max_digits=8, decimal_places=2)
    ATP = models.BooleanField()
    estado = models.CharField(max_length=10, choices=OPCIONES_ESTADO)

    def __str__(self):
        return self.titulo
