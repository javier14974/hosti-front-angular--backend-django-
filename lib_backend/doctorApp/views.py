from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .models import Doctor
from .serializer import doctor_serializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
from reservasApp.models import reservas
from reservasApp.serializer import reserva_serializer

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken


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

        Refresh = RefreshToken()

        Refresh['id'] = doctor.id
        Refresh['nombre'] = doctor.nombre
        Refresh['ocupacion'] = doctor.ocupacion

        if check_password(contrasena_api, doctor.contrasena):
            return Response({
                'access': str(Refresh.access_token), #token para poder hacer peticiones 
                'refresh': str(Refresh) #para cada vez q me logue reciba de nuevo el token recordemos q se pierde cada 1 dia
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

    serializer = reserva_serializer(post, many=True)

    return Response(serializer.data , status=status.HTTP_200_OK)


#tomar reserva
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny # Usamos AllowAny para que no bloquee el 403

@api_view(['PATCH'])
@permission_classes([AllowAny]) 
def tomar_reserva(request, id_reserva):
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return Response({'error': 'No mandaste el token'}, status=401)

    try: 
        # 1. Extraemos el ID del doctor del token manualmente
        token_str = auth_header.split(' ')[1]
        token = AccessToken(token_str)
        
        # OJO: Asegúrate que al crear el token guardaste el 'id'
        doctor_id_del_token = token['id'] 

        # 2. Buscamos la reserva
        reserva = reservas.objects.get(id=id_reserva)

        # 3. Asignamos (si tu modelo espera un número en el campo doctor)
        reserva.doctor = doctor_id_del_token 
        reserva.estado = 'Atendido'
        reserva.save()

        return Response({'msj': 'Reserva asignada con éxito'}, status=200)

    except Exception as e:
        print(f"Error: {e}")
        return Response({'error': 'Token no válido o error interno'}, status=403)