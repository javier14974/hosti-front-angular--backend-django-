export class Paciente{
    constructor(
        public id?: number, 
        public nombre: string = '',
        public contrasena: string = '',
        public edad : number = 0,
        public gmail: string = ''
    ) {}
}