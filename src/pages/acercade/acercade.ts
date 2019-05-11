import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommondataProvider } from '../../providers/commondata/commondata';


@Component({
  selector: 'page-acercade',
  templateUrl: 'acercade.html',
})
export class AcercadePage {

  app: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commondata: CommondataProvider) {
    
  }

}
