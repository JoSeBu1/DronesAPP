import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-anyadirdron',
  templateUrl: 'anyadirdron.html',
})
export class AnyadirdronPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage) {
  }

  addDron(apodo: string, marca: string, modelo: string, fechaAdquisicion: number, comentarios: string) {
    this.storage.get('UID').then( x =>  {
      this.angularFirestore.collection('usuarios/' + x + '/drones').add({apodo, marca, modelo, fechaAdquisicion, comentarios});
    });
    this.navCtrl.popToRoot();
  }

}
