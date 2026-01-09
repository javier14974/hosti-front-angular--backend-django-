"""
URL configuration for lib_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path



from doctorApp.views import *
from pacienteApp.views import *
from reservasApp.views import *

urlpatterns = [
    path('pacientes/registro_paciente/', registro_paciente, name='registro_paciente'),
    path('pacientes/login_paciente/', login_paciente, name='login_paciente'),

]
