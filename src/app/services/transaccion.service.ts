import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transacc } from '../interfaces/transaccion.interface';
import { AngularFirestore } from '@angular/fire/firestore';

import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  transacciones: Transacc[] = [];
  ingresos: number = 0;
  egresos: number = 0;
  ahorro: number = 0;

  usuarios: Usuario[] = [];
  user:Usuario=undefined;
  num:string;
  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore) {
    // this.cargarTransacciones();
   
    
     this.cargarUsuarios();
    
  }

  /* async cargarTransacciones() {


    await this.http.get('https://autenticacion-d06dc.firebaseio.com/Transaccion.json')
      .subscribe((resp: Transacc[]) => {
        this.transacciones = resp;
        // console.log(this.transacciones);

        // this.calcularTotalIngresos(this.transacciones);
        this.calcularTotal();
      });

  } */

  cargarTransacciones2() {
    if (this.user!=undefined) {
      
    
    this.getTransaccion().subscribe(data => {
      this.transacciones = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Transacc
        } as Transacc;

      })
      this.calcularTotal();
    });
  }
  }

  public calcularTotal() {
    this.ingresos = 0;
    this.egresos = 0;
    this.transacciones.forEach(element => {
      if (element.monto != "") {
        if (element.tipo == "Ingreso") {
          this.ingresos += parseFloat(element.monto);

        } else {
          this.egresos += parseFloat(element.monto);
        }
      }

    });

    this.ahorro = this.ingresos - this.egresos;
  }

  getTransaccion() {
    return this.firestore.collection('Transaccion',ref=>ref.where('userId','==',this.user.id)).snapshotChanges();
  }
  createTransaccion(transacccion: Transacc) {
    return this.firestore.collection('Transaccion').add(transacccion)

  }

  deleteTransaccion(trasID: string) {
    this.firestore.doc('Transaccion/' + trasID).delete();
    this.calcularTotal();
  }

  createUsuario(usuario: Usuario) {
    return this.firestore.collection('Usuarios').add(usuario)

  }

  login(usuario: string, contraseña: string) {
    
    this.usuarios.forEach(element => {
      if (element.usuario === usuario && element.contraseña === contraseña) {
        this.user=element;
        
      }

    });
    
    this.cargarTransacciones2();
   
    return this.user;
    

  }


  cargarUsuarios() {
    this.getUsers().subscribe(data => {
      this.usuarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Usuario
        } as Usuario;

      })

    });
   
     
    
  }

  getUsers() {
    return this.firestore.collection('Usuarios').snapshotChanges();
  }
}
