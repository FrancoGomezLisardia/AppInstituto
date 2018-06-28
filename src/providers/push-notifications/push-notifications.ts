import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';

/*
  Generated class for the PushNotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushNotificationsProvider {

  constructor(private oneSignal: OneSignal,
              private plataforma:Platform) {
    console.log('Hello PushNotificationsProvider Provider');
  }
  

init_notificactions(){
  if(this.plataforma.is('cordova')){
    this.oneSignal.startInit('30e89f43-29d2-4549-96e3-14ef42edfb25', '855151332533');
  
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });
    
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    
    this.oneSignal.endInit();
  }else{
    console.log("OneSignal no funciona en Chrome")
  }
  
}
}
