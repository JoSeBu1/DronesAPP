import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-anyadirvuelo',
  templateUrl: 'anyadirvuelo.html',
})
export class AnyadirvueloPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public platform: Platform) {
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  addVuelo(baterias: string, lugar: string, fecha: string, distancia: string, condicionesAtmosfericas: string, video: string) {
    this.storage.get('UID').then( x =>  {
      this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id + '/vuelos' ).add({baterias, lugar, fecha, distancia, condicionesAtmosfericas, video});
    });
    this.navCtrl.popToRoot();
  }

}
