import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-editarvuelo',
  templateUrl: 'editarvuelo.html',
})
export class EditarvueloPage {

  baterias: string;
  distancia: string;
  dron: string;
  lugar: string;
  fecha: any;
  condicionesAtmosfericas: string;
  video: string;
  vuelo: any;

  public date; 
  public myFecha;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public platform: Platform) {
    this.vuelo = this.navParams.get('item');
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  ngOnInit() {
    this.baterias = this.vuelo.baterias;
    this.distancia = this.vuelo.distancia;
    this.dron = this.vuelo.dron;
    this.lugar = this.vuelo.lugar;
    this.fecha = this.vuelo.fecha;
    this.condicionesAtmosfericas = this.vuelo.condicionesAtmosfericas;
    this.video = this.vuelo.video;
    if(this.fecha.day != undefined && this.fecha.month != undefined && this.fecha.year != undefined) {
      this.date = new Date().setFullYear(this.fecha.year, this.fecha.month-1, this.fecha.day);
      this.myFecha = new Date(this.date).toISOString();
    }
  }

  editVuelo(fecha) {
    let baterias = this.baterias;
    let distancia = this.distancia;
    let lugar = this.lugar;
    let condicionesAtmosfericas = this.condicionesAtmosfericas;
    let video = this.video;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/vuelos/${this.vuelo.id}`).update({baterias, distancia, lugar, fecha, condicionesAtmosfericas, video});
    });
    this.navCtrl.popToRoot();
  }

}
