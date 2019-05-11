import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'page-acercade',
  templateUrl: 'acercade.html',
})
export class AcercadePage {

  app: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commondata: CommondataProvider,
    private appVersion: AppVersion) {
    this.appVersion.getVersionNumber().then((version) => {
      this.app = version;
      console.log(version)
    }).catch(e => console.log(e));
  }

}
