from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Alumno(models.Model):  # Modelo creado para ejecutar migraciones
    # Definir los datos de la clase (campos de la tabla)
    # Si no se especifica lo contrario, todos los campos seran requeridos por defecto, es decir NOT NULL
    nombre = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    nota = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(20)])
    estado = models.CharField(max_length=20)

    class Meta:
        db_table = "alumno"  # Especificar el nombre de la tabla que se creara en la migración

    def __str__(self):
        return self.nombre + ' ' + self.curso + ' ' + str(self.nota)
