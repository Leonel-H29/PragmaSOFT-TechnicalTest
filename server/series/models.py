from django.db import models


class Serie(models.Model):
    """
    Clase para crear la tabla en la base de datos correspondiente a 'Series'
    """

    '''
    Listas de tuplas que son utilizadas como opciones a elegir en sus determinados campos

    Opcion = (0,1) :
        - Opcion [0] : Como se almacenara la opcion dentro de la base de datos
        - Opcion [1] : Como se mostrara la opcion de cara al usuario
    '''
    OPCIONES_GENERO = [
        ('Accion', 'Acción'),
        ('Comedia', 'Comedia'),
        ('Drama', 'Drama'),
        ('Fantasia', 'Fantasía'),
        ('Ciencia Ficcion', 'Ciencia Ficción'),
        ('Otro', 'Otro'),
    ]

    OPCIONES_ESTADO = [
        ('AC', 'Activa'),
        ('AN', 'Inactiva'),
    ]

    id_serie = models.AutoField(primary_key=True, help_text='Id unico de la serie')
    titulo = models.CharField(max_length=30, unique=True, help_text='El titulo de la serie')
    descripcion = models.TextField(help_text='Descripcion acerca de la serie')
    fecha_estreno = models.DateField(help_text='La fecha de estreno de la serie')
    estrellas = models.IntegerField(help_text='La calificacion de la serie, debe ser un valor entre [0,5]')
    genero = models.CharField(max_length=20, choices=OPCIONES_GENERO, help_text='El genero de la serie')
    precio_alquiler = models.DecimalField(max_digits=8, decimal_places=2, help_text='El precio asignado para poder alquilar la serie')
    atp = models.BooleanField(help_text='Determina si la serie es apta para todo publico o no')
    estado = models.CharField(max_length=2, choices=OPCIONES_ESTADO, help_text='Detemina si la serie es activa o no')

    def __str__(self):
        """
        El método especial `__str__` en Python se utiliza para definir la representación de cadena de un objeto de una clase. Cuando se 
        imprime un objeto o se convierte explícitamente a una cadena (usando str(objeto)), Python busca y utiliza este método si está definido.
        """
        return self.titulo

    class Meta:
        """
        Configuraciones de cara a como se mostrara la tabla dentro de la base de datos
        """
        db_table = 'series'
        verbose_name = 'serie'
        verbose_name_plural = 'series'
        ordering = ['id_serie']
        unique_together = ('id_serie', 'titulo')
