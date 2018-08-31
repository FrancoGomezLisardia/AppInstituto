import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { AlumnosPage } from '../pages/alumnos/alumnos';



import {AnunciosNuevoPage} from '../pages/anuncios-nuevo/anuncios-nuevo';

import { NuevoContenidoPage } from '../pages/nuevo-contenido/nuevo-contenido';
import { PushNotificationsProvider } from '../providers/push-notifications/push-notifications';

import { InicioSesionPage } from '../pages/inicio-sesion/inicio-sesion';
export const firebaseConfig = {
  apiKey: "AIzaSyA1_-Sc6cTCrQQ3ba7cQAweGYjO_OiIdrs",
  authDomain: "appcrimi.firebaseapp.com",
  databaseURL: "https://appcrimi.firebaseio.com",
  projectId: "appcrimi",
  storageBucket: "appcrimi.appspot.com",
  messagingSenderId: "855151332533"
};
firebase.initializeApp(firebaseConfig)
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
 @ViewChild('NAV') nav: Nav;
  public rootPage: any;
  public pages: Array<{ titulo: string, component: any, icon: string }>;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
             public notificaciones:PushNotificationsProvider) {
    this.rootPage = InicioSesionPage;
  this.pages = [

    { titulo: 'Inicio',          component: HomePage,        icon: 'home'},
    //  { titulo: '',        component: ClientesPage,         icon: 'person'},
     { titulo: 'Nuevo Contenido',         component: NuevoContenidoPage,          icon: 'add'},
     { titulo: 'Nuevo Anuncio',         component: AnunciosNuevoPage,          icon: 'add'},
    { titulo: 'Alumno',     component:AlumnosPage    ,     icon: 'person'},
    { titulo: 'Cerrar Sesion',   component: InicioSesionPage,     icon: 'close-circle'}
  ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.notificaciones.init_notificactions()
    });
  }





  goToPage(page){
    this.nav.setRoot(page);
  }

}