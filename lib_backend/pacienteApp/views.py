from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .models import Paciente 
from .serializer import paciente_serializer 
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
from reservasApp.models import  reservas
from reservasApp.serializer import reserva_serializer

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken

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
    gmail_api = request.data.get('gmail')
    contrasena_api = request.data.get('contrasena')

    try:
        #filtro con el id
        paciente = Paciente.objects.get(gmail = gmail_api)

        refresh = RefreshToken() #carpeta vacia q se le agrego id 

        #los datos que estan en el token para en angular guardarlos en LocalStorage
        refresh['id'] = paciente.id
        refresh['nombre'] = paciente.nombre

        if check_password(contrasena_api, paciente.contrasena):
            return Response({
                'access': str(refresh.access_token), #token para poder hacer peticiones 
                'refresh': str(refresh) #para cada vez q me logue reciba de nuevo el token recordemos q se pierde cada 1 dia
            }, status=status.HTTP_200_OK)
        else: 
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except paciente.DoesNotExist:
        return Response({'usuario no encontrado: '}, status=status.HTTP_404_NOT_FOUND)
    

@csrf_exempt
@api_view(['GET'])
def ver_post_paciente(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return Response({'error'}, status=401)
    
    try:
        token_str = auth_header.split(' ')[1]

        token = AccessToken(token_str)
        paciente_log = token['id']

        reserva_ap = reservas.objects.filter(paciente_id = paciente_log).order_by('-fecha_creacion')
        data_reserva = reserva_serializer(reserva_ap, many=True)
        return Response(data_reserva.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error'}, status=401)


