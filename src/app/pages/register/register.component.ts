import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { StorageLocalService } from 'src/app/services/storage.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: Usuario = {
    nombre: '',
    apellido: '',
    usuario: '',
    contraseña: ''
  }
  constructor(private usuarioSrv: TransaccionService, private router: Router, private st: StorageLocalService) { }

  ngOnInit(): void {
    this.verificar();
  }


  create() {
    let nombreU = (<HTMLInputElement>document.getElementById('txtNombre')).value.toString();
    let apellidoU = (<HTMLInputElement>document.getElementById('txtApellido')).value.toString();
    let usuarioU = (<HTMLInputElement>document.getElementById('txtUsuario')).value.toString();
    let contraseñaU = (<HTMLInputElement>document.getElementById('txtContra')).value.toString();


    let user = {
      nombre: nombreU,
      apellido: apellidoU,
      usuario: usuarioU,
      contraseña: contraseñaU

    }

    this.newUser = user;

    this.usuarioSrv.createUsuario(this.newUser);
    this.router.navigate(['']);
  }
  verificar() {
    var user = this.st.traerValor('usr');


    if (user != undefined) {
      this.router.navigate(['/home']);
    }

  }

}


