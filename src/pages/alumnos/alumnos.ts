import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController,
  AlertController,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { RegistrarPage } from '../registrar/registrar';

import { DetalleAlumnoPage } from '../detalle-alumno/detalle-alumno';

/**
 * Generated class for the AlumnosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-alumnos',
  templateUrl: 'alumnos.html',
})
export class AlumnosPage {
  //clientes: FirebaseListObservable<any>;
  //Variables barra de busqueda
  public clientesList:Array<any>;
 
   enEspera:any[] = [];
  public loadedClientesList:Array<any>;
  public clientesRef:any;
  listaFinal:any[] = [];
  constructor(public navCtrl: NavController,
              public modalCtrl:ModalController, 
              public alertCtrl:AlertController,
              public viewCtrl:ViewController,
              public toastCtrl:ToastController,
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
this.listaFinal=this.clientesList
});
//-------------------------------------------------------
}

eliminar(parametro){
  //Hace una eliminacion logica de los productos
 //modificando su estado a 0
 let confirmar = this.alertCtrl.create({
   title: 'Eliminar',
   message: '¿Desea eliminar este usaurio?',
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
        console.log(parametro.id)
         firebase.database().ref('Usuarios/' + parametro.id).remove();
 let toast = this.toastCtrl.create({
  message: 'Usuario eliminado',
  duration: 3000
});
toast.present();

       }
     }
   ]
 });
 confirmar.present()
 
}
usuariosEnEspera(){
 let enEspera:any[]= [];
  for (let index = 0; index < this.clientesList.length; index++) {
    const element = this.clientesList[index];
    if (element.condicion=="en espera") {
     enEspera.push(element)
     console.log(element)
    }
    
  }
  this.listaFinal= enEspera
  console.log(enEspera)
}
usuariosTodos(){
  this.listaFinal=this.clientesList
  console.log(this.clientesList)
}
usuariosHabilitado(){
  let habilitados:any[]= [];
  for (let index = 0; index < this.clientesList.length; index++) {
    const element = this.clientesList[index];
    if (element.condicion=="Habilitado") {
     habilitados.push(element)
     console.log(element)
    }
    
  }
  this.listaFinal= habilitados
  console.log(habilitados)
}


initializeItems2(): void {
  this.listaFinal= this.loadedClientesList;
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

this.listaFinal=  this.listaFinal.filter((v) => {
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

alta(parametro){
      
       
  let confirmar = this.alertCtrl.create({
    title: 'Alta',
    message: '¿Dar alta usuario?',
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
         
          firebase.database().ref('Usuarios/' +parametro.id).update({
        //   estado:1,
        //   nombre:parametro.nombre,
        //   apellido:parametro.apellido,
        //   dni:parametro.dni,
        //   id:parametro.id,
        //   telefono:parametro.telefono,
        //   domicilio:parametro.domicilio,
        //   fecha_Nacimiento:parametro.fecha_Nacimiento,
        //   sexo:parametro.sexo,
        //  correo:parametro.correo,
         condicion:"Habilitado"
  });
  let toast = this.toastCtrl.create({
   message: 'Usuario habilitado',
   duration: 3000
 });
 toast.present();
 
        }
      }
    ]
  });
  confirmar.present()
  

}
}