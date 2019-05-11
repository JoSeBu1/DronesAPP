import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

interface Dron {
  apodo: string;
  marca: string;
  modelo: string;
  fechaAdquisicion: any;
  comentarios: string;
  id?: string;
}

@Injectable()
export class CommondataProvider {

  public dronesCollection: AngularFirestoreCollection<Dron>;
  public dron: Dron[];
  public dronActivo: Dron;
  public sesionIniciada: any;
  public usuario: any;
  public email: any;
  public photoUrl: any;
  public sesionIniciadaConGoogle: boolean;
  public sesionIniciadaConFacebook: boolean;
  public sesionIniciadaConCorreo: boolean;
  public app: any;

  constructor() {}

  compareFn(e1: Dron, e2: Dron): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

}
