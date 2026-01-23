import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Api_services_doctor } from '../../../services/api_doctor.services';
import { Reserva } from '../../../models/reserva.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-doctor',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './home-doctor.html',
  styleUrl: './home-doctor.css',
})
export class HomeDoctor implements OnInit{
  constructor(
    private api_doctor : Api_services_doctor,
  ){}

todo_post  : Reserva[] = []

  ngOnInit() : void{
    this.api_doctor.ver_todo_post().subscribe({
      next: (data) =>{
        this.todo_post = data
      },
      error : (e) =>{
        console.log("error es: ", e)
      }
    })
  }

}
