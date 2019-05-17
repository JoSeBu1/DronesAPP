import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'page-anyadirdron',
  templateUrl: 'anyadirdron.html',
})
export class AnyadirdronPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, private platform: Platform, private localNotifications: LocalNotifications) {
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  addDron(apodo: string, marca: string, modelo: string, fechaAdquisicion: any, garantia: number, comentarios: string) {
    this.storage.get('UID').then( x =>  {
      this.angularFirestore.collection('usuarios/' + x + '/drones').add({apodo, marca, modelo, fechaAdquisicion, comentarios});
    });
    let fechaFinGarantiaNotificacion = new Date(fechaAdquisicion.year, fechaAdquisicion.month, fechaAdquisicion.day).getTime();
    fechaFinGarantiaNotificacion = fechaFinGarantiaNotificacion + garantia*2592000000;
    fechaFinGarantiaNotificacion = fechaFinGarantiaNotificacion - 604800000;
    this.localNotifications.schedule({
      title: 'Se acaba la garantía de su dron ' + apodo,
      text: 'En una semana se acabará la garantía de su dron./nRevise que todo funciona correctamente.' ,
      trigger: {at: new Date(new Date().setTime(fechaFinGarantiaNotificacion))}
    });
    this.navCtrl.popToRoot();
  }

}
