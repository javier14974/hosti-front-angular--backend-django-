import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api_services_doctor } from '../../../services/api_doctor.services';
import { validate } from '@angular/forms/signals';

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

mensaje_error_gmail : string = ''
mensaje_error_nombre : string = ''
mensaje_error_contrasena : string = ''


   
  verificacion_nombre(): boolean{
      if (this.login_doctor.nombre.trim() === '') {
        this.mensaje_error_nombre = 'El nombre es obligatorio';
          return false;
    }else{
      this.mensaje_error_nombre = '';
      return true;
    }
  }

  verificacion_gmail(): boolean{
    if(this.login_doctor.gmail.trim() ===''){
      this.mensaje_error_gmail = 'el gmail no puede estar vacio';
      return false;
    }else if(!this.login_doctor.gmail.includes('@')){
      this.mensaje_error_gmail = 'el gmail tiene que incluir por defecto un @'
      return false;
    }else{
      this.mensaje_error_gmail = ''
      return true;
    }
  }

  verificacion_contrasena(): boolean{
    if(this.login_doctor.contrasena.trim() === ''){
      this.mensaje_error_contrasena = 'la contraseña no puede estar vacia';
      return false;
    }else{
      this.mensaje_error_contrasena = '';
      return true;
    }
  }


  login(){
    this.mensaje_error_gmail = '';
    this.mensaje_error_nombre = '';
    this.mensaje_error_contrasena = '';

    
    const vali_nombre : boolean = this.verificacion_nombre()
    const vali_gmail : boolean = this.verificacion_gmail()
    const vali_contraseña : boolean = this.verificacion_contrasena()

    if(!vali_gmail || !vali_nombre || !vali_contraseña){
      return;
    }

    this.api_doctor.login(this.login_doctor.gmail, this.login_doctor.contrasena, this.login_doctor.nombre).subscribe({
      next : (data) =>{
        console.log("login exitoso la respuesta es: ", data)
        if (typeof window !== 'undefined') {
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);
        }
        this.router.navigate(['/home_doctor']);
      }, 
      error : (e) =>{
        console.log("el error es: ", e)
      }
    })
  }


} 
