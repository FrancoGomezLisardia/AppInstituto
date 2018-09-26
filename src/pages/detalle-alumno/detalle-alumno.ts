import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the DetalleAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detalle-alumno',
  templateUrl: 'detalle-alumno.html',
})
export class DetalleAlumnoPage {
   alumno: any;
  constructor(public navCtrl: NavController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public navParams: NavParams) {
    this.alumno=this.navParams.get("alumno")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleAlumnoPage');
  }
  
}
