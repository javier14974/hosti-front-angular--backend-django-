import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api_services_doctor } from '../../../services/api_doctor.services';
import { Reserva } from '../../../models/reserva.models';
import { CommonModule } from '@angular/common';
import { todo } from 'node:test';

@Component({
  selector: 'app-home-doctor',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './home-doctor.html',
  styleUrl: './home-doctor.css',
})
export class HomeDoctor implements OnInit{
  constructor(
    private api_doctor : Api_services_doctor,
    private router : Router,
    private cdr: ChangeDetectorRef,
  ){}

todo_post  : Reserva[] = []
nombre_filtro : string = ''
paciente_filtrado : any[] = []

  ngOnInit() : void{
    const token = localStorage.getItem('access');

    if(!token){
      alert("Necesitas iniciar sesión para entrar :,c");
      this.router.navigate(['/login_doctor'])
    }else{
      this.api_doctor.ver_todo_post().subscribe({
        next:(data) =>{
          console.log(data)
          this.todo_post = data
          this.cdr.detectChanges();
        }
      })
    }

  }


  salir(){
    localStorage.clear(); 
    this.router.navigate(['/login_doctor']);
  }

  atender(id_reserva : any){
    console.log(id_reserva)
    this.api_doctor.asignar_paciente(id_reserva).subscribe({
      next: (data) =>{
        console.log("respuesta es: ", data)
      }, 
      error: (e) =>{
        console.log("el errror es: ", e)
      }
    })
  }

  filtrar(){

    if(!this.nombre_filtro) return;

    for(let nom of this.todo_post){

        let nombres = nom.nombre_paciente.toLocaleLowerCase();
        let busqueda = this.nombre_filtro.toLowerCase();

      if(nombres.includes(busqueda)){
        this.paciente_filtrado.push(nom)
      }

    }

  }

  eliminar_filtro(){
    this.nombre_filtro = '';
    this.paciente_filtrado = [];
  }
}
