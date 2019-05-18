import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-anyadirmantenimiento',
  templateUrl: 'anyadirmantenimiento.html',
})
export class AnyadirmantenimientoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public platform: Platform) {
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  addMantenimiento(titulo: string, precio: string, fecha: string, descripcion: string) {
    this.storage.get('UID').then( x =>  {
      this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id + '/mantenimientos' ).add({titulo, precio, fecha, descripcion});
    });
    this.navCtrl.popToRoot();
  }

}
