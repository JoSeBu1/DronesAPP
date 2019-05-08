import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-mapavuelo',
  templateUrl: 'mapavuelo.html',
})
export class MapavueloPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public commondata: CommondataProvider) {
  }

}
