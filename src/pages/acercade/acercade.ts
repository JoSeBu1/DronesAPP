import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { CommondataProvider } from '../../providers/commondata/commondata';


@Component({
  selector: 'page-acercade',
  templateUrl: 'acercade.html',
})
export class AcercadePage {

  public counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commondata: CommondataProvider,
    public toastCtrl: ToastController, private platform: Platform) {
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        this.platform.exitApp();
      }
    }, 0)
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Presiona otra vez para salir de la aplicación",
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

}
