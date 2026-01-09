import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api_services_paciente } from '../../../services/api_paciente.services';
import { Paciente } from '../../../models/paciente.models';

@Component({
  selector: 'app-registrar-paciente',
  imports: [FormsModule],
  templateUrl: './registrar-paciente.html',
  styleUrl: './registrar-paciente.css',
})
export class RegistrarPaciente {
constructor(
    private api_paciente : Api_services_paciente,
  ) {}

  public paciente_nuevo = new Paciente();

  public todo_paciente : Paciente[] = [];
  nombre_error : string = ''

  registrar(){
    const nombre = this.paciente_nuevo.nombre.trim();
    

    if(nombre === ''){
      this.nombre_error = 'el nombre no puede estar vacio'
      return
    }else{
      this.nombre_error = ''
    }

    

    this.api_paciente.registrar_paciente_api(this.paciente_nuevo).subscribe({
      next : (data) => {
        console.log("respuesta de servidor: ", data)

        this.paciente_nuevo = new Paciente(); /* limpiar el input */
      },

      error : (e) =>{
        console.log("error es el siguiente: ", e)
      }
    })
  }
}
