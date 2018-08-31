import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProveedorProvider} from '../../providers/proveedor/proveedor'
import { ImagePicker,ImagePickerOptions }         from '@ionic-native/image-picker';

/**
 * 
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
              private imagePicker: ImagePicker,
              public navParams: NavParams,
              public proveedor:ProveedorProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnunciosNuevoPage');
  }
  cerrarModal() {
    console.log("AKJDHAKJSDHKASJ")
   }

   seleccionar_foto(){

    let opciones:ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    }


    this.imagePicker.getPictures(opciones).then((results) => {

      for (var i = 0; i < results.length; i++) {
          // console.log('Image URI: ' + results[i]);
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64 = results[i];
      }

    }, (err) => {

      console.log( "ERROR en selector", JSON.stringify(err) );

    });


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
