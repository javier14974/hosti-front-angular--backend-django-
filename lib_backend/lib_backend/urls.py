
from django.contrib import admin
from django.urls import path




from pacienteApp.views import registro_paciente, login_paciente, ver_post_paciente
from reservasApp.views import subir_reserva, eliminar_post, editar_post
from doctorApp.views import registro_doctor, login_doctor, ver_todo_post, tomar_reserva, ver_mis_pacientes
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    #seguridad
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view() , name='refresh'),



    path('pacientes/registro_paciente/', registro_paciente, name='registro_paciente'),
    path('pacientes/login_paciente/', login_paciente, name='login_paciente'),
    path('paciente/home/', ver_post_paciente, name='ver_post_paciente'),

    path('reserva/eliminar_reserva_usuario/<int:id_reserva>/', eliminar_post, name='eliminar_post'),
    path('reserva/subir_reserva/', subir_reserva, name='subir_reserva'),
    path('reserva/editar_post/<int:id_reserva>/', editar_post, name='editar_post'),

    path('doctor/registro_doctor/', registro_doctor, name='registro_doctor'),
    path('doctor/login_doctor/', login_doctor, name='login_doctor'),
    path('doctor/ver_post/', ver_todo_post, name='ver_post'),
    path('doctor/asignar/<int:id_reserva>/', tomar_reserva, name='tomar_reserva'),
    path('doctor/mis_pacientes/', ver_mis_pacientes, name='mis_pacientes'),
]
