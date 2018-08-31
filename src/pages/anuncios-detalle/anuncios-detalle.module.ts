import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnunciosDetallePage } from './anuncios-detalle';

@NgModule({
  declarations: [
    AnunciosDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(AnunciosDetallePage),
  ],
})
export class AnunciosDetallePageModule {}
