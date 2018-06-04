import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleAlumnoPage } from './detalle-alumno';

@NgModule({
  declarations: [
    DetalleAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleAlumnoPage),
  ],
})
export class DetalleAlumnoPageModule {}
