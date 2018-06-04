import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { RegistrarPage } from '../registrar/registrar';

import { DetalleAlumnoPage } from '../detalle-alumno/detalle-alumno';

/**
 * Generated class for the AlumnosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alumnos',
  templateUrl: 'alumnos.html',
})
export class AlumnosPage {
  //clientes: FirebaseListObservable<any>;
  //Variables barra de busqueda
  public clientesList:Array<any>;
  public loadedClientesList:Array<any>;
  public clientesRef:any;
  constructor(public navCtrl: NavController,
              public modalCtrl:ModalController, 
              public navParams: NavParams) {
  
   
     //-------------------------------------------------------
    
     this.clientesRef  = firebase.database().ref('Usuarios')
     .orderByChild('estado')
     .equalTo(1);//Referencia a los productos de estado 1
//  .orderByChild('estado')
//   .equalTo(1);//Referencia a los productos de estado 1
this.clientesRef.on('value', clientesList => {
let clientes = [];
clientesList.forEach( cliente => {
clientes.push(cliente.val());
return false;
});

this.clientesList = clientes;
this.loadedClientesList = clientes;

});
//-------------------------------------------------------
}


initializeItems2(): void {
this.clientesList = this.loadedClientesList;
console.log(this.clientesList);
}
//---------------------------------------------------
getItems2(searchbar) {
// Reset items back to all of the items
this.initializeItems2();

// set q to the value of the searchbar
var q = searchbar.srcElement.value;

// if the value is an empty string don't filter the items
if (!q) {
return;
}

this.clientesList = this.clientesList.filter((v) => {
if(v.apellido && q ) {
if ((v.apellido.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
return true;
}
return false;
}
});

console.log(q, this.clientesList.length);

}
//---------------------------------------------------
detalleCliente(alumno){
let modal =this.modalCtrl.create(DetalleAlumnoPage,{'alumno':alumno});
modal.present();
}
nuevoCliente(){
let modal =this.modalCtrl.create(RegistrarPage);
modal.present();
}
}