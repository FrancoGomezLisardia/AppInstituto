import { Component } from '@angular/core';
import { NavController,ViewController ,LoadingController,ModalController,NavParams} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {  AngularFireDatabase  } from 'angularfire2/database';
import firebase from "firebase"
import { InicioSesionPage } from '../inicio-sesion/inicio-sesion';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:any;
  tipo_usuario:string
  verificar:boolean=false;
lista:any;
  constructor(public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    private loadingCtrl:LoadingController,
    public modalCtrl:ModalController,
    //private videoPlayer: VideoPlayer,
    public fireDatbase:AngularFireDatabase) {
      this.tipo_usuario=this.navParams.get("usuarioLogeado");
     console.log(this.tipo_usuario)
      if (this.tipo_usuario=="profe") {
        this.verificar=true
      }else{
        this.verificar=false
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

});
//-------------------------------------------------------
loading.dismiss();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }
  cerrarModal() {
    this.navCtrl.setRoot(InicioSesionPage)
   }
   agregarContenido(){
    //let modal =this.modalCtrl.create(NuevoContenidoPage);
   // modal.present();
   }
   irASitio(enlace){
    this.iab.create(enlace,"_blank");
  
   }
   editar(elemento){

   }
   eliminar(elemento){

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
