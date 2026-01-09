import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegistrarPaciente } from './components/paciente/registrar-paciente/registrar-paciente';
import { LoginPaciente } from './components/paciente/login-paciente/login-paciente';
import { HomePaciente } from './components/paciente/home-paciente/home-paciente';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RegistrarPaciente, LoginPaciente, HomePaciente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lib-front');
}
