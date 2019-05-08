import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-editarmantenimiento',
  templateUrl: 'editarmantenimiento.html',
})
export class EditarmantenimientoPage implements OnInit{

  precio: number;
  fecha: string;
  descripcion: string;
  mantenimiento: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider) {
    this.mantenimiento = this.navParams.get('item');
  }

  ngOnInit() {
    this.precio = this.mantenimiento.precio;
    this.fecha = this.mantenimiento.fecha;
    this.descripcion = this.mantenimiento.descripcion;
  }

  editMantenimiento() {
    let precio = this.precio;
    let fecha = this.fecha;
    let descripcion = this.descripcion;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/mantenimientos/${this.mantenimiento.id}`).update({precio, fecha, descripcion});
    });
    this.navCtrl.popToRoot();
  }

}