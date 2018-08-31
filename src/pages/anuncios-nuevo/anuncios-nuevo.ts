import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProveedorProvider} from '../../providers/proveedor/proveedor'
/**
 * Generated class for the AnunciosNuevoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anuncios-nuevo',
  templateUrl: 'anuncios-nuevo.html',
})
export class AnunciosNuevoPage {
  descripcion: string = "";
  precio:string="";
  imagenPreview:string = "";
  imagen64:string;
  estado=1;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public proveedor:ProveedorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnunciosNuevoPage');
  }
  cerrarModal() {
    console.log("AKJDHAKJSDHKASJ")
   }

  
  registrar(){
    let archivo={
      img:this.imagen64,
      descripcion:this.descripcion,
      precio:this.precio,
      estado:this.estado
    };
    this.proveedor.cargar_imagen_anuncio(archivo).then(()=>this.cerrarModal() );
  }
}
