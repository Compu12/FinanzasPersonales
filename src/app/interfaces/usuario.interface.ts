import { interval } from "rxjs";

export interface Usuario {
    id?:string,
    nombre:string,
    apellido:string,
    usuario:string,
    contraseña:string
}