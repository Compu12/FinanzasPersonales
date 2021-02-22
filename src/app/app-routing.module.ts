import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { NuevaTransaccionComponent } from './components/nueva-transaccion/nueva-transaccion.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/new', component: NuevaTransaccionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: InformacionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
