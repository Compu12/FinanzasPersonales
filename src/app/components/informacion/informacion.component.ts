import { Component, OnInit } from '@angular/core';
import { Transacc } from 'src/app/interfaces/transaccion.interface';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  

  suma: number;

  constructor(public transServ: TransaccionService) {
  }
  
  ngOnInit(): void {
    
  }

  delete(id: string) {
    console.log(id);
    
    this.transServ.deleteTransaccion(id);
  }

  
  
  
}
