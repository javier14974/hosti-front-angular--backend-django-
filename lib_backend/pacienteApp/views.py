from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .models import Paciente 
from .serializer import paciente_serializer 
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def registro_paciente(request):
    
    serializers_reg = paciente_serializer(data=request.data)

    if serializers_reg.is_valid():
        serializers_reg.save()
        return Response(serializers_reg.data, status=status.HTTP_201_CREATED)

    return Response(serializers_reg.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny]) # Esto quita el error 403
def login_paciente(request):
    id_api = request.data.get('id')
    contrasena_api = request.data.get('contrasena')

    try:
        #filtro con el id
        Paciente = Paciente.objects.get(id=id_api)

        if check_password(contrasena_api, Paciente.contrasena):
            return Response({
                'id': Paciente.id,
                'nombre': Paciente.nombre,
                'rol': Paciente.rol
            }, status=status.HTTP_200_OK)
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except Paciente.DoesNotExist:
        return Response({'usuario no encontrado: '}, status=status.HTTP_404_NOT_FOUND)