import { Injectable } from '@angular/core';
import { ToastController,Platform,AlertController } from 'ionic-angular';
import { AngularFireDatabase  } from 'angularfire2/database-deprecated';


// import{Storage}from "@ionic/Storage";

import * as firebase from 'firebase';

@Injectable()
export class ProveedorProvider {
  tipo_usuario:any;
  usuarioHabilitado:any;
  imagenes: archivoSubir[] = [];
  constructor( public toastCtrl: ToastController,
    public afDB: AngularFireDatabase,
   
    private alertCtrl:AlertController,
    private platform:Platform,
    // private storage:Storage
  ){
    console.log('Hello ProveedorProvider Provider');
  }
cargar_imagen_anuncio(archivo:archivoSubir){
  //Mensaje de carga
  let promesa = new Promise( (resolve, reject)=>{

      
    let toast = this.toastCtrl.create({
      message: 'Cargando...',
      duration: 3000
    });
    toast.present();//
     
    let storeRef = firebase.storage().ref();
    let nombreArchivo:string = new Date().valueOf().toString(); // 1231231231

    let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`img/${ nombreArchivo }`)
                .putString( archivo.img, 'base64', { contentType: 'image/jpeg' }  );

       uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{ }, // saber el % de cuantos Mbs se han subido
          ( error ) =>{
            // manejo de error
            console.log("ERROR EN LA CARGA");
            console.log(JSON.stringify( error ));
            //this.mostrar_Toast(JSON.stringify( error ));
            let toast = this.toastCtrl.create({
              message: JSON.stringify( error ),
              duration: 3000
            });
            toast.present();
            reject();
          },
          ()=>{
            // TODO BIEN!!
            console.log('Archivo subido');
            //this.mostrar_Toast('Imagen cargada correctamente');
            let toast = this.toastCtrl.create({
              message: 'Imagen cargada correctamente',
              duration: 1000
            });
            toast.present();
            
            let url = uploadTask.snapshot.downloadURL;

            this.crear_post( archivo. descripcion, url, nombreArchivo,archivo.precio,archivo.estado );

            resolve();
          }

        )});

  return promesa;
}
private crear_post( descripcion: string, url: string, 
  nombreArchivo:string,precio:string,estado:number ){

  let post: archivoSubir = {
    precio:precio,
    img: url,
    descripcion: descripcion,
    key: nombreArchivo,
    estado:estado
  };
  console.log( JSON.stringify(post) );

  // this.afDB.list('/post').push(post)
  this.afDB.object(`/anuncios/${ nombreArchivo }`).update(post);

  this.imagenes.push( post );

}
}
interface archivoSubir{
  precio: string;
  descripcion:string;
  img:string;
  key?:string;
  estado:number;

}