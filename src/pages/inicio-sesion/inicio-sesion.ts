import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrarPage } from '../registrar/registrar';

import firebase from 'firebase';
import { UsersModels } from '../../models/users-model';
import {ProveedorProvider} from "../../providers/proveedor/proveedor";

import { AngularFireDatabase  } from 'angularfire2/database-deprecated';
/**
 * Generated class for the InicioSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-sesion',
  templateUrl: 'inicio-sesion.html',
})
export class InicioSesionPage {
  userModel: UsersModels;
  listaDeUsuarios:any[]= [];
  public usuariosRef:firebase.database.Reference;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl:ModalController,
              private proveedor:ProveedorProvider,
              private alertCtrl:AlertController,
              private loadingCtrl:LoadingController) {
    let loading = this.loadingCtrl.create({
    content: 'Cargando Aplicacion. Por favor, espere...'
});

loading.present();
this.userModel = new UsersModels();
this.usuariosRef = firebase.database().ref('/Usuarios');//Crea una referencia al Nodo Usuarios
this.usuariosRef.on('value', listaDeUsuarios => {
let usuarios = [];
listaDeUsuarios.forEach( usuario => {
usuarios.push(usuario.val());
return false;
});
this.listaDeUsuarios = usuarios ;
console.log("Usuarios Registrados:",this.listaDeUsuarios);
});//Crea un arreglo con los elementos del nodo Usuarios


loading.dismiss();
}


Invitado(){
  this.navCtrl.setRoot(HomePage)
}
Iniciar_Sesion() {
  for (let index = 0; index < this.listaDeUsuarios.length; index++) {
    
    const element =  this.listaDeUsuarios[index];
     if (element.contrasena==this.userModel.password && element.correo==this.userModel.email ) {
    //    //this.guardar_storage(element);
    //    //this.cip.usuario_actual.push(element)
    //    //console.log("ID Usuario Actual:",this.cip.usuario_actual)
      this.proveedor.tipo_usuario=element.tipo_usuario
      this.proveedor.usuarioHabilitado=element.usuarioHabilitado

    //    //this.cip.id_usuario=element.id
        this.navCtrl.setRoot(HomePage,{'usuarioLogeado':element});
       return;
     } 
  }
this.alertCtrl.create({
title:"Error",
subTitle:'Verifique que los datos ingresados sean los correcto y si esta conectado a internet.',
buttons:["Aceptar"]
}).present();
console.log('--------------------------------');
return;


}
Registrar(){

let modal =this.modalCtrl.create(RegistrarPage);
modal.present();
}
}