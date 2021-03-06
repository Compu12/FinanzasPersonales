import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { StorageLocalService } from 'src/app/services/storage.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  

  suma: number;
  usr:Usuario={id:'',nombre:'',apellido:'',usuario:'',contraseña:''};
  constructor(public transServ: TransaccionService,private router: Router,private st:StorageLocalService) {
  }
  
  ngOnInit(): void {
    this.verificar();
  }

  verificar() {
   
    this.usr= this.st.traerValor('usr');
    
    if(this.usr==undefined){
      this.router.navigate(['']);
    }

  }
  delete(id: string) {
   
    
    this.transServ.deleteTransaccion(id);
  }

  
  
  
}
