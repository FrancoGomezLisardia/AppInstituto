import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,AlertController,ToastController } from 'ionic-angular';
import firebase from 'firebase';
//import { AngularFireDatabase,FirebaseListObservable   } from 'angularfire2/database';
//import { AngularFireDatabase, } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
/**
 * Generated class for the ModificarContenidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-modificar-contenido',
  templateUrl: 'modificar-contenido.html',
})
export class ModificarContenidoPage {
  contenido:any;


  contenido_modificar= {
    titulo: null, 
    enlace:null,
    descripcion:null,
    estado:1
  };
  id:null;
  constructor(public navCtrl: NavController,
    public toastCtrl:ToastController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl:AlertController,
                             
    public afDB:AngularFireDatabase) {
      
      this.contenido=this.navParams.get("contenido")//lista de contenidos
      this.id=this.contenido.key//clave contenido
      console.log("contenido obtenido",this.contenido)
      this. getContenido(this.id)
      .subscribe(contenidod =>{
        this. contenido_modificar= contenidod;

        });
        console.log("contenido modificar", this. contenido_modificar)

      }
ionViewDidLoad() {
  console.log('ionViewDidLoad ModificarContenidoPage');
}
cerrarModal() {
this.viewCtrl.dismiss();
}


public getContenido(id){
return this.afDB.object('video/'+id);
}
modificar(){ 

let contenido_modificado = {
  key:this.id,
  titulo:this.contenido_modificar.titulo,
  enlace:this.contenido_modificar.enlace,
  descripcion:this.contenido_modificar.descripcion,
  estado:this.contenido_modificar.estado
};
let confirmar = this.alertCtrl.create({
title: 'Modificar',
message: '¿Confirma la modificacion?',
buttons: [
{
text: 'Cancelar',
handler: () => {
  
  console.log('Presiono Cancelar');
}
},
{
text: 'Aceptar',
handler: () => {
  firebase.database().ref('video/' + this.contenido.key).set(contenido_modificado);
  let toast = this.toastCtrl.create({
    message: 'Contenido Modificado',
    duration: 3000
  });
  toast.present();

  this.viewCtrl.dismiss();
}
}
]
});
confirmar.present()
}//TERMINA
}
 


