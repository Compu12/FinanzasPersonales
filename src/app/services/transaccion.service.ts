import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transacc } from '../interfaces/transaccion.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { TransferState } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  transacciones: Transacc[]=[];
  ingresos:number=0;
  egresos:number=0;
  ahorro:number=0;

  constructor(
    private http:HttpClient, 
    private firestore:AngularFirestore) 
    { 
   // this.cargarTransacciones();
    this.cargarTransacciones2();
    
  }

 async  cargarTransacciones(){
    
   
      await this.http.get('https://autenticacion-d06dc.firebaseio.com/Transaccion.json')
      .subscribe((resp:Transacc[])=>{
        this.transacciones=resp;
       // console.log(this.transacciones);
      
      // this.calcularTotalIngresos(this.transacciones);
      this.calcularTotal();
      });
   
  }

  cargarTransacciones2(){
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

  public calcularTotal(){
    this.ingresos=0;
    this.egresos=0;
    this.transacciones.forEach(element => {
      if (element.monto !="") {
        if (element.tipo=="Ingreso") {
          this.ingresos += parseFloat( element.monto);
          
        }else{
          this.egresos += parseFloat( element.monto);
        }
      }
      
    });
 
      this.ahorro=this.ingresos-this.egresos;
  }

  getTransaccion() {
    return this.firestore.collection('Transaccion').snapshotChanges();
}
  createTransaccion(transacccion: Transacc){
    return  this.firestore.collection('Transaccion').add(transacccion)
     
}

deleteTransaccion(trasID: string){
  this.firestore.doc('Transaccion/' + trasID).delete();
  this.calcularTotal();
}
}
