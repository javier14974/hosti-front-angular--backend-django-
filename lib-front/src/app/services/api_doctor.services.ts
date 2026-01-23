import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Doctor } from "../models/doctor.models";
import { Reserva } from "../models/reserva.models";





@Injectable({
  providedIn: 'root'
})
export class Api_services_doctor{
    private registro_url = 'http://127.0.0.1:8000/doctor/registro_doctor/';
    private login_url = 'http://127.0.0.1:8000/doctor/login_doctor/';
    private ver_post_url = 'http://127.0.0.1:8000/doctor/ver_post/'

    constructor(private http: HttpClient){ }

    registrar_doctor_api(Doctor : Doctor){
        return this.http.post<Doctor>(this.registro_url, Doctor);
    }

    login(gmail : string, contrasena : string, nombre : string){
        const envio = {gmail : gmail, contrasena : contrasena, nombre : nombre}
        return this.http.post<any>(this.login_url, envio)
    }

    ver_todo_post(){
        return this.http.get<Reserva[]>(this.ver_post_url)
    }

}

