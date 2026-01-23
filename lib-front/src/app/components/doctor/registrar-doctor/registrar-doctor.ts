import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api_services_doctor } from '../../../services/api_doctor.services';
import { Doctor } from '../../../models/doctor.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-doctor',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './registrar-doctor.html',
  styleUrl: './registrar-doctor.css',
})
export class RegistrarDoctor {
  constructor(
    private api_doctor : Api_services_doctor,
    private router : Router,
  ) {}

  
   public nuevo_doctor = new Doctor();

   registrar_doctor(){
    this.api_doctor.registrar_doctor_api(this.nuevo_doctor).subscribe({
      next: (data)=>{
        console.log("respuesta: ", data)

        this.nuevo_doctor = new Doctor(); /* limpiar el input */

        this.router.navigate(['/login_doctor'])
      }, 
      error: (e) =>{
        console.log("el error es: ", e)
      }
    })
   }
}
