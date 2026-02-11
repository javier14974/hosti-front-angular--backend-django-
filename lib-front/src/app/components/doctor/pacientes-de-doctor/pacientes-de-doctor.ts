import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api_services_doctor } from '../../../services/api_doctor.services';
import { Paciente } from '../../../models/paciente.models';
import { Reserva } from '../../../models/reserva.models';

@Component({
  selector: 'app-pacientes-de-doctor',
  imports: [FormsModule, RouterLink],
  templateUrl: './pacientes-de-doctor.html',
  styleUrl: './pacientes-de-doctor.css',
})
export class PacientesDeDoctor {

  public nombreUsuario: string = '';
  public ocupacion: string = '';
  
  todos_pacientes : Reserva[] = [];



  constructor(
    private route : Router,
    private doctor_api : Api_services_doctor,
    private cdr: ChangeDetectorRef,
  ) {}

  decodificarToken(token: string) {
    try {
      const payload = token.split('.')[1];

      const decodedPayload = atob(payload); 
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error("Error al decodificar:", e);
      return null;
    }
  }

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (!accessToken) {
      alert("Necesitas iniciar sesión para entrar :,c");
      this.route.navigate(['/login_doctor']);
    } else {
     
      const datos = this.decodificarToken(refreshToken || accessToken); 
      
      if (datos) {
        this.nombreUsuario = datos.nombre;
        this.ocupacion = datos.ocupacion;
        
        console.log("Datos cargados:", this.nombreUsuario, this.ocupacion);

        this.doctor_api.tus_pacientes().subscribe({
          next: (data : any) =>{
            console.log(data)
            this.todos_pacientes = data;
            this.cdr.detectChanges();
          }
        })
      }
    }
  }

  disvincular_paciente(id_reserva : number){
    console.log(id_reserva)
  }
}