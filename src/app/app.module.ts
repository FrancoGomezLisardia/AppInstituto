import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InicioSesionPage } from '../pages/inicio-sesion/inicio-sesion';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { InicioSesionPage } from '../pages/inicio-sesion/inicio-sesion';
//import {RegistrarPage} from '../pages/registrar/registrar'
//import { FileChooser } from '@ionic-native/file-chooser';

 export const firebaseConfig = {
    apiKey: "AIzaSyA1_-Sc6cTCrQQ3ba7cQAweGYjO_OiIdrs",
    authDomain: "appcrimi.firebaseapp.com",
    databaseURL: "https://appcrimi.firebaseio.com",
    projectId: "appcrimi",
    storageBucket: "appcrimi.appspot.com",
    messagingSenderId: "855151332533"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InicioSesionPage 
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InicioSesionPage 
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
