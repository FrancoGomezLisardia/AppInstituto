import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';


import * as firebase from 'firebase';
import {  AngularFireDatabase } from "angularfire2/database-deprecated";

@IonicPage()
@Component({
  selector: 'page-nuevo-contenido',
  templateUrl: 'nuevo-contenido.html',
})
export class NuevoContenidoPage {
  titulo: string = "";
  enlace:string = "";
  descripcion: string="";
  ruta: any;
  video:any;
  //imagenPreview:string = "";
  imagen64:string;
  estado=1;
  constructor(public navCtrl: NavController, 
           
              public navParams: NavParams,
             
              private viewCtrl:ViewController,
              private toastCtrl:ToastController,
              public fireDatabase: AngularFireDatabase,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoContenidoPage');
  }
 
  cerrarModal() {
    this.viewCtrl.dismiss();
   }
  guardar(){
    let video={
      enlace:this.enlace,
      titulo:this.titulo,
      descripcion:this.descripcion,
      estado:this.estado
    }
    this.fireDatabase.list('video/').push(video)
    let toast = this.toastCtrl.create({
      message: 'Enlace agregado',
      duration: 3000
    });
    toast.present();
    this.viewCtrl.dismiss()
    
  }


}
