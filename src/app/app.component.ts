import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
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
  rootPage:any = InicioSesionPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

