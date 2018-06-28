import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalleAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-alumno',
  templateUrl: 'detalle-alumno.html',
})
export class DetalleAlumnoPage {
   alumno: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.alumno=this.navParams.get("'alumno")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleAlumnoPage');
  }

}
