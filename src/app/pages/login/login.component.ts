import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { StorageLocalService } from 'src/app/services/storage.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private st: StorageLocalService,
    private servTrans: TransaccionService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.verificar();
  }

  verificar() {
    var user = this.st.traerValor('usr');


    if (user != undefined) {
      this.router.navigate(['/home']);
    }

  }

  async IngresaClk() {
    let usr = (<HTMLInputElement>document.getElementById('txtUsuario')).value;
    let pas = (<HTMLInputElement>document.getElementById('txtContra')).value;


    let res = this.servTrans.login(usr, pas);


    if (res == undefined) {
      this.showError();

    } else {

      this.st.guardarValor('usr', res);
      this.router.navigate(['home']);
      this.servTrans.cargarTransacciones2();
    }

  }

  showError() {
    this.toastr.error('Usuario o Contraseña incorrectas intente nuevamente!', 'Login');
  }
}
