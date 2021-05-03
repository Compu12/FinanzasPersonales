import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { StorageLocalService } from 'src/app/services/storage.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usrNav: Usuario = { id: '', nombre: '', apellido: '', usuario: '', contraseña: '' };

  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  
  constructor(private router: Router, private st: StorageLocalService, private transSrv: TransaccionService) {

  }

  ngOnInit(): void {
    this.verificar();
  }
  verificar() {
    //this.st.guardarValor('usr',undefined);
    this.usrNav = this.st.traerValor('usr');

    if (this.usrNav == undefined) {
      this.router.navigate(['']);
    }

  }
  salirBtn() {
    this.st.guardarValor('usr', undefined);
    this.transSrv.user = undefined;
    this.router.navigate(['']);
  }
  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
}
}
