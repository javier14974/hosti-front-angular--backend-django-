import { Component } from '@angular/core';
import { Api_services_paciente } from '../../../services/api_paciente.services';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login-paciente',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login-paciente.html',
  styleUrl: './login-paciente.css',
})
export class LoginPaciente {
constructor(
    private api_paciente : Api_services_paciente,
    private router: Router,
  ) {}

  error_login : string = ''

  paciente_log = {
    gmail : '',
    nombre: '',
    contrasena : ''
  }



  login(){
    this.api_paciente.login_paciente_api(this.paciente_log.gmail, this.paciente_log.nombre, this.paciente_log.contrasena).subscribe({
      next : (respuesta) =>{
        /* llaves */
        localStorage.setItem('access', respuesta.access);
        localStorage.setItem('refresh', respuesta.refresh);

        this.router.navigate(['/home_paciente'])
      },
      error : (e) =>{
        console.log("error al hacer login: ", e)
        this.error_login = 'el usuario no es el correcto'
      }
    })
  }
}
