import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  fecha: string;
  condicionesAtmosfericas: string;
  vuelo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider) {
    this.vuelo = this.navParams.get('item');
  }

  ngOnInit() {
    this.baterias = this.vuelo.baterias;
    this.distancia = this.vuelo.distancia;
    this.dron = this.vuelo.dron;
    this.lugar = this.vuelo.lugar;
    this.fecha = this.vuelo.fecha;
    this.condicionesAtmosfericas = this.vuelo.condicionesAtmosfericas;
  }

  editVuelo() {
    let baterias = this.baterias;
    let distancia = this.distancia;
    let lugar = this.lugar;
    let fecha = this.fecha;
    let condicionesAtmosfericas = this.condicionesAtmosfericas;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/vuelos/${this.vuelo.id}`).update({baterias, distancia, lugar, fecha, condicionesAtmosfericas});
    });
    this.navCtrl.popToRoot();
  }

}