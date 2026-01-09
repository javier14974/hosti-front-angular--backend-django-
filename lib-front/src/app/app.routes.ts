import { Routes } from '@angular/router';
import { RegistrarPaciente } from './components/paciente/registrar-paciente/registrar-paciente';
import { LoginPaciente } from './components/paciente/login-paciente/login-paciente';
import { HomePaciente } from './components/paciente/home-paciente/home-paciente';


export const routes: Routes = [
  {path: '', redirectTo: 'login_paciente', pathMatch: 'full' },
  {path: 'registrar_paciente', component: RegistrarPaciente},
  {path:'login_paciente', component: LoginPaciente},
  {path: 'home_paciente', component: HomePaciente},
];