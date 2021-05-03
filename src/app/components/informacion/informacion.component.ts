import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Transacc } from 'src/app/interfaces/transaccion.interface';
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
  usr: Usuario = { id: '', nombre: '', apellido: '', usuario: '', contraseña: '' };
  idSeleccionado: string;
  showModal: boolean = false;
  constructor(
    public transServ: TransaccionService,
    private router: Router,
    private st: StorageLocalService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.verificar();
  }

  verificar() {

    this.usr = this.st.traerValor('usr');

    if (this.usr == undefined) {
      this.router.navigate(['login']);
    }

  }

  SeleccionarItem(id: string) {

    this.idSeleccionado = id;
    this.showModal = true;
  }

  delete() {
    this.transServ.deleteTransaccion(this.idSeleccionado);
    this.cancel();
    this.showSuccess();


  }


  cancel() {
    this.showModal = false
    this.idSeleccionado = undefined;
  }

  showSuccess() {
    this.toastr.success('La transacción ha sido eliminada con éxito!', 'Eliminado');
  }



}


