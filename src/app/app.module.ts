import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//PAGINAS
import { InicioSesionPage } from '../pages/inicio-sesion/inicio-sesion';
import { RegistrarPage } from '../pages/registrar/registrar';
import { NuevoContenidoPage } from '../pages/nuevo-contenido/nuevo-contenido';
import { ModificarContenidoPage } from '../pages/modificar-contenido/modificar-contenido';
import { OneSignal } from '@ionic-native/onesignal';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import { AngularFireModule }         from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DetalleAlumnoPage } from '../pages/detalle-alumno/detalle-alumno';
import { EmailComposer } from '@ionic-native/email-composer';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ProveedorProvider } from '../providers/proveedor/proveedor';
//import { InicioSesionPage } from '../pages/inicio-sesion/inicio-sesion';
//import {RegistrarPage} from '../pages/registrar/registrar'
//import { FileChooser } from '@ionic-native/file-chooser';
import { AlumnosPage } from '../pages/alumnos/alumnos';
import { PushNotificationsProvider } from '../providers/push-notifications/push-notifications';

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
    InicioSesionPage,
    RegistrarPage ,
  NuevoContenidoPage,
  ModificarContenidoPage,
  AlumnosPage,
  DetalleAlumnoPage
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
    InicioSesionPage ,
    RegistrarPage ,
    NuevoContenidoPage,
    ModificarContenidoPage,
    AlumnosPage,
    DetalleAlumnoPage
  ],
  providers: [
    InAppBrowser,
    
    OneSignal,
    StatusBar,
    EmailComposer,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProveedorProvider,
    PushNotificationsProvider
  ]
})
export class AppModule {}
