from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .models import Doctor
from .serializer import doctor_serializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
from reservasApp.models import reservas


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def registro_doctor(request):
    
    serializers_reg = doctor_serializer(data=request.data)

    if serializers_reg.is_valid():
        serializers_reg.save()
        return Response(serializers_reg.data, status=status.HTTP_201_CREATED)

    return Response(serializers_reg.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny]) # Esto quita el error 403
def login_doctor(request):
    gmail_front = request.data.get('gmail')
    contrasena_api = request.data.get('contrasena')

    try:
        #filtro con el id
        doctor = Doctor.objects.get(gmail=gmail_front)

        if check_password(contrasena_api, doctor.contrasena):
            return Response({
                'id': doctor.id,
                'nombre': doctor.nombre,
            }, status=status.HTTP_200_OK)
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except doctor.DoesNotExist:
        return Response({'usuario no encontrado: '}, status=status.HTTP_404_NOT_FOUND)
    
@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny]) # Esto quita el error 403
def ver_todo_post(request):
    post = reservas.objects.all()

    serializer = doctor_serializer(post, many=True)

    return Response(serializer , status=status.HTTP_200_OK)
