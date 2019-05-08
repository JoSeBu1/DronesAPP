import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-editartrabajo',
  templateUrl: 'editartrabajo.html',
})
export class EditartrabajoPage {

  precio: number;
  fecha: string;
  descripcion: string;
  trabajo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider) {
      this.trabajo = this.navParams.get('item');
  }

  ngOnInit() {
    this.precio = this.trabajo.precio;
    this.fecha = this.trabajo.fecha;
    this.descripcion = this.trabajo.descripcion;
  }

  editTrabajo() {
    let precio = this.precio;
    let fecha = this.fecha;
    let descripcion = this.descripcion;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/trabajos/${this.trabajo.id}`).update({precio, fecha, descripcion});
    });
    this.navCtrl.popToRoot();
  }

}
