import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { NuevaTransaccionComponent } from './components/nueva-transaccion/nueva-transaccion.component';

const routes: Routes = [
  { path: '', component: InformacionComponent },
  { path: 'new', component: NuevaTransaccionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
