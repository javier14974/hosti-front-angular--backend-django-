import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../models/usuario.models";



@Injectable({
  providedIn: 'root'
})
export class Api_services_lib{
    private login_url = 'http://127.0.0.1:8000/usuarios/login/';
    private registro_url = 'http://127.0.0.1:8000/usuarios/registro/';

    constructor(private http: HttpClient){ }

    registrar_usuario_api(usuario : Usuario){
        return this.http.post<Usuario>(this.registro_url, usuario);
    }

    login_usuari_api(id: number, nombre: string, contrasena: string){
        const envio = {id: id, nombre: nombre, contrasena: contrasena}
        return this.http.post<any>(this.login_url, envio);
    }
}

