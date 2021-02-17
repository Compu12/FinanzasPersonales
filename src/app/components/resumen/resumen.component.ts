import { Component, OnInit } from '@angular/core';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  
  ingresos:number;
  constructor(public serTrans:TransaccionService ) { 
  
    
  }
  ngOnInit(): void {
   // this.ingresosTotal();

  }

 

  
 

}
