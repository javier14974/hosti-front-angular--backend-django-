from django.db import models

from pacienteApp.models import Paciente
from doctorApp.models import Doctor


class reservas(models.Model):
    id = models.AutoField(primary_key=True)
    descripcion_dolor = models.CharField(max_length=500)
    fecha_creacion = models.DateField(auto_now_add=True) 
    
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='mis_reservas')

    estado = models.CharField(max_length=20, default='PENDIENTE')

    def __str__(self):
        return f"Reserva {self.id} - Paciente: {self.paciente.nombre} | estado: {self.estado}"