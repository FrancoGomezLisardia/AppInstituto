import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoContenidoPage } from './nuevo-contenido';

@NgModule({
  declarations: [
    NuevoContenidoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoContenidoPage),
  ],
})
export class NuevoContenidoPageModule {}
