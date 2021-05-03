import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Transacc } from 'src/app/interfaces/transaccion.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { StorageLocalService } from 'src/app/services/storage.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-nueva-transaccion',
  templateUrl: './nueva-transaccion.component.html',
  styleUrls: ['./nueva-transaccion.component.css']
})
export class NuevaTransaccionComponent implements OnInit {

  transaccion: Transacc = {
    nombre: "",
    monto: "",
    tipo: "",
    userId: ""
  };
  usr: Usuario = { id: '', nombre: '', apellido: '', usuario: '', contraseña: '' };
  constructor(
    private transaccionService: TransaccionService,
    private router: Router,
    private st: StorageLocalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.verificar();
  }

  verificar() {

    this.usr = this.st.traerValor('usr');

    if (this.usr == undefined) {
      this.router.navigate(['']);
    }

  }
  create() {
    let nombreT = (<HTMLInputElement>document.getElementById('txtNombre')).value.toString();
    let montoT = (<HTMLInputElement>document.getElementById('txtMonto')).value.toString();
    var op1 = <HTMLInputElement>document.getElementById("inlineRadio1");
    var isChecked = op1.checked;
    var op2 = <HTMLInputElement>document.getElementById("inlineRadio2");
    var isChecked2 = op2.checked;

    if (isChecked == false && isChecked2 == false) {
      this.showError();

    } else if (nombreT.length == 0 || montoT.length == 0) {
      this.showError();
    } else {
      if (isChecked == true) {
        var tipoT = "Ingreso";
      } else {
        var tipoT = "Egreso";
      }
      let pro = {
        nombre: nombreT,
        monto: montoT,
        tipo: tipoT,
        userId: this.usr?.id

      }

      this.transaccion = pro;

      this.transaccionService.createTransaccion(this.transaccion);
      this.router.navigate(['home']);
      this.showSuccess();
    }

  }

  showSuccess() {
    this.toastr.success('La transacción ha sido agregada con éxito!', 'Agregar Transacción');
  }
  showError() {
    this.toastr.error('Llene todos los campos', 'Error');
  }

}
