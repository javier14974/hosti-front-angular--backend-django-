import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api_services_doctor } from '../../../services/api_doctor.services';

@Component({
  selector: 'app-login-doctor',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-doctor.html',
  styleUrl: './login-doctor.css',
})
export class LoginDoctor {
  constructor(
    private api_doctor : Api_services_doctor,
    private router : Router,
  ) {}


  login_doctor = {
    gmail : '',
    nombre : '',
    contrasena : ''
  }


  login(){
    this.api_doctor.login(this.login_doctor.gmail, this.login_doctor.contrasena, this.login_doctor.nombre).subscribe({
      next : (data) =>{
        console.log("login exitoso la respuesta es: ", data)
        if (typeof window !== 'undefined') {
          localStorage.setItem('id_doctor', data.id.toString());
        }
        this.router.navigate(['/home_doctor']);
      }, 
      error : (e) =>{
        console.log("el error es: ", e)
      }
    })
  }


} 
