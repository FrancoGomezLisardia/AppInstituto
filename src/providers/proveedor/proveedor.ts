import { Injectable } from '@angular/core';

/*
  Generated class for the ProveedorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProveedorProvider {
  tipo_usuario:any;
  usuarioHabilitado:any;
  constructor() {
    console.log('Hello ProveedorProvider Provider');
  }

}
