import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-licensemodal',
  templateUrl: 'licensemodal.html',
})
export class LicensemodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private platform: Platform) {
  }

  //Ejecuta una accion al abrise la pantalla
  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  //Cierra el modal
  closeModal() {
    this.view.dismiss();
  }
}
