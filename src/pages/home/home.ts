import { Component } from '@angular/core';
import { NavController,ViewController ,LoadingController,
  ModalController,NavParams,MenuController,AlertController,ToastController} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {  AngularFireDatabase  } from 'angularfire2/database-deprecated';
import firebase from "firebase"
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';
import { NuevoContenidoPage } from '../nuevo-contenido/nuevo-contenido';
import {ProveedorProvider} from "../../providers/proveedor/proveedor";

import { ModificarContenidoPage } from '../modificar-contenido/modificar-contenido';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:any;
  tipo_usuario:string
  verificar:boolean=true;
lista:any;
  constructor(public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public toastCtrl:ToastController,
    public alertCtrl:AlertController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    public proveedor:ProveedorProvider,
    private loadingCtrl:LoadingController,
    public modalCtrl:ModalController,
    //private videoPlayer: VideoPlayer,
    public fireDatbase:AngularFireDatabase) {
      this.tipo_usuario=this.proveedor.tipo_usuario
 
     
    //  this.tipo_usuario=this.navParams.get("usuarioLogeado");
     
     console.log(this.tipo_usuario)
      if (this.tipo_usuario=="profe") {
        this.verificar=true
        this.menuCtrl.get().enable(true)
      }else{
        this.verificar=false
        this.menuCtrl.get().enable(false);//Desactiva menu deslizable
      }
      console.log(this.tipo_usuario)
    let loading = this.loadingCtrl.create({
      content: 'Cargando Productos. Por favor, espere...'
  });
  loading.present();
    this.lista=this.fireDatbase.list('/video')
    console.log( "LISTA",this.lista)
    this.countryRef  = firebase.database().ref('video')
                 .orderByChild('estado')
                   .equalTo(1);//Referencia a los productos de estado 1
                  
this.countryRef.on('value', countryList => {
let countries = [];
countryList.forEach( country => {
countries.push(country.val());
return false;
});

this.countryList = countries;
this.loadedCountryList = countries;
//this.consulta()
});
//-------------------------------------------------------
loading.dismiss();

  }

  consulta(){
    let contenido=[]
   if(this.proveedor.usuarioHabilitado=="no"){
    contenido=this.countryList
    
   }else{
    for(let i of this.countryList ){
      if(i.vista=="todos"){
        contenido=this.countryList
    }else{
      contenido.push(i)
    }
   }


   }
   console.log("contenido",contenido)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }
  cerrarModal() {
    this.navCtrl.setRoot(InicioSesionPage)
   }
   agregarContenido(){
    let modal =this.modalCtrl.create(NuevoContenidoPage);
   modal.present();
   }
   irASitio(enlace){
    this.iab.create(enlace,"_blank");
  
   }
   editar(elemento){
    let modal =this.modalCtrl.create(ModificarContenidoPage,{"contenido":elemento});
    modal.present();
   }
   eliminar(elemento){
    let confirmar = this.alertCtrl.create({
      title: 'Eliminar',
      message: '¿Desea eliminar esta contenido?',
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
            console.log('Presiono Aceptar');
            let contenido = this.fireDatbase.list('/video');
            contenido.remove(elemento.key) ;//elimina pedidos
    
      let toast = this.toastCtrl.create({
        message: 'Pedido eliminado',
        duration: 1000
      });
      toast.present();
        
     
          }
        }
      ]
    });
  confirmar.present();
  }
  
   
   initializeItems2(): void {
    this.countryList = this.loadedCountryList;
    console.log(this.countryList);
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
  
    this.countryList = this.countryList.filter((v) => {
      if(v.titulo && q) {
        if (v.titulo.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.countryList.length);
  
  }
//    reproducir(){
// // Playing a video.
// this.videoPlayer.play('./assets/imgs/movie.mp4').then(() => {
//  console.log('video completed');
// }).catch(err => {
//  console.log(err);
// });
//    }
}
