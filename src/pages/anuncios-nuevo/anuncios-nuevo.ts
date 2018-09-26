import { Component } from '@angular/core';
import {NavController, NavParams,ToastController } from 'ionic-angular';
import {ProveedorProvider} from '../../providers/proveedor/proveedor'
import { ImagePicker,ImagePickerOptions }         from '@ionic-native/image-picker';
import {  AngularFireDatabase } from "angularfire2/database-deprecated";

/**
 * 
 * Generated class for the AnunciosNuevoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-anuncios-nuevo',
  templateUrl: 'anuncios-nuevo.html',
})
export class AnunciosNuevoPage {
  descripcion: string = "";
  enlace:string = "";
  precio:string = "";
  imagenPreview:string = "";
  imagen64:string="";
  estado=1;
  
  constructor(public navCtrl: NavController,
              private imagePicker: ImagePicker,
              public navParams: NavParams,
              public toastCtrl:ToastController,
              public proveedor:ProveedorProvider,
              public fireDatabase: AngularFireDatabase,) {
                console.log(this.descripcion.length,this.precio.length,this.enlace.length)
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

// mostrar_camara(){
//   const options: CameraOptions = {
//     quality: 50,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE
//   }

//   this.camera.getPicture(options).then((imageData) => {
//    // imageData is either a base64 encoded string or a file URI
//    // If it's base64:
//    this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
//   this.imagen64=imageData;
//   }, (err) => {
//    // Handle error
//    console.log("Error en camara",JSON.stringify(err))
//   });
// }
  registrar(){
    let key_=new Date().valueOf().toString();
    let archivo={
      key:key_,
      img:this.imagen64,
      descripcion:this.descripcion,
      precio:this.precio,
      estado:this.estado,
      enlace:this.enlace
    };

    this.fireDatabase.object(`/anuncios/${ key_ }`).update(archivo)
    let toast = this.toastCtrl.create({
      message: 'Enlace agregado',
      duration: 3000
    });
    toast.present();
    //this.proveedor.cargar_imagen_anuncio(archivo).then(()=>this.cerrarModal() );
  }


  

}
