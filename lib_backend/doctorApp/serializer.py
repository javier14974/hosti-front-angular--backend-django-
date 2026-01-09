from rest_framework import serializers 
from django.contrib.auth.hashers import make_password
from .models import Doctor


class doctor_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

    def create(self, validated_data):
            validated_data['contrasena'] = make_password(validated_data['contrasena'])
            return super().create(validated_data)