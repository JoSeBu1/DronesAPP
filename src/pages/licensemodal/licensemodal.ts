import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-licensemodal',
  templateUrl: 'licensemodal.html',
})
export class LicensemodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  //Cierra el modal
  closeModal() {
    this.view.dismiss();
  }
}
