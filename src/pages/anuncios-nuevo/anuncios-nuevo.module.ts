import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnunciosNuevoPage } from './anuncios-nuevo';

@NgModule({
  declarations: [
    AnunciosNuevoPage,
  ],
  imports: [
    IonicPageModule.forChild(AnunciosNuevoPage),
  ],
})
export class AnunciosNuevoPageModule {}
