import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-editartrabajo',
  templateUrl: 'editartrabajo.html',
})
export class EditartrabajoPage {

  precio: number;
  fecha: any;
  descripcion: string;
  pagado: boolean;
  video: string;
  trabajo: any;

  public date; 
  public myFecha;


  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public platform: Platform) {
      this.trabajo = this.navParams.get('item');
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  ngOnInit() {
    this.precio = this.trabajo.precio;
    this.fecha = this.trabajo.fecha;
    this.descripcion = this.trabajo.descripcion;
    this.pagado = this.trabajo.pagado;
    this.video = this.trabajo.video;
    this.date = new Date().setFullYear(this.fecha.year, this.fecha.month-1, this.fecha.day);
    this.myFecha = new Date(this.date).toISOString();
  }

  editTrabajo(fecha) {
    let precio = this.precio;
    let descripcion = this.descripcion;
    let pagado = this.pagado;
    let video = this.video;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/trabajos/${this.trabajo.id}`).update({precio, fecha, descripcion, pagado, video});
    });
    this.navCtrl.popToRoot();
  }

}
