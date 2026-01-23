import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paciente } from "../models/paciente.models";
import { Reserva } from "../models/reserva.models";
import { tap } from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class Api_services_paciente{
    private login_url = 'http://127.0.0.1:8000/pacientes/login_paciente/';
    private registro_url = 'http://127.0.0.1:8000/pacientes/registro_paciente/';
    private ver_post_url = 'http://127.0.0.1:8000/paciente/home/';
    private eliminar_post_url = 'http://127.0.0.1:8000/reserva/eliminar_reserva_usuario/';
    private editar_post_url = 'http://127.0.0.1:8000/reserva/editar_post/';

    constructor(private http: HttpClient){ }

    registrar_paciente_api(Paciente : Paciente){
        return this.http.post<Paciente>(this.registro_url, Paciente);
    }

    login_paciente_api(gmail : string, nombre: string, contrasena: string){
        const envio = {gmail : gmail, nombre: nombre, contrasena: contrasena}
        return this.http.post<any>(this.login_url, envio)
    }

    ver_tus_post(){
        const token = localStorage.getItem('access');
        const headers = { 'Authorization': `Bearer ${token}` };

        return this.http.get<Reserva[]>(this.ver_post_url, { headers });
    }

    eliminar_post(id_reserva : number){
        return this.http.delete<any>(this.eliminar_post_url+ id_reserva+ '/');
    }

    editar_post(id_reserva : number, data: Reserva){
        return this.http.put(this.editar_post_url + id_reserva + '/', data);
    }
}

