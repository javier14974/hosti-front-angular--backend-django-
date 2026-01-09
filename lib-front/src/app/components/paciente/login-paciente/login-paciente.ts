import { Component } from '@angular/core';
import { Api_services_paciente } from '../../../services/api_paciente.services';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-paciente',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-paciente.html',
  styleUrl: './login-paciente.css',
})
export class LoginPaciente {
constructor(
    private api_paciente : Api_services_paciente,
    private router: Router
  ) {}

  error_login : string = ''

  paciente_log = {
    id: 0,
    nombre: '',
    contrasena : ''
  }



  login(){
    this.api_paciente.login_paciente_api(this.paciente_log.id, this.paciente_log.nombre, this.paciente_log.contrasena).subscribe({
      next : (respuesta) =>{
          console.log("respuesta: ", respuesta)

          localStorage.setItem('usuario_nombre', respuesta.nombre)
          localStorage.setItem('usuario_rol', respuesta.rol)

          this.router.navigate(['/home_paciente'])
      },
      error : (e) =>{
        console.log("error al hacer login: ", e)
        this.error_login = 'el usuario no es el correcto'
      }
    })
  }
}
