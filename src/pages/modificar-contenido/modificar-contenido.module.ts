import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificarContenidoPage } from './modificar-contenido';

@NgModule({
  declarations: [
    ModificarContenidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificarContenidoPage),
  ],
})
export class ModificarContenidoPageModule {}
