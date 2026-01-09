import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paciente } from "../models/paciente.models";




@Injectable({
  providedIn: 'root'
})
export class Api_services_paciente{
    private login_url = 'http://127.0.0.1:8000/pacientes/login_paciente/';
    private registro_url = 'http://127.0.0.1:8000/pacientes/registro_paciente/';

    constructor(private http: HttpClient){ }

    registrar_paciente_api(Paciente : Paciente){
        return this.http.post<Paciente>(this.registro_url, Paciente);
    }

    login_paciente_api(id: number, nombre: string, contrasena: string){
        const envio = {id: id, nombre: nombre, contrasena: contrasena}
        return this.http.post<any>(this.login_url, envio);
    }
}

