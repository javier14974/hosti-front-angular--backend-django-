export class Usuario{
    constructor(
        public id?: number, 
        public nombre: string = '',
        public contrasena: string = '',
        public gmail: string = '',
        public rol: string = 'ESTUDIANTE' // Agregué el rol para que coincida con tu Django
    ) {}
}