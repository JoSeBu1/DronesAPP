import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-anyadirdron',
  templateUrl: 'anyadirdron.html',
})
export class AnyadirdronPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, private platform: Platform, private localNotifications: LocalNotifications,
    private _translate: TranslateService) {
  }

  //Ejecuta una accion al abrirse la pantalla
  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  //Añade el dron con los parametros introducidos
  addDron(apodo: string, marca: string, modelo: string, fechaAdquisicion: any, garantia: number, comentarios: string) {
    this.storage.get('UID').then( x =>  {
      this.angularFirestore.collection('usuarios/' + x + '/drones').add({apodo, marca, modelo, fechaAdquisicion, comentarios});
    });
    let fechaFinGarantiaNotificacion = new Date(fechaAdquisicion.year, fechaAdquisicion.month, fechaAdquisicion.day).getTime();
    fechaFinGarantiaNotificacion = fechaFinGarantiaNotificacion + garantia*2592000000;
    fechaFinGarantiaNotificacion = fechaFinGarantiaNotificacion - 604800000;
    this._translate.get(['NOTIFICATION.TITLE', 'NOTIFICATION.MESSAGE']).subscribe(translate => {
      this.localNotifications.schedule({
        title: translate['NOTIFICATION.TITLE'] + apodo,
        text: translate['NOTIFICATION.MESSAGE'] ,
        trigger: {at: new Date(new Date().setTime(fechaFinGarantiaNotificacion))}
      });
    })
    this.navCtrl.popToRoot();
  }

}
