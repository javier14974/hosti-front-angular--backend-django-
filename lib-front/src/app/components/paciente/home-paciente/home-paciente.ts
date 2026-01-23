import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api_services_paciente } from '../../../services/api_paciente.services';
import { Reserva } from '../../../models/reserva.models';

@Component({
  selector: 'app-home-paciente',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './home-paciente.html',
  styleUrl: './home-paciente.css',
})
export class HomePaciente implements OnInit {

  lista_post: Reserva[] = [];
  nombreUsuario: string = '';
  id_paciente: any = null;

  constructor(
    private router: Router,
    private api_paciente: Api_services_paciente,
    private cdr: ChangeDetectorRef
  ) {}

  // Abrelatas manual del Token
  decodificarToken(token: string) {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      return null;
    }
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access');

    if (!token) {
      alert("Necesitas iniciar sesión para entrar :,c");
      this.router.navigate(['login_paciente']);
    } else {
      const datos = this.decodificarToken(token);
      
      if (datos) {
        // Guardamos los datos del token en las variables de la clase
        this.nombreUsuario = datos.nombre;
        this.id_paciente = datos.id;

        // Llamamos a la API usando el ID que sacamos del token
        this.api_paciente.ver_tus_post().subscribe({
          next: (data) => {
            this.lista_post = data;
            console.log("Todos los posts: ", this.lista_post);
            this.cdr.detectChanges();
          },
          error: (e) => {
            console.log("Error al traer posts: ", e);
          }
        });
      }
    }
  }

  salir() {
    // Para salir, simplemente borramos TODO lo relacionado al usuario
    localStorage.clear(); 
    this.router.navigate(['/login_paciente']);
  }

  enviar_id_reserva() {
    // Enviamos el ID que ya tenemos guardado desde el inicio
    this.router.navigate(['/reserva'], { queryParams: { id_paciente: this.id_paciente } });
  }

  eliminar_post(id: any) {
    this.api_paciente.eliminar_post(id).subscribe({
      next: (data) => {
        console.log("Post eliminado:", data);
        this.lista_post = this.lista_post.filter(post => post.id !== id);
      }
    });
  }

  editar_post(id_reserva: any) {
    this.router.navigate(['/reserva', id_reserva], { queryParams: { id: id_reserva } });
  }
}