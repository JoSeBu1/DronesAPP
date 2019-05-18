import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-anyadirtrabajo',
  templateUrl: 'anyadirtrabajo.html',
})
export class AnyadirtrabajoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public platform: Platform) {
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  addTrabajo(lugar: string, precio: string, fecha: string, descripcion: string, pagado: boolean, video: string) {
    this.storage.get('UID').then( x =>  {
      this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id + '/trabajos' ).add({lugar, precio, fecha, descripcion, pagado, video});
    });
    this.navCtrl.popToRoot();
  }

}
