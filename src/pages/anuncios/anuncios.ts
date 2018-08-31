import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database-deprecated';
/**
 * Generated class for the AnunciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-anuncios',
  templateUrl: 'anuncios.html',
})
export class AnunciosPage {
  productos: FirebaseListObservable<any>;
  //Variables barra de busqueda
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:any;

//------------------------------------------------
anuncios:any;
  constructor(public navCtrl: NavController,public fireDatabase: AngularFireDatabase, public navParams: NavParams) {


    // this.productos=this.fireDatabase.list('anuncios')
    this.anuncios = firebase.database().ref('anuncios')
   this.countryRef  = firebase.database().ref('anuncios')
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnunciosPage');
  }

}
