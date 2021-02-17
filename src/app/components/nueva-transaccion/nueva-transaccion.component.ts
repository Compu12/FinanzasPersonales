import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transacc } from 'src/app/interfaces/transaccion.interface';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-nueva-transaccion',
  templateUrl: './nueva-transaccion.component.html',
  styleUrls: ['./nueva-transaccion.component.css']
})
export class NuevaTransaccionComponent implements OnInit {
  
transaccion:Transacc ={
  nombre:"",
  monto:"",
  tipo:""
};
  constructor(private transaccionService:TransaccionService, private router:Router) { }

  ngOnInit(): void {
  }

  create(){
    let nombreT = (<HTMLInputElement>document.getElementById('txtNombre')).value.toString();
    let montoT = (<HTMLInputElement>document.getElementById('txtMonto')).value.toString();
    //this.newTransaccion.tipo = (<HTMLInputElement>document.getElementById('txtNombre')).value.toString();
   // var tipoIng  =  (<HTMLInputElement>document.getElementById('inlineRadio1')).value.toString();
   
    //var seleccion = document.querySelector<HTMLInputElement>('input[name=inlineRadioOptions:checked').value;

    var op1 = <HTMLInputElement> document.getElementById("inlineRadio1");
    var isChecked = op1.checked;
    var op2 = <HTMLInputElement> document.getElementById("inlineRadio2");
    var isChecked2 = op2.checked;

    if (isChecked==false && isChecked2== false ) {
      alert("LLene todos los campos");

    } else if (nombreT.length==0 || montoT.length==0) {
      alert("LLene todos los campos");
    }else{


      if (isChecked==true) {
        var tipoT = "Ingreso";
      }else{
        var tipoT = "Egreso";
      }



    let pro = {
      nombre: nombreT,
      monto: montoT,
      tipo: tipoT

    }
   
    this.transaccion= pro;
       
    this.transaccionService.createTransaccion(this.transaccion);
    this.router.navigate(['']);
    }
      
}

}
