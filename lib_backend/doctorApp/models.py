from django.db import models



class Doctor(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    contrasena = models.CharField(max_length=128)
    edad = models.IntegerField()
    gmail = models.CharField(max_length=100)
    fecha_registro = models.DateField(auto_now_add=True) 
    ocupacion = models.CharField(max_length=100)


    def __str__(self):
        return f"id: {self.id} | nombre: {self.nombre} | ocupacion: {self.ocupacion}"