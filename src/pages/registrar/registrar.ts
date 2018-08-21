import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import firebase from 'firebase';
import { AngularFireDatabase  } from 'angularfire2/database-deprecated';
import{HomePage} from "../../pages/home/home"
import { EmailComposer } from '@ionic-native/email-composer';
import { InicioSesionPage } from '../../pages/inicio-sesion/inicio-sesion';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage { 
  myForm: FormGroup;
  lista:any[]=[];
  verificar:boolean=false;
  //DatosFirebase:Firebase_Data;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public viewCtrl:ViewController,
              public toastCtrl:ToastController,
              public alertCtrl:AlertController,
              private emailComposer: EmailComposer,
              private afDB: AngularFireDatabase) {
                this.myForm = this.createMyForm();
  }


 //Esta funcion carga el model perfil con los datos del formulario
   //y luego llama a la funcion crearPerfil()
  //--------------------------------------------------------------
  Registrar(){
    let id_Usuario=new Date().valueOf().toString();
    let Nuevo_Usuario : Interface_Usuario = {
      nombre:this.myForm.value.name,
      apellido:this.myForm.value.lastName,
     
      id:id_Usuario,
      telefono:this.myForm.value.telefono,
      //domicilio:this.myForm.value.domicilio,
      //fecha_Nacimiento:this.myForm.value.dateBirth,
      //sexo:this.myForm.value.gender,
      tipo_usuario:"Alumno",
      correo:this.myForm.value.email,
      contrasena:this.myForm.value.password,
      estado:1,
      condicion:"en espera"
    }
    this.verificar_correo()
    console.log("logitud lista:",this.lista.length)
    this.lista.length
    if (this.lista.length==0) {
      this.afDB.object(`/Usuarios/${ id_Usuario }`).update(Nuevo_Usuario);
      let toast = this.toastCtrl.create({
     message: 'Alumno registrado',
     duration: 3000
   });
   toast.present();
     //this.viewCtrl.dismiss();

    //  let email = {
    //   to: 'lisardia.franco@gmail.com',
    //   cc: '',
    //   bcc: [],
    //   attachments: [
    //     //Archivos adjuntos
    //   ],
    //   subject: 'Nuevo Usuario',
    //   body: 'Se ha registrado un nuevo usuario',
    //   isHtml: true
    // };
    //this.emailComposer.open(email);

     this.navCtrl.setRoot(InicioSesionPage)
    }else{
      let confirmar = this.alertCtrl.create({
        title: 'Aviso',
        message: 'El correo ingresado ya existe',
        buttons: [
          {
           
            text: 'Aceptar',
            handler: () => {
                         }
          }
        ]
      });
      confirmar.present()
    }
   
  
  }
verificar_correo(){
  let ref;

  
  ref=firebase.database().ref('Usuarios')
                        .orderByChild("correo")
                       .equalTo(this.myForm.value.email)
    ref.on('value', lista => {
    let correos = [];
    lista.forEach( correo => {
      
    correos.push(correo.val());
    console.log("valor",correo.val())
    return false;
    });
    this.lista =correos;
    
    });
    console.log("LISTA:",this.lista)
   
}
  private createMyForm(){
   
    return this.formBuilder.group({
      name: ['',Validators.compose([
                Validators.maxLength(30), 
                Validators.pattern('[a-zA-Z ]*'),
                Validators.required])],
      lastName: ['',Validators.compose([
                Validators.maxLength(30), 
                Validators.pattern('[a-zA-Z ]*'),
                Validators.required])],
   
      email: ['', Validators.compose([
                  Validators.required,
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      
      telefono: ['',Validators.compose([
                    Validators.maxLength(10), 
                    Validators.required])],

password: ['', Validators.compose([
               Validators.required, 
               Validators.minLength(6), 
               Validators.maxLength(12)])],
confirmPassword: ['', Validators.required],
}, {validator: this.matchingPasswords('password', 'confirmPassword')}); 
   
  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
   
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
   }
}
 interface Interface_Usuario{
  nombre:string;
  apellido:string;
  condicion: string;
  //dni:number;
  id:string;
  telefono:number;
 // domicilio:string;
  //fecha_Nacimiento:string;
  //sexo:string;
  tipo_usuario:string;
  correo:string;
  contrasena:number
  estado:number

}
