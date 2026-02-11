import { Routes } from '@angular/router';
import { RegistrarPaciente } from './components/paciente/registrar-paciente/registrar-paciente';
import { LoginPaciente } from './components/paciente/login-paciente/login-paciente';
import { HomePaciente } from './components/paciente/home-paciente/home-paciente';
import { SubirReserva } from './components/subir-reserva/subir-reserva';
import { HomeDoctor } from './components/doctor/home-doctor/home-doctor';
import { RegistrarDoctor } from './components/doctor/registrar-doctor/registrar-doctor';
import { LoginDoctor } from './components/doctor/login-doctor/login-doctor';
import { PacientesDeDoctor } from './components/doctor/pacientes-de-doctor/pacientes-de-doctor';


export const routes: Routes = [
  {path: '', redirectTo: 'login_paciente', pathMatch: 'full' },
  {path: 'registrar_paciente', component: RegistrarPaciente},
  {path:'login_paciente', component: LoginPaciente},
  {path: 'home_paciente', component: HomePaciente},
  {path: 'reserva/:id', component: SubirReserva},
  {path: 'reserva', component: SubirReserva},
  {path: 'home_doctor', component: HomeDoctor},
  {path: 'registrar_doctor', component: RegistrarDoctor},
  {path: 'login_doctor', component: LoginDoctor},
  {path: 'pacientes_de_doctor', component: PacientesDeDoctor},
];