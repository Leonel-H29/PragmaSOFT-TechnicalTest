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

    id_serie = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha_estreno = models.DateField()
    estrellas = models.IntegerField()
    genero = models.CharField(max_length=20, choices=OPCIONES_GENERO)
    precio_alquiler = models.DecimalField(max_digits=8, decimal_places=2)
    atp = models.BooleanField()
    estado = models.CharField(max_length=10, choices=OPCIONES_ESTADO)

    def __str__(self):
        return self.titulo
    
    class Meta:
        db_table = 'series'
        verbose_name = 'serie'
        verbose_name_plural = 'series'
        ordering = ['id_serie']
        unique_together = ('id_serie', 'titulo')
