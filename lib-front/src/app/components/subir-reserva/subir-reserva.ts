import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api_services_reserva } from '../../services/api_reserva.services';
import { Reserva } from '../../models/reserva.models';
import { Api_services_paciente } from '../../services/api_paciente.services';



@Component({
  selector: 'app-subir-reserva',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './subir-reserva.html',
  styleUrl: './subir-reserva.css',
})
export class SubirReserva implements OnInit{
constructor(
      private paramen : ActivatedRoute,
      private api_reserva : Api_services_reserva,
      private api_paciente : Api_services_paciente,
      private router: Router,
      private cdr : ChangeDetectorRef,
    ) {}



  public reserva_nuevo = new Reserva();
  

  public datos_input : Reserva[] = [];

    id_paciente : any = '';


    id_reserva : number = 0;
    editar : boolean = false
  
 

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const id_local = localStorage.getItem('id_usuario');
    if (id_local) {
      this.id_paciente = Number(id_local);
      this.reserva_nuevo.paciente = this.id_paciente;
    }
    console.log('ID recuperado del local:', this.id_paciente);
  }
  



  this.paramen.queryParams.subscribe(params => {
    this.id_reserva = Number(params['id']); 

    if (this.id_reserva >= 1) {
      this.editar = true;
      this.api_paciente.ver_tus_post().subscribe({
        next: (data_input: Reserva[]) => {
          this.datos_input = data_input;
          const reserva_encontrar = this.datos_input.find(r => r.id === this.id_reserva);
          
          if (reserva_encontrar) {
            this.reserva_nuevo = { ...reserva_encontrar };
            console.log("Datos cargados para editar:", this.reserva_nuevo);
            this.cdr.detectChanges();
          }
        },
        error: (e) => console.log("Error cargando posts:", e)
      });
    } else {
      this.editar = false;
    }
  });
}


  subir_reserva(){
    this.api_reserva.subir_reserva_api(this.reserva_nuevo).subscribe({
          next : (data) => {
            console.log("respuesta de servidor: ", data)
            this.reserva_nuevo = new Reserva(); /* limpiar el input */
            this.router.navigate(['/home_paciente'])
          },
    
          error : (e) =>{
            console.log("error es el siguiente: ", e)
          }
        })
    }
    

  editar_reserva(){
    this.editar = true;
    this.api_paciente.editar_post(this.id_reserva, this.reserva_nuevo).subscribe({
      next: (data) =>{
        console.log("respuesta: ", data)
        this.router.navigate(['/home_paciente'])
      },
      error : (e) =>{
        console.log("error es: ", e)
      }
    })
  }

}
