import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { StorageLocalService } from 'src/app/services/storage.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  
  ingresos:number;
  usrNav?:Usuario;
  constructor(public serTrans:TransaccionService ,public router: Router, private st:StorageLocalService) { 
  
    
  }
  ngOnInit(): void {
   //this.verificar();

  }
  verificar() {
      //this.st.guardarValor('usr',undefined);
    this.usrNav = this.st.traerValor('usr');

    if (this.usrNav == undefined) {
     this.serTrans.cargarTransacciones2();
    }

  }

 

  
 

}
